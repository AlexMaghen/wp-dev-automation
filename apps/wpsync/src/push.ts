import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";
import {
  ChangesResponse,
  InfoResponse,
  PUSH_CHUNK_BYTES,
  ROUTES,
  StageBeginResponse,
  StageChunkResponse,
  StageProgress,
  type StagePart,
} from "@wp-dev-automation/protocol";
import { downloadDatabase } from "./db-download";
import { WpsyncError } from "./errors";
import { fetchInto, listLocal, listRemote } from "./file-sync";
import { bytes, count } from "./format";
import { http, parseJson } from "./http";
import { projectAt, requireDocker, type Project, type ProjectFile } from "./project";
import { exportDatabase, pieces, planPush, scratchDir, toLiveReplacements, writeFilesArchive, type PushFilePlan } from "./push-local";
import { RestClient } from "./rest-client";
import type { SecretStore } from "./secrets";
import { discoverSite, siteKey, type Site } from "./site";

export interface PushOptions {
  /** Project folder; defaults to the current folder. */
  dir?: string;
  /** Show what would change, change nothing. */
  dryRun?: boolean;
  /** The live site's host name, typed to confirm a real push. */
  confirm?: string;
  includeHtaccess?: boolean;
  /** Only for local development sites (DDEV); real sites must use HTTPS. */
  allowHttp?: boolean;
  log?: (line: string) => void;
}

export interface PushDeps {
  store: SecretStore;
  now?: () => Date;
}

export interface PluginChange {
  name: string;
  live?: string;
  local?: string;
}

export interface PushPlan {
  homeUrl: string;
  host: string;
  lastPull?: string;
  /** Edits on live since the last pull, which publishing overwrites. */
  liveChanges: ChangesResponse | null;
  files: PushFilePlan;
  plugins: { added: PluginChange[]; removed: PluginChange[]; updated: PluginChange[] };
  theme: { live: string; local: string };
  database: { tables: number; bytes: number };
}

export interface PushResult {
  plan: PushPlan;
  /** False for a dry run. */
  applied: boolean;
  stageId?: string;
  checks?: PageCheck[];
  skipped?: string[];
  backupDir?: string;
}

export interface PageCheck {
  url: string;
  status: number;
  ok: boolean;
}

interface Context {
  project: Project;
  meta: ProjectFile;
  site: Site;
  rest: RestClient;
  log: (line: string) => void;
}

async function open(options: { dir?: string; allowHttp?: boolean; log?: (line: string) => void }, store: SecretStore): Promise<Context> {
  const project = projectAt(options.dir ?? process.cwd());
  if (!project.exists()) {
    throw new WpsyncError("not_a_project", `${project.dir} isn't a wpsync site project.`, "Run this in the site's folder, or pass --dir.");
  }
  const meta = project.read();
  if (meta.setup !== "ready" || !meta.localUrl || !meta.siteUrl) {
    throw new WpsyncError("not_pulled", "This project hasn't been pulled yet, so there's nothing to publish.", `Run: wpsync pull ${meta.homeUrl}`);
  }
  const site = await discoverSite(meta.homeUrl, { allowHttp: options.allowHttp });
  const connection = await store.get(siteKey(site.homeUrl));
  if (!connection) {
    throw new WpsyncError("not_connected", `wpsync isn't connected to ${site.homeUrl}.`, `Run: wpsync connect ${site.homeUrl}`);
  }
  return {
    project,
    meta,
    site,
    rest: new RestClient(site, connection.username, connection.applicationPassword),
    log: options.log ?? (() => {}),
  };
}

/** Code under wp/ that git tracks but isn't committed. */
function uncommittedCode(project: Project): string[] {
  try {
    const out = execFileSync("git", ["-C", project.dir, "status", "--porcelain", "--untracked-files=no", "--", "wp"], { encoding: "utf8" });
    return out.split("\n").filter(Boolean).map((line) => line.slice(3));
  } catch {
    return [];
  }
}

function pluginSlug(file: string): string {
  return file.includes("/") ? file.split("/")[0]! : file.replace(/\.php$/, "");
}

function comparePlugins(info: InfoResponse, project: Project): PushPlan["plugins"] {
  const local = JSON.parse(project.wp("plugin", "list", "--format=json", "--fields=name,status,version")) as Array<{
    name: string;
    status: string;
    version: string;
  }>;
  const liveBySlug = new Map(info.plugins.filter((p) => !p.file.startsWith("wpsync-bridge/")).map((p) => [pluginSlug(p.file), p]));
  const localBySlug = new Map(local.filter((p) => p.status !== "must-use" && p.status !== "dropin").map((p) => [p.name, p]));
  const result: PushPlan["plugins"] = { added: [], removed: [], updated: [] };
  for (const [slug, plugin] of localBySlug) {
    const live = liveBySlug.get(slug);
    if (!live) result.added.push({ name: slug, local: plugin.version });
    else if (live.version !== plugin.version) result.updated.push({ name: slug, live: live.version, local: plugin.version });
  }
  for (const [slug, plugin] of liveBySlug) if (!localBySlug.has(slug)) result.removed.push({ name: slug, live: plugin.version });
  return result;
}

async function makePlan(ctx: Context, info: InfoResponse, includeHtaccess: boolean): Promise<PushPlan> {
  const { project, meta, rest, log } = ctx;
  // Live edits since live last matched the local copy: the last pull, or the last push if later.
  const since = [meta.lastPull?.at, meta.lastPush?.at].filter((t): t is string => !!t).sort().pop();
  const liveChanges = since ? await rest.bridge(ChangesResponse, ROUTES.changes, { query: { since } }) : null;
  log("Comparing files with live…");
  const files = planPush(await listRemote(rest), listLocal(project.wpDir), includeHtaccess);
  const [tables = "0", size = "0"] = project
    .wp(
      "db",
      "query",
      "SELECT COUNT(*), COALESCE(SUM(DATA_LENGTH + INDEX_LENGTH), 0) FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE()",
      "--skip-column-names",
    )
    .split(/\s+/);
  const localTheme = project.wp("option", "get", "stylesheet");
  return {
    homeUrl: ctx.site.homeUrl,
    host: new URL(ctx.site.homeUrl).host,
    lastPull: meta.lastPull?.at,
    liveChanges,
    files,
    plugins: comparePlugins(info, project),
    theme: { live: info.theme.stylesheet, local: localTheme },
    database: { tables: Number(tables), bytes: Number(size) },
  };
}

/**
 * `wpsync push`: replace the live site with the local copy. Without --confirm (or with
 * --dry-run) it only reports what would change.
 */
export async function push(options: PushOptions, deps: PushDeps): Promise<PushResult> {
  const ctx = await open(options, deps.store);
  const { project, meta, site, rest, log } = ctx;
  const now = deps.now ?? (() => new Date());
  const includeHtaccess = !!options.includeHtaccess;
  requireDocker();

  if (meta.lastPush && !meta.lastPush.finalized) {
    throw new WpsyncError(
      "push_pending",
      "The last push is still waiting to be finalized or rolled back.",
      "Check the live site, then run wpsync finalize (keep it) or wpsync rollback (undo it).",
    );
  }
  const dirty = uncommittedCode(project);
  if (dirty.length && !options.dryRun) {
    throw new WpsyncError("uncommitted_code", `Commit your code before publishing:\n${dirty.map((p) => `  ${p}`).join("\n")}`);
  }
  project.ddev(["start", "-y"]);

  return rest.withBridge(async () => {
    const info = await rest.bridge(InfoResponse, ROUTES.info);
    if (!info.capabilities.writable.abspath || !info.capabilities.writable.contentDir) {
      throw new WpsyncError("not_writable", "WordPress can't write its own files on this host, so wpsync can't publish to it.");
    }
    const plan = await makePlan(ctx, info, includeHtaccess);
    if (options.dryRun || !options.confirm) return { plan, applied: false };

    if (options.confirm.toLowerCase() !== plan.host.toLowerCase()) {
      throw new WpsyncError("confirm_mismatch", `--confirm must be the live site's host, ${plan.host}.`);
    }

    // 1. Back up what this push replaces: live's database, and live's copies of every file
    //    that will be overwritten or deleted.
    const stamp = now().toISOString().replace(/[:.]/g, "-");
    const backupDir = join(project.backupsDir, `push-${stamp}`);
    mkdirSync(backupDir, { recursive: true });
    log("Backing up live's database…");
    await downloadDatabase(rest, join(backupDir, "live.sql.gz"));
    const remotePaths = new Set((await listRemote(rest)).map((e) => e.path));
    const touched = [...plan.files.upload.filter((e) => remotePaths.has(e.path)).map((e) => e.path), ...plan.files.remove];
    if (touched.length) {
      log(`Backing up ${count(touched.length)} live files this push replaces or deletes…`);
      const live = (await listRemote(rest)).filter((e) => touched.includes(e.path));
      await fetchInto(rest, join(backupDir, "files"), live);
    }

    // 2. Open the stage, then build and upload the database and the files.
    const stage = await rest.bridge(StageBeginResponse, ROUTES.stageBegin, {
      method: "POST",
      body: { dbBytes: plan.database.bytes, filesBytes: plan.files.uploadBytes, includeHtaccess },
    });
    let applied = false;
    try {
      log("Preparing the local copy for live…");
      const db = exportDatabase(project, stage.newPrefix, toLiveReplacements(meta.siteUrl!, meta.homeUrl, meta.localUrl!), log);
      const archive = writeFilesArchive(project, plan.files);
      const piece = Math.max(16 * 1024, Math.min(PUSH_CHUNK_BYTES, stage.chunkBytes - 4096));
      log(`Uploading the database (${bytes(db.bytes)})…`);
      const dbChunks = await upload(rest, stage.stageId, "db", db.path, piece);
      log(`Uploading ${count(plan.files.upload.length)} files (${bytes(archive.bytes)})…`);
      const fileChunks = await upload(rest, stage.stageId, "files", archive.path, piece);

      // 3. Apply, step by step.
      log("Publishing…");
      const result = await runSteps(rest, ROUTES.stageApply, { stage: stage.stageId, chunks: { db: dbChunks, files: fileChunks } }, log);
      if (result.step !== "applied") {
        log(`Publishing failed: ${result.error ?? "unknown error"}. Rolling back…`);
        await runSteps(rest, ROUTES.rollback, { stage: stage.stageId }, log);
        throw new WpsyncError("push_failed", `Publishing failed and live was put back as it was: ${result.error ?? "unknown error"}`);
      }
      applied = true;

      // 4. Check the live site works; undo if it doesn't.
      log("Checking the live site…");
      const checks = await checkPages(site);
      const broken = checks.filter((c) => !c.ok);
      if (broken.length) {
        log("Live pages aren't loading properly. Rolling back…");
        await runSteps(rest, ROUTES.rollback, { stage: stage.stageId }, log);
        throw new WpsyncError(
          "push_broke_site",
          `The published site didn't load properly, so wpsync put the old one back:\n${broken.map((c) => `  ${c.url} (HTTP ${c.status})`).join("\n")}`,
          "Check those pages locally (ddev logs shows PHP errors), fix, and publish again.",
        );
      }
      project.write({ ...meta, lastPush: { at: now().toISOString(), stageId: stage.stageId, finalized: false } });
      return { plan, applied: true, stageId: stage.stageId, checks, skipped: result.skipped, backupDir };
    } catch (error) {
      if (!applied) {
        // Never got as far as changing live: discard the stage. (Failures after changes were
        // already rolled back above.)
        await runSteps(rest, ROUTES.finalize, { stage: stage.stageId }, () => {}).catch(() => {});
      }
      throw error;
    } finally {
      rmSync(scratchDir(project), { recursive: true, force: true });
    }
  });
}

async function upload(rest: RestClient, stage: string, part: StagePart, path: string, size: number): Promise<number> {
  const queue: Array<{ seq: number; data: Buffer }> = [];
  let seq = 0;
  for (const piece of pieces(path, size)) queue.push({ seq: seq++, data: gzipSync(piece) });
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(3, queue.length) }, async () => {
      while (next < queue.length) {
        const { seq: n, data } = queue[next++]!;
        await rest.bridge(StageChunkResponse, ROUTES.stageChunk, {
          method: "PUT",
          query: { stage, part, seq: String(n), sha256: createHash("sha256").update(data).digest("hex") },
          bytes: data,
        });
      }
    }),
  );
  return queue.length;
}

/** Calls an apply/rollback/finalize route until it reports done, printing each new step. */
async function runSteps(rest: RestClient, route: string, body: unknown, log: (line: string) => void): Promise<StageProgress> {
  let last = "";
  for (;;) {
    const progress = await rest.bridge(StageProgress, route, { method: "POST", body });
    const label = progress.progress ? `${progress.step} (${Math.round((100 * progress.progress.done) / Math.max(1, progress.progress.total))}%)` : progress.step;
    if (label !== last) log(`  ${label}`);
    last = label;
    if (progress.done) return progress;
  }
}

/** Loads the home page and a few recent pages and posts; each must answer 200 without a PHP error. */
export async function checkPages(site: Site): Promise<PageCheck[]> {
  const urls = new Set<string>([`${site.homeUrl}/`]);
  for (const [route, perPage] of [["/wp/v2/pages", "2"], ["/wp/v2/posts", "1"]] as const) {
    const response = await http(site.restUrl(route, { per_page: perPage, _fields: "link" })).catch(() => null);
    const list = response?.status === 200 ? parseJson(response.text) : null;
    if (Array.isArray(list)) for (const item of list) if (typeof item?.link === "string") urls.add(item.link);
  }
  const checks: PageCheck[] = [];
  for (const url of urls) {
    const response = await http(url).catch(() => null);
    const status = response?.status ?? 0;
    const broken = !response || /There has been a critical error|Fatal error|Parse error/i.test(response.text);
    checks.push({ url, status, ok: status === 200 && !broken });
  }
  return checks;
}

/** `wpsync rollback`: put live back as it was before the last push. */
export async function rollback(options: { dir?: string; allowHttp?: boolean; log?: (line: string) => void }, deps: PushDeps): Promise<void> {
  const ctx = await open(options, deps.store);
  const push = ctx.meta.lastPush;
  if (!push || push.finalized) throw new WpsyncError("nothing_to_roll_back", "There's no push to roll back (the last one was finalized, or there wasn't one).");
  await ctx.rest.withBridge(async () => {
    const result = await runSteps(ctx.rest, ROUTES.rollback, { stage: push.stageId }, ctx.log);
    if (result.step !== "rolled-back") throw new WpsyncError("rollback_failed", `Rollback stopped: ${result.error ?? "unknown error"}`);
  });
  const { lastPush: _dropped, ...rest } = ctx.meta;
  ctx.project.write(rest);
}

/** `wpsync finalize`: keep the last push, and delete the old version saved on the server. */
export async function finalize(options: { dir?: string; allowHttp?: boolean; log?: (line: string) => void }, deps: PushDeps): Promise<void> {
  const ctx = await open(options, deps.store);
  const push = ctx.meta.lastPush;
  if (!push || push.finalized) throw new WpsyncError("nothing_to_finalize", "There's no push waiting to be finalized.");
  await ctx.rest.withBridge(async () => {
    const result = await runSteps(ctx.rest, ROUTES.finalize, { stage: push.stageId }, ctx.log);
    if (result.step !== "finalized") throw new WpsyncError("finalize_failed", `Finalize stopped: ${result.error ?? "unknown error"}`);
  });
  ctx.project.write({ ...ctx.meta, lastPush: { ...push, finalized: true } });
}
