import { existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { gzipSync } from "node:zlib";
import { describe, expect, it } from "vitest";
import { ARCHIVE_FILE, archive, checkDump, unarchive, type DdevRunner } from "../src/archive";
import { status } from "../src/status";
import { verify } from "../src/verify";
import { MemoryStore } from "../src/secrets";

/** A pulled site project with a DDEV config, in a throwaway folder. */
function siteProject(): string {
  const dir = mkdtempSync(join(tmpdir(), "wpsync-archive-"));
  writeFileSync(join(dir, ".wpsync.json"), JSON.stringify({ homeUrl: "https://example.com", setup: "ready", ddevName: "example-com", localUrl: "https://example-com.ddev.site" }));
  mkdirSync(join(dir, ".ddev"));
  writeFileSync(join(dir, ".ddev", "config.yaml"), "name: example-com\n");
  return dir;
}

function dump(tables: number, complete = true): Buffer {
  const body = Array.from({ length: tables }, (_, i) => `CREATE TABLE \`wp_t${i}\` (\n  id int\n);\nINSERT INTO \`wp_t${i}\` VALUES (1);`).join("\n");
  return gzipSync(`-- MariaDB dump\n${body}\n${complete ? "-- Dump completed on 2026-11-18 10:00:00\n" : ""}`);
}

/** A fake DDEV: the database has `tables` tables; export writes `exported`. Records the commands. */
function fakeDdev(options: { tables: number; exported?: Buffer; tablesAfterImport?: number }) {
  const calls: string[] = [];
  let imported = false;
  const ddev: DdevRunner = async (args) => {
    calls.push(args[0] === "mysql" ? "mysql" : args.join(" ").replace(/--file=\S+/, "--file"));
    if (args[0] === "mysql") return String(imported ? (options.tablesAfterImport ?? options.tables) : options.tables);
    if (args[0] === "export-db") writeFileSync(args[1]!.slice("--file=".length), options.exported ?? dump(options.tables));
    if (args[0] === "import-db") imported = true;
    if (args[0] === "list") return JSON.stringify({ raw: [] });
    return "";
  };
  return { ddev, calls };
}

const noDocker = () => {};
const meta = (dir: string) => JSON.parse(readFileSync(join(dir, ".wpsync.json"), "utf8"));

describe("wpsync archive and unarchive", () => {
  it("exports and checks the database before deleting DDEV, then notes it", async () => {
    const dir = siteProject();
    const { ddev, calls } = fakeDdev({ tables: 12 });
    const result = await archive({ dir }, { ddev, requireDocker: noDocker });
    expect(calls).toEqual(["start -y", "mutagen sync", "mysql", "export-db --file --gzip=true", "delete --omit-snapshot --yes"]);
    expect(result.tables).toBe(12);
    expect(existsSync(join(dir, ARCHIVE_FILE))).toBe(true);
    expect(meta(dir).archived).toMatchObject({ file: ARCHIVE_FILE, tables: 12 });
    expect(meta(dir).archived.sha256).toMatch(/^[0-9a-f]{64}$/);
  });

  for (const [what, exported] of [
    ["is cut short", dump(12, false)],
    ["is missing tables", dump(11)],
    ["isn't gzip", Buffer.from("not gzip")],
  ] as const) {
    it(`deletes nothing when the export ${what}`, async () => {
      const dir = siteProject();
      const { ddev, calls } = fakeDdev({ tables: 12, exported });
      await expect(archive({ dir }, { ddev, requireDocker: noDocker })).rejects.toMatchObject({ code: "archive_check_failed" });
      expect(calls.some((c) => c.startsWith("delete"))).toBe(false);
      expect(meta(dir).archived).toBeUndefined();
    });
  }

  it("deletes DDEV's images only with --images and no other DDEV projects", async () => {
    const dir = siteProject();
    const { ddev, calls } = fakeDdev({ tables: 3 });
    const result = await archive({ dir, images: true }, { ddev, requireDocker: noDocker });
    expect(result.imagesDeleted).toBe(true);
    expect(calls.slice(-2)).toEqual(["poweroff", "delete images --yes"]);

    const other = siteProject();
    const busy: DdevRunner = async (args, onLine) => (args[0] === "list" ? JSON.stringify({ raw: [{ name: "another-site" }] }) : fakeDdev({ tables: 3 }).ddev(args, onLine));
    expect((await archive({ dir: other, images: true }, { ddev: busy, requireDocker: noDocker })).imagesDeleted).toBe("other-projects");
  });

  it("refuses to archive twice, and pull-type commands refuse while archived", async () => {
    const dir = siteProject();
    await archive({ dir }, { ddev: fakeDdev({ tables: 3 }).ddev, requireDocker: noDocker });
    await expect(archive({ dir }, { ddev: fakeDdev({ tables: 3 }).ddev, requireDocker: noDocker })).rejects.toMatchObject({ code: "already_archived" });
    await expect(verify({ dir })).rejects.toMatchObject({ code: "archived" });
    const now = await status({ dir }, new MemoryStore());
    expect(now.phase).toBe("archived");
    expect(now.next).toContain("wpsync unarchive");
  });

  it("unarchive loads the database back, checks it, and clears the archive", async () => {
    const dir = siteProject();
    await archive({ dir }, { ddev: fakeDdev({ tables: 7 }).ddev, requireDocker: noDocker });
    const { ddev, calls } = fakeDdev({ tables: 0, tablesAfterImport: 7 });
    const result = await unarchive({ dir }, { ddev, requireDocker: noDocker });
    expect(calls).toEqual(["start -y", "mutagen sync", "import-db --file", "mysql", "wp cache flush"]);
    expect(result).toEqual({ localUrl: "https://example-com.ddev.site", tables: 7 });
    expect(meta(dir).archived).toBeUndefined();
    expect(existsSync(join(dir, ARCHIVE_FILE))).toBe(false);
  });

  it("unarchive keeps the file when the table count is wrong, and refuses a changed file", async () => {
    const dir = siteProject();
    await archive({ dir }, { ddev: fakeDdev({ tables: 7 }).ddev, requireDocker: noDocker });
    await expect(unarchive({ dir }, { ddev: fakeDdev({ tables: 0, tablesAfterImport: 6 }).ddev, requireDocker: noDocker })).rejects.toMatchObject({ code: "unarchive_check_failed" });
    expect(existsSync(join(dir, ARCHIVE_FILE))).toBe(true);
    expect(meta(dir).archived).toBeDefined();

    writeFileSync(join(dir, ARCHIVE_FILE), dump(7, true).subarray(0, 20));
    await expect(unarchive({ dir }, { ddev: fakeDdev({ tables: 7 }).ddev, requireDocker: noDocker })).rejects.toMatchObject({ code: "archive_corrupt" });
  });

  it("refuses to unarchive a copy that isn't archived", async () => {
    await expect(unarchive({ dir: siteProject() }, { ddev: fakeDdev({ tables: 1 }).ddev, requireDocker: noDocker })).rejects.toMatchObject({ code: "not_archived" });
  });

  it("checkDump counts CREATE TABLE lines and needs the end marker", async () => {
    const dir = mkdtempSync(join(tmpdir(), "wpsync-dump-"));
    const file = join(dir, "d.sql.gz");
    writeFileSync(file, dump(4));
    expect(await checkDump(file)).toEqual({ complete: true, createTables: 4 });
    writeFileSync(file, dump(4, false));
    expect((await checkDump(file)).complete).toBe(false);
  });
});
