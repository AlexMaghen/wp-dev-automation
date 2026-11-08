import { z } from "zod";
import { WpsyncError } from "./errors";
import { http, parseJson } from "./http";

/** Where a WordPress site's pieces are, found from its REST API index. */
export interface Site {
  /** The REST index's "url": siteurl, where WordPress itself (wp-login.php, wp-admin) lives. */
  siteUrl: string;
  /** The REST index's "home": the address visitors use. Also the key for saved credentials. */
  homeUrl: string;
  name: string;
  /** Builds a REST URL for a route such as "/wp/v2/users/me". */
  restUrl(route: string, query?: Record<string, string>): string;
  /** True when the site offers Application Passwords (needs HTTPS or a "local" environment). */
  applicationPasswords: boolean;
}

const RestIndex = z.object({
  name: z.string(),
  url: z.string(),
  home: z.string(),
  namespaces: z.array(z.string()),
  authentication: z.union([z.record(z.string(), z.unknown()), z.array(z.unknown())]).optional(),
});

/** "example.com" → "https://example.com"; refuses plain HTTP unless allowHttp. */
export function normalizeUrl(input: string, allowHttp = false): string {
  const withScheme = /^[a-z]+:\/\//i.test(input) ? input : `https://${input}`;
  let url: URL;
  try {
    url = new URL(withScheme);
  } catch {
    throw new WpsyncError("bad_url", `"${input}" isn't a web address.`);
  }
  if (url.protocol === "http:" && !allowHttp) {
    throw new WpsyncError(
      "http_refused",
      `${url.origin} uses plain HTTP, which would send the site's keys unencrypted.`,
      "Use the site's https:// address.",
    );
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new WpsyncError("bad_url", `"${input}" isn't a web address.`);
  }
  return `${url.origin}${url.pathname}`.replace(/\/+$/, "");
}

function stripSlash(url: string): string {
  return url.replace(/\/+$/, "");
}

/**
 * Finds the REST API. Sites with "pretty" permalinks answer at /wp-json/; sites without them
 * only at /?rest_route=/.
 */
export async function discoverSite(input: string, options: { allowHttp?: boolean } = {}): Promise<Site> {
  const base = normalizeUrl(input, options.allowHttp);

  const pretty = await http(`${base}/wp-json/`, { headers: { Accept: "application/json" } });
  let index = RestIndex.safeParse(parseJson(pretty.text));
  let restUrl: Site["restUrl"];

  if (index.success) {
    const root = stripSlash(pretty.url.replace(/\/wp-json\/?$/, ""));
    restUrl = (route, query = {}) => {
      const url = new URL(`${root}/wp-json${route}`);
      for (const [key, value] of Object.entries(query)) url.searchParams.set(key, value);
      return url.toString();
    };
  } else {
    const plain = await http(`${base}/?rest_route=/`, { headers: { Accept: "application/json" } });
    index = RestIndex.safeParse(parseJson(plain.text));
    if (!index.success) {
      throw new WpsyncError(
        "not_wordpress",
        `${base} didn't answer like a WordPress site (no REST API at /wp-json/ or /?rest_route=/).`,
        "Check the address. If it is WordPress, a security plugin may be blocking the REST API.",
      );
    }
    const root = stripSlash(new URL(plain.url).origin + new URL(plain.url).pathname);
    restUrl = (route, query = {}) => {
      const url = new URL(`${root}/`);
      url.searchParams.set("rest_route", route);
      for (const [key, value] of Object.entries(query)) url.searchParams.set(key, value);
      return url.toString();
    };
  }

  const data = index.data;
  if (!data.namespaces.includes("wp/v2")) {
    throw new WpsyncError("rest_limited", `${base} has its WordPress REST API turned off.`);
  }
  const auth = data.authentication;
  const applicationPasswords = !!auth && !Array.isArray(auth) && "application-passwords" in auth;

  return {
    siteUrl: stripSlash(data.url),
    homeUrl: stripSlash(data.home),
    name: data.name,
    restUrl,
    applicationPasswords,
  };
}

/** The key saved credentials are filed under: the home address, lowercased host. */
export function siteKey(homeUrl: string): string {
  const url = new URL(homeUrl);
  return `${url.protocol}//${url.host.toLowerCase()}${stripSlash(url.pathname)}`;
}
