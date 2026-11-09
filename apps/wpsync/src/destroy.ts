import { execFileSync } from "node:child_process";
import { existsSync, rmSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join } from "node:path";
import { WpsyncError } from "./errors";
import type { PreparedDisconnect } from "./connect";
import { bytes } from "./format";
import { projectAt, requireDocker } from "./project";

/**
 * `wpsync destroy`: delete a site's whole local copy: its DDEV project (containers, database
 * volume, Mutagen sync) and its folder (WordPress files, git history, backups/), and remove
 * wpsync from the live site too (the bridge plugin, wpsync's Application Password, its Keychain
 * entry), the same as `wpsync disconnect`. The live site's content is never touched.
 * `--keep-connection` leaves the live side alone (another local copy of the site still uses it).
 *
 * The live connection is checked before the dialogs, so a site that can't be reached, or one
 * where Wordfence blocks Application Passwords, stops it with nothing deleted.
 *
 * It can't be undone, so the developer confirms three times, in three separate macOS dialogs
 * (the last asks them to type the site's domain). As with publishing, there is no flag or
 * environment variable that skips them; tests pass their own `confirm`.
 */

export interface DestroyRequest {
  host: string;
  dir: string;
  ddevName?: string;
  /** wpsync will also be removed from the live site. */
  disconnect: boolean;
  /** What will be deleted, in plain words, for the dialogs. */
  summary: string;
}

/** One of the three confirmations; resolves true only on the developer's explicit yes. */
export type DestroyConfirmProvider = (request: DestroyRequest, step: 1 | 2 | 3) => Promise<boolean>;

export interface DestroyResult {
  dir: string;
  host: string;
  homeUrl: string;
  ddevDeleted: boolean;
  live: LiveOutcome;
}

/** What happened to wpsync on the live site. */
export type LiveOutcome =
  | { status: "kept" }
  | { status: "not-connected" }
  | { status: "removed"; bridgeRemoved: boolean; keyRevoked: boolean }
  | { status: "failed"; message: string };

/** Checks the live connection (null: wpsync has none for this site); see prepareDisconnect. */
export type LiveDisconnect = (homeUrl: string) => Promise<PreparedDisconnect | null>;

export async function destroy(
  options: { dir?: string; keepConnection?: boolean; log?: (line: string) => void },
  deps: { confirm?: DestroyConfirmProvider; ddevDelete?: (dir: string) => void; live?: LiveDisconnect },
): Promise<DestroyResult> {
  const log = options.log ?? (() => {});
  const project = projectAt(options.dir ?? process.cwd());
  if (!project.exists()) throw new WpsyncError("not_a_project", `${project.dir} isn't a wpsync site project (no .wpsync.json there).`);
  const unsafe = new Set(["/", homedir(), dirname(homedir())]);
  if (unsafe.has(project.dir)) throw new WpsyncError("unsafe_folder", `Refusing to delete ${project.dir}.`);
  if (!deps.confirm) throw new WpsyncError("not_confirmed", "Deleting a local copy needs the developer's confirmation.");

  const meta = project.read();
  const host = new URL(meta.homeUrl).host;
  const hasDdev = existsSync(project.ddevConfigPath);

  let prepared: PreparedDisconnect | null = null;
  if (!options.keepConnection && deps.live) {
    log(`Checking wpsync's connection to ${meta.homeUrl}…`);
    prepared = await deps.live(meta.homeUrl);
  }
  const summary = describe(project.dir, meta.ddevName, hasDdev, prepared ? host : undefined);
  const request: DestroyRequest = { host, dir: project.dir, ddevName: meta.ddevName, disconnect: !!prepared, summary };

  for (const step of [1, 2, 3] as const) {
    if (!(await deps.confirm(request, step))) {
      throw new WpsyncError("not_confirmed", `Not confirmed (step ${step} of 3); nothing was deleted.`);
    }
  }

  let live: LiveOutcome = options.keepConnection ? { status: "kept" } : { status: "not-connected" };
  if (prepared) {
    log(`Removing wpsync from ${meta.homeUrl} (bridge plugin and key)…`);
    try {
      const removed = await prepared.remove();
      live = { status: "removed", bridgeRemoved: removed.bridgeRemoved, keyRevoked: removed.keyRevoked };
    } catch (error) {
      // The local copy still goes: the developer confirmed it three times. The message says what's left.
      live = { status: "failed", message: error instanceof Error ? error.message : String(error) };
    }
  }

  let ddevDeleted = false;
  if (hasDdev) {
    log(`Deleting the DDEV project${meta.ddevName ? ` ${meta.ddevName}` : ""} (containers and database)…`);
    (deps.ddevDelete ?? ddevDelete)(project.dir);
    ddevDeleted = true;
  }
  log(`Deleting ${project.dir}…`);
  rmSync(project.dir, { recursive: true, force: true });
  return { dir: project.dir, host, homeUrl: meta.homeUrl, ddevDeleted, live };
}

/** `ddev delete -Oy`: containers, database volume and Mutagen volume, without a final snapshot. */
function ddevDelete(dir: string): void {
  requireDocker();
  projectAt(dir).ddev(["delete", "--omit-snapshot", "--yes"]);
}

/** The lines the dialogs show: what goes, and anything not yet published or committed. */
function describe(dir: string, ddevName: string | undefined, hasDdev: boolean, liveHost: string | undefined): string {
  const lines = [`Folder: ${dir}${folderSize(dir)}`];
  if (hasDdev) lines.push(`DDEV project: ${ddevName ?? "(this folder's)"}, with its local database`);
  const changes = uncommittedChanges(dir);
  if (changes > 0) lines.push(`${changes} uncommitted change${changes === 1 ? "" : "s"} in git, which will be lost`);
  if (existsSync(join(dir, "backups"))) lines.push("backups/ (the copies saved before each publish)");
  if (liveHost) lines.push(`On ${liveHost}: the wpsync bridge plugin and wpsync's key (the site's content stays as it is)`);
  return lines.join("\n");
}

function folderSize(dir: string): string {
  try {
    const kb = Number(execFileSync("du", ["-sk", dir], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).split("\t")[0]);
    return Number.isFinite(kb) ? ` (${bytes(kb * 1024)})` : "";
  } catch {
    return "";
  }
}

function uncommittedChanges(dir: string): number {
  if (!existsSync(join(dir, ".git"))) return 0;
  try {
    return execFileSync("git", ["status", "--porcelain"], { cwd: dir, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] })
      .split("\n")
      .filter(Boolean).length;
  } catch {
    return 0;
  }
}
