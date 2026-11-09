import { WpsyncError } from "./errors";

/**
 * Cookies for one WordPress site, kept the way a browser would for a single visit. Domain and
 * path are ignored: every cookie goes to every request on this one site.
 */
export class CookieJar {
  private readonly cookies = new Map<string, string>();

  set(name: string, value: string): void {
    this.cookies.set(name, value);
  }

  has(prefix: string): boolean {
    return [...this.cookies.keys()].some((name) => name.startsWith(prefix));
  }

  /** Takes in a response's Set-Cookie headers, dropping cookies the server expires. */
  absorb(headers: Headers): void {
    for (const line of headers.getSetCookie()) {
      const [pair = "", ...attributes] = line.split(";");
      const eq = pair.indexOf("=");
      if (eq <= 0) continue;
      const name = pair.slice(0, eq).trim();
      const value = pair.slice(eq + 1).trim();
      if (isExpired(attributes) || value === "" || value === "deleted") {
        this.cookies.delete(name);
      } else {
        this.cookies.set(name, value);
      }
    }
  }

  header(): string | undefined {
    if (this.cookies.size === 0) return undefined;
    return [...this.cookies].map(([name, value]) => `${name}=${value}`).join("; ");
  }
}

function isExpired(attributes: string[]): boolean {
  for (const raw of attributes) {
    const [key = "", value = ""] = raw.trim().split("=", 2);
    if (key.toLowerCase() === "max-age" && Number(value) <= 0) return true;
    if (key.toLowerCase() === "expires") {
      const when = Date.parse(value);
      if (!Number.isNaN(when) && when < Date.now()) return true;
    }
  }
  return false;
}

export interface HttpRequest {
  method?: string;
  headers?: Record<string, string>;
  body?: string | FormData | Uint8Array;
  jar?: CookieJar;
  /** Follow redirects (GET only), carrying cookies along. Default: true for GET. */
  follow?: boolean;
}

export interface HttpResponse {
  status: number;
  url: string;
  headers: Headers;
  /** The body as raw bytes (for file downloads) … */
  bytes: Buffer;
  /** … and decoded as UTF-8. */
  text: string;
}

const USER_AGENT = "wpsync/0.2 (+https://github.com/AlexMaghen/wp-dev-automation)";
const MAX_REDIRECTS = 5;

/** fetch with cookies, manual redirects and a plain-words error when the site can't be reached. */
export async function http(url: string, request: HttpRequest = {}): Promise<HttpResponse> {
  const method = request.method ?? "GET";
  const follow = request.follow ?? method === "GET";
  let current = url;

  for (let hop = 0; ; hop++) {
    const headers: Record<string, string> = { "User-Agent": USER_AGENT, ...request.headers };
    const cookie = request.jar?.header();
    if (cookie) headers.Cookie = cookie;

    let response: Response;
    try {
      response = await fetch(current, {
        method: hop === 0 ? method : "GET",
        headers,
        body: hop === 0 ? (request.body as RequestInit["body"]) : undefined,
        redirect: "manual",
      });
    } catch (error) {
      const reason = error instanceof Error && error.cause instanceof Error ? error.cause.message : String(error);
      throw new WpsyncError("unreachable", `Couldn't reach ${new URL(current).origin}: ${reason}`);
    }
    request.jar?.absorb(response.headers);

    const location = response.headers.get("location");
    if (follow && location && response.status >= 300 && response.status < 400 && hop < MAX_REDIRECTS) {
      await response.arrayBuffer();
      current = new URL(location, current).toString();
      continue;
    }
    const bytes = Buffer.from(await response.arrayBuffer());
    return { status: response.status, url: current, headers: response.headers, bytes, text: bytes.toString("utf8") };
  }
}

/** Parses JSON, or returns undefined when the body isn't JSON (an HTML error page, say). */
export function parseJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
}
