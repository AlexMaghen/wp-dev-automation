import {
  BRIDGE_VERSION,
  DEADLINE_SECONDS,
  ERROR_CODES,
  ErrorResponse,
  InfoResponse,
  OPTION_DEADLINE,
  PLUGIN_FILE,
  PROTOCOL_VERSION,
  REST_NAMESPACE,
  ROUTES,
} from "@wp-dev-automation/protocol";
import { afterAll, beforeAll, describe, expect, it, inject } from "vitest";
import { wp } from "../harness/ddev";
import { PLUGIN_ROUTE, rest, setBridgeActive } from "./client";

const INFO = `/${REST_NAMESPACE}${ROUTES.info}`;

function expectError(result: { status: number; body: unknown }, status: number, code: string): void {
  expect(result.status, JSON.stringify(result.body)).toBe(status);
  const error = ErrorResponse.parse(result.body);
  expect(error.code).toBe(code);
}

describe("bridge lifecycle and info", () => {
  beforeAll(async () => {
    const result = await setBridgeActive(true);
    expect(result.status, JSON.stringify(result.body)).toBe(200);
  });

  afterAll(async () => {
    await setBridgeActive(false);
  });

  it("activates through core REST with an Application Password", async () => {
    const result = await rest(PLUGIN_ROUTE);
    expect((result.body as { status: string }).status).toBe("active");
  });

  it("answers info with a response that matches the protocol", async () => {
    const result = await rest(INFO);
    expect(result.status, JSON.stringify(result.body)).toBe(200);
    const info = InfoResponse.parse(result.body);

    expect(info.bridge.version).toBe(BRIDGE_VERSION);
    expect(info.bridge.protocolVersion).toBe(PROTOCOL_VERSION);
    const secondsLeft = (Date.parse(info.bridge.deadline) - Date.now()) / 1000;
    expect(secondsLeft).toBeGreaterThan(DEADLINE_SECONDS - 300);
    expect(secondsLeft).toBeLessThanOrEqual(DEADLINE_SECONDS + 60);

    // DDEV's wp-config-ddev.php derives the site URL from the request's scheme.
    expect(info.site.siteUrl).toBe(inject("harness").baseUrl);
    expect(info.site.multisite).toBe(false);
    expect(info.database.engine).toBe("mariadb");
    expect(info.database.version).toMatch(/^11\.4\./);
    expect(info.database.tablePrefix).toBe("wp_");
    expect(info.php.version).toMatch(/^8\.3\./);
    expect(info.theme.stylesheet).toBe("twentytwentyfive");
    expect(info.plugins).toContainEqual(
      expect.objectContaining({ file: PLUGIN_FILE, version: BRIDGE_VERSION, active: true }),
    );
    expect(info.capabilities.fileModsAllowed).toBe(true);
  });

  it("refuses a request with no credentials", async () => {
    expectError(await rest(INFO, { auth: null }), 401, ERROR_CODES.notLoggedIn);
  });

  it("refuses a user who isn't an administrator", async () => {
    expectError(await rest(INFO, { auth: inject("harness").editorAuth }), 403, ERROR_CODES.forbidden);
  });

  it("deactivates itself once its deadline has passed", async () => {
    wp("option", "update", OPTION_DEADLINE, "1");

    expectError(await rest(INFO), 403, ERROR_CODES.expired);

    const plugin = await rest(PLUGIN_ROUTE);
    expect((plugin.body as { status: string }).status).toBe("inactive");
    expect(() => wp("option", "get", OPTION_DEADLINE)).toThrow();

    // Inactive means no routes at all.
    expectError(await rest(INFO), 404, "rest_no_route");
  });
});
