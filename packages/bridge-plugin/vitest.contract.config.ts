import { defineConfig } from "vitest/config";

/**
 * Contract tests: run the real bridge in a DDEV WordPress site (test/harness/site) and check
 * every response against the schemas in @wp-dev-automation/protocol. Needs Docker and DDEV.
 */
export default defineConfig({
  test: {
    include: ["test/contract/**/*.test.ts"],
    globalSetup: ["test/harness/global-setup.ts"],
    testTimeout: 60_000,
    hookTimeout: 120_000,
    fileParallelism: false,
  },
});
