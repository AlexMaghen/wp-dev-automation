import { z } from "zod";

/**
 * Database export. GET db/tables lists the site's tables (those with its table prefix);
 * GET db/rows returns one chunk of a table as SQL INSERT statements, with a cursor for the next.
 */

export const DbTable = z.object({
  name: z.string(),
  /** SHOW CREATE TABLE output, ready to run. */
  createSql: z.string(),
  /** The database's own estimate; exact counts would be slow on big tables. */
  approxRows: z.number().int().nonnegative(),
  dataBytes: z.number().int().nonnegative(),
  /** Primary key columns in order, or null when the table has none (paged by offset). */
  primaryKey: z.array(z.string()).nullable(),
});
export type DbTable = z.infer<typeof DbTable>;

export const DbTablesResponse = z.object({
  /** Connection character set the INSERT statements are written for (e.g. utf8mb4). */
  charset: z.string(),
  tables: z.array(DbTable),
});
export type DbTablesResponse = z.infer<typeof DbTablesResponse>;

/** Query parameters for GET db/rows. */
export const DbRowsQuery = z.object({
  table: z.string(),
  /** Opaque cursor from the previous response's next; absent for the first chunk. */
  cursor: z.string().optional(),
});
export type DbRowsQuery = z.infer<typeof DbRowsQuery>;

export const DbRowsResponse = z.object({
  /** Zero or more complete INSERT statements, each ending in ";\n". */
  sql: z.string(),
  rows: z.number().int().nonnegative(),
  /** Cursor for the next chunk, or null when the table is done. */
  next: z.string().nullable(),
});
export type DbRowsResponse = z.infer<typeof DbRowsResponse>;
