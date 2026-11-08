/**
 * The contract-test "live" site: a DDEV WordPress install in ../site.
 *
 * Every suite's vitest globalSetup calls startSite() and then puts the site in the state it
 * needs (bridge present or absent, fresh credentials). All values here are throwaway test
 * credentials for a site that only exists on this Mac.
 */
import { execFileSync } from "node:child_process";
import { randomBytes } from "node:crypto";
import { copyFileSync, cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const SITE_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "site");
export const PLUGIN_SOURCE = join(SITE_DIR, "..", "..", "bridge-plugin", "wpsync-bridge");
const PLUGIN_TARGET = join(SITE_DIR, "wp", "wp-content", "plugins", "wpsync-bridge");

/** Where the pull contract tests put the local copy they make (a second DDEV project). */
export const PULLED_DIR = join(SITE_DIR, "..", "pulled", "site");
export const PULLED_DDEV_NAME = "wpsync-pulltest";

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

/** Runs a ddev command in another DDEV project folder (a site wpsync pulled, say). */
export function ddevIn(dir: string, ...args: string[]): string {
  return execFileSync("ddev", args, { cwd: dir, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
}

/** Waits for files written on the Mac to reach the container (DDEV's Mutagen sync, when on). */
export function syncFiles(dir: string = SITE_DIR): void {
  try {
    ddevIn(dir, "mutagen", "sync");
  } catch {
    // Mutagen isn't in use.
  }
}

/** Writes a file into the harness site's WordPress folder (path relative to wp/). */
export function writeSiteFile(path: string, content: string | Buffer): void {
  const target = join(SITE_DIR, "wp", path);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, content);
}

export function removeSiteFile(path: string): void {
  rmSync(join(SITE_DIR, "wp", path), { force: true });
}

/** 20 MB of repeatable bytes: bigger than one fetch batch, so it's read by range. */
export function bigFileContent(): Buffer {
  const out = Buffer.alloc(20 * 1024 * 1024);
  let x = 2463534242;
  for (let i = 0; i < out.length; i += 4) {
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    out.writeUInt32LE(x >>> 0, i);
  }
  return out;
}

export const SEED = {
  posts: 25,
  unicodeFile: "wp-content/uploads/2026/11/Spaced name & ünïcode.txt",
  bigFile: "wp-content/uploads/big.bin",
  samplePlugin: "wp-content/plugins/sample-plugin/sample-plugin.php",
  excludedFiles: ["wp-content/cache/page.html", "wp-content/uploads/wpsync-abc123/secret.txt"],
  compositeRows: 2500,
} as const;

/**
 * Fills the harness with the awkward cases a pull must copy exactly (see seed.php for the
 * database side): odd file names, a big file, a plugin, and files that must never be copied.
 */
export function seedSite(): void {
  writeSiteFile(SEED.unicodeFile, "unicode file\n");
  writeSiteFile(SEED.bigFile, bigFileContent());
  writeSiteFile(SEED.samplePlugin, "<?php\n/**\n * Plugin Name: Sample Plugin\n * Version: 1.0\n */\n// v1\n");
  for (const path of SEED.excludedFiles) writeSiteFile(path, "never copy me\n");
  // Outside wp/, so it's never part of the site itself.
  copyFileSync(join(dirname(fileURLToPath(import.meta.url)), "seed.php"), join(SITE_DIR, "seed.php"));
  syncFiles();
  wp("eval-file", "/var/www/html/seed.php", String(SEED.posts), String(SEED.compositeRows));
}

/**
 * SQL printing one checksum of a table's rows, in a stable order. Run it on two databases and
 * compare: equal checksums mean equal rows, including NULLs and binary bytes.
 */
export function tableChecksumSql(table: string, columns: string[], orderBy: string): string {
  const row = columns.map((c) => `IFNULL(HEX(${c}), 'NULL')`).join(", '|', ");
  return `SET SESSION group_concat_max_len = 1073741824; SELECT COUNT(*), MD5(GROUP_CONCAT(CONCAT(${row}) ORDER BY ${orderBy} SEPARATOR ',')) FROM ${table}`;
}
