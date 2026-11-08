import { execFileSync } from "node:child_process";
import { WpsyncError } from "./errors";

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
    return `text returned of (display dialog ${asString(text)} default answer "" with title "wpsync: publish" with icon caution buttons {"Cancel", "Publish"} default button "Publish" cancel button "Cancel")`;
  }
  const verb = request.action === "rollback" ? "Roll back" : "Finalize";
  const text =
    request.action === "rollback"
      ? `Put ${request.host} back as it was before the last publish?\n\n${summary}`
      : `Keep the last publish on ${request.host} and delete the old version saved on the server? After this, rollback is no longer possible.\n\n${summary}`;
  return `button returned of (display dialog ${asString(text)} with title "wpsync: ${verb.toLowerCase()}" with icon caution buttons {"Cancel", ${asString(verb)}} default button "Cancel" cancel button "Cancel")`;
}

export const macConfirmDialog: ConfirmProvider = async (request) => {
  const answer = osascript(confirmScript(request)).trim();
  if (request.action === "push") return answer.toLowerCase() === request.host.toLowerCase();
  return answer.length > 0;
};

export const macApplicationPasswordDialog: ApplicationPasswordProvider = async (site, suggestedUsername = "") => {
  const intro = `Sign in to ${site.name} (${site.homeUrl}) with an Application Password.\n\nIn that site's wp-admin, go to Users → Profile → Application Passwords, add one named "wpsync", and copy it.\n\nUsername:`;
  const script = [
    `set u to text returned of (display dialog ${asString(intro)} default answer ${asString(suggestedUsername)} with title "wpsync" buttons {"Cancel", "Next"} default button "Next" cancel button "Cancel")`,
    `set p to text returned of (display dialog ("Application Password for " & u & ":") default answer "" with hidden answer with title "wpsync" buttons {"Cancel", "Connect"} default button "Connect" cancel button "Cancel")`,
    "return u & linefeed & p",
  ].join("\n");
  const answer = osascript(script);
  const split = answer.indexOf("\n");
  const username = answer.slice(0, split).trim();
  const applicationPassword = answer.slice(split + 1).trim();
  if (split < 0 || !username || !applicationPassword) throw new WpsyncError("cancelled", "No username or Application Password entered.");
  return { username, applicationPassword };
};
