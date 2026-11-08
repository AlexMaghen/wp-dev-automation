import { createWriteStream } from "node:fs";
import { once } from "node:events";
import { createGzip } from "node:zlib";
import { DbRowsResponse, DbTablesResponse, ROUTES } from "@wp-dev-automation/protocol";
import { WpsyncError } from "./errors";
import type { RestClient } from "./rest-client";

export interface DumpStats {
  tables: number;
  rows: number;
  /** Uncompressed SQL bytes. */
  sqlBytes: number;
}

function ident(name: string): string {
  return `\`${name.replace(/`/g, "``")}\``;
}

/**
 * Downloads the live database, table by table and chunk by chunk, into a gzipped SQL file that
 * `ddev import-db` can load. Nothing on the live site changes.
 */
export async function downloadDatabase(
  rest: RestClient,
  target: string,
  onTable: (name: string, index: number, total: number) => void = () => {},
): Promise<DumpStats> {
  const { charset, tables } = await rest.bridge(DbTablesResponse, ROUTES.dbTables);

  const gzip = createGzip();
  const file = createWriteStream(target);
  gzip.pipe(file);
  const stats: DumpStats = { tables: tables.length, rows: 0, sqlBytes: 0 };
  const write = async (sql: string) => {
    stats.sqlBytes += Buffer.byteLength(sql);
    if (!gzip.write(sql)) await once(gzip, "drain");
  };

  await write(
    [
      `-- wpsync database download, ${new Date().toISOString()}`,
      `SET NAMES ${charset || "utf8mb4"};`,
      "SET FOREIGN_KEY_CHECKS=0;",
      "SET UNIQUE_CHECKS=0;",
      "SET SQL_MODE='NO_AUTO_VALUE_ON_ZERO';",
      "",
    ].join("\n"),
  );

  for (const [index, table] of tables.entries()) {
    onTable(table.name, index, tables.length);
    await write(`\nDROP TABLE IF EXISTS ${ident(table.name)};\n${table.createSql};\n`);
    let cursor: string | null | undefined;
    do {
      const query: Record<string, string> = { table: table.name };
      if (cursor) query.cursor = cursor;
      const chunk = await rest.bridge(DbRowsResponse, ROUTES.dbRows, { query });
      if (chunk.next && chunk.next === cursor) {
        // Same place twice: paging isn't moving forward, and would repeat these rows forever.
        throw new WpsyncError("paging_stuck", `The bridge kept returning the same rows of ${table.name}, so wpsync stopped the download.`, "This is a bug in wpsync's bridge; please report the table's name.");
      }
      if (chunk.sql) await write(chunk.sql);
      stats.rows += chunk.rows;
      cursor = chunk.next;
    } while (cursor);
  }

  await write("\nSET FOREIGN_KEY_CHECKS=1;\nSET UNIQUE_CHECKS=1;\n");
  gzip.end();
  await once(file, "finish");
  return stats;
}
