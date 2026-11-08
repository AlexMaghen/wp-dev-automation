import { describe, expect, it } from "vitest";
import { DDEV_MARIADB, DDEV_MYSQL, DDEV_PHP, ddevName, nearestVersion } from "../src/ddev-config";
import { parseFetchStream, planSync } from "../src/file-sync";
import { bytes, count } from "../src/format";
import { replacements } from "../src/pull";

describe("DDEV versions", () => {
  it("uses live's version when DDEV has it", () => {
    expect(nearestVersion("8.3.36", DDEV_PHP)).toBe("8.3");
    expect(nearestVersion("11.4.13", DDEV_MARIADB)).toBe("11.4");
    expect(nearestVersion("8.0.39", DDEV_MYSQL)).toBe("8.0");
  });

  it("otherwise picks the nearest newer one", () => {
    expect(nearestVersion("10.9.2", DDEV_MARIADB)).toBe("10.11");
    expect(nearestVersion("11.2.0", DDEV_MARIADB)).toBe("11.4");
    expect(nearestVersion("8.1.0", DDEV_MYSQL)).toBe("8.4");
  });

  it("falls back to the newest when live is newer than anything DDEV has", () => {
    expect(nearestVersion("9.9.0", DDEV_PHP)).toBe("8.5");
  });

  it("names projects after the host", () => {
    expect(ddevName("https://kol-ami.maghen.com")).toBe("kol-ami-maghen-com");
    expect(ddevName("https://Example.com/blog/")).toBe("example-com-blog");
  });
});

describe("URL replacements", () => {
  it("covers both schemes and the JSON-escaped forms, longest first", () => {
    const pairs = replacements("https://example.com/wp", "https://example.com", "https://example-com.ddev.site");
    expect(pairs).toContainEqual(["https://example.com/wp", "https://example-com.ddev.site/wp"]);
    expect(pairs).toContainEqual(["http://example.com", "https://example-com.ddev.site"]);
    expect(pairs).toContainEqual(["https:\\/\\/example.com", "https:\\/\\/example-com.ddev.site"]);
    const lengths = pairs.map(([from]) => from.length);
    expect(lengths).toEqual([...lengths].sort((a, b) => b - a));
  });
});

describe("planSync", () => {
  const remote = [
    { path: "same.txt", size: 3, mtime: 100 },
    { path: "changed.txt", size: 5, mtime: 200 },
    { path: "new.txt", size: 1, mtime: 300 },
    { path: "tracked.php", size: 9, mtime: 400 },
  ];
  const local = new Map([
    ["same.txt", { size: 3, mtime: 101 }],
    ["changed.txt", { size: 4, mtime: 200 }],
    ["gone.txt", { size: 1, mtime: 1 }],
    ["tracked.php", { size: 1, mtime: 1 }],
    ["tracked-local-only.php", { size: 1, mtime: 1 }],
  ]);

  it("fetches new and changed files, deletes ones live dropped, leaves tracked code alone", () => {
    const plan = planSync(remote, local, new Set(["tracked.php", "tracked-local-only.php"]));
    expect(plan.fetch.map((e) => e.path)).toEqual(["changed.txt", "new.txt"]);
    expect(plan.remove).toEqual(["gone.txt"]);
    expect(plan.unchanged).toBe(1);
  });
});

describe("parseFetchStream", () => {
  it("splits headers and bytes, including binary and missing files", () => {
    const binary = Buffer.from([0, 10, 255, 10]);
    const stream = Buffer.concat([
      Buffer.from(`${JSON.stringify({ path: "a.bin", size: 4, mtime: 1 })}\n`),
      binary,
      Buffer.from(`${JSON.stringify({ path: "gone.txt", missing: true })}\n`),
      Buffer.from(`${JSON.stringify({ path: "b.txt", size: 2, mtime: 2 })}\nhi`),
    ]);
    const files = parseFetchStream(stream);
    expect(files.map((f) => f.header.path)).toEqual(["a.bin", "gone.txt", "b.txt"]);
    expect(files[0]!.content!.equals(binary)).toBe(true);
    expect(files[1]!.content).toBeNull();
    expect(files[2]!.content!.toString()).toBe("hi");
  });

  it("notices a stream cut short", () => {
    const stream = Buffer.from(`${JSON.stringify({ path: "a", size: 10, mtime: 1 })}\nabc`);
    expect(() => parseFetchStream(stream)).toThrow(/cut off/);
  });
});

describe("format", () => {
  it("groups thousands and sizes bytes", () => {
    expect(count(1234567)).toBe("1,234,567");
    expect(bytes(512)).toBe("512 bytes");
    expect(bytes(20 * 1024 * 1024)).toBe("20 MB");
  });
});

describe("bridge versions", () => {
  it("compares number by number", async () => {
    const { compareVersions } = await import("../src/bridge-update");
    expect(compareVersions("0.1.0", "0.1.0")).toBe(0);
    expect(compareVersions("0.0.9", "0.1.0")).toBe(-1);
    expect(compareVersions("0.10.0", "0.9.9")).toBe(1);
  });
});

describe("confirmation dialogs", () => {
  it("asks for the domain to publish, and a click to roll back or finalize", async () => {
    const { confirmScript } = await import("../src/confirm-dialog");
    const push = confirmScript({ action: "push", host: "example.com", summary: 'Files: 3 "quoted"' });
    expect(push).toContain("default answer");
    expect(push).toContain("REPLACES the live site example.com");
    expect(push).toContain('\\"quoted\\"');
    const rollback = confirmScript({ action: "rollback", host: "example.com", summary: "x" });
    expect(rollback).toContain('buttons {"Cancel", "Roll back"}');
    expect(rollback).toContain('default button "Cancel"');
  });
});

describe("locate (Homebrew right after installing it)", () => {
  it("finds a command on the PATH first", async () => {
    const { locate } = await import("../src/doctor");
    expect(locate("brew", { onPath: () => "/usr/local/bin/brew", exists: () => true })).toEqual({ path: "/usr/local/bin/brew", onPath: true });
  });

  it("finds Homebrew's folder when it isn't on the PATH yet, Apple silicon first", async () => {
    const { locate } = await import("../src/doctor");
    const present = new Set(["/opt/homebrew/bin/brew", "/usr/local/bin/brew"]);
    expect(locate("brew", { onPath: () => null, exists: (p) => present.has(p) })).toEqual({ path: "/opt/homebrew/bin/brew", onPath: false });
    expect(locate("brew", { onPath: () => null, exists: (p) => p === "/usr/local/bin/brew" })).toEqual({ path: "/usr/local/bin/brew", onPath: false });
  });

  it("reports nothing when it isn't installed anywhere", async () => {
    const { locate } = await import("../src/doctor");
    expect(locate("brew", { onPath: () => null, exists: () => false })).toBeNull();
  });
});

describe("progress for long jobs", () => {
  async function make(network = true) {
    const { Progress } = await import("../src/progress");
    let clock = 0;
    const lines: string[] = [];
    const progress = new Progress((line) => lines.push(line), { intervalMs: 15_000, stallMs: 60_000, now: () => clock });
    progress.step("database", { total: 48, unit: "tables", network });
    return { progress, lines, advance: (ms: number) => (clock += ms) };
  }

  it("prints a progress line on schedule, with how long since data last arrived", async () => {
    const { progress, lines, advance } = await make();
    advance(16_000);
    progress.update({ done: 12, bytes: 40 * 1024 * 1024, detail: "wp_posts" });
    advance(4_000);
    progress.tick();
    expect(lines.at(-1)).toBe("progress: database 12/48 tables, 40 MB (wp_posts) · 20s · last data 4s ago");
  });

  it("reports a stall after a minute without data, and again a minute later", async () => {
    const { progress, lines, advance } = await make();
    advance(61_000);
    progress.tick();
    expect(lines.at(-1)).toBe("stalled: no data for 1m 1s during database");
    advance(30_000);
    progress.tick();
    expect(lines.filter((l) => l.startsWith("stalled:"))).toHaveLength(1);
    advance(31_000);
    progress.tick();
    expect(lines.filter((l) => l.startsWith("stalled:"))).toHaveLength(2);
  });

  it("never reports a stall for work that runs only on this Mac", async () => {
    const { progress, lines, advance } = await make(false);
    advance(300_000);
    progress.tick();
    expect(lines.some((l) => l.startsWith("stalled:"))).toBe(false);
    expect(lines.at(-1)).not.toContain("last data");
  });
});

describe("publish confirmation", () => {
  it("accepts the live domain however it's typed, and nothing else", async () => {
    const { sameHost } = await import("../src/confirm-dialog");
    for (const typed of ["example.com", " Example.COM ", "https://example.com", "https://example.com/", "http://example.com"]) {
      expect(sameHost(typed, "example.com"), typed).toBe(true);
    }
    for (const typed of ["", "www.example.com", "example.co", "example.com.evil", "https://example.com/blog"]) {
      expect(sameHost(typed, "example.com"), typed).toBe(false);
    }
  });
});
