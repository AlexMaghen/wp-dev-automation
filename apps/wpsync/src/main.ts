#!/usr/bin/env bun
/**
 * wpsync: copy a live WordPress site into local DDEV and publish it back, using only an
 * administrator login. See docs/design.md.
 */
import { BRIDGE_VERSION } from "@wp-dev-automation/protocol";
import { connect } from "./connect";
import { macLoginDialog } from "./dialog";
import { WpsyncError } from "./errors";
import { MacKeychain } from "./secrets";

const VERSION = "0.1.0";

const USAGE = `wpsync ${VERSION}

Usage:
  wpsync connect <site-url> [--user <username>]
      Sign in once (a macOS dialog asks for the password), create wpsync's own
      Application Password, and install the wpsync bridge, switched off.

  wpsync --version
  wpsync help

For local development sites only, --allow-http accepts an http:// address.
`;

interface Parsed {
  command: string | undefined;
  positional: string[];
  flags: Map<string, string | true>;
}

function parse(argv: string[]): Parsed {
  const positional: string[] = [];
  const flags = new Map<string, string | true>();
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]!;
    if (!arg.startsWith("--")) {
      positional.push(arg);
      continue;
    }
    const [name, inline] = arg.slice(2).split("=", 2) as [string, string | undefined];
    const next = argv[i + 1];
    if (inline !== undefined) flags.set(name, inline);
    else if (name === "user" && next && !next.startsWith("--")) flags.set(name, argv[++i]!);
    else flags.set(name, true);
  }
  return { command: positional.shift(), positional, flags };
}

async function runConnect(args: Parsed): Promise<void> {
  const url = args.positional[0];
  if (!url) throw new UsageError("connect needs the site's address, e.g. wpsync connect https://example.com");
  const user = args.flags.get("user");

  const result = await connect(
    {
      url,
      username: typeof user === "string" ? user : undefined,
      allowHttp: args.flags.has("allow-http"),
      log: (line) => console.log(line),
    },
    { credentials: macLoginDialog, store: new MacKeychain() },
  );

  const { info } = result;
  const active = info.plugins.filter((p) => p.active && p.file !== "wpsync-bridge/wpsync-bridge.php").length;
  console.log(`
Connected to ${info.site.name} (${result.site.homeUrl})
  Signed in as   ${result.connection.username}; key "${result.connection.applicationPasswordName}" saved in the Keychain
  Bridge         ${result.bridge === "uploaded" ? "installed" : "already installed"}, version ${info.bridge.version}, switched off
  WordPress      ${info.wordpress.version}${info.site.multisite ? " (multisite: not supported yet)" : ""}
  PHP            ${info.php.version}
  Database       ${info.database.engine} ${info.database.version}
  Web server     ${info.server.software ?? "unknown"}
  Theme          ${info.theme.name} ${info.theme.version}${info.theme.template !== info.theme.stylesheet ? ` (child of ${info.theme.template})` : ""}
  Plugins        ${active} active of ${info.plugins.length - 1}`);
  if (!info.capabilities.fileModsAllowed) {
    console.log("\nWarning: this site doesn't allow file changes (DISALLOW_FILE_MODS). Publishing to it won't work.");
  }
}

class UsageError extends Error {}

async function main(argv: string[]): Promise<number> {
  const args = parse(argv);
  try {
    switch (args.command) {
      case "connect":
        await runConnect(args);
        return 0;
      case undefined:
      case "help":
        console.log(USAGE);
        return 0;
      default:
        if (args.flags.has("version")) {
          console.log(`wpsync ${VERSION} (bridge ${BRIDGE_VERSION})`);
          return 0;
        }
        throw new UsageError(`Unknown command "${args.command}".`);
    }
  } catch (error) {
    if (error instanceof UsageError) {
      console.error(`${error.message}\n\n${USAGE}`);
      return 2;
    }
    if (error instanceof WpsyncError) {
      console.error(`\n${error.message}${error.hint ? `\n${error.hint}` : ""}`);
      return 1;
    }
    throw error;
  }
}

const argv = process.argv.slice(2);
if (argv[0] === "--version") {
  console.log(`wpsync ${VERSION} (bridge ${BRIDGE_VERSION})`);
} else {
  process.exitCode = await main(argv);
}
