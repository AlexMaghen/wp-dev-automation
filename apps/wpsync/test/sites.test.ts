import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { projectAt } from "../src/project";
import { forgetSite, listSites, rememberSite, sitesFile } from "../src/sites";

describe("wpsync sites", () => {
  it("uses the test's own list, never the developer's", () => {
    expect(sitesFile()).toContain("wpsync-test-sites-");
  });

  it("lists folders wpsync init made, wherever they are, with their state", () => {
    const dir = mkdtempSync(join(tmpdir(), "wpsync-sites-"));
    projectAt(dir).init("https://example.com", "example.com");
    const entry = listSites(join(tmpdir(), "no-such-sites-dir")).find((s) => s.dir === dir);
    expect(entry).toMatchObject({ host: "example.com", state: "setting-up" });

    writeFileSync(join(dir, ".wpsync.json"), JSON.stringify({ homeUrl: "https://example.com", setup: "ready", archived: { at: "x", file: "f", bytes: 1, sha256: "s", tables: 1 } }));
    expect(listSites(join(tmpdir(), "no-such-sites-dir")).find((s) => s.dir === dir)?.state).toBe("archived");

    forgetSite(dir);
    expect(listSites(join(tmpdir(), "no-such-sites-dir")).some((s) => s.dir === dir)).toBe(false);
  });

  it("finds unlisted folders under the sites folder, and skips folders that are gone", () => {
    const sitesDir = mkdtempSync(join(tmpdir(), "wpsync-sites-dir-"));
    mkdirSync(join(sitesDir, "b.com"));
    writeFileSync(join(sitesDir, "b.com", ".wpsync.json"), JSON.stringify({ homeUrl: "https://b.com", setup: "ready", lastPush: { at: "t", stageId: "s", finalized: false } }));
    mkdirSync(join(sitesDir, "not-a-site"));
    const gone = mkdtempSync(join(tmpdir(), "wpsync-gone-"));
    rememberSite(gone);
    rmSync(gone, { recursive: true });

    const sites = listSites(sitesDir);
    expect(sites.find((s) => s.host === "b.com")?.state).toBe("publish-pending");
    expect(sites.some((s) => s.dir === gone || s.dir.endsWith("not-a-site"))).toBe(false);
  });
});
