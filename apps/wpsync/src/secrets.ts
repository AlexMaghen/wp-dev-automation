import { execFileSync } from "node:child_process";
import { z } from "zod";
import { WpsyncError } from "./errors";

/** What wpsync keeps for a connected site. Only ever stored in a SecretStore, never in files. */
export const StoredConnection = z.object({
  homeUrl: z.string(),
  siteUrl: z.string(),
  username: z.string(),
  applicationPassword: z.string(),
  /** WordPress's id for the Application Password, used to revoke it later. */
  applicationPasswordUuid: z.string(),
  applicationPasswordName: z.string(),
  connectedAt: z.string(),
});
export type StoredConnection = z.infer<typeof StoredConnection>;

export interface SecretStore {
  get(key: string): Promise<StoredConnection | null>;
  set(key: string, value: StoredConnection): Promise<void>;
  delete(key: string): Promise<void>;
}

/** Keeps connections in the macOS login Keychain as generic passwords (service "wpsync"). */
export class MacKeychain implements SecretStore {
  constructor(private readonly service = "wpsync") {}

  async get(key: string): Promise<StoredConnection | null> {
    let encoded: string;
    try {
      encoded = execFileSync("security", ["find-generic-password", "-s", this.service, "-a", key, "-w"], {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      }).trim();
    } catch {
      return null;
    }
    const parsed = StoredConnection.safeParse(parseBase64Json(encoded));
    return parsed.success ? parsed.data : null;
  }

  async set(key: string, value: StoredConnection): Promise<void> {
    // The secret goes to `security` on stdin (its interactive mode), never on the command line,
    // where other processes could read it. Base64 keeps quotes and spaces out of its parser.
    const encoded = Buffer.from(JSON.stringify(value)).toString("base64");
    const command = `add-generic-password -U -s ${quote(this.service)} -a ${quote(key)} -l ${quote(`wpsync ${key}`)} -w ${quote(encoded)}\n`;
    execFileSync("security", ["-i"], { input: command, stdio: ["pipe", "ignore", "ignore"] });
    const check = await this.get(key);
    if (check?.applicationPasswordUuid !== value.applicationPasswordUuid) {
      throw new WpsyncError("keychain_failed", "Couldn't save the site's key in the macOS Keychain.");
    }
  }

  async delete(key: string): Promise<void> {
    try {
      execFileSync("security", ["delete-generic-password", "-s", this.service, "-a", key], { stdio: "ignore" });
    } catch {
      // Not there: nothing to delete.
    }
  }
}

/** For tests. */
export class MemoryStore implements SecretStore {
  readonly entries = new Map<string, StoredConnection>();
  async get(key: string) {
    return this.entries.get(key) ?? null;
  }
  async set(key: string, value: StoredConnection) {
    this.entries.set(key, value);
  }
  async delete(key: string) {
    this.entries.delete(key);
  }
}

function quote(value: string): string {
  if (/["\\\n]/.test(value)) throw new Error(`can't pass ${JSON.stringify(value)} to security -i`);
  return `"${value}"`;
}

function parseBase64Json(encoded: string): unknown {
  try {
    return JSON.parse(Buffer.from(encoded, "base64").toString("utf8"));
  } catch {
    return undefined;
  }
}
