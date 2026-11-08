/**
 * Values both sides must agree on. The PHP copies in
 * packages/bridge-plugin/wpsync-bridge/includes/protocol.php are generated from this file
 * (`pnpm generate`); never edit them by hand.
 */

/** Bumped whenever a route, request or response changes shape. */
export const PROTOCOL_VERSION = 1;

/** Version of the bridge plugin built from this repository. */
export const BRIDGE_VERSION = "0.1.0";

/** REST namespace: routes live under /wp-json/wpsync/v1/. */
export const REST_NAMESPACE = "wpsync/v1";

/** Plugin folder and main file, as WordPress identifies the plugin. */
export const PLUGIN_SLUG = "wpsync-bridge";
export const PLUGIN_FILE = "wpsync-bridge/wpsync-bridge.php";

/** Seconds the bridge stays usable after activation before it deactivates itself. */
export const DEADLINE_SECONDS = 2 * 60 * 60;

/** Option names the bridge stores in wp_options. */
export const OPTION_DEADLINE = "wpsync_bridge_deadline";

/** Route paths, relative to the namespace. */
export const ROUTES = {
  info: "/info",
} as const;

/** Error codes the bridge returns, beyond WordPress core's own. */
export const ERROR_CODES = {
  notLoggedIn: "wpsync_not_logged_in",
  forbidden: "wpsync_forbidden",
  httpsRequired: "wpsync_https_required",
  expired: "wpsync_expired",
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];
