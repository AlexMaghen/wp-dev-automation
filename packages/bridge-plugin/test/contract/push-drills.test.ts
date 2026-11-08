import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";
import { OPTION_MAINTENANCE, REST_NAMESPACE, ROUTES, StageBeginResponse, StageProgress } from "@wp-dev-automation/protocol";
import { SITE_DIR, syncFiles, wp, wpOk } from "@wp-dev-automation/test-harness";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { rest, restRaw, setBridgeActive } from "./client";

/**
 * Failure drills (design section 12, item 5): each must leave live unchanged, or exactly
 * restorable with rollback. They drive the bridge's publish API directly, with uploads built
 * by hand so they can be broken on purpose.
 */

const route = (name: keyof typeof ROUTES) => `/${REST_NAMESPACE}${ROUTES[name]}`;
const DRILL_FILE = "wp-content/uploads/drill.txt";
const liveFile = (path: string) => join(SITE_DIR, "wp", path);

/** SQL framed as the import expects: "<length>\n<statement>\n". */
function frames(statements: string[]): Buffer {
  return Buffer.concat(statements.map((s) => Buffer.from(`${Buffer.byteLength(s)}\n${s}\n`)));
}

/** A copy of every live table under the stage's prefix: a valid upload that changes nothing. */
function copyOfLive(newPrefix: string): Buffer {
  const tables = wp("db", "query", "SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME LIKE 'wp\\_%'", "--skip-column-names")
    .split("\n")
    .filter(Boolean);
  return frames(
    tables.flatMap((table) => {
      const copy = `${newPrefix}${table.slice(3)}`;
      return [`DROP TABLE IF EXISTS \`${copy}\``, `CREATE TABLE \`${copy}\` LIKE \`${table}\``, `INSERT INTO \`${copy}\` SELECT * FROM \`${table}\``];
    }),
  );
}

async function begin(dbBytes = 1000): Promise<StageBeginResponse> {
  const result = await rest(route("stageBegin"), { method: "POST", body: { dbBytes, filesBytes: 1000, includeHtaccess: false } });
  expect(result.status, JSON.stringify(result.body)).toBe(200);
  return StageBeginResponse.parse(result.body);
}

async function upload(stage: string, part: "db" | "files", data: Buffer, seq = 0, sha?: string): Promise<number> {
  const body = gzipSync(data);
  const result = await restRaw(route("stageChunk"), {
    method: "PUT",
    query: { stage, part, seq: String(seq), sha256: sha ?? createHash("sha256").update(body).digest("hex") },
    bytes: body,
  });
  return result.status;
}

async function untilDone(name: "stageApply" | "rollback" | "finalize", body: unknown): Promise<StageProgress> {
  for (;;) {
    const result = await rest(route(name), { method: "POST", body });
    expect(result.status, JSON.stringify(result.body)).toBe(200);
    const progress = StageProgress.parse(result.body);
    if (progress.done) return progress;
  }
}

const stageTables = () =>
  Number(wp("db", "query", "SELECT COUNT(*) FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME LIKE 'wpsync\\_%'", "--skip-column-names"));
const stageDirs = () => {
  syncFiles();
  return readdirSync(liveFile("wp-content/uploads")).filter((n) => /^wpsync-[a-z0-9]{12}$/.test(n));
};
let baseUrl = "";
const homeStatus = async () => (await fetch(`${baseUrl}/`)).status;

describe("publish failure drills", () => {
  beforeAll(async () => {
    const { inject } = await import("vitest");
    baseUrl = inject("harness").baseUrl;
    expect((await setBridgeActive(true)).status).toBe(200);
  });

  afterAll(async () => {
    await setBridgeActive(false);
  });

  it("refuses a damaged chunk, and a push the server has no room for", async () => {
    const stage = await begin();
    expect(await upload(stage.stageId, "db", Buffer.from("x"), 0, "0".repeat(64))).toBe(400);
    await untilDone("finalize", { stage: stage.stageId });

    const huge = await rest(route("stageBegin"), { method: "POST", body: { dbBytes: 2 ** 52, filesBytes: 0, includeHtaccess: false } });
    expect(huge.status).toBe(507);
    expect(stageDirs()).toEqual([]);
  });

  it("stops at an SQL statement it doesn't allow, with live untouched", async () => {
    const before = wp("option", "get", "blogname");
    const stage = await begin();
    expect(await upload(stage.stageId, "db", frames(["DROP TABLE `wp_options`"]))).toBe(200);
    const result = await untilDone("stageApply", { stage: stage.stageId, chunks: { db: 1, files: 0 } });
    expect(result.step).toBe("failed");
    expect(result.error).toMatch(/doesn't allow|does not allow/);
    expect(wp("option", "get", "blogname")).toBe(before);
    expect(wpOk("option", "get", OPTION_MAINTENANCE)).toBe(false); // no maintenance page
    expect(await homeStatus()).toBe(200);
    await untilDone("finalize", { stage: stage.stageId });
    expect(stageTables()).toBe(0);
    expect(stageDirs()).toEqual([]);
  });

  it("recovers exactly from a push that died while writing files on live", async () => {
    writeFileSync(liveFile(DRILL_FILE), "original\n");
    syncFiles();
    const stage = await begin();
    expect(await upload(stage.stageId, "db", copyOfLive(stage.newPrefix))).toBe(200);
    // One good file, then one whose header promises more bytes than follow: like a crash.
    const archive = Buffer.concat([
      Buffer.from(`${JSON.stringify({ path: DRILL_FILE, size: 9, mtime: 1 })}\nreplaced\n`),
      Buffer.from(`${JSON.stringify({ path: "wp-content/uploads/cut-off.txt", size: 1000, mtime: 1 })}\nonly a few bytes`),
    ]);
    expect(await upload(stage.stageId, "files", archive)).toBe(200);

    const result = await untilDone("stageApply", { stage: stage.stageId, chunks: { db: 1, files: 1 } });
    expect(result.step).toBe("failed");
    expect(result.error).toMatch(/cut off/);
    syncFiles();
    expect(readFileSync(liveFile(DRILL_FILE), "utf8")).toBe("replaced\n");
    // Live was changed, so finalize must refuse: the only way out is rollback.
    expect((await rest(route("finalize"), { method: "POST", body: { stage: stage.stageId } })).status).toBe(409);
    // And a new push must not start on top of it.
    expect((await rest(route("stageBegin"), { method: "POST", body: { dbBytes: 1, filesBytes: 1, includeHtaccess: false } })).status).toBe(409);
    expect(await homeStatus()).toBe(503); // the maintenance page is still up, as it should be

    const rolled = await untilDone("rollback", { stage: stage.stageId });
    expect(rolled.step).toBe("rolled-back");
    syncFiles();
    expect(readFileSync(liveFile(DRILL_FILE), "utf8")).toBe("original\n");
    expect(existsSync(liveFile("wp-content/uploads/cut-off.txt"))).toBe(false);
    expect(stageTables()).toBe(0);
    expect(stageDirs()).toEqual([]);
    expect(await homeStatus()).toBe(200);
  });

  it("cleans up an upload that was abandoned before applying", async () => {
    const abandoned = await begin();
    expect(await upload(abandoned.stageId, "db", copyOfLive(abandoned.newPrefix))).toBe(200);
    const next = await begin(); // the CLI starting over
    expect(next.stageId).not.toBe(abandoned.stageId);
    expect(stageDirs()).toEqual([`wpsync-${next.stageId}`]);
    await untilDone("finalize", { stage: next.stageId });
    expect(stageDirs()).toEqual([]);
    expect(stageTables()).toBe(0);
  });
});
