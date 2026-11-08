import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { randomBytes } from "node:crypto";
import { join } from "node:path";
import type { TestProject } from "vitest/node";
import { BASE_URL, PLUGIN_SOURCE, PLUGIN_TARGET, SITE_DIR, wp, ddev } from "./ddev";

/** What the contract tests receive through inject(). */
export interface Harness {
  baseUrl: string;
  /** "user:application-password" for the administrator. */
  adminAuth: string;
  /** "user:application-password" for an editor, who must be refused. */
  editorAuth: string;
}

declare module "vitest" {
  export interface ProvidedContext {
    harness: Harness;
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

function installWordPress(): void {
  mkdirSync(join(SITE_DIR, "wp"), { recursive: true });
  ddev("start", "-y");
  if (!existsSync(join(SITE_DIR, "wp", "wp-load.php"))) {
    wp("core", "download", "--skip-content");
  }
  try {
    wp("core", "is-installed");
  } catch {
    wp(
      "core",
      "install",
      `--url=https://wpsync-harness.ddev.site`,
      "--title=wpsync harness",
      "--admin_user=admin",
      `--admin_password=${randomBytes(18).toString("base64url")}`,
      "--admin_email=admin@example.test",
      "--skip-email",
    );
    wp("user", "create", "editor", "editor@example.test", "--role=editor");
  }
  // A default theme so the site renders; --skip-content left the themes folder empty.
  try {
    wp("theme", "is-installed", "twentytwentyfive");
  } catch {
    wp("theme", "install", "twentytwentyfive", "--activate");
  }
}

/** Replaces the user's harness Application Passwords with a fresh one and returns "user:pass". */
function freshApplicationPassword(user: string): string {
  const uuids = wp("user", "application-password", "list", user, "--field=uuid").split("\n").filter(Boolean);
  for (const uuid of uuids) wp("user", "application-password", "delete", user, uuid);
  const pass = wp("user", "application-password", "create", user, "contract-tests", "--porcelain");
  return `${user}:${pass}`;
}

export default function setup(project: TestProject): void {
  requireTools();
  installWordPress();

  rmSync(PLUGIN_TARGET, { recursive: true, force: true });
  cpSync(PLUGIN_SOURCE, PLUGIN_TARGET, { recursive: true });
  // Start every run from the state a fresh install leaves: present but inactive.
  try {
    wp("plugin", "deactivate", "wpsync-bridge");
  } catch {
    // Already inactive.
  }

  project.provide("harness", {
    baseUrl: BASE_URL,
    adminAuth: freshApplicationPassword("admin"),
    editorAuth: freshApplicationPassword("editor"),
  });
}
