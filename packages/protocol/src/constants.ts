/**
 * Values both sides must agree on. The PHP copies in
 * packages/bridge-plugin/wpsync-bridge/includes/protocol.php are generated from this file
 * (`pnpm generate`); never edit them by hand.
 */

/** Bumped whenever a route, request or response changes shape. */
export const PROTOCOL_VERSION = 1;

/** Version of the bridge plugin built from this repository. */
export const BRIDGE_VERSION = "0.1.2";

/** REST namespace: routes live under /wp-json/wpsync/v1/. */
export const REST_NAMESPACE = "wpsync/v1";

/** Plugin folder and main file, as WordPress identifies the plugin. */
export const PLUGIN_SLUG = "wpsync-bridge";
export const PLUGIN_FILE = "wpsync-bridge/wpsync-bridge.php";

/** Seconds the bridge stays usable after activation before it deactivates itself. */
export const DEADLINE_SECONDS = 2 * 60 * 60;

/** Option names the bridge stores in wp_options. */
export const OPTION_DEADLINE = "wpsync_bridge_deadline";
/** Unix time a push's maintenance page ends by itself (so a crashed push can't leave it up). */
export const OPTION_MAINTENANCE = "wpsync_maintenance";
/** The id of the push whose saved state is on the server (for rollback and finalize). */
export const OPTION_STAGE = "wpsync_stage";

/** Seconds the maintenance page stays up without a push step renewing it. */
export const MAINTENANCE_SECONDS = 30 * 60;

/** Route paths, relative to the namespace. */
export const ROUTES = {
  info: "/info",
  dbTables: "/db/tables",
  dbRows: "/db/rows",
  filesList: "/files/list",
  filesFetch: "/files/fetch",
  filesRead: "/files/read",
  changes: "/changes",
  stageBegin: "/stage/begin",
  stageChunk: "/stage/chunk",
  stageApply: "/stage/apply",
  rollback: "/rollback",
  finalize: "/finalize",
  selfUpdate: "/self-update",
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
  "wp-content/uploads/wpsync-stage-*",
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

/**
 * Paths a push never changes on live, on top of PULL_EXCLUDES: the server's own configuration,
 * files hosts add (must-use plugins, cache drop-ins) and wpsync's own. ".htaccess" can be
 * pushed on request (includeHtaccess).
 */
export const PUSH_PROTECTED = [
  ".htaccess",
  // DDEV writes its own .gitignore into the local copy's WordPress folder.
  ".gitignore",
  ".user.ini",
  "php.ini",
  "web.config",
  ".well-known",
  "wp-content/mu-plugins",
  "wp-content/object-cache.php",
  "wp-content/advanced-cache.php",
  "wp-content/db.php",
  "wp-content/sunrise.php",
] as const;

/** Most bytes of one uploaded push chunk, before compression. */
export const PUSH_CHUNK_BYTES = 4_000_000;

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
  conflict: "wpsync_conflict",
  insufficientSpace: "wpsync_insufficient_space",
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];
