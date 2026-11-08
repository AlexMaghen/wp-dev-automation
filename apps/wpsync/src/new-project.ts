import { connect } from "./connect";
import type { CredentialsProvider } from "./dialog";
import { allOk, checkLocal, checkSite, type Check } from "./doctor";
import { init } from "./local-commands";
import { defaultProjectDir, projectAt } from "./project";
import { pull, type PullResult } from "./pull";
import type { SecretStore } from "./secrets";
import { normalizeUrl } from "./site";
import { status } from "./status";
import { verify } from "./verify";

/**
 * `wpsync new <url>`: phase 1 in one resumable command (design section 14.4). Each step is
 * skipped when it's already done, and it stops at the first thing that needs the developer,
 * with every check's result so they see all problems at once.
 */

export type NewStop = "start-gate" | "mac-checks" | "site-checks" | "done";

export interface NewResult {
  stoppedAt: NewStop;
  dir: string;
  homeUrl: string;
  checks: Check[];
  pull?: PullResult;
  localUrl?: string;
}

export async function newProject(
  url: string,
  options: { dir?: string; allowHttp?: boolean; log?: (line: string) => void },
  deps: { store: SecretStore; credentials: CredentialsProvider },
): Promise<NewResult> {
  const log = options.log ?? (() => {});
  const homeUrl = normalizeUrl(url, options.allowHttp);
  const dir = options.dir ?? defaultProjectDir(homeUrl);
  const project = projectAt(dir);

  if (!project.exists()) {
    const created = init(url, { dir, allowHttp: options.allowHttp });
    return { stoppedAt: "start-gate", dir: created.project.dir, homeUrl: created.homeUrl, checks: [] };
  }

  log("Checking this Mac…");
  const local = await checkLocal();
  if (!allOk(local)) return { stoppedAt: "mac-checks", dir: project.dir, homeUrl, checks: local };

  log("Checking the site…");
  let site = await checkSite(homeUrl, deps.store, options);
  if (!allOk(site)) return { stoppedAt: "site-checks", dir: project.dir, homeUrl, checks: [...local, ...site] };

  const now = await status({ dir: project.dir, allowHttp: options.allowHttp }, deps.store);
  if (now.phase === "connect") {
    log("Connecting (a macOS dialog asks for the admin login)…");
    await connect({ url: homeUrl, allowHttp: options.allowHttp, log }, { credentials: deps.credentials, store: deps.store });
    site = await checkSite(homeUrl, deps.store, options);
    if (!allOk(site)) return { stoppedAt: "site-checks", dir: project.dir, homeUrl, checks: [...local, ...site] };
  }

  let pulled: PullResult | undefined;
  if (project.read().setup !== "ready") {
    log("Pulling the site…");
    pulled = await pull({ url: homeUrl, dir: project.dir, allowHttp: options.allowHttp, log }, { store: deps.store });
  }

  log("Verifying the local copy…");
  const verified = await verify({ dir: project.dir });
  return {
    stoppedAt: "done",
    dir: project.dir,
    homeUrl,
    checks: [...local, ...site, ...verified],
    pull: pulled,
    localUrl: project.read().localUrl,
  };
}
