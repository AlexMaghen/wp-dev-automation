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
  dbTables: "/db/tables",
  dbRows: "/db/rows",
  filesList: "/files/list",
  filesFetch: "/files/fetch",
  filesRead: "/files/read",
} as const;

/**
 * Paths a pull never copies, relative to the WordPress root. A "*" matches within one path
 * segment. Covers secrets, wpsync's own files, caches and other backup plugins' archives.
 */
export const PULL_EXCLUDES = [
  "wp-config.php",
  ".maintenance",
  ".git",
  ".svn",
  "error_log",
  "wp-content/plugins/wpsync-bridge",
  "wp-content/uploads/wpsync-*",
  "wp-content/cache",
  "wp-content/upgrade",
  "wp-content/upgrade-temp-backup",
  "wp-content/debug.log",
  "wp-content/ai1wm-backups",
  "wp-content/updraft",
  "wp-content/backups-dup-lite",
  "wp-content/backups-dup-pro",
  "wp-content/wpvividbackups",
  "wp-content/wflogs",
] as const;

/** Most SQL a single db/rows response carries, in bytes. */
export const DB_CHUNK_BYTES = 2_000_000;

/** Most rows a single db/rows response reads. */
export const DB_ROWS_LIMIT = 2_000;

/** Most entries a single files/list response carries. */
export const FILES_LIST_LIMIT = 5_000;

/** Files up to this size go in files/fetch batches; bigger ones are read by range. */
export const FETCH_BATCH_BYTES = 8_000_000;

/** Most files in one files/fetch batch. */
export const FETCH_BATCH_FILES = 500;

/** Seconds a paged endpoint works before returning a cursor, to stay inside host time limits. */
export const TIME_BUDGET_SECONDS = 15;

/** Error codes the bridge returns, beyond WordPress core's own. */
export const ERROR_CODES = {
  notLoggedIn: "wpsync_not_logged_in",
  forbidden: "wpsync_forbidden",
  httpsRequired: "wpsync_https_required",
  expired: "wpsync_expired",
  badRequest: "wpsync_bad_request",
  notFound: "wpsync_not_found",
  unsupported: "wpsync_unsupported",
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];
