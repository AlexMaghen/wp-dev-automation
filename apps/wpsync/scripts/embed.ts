/**
 * Writes src/generated/embedded.ts: the bridge plugin, the site template and the rules as strings,
 * so wpsync (and its single compiled binary or bundle) needs no files beside it.
 *
 * Run with `pnpm generate` after changing any of them.
 * test/embed.test.ts fails when the committed file is stale.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { EMBED_PATH, renderEmbedded } from "./embed-lib";

const app = join(dirname(fileURLToPath(import.meta.url)), "..");
const target = join(app, EMBED_PATH);
mkdirSync(dirname(target), { recursive: true });
writeFileSync(target, renderEmbedded());
console.log(`wrote ${EMBED_PATH}`);
