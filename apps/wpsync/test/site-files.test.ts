import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import { WpsyncError } from "../src/errors";
import { init, updateProjectRules } from "../src/local-commands";
import { renderClaudeMd, rulesText, writeClaudeMd } from "../src/site-files";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const temps: string[] = [];
function tempDir(): string {
  const dir = mkdtempSync(join(tmpdir(), "wpsync-test-"));
  temps.push(dir);
  return dir;
}
afterEach(() => {
  for (const dir of temps.splice(0)) rmSync(dir, { recursive: true, force: true });
});

describe("rules", () => {
  it("carries every rules file, without their maintainer comments", () => {
    const text = rulesText();
    expect(text).toContain("## Keep it a WordPress site");
    expect(text).toContain("## Safety rules");
    expect(text).toContain("## A change is done when");
    expect(text).not.toContain("PURPOSE:");
  });
});

describe("CLAUDE.md", () => {
  it("renders the template with facts and rules, and no placeholders left", () => {
    const text = renderClaudeMd("Example", { status: "pending", homeUrl: "https://example.com" });
    expect(text).toContain("# Example: local WordPress copy");
    expect(text).toContain("**Live site:** https://example.com");
    expect(text).toContain("## Keep it a WordPress site");
    expect(text).not.toMatch(/\{\{[A-Z_]+\}\}/);
  });

  it("refreshes only the facts block, keeping the team's own notes", () => {
    const path = join(tempDir(), "CLAUDE.md");
    writeClaudeMd(path, "Example", { status: "pending", homeUrl: "https://example.com" });
    writeFileSync(path, `${readFileSync(path, "utf8")}\n## Our notes\n\nKeep the footer blue.\n`);
    writeClaudeMd(path, "Example", { status: "pulled", homeUrl: "https://example.com", localUrl: "https://example-com.ddev.site" });
    const text = readFileSync(path, "utf8");
    expect(text).toContain("**Status:** pulled");
    expect(text).toContain("https://example-com.ddev.site");
    expect(text).not.toContain("**Status:** pending");
    expect(text).toContain("Keep the footer blue.");
  });
});

describe("wpsync init", () => {
  it("makes the start-gate folder: CLAUDE.md, permissions, .gitignore, pending .wpsync.json", () => {
    const dir = join(tempDir(), "example.com");
    const result = init("example.com", { dir });
    expect(result.created).toBe(true);
    expect(result.homeUrl).toBe("https://example.com");
    const meta = JSON.parse(readFileSync(join(dir, ".wpsync.json"), "utf8"));
    expect(meta).toEqual({ homeUrl: "https://example.com", setup: "pending" });
    const settings = JSON.parse(readFileSync(join(dir, ".claude", "settings.json"), "utf8"));
    expect(settings.permissions.allow).toContain("Bash(ddev *)");
    expect(settings.permissions.ask.some((rule: string) => rule.includes("push --confirm"))).toBe(true);
    expect(existsSync(join(dir, ".gitignore"))).toBe(true);
    expect(readFileSync(join(dir, "CLAUDE.md"), "utf8")).toContain("set up, not pulled yet");
  });

  it("is safe to run twice, and refuses a folder that's already a pulled copy", () => {
    const dir = join(tempDir(), "site");
    init("https://example.com", { dir });
    expect(init("https://example.com", { dir }).created).toBe(false);
    writeFileSync(join(dir, ".wpsync.json"), JSON.stringify({ homeUrl: "https://example.com", setup: "ready" }));
    expect(() => init("https://example.com", { dir })).toThrow(WpsyncError);
  });

  it("update-rules restores an edited rules block", () => {
    const dir = join(tempDir(), "site");
    init("https://example.com", { dir });
    const path = join(dir, "CLAUDE.md");
    writeFileSync(path, readFileSync(path, "utf8").replace("## Safety rules", "## Edited"));
    expect(updateProjectRules(dir).changed).toBe(true);
    expect(readFileSync(path, "utf8")).toContain("## Safety rules");
    expect(updateProjectRules(dir).changed).toBe(false);
  });
});

describe("plugin bundle", () => {
  it("claude-plugin/bin/wpsync.mjs is built from the current source (run pnpm --filter wpsync bundle)", () => {
    const out = join(tempDir(), "wpsync.mjs");
    const bun = join(repo, "apps", "wpsync", "node_modules", ".bin", "bun");
    execFileSync(bun, ["build", join(repo, "apps", "wpsync", "src", "main.ts"), "--target=bun", "--minify", "--outfile", out], { stdio: "ignore" });
    expect(readFileSync(join(repo, "claude-plugin", "bin", "wpsync.mjs"), "utf8")).toBe(readFileSync(out, "utf8"));
  });
});
