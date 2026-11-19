import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import {
  ARCHIVED_DDEV_NAME,
  ARCHIVED_DIR,
  BASE_URL,
  ddevIn,
  deleteProject,
  freshApplicationPassword,
  installBridge,
  seedSite,
} from "@wp-dev-automation/test-harness";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { ARCHIVE_FILE, archive, unarchive } from "../../src/archive";
import { init } from "../../src/local-commands";
import { pull } from "../../src/pull";
import { MemoryStore } from "../../src/secrets";
import { siteKey } from "../../src/site";
import { verify } from "../../src/verify";

const local = (...args: string[]) => ddevIn(ARCHIVED_DIR, "wp", ...args);
const query = (sql: string) => local("db", "query", sql, "--skip-column-names");
const PAGE = "Made locally before archiving";
const UPLOAD = "wp-content/uploads/written-in-container.txt";

/** Is the DDEV project known to DDEV at all (containers or volumes)? */
function ddevKnows(name: string): boolean {
  const list = JSON.parse(execDdev(["list", "--json-output"]) || "{}") as { raw?: Array<{ name: string }> };
  return (list.raw ?? []).some((p) => p.name === name);
}
function execDdev(args: string[]): string {
  return ddevIn(ARCHIVED_DIR, ...args);
}

describe("wpsync archive and unarchive (real DDEV)", () => {
  beforeAll(async () => {
    deleteProject(ARCHIVED_DIR);
    installBridge();
    seedSite();
    const store = new MemoryStore();
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
    init(BASE_URL, { dir: ARCHIVED_DIR, allowHttp: true });
    await pull({ url: BASE_URL, dir: ARCHIVED_DIR, name: ARCHIVED_DDEV_NAME, allowHttp: true }, { store });
    // Local work that only exists in DDEV: a page in the database, and a file WordPress wrote
    // inside the container (Mutagen must bring it back to the folder before DDEV is deleted).
    local("post", "create", "--post_type=page", `--post_title=${PAGE}`, "--post_status=publish");
    ddevIn(ARCHIVED_DIR, "exec", "sh", "-c", `echo from-container > /var/www/html/wp/${UPLOAD}`);
  });

  afterAll(() => deleteProject(ARCHIVED_DIR));

  it("archives: database saved and checked, DDEV project deleted, folder kept", async () => {
    const tablesBefore = Number(query("SELECT COUNT(*) FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_TYPE = 'BASE TABLE'"));
    const result = await archive({ dir: ARCHIVED_DIR });
    expect(result.tables).toBe(tablesBefore);
    expect(existsSync(join(ARCHIVED_DIR, ARCHIVE_FILE))).toBe(true);
    expect(readFileSync(join(ARCHIVED_DIR, "wp", UPLOAD), "utf8")).toBe("from-container\n");
    expect(ddevKnows(ARCHIVED_DDEV_NAME)).toBe(false);
    await expect(verify({ dir: ARCHIVED_DIR })).rejects.toMatchObject({ code: "archived" });
  });

  it("unarchives: the same database and files, and the site works", async () => {
    const result = await unarchive({ dir: ARCHIVED_DIR });
    expect(result.tables).toBeGreaterThan(10);
    expect(query(`SELECT COUNT(*) FROM wp_posts WHERE post_title = '${PAGE}'`)).toBe("1");
    expect(existsSync(join(ARCHIVED_DIR, ARCHIVE_FILE))).toBe(false);
    expect(JSON.parse(readFileSync(join(ARCHIVED_DIR, ".wpsync.json"), "utf8")).archived).toBeUndefined();
    const checks = await verify({ dir: ARCHIVED_DIR });
    expect(checks.filter((c) => !c.ok), JSON.stringify(checks.filter((c) => !c.ok))).toEqual([]);
  });
});
