import { existsSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  BASE_URL,
  PUSHED_DDEV_NAME,
  PUSHED_DIR,
  SEED,
  SITE_DIR,
  ddevIn,
  deleteProject,
  freshApplicationPassword,
  installBridge,
  seedSite,
  syncFiles,
  tableChecksumSql,
  wp,
  wpOk,
} from "@wp-dev-automation/test-harness";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { WpsyncError } from "../../src/errors";
import { init } from "../../src/local-commands";
import { pull } from "../../src/pull";
import { finalize, push, rollback } from "../../src/push";
import { RestClient } from "../../src/rest-client";
import { MemoryStore } from "../../src/secrets";
import { discoverSite, siteKey } from "../../src/site";

const HOST = new URL(BASE_URL).host;
const live = (...args: string[]) => wp(...args);
const local = (...args: string[]) => ddevIn(PUSHED_DIR, "wp", ...args);
const query = (run: (...a: string[]) => string, sql: string) => run("db", "query", sql, "--skip-column-names");
const liveFile = (path: string) => join(SITE_DIR, "wp", path);
const localFile = (path: string) => join(PUSHED_DIR, "wp", path);

const store = new MemoryStore();
/** Stands in for the developer confirming in the macOS dialog. */
const yes = async () => true;
const opts = { dir: PUSHED_DIR, allowHttp: true };
const postTitle = (run: (...a: string[]) => string, id: string) => query(run, `SELECT post_title FROM wp_posts WHERE ID = ${id}`);
const stageTables = (kind: "n" | "o" | "d") => query(live, `SELECT COUNT(*) FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME LIKE 'wpsync\\_${kind}\\_%'`);

async function expectCode(promise: Promise<unknown>, code: string): Promise<void> {
  const error = await promise.then(
    () => undefined,
    (e: unknown) => e,
  );
  expect(error, String(error)).toBeInstanceOf(WpsyncError);
  expect((error as WpsyncError).code, (error as Error).message).toBe(code);
}

/** The local edits a team might make: a post retitled, a page added, a file added and one deleted. */
let editedPostId = "";
let livePostId = "";
const NEW_FILE = "wp-content/uploads/pushed-file.txt";
const NEW_PAGE = "Pushed page";

describe("wpsync push, rollback and finalize", () => {
  beforeAll(async () => {
    deleteProject(PUSHED_DIR);
    installBridge();
    // Undo what an earlier run published, so this run starts from the plain seeded site.
    rmSync(liveFile(NEW_FILE), { force: true });
    for (const id of query(live, `SELECT ID FROM wp_posts WHERE post_title = '${NEW_PAGE}'`).split("\n").filter(Boolean)) {
      live("post", "delete", id, "--force");
    }
    seedSite();
    const [username, applicationPassword] = freshApplicationPassword("admin").split(/:(.*)/s) as [string, string];
    store.entries.set(siteKey(BASE_URL), {
      homeUrl: BASE_URL,
      siteUrl: BASE_URL,
      username,
      applicationPassword,
      applicationPasswordUuid: "contract-test",
      applicationPasswordName: "contract-test",
      connectedAt: new Date().toISOString(),
    });
    init(BASE_URL, { dir: PUSHED_DIR, allowHttp: true });
    await pull({ url: BASE_URL, dir: PUSHED_DIR, name: PUSHED_DDEV_NAME, allowHttp: true }, { store });

    editedPostId = query(local, "SELECT ID FROM wp_posts WHERE post_type = 'post' AND post_title = 'Seed post 3'");
    livePostId = query(local, "SELECT ID FROM wp_posts WHERE post_type = 'post' AND post_title = 'Seed post 4'");
    local("post", "update", editedPostId, "--post_title=Seed post 3 (edited locally)");
    local("post", "create", "--post_type=page", `--post_title=${NEW_PAGE}`, "--post_status=publish");
    writeFileSync(localFile(NEW_FILE), "made locally\n");
    rmSync(localFile(SEED.unicodeFile));
    // Protected: a local .htaccess must not reach live.
    writeFileSync(localFile(".htaccess"), "# local only\n");
    // Someone edits live after the pull: the dry run must warn about it.
    await new Promise((resolve) => setTimeout(resolve, 1500));
    live("post", "update", livePostId, "--post_title=Seed post 4 (edited on live)");
  });

  afterAll(() => {
    try {
      ddevIn(PUSHED_DIR, "stop");
    } catch {
      // Already stopped.
    }
  });

  it("dry run: reports what would change, including live's own edits, and changes nothing", async () => {
    const result = await push({ ...opts, dryRun: true }, { store });
    expect(result.applied).toBe(false);
    expect(result.plan.files.upload.map((f) => f.path)).toContain(NEW_FILE);
    expect(result.plan.files.upload.map((f) => f.path)).not.toContain(".htaccess");
    expect(result.plan.files.remove).toContain(SEED.unicodeFile);
    expect(result.plan.liveChanges?.posts.post).toBeGreaterThanOrEqual(1);
    expect(existsSync(liveFile(NEW_FILE))).toBe(false);
    expect(wpOk("plugin", "is-active", "wpsync-bridge")).toBe(false);
  });

  it("changes nothing unless the developer confirms in the dialog", async () => {
    let asked = "";
    const decline = async (request: { host: string; summary: string }) => {
      asked = `${request.host}\n${request.summary}`;
      return false;
    };
    await expectCode(push(opts, { store, confirm: decline }), "not_confirmed");
    expect(asked).toContain(HOST);
    expect(asked).toContain(SEED.unicodeFile);
    expect(existsSync(liveFile(NEW_FILE))).toBe(false);
    await expectCode(push(opts, { store }), "not_confirmed");
  });

  it("publishes: live becomes the local copy, keeps its own config, and still lets wpsync in", async () => {
    const liveConfig = readFileSync(liveFile("wp-config.php"), "utf8");
    const result = await push(opts, { store, confirm: yes });
    expect(result.applied).toBe(true);
    expect(result.checks?.every((c) => c.ok)).toBe(true);
    syncFiles(); // the bridge wrote inside the container

    // Content from the local copy, with live's addresses.
    expect(postTitle(live, editedPostId)).toBe("Seed post 3 (edited locally)");
    expect(postTitle(live, livePostId)).toBe("Seed post 4"); // live's own edit was overwritten
    expect(query(live, `SELECT COUNT(*) FROM wp_posts WHERE post_type = 'page' AND post_title = '${NEW_PAGE}'`)).toBe("1");
    expect(query(live, "SELECT option_value FROM wp_options WHERE option_name = 'home'")).toBe(BASE_URL);
    expect(JSON.parse(live("option", "get", "wpsync_seed_serialized", "--format=json")).url).toBe(`${BASE_URL}/logo.png`);
    const sql = tableChecksumSql("wp_wpsync_composite", ["a", "b", "v"], "a, b");
    expect(query(live, sql)).toBe(query(local, sql));
    const blob = tableChecksumSql("wp_wpsync_blob", ["id", "data", "bin"], "id");
    expect(query(live, blob)).toBe(query(local, blob));
    const binkey = tableChecksumSql("wp_wpsync_binkey", ["k", "v"], "k");
    expect(query(live, binkey)).toBe(query(local, binkey));

    // Files.
    expect(readFileSync(liveFile(NEW_FILE), "utf8")).toBe("made locally\n");
    expect(existsSync(liveFile(SEED.unicodeFile))).toBe(false);
    expect(readFileSync(liveFile("wp-config.php"), "utf8")).toBe(liveConfig);
    expect(existsSync(liveFile(".htaccess")) && readFileSync(liveFile(".htaccess"), "utf8").includes("local only")).toBe(false);

    // The bridge is off again, the site is up, the old version is saved, the key still works.
    expect(wpOk("plugin", "is-active", "wpsync-bridge")).toBe(false);
    expect((await fetch(`${BASE_URL}/`)).status).toBe(200);
    expect(Number(stageTables("o"))).toBeGreaterThan(5);
    expect(stageTables("n")).toBe("0");
    const saved = store.entries.get(siteKey(BASE_URL))!;
    const me = await new RestClient(await discoverSite(BASE_URL, { allowHttp: true }), saved.username, saved.applicationPassword).get("/wp/v2/users/me");
    expect(me.status).toBe(200);

    // A local backup of what was replaced.
    expect(existsSync(join(result.backupDir!, "live.sql.gz"))).toBe(true);
    expect(existsSync(join(result.backupDir!, "files", SEED.unicodeFile))).toBe(true);
  });

  it("won't start another push before this one is finalized or rolled back", async () => {
    await expectCode(push(opts, { store, confirm: yes }), "push_pending");
  });

  it("rolls back: live is exactly as before the push", async () => {
    await rollback(opts, { store, confirm: yes });
    syncFiles();
    expect(postTitle(live, editedPostId)).toBe("Seed post 3");
    expect(postTitle(live, livePostId)).toBe("Seed post 4 (edited on live)");
    expect(query(live, `SELECT COUNT(*) FROM wp_posts WHERE post_type = 'page' AND post_title = '${NEW_PAGE}'`)).toBe("0");
    expect(existsSync(liveFile(NEW_FILE))).toBe(false);
    expect(readFileSync(liveFile(SEED.unicodeFile), "utf8")).toBe("unicode file\n");
    expect(stageTables("o")).toBe("0");
    expect(stageTables("d")).toBe("0");
    expect(wpOk("plugin", "is-active", "wpsync-bridge")).toBe(false);
    expect((await fetch(`${BASE_URL}/`)).status).toBe(200);
    expect(readdirStage()).toEqual([]);
  });

  it("publishes again and finalizes: the saved old version is deleted", async () => {
    const result = await push(opts, { store, confirm: yes });
    expect(result.applied).toBe(true);
    await finalize(opts, { store, confirm: yes });
    expect(postTitle(live, editedPostId)).toBe("Seed post 3 (edited locally)");
    expect(stageTables("o")).toBe("0");
    expect(readdirStage()).toEqual([]);
    expect(JSON.parse(readFileSync(join(PUSHED_DIR, ".wpsync.json"), "utf8")).lastPush.finalized).toBe(true);
    syncFiles();
  });
});

/** wpsync stage folders left in the harness's uploads. */
function readdirStage(): string[] {
  syncFiles();
  const uploads = liveFile("wp-content/uploads");
  return existsSync(uploads) ? readdirSync(uploads).filter((n) => /^wpsync-stage-[a-z0-9]{12}$/.test(n)) : [];
}
