import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { strFromU8, unzipSync } from "fflate";
import { describe, expect, it } from "vitest";
import { EMBED_PATH, renderEmbedded } from "../scripts/embed-lib";
import { bridgeZip } from "../src/bridge-zip";
import { loginDialogScript } from "../src/dialog";
import { WpsyncError } from "../src/errors";
import { CookieJar } from "../src/http";
import { normalizeUrl, siteKey } from "../src/site";
import { waitUntilServing } from "../src/verify";

const app = join(dirname(fileURLToPath(import.meta.url)), "..");

describe("embedded bridge", () => {
  it(`${EMBED_PATH} is up to date (run pnpm generate if this fails)`, () => {
    expect(readFileSync(join(app, EMBED_PATH), "utf8")).toBe(renderEmbedded());
  });

  it("zips into a single wpsync-bridge/ folder with the plugin's files", () => {
    const files = unzipSync(bridgeZip());
    const names = Object.keys(files);
    expect(names.every((name) => name.startsWith("wpsync-bridge/"))).toBe(true);
    const main = files["wpsync-bridge/wpsync-bridge.php"];
    expect(main && strFromU8(main)).toMatch(/Plugin Name:\s+wpsync bridge/);
    expect(names).toContain("wpsync-bridge/includes/protocol.php");
  });

  it("zips to the same bytes every time", () => {
    expect(Buffer.from(bridgeZip()).equals(Buffer.from(bridgeZip()))).toBe(true);
  });
});

describe("CookieJar", () => {
  it("keeps cookies the server sets and drops ones it expires", () => {
    const jar = new CookieJar();
    const headers = new Headers();
    headers.append("Set-Cookie", "wordpress_logged_in_abc=user%7C123; path=/; HttpOnly");
    headers.append("Set-Cookie", "wordpress_sec_abc=xyz; path=/wp-admin");
    jar.absorb(headers);
    expect(jar.has("wordpress_logged_in_")).toBe(true);
    expect(jar.header()).toBe("wordpress_logged_in_abc=user%7C123; wordpress_sec_abc=xyz");

    const logout = new Headers();
    logout.append("Set-Cookie", "wordpress_logged_in_abc=%20; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/");
    logout.append("Set-Cookie", "wordpress_sec_abc=deleted; Max-Age=0");
    jar.absorb(logout);
    expect(jar.header()).toBeUndefined();
  });
});

describe("site addresses", () => {
  it("adds https:// and drops a trailing slash", () => {
    expect(normalizeUrl("example.com/")).toBe("https://example.com");
    expect(normalizeUrl("https://example.com/blog/")).toBe("https://example.com/blog");
  });

  it("refuses plain HTTP unless allowed", () => {
    expect(() => normalizeUrl("http://example.com")).toThrow(WpsyncError);
    expect(normalizeUrl("http://example.com", true)).toBe("http://example.com");
  });

  it("files credentials under a lowercased host", () => {
    expect(siteKey("https://Example.COM/")).toBe("https://example.com");
  });
});

describe("login dialog script", () => {
  it("asks for an admin login by the site's address", () => {
    const script = loginDialogScript("https://example.com", "admin");
    expect(script).toContain("Enter an admin username and password for https://example.com.");
    expect(script).toContain('" at " & "https://example.com"');
    expect(script).toContain('default answer "admin"');
    expect(script).toContain("with hidden answer");
  });
});

describe("waitUntilServing", () => {
  const clock = () => {
    let t = 0;
    return { now: () => t, sleep: async (ms: number) => void (t += ms) };
  };

  it("waits out DDEV's 502s right after ddev start", async () => {
    const statuses = [502, 0, 503, 200, 200];
    let calls = 0;
    const status = await waitUntilServing(async () => statuses[calls++]!, clock());
    expect(status).toBe(200);
    expect(calls).toBe(4);
  });

  it("returns at once for other statuses, errors included", async () => {
    let calls = 0;
    expect(await waitUntilServing(async () => (calls++, 500), clock())).toBe(500);
    expect(calls).toBe(1);
  });

  it("gives up after the timeout without throwing", async () => {
    let calls = 0;
    const status = await waitUntilServing(async () => {
      calls++;
      throw new Error("refused");
    }, { ...clock(), timeoutMs: 2_000, intervalMs: 500 });
    expect(status).toBe(0);
    expect(calls).toBe(5);
  });
});
