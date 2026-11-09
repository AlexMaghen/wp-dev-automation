import { MKCERT_ROOT_CA } from "@wp-dev-automation/test-harness";
import { defineConfig } from "vitest/config";

// Lets the test workers (started after this) trust DDEV's https certificates.
if (MKCERT_ROOT_CA) process.env.NODE_EXTRA_CA_CERTS = MKCERT_ROOT_CA;

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
