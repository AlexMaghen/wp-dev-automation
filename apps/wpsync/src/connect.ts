import { hostname } from "node:os";
import { BRIDGE_VERSION, InfoResponse, ROUTES } from "@wp-dev-automation/protocol";
import { AdminSession } from "./admin-session";
import { BRIDGE_ZIP_NAME, bridgeZip } from "./bridge-zip";
import type { CredentialsProvider } from "./dialog";
import { WpsyncError } from "./errors";
import { BRIDGE_PLUGIN_ROUTE, RestClient } from "./rest-client";
import type { SecretStore, StoredConnection } from "./secrets";
import { discoverSite, siteKey, type Site } from "./site";

export interface ConnectOptions {
  url: string;
  /** Pre-fills the username in the dialog. */
  username?: string;
  /** Only for local development sites (DDEV); real sites must use HTTPS. */
  allowHttp?: boolean;
  /** Progress lines for the person running wpsync. */
  log?: (line: string) => void;
}

export interface ConnectDeps {
  credentials: CredentialsProvider;
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
      "WordPress turns them off on sites without HTTPS, and some security plugins turn them off. Fix that and connect again.",
    );
  }
  const key = siteKey(site.homeUrl);
  const previous = await deps.store.get(key);

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
    const info = await checkBridge(rest);
    if (info.bridge.version !== BRIDGE_VERSION) {
      log(`Note: the site has bridge ${info.bridge.version}; this wpsync ships ${BRIDGE_VERSION}.`);
    }
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

/** Switches the bridge on, reads info, and switches it off again whatever happens. */
function checkBridge(rest: RestClient): Promise<InfoResponse> {
  return rest.withBridge(() => rest.bridge(InfoResponse, ROUTES.info));
}
