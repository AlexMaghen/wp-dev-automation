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
