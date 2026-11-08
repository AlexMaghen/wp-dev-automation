import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { WpsyncError } from "./errors";
import { defaultProjectDir, projectAt, type Project } from "./project";
import { normalizeUrl } from "./site";
import { updateRules } from "./site-files";

/**
 * Commands that only touch the local machine: `wpsync init` (the start gate's folder) and
 * `wpsync update-rules`.
 */

export interface InitResult {
  project: Project;
  homeUrl: string;
  created: boolean;
}

/**
 * Sets up a site's folder before anything else happens, so a Claude Code session can be started
 * in it: CLAUDE.md, .claude/settings.json, .gitignore and .wpsync.json (setup: pending).
 * Contacts nothing; the site address is only tidied up.
 */
export function init(url: string, options: { dir?: string; allowHttp?: boolean } = {}): InitResult {
  const homeUrl = normalizeUrl(url, options.allowHttp);
  const project = projectAt(options.dir ?? defaultProjectDir(homeUrl));
  if (project.exists()) {
    const meta = project.read();
    if (meta.setup === "ready") {
      throw new WpsyncError("already_set_up", `${project.dir} is already a pulled copy of ${meta.homeUrl}.`, `To refresh it, run: wpsync pull ${meta.homeUrl}`);
    }
    return { project, homeUrl: meta.homeUrl, created: false };
  }
  project.init(homeUrl, new URL(homeUrl).host);
  return { project, homeUrl, created: true };
}

/** Refreshes the rules block in a project's CLAUDE.md. */
export function updateProjectRules(dir: string = process.cwd()): { path: string; changed: boolean } {
  const project = projectAt(resolve(dir));
  if (!project.exists() || !existsSync(project.claudeMdPath)) {
    throw new WpsyncError("not_a_project", `${project.dir} isn't a wpsync site project.`, "Run this inside a site's folder, or pass --dir.");
  }
  return { path: project.claudeMdPath, changed: updateRules(project.claudeMdPath) };
}
