import { execFileSync } from "node:child_process";
import { existsSync, rmSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join } from "node:path";
import { WpsyncError } from "./errors";
import { bytes } from "./format";
import { projectAt, requireDocker } from "./project";

/**
 * `wpsync destroy`: delete a site's whole local copy: its DDEV project (containers, database
 * volume, Mutagen sync) and its folder (WordPress files, git history, backups/). The live site,
 * the bridge on it and wpsync's Keychain entry are not touched; `wpsync disconnect` does those.
 *
 * It can't be undone, so the developer confirms three times, in three separate macOS dialogs
 * (the last asks them to type the site's domain). As with publishing, there is no flag or
 * environment variable that skips them; tests pass their own `confirm`.
 */

export interface DestroyRequest {
  host: string;
  dir: string;
  ddevName?: string;
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
}

export async function destroy(
  options: { dir?: string; log?: (line: string) => void },
  deps: { confirm?: DestroyConfirmProvider; ddevDelete?: (dir: string) => void },
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
  const request: DestroyRequest = { host, dir: project.dir, ddevName: meta.ddevName, summary: describe(project.dir, meta.ddevName, hasDdev) };

  for (const step of [1, 2, 3] as const) {
    if (!(await deps.confirm(request, step))) {
      throw new WpsyncError("not_confirmed", `Not confirmed (step ${step} of 3); nothing was deleted.`);
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
  return { dir: project.dir, host, homeUrl: meta.homeUrl, ddevDeleted };
}

/** `ddev delete -Oy`: containers, database volume and Mutagen volume, without a final snapshot. */
function ddevDelete(dir: string): void {
  requireDocker();
  projectAt(dir).ddev(["delete", "--omit-snapshot", "--yes"]);
}

/** The lines the dialogs show: what goes, and anything not yet published or committed. */
function describe(dir: string, ddevName: string | undefined, hasDdev: boolean): string {
  const lines = [`Folder: ${dir}${folderSize(dir)}`];
  if (hasDdev) lines.push(`DDEV project: ${ddevName ?? "(this folder's)"}, with its local database`);
  const changes = uncommittedChanges(dir);
  if (changes > 0) lines.push(`${changes} uncommitted change${changes === 1 ? "" : "s"} in git, which will be lost`);
  if (existsSync(join(dir, "backups"))) lines.push("backups/ (the copies saved before each publish)");
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
