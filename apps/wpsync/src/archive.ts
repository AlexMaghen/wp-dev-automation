import { createHash } from "node:crypto";
import { createReadStream, existsSync, mkdirSync, rmSync, statSync } from "node:fs";
import { join } from "node:path";
import { createInterface } from "node:readline";
import { createGunzip } from "node:zlib";
import { WpsyncError } from "./errors";
import { bytes, count } from "./format";
import { Progress } from "./progress";
import { projectAt, requireDocker, type Project, type ProjectFile } from "./project";

/**
 * `wpsync archive` and `wpsync unarchive`: park a local copy that isn't being worked on, giving
 * back the disk space it holds in Docker, and bring it back later exactly as it was.
 *
 * Everything a local copy has outside Docker (WordPress files in wp/, git, backups/, the DDEV
 * config) already lives in its folder on this Mac. Inside Docker there are only its containers,
 * its database volume and a Mutagen copy of the files. So archive:
 *
 *   1. starts DDEV and flushes Mutagen, so files WordPress wrote inside the container (uploads,
 *      plugins installed in the local wp-admin) are in the folder;
 *   2. exports the database to backups/archive.sql.gz and checks it (complete gzip, the dump's
 *      end marker, one CREATE TABLE per table) before anything is deleted;
 *   3. deletes the DDEV project (`ddev delete --omit-snapshot`): containers and volumes go, the
 *      folder stays;
 *   4. notes the archive in .wpsync.json (file, size, sha256, table count).
 *
 * Unarchive starts DDEV again (a fresh, empty database; Mutagen copies the files in), checks the
 * file's sha256, imports it, checks the table count, and deletes the file. Nothing on the live
 * site is touched by either.
 *
 * `--images` (archive only) also deletes DDEV's shared Docker images, but only when no other
 * DDEV project exists on this Mac; they download again (a few GB) at the next unarchive or pull.
 */

/** Where the archived database goes; backups/ is git-ignored (it holds users' details). */
export const ARCHIVE_FILE = join("backups", "archive.sql.gz");

/** Runs a ddev command in the project, reporting its output lines. */
export type DdevRunner = (args: string[], onLine?: (line: string) => void) => Promise<string>;

export interface ArchiveDeps {
  /** Defaults to the real ddev; tests pass a fake. */
  ddev?: DdevRunner;
  /** Docker must be running (skipped in tests). */
  requireDocker?: () => void;
  now?: () => Date;
}

export interface ArchiveResult {
  file: string;
  bytes: number;
  tables: number;
  imagesDeleted: boolean | "other-projects";
}

export interface UnarchiveResult {
  localUrl: string;
  tables: number;
}

export async function archive(options: { dir?: string; images?: boolean; log?: (line: string) => void }, deps: ArchiveDeps = {}): Promise<ArchiveResult> {
  const log = options.log ?? (() => {});
  const { project, meta } = openReady(options.dir);
  if (meta.archived) {
    throw new WpsyncError("already_archived", `The local copy of ${host(meta)} is already archived (${meta.archived.at.slice(0, 10)}).`, "To bring it back: wpsync unarchive");
  }
  if (!existsSync(project.ddevConfigPath)) throw new WpsyncError("not_pulled", "This project has no DDEV setup to archive.");
  (deps.requireDocker ?? requireDocker)();
  const ddev = deps.ddev ?? ((args, onLine) => project.ddevLive(args, onLine));
  const file = join(project.dir, ARCHIVE_FILE);

  const progress = new Progress(log).start();
  const say = (detail: string) => progress.update({ detail });
  try {
    log(`Archiving the local copy of ${host(meta)}…`);
    progress.step("starting DDEV", { network: false });
    await ddev(["start", "-y"], say);
    progress.step("copying files out of DDEV", { network: false });
    await ddev(["mutagen", "sync"], say).catch(() => {
      // Mutagen isn't in use: the container writes straight into the folder.
    });

    progress.step("exporting the database", { network: false });
    const tables = await tableCount(ddev);
    mkdirSync(join(project.dir, "backups"), { recursive: true });
    rmSync(file, { force: true });
    await ddev(["export-db", `--file=${file}`, "--gzip=true"], say);

    progress.step("checking the export", { network: false });
    const check = await checkDump(file);
    if (!check.complete || check.createTables !== tables) {
      throw new WpsyncError(
        "archive_check_failed",
        `The database export doesn't look complete (${check.createTables} of ${tables} tables${check.complete ? "" : ", no end marker"}), so nothing was deleted.`,
        "Run wpsync archive again; if it keeps failing, check the disk isn't full.",
      );
    }
    const archived = { at: (deps.now?.() ?? new Date()).toISOString(), file: ARCHIVE_FILE, bytes: statSync(file).size, sha256: await sha256(file), tables };
    // Noted before DDEV is deleted, so an interruption from here on still knows where the database is.
    project.write({ ...meta, archived });

    log("Deleting the DDEV project (containers and database volume; the folder stays)…");
    progress.step("deleting the DDEV project", { network: false });
    await ddev(["delete", "--omit-snapshot", "--yes"], say);

    let imagesDeleted: ArchiveResult["imagesDeleted"] = false;
    if (options.images) {
      const others = JSON.parse((await ddev(["list", "--json-output"]).catch(() => "")) || "{}")?.raw ?? [];
      if (Array.isArray(others) && others.length > 0) {
        imagesDeleted = "other-projects";
      } else {
        progress.step("deleting DDEV's Docker images", { network: false });
        await ddev(["poweroff"], say);
        await ddev(["delete", "images", "--yes"], say);
        imagesDeleted = true;
      }
    }
    return { file, bytes: archived.bytes, tables, imagesDeleted };
  } finally {
    progress.stop();
  }
}

export async function unarchive(options: { dir?: string; log?: (line: string) => void }, deps: ArchiveDeps = {}): Promise<UnarchiveResult> {
  const log = options.log ?? (() => {});
  const { project, meta } = openReady(options.dir);
  const archived = meta.archived;
  if (!archived) throw new WpsyncError("not_archived", `The local copy of ${host(meta)} isn't archived.`);
  const file = join(project.dir, archived.file);
  if (!existsSync(file)) {
    throw new WpsyncError(
      "archive_missing",
      `The archived database ${file} is missing, so the local copy can't be restored.`,
      `To make a fresh copy from live instead: wpsync pull ${meta.homeUrl} --dir ${project.dir} (after removing "archived" from .wpsync.json).`,
    );
  }
  if ((await sha256(file)) !== archived.sha256) {
    throw new WpsyncError("archive_corrupt", `The archived database ${file} has changed since it was archived, so it isn't loaded.`);
  }
  (deps.requireDocker ?? requireDocker)();
  const ddev = deps.ddev ?? ((args, onLine) => project.ddevLive(args, onLine));

  const progress = new Progress(log).start();
  const say = (detail: string) => progress.update({ detail });
  try {
    log(`Restoring the local copy of ${host(meta)} (DDEV may first download its images: a few GB)…`);
    progress.step("starting DDEV", { network: false });
    await ddev(["start", "-y"], say);
    progress.step("copying files into DDEV", { network: false });
    await ddev(["mutagen", "sync"], say).catch(() => {
      // Mutagen isn't in use.
    });
    progress.step("loading the database", { network: false });
    await ddev(["import-db", `--file=${file}`], say);
    const tables = await tableCount(ddev);
    if (tables !== archived.tables) {
      throw new WpsyncError(
        "unarchive_check_failed",
        `The restored database has ${tables} tables, but ${archived.tables} were archived. The archive file is kept.`,
        "Run wpsync unarchive again.",
      );
    }
    await ddev(["wp", "cache", "flush"]).catch(() => "");
    const { archived: _done, ...rest } = meta;
    project.write(rest);
    rmSync(file, { force: true });
    return { localUrl: meta.localUrl ?? "", tables };
  } finally {
    progress.stop();
  }
}

/** Summary lines for the command line. */
export function describeArchive(result: ArchiveResult, project: string): string {
  const lines = [
    `Archived ${project}: its database is in ${result.file} (${bytes(result.bytes)}, ${count(result.tables)} tables) and its DDEV containers and volumes are deleted.`,
    "The folder (WordPress files, git, backups/) stays where it is. To work on it again: wpsync unarchive",
  ];
  if (result.imagesDeleted === true) lines.push("DDEV's Docker images were deleted too; they download again at the next unarchive or pull.");
  if (result.imagesDeleted === "other-projects") lines.push("DDEV's Docker images were kept: other DDEV projects on this Mac still use them.");
  return lines.join("\n");
}

function openReady(dir: string | undefined): { project: Project; meta: ProjectFile } {
  const project = projectAt(dir ?? process.cwd());
  if (!project.exists()) throw new WpsyncError("not_a_project", `${project.dir} isn't a wpsync site project.`, "Run this in the site's folder, or pass --dir.");
  const meta = project.read();
  if (meta.setup !== "ready") throw new WpsyncError("not_pulled", "This project hasn't been pulled yet, so there's nothing to archive.");
  return { project, meta };
}

function host(meta: ProjectFile): string {
  return new URL(meta.homeUrl).host;
}

async function tableCount(ddev: DdevRunner): Promise<number> {
  const out = await ddev(["mysql", "-N", "-B", "-e", "SELECT COUNT(*) FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_TYPE = 'BASE TABLE'"]);
  const n = Number(out.trim().split("\n").pop());
  if (!Number.isInteger(n)) throw new WpsyncError("ddev_failed", `Couldn't count the database's tables (got "${out.trim().slice(0, 80)}").`);
  return n;
}

/** Reads a gzipped dump through: is the gzip whole, did the dump finish, how many tables does it create? */
export async function checkDump(file: string): Promise<{ complete: boolean; createTables: number }> {
  let createTables = 0;
  let last = "";
  try {
    const lines = createInterface({ input: createReadStream(file).pipe(createGunzip()), crlfDelay: Infinity });
    for await (const line of lines) {
      if (line.startsWith("CREATE TABLE `")) createTables++;
      if (line.trim()) last = line;
    }
  } catch {
    return { complete: false, createTables };
  }
  return { complete: /^-- Dump completed/.test(last), createTables };
}

async function sha256(file: string): Promise<string> {
  const hash = createHash("sha256");
  for await (const chunk of createReadStream(file)) hash.update(chunk as Buffer);
  return hash.digest("hex");
}
