/**
 * An expected failure, worded for the person running wpsync. `hint` says what to do about it.
 * main.ts prints these without a stack trace; anything else is a bug and prints in full.
 */
export class WpsyncError extends Error {
  constructor(
    readonly code: string,
    message: string,
    readonly hint?: string,
  ) {
    super(message);
    this.name = "WpsyncError";
  }
}
