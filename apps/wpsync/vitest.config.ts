import { tmpdir } from "node:os";
import { join } from "node:path";
import { defineConfig } from "vitest/config";

// Tests list their throwaway site folders here, not in the developer's own ~/.wpsync/sites.json.
process.env.WPSYNC_SITES_FILE = join(tmpdir(), `wpsync-test-sites-${process.pid}.json`);

/** Unit tests only; the contract tests need Docker (vitest.contract.config.ts). */
export default defineConfig({
  test: {
    include: ["test/**/*.test.ts"],
    exclude: ["test/contract/**"],
  },
});
