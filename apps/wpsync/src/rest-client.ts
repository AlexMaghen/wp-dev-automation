import { ErrorResponse, PLUGIN_FILE, REST_NAMESPACE } from "@wp-dev-automation/protocol";
import type { z } from "zod";
import { WpsyncError } from "./errors";
import { http, parseJson, type HttpResponse } from "./http";
import type { Site } from "./site";

export interface RestResult {
  status: number;
  body: unknown;
  /** The WordPress error code when the call failed with one. */
  errorCode?: string;
}

interface CallOptions {
  body?: unknown;
  query?: Record<string, string>;
}

/** Core REST route for the bridge: /wp/v2/plugins/<folder>/<file without .php>. */
export const BRIDGE_PLUGIN_ROUTE = `/wp/v2/plugins/${PLUGIN_FILE.replace(/\.php$/, "")}`;

/** Tries for calls that fail on the way (network drop, 502 from a busy host). */
const ATTEMPTS = 4;

/** REST calls authenticated with an Application Password. */
export class RestClient {
  constructor(
    private readonly site: Site,
    private readonly username: string,
    private readonly applicationPassword: string,
  ) {}

  private async send(method: string, route: string, options: CallOptions, accept: string): Promise<HttpResponse> {
    const headers: Record<string, string> = {
      Accept: accept,
      Authorization: `Basic ${Buffer.from(`${this.username}:${this.applicationPassword}`).toString("base64")}`,
    };
    if (options.body !== undefined) headers["Content-Type"] = "application/json";
    const url = this.site.restUrl(route, options.query);
    const body = options.body === undefined ? undefined : JSON.stringify(options.body);

    for (let attempt = 1; ; attempt++) {
      try {
        const response = await http(url, { method, headers, body });
        if (response.status < 500 || response.status === 501 || attempt === ATTEMPTS) return response;
      } catch (error) {
        if (!(error instanceof WpsyncError) || error.code !== "unreachable" || attempt === ATTEMPTS) throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, 500 * 2 ** attempt));
    }
  }

  async call(method: string, route: string, options: CallOptions = {}): Promise<RestResult> {
    const response = await this.send(method, route, options, "application/json");
    const body = parseJson(response.text) ?? response.text;
    const error = response.status >= 400 ? ErrorResponse.safeParse(body) : undefined;
    return { status: response.status, body, errorCode: error?.success ? error.data.code : undefined };
  }

  get(route: string, query?: Record<string, string>): Promise<RestResult> {
    return this.call("GET", route, { query });
  }

  /** Calls a bridge route and checks the response against its protocol schema. */
  async bridge<T extends z.ZodType>(schema: T, route: string, options: CallOptions & { method?: string } = {}): Promise<z.infer<T>> {
    const result = await this.call(options.method ?? "GET", `/${REST_NAMESPACE}${route}`, options);
    const parsed = schema.safeParse(result.body);
    if (result.status !== 200 || !parsed.success) {
      throw bridgeError(route, result.status, result.errorCode, typeof result.body === "string" ? result.body : undefined);
    }
    return parsed.data;
  }

  /** Calls a bridge route that answers with raw bytes (file downloads). */
  async bridgeRaw(route: string, options: CallOptions & { method?: string } = {}): Promise<HttpResponse> {
    const response = await this.send(options.method ?? "GET", `/${REST_NAMESPACE}${route}`, options, "application/octet-stream");
    if (response.status !== 200 || !(response.headers.get("content-type") ?? "").includes("application/octet-stream")) {
      const error = ErrorResponse.safeParse(parseJson(response.text));
      throw bridgeError(route, response.status, error.success ? error.data.code : undefined, response.text);
    }
    return response;
  }

  /** Turns the bridge on or off through core's plugins endpoint. */
  async setBridgeActive(active: boolean): Promise<void> {
    const result = await this.call("PUT", BRIDGE_PLUGIN_ROUTE, {
      body: { status: active ? "active" : "inactive" },
    });
    if (result.status !== 200) {
      throw new WpsyncError(
        active ? "bridge_activation_failed" : "bridge_deactivation_failed",
        `WordPress wouldn't ${active ? "activate" : "deactivate"} the wpsync bridge (HTTP ${result.status}${result.errorCode ? `, ${result.errorCode}` : ""}).`,
      );
    }
  }

  /** Runs work with the bridge switched on, and switches it off again whatever happens. */
  async withBridge<T>(work: () => Promise<T>): Promise<T> {
    await this.setBridgeActive(true);
    try {
      return await work();
    } finally {
      await this.setBridgeActive(false).catch(() => {
        // Its 2-hour deadline switches it off anyway.
      });
    }
  }
}

function bridgeError(route: string, status: number, code: string | undefined, text: string | undefined): WpsyncError {
  // A PHP fatal error shows up as an HTML page; its first line is the useful part.
  const detail = !code && text ? text.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 200) : "";
  return new WpsyncError(
    "bridge_error",
    `The bridge failed on ${route} (HTTP ${status}${code ? `, ${code}` : ""})${detail ? `: ${detail}` : "."}`,
  );
}
