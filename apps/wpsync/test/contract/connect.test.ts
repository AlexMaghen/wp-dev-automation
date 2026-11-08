import { BRIDGE_VERSION } from "@wp-dev-automation/protocol";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  BASE_URL,
  SITE_DIR,
  applicationPasswordNames,
  clearApplicationPasswords,
  freshApplicationPassword,
  freshLoginPassword,
  installBridge,
  removeBridge,
  syncFiles,
  wp,
  wpOk,
} from "@wp-dev-automation/test-harness";
import { beforeAll, describe, expect, it } from "vitest";
import { connect, disconnect } from "../../src/connect";
import { allOk, checkSite, formatChecks } from "../../src/doctor";
import type { CredentialsProvider } from "../../src/dialog";
import { WpsyncError } from "../../src/errors";
import { RestClient } from "../../src/rest-client";
import { MemoryStore } from "../../src/secrets";
import { discoverSite, siteKey } from "../../src/site";

/** Throwaway login passwords, set fresh for this file. */
const passwords = { admin: "", editor: "" };
const harness = () => ({ baseUrl: BASE_URL, adminPassword: passwords.admin, editorPassword: passwords.editor });

/** Stands in for the macOS dialog with the harness's throwaway login. */
const typed = (username: string, password: string): CredentialsProvider => async () => ({ username, password });

async function expectCode(promise: Promise<unknown>, code: string): Promise<void> {
  const error = await promise.then(
    () => undefined,
    (e: unknown) => e,
  );
  expect(error).toBeInstanceOf(WpsyncError);
  expect((error as WpsyncError).code).toBe(code);
}

function sessionCount(user: string): number {
  return Number(wp("user", "session", "list", user, "--format=count"));
}

describe("wpsync connect", () => {
  // Start from a site wpsync has never touched: no bridge, no Application Passwords.
  beforeAll(() => {
    removeBridge();
    clearApplicationPasswords("admin");
    clearApplicationPasswords("editor");
    passwords.admin = freshLoginPassword("admin");
    passwords.editor = freshLoginPassword("editor");
  });

  const store = new MemoryStore();
  const options = () => ({ url: harness().baseUrl, allowHttp: true });
  const deps = (credentials: CredentialsProvider) => ({ credentials, store, machineName: "contract-test" });

  it("reports a wrong password in WordPress's words, and leaves nothing behind", async () => {
    await expectCode(connect(options(), deps(typed("admin", "not-the-password"))), "login_failed");
    expect(applicationPasswordNames("admin")).toEqual([]);
    expect(store.entries.size).toBe(0);
  });

  it("refuses a user who isn't an administrator, and revokes the key it made", async () => {
    await expectCode(connect(options(), deps(typed("editor", harness().editorPassword))), "not_administrator");
    expect(applicationPasswordNames("editor")).toEqual([]);
    expect(sessionCount("editor")).toBe(0);
  });

  it("connects a fresh site: creates the key, uploads the bridge switched off, checks it", async () => {
    const result = await connect(options(), deps(typed("admin", harness().adminPassword)));

    expect(result.bridge).toBe("uploaded");
    expect(result.info.bridge.version).toBe(BRIDGE_VERSION);
    expect(result.info.site.homeUrl).toBe(harness().baseUrl);
    expect(wpOk("plugin", "is-installed", "wpsync-bridge")).toBe(true);
    expect(wpOk("plugin", "is-active", "wpsync-bridge")).toBe(false);

    expect(applicationPasswordNames("admin")).toEqual([result.connection.applicationPasswordName]);
    expect(result.connection.applicationPasswordName).toMatch(/^wpsync contract-test \d{4}-\d{2}-\d{2}$/);
    expect(store.entries.get(siteKey(harness().baseUrl))).toEqual(result.connection);

    // The login session was ended on the server, not just forgotten.
    expect(sessionCount("admin")).toBe(0);
  });

  it("works with only the saved key afterwards", async () => {
    const saved = store.entries.get(siteKey(harness().baseUrl))!;
    const site = await discoverSite(harness().baseUrl, { allowHttp: true });
    const rest = new RestClient(site, saved.username, saved.applicationPassword);
    const me = await rest.get("/wp/v2/users/me");
    expect(me.status).toBe(200);
    expect((me.body as { slug: string }).slug).toBe("admin");
  });

  it("reconnects: keeps the installed bridge and swaps the old key for a new one", async () => {
    const before = store.entries.get(siteKey(harness().baseUrl))!;
    const result = await connect(options(), deps(typed("admin", harness().adminPassword)));

    expect(result.bridge).toBe("already-installed");
    expect(result.connection.applicationPasswordUuid).not.toBe(before.applicationPasswordUuid);
    expect(applicationPasswordNames("admin")).toHaveLength(1);

    const site = await discoverSite(harness().baseUrl, { allowHttp: true });
    const old = await new RestClient(site, before.username, before.applicationPassword).get("/wp/v2/users/me");
    expect(old.status).toBe(401);
  });

  it("doctor checks the site before and after connecting", async () => {
    const before = await checkSite(harness().baseUrl, new MemoryStore(), { allowHttp: true });
    expect(allOk(before), formatChecks(before)).toBe(true);
    expect(before.find((c) => c.id === "authorization-header")?.warning).toBe(true);
    expect(before.find((c) => c.id === "connected")?.warning).toBe(true);

    const after = await checkSite(harness().baseUrl, store, { allowHttp: true });
    expect(allOk(after), formatChecks(after)).toBe(true);
    expect(after.find((c) => c.id === "authorization-header")?.ok).toBe(true);
    for (const id of ["connected", "bridge", "multisite", "file-mods", "local-space", "server-space"]) {
      expect(after.find((c) => c.id === id), id).toBeDefined();
    }
    expect(wpOk("plugin", "is-active", "wpsync-bridge")).toBe(false);
  });

  it("updates an older bridge on the site by itself", async () => {
    const main = join(SITE_DIR, "wp/wp-content/plugins/wpsync-bridge/wpsync-bridge.php");
    const constants = join(SITE_DIR, "wp/wp-content/plugins/wpsync-bridge/includes/protocol.php");
    writeFileSync(main, readFileSync(main, "utf8").replace(`Version:           ${BRIDGE_VERSION}`, "Version:           0.0.1"));
    writeFileSync(constants, readFileSync(constants, "utf8").replace(`WPSYNC_BRIDGE_VERSION = '${BRIDGE_VERSION}'`, "WPSYNC_BRIDGE_VERSION = '0.0.1'"));
    syncFiles();
    expect(wp("plugin", "get", "wpsync-bridge", "--field=version")).toBe("0.0.1");

    const result = await connect(options(), deps(typed("admin", harness().adminPassword)));
    expect(result.info.bridge.version).toBe(BRIDGE_VERSION);
    expect(wp("plugin", "get", "wpsync-bridge", "--field=version")).toBe(BRIDGE_VERSION);
    expect(wpOk("plugin", "is-active", "wpsync-bridge")).toBe(false);
  });

  it("disconnects: removes the bridge and forgets the key", async () => {
    const result = await disconnect({ url: harness().baseUrl, allowHttp: true }, { store });
    expect(result.bridgeRemoved).toBe(true);
    expect(wpOk("plugin", "is-installed", "wpsync-bridge")).toBe(false);
    expect(store.entries.size).toBe(0);
    // WordPress may refuse to let a key revoke itself; then the developer is told to do it.
    expect(applicationPasswordNames("admin")).toHaveLength(result.keyRevoked ? 0 : 1);
    clearApplicationPasswords("admin");
  });

  it("falls back to an Application Password the developer made, with a manual bridge upload", async () => {
    const [username, applicationPassword] = freshApplicationPassword("admin").split(/:(.*)/s) as [string, string];
    const downloads = mkdtempSync(join(tmpdir(), "wpsync-downloads-"));
    const fallbackDeps = { ...deps(typed("x", "x")), applicationPassword: async () => ({ username, applicationPassword }), downloadsDir: downloads };

    await expectCode(connect({ ...options(), useApplicationPassword: true }, fallbackDeps), "bridge_upload_needed");
    expect(existsSync(join(downloads, "wpsync-bridge.zip"))).toBe(true);
    expect(store.entries.get(siteKey(harness().baseUrl))?.username).toBe("admin");

    installBridge(); // what the developer does in wp-admin with that zip
    const result = await connect({ ...options(), useApplicationPassword: true }, fallbackDeps);
    expect(result.bridge).toBe("already-installed");
    expect(result.info.bridge.version).toBe(BRIDGE_VERSION);
    rmSync(downloads, { recursive: true, force: true });
  });

  it("refuses plain HTTP for a real site", async () => {
    await expectCode(connect({ url: harness().baseUrl }, deps(typed("admin", "x"))), "http_refused");
  });
});
