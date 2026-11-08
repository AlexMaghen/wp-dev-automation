import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { appendFileSync, existsSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  BASE_URL,
  PULLED_DDEV_NAME,
  PULLED_DIR,
  SEED,
  bigFileContent,
  ddevIn,
  freshApplicationPassword,
  installBridge,
  removeSiteFile,
  seedSite,
  syncFiles,
  tableChecksumSql,
  wp,
  writeSiteFile,
} from "@wp-dev-automation/test-harness";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { WpsyncError } from "../../src/errors";
import { pull } from "../../src/pull";
import { MemoryStore } from "../../src/secrets";
import { siteKey } from "../../src/site";

const LOCAL_URL = `https://${PULLED_DDEV_NAME}.ddev.site`;
const pulledWp = (path: string) => join(PULLED_DIR, "wp", path);

/** WP-CLI on the live side (the harness) and on the pulled copy. */
const live = (...args: string[]) => wp(...args);
const copy = (...args: string[]) => ddevIn(PULLED_DIR, "wp", ...args);
const query = (run: (...a: string[]) => string, sql: string) => run("db", "query", sql, "--skip-column-names");

const store = new MemoryStore();
const options = (extra: { overwriteCode?: boolean } = {}) => ({
  url: BASE_URL,
  dir: PULLED_DIR,
  name: PULLED_DDEV_NAME,
  allowHttp: true,
  ...extra,
});

function sha256(data: Buffer): string {
  return createHash("sha256").update(data).digest("hex");
}

async function expectCode(promise: Promise<unknown>, code: string): Promise<WpsyncError> {
  const error = await promise.then(
    () => undefined,
    (e: unknown) => e,
  );
  expect(error).toBeInstanceOf(WpsyncError);
  expect((error as WpsyncError).code, (error as Error).message).toBe(code);
  return error as WpsyncError;
}

describe("wpsync pull", () => {
  beforeAll(() => {
    if (existsSync(PULLED_DIR)) {
      try {
        ddevIn(PULLED_DIR, "delete", "-Oy");
      } catch {
        // Never started.
      }
      rmSync(PULLED_DIR, { recursive: true, force: true });
    }
    installBridge();
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
  });

  afterAll(() => {
    try {
      ddevIn(PULLED_DIR, "stop");
    } catch {
      // Already stopped.
    }
  });

  it("refuses a site wpsync isn't connected to", async () => {
    await expectCode(pull(options(), { store: new MemoryStore() }), "not_connected");
  });

  it("makes a working local copy on the first pull", async () => {
    const result = await pull(options(), { store });
    expect(result.firstPull).toBe(true);
    expect(result.localUrl).toBe(LOCAL_URL);
    expect(result.filesFetched).toBeGreaterThan(1000);

    // The project.
    expect(readFileSync(join(PULLED_DIR, ".ddev", "config.yaml"), "utf8")).toMatch(/type: mariadb\n\s+version: "11.4"/);
    expect(JSON.parse(readFileSync(join(PULLED_DIR, ".wpsync.json"), "utf8")).homeUrl).toBe(BASE_URL);
    expect(existsSync(join(PULLED_DIR, ".git"))).toBe(true);

    // Addresses moved to the local copy, including inside serialized and JSON values.
    // Read the stored value: WP_HOME, which DDEV sets from the request's scheme, would hide it.
    expect(query(copy, "SELECT option_value FROM wp_options WHERE option_name = 'home'")).toBe(LOCAL_URL);
    expect(JSON.parse(copy("option", "get", "wpsync_seed_serialized", "--format=json")).url).toBe(`${LOCAL_URL}/logo.png`);
    expect(JSON.parse(copy("option", "get", "wpsync_seed_json")).url).toBe(`${LOCAL_URL}/x`);
    expect(copy("post", "list", "--post_type=post", "--s=Seed post", "--format=count")).toBe(String(SEED.posts));
    expect(query(copy, "SELECT post_content FROM wp_posts WHERE post_type = 'post' AND post_title = 'Seed post 1'")).toContain(`${LOCAL_URL}/page-1`);

    // Awkward tables copied byte for byte.
    const checks: Array<[string, string[], string]> = [
      ["wp_wpsync_nopk", ["label", "note"], "label"],
      ["wp_wpsync_blob", ["id", "data", "bin"], "id"],
      ["wp_wpsync_composite", ["a", "b", "v"], "a, b"],
    ];
    for (const [table, columns, order] of checks) {
      const sql = tableChecksumSql(table, columns, order);
      expect(query(copy, sql), table).toBe(query(live, sql));
    }
    expect(query(copy, "SELECT COUNT(*) FROM wp_wpsync_composite")).toBe(String(SEED.compositeRows));

    // Files: odd names, the big one by range, nothing excluded, DDEV's own wp-config.php.
    expect(readFileSync(pulledWp(SEED.unicodeFile), "utf8")).toBe("unicode file\n");
    expect(sha256(readFileSync(pulledWp(SEED.bigFile)))).toBe(sha256(bigFileContent()));
    for (const path of SEED.excludedFiles) expect(existsSync(pulledWp(path)), path).toBe(false);
    expect(existsSync(pulledWp("wp-content/plugins/wpsync-bridge"))).toBe(false);
    expect(readFileSync(pulledWp("wp-config.php"), "utf8")).toContain("ddev");

    // And it runs: the home page renders with the live site's title.
    const home = await fetch(`http://${PULLED_DDEV_NAME}.ddev.site/`);
    expect(home.status).toBe(200);
    expect(await home.text()).toContain("wpsync harness");
  });

  it("refreshes with only what changed", async () => {
    live("post", "update", query(live, "SELECT ID FROM wp_posts WHERE post_type = 'post' AND post_title = 'Seed post 2'"), "--post_title=Seed post 2 (edited)");
    writeSiteFile("wp-content/uploads/new-file.txt", "added after the first pull\n");
    removeSiteFile(SEED.unicodeFile);
    syncFiles();

    const result = await pull(options(), { store });
    expect(result.firstPull).toBe(false);
    expect(result.filesFetched).toBeLessThanOrEqual(3);
    expect(result.filesDeleted).toBe(1);
    expect(readFileSync(pulledWp("wp-content/uploads/new-file.txt"), "utf8")).toBe("added after the first pull\n");
    expect(existsSync(pulledWp(SEED.unicodeFile))).toBe(false);
    expect(query(copy, "SELECT COUNT(*) FROM wp_posts WHERE post_type = 'post' AND post_title = 'Seed post 2 (edited)'")).toBe("1");
  });

  it("won't overwrite git-tracked code that live changed, unless told to", async () => {
    // The team starts tracking the sample plugin…
    appendFileSync(join(PULLED_DIR, ".gitignore"), "!wp/wp-content/plugins/sample-plugin/\n");
    execGit(["add", ".gitignore", "wp/wp-content/plugins/sample-plugin"]);
    execGit(["-c", "user.name=test", "-c", "user.email=test@example.test", "commit", "-q", "-m", "track sample plugin"]);
    const ours = readFileSync(pulledWp(SEED.samplePlugin), "utf8");

    // …and someone edits it on the live site.
    writeSiteFile(SEED.samplePlugin, ours.replace("// v1", "// v2 edited on live"));
    syncFiles();

    const error = await expectCode(pull(options(), { store }), "code_drift");
    expect(error.message).toContain(SEED.samplePlugin);
    expect(readFileSync(pulledWp(SEED.samplePlugin), "utf8")).toBe(ours);

    await pull(options({ overwriteCode: true }), { store });
    expect(readFileSync(pulledWp(SEED.samplePlugin), "utf8")).toContain("// v2 edited on live");

    // Put live back for the next run.
    writeSiteFile(SEED.samplePlugin, ours);
    writeFileSync(pulledWp(SEED.samplePlugin), ours);
  });
});

/** git in the pulled project, on the Mac side (the project's repository lives there). */
function execGit(args: string[]): string {
  return execFileSync("git", ["-C", PULLED_DIR, ...args], { encoding: "utf8" });
}
