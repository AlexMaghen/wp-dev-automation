import { readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

/** Generated file, relative to apps/wpsync. */
export const EMBED_PATH = "src/generated/bridge-files.ts";

const BRIDGE_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..", "packages", "bridge-plugin", "wpsync-bridge");

function listFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => {
      const full = join(dir, entry.name);
      if (entry.name.startsWith(".")) return [];
      return entry.isDirectory() ? listFiles(full) : [full];
    })
    .sort();
}

/** The generated module's source: every bridge file, keyed by its path inside the plugin folder. */
export function renderEmbeddedBridge(): string {
  const entries = listFiles(BRIDGE_DIR).map((full) => {
    const path = relative(BRIDGE_DIR, full).split("\\").join("/");
    return `  ${JSON.stringify(path)}: ${JSON.stringify(readFileSync(full, "utf8"))},`;
  });
  return [
    "/**",
    " * GENERATED from packages/bridge-plugin/wpsync-bridge by `pnpm generate`. Do not edit.",
    " */",
    "",
    "export const BRIDGE_FILES: Readonly<Record<string, string>> = {",
    ...entries,
    "};",
    "",
  ].join("\n");
}
