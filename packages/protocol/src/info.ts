import { z } from "zod";

/**
 * GET /wpsync/v1/info: everything wpsync needs to know about a site before pulling or pushing.
 * Sizes are bytes. A value the host hides from PHP (disabled functions, open_basedir) is null.
 */

const Bytes = z.number().int().nonnegative();

export const DatabaseEngine = z.enum(["mariadb", "mysql", "unknown"]);
export type DatabaseEngine = z.infer<typeof DatabaseEngine>;

export const PluginEntry = z.object({
  /** Path relative to the plugins folder, e.g. "akismet/akismet.php". */
  file: z.string(),
  name: z.string(),
  version: z.string(),
  active: z.boolean(),
});
export type PluginEntry = z.infer<typeof PluginEntry>;

export const MuPluginEntry = z.object({
  /** File name in the must-use plugins folder. */
  file: z.string(),
  name: z.string(),
  version: z.string(),
});

export const DropinEntry = z.object({
  /** File name in wp-content, e.g. "object-cache.php". */
  file: z.string(),
  name: z.string(),
});

export const InfoResponse = z.object({
  bridge: z.object({
    version: z.string(),
    protocolVersion: z.number().int(),
    /** When the bridge deactivates itself (ISO 8601, UTC). */
    deadline: z.iso.datetime({ offset: true }),
  }),
  site: z.object({
    siteUrl: z.url(),
    homeUrl: z.url(),
    name: z.string(),
    multisite: z.boolean(),
    locale: z.string(),
    timezone: z.string(),
    /** wp_get_environment_type(): production, staging, development or local. */
    environment: z.string(),
  }),
  wordpress: z.object({
    version: z.string(),
  }),
  php: z.object({
    version: z.string(),
    sapi: z.string(),
    extensions: z.array(z.string()),
    memoryLimit: Bytes.nullable(),
    /** Seconds; 0 means unlimited. */
    maxExecutionTime: z.number().int().nonnegative(),
    uploadMaxFilesize: Bytes.nullable(),
    postMaxSize: Bytes.nullable(),
  }),
  server: z.object({
    /** $_SERVER['SERVER_SOFTWARE'], e.g. "nginx/1.26.0" or "Apache". */
    software: z.string().nullable(),
    /** Server clock when the response was built (ISO 8601, UTC). */
    time: z.iso.datetime({ offset: true }),
  }),
  database: z.object({
    engine: DatabaseEngine,
    /** Numeric version, e.g. "11.4.13" or "8.0.39". */
    version: z.string(),
    /** Raw server version string as the database reports it. */
    serverInfo: z.string(),
    charset: z.string(),
    collate: z.string(),
    /** Base table prefix (for multisite, the network's). */
    tablePrefix: z.string(),
  }),
  theme: z.object({
    /** Active theme folder. */
    stylesheet: z.string(),
    /** Parent theme folder; same as stylesheet when there is no parent. */
    template: z.string(),
    name: z.string(),
    version: z.string(),
  }),
  plugins: z.array(PluginEntry),
  muPlugins: z.array(MuPluginEntry),
  dropins: z.array(DropinEntry),
  paths: z.object({
    abspath: z.string(),
    contentDir: z.string(),
    pluginsDir: z.string(),
    uploadsDir: z.string(),
  }),
  capabilities: z.object({
    /** False when DISALLOW_FILE_MODS is set: plugins can't be installed or updated. */
    fileModsAllowed: z.boolean(),
    /** WordPress's get_filesystem_method(); "direct" means PHP can write files itself. */
    filesystemMethod: z.string(),
    writable: z.object({
      abspath: z.boolean(),
      contentDir: z.boolean(),
      uploadsDir: z.boolean(),
    }),
    diskFreeBytes: Bytes.nullable(),
  }),
});
export type InfoResponse = z.infer<typeof InfoResponse>;
