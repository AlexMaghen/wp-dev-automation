import { z } from "zod";
import * as C from "./constants";
import { ErrorResponse } from "./errors";
import { InfoResponse } from "./info";

/** Path of the generated PHP constants file, relative to packages/protocol. */
export const PHP_CONSTANTS_PATH = "../bridge-plugin/wpsync-bridge/includes/protocol.php";

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
    "",
  ];
  for (const [name, path] of Object.entries(C.ROUTES)) {
    lines.push(`const WPSYNC_ROUTE_${name.toUpperCase()} = ${phpString(path)};`);
  }
  lines.push("");
  for (const [name, code] of Object.entries(C.ERROR_CODES)) {
    const constName = name.replace(/([A-Z])/g, "_$1").toUpperCase();
    lines.push(`const WPSYNC_ERROR_${constName} = ${phpString(code)};`);
  }
  lines.push("");
  return lines.join("\n");
}

function jsonSchema(schema: z.ZodType): string {
  return `${JSON.stringify(z.toJSONSchema(schema), null, 2)}\n`;
}

/** Every derived file, keyed by path relative to packages/protocol. */
export function buildGenerated(): Record<string, string> {
  return {
    [PHP_CONSTANTS_PATH]: phpConstants(),
    "json-schema/info.schema.json": jsonSchema(InfoResponse),
    "json-schema/error.schema.json": jsonSchema(ErrorResponse),
  };
}
