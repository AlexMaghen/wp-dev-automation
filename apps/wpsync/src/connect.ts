import { mkdirSync, writeFileSync } from "node:fs";
import { homedir, hostname } from "node:os";
import { join } from "node:path";
import { InfoResponse, ROUTES } from "@wp-dev-automation/protocol";
import { AdminSession } from "./admin-session";
import { BRIDGE_ZIP_NAME, bridgeZip } from "./bridge-zip";
import { ensureCurrentBridge } from "./bridge-update";
import type { ApplicationPasswordProvider } from "./confirm-dialog";
import type { CredentialsProvider } from "./dialog";
import { WpsyncError } from "./errors";
import { BRIDGE_PLUGIN_ROUTE, RestClient } from "./rest-client";
import type { SecretStore, StoredConnection } from "./secrets";
import { discoverSite, siteKey, type Site } from "./site";

export interface ConnectOptions {
  url: string;
  /** Pre-fills the username in the dialog. */
  username?: string;
  /**
   * Sign in with an Application Password the developer made themselves, for sites whose login
   * page is protected (two-factor, CAPTCHA). wpsync can't upload its bridge that way: if it's
   * missing, the zip goes to the Downloads folder for a one-time manual upload.
   */
  useApplicationPassword?: boolean;
  /** Only for local development sites (DDEV); real sites must use HTTPS. */
  allowHttp?: boolean;
  /** Progress lines for the person running wpsync. */
  log?: (line: string) => void;
}

export interface ConnectDeps {
  credentials: CredentialsProvider;
  /** For useApplicationPassword. */
  applicationPassword?: ApplicationPasswordProvider;
  /** Where the bridge zip goes when it must be uploaded by hand (default ~/Downloads). */
  downloadsDir?: string;
  store: SecretStore;
  now?: () => Date;
  /** Names this Mac in the Application Password's name. */
  machineName?: string;
}

export interface ConnectResult {
  site: Site;
  info: InfoResponse;
  bridge: "uploaded" | "already-installed";
  connection: StoredConnection;
}

/**
 * `wpsync connect <url>`: sign in once, create wpsync's Application Password, install the bridge
 * (inactive), and check it works. The login password is used only inside this function.
 */
export async function connect(options: ConnectOptions, deps: ConnectDeps): Promise<ConnectResult> {
  const log = options.log ?? (() => {});
  const now = deps.now ?? (() => new Date());

  log(`Looking up ${options.url}…`);
  const site = await discoverSite(options.url, { allowHttp: options.allowHttp });
  if (!site.applicationPasswords) {
    throw new WpsyncError(
      "application_passwords_unavailable",
      `${site.homeUrl} doesn't offer Application Passwords, which wpsync uses to sign in.`,
      "WordPress turns them off on sites without HTTPS, and security plugins can too. Wordfence does by default: Wordfence → Login Security → Settings, untick \"Disable WordPress application passwords\", save, and connect again.",
    );
  }
  const key = siteKey(site.homeUrl);
  const previous = await deps.store.get(key);
  if (options.useApplicationPassword) return connectWithApplicationPassword(site, previous, options, deps);

  const credentials = await deps.credentials(
    { name: site.name, homeUrl: site.homeUrl },
    options.username ?? previous?.username,
  );

  log("Signing in…");
  const session = await AdminSession.login(site, credentials.username, credentials.password);
  let created: { uuid: string; password: string } | undefined;
  try {
    const name = `wpsync ${deps.machineName ?? machineName()} ${now().toISOString().slice(0, 10)}`;
    created = await session.createApplicationPassword(name);
    const rest = new RestClient(site, credentials.username, created.password);
    await requireAdministrator(rest);

    // Only once the new key is known to work: revoke the one from the last connect.
    if (previous && previous.applicationPasswordUuid !== created.uuid) {
      await session.deleteApplicationPassword(previous.applicationPasswordUuid);
    }

    const connection: StoredConnection = {
      homeUrl: site.homeUrl,
      siteUrl: site.siteUrl,
      username: credentials.username,
      applicationPassword: created.password,
      applicationPasswordUuid: created.uuid,
      applicationPasswordName: name,
      connectedAt: now().toISOString(),
    };
    await deps.store.set(key, connection);

    const bridge = await ensureBridge(rest, session, log);
    log("Checking the bridge…");
    const info = await checkBridge(rest, log);
    return { site, info, bridge, connection };
  } catch (error) {
    // Don't leave behind a key nobody holds.
    if (created) await session.deleteApplicationPassword(created.uuid).catch(() => {});
    throw error;
  } finally {
    await session.logout();
  }
}

function machineName(): string {
  return hostname().replace(/\.local$/, "");
}

/**
 * Checks the new key signs in as an administrator. A 401 "not logged in" here means the host
 * dropped the Authorization header before WordPress saw it.
 */
async function requireAdministrator(rest: RestClient): Promise<void> {
  const me = await rest.get("/wp/v2/users/me", { context: "edit" });
  if (me.status === 401) {
    throw new WpsyncError(
      "authorization_header_stripped",
      "The site's server drops the Authorization header, so WordPress never sees wpsync's key.",
      "This is a hosting setting (common on some Apache setups). Ask the host to pass the Authorization header to PHP.",
    );
  }
  const capabilities = (me.body as { capabilities?: Record<string, boolean> }).capabilities ?? {};
  if (me.status !== 200 || !capabilities.manage_options || !capabilities.install_plugins) {
    throw new WpsyncError("not_administrator", "That account isn't an administrator who can install plugins.", "Sign in with an administrator account.");
  }
}

async function ensureBridge(rest: RestClient, session: AdminSession, log: (line: string) => void): Promise<ConnectResult["bridge"]> {
  const existing = await rest.get(BRIDGE_PLUGIN_ROUTE);
  if (existing.status === 200) return "already-installed";
  if (existing.status !== 404) {
    throw new WpsyncError("plugin_check_failed", `Couldn't check the site's plugins (HTTP ${existing.status}).`);
  }

  log("Installing the wpsync bridge (it stays switched off between runs)…");
  await session.uploadPlugin(bridgeZip(), BRIDGE_ZIP_NAME);
  const installed = await rest.get(BRIDGE_PLUGIN_ROUTE);
  if (installed.status !== 200) {
    throw new WpsyncError("bridge_upload_failed", "WordPress didn't install the wpsync bridge from the upload.");
  }
  return "uploaded";
}

/** Switches the bridge on, updates it if it's older than ours, reads info, switches it off. */
function checkBridge(rest: RestClient, log: (line: string) => void): Promise<InfoResponse> {
  return rest.withBridge(async () => ensureCurrentBridge(rest, await rest.bridge(InfoResponse, ROUTES.info), log));
}

/** The blocked-login fallback: the developer's own Application Password, no login session. */
async function connectWithApplicationPassword(
  site: Site,
  previous: StoredConnection | null,
  options: ConnectOptions,
  deps: ConnectDeps,
): Promise<ConnectResult> {
  const log = options.log ?? (() => {});
  const now = deps.now ?? (() => new Date());
  if (!deps.applicationPassword) throw new WpsyncError("dialog_failed", "No way to ask for the Application Password.");
  const given = await deps.applicationPassword({ name: site.name, homeUrl: site.homeUrl }, options.username ?? previous?.username);
  const rest = new RestClient(site, given.username, given.applicationPassword);
  await requireAdministrator(rest);

  // Find the key's id, so disconnect can revoke it later.
  const list = await rest.get("/wp/v2/users/me/application-passwords");
  const keys = Array.isArray(list.body) ? (list.body as Array<{ uuid: string; name: string; last_used: string | null }>) : [];
  const mine = keys.filter((k) => k.last_used).sort((a, b) => String(b.last_used).localeCompare(String(a.last_used)))[0] ?? keys[keys.length - 1];

  const connection: StoredConnection = {
    homeUrl: site.homeUrl,
    siteUrl: site.siteUrl,
    username: given.username,
    applicationPassword: given.applicationPassword,
    applicationPasswordUuid: mine?.uuid ?? "unknown",
    applicationPasswordName: mine?.name ?? "(made by you)",
    connectedAt: now().toISOString(),
  };
  await deps.store.set(siteKey(site.homeUrl), connection);

  const plugin = await rest.get(BRIDGE_PLUGIN_ROUTE);
  if (plugin.status !== 200) {
    const dir = deps.downloadsDir ?? join(homedir(), "Downloads");
    mkdirSync(dir, { recursive: true });
    const zipPath = join(dir, BRIDGE_ZIP_NAME);
    writeFileSync(zipPath, bridgeZip());
    throw new WpsyncError(
      "bridge_upload_needed",
      `Saved your key. One manual step is left: the wpsync bridge isn't on the site, and an Application Password can't upload plugins. The bridge is at ${zipPath}.`,
      `In ${site.siteUrl}/wp-admin go to Plugins → Add New → Upload Plugin, upload that file and click Install Now (don't activate it). Then run wpsync connect ${site.homeUrl} --application-password again.`,
    );
  }
  log("Checking the bridge…");
  const info = await checkBridge(rest, log);
  return { site, info, bridge: "already-installed", connection };
}

/**
 * `wpsync disconnect`: remove the bridge from the site, revoke wpsync's key, and forget it.
 * Reports what it couldn't do (WordPress may not let a key revoke itself).
 */
export async function disconnect(
  options: { url: string; allowHttp?: boolean },
  deps: { store: SecretStore },
): Promise<{ bridgeRemoved: boolean; keyRevoked: boolean; homeUrl: string }> {
  const site = await discoverSite(options.url, { allowHttp: options.allowHttp });
  const key = siteKey(site.homeUrl);
  const connection = await deps.store.get(key);
  if (!connection) throw new WpsyncError("not_connected", `wpsync isn't connected to ${site.homeUrl}.`);
  const rest = new RestClient(site, connection.username, connection.applicationPassword);
  await rest.setBridgeActive(false).catch(() => {});
  const removed = await rest.call("DELETE", BRIDGE_PLUGIN_ROUTE);
  const revoked =
    connection.applicationPasswordUuid === "unknown"
      ? { status: 0 }
      : await rest.call("DELETE", `/wp/v2/users/me/application-passwords/${connection.applicationPasswordUuid}`);
  await deps.store.delete(key);
  return { bridgeRemoved: removed.status === 200, keyRevoked: revoked.status === 200, homeUrl: site.homeUrl };
}
