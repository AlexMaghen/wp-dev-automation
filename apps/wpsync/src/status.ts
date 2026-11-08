import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { BRIDGE_PLUGIN_ROUTE, RestClient } from "./rest-client";
import { projectAt } from "./project";
import type { SecretStore } from "./secrets";
import { discoverSite, siteKey } from "./site";

/**
 * `wpsync status`: where a site project stands, for the wp-dev skill to pick the next phase
 * (design section 14.3). Never changes anything; the bridge stays switched off.
 */

export type Phase = "no-project" | "start-gate" | "connect" | "pull" | "work" | "publish-pending";

export interface Status {
  dir: string;
  phase: Phase;
  homeUrl?: string;
  localUrl?: string;
  connected?: boolean;
  /** The saved key still signs in. */
  keyWorks?: boolean;
  bridgeVersion?: string | null;
  lastPull?: string;
  lastPush?: { at: string; finalized: boolean };
  ddevRunning?: boolean;
  /** The next thing to do, in words. */
  next: string;
}

export async function status(options: { dir?: string; allowHttp?: boolean }, store: SecretStore): Promise<Status> {
  const project = projectAt(options.dir ?? process.cwd());
  if (!project.exists()) {
    return { dir: project.dir, phase: "no-project", next: "Start a new wp-dev project: wpsync init <site-url> (the start gate)." };
  }
  const meta = project.read();
  const base: Status = {
    dir: project.dir,
    phase: "start-gate",
    homeUrl: meta.homeUrl,
    localUrl: meta.localUrl,
    lastPull: meta.lastPull?.at,
    lastPush: meta.lastPush ? { at: meta.lastPush.at, finalized: meta.lastPush.finalized } : undefined,
    next: "",
  };

  const connection = await store.get(siteKey(meta.homeUrl)).catch(() => null);
  base.connected = !!connection;
  if (connection) {
    try {
      const site = await discoverSite(meta.homeUrl, { allowHttp: options.allowHttp });
      const rest = new RestClient(site, connection.username, connection.applicationPassword);
      const me = await rest.get("/wp/v2/users/me");
      base.keyWorks = me.status === 200;
      if (base.keyWorks) {
        const plugin = await rest.get(BRIDGE_PLUGIN_ROUTE);
        base.bridgeVersion = plugin.status === 200 ? String((plugin.body as { version?: string }).version ?? "") : null;
      }
    } catch {
      base.keyWorks = false;
    }
  }
  if (existsSync(project.ddevConfigPath)) {
    const describe = spawnSync("ddev", ["describe", "-j"], { cwd: project.dir, encoding: "utf8" });
    base.ddevRunning = describe.status === 0 && /"status":\s*"running"/.test(describe.stdout ?? "");
  }

  if (!connection || base.keyWorks === false) {
    base.phase = "connect";
    base.next = `Connect: wpsync connect ${meta.homeUrl} (a macOS dialog asks for the admin login).`;
  } else if (meta.setup !== "ready") {
    base.phase = "pull";
    base.next = `Pull the site: wpsync pull ${meta.homeUrl} --dir .`;
  } else if (meta.lastPush && !meta.lastPush.finalized) {
    base.phase = "publish-pending";
    base.next = "The last publish is waiting: check live, then wpsync finalize (keep it) or wpsync rollback (undo it).";
  } else {
    base.phase = "work";
    base.next = "Ready to work on the local copy.";
  }
  return base;
}
