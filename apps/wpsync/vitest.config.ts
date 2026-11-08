import { defineConfig } from "vitest/config";

/** Unit tests only; the contract tests need Docker (vitest.contract.config.ts). */
export default defineConfig({
  test: {
    include: ["test/**/*.test.ts"],
    exclude: ["test/contract/**"],
  },
});
