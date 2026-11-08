import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { ErrorResponse, InfoResponse } from "../src";

const fixtures = join(dirname(fileURLToPath(import.meta.url)), "fixtures");
const load = (name: string): unknown => JSON.parse(readFileSync(join(fixtures, name), "utf8"));

describe("InfoResponse", () => {
  it("accepts a typical response", () => {
    expect(() => InfoResponse.parse(load("info.sample.json"))).not.toThrow();
  });

  it("rejects a response missing the bridge block", () => {
    const sample = load("info.sample.json") as Record<string, unknown>;
    delete sample.bridge;
    expect(InfoResponse.safeParse(sample).success).toBe(false);
  });

  it("accepts null for limits a host hides", () => {
    const sample = load("info.sample.json") as { php: Record<string, unknown> };
    sample.php.memoryLimit = null;
    expect(InfoResponse.safeParse(sample).success).toBe(true);
  });
});

describe("ErrorResponse", () => {
  it("accepts a WordPress REST error", () => {
    const body = { code: "wpsync_expired", message: "Expired.", data: { status: 403 } };
    expect(ErrorResponse.parse(body).data?.status).toBe(403);
  });
});
