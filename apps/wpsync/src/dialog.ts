import { WpsyncError } from "./errors";
import { type DialogSpec, showDialog } from "./mac-dialog";
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
 * The sign-in dialog: the site (read-only: the project is already tied to it), username and
 * password in one dialog. It names the site by its address only: the site's title (often a
 * person's or company's name) reads like an account name in a sign-in dialog.
 */
export function loginDialogSpec(homeUrl: string, suggestedUsername = ""): DialogSpec {
  return {
    heading: "Sign in to your WordPress site",
    message: "Enter an admin username and password. wpsync uses the password once, to create its own revocable key on the site. It never saves the password.",
    info: [{ label: "Site", value: homeUrl }],
    fields: [
      { label: "Username", value: suggestedUsername },
      { label: "Password", secret: true },
    ],
    buttons: ["Cancel", "Connect"],
  };
}

export const macLoginDialog: CredentialsProvider = async (site, suggestedUsername) => {
  notify("wpsync is waiting for you", `Enter an admin username and password for ${site.homeUrl} in the wpsync dialog.`);
  const { values } = showDialog(loginDialogSpec(site.homeUrl, suggestedUsername), "Sign-in cancelled.", "sign-in");
  const username = (values[0] ?? "").trim();
  const password = values[1] ?? "";
  if (!username || !password) throw new WpsyncError("cancelled", "No username or password entered.");
  return { username, password };
};
