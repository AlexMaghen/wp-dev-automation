import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const HARNESS_DIR = dirname(fileURLToPath(import.meta.url));
export const SITE_DIR = join(HARNESS_DIR, "site");
export const PLUGIN_SOURCE = join(HARNESS_DIR, "..", "..", "wpsync-bridge");
export const PLUGIN_TARGET = join(SITE_DIR, "wp", "wp-content", "plugins", "wpsync-bridge");

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
