import { z } from "zod";

/**
 * Error body as WordPress's REST API sends it for a WP_Error, both for the bridge's own errors
 * (codes in ERROR_CODES) and for core ones such as rest_no_route.
 */
export const ErrorResponse = z.object({
  code: z.string(),
  message: z.string(),
  data: z
    .object({
      status: z.number().int(),
    })
    .loose()
    .nullable()
    .optional(),
});
export type ErrorResponse = z.infer<typeof ErrorResponse>;
