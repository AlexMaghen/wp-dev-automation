import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { wordfenceSteps } from "./doctor";
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
  /**
   * For sites whose Wordfence blocks Application Passwords (noted in .wpsync.json): where its
   * "Disable WordPress application passwords" setting is now, checked on the live site.
   * "switched-off": wpsync can work; remind the developer to switch it back on when done.
   * "back-on": the site is protected again; it must be switched off before wpsync runs.
   */
  wordfence?: "switched-off" | "back-on";
  /** Steps for the next switch: back on when it's off, off when it's back on. */
  wordfenceSteps?: string;
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
  if (meta.wordfence) {
    const site = await discoverSite(meta.homeUrl, { allowHttp: options.allowHttp }).catch(() => null);
    base.wordfence = site && !site.applicationPasswords ? "back-on" : "switched-off";
    base.wordfenceSteps = wordfenceSteps(site?.siteUrl ?? meta.siteUrl ?? meta.homeUrl, base.wordfence === "switched-off");
  }
  if (existsSync(project.ddevConfigPath)) {
    const describe = spawnSync("ddev", ["describe", "-j"], { cwd: project.dir, encoding: "utf8" });
    base.ddevRunning = describe.status === 0 && /"status":\s*"running"/.test(describe.stdout ?? "");
  }

  if (base.wordfence === "back-on" && connection) {
    // Expected between work sessions: the key is refused until the setting is switched off.
    base.phase = meta.setup !== "ready" ? "pull" : meta.lastPush && !meta.lastPush.finalized ? "publish-pending" : "work";
    base.next =
      "Wordfence's \"Disable WordPress application passwords\" is on, as it should be between work sessions. " +
      "Local work needs nothing; switch it off again before the next pull or publish.";
    return base;
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
    base.next =
      base.wordfence === "switched-off"
        ? "Ready to work on the local copy. When you're done with pulls and publishes for now, switch Wordfence's \"Disable WordPress application passwords\" back on."
        : "Ready to work on the local copy.";
  }
  return base;
}
