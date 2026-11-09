import { closeSync, mkdirSync, openSync, readdirSync, readFileSync, readSync, rmSync, statSync, writeFileSync, writeSync } from "node:fs";
import { dirname, join } from "node:path";
import { PUSH_PROTECTED, isExcluded, type FileEntry } from "@wp-dev-automation/protocol";
import { WpsyncError } from "./errors";
import { BRIDGE_FILES, LOCAL_BRIDGE_FILES } from "./generated/embedded";
import { sameFile, type LocalEntry } from "./file-sync";
import type { Progress } from "./progress";
import type { Project } from "./project";

/** The local half of publishing: what to send, and the two files that carry it. */

export function scratchDir(project: Project): string {
  return join(project.dir, ".wpsync-tmp");
}

/** Paths a push leaves alone on live (the server checks again). */
export function pushProtected(path: string, includeHtaccess: boolean): boolean {
  const patterns = includeHtaccess ? PUSH_PROTECTED.filter((p) => p !== ".htaccess") : PUSH_PROTECTED;
  return isExcluded(path) || isExcluded(path, patterns) || isExcluded(path, ["wp-config-ddev.php"]);
}

export interface PushFilePlan {
  /** Local files that are new or differ from live's. */
  upload: Array<FileEntry>;
  /** Live files the local copy doesn't have. */
  remove: string[];
  uploadBytes: number;
}

export function planPush(remote: FileEntry[], local: Map<string, LocalEntry>, includeHtaccess: boolean): PushFilePlan {
  const remoteByPath = new Map(remote.map((entry) => [entry.path, entry]));
  const plan: PushFilePlan = { upload: [], remove: [], uploadBytes: 0 };
  for (const [path, entry] of local) {
    if (pushProtected(path, includeHtaccess)) continue;
    const live = remoteByPath.get(path);
    if (live && sameFile(live, entry)) continue;
    plan.upload.push({ path, size: entry.size, mtime: entry.mtime });
    plan.uploadBytes += entry.size;
  }
  for (const entry of remote) {
    if (!local.has(entry.path) && !pushProtected(entry.path, includeHtaccess)) plan.remove.push(entry.path);
  }
  plan.upload.sort((a, b) => (a.path < b.path ? -1 : 1));
  plan.remove.sort();
  return plan;
}

/**
 * Writes the files archive: for each file, its header as one line of JSON then its bytes; for
 * each deletion, a delete header. Returns its path and size.
 */
export function writeFilesArchive(project: Project, plan: PushFilePlan): { path: string; bytes: number } {
  const path = join(scratchDir(project), "files.wpa");
  mkdirSync(dirname(path), { recursive: true });
  const out = openSync(path, "w");
  let bytes = 0;
  const write = (data: Buffer) => {
    writeSync(out, data);
    bytes += data.length;
  };
  try {
    for (const entry of plan.upload) {
      const content = readFileSync(join(project.wpDir, entry.path));
      const mtime = Math.floor(statSync(join(project.wpDir, entry.path)).mtimeMs / 1000);
      write(Buffer.from(`${JSON.stringify({ path: entry.path, size: content.length, mtime })}\n`));
      write(content);
    }
    for (const removed of plan.remove) write(Buffer.from(`${JSON.stringify({ path: removed, delete: true })}\n`));
  } finally {
    closeSync(out);
  }
  return { path, bytes };
}

/**
 * Exports the local database for live, without changing the local copy: snapshot it, switch
 * its addresses to live's with WP-CLI (safe for serialized data), export every table under the
 * stage's new prefix with the bridge's own SQL writer, then restore the snapshot.
 */
export async function exportDatabase(
  project: Project,
  newPrefix: string,
  replacements: Array<[string, string]>,
  log: (line: string) => void,
  progress?: Progress,
): Promise<{ path: string; bytes: number; tables: number; rows: number }> {
  const say = (detail: string) => progress?.update({ detail });
  const scratch = scratchDir(project);
  const bridgeDir = join(scratch, "bridge");
  rmSync(bridgeDir, { recursive: true, force: true });
  for (const name of ["includes/protocol.php", "includes/class-wpsync-db.php"]) {
    const target = join(bridgeDir, name);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, BRIDGE_FILES[name]!);
  }
  writeFileSync(join(bridgeDir, "export.php"), LOCAL_BRIDGE_FILES["export.php"]!);
  const output = join(scratch, "db.frames");
  rmSync(output, { force: true });
  project.syncFiles();

  const snapshot = `wpsync-push-${Date.now()}`;
  log("  Saving a snapshot of the local database…");
  progress?.step("saving a snapshot of the local database", { network: false });
  await project.ddevLive(["snapshot", "--name", snapshot], say);
  let result: { tables: number; rows: number };
  try {
    log("  Switching addresses to live's for the export…");
    progress?.step("switching addresses for live", { total: replacements.length, unit: "replacements", network: false });
    for (const [i, [from, to]] of replacements.entries()) {
      progress?.update({ done: i, detail: from });
      await project.wpLive(["search-replace", from, to, "--all-tables-with-prefix", "--precise", "--quiet"]);
    }
    log("  Exporting the database…");
    progress?.step("exporting the local database", { network: false });
    const printed = await project.wpLive(["eval-file", "/var/www/html/.wpsync-tmp/bridge/export.php", "/var/www/html/.wpsync-tmp/db.frames", newPrefix]);
    result = JSON.parse(printed.split("\n").pop() ?? "{}") as { tables: number; rows: number };
  } finally {
    log("  Restoring the local database from the snapshot…");
    progress?.step("restoring the local database", { network: false });
    await project.ddevLive(["snapshot", "restore", snapshot], say);
    removeSnapshot(project, snapshot);
  }
  project.syncFiles();
  let bytes: number;
  try {
    bytes = statSync(output).size;
  } catch {
    throw new WpsyncError("export_failed", "The local database export didn't produce a file.");
  }
  if (!result.tables) throw new WpsyncError("export_failed", "The local database export found no tables.");
  return { path: output, bytes, ...result };
}

function removeSnapshot(project: Project, name: string): void {
  const dir = join(project.dir, ".ddev", "db_snapshots");
  try {
    for (const entry of readdirSync(dir)) if (entry.startsWith(name)) rmSync(join(dir, entry), { recursive: true, force: true });
  } catch {
    // No snapshots folder: nothing to tidy.
  }
}

/** Reads a file in pieces of at most `size` bytes. */
export function* pieces(path: string, size: number): Generator<Buffer> {
  const fd = openSync(path, "r");
  try {
    const buffer = Buffer.alloc(size);
    for (;;) {
      const read = readSync(fd, buffer, 0, size, null);
      if (read === 0) return;
      yield Buffer.from(buffer.subarray(0, read));
    }
  } finally {
    closeSync(fd);
  }
}

/** The address pairs that turn the local copy's URLs back into live's, longest first. */
export function toLiveReplacements(siteUrl: string, homeUrl: string, localUrl: string): Array<[string, string]> {
  const pairs: Array<[string, string]> = [];
  const local = new URL(localUrl);
  const add = (live: string) => {
    const path = new URL(live).pathname.replace(/\/+$/, "");
    const to = live.replace(/\/+$/, "");
    for (const scheme of ["https", "http"]) {
      const from = `${scheme}://${local.host}${path}`;
      if (pairs.some(([f]) => f === from)) continue;
      pairs.push([from, to]);
      pairs.push([from.replace(/\//g, "\\/"), to.replace(/\//g, "\\/")]);
    }
  };
  add(siteUrl);
  add(homeUrl);
  return pairs.sort((a, b) => b[0].length - a[0].length);
}
