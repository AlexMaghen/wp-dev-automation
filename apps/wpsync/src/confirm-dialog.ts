import { execFileSync } from "node:child_process";
import { DIALOG_GIVE_UP_SECONDS, DIALOG_PRELUDE, GAVE_UP_CHECK } from "./dialog";
import type { DestroyConfirmProvider, DestroyRequest } from "./destroy";
import { WpsyncError } from "./errors";
import { notify } from "./progress";

/**
 * Confirmations only a person can give (design section 14.6). When Claude runs wpsync, Claude
 * is the one at the terminal, so a terminal prompt or a command-line flag is no safeguard; a
 * macOS dialog on the developer's screen is. Tests pass their own answers instead.
 */

/** Shows the developer what's about to happen; resolves true only on their explicit yes. */
export type ConfirmProvider = (request: { action: "push" | "rollback" | "finalize"; host: string; summary: string }) => Promise<boolean>;

/** Asks for an Application Password the developer made in their profile (blocked-login fallback). */
export type ApplicationPasswordProvider = (site: { name: string; homeUrl: string }, suggestedUsername?: string) => Promise<{ username: string; applicationPassword: string }>;

function asString(value: string): string {
  return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

function osascript(script: string): string {
  try {
    return execFileSync("osascript", ["-"], { input: script, encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] }).replace(/\n$/, "");
  } catch (error) {
    const stderr = (error as { stderr?: string }).stderr ?? "";
    if (/-128/.test(stderr)) throw new WpsyncError("cancelled", "Cancelled in the dialog; nothing was changed.");
    throw new WpsyncError("dialog_failed", "Couldn't show the confirmation dialog.", "Run wpsync on a Mac where you're logged in to the desktop.");
  }
}

/** The AppleScript for a confirmation (exported for tests). */
export function confirmScript(request: Parameters<ConfirmProvider>[0]): string {
  const summary = request.summary.length > 900 ? `${request.summary.slice(0, 900)}…` : request.summary;
  if (request.action === "push") {
    const text = `Publishing REPLACES the live site ${request.host} with your local copy.\n\n${summary}\n\nTo go ahead, type the live site's domain:`;
    return [
      DIALOG_PRELUDE,
      `set r to (display dialog ${asString(text)} default answer "" with title "wpsync: publish" with icon caution buttons {"Cancel", "Publish"} default button "Publish" cancel button "Cancel" giving up after ${DIALOG_GIVE_UP_SECONDS})`,
      GAVE_UP_CHECK,
      "text returned of r",
    ].join("\n");
  }
  const verb = request.action === "rollback" ? "Roll back" : "Finalize";
  const text =
    request.action === "rollback"
      ? `Put ${request.host} back as it was before the last publish?\n\n${summary}`
      : `Keep the last publish on ${request.host} and delete the old version saved on the server? After this, rollback is no longer possible.\n\n${summary}`;
  return [
    DIALOG_PRELUDE,
    `set r to (display dialog ${asString(text)} with title "wpsync: ${verb.toLowerCase()}" with icon caution buttons {"Cancel", ${asString(verb)}} default button "Cancel" cancel button "Cancel" giving up after ${DIALOG_GIVE_UP_SECONDS})`,
    GAVE_UP_CHECK,
    "button returned of r",
  ].join("\n");
}

/**
 * Whether what the developer typed names the live site: the domain itself, also accepted with
 * https:// in front, a slash after, spaces around, or different capitals. Anything that names
 * another site (a different domain, or www. when the site has none) is refused.
 */
export function sameHost(typed: string, host: string): boolean {
  const cleaned = typed
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/\/+$/, "");
  return cleaned.length > 0 && cleaned === host.toLowerCase();
}

export const macConfirmDialog: ConfirmProvider = async (request) => {
  notify("wpsync is waiting for you", request.action === "push" ? `Type ${request.host} in the wpsync dialog to publish, or Cancel.` : `Confirm the ${request.action} of ${request.host} in the wpsync dialog.`);
  const answer = osascript(confirmScript(request)).trim();
  if (request.action === "push") return sameHost(answer, request.host);
  return answer.length > 0;
};

/**
 * The AppleScript for each of `wpsync destroy`'s three confirmations (exported for tests).
 * Each is its own dialog, with Cancel as the default button on the first two, so a stray Return
 * never deletes anything; the third asks for the site's domain to be typed.
 */
export function destroyScript(request: DestroyRequest, step: 1 | 2 | 3): string {
  const summary = request.summary.length > 900 ? `${request.summary.slice(0, 900)}…` : request.summary;
  const title = `wpsync: delete local copy (${step} of 3)`;
  if (step === 3) {
    const text = `Last check. Deleting the local copy of ${request.host} now.\n\nThe live site is not touched.\n\nTo delete it, type the site's domain:`;
    return [
      DIALOG_PRELUDE,
      `set r to (display dialog ${asString(text)} default answer "" with title ${asString(title)} with icon stop buttons {"Cancel", "Delete"} default button "Cancel" cancel button "Cancel" giving up after ${DIALOG_GIVE_UP_SECONDS})`,
      GAVE_UP_CHECK,
      "text returned of r",
    ].join("\n");
  }
  const text =
    step === 1
      ? `Delete the whole local copy of ${request.host} from this Mac?\n\n${summary}\n\nThe live site, and wpsync's connection to it, are not touched.`
      : `Are you sure? This can't be undone: the local files, database and git history of ${request.host} will be gone.\n\nAnything you haven't published to live is lost.`;
  const button = step === 1 ? "Continue" : "Yes, delete it";
  return [
    DIALOG_PRELUDE,
    `set r to (display dialog ${asString(text)} with title ${asString(title)} with icon caution buttons {"Cancel", ${asString(button)}} default button "Cancel" cancel button "Cancel" giving up after ${DIALOG_GIVE_UP_SECONDS})`,
    GAVE_UP_CHECK,
    "button returned of r",
  ].join("\n");
}

export const macDestroyDialog: DestroyConfirmProvider = async (request, step) => {
  if (step === 1) notify("wpsync is waiting for you", `Confirm deleting the local copy of ${request.host} in the wpsync dialogs, or Cancel.`);
  const answer = osascript(destroyScript(request, step)).trim();
  if (step === 3) return sameHost(answer, request.host);
  return answer.length > 0;
};

export const macApplicationPasswordDialog: ApplicationPasswordProvider = async (site, suggestedUsername = "") => {
  const intro = `Enter an admin username and an Application Password for ${site.homeUrl}.\n\nTo make one: in that site's wp-admin, go to Users → Profile → Application Passwords, add one named "wpsync", and copy it.\n\nUsername:`;
  notify("wpsync is waiting for you", `Enter an admin username and Application Password for ${site.homeUrl} in the wpsync dialog.`);
  const script = [
    DIALOG_PRELUDE,
    `set r to (display dialog ${asString(intro)} default answer ${asString(suggestedUsername)} with title "wpsync" buttons {"Cancel", "Next"} default button "Next" cancel button "Cancel" giving up after ${DIALOG_GIVE_UP_SECONDS})`,
    GAVE_UP_CHECK,
    "set u to text returned of r",
    `set r to (display dialog ("Application Password for " & u & " at " & ${asString(site.homeUrl)} & ":") default answer "" with hidden answer with title "wpsync" buttons {"Cancel", "Connect"} default button "Connect" cancel button "Cancel" giving up after ${DIALOG_GIVE_UP_SECONDS})`,
    GAVE_UP_CHECK,
    "set p to text returned of r",
    "return u & linefeed & p",
  ].join("\n");
  const answer = osascript(script);
  const split = answer.indexOf("\n");
  const username = answer.slice(0, split).trim();
  const applicationPassword = answer.slice(split + 1).trim();
  if (split < 0 || !username || !applicationPassword) throw new WpsyncError("cancelled", "No username or Application Password entered.");
  return { username, applicationPassword };
};
