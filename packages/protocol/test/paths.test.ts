import { describe, expect, it } from "vitest";
import { comparePaths, isExcluded, isSafeRelativePath } from "../src";

describe("isExcluded", () => {
  it("excludes the file and everything under an excluded folder", () => {
    expect(isExcluded("wp-config.php")).toBe(true);
    expect(isExcluded("wp-content/cache/a/b.html")).toBe(true);
    expect(isExcluded("wp-content/plugins/wpsync-bridge/wpsync-bridge.php")).toBe(true);
  });

  it("matches * within one segment only", () => {
    expect(isExcluded("wp-content/uploads/wpsync-abc123/chunk-1")).toBe(true);
    expect(isExcluded("wp-content/uploads/2026/wpsync-abc/x")).toBe(false);
  });

  it("doesn't exclude look-alikes", () => {
    expect(isExcluded("wp-config-sample.php")).toBe(false);
    expect(isExcluded("wp-content/cachex/a")).toBe(false);
    expect(isExcluded("wp-content/plugins/wpsync-bridge-other/x.php")).toBe(false);
  });
});

describe("comparePaths", () => {
  it("orders folder contents before a sibling that sorts between them as text", () => {
    const paths = ["a-b", "a/z", "a/b", "a"];
    expect([...paths].sort(comparePaths)).toEqual(["a", "a/b", "a/z", "a-b"]);
  });

  it("compares by bytes, so capitals come first", () => {
    expect(comparePaths("B", "a")).toBeLessThan(0);
  });
});

describe("isSafeRelativePath", () => {
  it("rejects absolute paths and climbing out", () => {
    expect(isSafeRelativePath("a/b.txt")).toBe(true);
    for (const bad of ["/etc/passwd", "../x", "a/../b", "a//b", "a/./b", "", "a\\b"]) {
      expect(isSafeRelativePath(bad), bad).toBe(false);
    }
  });
});
