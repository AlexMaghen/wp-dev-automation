import { execFileSync } from "node:child_process";
import { WpsyncError } from "./errors";
import { notify } from "./progress";

export interface Credentials {
  username: string;
  password: string;
}

/**
 * Asks for an administrator's login. The real one is a macOS dialog; tests pass their own.
 * Whatever the person types goes only to this process: it is never printed or logged.
 */
export type CredentialsProvider = (site: { name: string; homeUrl: string }, suggestedUsername?: string) => Promise<Credentials>;

/**
 * Every wpsync dialog: comes to the front (a dialog from a background process can open behind
 * other windows), plays a sound, and gives up after half an hour, which counts as Cancel, so
 * nothing waits for hours (with the bridge switched on) while nobody is there.
 */
export const DIALOG_GIVE_UP_SECONDS = 1800;
export const DIALOG_PRELUDE = "activate\nbeep";
/** After a dialog that gave up: stop as if Cancel was clicked (error -128). */
export const GAVE_UP_CHECK = "if gave up of r then error number -128";

function appleScriptString(value: string): string {
  return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

/**
 * The AppleScript for the two dialogs: username, then password with the typing hidden. They
 * name the site by its address only: the site's title (often a person's or company's name)
 * reads like an account name in a sign-in dialog.
 */
export function loginDialogScript(homeUrl: string, suggestedUsername = ""): string {
  const intro = `Enter an admin username and password for ${homeUrl}.`;
  const note = "wpsync uses the password once, to create its own revocable key on the site. It never saves the password.";
  return [
    DIALOG_PRELUDE,
    `set r to (display dialog ${appleScriptString(`${intro}\n\nUsername:`)} default answer ${appleScriptString(suggestedUsername)} with title "wpsync" buttons {"Cancel", "Next"} default button "Next" cancel button "Cancel" giving up after ${DIALOG_GIVE_UP_SECONDS})`,
    GAVE_UP_CHECK,
    "set u to text returned of r",
    `set r to (display dialog ("Password for " & u & " at " & ${appleScriptString(homeUrl)} & ":" & return & return & ${appleScriptString(note)}) default answer "" with hidden answer with title "wpsync" buttons {"Cancel", "Connect"} default button "Connect" cancel button "Cancel" giving up after ${DIALOG_GIVE_UP_SECONDS})`,
    GAVE_UP_CHECK,
    "set p to text returned of r",
    "return u & linefeed & p",
  ].join("\n");
}

/** Shows the dialogs with osascript. The script goes in on stdin, the answers come back on stdout. */
export const macLoginDialog: CredentialsProvider = async (site, suggestedUsername) => {
  notify("wpsync is waiting for you", `Enter an admin username and password for ${site.homeUrl} in the wpsync dialog.`);
  let output: string;
  try {
    output = execFileSync("osascript", ["-"], {
      input: loginDialogScript(site.homeUrl, suggestedUsername),
      encoding: "utf8",
      stdio: ["pipe", "pipe", "pipe"],
    });
  } catch (error) {
    const stderr = (error as { stderr?: string }).stderr ?? "";
    if (/-128/.test(stderr)) throw new WpsyncError("cancelled", "Sign-in cancelled.");
    throw new WpsyncError("dialog_failed", "Couldn't show the sign-in dialog.", "Run wpsync from a Mac where you're logged in to the desktop.");
  }
  const answer = output.replace(/\n$/, "");
  const split = answer.indexOf("\n");
  const username = answer.slice(0, split).trim();
  const password = answer.slice(split + 1);
  if (split < 0 || !username || !password) throw new WpsyncError("cancelled", "No username or password entered.");
  return { username, password };
};
