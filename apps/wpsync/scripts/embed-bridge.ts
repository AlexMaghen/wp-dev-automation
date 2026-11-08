/**
 * Writes src/generated/bridge-files.ts: the bridge plugin's files as strings, so wpsync (and the
 * single compiled binary) can zip and upload the bridge without any files beside it.
 *
 * Run with `pnpm generate` after changing packages/bridge-plugin/wpsync-bridge.
 * test/embed.test.ts fails when the committed file is stale.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { EMBED_PATH, renderEmbeddedBridge } from "./embed-lib";

const app = join(dirname(fileURLToPath(import.meta.url)), "..");
const target = join(app, EMBED_PATH);
mkdirSync(dirname(target), { recursive: true });
writeFileSync(target, renderEmbeddedBridge());
console.log(`wrote ${EMBED_PATH}`);
