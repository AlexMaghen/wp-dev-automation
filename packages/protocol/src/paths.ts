import { PULL_EXCLUDES } from "./constants";

/**
 * Path rules shared by the CLI and (as a PHP port in the bridge) the server. Tested against the
 * same cases on both sides.
 */

/** Matches one segment pattern, where "*" stands for any run of characters. */
function segmentMatches(pattern: string, segment: string): boolean {
  if (!pattern.includes("*")) return pattern === segment;
  const regex = new RegExp(`^${pattern.split("*").map(escapeRegex).join(".*")}$`);
  return regex.test(segment);
}

function escapeRegex(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** True when path, or any folder above it, matches an exclude pattern. */
export function isExcluded(path: string, excludes: readonly string[] = PULL_EXCLUDES): boolean {
  const segments = path.split("/");
  return excludes.some((pattern) => {
    const parts = pattern.split("/");
    if (parts.length > segments.length) return false;
    return parts.every((part, i) => segmentMatches(part, segments[i]!));
  });
}

/**
 * Orders paths the way a folder-by-folder walk visits them: compare segment by segment, each
 * by its UTF-8 bytes. ("a/z" comes before "a-b", unlike plain string order.)
 */
export function comparePaths(a: string, b: string): number {
  const as = a.split("/");
  const bs = b.split("/");
  for (let i = 0; i < Math.min(as.length, bs.length); i++) {
    const cmp = Buffer.compare(Buffer.from(as[i]!), Buffer.from(bs[i]!));
    if (cmp !== 0) return cmp;
  }
  return as.length - bs.length;
}

/** A safe relative path: no leading "/", no "." or ".." segments, no empty segments. */
export function isSafeRelativePath(path: string): boolean {
  if (path === "" || path.startsWith("/") || path.includes("\\") || path.includes("\0")) return false;
  return path.split("/").every((segment) => segment !== "" && segment !== "." && segment !== "..");
}
