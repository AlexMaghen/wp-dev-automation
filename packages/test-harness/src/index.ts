/**
 * The contract-test "live" site: a DDEV WordPress install in ../site.
 *
 * Every suite's vitest globalSetup calls startSite() and then puts the site in the state it
 * needs (bridge present or absent, fresh credentials). All values here are throwaway test
 * credentials for a site that only exists on this Mac.
 */
import { execFileSync } from "node:child_process";
import { randomBytes } from "node:crypto";
import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const SITE_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "site");
export const PLUGIN_SOURCE = join(SITE_DIR, "..", "..", "bridge-plugin", "wpsync-bridge");
const PLUGIN_TARGET = join(SITE_DIR, "wp", "wp-content", "plugins", "wpsync-bridge");

/** Plain HTTP on purpose: see the comment in site/.ddev/config.yaml. */
export const BASE_URL = "http://wpsync-harness.ddev.site";

/** Runs a ddev command in the harness site and returns its trimmed stdout. */
export function ddev(...args: string[]): string {
  return execFileSync("ddev", args, {
    cwd: SITE_DIR,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

/** Runs WP-CLI inside the harness site. */
export function wp(...args: string[]): string {
  return ddev("wp", ...args);
}

/** Like wp(), but returns false instead of throwing when the command fails. */
export function wpOk(...args: string[]): boolean {
  try {
    wp(...args);
    return true;
  } catch {
    return false;
  }
}

function requireTools(): void {
  try {
    execFileSync("docker", ["info"], { stdio: "ignore" });
  } catch {
    throw new Error("Docker isn't running. Start Docker Desktop, then run the contract tests again.");
  }
  try {
    execFileSync("ddev", ["version"], { stdio: "ignore" });
  } catch {
    throw new Error("DDEV isn't installed: brew install ddev/ddev/ddev");
  }
}

/** Starts DDEV and installs WordPress, an admin and an editor if they aren't there yet. */
export function startSite(): void {
  requireTools();
  mkdirSync(join(SITE_DIR, "wp"), { recursive: true });
  ddev("start", "-y");
  if (!existsSync(join(SITE_DIR, "wp", "wp-load.php"))) {
    wp("core", "download", "--skip-content");
  }
  if (!wpOk("core", "is-installed")) {
    wp(
      "core",
      "install",
      "--url=https://wpsync-harness.ddev.site",
      "--title=wpsync harness",
      "--admin_user=admin",
      `--admin_password=${randomBytes(18).toString("base64url")}`,
      "--admin_email=admin@example.test",
      "--skip-email",
    );
    wp("user", "create", "editor", "editor@example.test", "--role=editor");
  }
  // A default theme so the site renders; --skip-content left the themes folder empty.
  if (!wpOk("theme", "is-installed", "twentytwentyfive")) {
    wp("theme", "install", "twentytwentyfive", "--activate");
  }
}

/** Copies the bridge from packages/bridge-plugin into the site, inactive. */
export function installBridge(): void {
  rmSync(PLUGIN_TARGET, { recursive: true, force: true });
  cpSync(PLUGIN_SOURCE, PLUGIN_TARGET, { recursive: true });
  wpOk("plugin", "deactivate", "wpsync-bridge");
}

/** Deactivates and deletes the bridge, as on a site wpsync has never touched. */
export function removeBridge(): void {
  wpOk("plugin", "deactivate", "wpsync-bridge");
  rmSync(PLUGIN_TARGET, { recursive: true, force: true });
}

/** Sets a new random login password for a user, ends their login sessions, and returns it. */
export function freshLoginPassword(user: string): string {
  const password = randomBytes(18).toString("base64url");
  wp("user", "update", user, `--user_pass=${password}`, "--skip-email");
  wp("user", "session", "destroy", user, "--all");
  return password;
}

/** Deletes all of a user's Application Passwords. */
export function clearApplicationPasswords(user: string): void {
  const uuids = wp("user", "application-password", "list", user, "--field=uuid").split("\n").filter(Boolean);
  for (const uuid of uuids) wp("user", "application-password", "delete", user, uuid);
}

/** Replaces a user's Application Passwords with a fresh one and returns "user:pass". */
export function freshApplicationPassword(user: string): string {
  clearApplicationPasswords(user);
  const pass = wp("user", "application-password", "create", user, "contract-tests", "--porcelain");
  return `${user}:${pass}`;
}

/** Names of a user's Application Passwords. */
export function applicationPasswordNames(user: string): string[] {
  return wp("user", "application-password", "list", user, "--field=name").split("\n").filter(Boolean);
}
