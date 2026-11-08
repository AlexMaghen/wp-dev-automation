import { existsSync, readFileSync, writeFileSync } from "node:fs";
import type { InfoResponse } from "@wp-dev-automation/protocol";
import { RULES_FILES, SITE_TEMPLATE_FILES } from "./generated/embedded";

/**
 * The files wpsync writes into a site project from packages/site-template, and the two blocks
 * of its CLAUDE.md that wpsync keeps current (facts on every pull, rules on update-rules).
 */

function template(name: string): string {
  const text = SITE_TEMPLATE_FILES[name];
  if (text === undefined) throw new Error(`site template file ${name} missing from the build`);
  return text;
}

export const GITIGNORE = template("gitignore");
export const CLAUDE_SETTINGS = template("claude-settings.json");

/** Drops a file's leading <!-- … --> comment (maintainer notes, not instructions). */
function withoutLeadingComment(text: string): string {
  return text.replace(/^\s*<!--[\s\S]*?-->\s*/, "");
}

/** The rules from claude-plugin/rules, in file-name order. */
export function rulesText(): string {
  return Object.keys(RULES_FILES)
    .sort()
    .map((name) => withoutLeadingComment(RULES_FILES[name]!).trim())
    .join("\n\n");
}

/** How Claude should run wpsync in this project: the plugin's launcher, or wpsync on PATH. */
export function wpsyncCommand(): string {
  return process.env.WPSYNC_COMMAND || "wpsync";
}

export interface Facts {
  status: string;
  homeUrl: string;
  localUrl?: string;
  info?: InfoResponse;
  ddev?: { phpVersion: string; webserver: string; database: string };
}

export function renderFacts(facts: Facts): string {
  const lines = [`**Status:** ${facts.status}`, ""];
  lines.push(`- **Live site:** ${facts.homeUrl}`);
  if (facts.localUrl) lines.push(`- **Local copy:** ${facts.localUrl}`);
  const info = facts.info;
  if (info) {
    const theme =
      info.theme.template !== info.theme.stylesheet
        ? `${info.theme.name} ${info.theme.version} (child theme of ${info.theme.template})`
        : `${info.theme.name} ${info.theme.version}`;
    const active = info.plugins.filter((p) => p.active && !p.file.startsWith("wpsync-bridge/"));
    lines.push(`- **WordPress:** ${info.wordpress.version}; **theme:** ${theme}`);
    lines.push(`- **Live server:** PHP ${info.php.version}, ${info.database.engine} ${info.database.version}, ${info.server.software ?? "unknown web server"}`);
    lines.push(`- **Active plugins (${active.length}):** ${active.map((p) => `${p.name} ${p.version}`).join(", ") || "none"}`);
    if (info.muPlugins.length) lines.push(`- **Must-use plugins (from the host):** ${info.muPlugins.map((p) => p.name || p.file).join(", ")}`);
  }
  if (facts.ddev) {
    lines.push(`- **Local DDEV:** PHP ${facts.ddev.phpVersion}, ${facts.ddev.webserver}, ${facts.ddev.database}`);
  }
  lines.push("", `In this file, \`wpsync\` means: \`${wpsyncCommand()}\``);
  return lines.join("\n");
}

export function renderClaudeMd(siteName: string, facts: Facts): string {
  return withoutLeadingComment(template("CLAUDE.md.tmpl"))
    .replaceAll("{{SITE_NAME}}", siteName)
    .replaceAll("{{HOME_URL}}", facts.homeUrl)
    .replace("{{FACTS}}", renderFacts(facts))
    .replace("{{RULES}}", rulesText());
}

function replaceBlock(text: string, block: "facts" | "rules", content: string): string {
  const start = `<!-- wpsync:${block}:start -->`;
  const end = `<!-- wpsync:${block}:end -->`;
  const from = text.indexOf(start);
  const to = text.indexOf(end);
  if (from < 0 || to < from) return `${text.trimEnd()}\n\n${start}\n${content}\n${end}\n`;
  return `${text.slice(0, from + start.length)}\n${content}\n${text.slice(to)}`;
}

/** Writes CLAUDE.md, or refreshes just its facts block when it already exists. */
export function writeClaudeMd(path: string, siteName: string, facts: Facts): void {
  if (!existsSync(path)) {
    writeFileSync(path, renderClaudeMd(siteName, facts));
    return;
  }
  writeFileSync(path, replaceBlock(readFileSync(path, "utf8"), "facts", renderFacts(facts)));
}

/** Refreshes the rules block from the rules this wpsync carries. Returns false if unchanged. */
export function updateRules(path: string): boolean {
  const before = readFileSync(path, "utf8");
  const after = replaceBlock(before, "rules", rulesText());
  if (after === before) return false;
  writeFileSync(path, after);
  return true;
}
