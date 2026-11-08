import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join, resolve } from "node:path";
import { z } from "zod";
import { WpsyncError } from "./errors";

/**
 * A local site project: a folder with a DDEV config, WordPress in wp/, and .wpsync.json saying
 * which live site it copies. Holds no secrets; those stay in the Keychain.
 */

export const DEFAULT_SITES_DIR = join(homedir(), "AxDevProj", "wp-sites");

export const ProjectFile = z.object({
  homeUrl: z.string(),
  siteUrl: z.string(),
  ddevName: z.string(),
  localUrl: z.string(),
  tablePrefix: z.string(),
  lastPull: z
    .object({
      at: z.string(),
      tables: z.number(),
      rows: z.number(),
      files: z.number(),
      bytes: z.number(),
    })
    .optional(),
});
export type ProjectFile = z.infer<typeof ProjectFile>;

const GITIGNORE = `# wpsync site project. Git tracks only code the team writes; everything else in wp/ can be
# pulled from the live site again. To track a theme or plugin you're changing, add a line like:
#   !wp/wp-content/themes/my-theme/
wp/*
!wp/wp-content/
wp/wp-content/*
!wp/wp-content/themes/
wp/wp-content/themes/*
!wp/wp-content/plugins/
wp/wp-content/plugins/*

# Database dumps and pull backups: they hold users' emails and password hashes.
backups/

# DDEV: keep config.yaml, ignore machine-local state
.ddev/*
!.ddev/config.yaml

.DS_Store
`;

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

  /** Creates the folder, DDEV config, .gitignore and a git repository with a first commit. */
  create(meta: ProjectFile, ddevConfig: string): void {
    mkdirSync(join(this.dir, ".ddev"), { recursive: true });
    mkdirSync(this.wpDir, { recursive: true });
    mkdirSync(this.backupsDir, { recursive: true });
    writeFileSync(this.ddevConfigPath, ddevConfig);
    writeFileSync(join(this.dir, ".gitignore"), GITIGNORE);
    this.write(meta);
    if (!existsSync(join(this.dir, ".git"))) {
      git(this.dir, "init", "-q", "-b", "main");
      git(this.dir, "add", ".gitignore", ".wpsync.json", ".ddev/config.yaml");
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
