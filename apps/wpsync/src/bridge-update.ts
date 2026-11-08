import { BRIDGE_VERSION, InfoResponse, ROUTES, SelfUpdateResponse } from "@wp-dev-automation/protocol";
import { BRIDGE_FILES } from "./generated/embedded";
import type { RestClient } from "./rest-client";

/** -1, 0 or 1, comparing "1.2.3"-style versions number by number. */
export function compareVersions(a: string, b: string): number {
  const as = a.split(".").map((n) => Number.parseInt(n, 10) || 0);
  const bs = b.split(".").map((n) => Number.parseInt(n, 10) || 0);
  for (let i = 0; i < Math.max(as.length, bs.length); i++) {
    const diff = (as[i] ?? 0) - (bs[i] ?? 0);
    if (diff !== 0) return Math.sign(diff);
  }
  return 0;
}

/**
 * With the bridge switched on: if the site's bridge is older than the one this wpsync carries,
 * replace it (POST self-update) and return the new info. A newer bridge on the site is left
 * alone: this wpsync is the one that's out of date.
 */
export async function ensureCurrentBridge(rest: RestClient, info: InfoResponse, log: (line: string) => void = () => {}): Promise<InfoResponse> {
  if (compareVersions(info.bridge.version, BRIDGE_VERSION) >= 0) return info;
  log(`Updating the site's wpsync bridge from ${info.bridge.version} to ${BRIDGE_VERSION}…`);
  const files: Record<string, string> = {};
  for (const [path, content] of Object.entries(BRIDGE_FILES)) files[path] = Buffer.from(content).toString("base64");
  await rest.bridge(SelfUpdateResponse, ROUTES.selfUpdate, { method: "POST", body: { version: BRIDGE_VERSION, files } });
  return rest.bridge(InfoResponse, ROUTES.info);
}
