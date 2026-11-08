import { z } from "zod";

/**
 * File transfer. Paths are relative to the WordPress root (ABSPATH), use "/" and never start
 * with one. Directories, symbolic links and anything in PULL_EXCLUDES are left out.
 *
 * GET files/list pages through every file in path order (segment by segment, byte order).
 * POST files/fetch returns a batch of files as one binary stream, framed as, for each file:
 *   <FetchedFileHeader as one line of JSON>\n<exactly header.size bytes>
 * (no bytes follow a header with missing: true).
 * GET files/read returns raw bytes of one file, for files too big for a batch.
 */

export const FileEntry = z.object({
  path: z.string(),
  size: z.number().int().nonnegative(),
  /** Modification time, Unix seconds. */
  mtime: z.number().int(),
});
export type FileEntry = z.infer<typeof FileEntry>;

export const FilesListQuery = z.object({
  /** Opaque cursor from the previous response's next. */
  cursor: z.string().optional(),
});

export const FilesListResponse = z.object({
  entries: z.array(FileEntry),
  next: z.string().nullable(),
});
export type FilesListResponse = z.infer<typeof FilesListResponse>;

export const FilesFetchRequest = z.object({
  paths: z.array(z.string()).min(1),
});
export type FilesFetchRequest = z.infer<typeof FilesFetchRequest>;

export const FetchedFileHeader = z.union([
  FileEntry.extend({ missing: z.literal(false).optional() }),
  z.object({ path: z.string(), missing: z.literal(true) }),
]);
export type FetchedFileHeader = z.infer<typeof FetchedFileHeader>;

export const FilesReadQuery = z.object({
  path: z.string(),
  offset: z.coerce.number().int().nonnegative(),
  length: z.coerce.number().int().positive(),
});

/** Response headers on files/read. */
export const FILE_SIZE_HEADER = "X-Wpsync-File-Size";
export const FILE_MTIME_HEADER = "X-Wpsync-File-Mtime";
