import { ErrorResponse, PLUGIN_FILE } from "@wp-dev-automation/protocol";
import { WpsyncError } from "./errors";
import { http, parseJson } from "./http";
import type { Site } from "./site";

export interface RestResult {
  status: number;
  body: unknown;
  /** The WordPress error code when the call failed with one. */
  errorCode?: string;
}

/** Core REST route for the bridge: /wp/v2/plugins/<folder>/<file without .php>. */
export const BRIDGE_PLUGIN_ROUTE = `/wp/v2/plugins/${PLUGIN_FILE.replace(/\.php$/, "")}`;

/** REST calls authenticated with an Application Password. */
export class RestClient {
  constructor(
    private readonly site: Site,
    private readonly username: string,
    private readonly applicationPassword: string,
  ) {}

  async call(
    method: string,
    route: string,
    options: { body?: unknown; query?: Record<string, string> } = {},
  ): Promise<RestResult> {
    const headers: Record<string, string> = {
      Accept: "application/json",
      Authorization: `Basic ${Buffer.from(`${this.username}:${this.applicationPassword}`).toString("base64")}`,
    };
    if (options.body !== undefined) headers["Content-Type"] = "application/json";
    const response = await http(this.site.restUrl(route, options.query), {
      method,
      headers,
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
    });
    const body = parseJson(response.text) ?? response.text;
    const error = response.status >= 400 ? ErrorResponse.safeParse(body) : undefined;
    return { status: response.status, body, errorCode: error?.success ? error.data.code : undefined };
  }

  get(route: string, query?: Record<string, string>): Promise<RestResult> {
    return this.call("GET", route, { query });
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
}
