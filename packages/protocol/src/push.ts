import { z } from "zod";

/**
 * Publishing. The CLI opens a stage, uploads the database and the changed files into it in
 * gzip-compressed chunks, then asks the bridge to apply it one resumable step at a time.
 * Until the swap step, live is untouched apart from the maintenance page; afterwards its old
 * tables and files stay saved on the server until finalize (or come back with rollback).
 *
 * Uploaded parts, after each chunk is un-gzipped and the chunks joined:
 *   db     SQL statements, each framed as "<byte length>\n<statement>\n", creating and filling
 *          tables under the stage's newPrefix (the CLI's exporter writes these).
 *   files  for each file, an ArchiveHeader as one line of JSON then exactly size bytes (no
 *          bytes after a delete header).
 */

export const ChangesQuery = z.object({
  /** ISO 8601 time; changes after it are counted. */
  since: z.string(),
});

/** What people changed on live since the last pull, which a push would overwrite. */
export const ChangesResponse = z.object({
  since: z.string(),
  /** Posts, pages and other post types created or edited since then, by post type. */
  posts: z.record(z.string(), z.number().int().nonnegative()),
  comments: z.number().int().nonnegative(),
  users: z.number().int().nonnegative(),
});
export type ChangesResponse = z.infer<typeof ChangesResponse>;

export const StageBeginRequest = z.object({
  /** Uncompressed sizes, for the free-space check. */
  dbBytes: z.number().int().nonnegative(),
  filesBytes: z.number().int().nonnegative(),
  includeHtaccess: z.boolean(),
});
export type StageBeginRequest = z.infer<typeof StageBeginRequest>;

export const StageBeginResponse = z.object({
  stageId: z.string(),
  /** Table prefix the uploaded SQL must create its tables under. */
  newPrefix: z.string(),
  /** Most bytes per chunk upload (after compression), within the host's request size limit. */
  chunkBytes: z.number().int().positive(),
});
export type StageBeginResponse = z.infer<typeof StageBeginResponse>;

export const StagePart = z.enum(["db", "files"]);
export type StagePart = z.infer<typeof StagePart>;

/** Query for PUT stage/chunk; the body is the gzip-compressed chunk. */
export const StageChunkQuery = z.object({
  stage: z.string(),
  part: StagePart,
  seq: z.coerce.number().int().nonnegative(),
  /** SHA-256 of the body as sent (compressed), hex. */
  sha256: z.string().regex(/^[0-9a-f]{64}$/),
});

export const StageChunkResponse = z.object({
  received: z.number().int().nonnegative(),
});

export const ArchiveHeader = z.union([
  z.object({
    path: z.string(),
    size: z.number().int().nonnegative(),
    mtime: z.number().int(),
    delete: z.literal(false).optional(),
  }),
  z.object({ path: z.string(), delete: z.literal(true) }),
]);
export type ArchiveHeader = z.infer<typeof ArchiveHeader>;

export const StageApplyRequest = z.object({
  stage: z.string(),
  /** How many chunks of each part were uploaded. */
  chunks: z.object({ db: z.number().int().nonnegative(), files: z.number().int().nonnegative() }),
});
export type StageApplyRequest = z.infer<typeof StageApplyRequest>;

export const StageStep = z.enum([
  "assemble",
  "import",
  "carry",
  "maintenance",
  "files",
  "swap",
  "cleanup",
  "applied",
  "rollback-maintenance",
  "rollback-files",
  "rollback-swap",
  "rolled-back",
  "finalize",
  "finalized",
  "failed",
]);
export type StageStep = z.infer<typeof StageStep>;

/** Answer to every apply, rollback and finalize call: call again until done is true. */
export const StageProgress = z.object({
  stageId: z.string(),
  step: StageStep,
  done: z.boolean(),
  /** What the step is working through, when it's countable. */
  progress: z.object({ done: z.number(), total: z.number() }).nullable(),
  /** Paths the server refused to change (protected or unsafe), for the report. */
  skipped: z.array(z.string()),
  /** Set when step is "failed". */
  error: z.string().nullable(),
});
export type StageProgress = z.infer<typeof StageProgress>;

export const StageRequest = z.object({ stage: z.string() });
