import { spawnSync } from "node:child_process";
import { lookup } from "node:dns/promises";
import { existsSync, statfsSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { DbTablesResponse, InfoResponse, ROUTES } from "@wp-dev-automation/protocol";
import { DDEV_MARIADB, DDEV_MYSQL, DDEV_PHP } from "./ddev-config";
import { WpsyncError } from "./errors";
import { listRemote } from "./file-sync";
import { bytes } from "./format";
import { BRIDGE_PLUGIN_ROUTE, RestClient } from "./rest-client";
import type { SecretStore } from "./secrets";
import { discoverSite, normalizeUrl, siteKey } from "./site";

/**
 * `wpsync doctor`: every check before anything changes, reported together, each with its fix
 * (design section 14.1). `--local` checks this Mac; a URL checks the site (read-only).
 */

export interface Check {
  id: string;
  label: string;
  ok: boolean;
  /** What was found. */
  detail: string;
  /** What to do when it isn't ok. */
  fix?: string;
  /** The fix needs the developer's password or a click, so Claude can't do it. */
  needsPerson?: boolean;
  /** Not a blocker, just worth knowing. */
  warning?: boolean;
}

function run(command: string, args: string[]): { ok: boolean; out: string } {
  const result = spawnSync(command, args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], timeout: 30_000 });
  return { ok: result.status === 0, out: `${result.stdout ?? ""}${result.stderr ?? ""}`.trim() };
}

function freeBytes(path: string): number | null {
  try {
    const stats = statfsSync(path);
    return stats.bavail * stats.bsize;
  } catch {
    return null;
  }
}

/** Checks this Mac has what wpsync and DDEV need. */
export async function checkLocal(): Promise<Check[]> {
  const checks: Check[] = [];
  const macos = run("sw_vers", ["-productVersion"]);
  const arch = run("uname", ["-m"]);
  checks.push({
    id: "macos",
    label: "macOS",
    ok: macos.ok,
    detail: macos.ok ? `${macos.out} on ${arch.out === "arm64" ? "Apple silicon" : "Intel"}` : "not macOS",
    fix: "wpsync runs on macOS.",
  });

  const xcode = run("xcode-select", ["-p"]);
  checks.push({
    id: "xcode-clt",
    label: "Xcode Command Line Tools (git)",
    ok: xcode.ok && run("git", ["--version"]).ok,
    detail: xcode.ok ? xcode.out : "not installed",
    fix: "Run xcode-select --install and click Install in the window that opens.",
    needsPerson: true,
  });

  const brew = run("brew", ["--version"]);
  checks.push({
    id: "homebrew",
    label: "Homebrew",
    ok: brew.ok,
    detail: brew.ok ? brew.out.split("\n")[0]! : "not installed",
    fix: 'Install it from https://brew.sh (paste its one-line command into Terminal; it asks for your Mac password).',
    needsPerson: true,
  });

  const orbstack = existsSync("/Applications/OrbStack.app");
  const desktop = existsSync("/Applications/Docker.app");
  const dockerCli = run("docker", ["--version"]);
  checks.push({
    id: "docker-installed",
    label: "Docker (OrbStack or Docker Desktop)",
    ok: orbstack || desktop || dockerCli.ok,
    detail: orbstack ? "OrbStack" : desktop ? "Docker Desktop" : dockerCli.ok ? dockerCli.out : "not installed",
    fix: "brew install --cask orbstack (lighter) or brew install --cask docker, then open it once and accept its terms.",
  });
  const running = run("docker", ["info", "--format", "{{.ServerVersion}}"]);
  checks.push({
    id: "docker-running",
    label: "Docker running",
    ok: running.ok,
    detail: running.ok ? `engine ${running.out}` : "not running",
    fix: `Open ${orbstack ? "OrbStack" : "Docker Desktop"} and wait until it says it's running. The first launch asks you to accept its terms (and, for Docker Desktop, for your password).`,
    needsPerson: !running.ok,
  });
  if (desktop && !orbstack) {
    checks.push({
      id: "docker-disk",
      label: "Docker Desktop disk",
      ok: true,
      warning: true,
      detail: "Docker Desktop keeps containers in a virtual disk with a fixed size.",
      fix: "For a big site, check Docker Desktop → Settings → Resources → Virtual disk limit has room for about twice the site's size.",
    });
  }

  const ddev = run("ddev", ["version", "--json-output"]);
  const ddevVersion = ddev.ok ? /"DDEV version":\s*"([^"]+)"/.exec(ddev.out)?.[1] ?? "installed" : "";
  checks.push({
    id: "ddev",
    label: "DDEV",
    ok: ddev.ok,
    detail: ddev.ok ? ddevVersion : "not installed",
    fix: "brew install ddev/ddev/ddev",
  });

  const caroot = run("mkcert", ["-CAROOT"]);
  const trusted = caroot.ok && existsSync(join(caroot.out, "rootCA.pem"));
  checks.push({
    id: "mkcert",
    label: "Trusted HTTPS for local sites (mkcert)",
    ok: trusted,
    warning: !trusted,
    detail: trusted ? "installed" : "not set up: local sites work, but browsers warn about their certificate",
    fix: "Run mkcert -install in Terminal (it asks for your Mac password), then restart the browser.",
    needsPerson: true,
  });

  const free = freeBytes(homedir());
  checks.push({
    id: "local-disk",
    label: "Free disk space",
    ok: free === null || free > 5 * 1024 ** 3,
    detail: free === null ? "unknown" : `${bytes(free)} free`,
    fix: "Free up space: a local copy needs about 2.5 times the site's size.",
  });

  checks.push(await checkDdevDns());
  return checks;
}

/** *.ddev.site must resolve to this Mac; some routers block that ("DNS rebinding protection"). */
async function checkDdevDns(): Promise<Check> {
  let address = "";
  try {
    address = (await lookup("wpsync-check.ddev.site", { family: 4 })).address;
  } catch {
    // Reported below.
  }
  return {
    id: "ddev-dns",
    label: "Local site addresses (*.ddev.site)",
    ok: address === "127.0.0.1",
    detail: address ? `resolve to ${address}` : "don't resolve",
    fix: "Your router or DNS blocks addresses that point at this Mac. Turn off \"DNS rebinding protection\" for ddev.site in the router, or use a public DNS (1.1.1.1).",
    needsPerson: true,
  };
}

/** Checks a live site before connecting or pulling. Read-only. */
export async function checkSite(url: string, store: SecretStore, options: { allowHttp?: boolean } = {}): Promise<Check[]> {
  const checks: Check[] = [];
  let site;
  try {
    normalizeUrl(url, options.allowHttp);
    site = await discoverSite(url, options);
  } catch (error) {
    checks.push({
      id: "wordpress",
      label: "WordPress site with its REST API",
      ok: false,
      detail: error instanceof WpsyncError ? error.message : String(error),
      fix: error instanceof WpsyncError ? error.hint : undefined,
    });
    return checks;
  }
  checks.push({ id: "wordpress", label: "WordPress site with its REST API", ok: true, detail: `${site.name} at ${site.homeUrl}` });
  checks.push({
    id: "application-passwords",
    label: "Application Passwords",
    ok: site.applicationPasswords,
    detail: site.applicationPasswords ? "available" : "turned off",
    fix: "WordPress offers them only over HTTPS, and some security plugins turn them off (look for a setting about Application Passwords).",
  });

  const connection = await store.get(siteKey(site.homeUrl));
  // Whether the host passes the Authorization header can only be told with a real key: a
  // made-up login gets the same "not logged in" answer either way.
  if (!connection) {
    checks.push({
      id: "authorization-header",
      label: "Authorization header reaches WordPress",
      ok: true,
      warning: true,
      detail: "checked when wpsync connects",
    });
    checks.push({
      id: "connected",
      label: "Connected",
      ok: true,
      warning: true,
      detail: "not yet: the rest is checked after wpsync connect",
    });
    return checks;
  }
  const rest = new RestClient(site, connection.username, connection.applicationPassword);
  const me = await rest.get("/wp/v2/users/me");
  const stripped = me.status === 401 && me.errorCode === "rest_not_logged_in";
  checks.push({
    id: "authorization-header",
    label: "Authorization header reaches WordPress",
    ok: !stripped,
    detail: stripped ? "the host drops it" : "passes through",
    fix: "Ask the host to pass the HTTP Authorization header to PHP (on Apache: CGIPassAuth On, or a RewriteRule setting HTTP_AUTHORIZATION).",
  });
  checks.push({
    id: "connected",
    label: "wpsync's key still works",
    ok: me.status === 200,
    detail: me.status === 200 ? `signed in as ${connection.username}` : `refused (HTTP ${me.status})`,
    fix: `Someone revoked it, or the user changed. Run: wpsync connect ${site.homeUrl}`,
  });
  if (me.status !== 200) return checks;

  const plugin = await rest.get(BRIDGE_PLUGIN_ROUTE);
  if (plugin.status !== 200) {
    checks.push({ id: "bridge", label: "wpsync bridge installed", ok: false, detail: "missing", fix: `Run: wpsync connect ${site.homeUrl}` });
    return checks;
  }
  const { info, dbBytes, fileBytes } = await rest.withBridge(async () => {
    const info = await rest.bridge(InfoResponse, ROUTES.info);
    const tables = await rest.bridge(DbTablesResponse, ROUTES.dbTables);
    const files = await listRemote(rest);
    return {
      info,
      dbBytes: tables.tables.reduce((sum, t) => sum + t.dataBytes, 0),
      fileBytes: files.reduce((sum, f) => sum + f.size, 0),
    };
  });
  checks.push({ id: "bridge", label: "wpsync bridge", ok: true, detail: `version ${info.bridge.version}` });
  checks.push({
    id: "multisite",
    label: "Single site (not multisite)",
    ok: !info.site.multisite,
    detail: info.site.multisite ? "multisite network" : "single site",
    fix: "wpsync doesn't support multisite networks yet.",
  });
  checks.push({
    id: "file-mods",
    label: "WordPress may change its own files",
    ok: info.capabilities.fileModsAllowed && info.capabilities.writable.contentDir,
    detail: info.capabilities.fileModsAllowed ? `filesystem: ${info.capabilities.filesystemMethod}` : "DISALLOW_FILE_MODS is set",
    fix: "Publishing needs it; pulling works without. Ask the host to allow plugin installs.",
  });
  const phpMinor = info.php.version.split(".").slice(0, 2).join(".");
  const dbMinor = info.database.version.split(".").slice(0, 2).join(".");
  const dbList = info.database.engine === "mysql" ? DDEV_MYSQL : DDEV_MARIADB;
  checks.push({
    id: "versions",
    label: "PHP and database versions DDEV offers",
    ok: true,
    warning: !DDEV_PHP.includes(phpMinor) || !dbList.includes(dbMinor),
    detail: `live: PHP ${info.php.version}, ${info.database.engine} ${info.database.version}`,
    fix: "DDEV doesn't offer the exact version; the local copy uses the nearest newer one. Test carefully.",
  });
  const siteBytes = dbBytes + fileBytes;
  const localFree = freeBytes(homedir());
  checks.push({
    id: "local-space",
    label: "Room on this Mac for the copy",
    ok: localFree === null || localFree > 2.5 * siteBytes,
    detail: `site is about ${bytes(siteBytes)}; ${localFree === null ? "free space unknown" : `${bytes(localFree)} free`}`,
    fix: `Free up at least ${bytes(2.5 * siteBytes)} on this Mac.`,
  });
  const serverFree = info.capabilities.diskFreeBytes;
  checks.push({
    id: "server-space",
    label: "Room on the server for publishing",
    ok: serverFree === null || serverFree > 2 * siteBytes,
    warning: serverFree === null,
    detail: serverFree === null ? "the host doesn't say" : `${bytes(serverFree)} free`,
    fix: `Publishing needs about ${bytes(2 * siteBytes)} free on the server (staging area plus the saved old version).`,
  });
  return checks;
}

/** True when nothing blocks (warnings don't). */
export function allOk(checks: Check[]): boolean {
  return checks.every((check) => check.ok || check.warning);
}

export function formatChecks(checks: Check[]): string {
  return checks
    .map((check) => {
      const mark = check.ok ? "ok  " : check.warning ? "note" : "FIX ";
      const lines = [`${mark} ${check.label}: ${check.detail}`];
      if (!check.ok && check.fix) lines.push(`       → ${check.fix}${check.needsPerson ? " (you need to do this yourself)" : ""}`);
      else if (check.warning && check.fix) lines.push(`       ${check.fix}`);
      return lines.join("\n");
    })
    .join("\n");
}
