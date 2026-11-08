import { inject } from "vitest";

/** Minimal REST client for the contract tests. auth is "user:application-password" or null. */
export async function rest(
  path: string,
  options: { auth?: string | null; method?: string; body?: unknown } = {},
): Promise<{ status: number; body: unknown }> {
  const { baseUrl, adminAuth } = inject("harness");
  const auth = options.auth === undefined ? adminAuth : options.auth;
  const headers: Record<string, string> = { Accept: "application/json" };
  if (auth) headers.Authorization = `Basic ${Buffer.from(auth).toString("base64")}`;
  if (options.body !== undefined) headers["Content-Type"] = "application/json";

  const response = await fetch(`${baseUrl}/wp-json${path}`, {
    method: options.method ?? "GET",
    headers,
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
  });
  const text = await response.text();
  let body: unknown = text;
  try {
    body = JSON.parse(text);
  } catch {
    // Not JSON (a PHP fatal error page, for instance): keep the text for the failure message.
  }
  return { status: response.status, body };
}

/** Core REST route for the bridge plugin: /wp/v2/plugins/<folder>/<file without .php>. */
export const PLUGIN_ROUTE = "/wp/v2/plugins/wpsync-bridge/wpsync-bridge";

export async function setBridgeActive(active: boolean): Promise<{ status: number; body: unknown }> {
  return rest(PLUGIN_ROUTE, { method: "PUT", body: { status: active ? "active" : "inactive" } });
}
