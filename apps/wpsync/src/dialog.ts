import { execFileSync } from "node:child_process";
import { WpsyncError } from "./errors";

export interface Credentials {
  username: string;
  password: string;
}

/**
 * Asks for an administrator's login. The real one is a macOS dialog; tests pass their own.
 * Whatever the person types goes only to this process: it is never printed or logged.
 */
export type CredentialsProvider = (site: { name: string; homeUrl: string }, suggestedUsername?: string) => Promise<Credentials>;

function appleScriptString(value: string): string {
  return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

/** The AppleScript for the two dialogs: username, then password with the typing hidden. */
export function loginDialogScript(siteName: string, homeUrl: string, suggestedUsername = ""): string {
  const intro = `Sign in to ${siteName} (${homeUrl}) as an administrator.`;
  const note = "wpsync uses the password once, to create its own revocable key on the site. It never saves the password.";
  return [
    `set u to text returned of (display dialog ${appleScriptString(`${intro}\n\nUsername:`)} default answer ${appleScriptString(suggestedUsername)} with title "wpsync" buttons {"Cancel", "Next"} default button "Next" cancel button "Cancel")`,
    `set p to text returned of (display dialog ("Password for " & u & ":" & return & return & ${appleScriptString(note)}) default answer "" with hidden answer with title "wpsync" buttons {"Cancel", "Connect"} default button "Connect" cancel button "Cancel")`,
    "return u & linefeed & p",
  ].join("\n");
}

/** Shows the dialogs with osascript. The script goes in on stdin, the answers come back on stdout. */
export const macLoginDialog: CredentialsProvider = async (site, suggestedUsername) => {
  let output: string;
  try {
    output = execFileSync("osascript", ["-"], {
      input: loginDialogScript(site.name, site.homeUrl, suggestedUsername),
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
