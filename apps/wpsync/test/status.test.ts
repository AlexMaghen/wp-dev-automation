import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { MemoryStore } from "../src/secrets";
import { siteKey } from "../src/site";
import { status } from "../src/status";

describe("wpsync status --local", () => {
  it("works out the phase from the folder and Keychain alone, contacting nothing", async () => {
    const dir = mkdtempSync(join(tmpdir(), "wpsync-status-"));
    // An address that can't be reached: any attempt to contact it would fail the test or hang.
    const homeUrl = "https://wpsync-status-test.invalid";
    writeFileSync(join(dir, ".wpsync.json"), JSON.stringify({ homeUrl, setup: "ready", localUrl: "https://x.ddev.site", wordfence: { switchedOffAt: "2026-11-01T00:00:00Z" } }));
    const store = new MemoryStore();
    store.entries.set(siteKey(homeUrl), { homeUrl, siteUrl: homeUrl, username: "a", applicationPassword: "b", applicationPasswordUuid: "c", applicationPasswordName: "d", connectedAt: "e" });
    const result = await status({ dir, local: true }, store);
    expect(result.phase).toBe("work");
    expect(result.keyWorks).toBeUndefined();
    expect(result.wordfence).toBeUndefined();

    const empty = await status({ dir, local: true }, new MemoryStore());
    expect(empty.phase).toBe("connect");
  });
});
