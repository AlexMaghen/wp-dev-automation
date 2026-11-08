import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { buildGenerated } from "../src/generated";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

describe("generated files", () => {
  for (const [path, content] of Object.entries(buildGenerated())) {
    it(`${path} is up to date (run pnpm generate if this fails)`, () => {
      expect(readFileSync(join(root, path), "utf8")).toBe(content);
    });
  }
});
