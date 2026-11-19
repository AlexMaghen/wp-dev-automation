import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { DEFAULT_SITES_DIR, ProjectFile } from "./project";

/**
 * The developer's local copies, wherever their folders are, so `/wp-dev` can offer "open one of
 * my sites" from any folder (`wpsync sites`). A small list in ~/.wpsync/sites.json: a folder is
 * added when `wpsync init` or a first pull makes it, and removed by `wpsync destroy`. Folders
 * under ~/wp-sites are found even if they were never listed. Holds no secrets.
 *
 * WPSYNC_SITES_FILE moves the list (the tests use a throwaway one).
 */

export interface SiteEntry {
  dir: string;
  homeUrl: string;
  host: string;
  localUrl?: string;
  /** From .wpsync.json alone (nothing is contacted): where the copy stands. */
  state: "setting-up" | "ready" | "publish-pending" | "archived";
  lastPull?: string;
}

export function sitesFile(): string {
  return process.env.WPSYNC_SITES_FILE ?? join(homedir(), ".wpsync", "sites.json");
}

function readList(): string[] {
  try {
    const list = JSON.parse(readFileSync(sitesFile(), "utf8")) as { dirs?: unknown };
    return Array.isArray(list.dirs) ? list.dirs.filter((d): d is string => typeof d === "string") : [];
  } catch {
    return [];
  }
}

function writeList(dirs: string[]): void {
  const file = sitesFile();
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, `${JSON.stringify({ dirs: [...new Set(dirs)].sort() }, null, 2)}\n`);
}

/** Adds a project folder to the list (never throws: the list is a convenience). */
export function rememberSite(dir: string): void {
  try {
    const list = readList();
    const full = resolve(dir);
    if (!list.includes(full)) writeList([...list, full]);
  } catch {
    // A read-only home folder, say: `wpsync sites` then just won't list it.
  }
}

export function forgetSite(dir: string): void {
  try {
    const full = resolve(dir);
    const list = readList();
    if (list.includes(full)) writeList(list.filter((d) => d !== full));
  } catch {
    // As above.
  }
}

/** Every local copy that still exists: the list, plus any folder under ~/wp-sites. */
export function listSites(sitesDir: string = DEFAULT_SITES_DIR): SiteEntry[] {
  const dirs = new Set(readList());
  try {
    for (const name of readdirSync(sitesDir)) dirs.add(join(sitesDir, name));
  } catch {
    // No ~/wp-sites.
  }
  const sites: SiteEntry[] = [];
  for (const dir of dirs) {
    const entry = describeSite(dir);
    if (entry) sites.push(entry);
  }
  return sites.sort((a, b) => a.host.localeCompare(b.host) || a.dir.localeCompare(b.dir));
}

function describeSite(dir: string): SiteEntry | null {
  const metaPath = join(dir, ".wpsync.json");
  if (!existsSync(metaPath)) return null;
  try {
    const meta = ProjectFile.parse(JSON.parse(readFileSync(metaPath, "utf8")));
    const state: SiteEntry["state"] = meta.archived
      ? "archived"
      : meta.setup !== "ready"
        ? "setting-up"
        : meta.lastPush && !meta.lastPush.finalized
          ? "publish-pending"
          : "ready";
    return { dir, homeUrl: meta.homeUrl, host: new URL(meta.homeUrl).host, localUrl: meta.localUrl, state, lastPull: meta.lastPull?.at };
  } catch {
    return null;
  }
}
