import { strToU8, zipSync, type Zippable } from "fflate";
import { PLUGIN_SLUG } from "@wp-dev-automation/protocol";
import { BRIDGE_FILES } from "./generated/embedded";

export const BRIDGE_ZIP_NAME = `${PLUGIN_SLUG}.zip`;

/** Fixed timestamp so the same bridge always zips to the same bytes. */
const MTIME = new Date("2026-01-01T00:00:00Z");

/** The bridge plugin as an installable zip: one wpsync-bridge/ folder, as WordPress expects. */
export function bridgeZip(): Uint8Array {
  const files: Zippable = {};
  for (const [path, content] of Object.entries(BRIDGE_FILES)) {
    files[`${PLUGIN_SLUG}/${path}`] = [strToU8(content), { mtime: MTIME }];
  }
  return zipSync(files, { level: 9 });
}
