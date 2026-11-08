import { z } from "zod";
import * as C from "./constants";
import { DbRowsResponse, DbTablesResponse } from "./db";
import { ErrorResponse } from "./errors";
import { FILE_MTIME_HEADER, FILE_SIZE_HEADER, FilesListResponse } from "./files";
import { InfoResponse } from "./info";
import { comparePaths, isExcluded, isSafeRelativePath } from "./paths";
import { ChangesResponse, StageProgress } from "./push";

/** Path of the generated PHP constants file, relative to packages/protocol. */
export const PHP_CONSTANTS_PATH = "../bridge-plugin/wpsync-bridge/includes/protocol.php";

/** camelCase → CAMEL_CASE, for PHP constant names. */
function constName(name: string): string {
  return name.replace(/([A-Z])/g, "_$1").toUpperCase();
}

function phpString(value: string): string {
  return `'${value.replace(/\\/g, "\\\\").replace(/'/g, "\\'")}'`;
}

function phpConstants(): string {
  const lines: string[] = [
    "<?php",
    "/**",
    " * GENERATED from packages/protocol/src/constants.ts by `pnpm generate`. Do not edit.",
    " */",
    "",
    "defined( 'ABSPATH' ) || exit;",
    "",
    `const WPSYNC_PROTOCOL_VERSION = ${C.PROTOCOL_VERSION};`,
    `const WPSYNC_BRIDGE_VERSION = ${phpString(C.BRIDGE_VERSION)};`,
    `const WPSYNC_REST_NAMESPACE = ${phpString(C.REST_NAMESPACE)};`,
    `const WPSYNC_PLUGIN_FILE = ${phpString(C.PLUGIN_FILE)};`,
    `const WPSYNC_DEADLINE_SECONDS = ${C.DEADLINE_SECONDS};`,
    `const WPSYNC_OPTION_DEADLINE = ${phpString(C.OPTION_DEADLINE)};`,
    `const WPSYNC_OPTION_MAINTENANCE = ${phpString(C.OPTION_MAINTENANCE)};`,
    `const WPSYNC_OPTION_STAGE = ${phpString(C.OPTION_STAGE)};`,
    `const WPSYNC_MAINTENANCE_SECONDS = ${C.MAINTENANCE_SECONDS};`,
    `const WPSYNC_PUSH_CHUNK_BYTES = ${C.PUSH_CHUNK_BYTES};`,
    "",
    `const WPSYNC_DB_CHUNK_BYTES = ${C.DB_CHUNK_BYTES};`,
    `const WPSYNC_DB_ROWS_LIMIT = ${C.DB_ROWS_LIMIT};`,
    `const WPSYNC_FILES_LIST_LIMIT = ${C.FILES_LIST_LIMIT};`,
    `const WPSYNC_FETCH_BATCH_BYTES = ${C.FETCH_BATCH_BYTES};`,
    `const WPSYNC_FETCH_BATCH_FILES = ${C.FETCH_BATCH_FILES};`,
    `const WPSYNC_TIME_BUDGET_SECONDS = ${C.TIME_BUDGET_SECONDS};`,
    `const WPSYNC_FILE_SIZE_HEADER = ${phpString(FILE_SIZE_HEADER)};`,
    `const WPSYNC_FILE_MTIME_HEADER = ${phpString(FILE_MTIME_HEADER)};`,
    "",
    "const WPSYNC_PULL_EXCLUDES = array(",
    ...C.PULL_EXCLUDES.map((pattern) => `\t${phpString(pattern)},`),
    ");",
    "",
    "const WPSYNC_PUSH_PROTECTED = array(",
    ...C.PUSH_PROTECTED.map((pattern) => `\t${phpString(pattern)},`),
    ");",
    "",
  ];
  for (const [name, path] of Object.entries(C.ROUTES)) {
    lines.push(`const WPSYNC_ROUTE_${constName(name)} = ${phpString(path)};`);
  }
  lines.push("");
  for (const [name, code] of Object.entries(C.ERROR_CODES)) {
    lines.push(`const WPSYNC_ERROR_${constName(name)} = ${phpString(code)};`);
  }
  lines.push("");
  return lines.join("\n");
}

function jsonSchema(schema: z.ZodType): string {
  return `${JSON.stringify(z.toJSONSchema(schema), null, 2)}\n`;
}

/**
 * Path-rule cases the PHP port must agree with (packages/bridge-plugin/test/php/paths-test.php).
 * Expected values come from the TypeScript implementation, so both sides match by construction.
 */
function pathVectors(): string {
  const excluded = [
    "wp-config.php",
    "wp-config-sample.php",
    "wp-content/uploads/wpsync-stage-1a2b/db.sql",
    "wp-content/uploads/wpsync-test.txt",
    "wp-content/uploads/wpsync",
    "wp-content/uploads/2026/11/photo.jpg",
    "wp-content/plugins/wpsync-bridge/wpsync-bridge.php",
    "wp-content/plugins/wpsync-bridge-other/x.php",
    "wp-content/cache/page.html",
    "wp-content/cachex/page.html",
    ".git/HEAD",
    "sub/.git/HEAD",
    "index.php",
  ].map((path) => ({ path, excluded: isExcluded(path) }));
  const pairs: Array<[string, string]> = [
    ["a/z", "a-b"],
    ["a", "a/b"],
    ["B", "a"],
    ["wp-admin/x.php", "wp-admin.php"],
    ["é", "z"],
    ["same/path", "same/path"],
  ];
  const order = pairs.map(([a, b]) => ({ a, b, cmp: Math.sign(comparePaths(a, b)) }));
  const safe = ["a/b.txt", "/etc/passwd", "../x", "a/../b", "a//b", "a/./b", "", "a\\b", "wp-content/uploads/ü ñ.txt"].map(
    (path) => ({ path, safe: isSafeRelativePath(path) }),
  );
  return `${JSON.stringify({ excluded, order, safe }, null, 2)}\n`;
}

/** Every derived file, keyed by path relative to packages/protocol. */
export function buildGenerated(): Record<string, string> {
  return {
    [PHP_CONSTANTS_PATH]: phpConstants(),
    "json-schema/info.schema.json": jsonSchema(InfoResponse),
    "json-schema/error.schema.json": jsonSchema(ErrorResponse),
    "json-schema/db-tables.schema.json": jsonSchema(DbTablesResponse),
    "json-schema/db-rows.schema.json": jsonSchema(DbRowsResponse),
    "json-schema/files-list.schema.json": jsonSchema(FilesListResponse),
    "json-schema/stage-progress.schema.json": jsonSchema(StageProgress),
    "json-schema/changes.schema.json": jsonSchema(ChangesResponse),
    "test-vectors/paths.json": pathVectors(),
  };
}
