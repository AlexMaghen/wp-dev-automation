/**
 * Writes everything derived from the TypeScript source of truth:
 *   ../bridge-plugin/wpsync-bridge/includes/protocol.php   constants for the PHP bridge
 *   json-schema/info.schema.json                           GET info response
 *   json-schema/error.schema.json                          error body
 *
 * Run with `pnpm generate`. `test/generated.test.ts` fails when the committed files are stale.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildGenerated } from "../src/generated";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

for (const [path, content] of Object.entries(buildGenerated())) {
  const full = join(root, path);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, content);
  console.log(`wrote ${path}`);
}
