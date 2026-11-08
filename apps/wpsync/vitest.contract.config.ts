import { defineConfig } from "vitest/config";

/**
 * Contract tests: run wpsync against the DDEV harness site in packages/test-harness.
 * Needs Docker and DDEV.
 */
export default defineConfig({
  test: {
    include: ["test/contract/**/*.test.ts"],
    globalSetup: ["test/contract/global-setup.ts"],
    testTimeout: 600_000,
    hookTimeout: 300_000,
    fileParallelism: false,
  },
});
