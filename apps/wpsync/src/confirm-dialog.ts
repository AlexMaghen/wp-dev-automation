import type { DestroyConfirmProvider, DestroyRequest } from "./destroy";
import { WpsyncError } from "./errors";
import { type DialogSpec, showDialog } from "./mac-dialog";
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

/** The dialog for a confirmation (exported for tests). */
export function confirmSpec(request: Parameters<ConfirmProvider>[0]): DialogSpec {
  const summary = request.summary.length > 900 ? `${request.summary.slice(0, 900)}…` : request.summary;
  const info = [{ label: "Live site", value: request.host }];
  if (request.action === "push") {
    return {
      heading: `Publishing REPLACES the live site ${request.host} with your local copy.`,
      message: summary,
      info,
      fields: [{ label: "To go ahead, type the live site's domain:" }],
      buttons: ["Cancel", "Publish"],
      caution: true,
    };
  }
  const verb = request.action === "rollback" ? "Roll back" : "Finalize";
  const heading =
    request.action === "rollback"
      ? `Put ${request.host} back as it was before the last publish?`
      : `Keep the last publish on ${request.host} and delete the old version saved on the server? After this, rollback is no longer possible.`;
  // Cancel is the default (Return) here: these take one click, so a stray Return mustn't do it.
  return { heading, message: summary, info, buttons: [verb, "Cancel"], caution: true };
}

const CANCELLED = "Cancelled in the dialog; nothing was changed.";

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
  const { values } = showDialog(confirmSpec(request), CANCELLED, "confirmation");
  if (request.action === "push") return sameHost(values[0] ?? "", request.host);
  return true;
};

/**
 * Each of `wpsync destroy`'s three confirmations (exported for tests). Each is its own dialog,
 * with Cancel as the default button (last in the list), so a stray Return never deletes
 * anything; the third asks for the site's domain to be typed.
 */
export function destroySpec(request: DestroyRequest, step: 1 | 2 | 3): DialogSpec {
  const summary = request.summary.length > 900 ? `${request.summary.slice(0, 900)}…` : request.summary;
  const info = [{ label: "Site", value: request.host }];
  if (step === 3) {
    return {
      heading: `Last check (3 of 3): delete the local copy of ${request.host} now?`,
      message: request.disconnect ? "wpsync is removed from the live site too; its content is not touched." : "The live site is not touched.",
      info,
      fields: [{ label: "To delete it, type the site's domain:" }],
      buttons: ["Delete", "Cancel"],
      caution: true,
    };
  }
  if (step === 1) {
    return {
      heading: `Delete the whole local copy of ${request.host} from this Mac? (1 of 3)`,
      message: request.disconnect
        ? `${summary}\n\nThe live site's pages, posts, files and settings are not touched. To work on it again later, start a new local copy.`
        : `${summary}\n\nThe live site, and wpsync's connection to it, are not touched.`,
      info,
      buttons: ["Continue", "Cancel"],
      caution: true,
    };
  }
  return {
    heading: "Are you sure? This can't be undone. (2 of 3)",
    message: `The local files, database and git history of ${request.host} will be gone. Anything you haven't published to live is lost.`,
    info,
    buttons: ["Yes, delete it", "Cancel"],
    caution: true,
  };
}

export const macDestroyDialog: DestroyConfirmProvider = async (request, step) => {
  if (step === 1) notify("wpsync is waiting for you", `Confirm deleting the local copy of ${request.host} in the wpsync dialogs, or Cancel.`);
  const { values } = showDialog(destroySpec(request, step), "Cancelled in the dialog; nothing was deleted.", "confirmation");
  if (step === 3) return sameHost(values[0] ?? "", request.host);
  return true;
};

export const macApplicationPasswordDialog: ApplicationPasswordProvider = async (site, suggestedUsername = "") => {
  notify("wpsync is waiting for you", `Enter an admin username and Application Password for ${site.homeUrl} in the wpsync dialog.`);
  const { values } = showDialog(
    {
      heading: "Enter an admin username and an Application Password",
      message: 'To make one: in that site\'s wp-admin, go to Users → Profile → Application Passwords, add one named "wpsync", and copy it.',
      info: [{ label: "Site", value: site.homeUrl }],
      fields: [
        { label: "Username", value: suggestedUsername },
        { label: "Application Password", secret: true },
      ],
      buttons: ["Cancel", "Connect"],
    },
    "Sign-in cancelled.",
    "sign-in",
  );
  const username = (values[0] ?? "").trim();
  const applicationPassword = (values[1] ?? "").trim();
  if (!username || !applicationPassword) throw new WpsyncError("cancelled", "No username or Application Password entered.");
  return { username, applicationPassword };
};
