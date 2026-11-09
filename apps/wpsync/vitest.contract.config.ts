import { MKCERT_ROOT_CA } from "@wp-dev-automation/test-harness";
import { defineConfig } from "vitest/config";

// Lets the test workers (started after this) trust DDEV's https certificates.
if (MKCERT_ROOT_CA) process.env.NODE_EXTRA_CA_CERTS = MKCERT_ROOT_CA;

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
