import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join, resolve } from "node:path";
import { z } from "zod";
import { WpsyncError } from "./errors";
import { CLAUDE_SETTINGS, GITIGNORE, writeClaudeMd } from "./site-files";

/**
 * A local site project: a folder with a DDEV config, WordPress in wp/, and .wpsync.json saying
 * which live site it copies. Holds no secrets; those stay in the Keychain.
 */

/** Where site projects go by default: ~/wp-sites/<host>. */
export const DEFAULT_SITES_DIR = join(homedir(), "wp-sites");

export const ProjectFile = z.object({
  homeUrl: z.string(),
  /** "pending" between `wpsync init` and the first pull. */
  setup: z.enum(["pending", "ready"]).default("ready"),
  siteUrl: z.string().optional(),
  ddevName: z.string().optional(),
  localUrl: z.string().optional(),
  tablePrefix: z.string().optional(),
  lastPull: z
    .object({
      at: z.string(),
      tables: z.number(),
      rows: z.number(),
      files: z.number(),
      bytes: z.number(),
      /** Live's active plugins (folder names) and theme at the pull, for wpsync verify. */
      activePlugins: z.array(z.string()).optional(),
      theme: z.string().optional(),
    })
    .optional(),
  lastPush: z
    .object({
      at: z.string(),
      stageId: z.string(),
      finalized: z.boolean(),
    })
    .optional(),
});
export type ProjectFile = z.infer<typeof ProjectFile>;

export class Project {
  constructor(readonly dir: string) {}

  get wpDir(): string {
    return join(this.dir, "wp");
  }

  get backupsDir(): string {
    return join(this.dir, "backups");
  }

  private get metaPath(): string {
    return join(this.dir, ".wpsync.json");
  }

  get ddevConfigPath(): string {
    return join(this.dir, ".ddev", "config.yaml");
  }

  get claudeMdPath(): string {
    return join(this.dir, "CLAUDE.md");
  }

  exists(): boolean {
    return existsSync(this.metaPath);
  }

  read(): ProjectFile {
    const parsed = ProjectFile.safeParse(JSON.parse(readFileSync(this.metaPath, "utf8")));
    if (!parsed.success) throw new WpsyncError("bad_project", `${this.metaPath} isn't a wpsync project file.`);
    return parsed.data;
  }

  write(meta: ProjectFile): void {
    writeFileSync(this.metaPath, `${JSON.stringify(meta, null, 2)}\n`);
  }

  /**
   * `wpsync init`: the folder, CLAUDE.md, Claude Code permissions and .gitignore, with the
   * project marked pending. Touches nothing outside the folder.
   */
  init(homeUrl: string, siteName: string): void {
    mkdirSync(join(this.dir, ".claude"), { recursive: true });
    const settings = join(this.dir, ".claude", "settings.json");
    if (!existsSync(settings)) writeFileSync(settings, CLAUDE_SETTINGS);
    if (!existsSync(join(this.dir, ".gitignore"))) writeFileSync(join(this.dir, ".gitignore"), GITIGNORE);
    writeClaudeMd(this.claudeMdPath, siteName, { status: "set up, not pulled yet (run wpsync pull)", homeUrl });
    this.write({ homeUrl, setup: "pending" });
  }

  /** First pull: DDEV config, folders, any init files still missing, and a git repository. */
  prepare(meta: ProjectFile, ddevConfig: string, siteName: string): void {
    if (!existsSync(this.metaPath)) this.init(meta.homeUrl, siteName);
    mkdirSync(join(this.dir, ".ddev"), { recursive: true });
    mkdirSync(this.wpDir, { recursive: true });
    mkdirSync(this.backupsDir, { recursive: true });
    writeFileSync(this.ddevConfigPath, ddevConfig);
    this.write(meta);
    if (!existsSync(join(this.dir, ".git"))) {
      git(this.dir, "init", "-q", "-b", "main");
      git(this.dir, "add", ".gitignore", ".wpsync.json", ".ddev/config.yaml", "CLAUDE.md", ".claude/settings.json");
      git(this.dir, "-c", "user.name=wpsync", "-c", "user.email=wpsync@localhost", "commit", "-q", "-m", `wpsync: local copy of ${meta.homeUrl}`);
    }
  }

  /** Paths under wp/ that git tracks, relative to wp/. Empty when there's no repository. */
  trackedWpFiles(): Set<string> {
    if (!existsSync(join(this.dir, ".git"))) return new Set();
    const out = git(this.dir, "ls-files", "-z", "--", "wp");
    return new Set(
      out
        .split("\0")
        .filter(Boolean)
        .map((path) => path.replace(/^wp\//, "")),
    );
  }

  /** Runs a ddev command in the project; output is captured unless `show` is set. */
  ddev(args: string[], options: { show?: boolean } = {}): string {
    const result = spawnSync("ddev", args, {
      cwd: this.dir,
      encoding: "utf8",
      stdio: ["ignore", options.show ? "inherit" : "pipe", "pipe"],
      maxBuffer: 64 * 1024 * 1024,
    });
    if (result.error) {
      throw new WpsyncError("ddev_missing", "Couldn't run DDEV.", "Install it with: brew install ddev/ddev/ddev");
    }
    if (result.status !== 0) {
      const detail = (result.stderr || result.stdout || "").trim().split("\n").slice(-3).join(" ");
      throw new WpsyncError("ddev_failed", `ddev ${args.join(" ")} failed: ${detail}`);
    }
    return (result.stdout ?? "").trim();
  }

  wp(...args: string[]): string {
    return this.ddev(["wp", ...args]);
  }

  /** Waits for files written on the Mac to reach the container (DDEV's Mutagen sync, when on). */
  syncFiles(): void {
    try {
      this.ddev(["mutagen", "sync"]);
    } catch {
      // Mutagen isn't in use: the container sees the files directly.
    }
  }
}

function git(dir: string, ...args: string[]): string {
  return execFileSync("git", ["-C", dir, ...args], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
}

/** Where a site's project goes when the person doesn't say. */
export function defaultProjectDir(homeUrl: string): string {
  const url = new URL(homeUrl);
  const name = `${url.host}${url.pathname}`.replace(/\/+$/, "").replace(/[/:]+/g, "-");
  return join(DEFAULT_SITES_DIR, name);
}

export function projectAt(dir: string): Project {
  return new Project(resolve(dir));
}

/** Docker must be running before DDEV can do anything. */
export function requireDocker(): void {
  try {
    execFileSync("docker", ["info"], { stdio: "ignore" });
  } catch {
    throw new WpsyncError("docker_not_running", "Docker isn't running.", "Start Docker Desktop and try again.");
  }
}
