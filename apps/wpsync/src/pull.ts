import { readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { InfoResponse, ROUTES } from "@wp-dev-automation/protocol";
import { downloadDatabase } from "./db-download";
import { ddevName, ddevSettings, renderDdevConfig } from "./ddev-config";
import { WpsyncError } from "./errors";
import { fetchInto, findCodeDrift, listLocal, listRemote, planSync, removeLocal } from "./file-sync";
import { bytes, count } from "./format";
import { defaultProjectDir, projectAt, requireDocker, type Project, type ProjectFile } from "./project";
import { RestClient } from "./rest-client";
import type { SecretStore } from "./secrets";
import { writeClaudeMd } from "./site-files";
import { discoverSite, siteKey } from "./site";

export interface PullOptions {
  url: string;
  /** Project folder; defaults to ~/wp-sites/<host>. */
  dir?: string;
  /** DDEV project name for a first pull; defaults to one made from the host. */
  name?: string;
  /** Only for local development sites (DDEV); real sites must use HTTPS. */
  allowHttp?: boolean;
  /** Replace git-tracked code with live's copy even when they differ. */
  overwriteCode?: boolean;
  log?: (line: string) => void;
}

export interface PullDeps {
  store: SecretStore;
  now?: () => Date;
}

export interface PullResult {
  projectDir: string;
  localUrl: string;
  firstPull: boolean;
  tables: number;
  rows: number;
  sqlBytes: number;
  filesFetched: number;
  bytesFetched: number;
  filesDeleted: number;
  filesUnchanged: number;
  warnings: string[];
}

/** Database dumps kept in backups/ (the newest ones). */
const KEEP_DUMPS = 5;

/**
 * `wpsync pull <url>`: copy the live site into a local DDEV project, creating the project on
 * the first pull. The live site only ever gets read.
 */
export async function pull(options: PullOptions, deps: PullDeps): Promise<PullResult> {
  const log = options.log ?? (() => {});
  const now = deps.now ?? (() => new Date());
  requireDocker();

  const site = await discoverSite(options.url, { allowHttp: options.allowHttp });
  const connection = await deps.store.get(siteKey(site.homeUrl));
  if (!connection) {
    throw new WpsyncError("not_connected", `wpsync isn't connected to ${site.homeUrl} yet.`, `Run: wpsync connect ${site.homeUrl}`);
  }
  const rest = new RestClient(site, connection.username, connection.applicationPassword);

  return rest.withBridge(async () => {
    const info = await rest.bridge(InfoResponse, ROUTES.info);
    refuseUnsupported(info);

    const project = projectAt(options.dir ?? defaultProjectDir(site.homeUrl));
    const existing = project.exists() ? project.read() : undefined;
    // A folder from `wpsync init` counts as a first pull; it may have been made from the
    // address as typed (say, without www), so it adopts the site's real address.
    const firstPull = !existing || existing.setup === "pending";
    const warnings: string[] = [];
    if (existing && !firstPull && existing.homeUrl !== site.homeUrl) {
      throw new WpsyncError("project_mismatch", `${project.dir} is a copy of ${existing.homeUrl}, not ${site.homeUrl}.`);
    }
    const name = (!firstPull && existing?.ddevName) || options.name || ddevName(site.homeUrl);
    const settings = ddevSettings(info, name);
    const localUrl = `https://${name}.ddev.site`;
    const meta: ProjectFile = {
      ...existing,
      homeUrl: site.homeUrl,
      setup: "ready",
      siteUrl: site.siteUrl,
      ddevName: name,
      localUrl,
      tablePrefix: info.database.tablePrefix,
    };

    if (firstPull) {
      log(`Setting up ${project.dir}`);
      log(`  DDEV: PHP ${settings.phpVersion}, ${settings.webserver}, ${settings.database.type} ${settings.database.version}`);
      project.prepare(meta, renderDdevConfig(settings, site.homeUrl), info.site.name);
    } else {
      warnings.push(...configDrift(project, settings));
    }

    log("Listing the site's files…");
    const remote = await listRemote(rest);
    const local = listLocal(project.wpDir);

    const tracked = project.trackedWpFiles();
    if (tracked.size && !options.overwriteCode) {
      const drift = await findCodeDrift(rest, project.wpDir, tracked, remote);
      if (drift.length) {
        const shown = drift.slice(0, 15).map((path) => `  ${path}`);
        if (drift.length > 15) shown.push(`  …and ${count(drift.length - 15)} more`);
        throw new WpsyncError(
          "code_drift",
          `Code tracked in git differs on the live site, so pulling would overwrite your work:\n${shown.join("\n")}`,
          "Compare the live copies with yours, then pull again with --overwrite-code to take live's, or keep yours and publish them.",
        );
      }
    }
    const plan = planSync(remote, local, options.overwriteCode ? new Set() : tracked);

    const stamp = now().toISOString().replace(/[:.]/g, "-");
    const dump = join(project.backupsDir, `pull-${stamp}.sql.gz`);
    log("Downloading the database…");
    const db = await downloadDatabase(rest, dump, (table, i, total) => log(`  ${i + 1}/${total} ${table}`));
    log(`  ${count(db.tables)} tables, ${count(db.rows)} rows, ${bytes(db.sqlBytes)} of SQL`);
    pruneDumps(project);

    log(`Files: ${count(plan.fetch.length)} to download, ${count(plan.remove.length)} to delete, ${count(plan.unchanged)} unchanged`);
    let lastShown = 0;
    const fetched = await fetchInto(rest, project.wpDir, plan.fetch, (files, total) => {
      if (files - lastShown >= 500) {
        lastShown = files;
        log(`  ${count(files)} files, ${bytes(total)}`);
      }
    });
    removeLocal(project.wpDir, plan.remove);
    if (fetched.vanished.length) warnings.push(`${count(fetched.vanished.length)} files disappeared from live during the pull.`);

    log("Starting DDEV and loading the database…");
    project.ddev(["start", "-y"]);
    setTablePrefix(project, info.database.tablePrefix);
    project.syncFiles();
    project.ddev(["import-db", `--file=${dump}`]);

    log("Switching addresses to the local copy…");
    for (const [from, to] of replacements(site.siteUrl, site.homeUrl, localUrl)) {
      project.wp("search-replace", from, to, "--all-tables-with-prefix", "--precise", "--quiet");
    }
    project.wp("cache", "flush");
    project.wp("rewrite", "flush");

    project.write({
      ...meta,
      lastPull: { at: now().toISOString(), tables: db.tables, rows: db.rows, files: remote.length, bytes: fetched.bytes },
    });
    writeClaudeMd(project.claudeMdPath, info.site.name, {
      status: `pulled from live ${now().toISOString().slice(0, 16).replace("T", " ")} UTC`,
      homeUrl: site.homeUrl,
      localUrl,
      info,
      ddev: {
        phpVersion: settings.phpVersion,
        webserver: settings.webserver,
        database: `${settings.database.type} ${settings.database.version}`,
      },
    });

    return {
      projectDir: project.dir,
      localUrl,
      firstPull,
      tables: db.tables,
      rows: db.rows,
      sqlBytes: db.sqlBytes,
      filesFetched: fetched.files,
      bytesFetched: fetched.bytes,
      filesDeleted: plan.remove.length,
      filesUnchanged: plan.unchanged,
      warnings,
    };
  });
}

function refuseUnsupported(info: InfoResponse): void {
  if (info.site.multisite) {
    throw new WpsyncError("unsupported", "This is a WordPress multisite network, which wpsync doesn't support yet.");
  }
  const inside = relative(info.paths.abspath, info.paths.contentDir);
  if (inside.startsWith("..") || inside.startsWith(sep)) {
    throw new WpsyncError("unsupported", "This site keeps wp-content outside its WordPress folder, which wpsync doesn't support yet.");
  }
}

/** DDEV settings that no longer match live: worth knowing, but changing them is the person's call. */
function configDrift(project: Project, wanted: ReturnType<typeof ddevSettings>): string[] {
  const config = readFileSync(project.ddevConfigPath, "utf8");
  const php = /php_version:\s*"?([\d.]+)"?/.exec(config)?.[1];
  const db = /database:\s*\n\s*type:\s*(\w+)\s*\n\s*version:\s*"?([\d.]+)"?/.exec(config);
  const warnings: string[] = [];
  if (php && php !== wanted.phpVersion) warnings.push(`Live now runs PHP ${wanted.phpVersion}; the local copy uses ${php} (.ddev/config.yaml).`);
  if (db && (db[1] !== wanted.database.type || db[2] !== wanted.database.version)) {
    warnings.push(`Live's database is now ${wanted.database.type} ${wanted.database.version}; the local copy uses ${db[1]} ${db[2]}.`);
  }
  return warnings;
}

/** DDEV's generated wp-config.php assumes the "wp_" table prefix; use live's. */
function setTablePrefix(project: Project, prefix: string): void {
  if (!/^[A-Za-z0-9_]+$/.test(prefix)) throw new WpsyncError("bad_prefix", `The site's table prefix "${prefix}" isn't usable.`);
  const path = join(project.wpDir, "wp-config.php");
  const config = readFileSync(path, "utf8");
  const updated = config.replace(/\$table_prefix\s*=\s*['"][^'"]*['"]\s*;/, `$table_prefix = '${prefix}';`);
  if (updated !== config) writeFileSync(path, updated);
}

/**
 * Search-and-replace pairs that move every live address to the local one: siteurl before home
 * (it's the longer one when WordPress sits in a subfolder), both http:// and https:// (old
 * content often has the http form), and the JSON-escaped form blocks and plugins store.
 */
export function replacements(siteUrl: string, homeUrl: string, localUrl: string): Array<[string, string]> {
  const pairs: Array<[string, string]> = [];
  const add = (live: string) => {
    const url = new URL(live);
    const path = url.pathname.replace(/\/+$/, "");
    for (const scheme of ["https", "http"]) {
      const from = `${scheme}://${url.host}${path}`;
      const to = `${localUrl}${path}`;
      if (pairs.some(([f]) => f === from)) continue;
      pairs.push([from, to]);
      pairs.push([from.replace(/\//g, "\\/"), to.replace(/\//g, "\\/")]);
    }
  };
  add(siteUrl);
  add(homeUrl);
  return pairs.sort((a, b) => b[0].length - a[0].length);
}

function pruneDumps(project: Project): void {
  const dumps = readdirSync(project.backupsDir)
    .filter((name) => /^pull-.*\.sql\.gz$/.test(name))
    .sort()
    .reverse();
  for (const old of dumps.slice(KEEP_DUMPS)) rmSync(join(project.backupsDir, old), { force: true });
}
