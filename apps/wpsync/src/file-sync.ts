import { lstatSync, mkdirSync, readdirSync, readFileSync, renameSync, rmSync, utimesSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import {
  FETCH_BATCH_BYTES,
  FETCH_BATCH_FILES,
  FetchedFileHeader,
  FILE_SIZE_HEADER,
  FilesListResponse,
  ROUTES,
  isExcluded,
  isSafeRelativePath,
  type FileEntry,
} from "@wp-dev-automation/protocol";
import { WpsyncError } from "./errors";
import type { RestClient } from "./rest-client";

/**
 * Keeps wp/ in step with the live site's files: lists both sides, fetches what's new or
 * changed (by size and modification time), and deletes what live no longer has.
 */

/** Files DDEV writes locally that a pull must never touch. */
const LOCAL_ONLY = ["wp-config.php", "wp-config-ddev.php"];

const PARALLEL = 4;

export interface LocalEntry {
  size: number;
  mtime: number;
}

/** Every file live has, in path order. */
export async function listRemote(rest: RestClient, onPage: (count: number) => void = () => {}): Promise<FileEntry[]> {
  const entries: FileEntry[] = [];
  let cursor: string | null | undefined;
  do {
    const page = await rest.bridge(FilesListResponse, ROUTES.filesList, { query: cursor ? { cursor } : {} });
    for (const entry of page.entries) {
      if (!isSafeRelativePath(entry.path)) throw new WpsyncError("bad_path", `The site listed an unsafe path: ${entry.path}`);
      entries.push(entry);
    }
    onPage(entries.length);
    if (page.next && page.next === cursor) throw new WpsyncError("paging_stuck", "The bridge kept returning the same files, so wpsync stopped.");
    cursor = page.next;
  } while (cursor);
  return entries;
}

/** Every file in the local wp/ folder, by path relative to it. Symbolic links are skipped. */
export function listLocal(wpDir: string): Map<string, LocalEntry> {
  const out = new Map<string, LocalEntry>();
  const walk = (dir: string, rel: string) => {
    let names: string[];
    try {
      names = readdirSync(dir);
    } catch {
      return;
    }
    for (const name of names) {
      const childRel = rel ? `${rel}/${name}` : name;
      if (isExcluded(childRel) || isExcluded(childRel, LOCAL_ONLY) || name.endsWith(".wpsync-tmp")) continue;
      const full = join(dir, name);
      const stat = lstatSync(full);
      if (stat.isSymbolicLink()) continue;
      if (stat.isDirectory()) walk(full, childRel);
      else if (stat.isFile()) out.set(childRel, { size: stat.size, mtime: Math.floor(stat.mtimeMs / 1000) });
    }
  };
  walk(wpDir, "");
  return out;
}

export function sameFile(remote: FileEntry, local: LocalEntry | undefined): boolean {
  return !!local && local.size === remote.size && Math.abs(local.mtime - remote.mtime) <= 1;
}

export interface SyncPlan {
  fetch: FileEntry[];
  remove: string[];
  unchanged: number;
}

/** What to fetch and delete. Paths in `keep` (git-tracked code) are left alone either way. */
export function planSync(remote: FileEntry[], local: Map<string, LocalEntry>, keep: Set<string>): SyncPlan {
  const plan: SyncPlan = { fetch: [], remove: [], unchanged: 0 };
  const remotePaths = new Set<string>();
  for (const entry of remote) {
    remotePaths.add(entry.path);
    if (keep.has(entry.path)) continue;
    if (sameFile(entry, local.get(entry.path))) plan.unchanged++;
    else plan.fetch.push(entry);
  }
  for (const path of local.keys()) {
    if (!remotePaths.has(path) && !keep.has(path)) plan.remove.push(path);
  }
  return plan;
}

/** Splits a fetch stream (header line + bytes, repeated) into files. */
export function parseFetchStream(stream: Buffer): Array<{ header: FetchedFileHeader; content: Buffer | null }> {
  const files: Array<{ header: FetchedFileHeader; content: Buffer | null }> = [];
  let at = 0;
  while (at < stream.length) {
    const newline = stream.indexOf(0x0a, at);
    if (newline < 0) throw new WpsyncError("bad_stream", "The site's file stream ended in the middle of a header.");
    const header = FetchedFileHeader.parse(JSON.parse(stream.subarray(at, newline).toString("utf8")));
    at = newline + 1;
    if (header.missing) {
      files.push({ header, content: null });
      continue;
    }
    if (at + header.size > stream.length) throw new WpsyncError("bad_stream", `The site's file stream was cut off in ${header.path}.`);
    files.push({ header, content: stream.subarray(at, at + header.size) });
    at += header.size;
  }
  return files;
}

/** Groups small files into batches; files too big for a batch are read by range on their own. */
function batches(entries: FileEntry[]): { small: FileEntry[][]; large: FileEntry[] } {
  const small: FileEntry[][] = [];
  const large: FileEntry[] = [];
  let current: FileEntry[] = [];
  let bytes = 0;
  for (const entry of entries) {
    if (entry.size > FETCH_BATCH_BYTES) {
      large.push(entry);
      continue;
    }
    if (current.length && (bytes + entry.size > FETCH_BATCH_BYTES || current.length >= FETCH_BATCH_FILES)) {
      small.push(current);
      current = [];
      bytes = 0;
    }
    current.push(entry);
    bytes += entry.size;
  }
  if (current.length) small.push(current);
  return { small, large };
}

async function fetchBatch(rest: RestClient, paths: string[]) {
  const response = await rest.bridgeRaw(ROUTES.filesFetch, { method: "POST", body: { paths } });
  return parseFetchStream(response.bytes);
}

async function readLarge(rest: RestClient, path: string): Promise<{ content: Buffer; size: number } | null> {
  const parts: Buffer[] = [];
  let offset = 0;
  let size = Number.POSITIVE_INFINITY;
  while (offset < size) {
    const response = await rest
      .bridgeRaw(ROUTES.filesRead, { query: { path, offset: String(offset), length: String(FETCH_BATCH_BYTES) } })
      .catch((error: unknown) => {
        if (error instanceof WpsyncError && /HTTP 404/.test(error.message)) return null;
        throw error;
      });
    if (!response) return null;
    size = Number(response.headers.get(FILE_SIZE_HEADER) ?? "0");
    if (response.bytes.length === 0) break;
    parts.push(response.bytes);
    offset += response.bytes.length;
  }
  return { content: Buffer.concat(parts), size: offset };
}

function writeLocal(wpDir: string, path: string, content: Buffer, mtime: number): void {
  const target = join(wpDir, path);
  mkdirSync(dirname(target), { recursive: true });
  const temp = `${target}.wpsync-tmp`;
  writeFileSync(temp, content);
  renameSync(temp, target);
  utimesSync(target, mtime, mtime);
}

async function inParallel<T>(items: T[], work: (item: T) => Promise<void>): Promise<void> {
  let next = 0;
  const runners = Array.from({ length: Math.min(PARALLEL, items.length) }, async () => {
    while (next < items.length) {
      const item = items[next++]!;
      await work(item);
    }
  });
  await Promise.all(runners);
}

export interface FetchStats {
  files: number;
  bytes: number;
  /** Files that vanished from live between listing and fetching. */
  vanished: string[];
}

/** Downloads the given files into wp/, keeping live's modification times. */
export async function fetchInto(
  rest: RestClient,
  wpDir: string,
  entries: FileEntry[],
  onProgress: (files: number, bytes: number) => void = () => {},
): Promise<FetchStats> {
  const stats: FetchStats = { files: 0, bytes: 0, vanished: [] };
  const { small, large } = batches(entries);
  const done = (bytes: number) => {
    stats.files++;
    stats.bytes += bytes;
    onProgress(stats.files, stats.bytes);
  };

  await inParallel(small, async (batch) => {
    for (const { header, content } of await fetchBatch(rest, batch.map((e) => e.path))) {
      if (header.missing || !content) {
        stats.vanished.push(header.path);
        continue;
      }
      writeLocal(wpDir, header.path, content, header.mtime);
      done(content.length);
    }
  });

  for (const entry of large) {
    const result = await readLarge(rest, entry.path);
    if (!result) {
      stats.vanished.push(entry.path);
      continue;
    }
    writeLocal(wpDir, entry.path, result.content, entry.mtime);
    done(result.content.length);
  }
  return stats;
}

/** Reads files from live into memory (for comparing git-tracked code). Missing files map to null. */
export async function fetchContents(rest: RestClient, entries: FileEntry[]): Promise<Map<string, Buffer | null>> {
  const out = new Map<string, Buffer | null>();
  const { small, large } = batches(entries);
  for (const batch of small) {
    for (const { header, content } of await fetchBatch(rest, batch.map((e) => e.path))) out.set(header.path, content);
  }
  for (const entry of large) out.set(entry.path, (await readLarge(rest, entry.path))?.content ?? null);
  return out;
}

export function removeLocal(wpDir: string, paths: string[]): void {
  for (const path of paths) rmSync(join(wpDir, path), { force: true });
}

/**
 * Git-tracked files whose live copy differs from the local one (or that live no longer has):
 * someone changed code on the live site that the team also has in git.
 */
export async function findCodeDrift(rest: RestClient, wpDir: string, tracked: Set<string>, remote: FileEntry[]): Promise<string[]> {
  if (tracked.size === 0) return [];
  const remoteByPath = new Map(remote.map((entry) => [entry.path, entry]));
  const drift: string[] = [];
  const toCompare: FileEntry[] = [];
  for (const path of tracked) {
    const entry = remoteByPath.get(path);
    if (entry) toCompare.push(entry);
    else drift.push(`${path} (not on the live site)`);
  }
  const live = await fetchContents(rest, toCompare);
  for (const entry of toCompare) {
    let local: Buffer | null = null;
    try {
      local = readFileSync(join(wpDir, entry.path));
    } catch {
      // Tracked but deleted locally: compare as missing.
    }
    const remoteContent = live.get(entry.path);
    if (!local || !remoteContent || !local.equals(remoteContent)) drift.push(entry.path);
  }
  return drift.sort();
}
