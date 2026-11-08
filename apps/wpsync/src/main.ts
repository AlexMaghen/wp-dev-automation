#!/usr/bin/env bun
/**
 * wpsync: copy a live WordPress site into local DDEV and publish it back, using only an
 * administrator login. See docs/design.md.
 */
import { BRIDGE_VERSION } from "@wp-dev-automation/protocol";
import { connect } from "./connect";
import { macLoginDialog } from "./dialog";
import { WpsyncError } from "./errors";
import { bytes, count } from "./format";
import { init, updateProjectRules } from "./local-commands";
import { pull } from "./pull";
import { MacKeychain } from "./secrets";

const VERSION = "0.1.0";

const USAGE = `wpsync ${VERSION}

Usage:
  wpsync init <site-url> [--dir <folder>]
      Make the site's project folder (default ~/wp-sites/<host>) with its CLAUDE.md
      and Claude Code permissions, ready for a session started in it. Contacts nothing.

  wpsync connect <site-url> [--user <username>]
      Sign in once (a macOS dialog asks for the password), create wpsync's own
      Application Password, and install the wpsync bridge, switched off.

  wpsync pull <site-url> [--dir <folder>] [--name <ddev-name>] [--overwrite-code]
      Copy the live site into a local DDEV project (default folder:
      ~/wp-sites/<host>). The first pull creates the project; later
      pulls download only what changed. Code you track in git is never
      overwritten unless you add --overwrite-code. The live site is only read.

  wpsync update-rules [--dir <folder>]
      Refresh the WordPress rules in a project's CLAUDE.md from this wpsync.

  wpsync --version
  wpsync help

For local development sites only, --allow-http accepts an http:// address.
`;

interface Parsed {
  command: string | undefined;
  positional: string[];
  flags: Map<string, string | true>;
}

/** Flags that take a value (--user admin); every other flag is a switch. */
const VALUE_FLAGS = new Set(["user", "dir", "name"]);

function stringFlag(args: Parsed, name: string): string | undefined {
  const value = args.flags.get(name);
  return typeof value === "string" ? value : undefined;
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
    else if (VALUE_FLAGS.has(name) && next && !next.startsWith("--")) flags.set(name, argv[++i]!);
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

async function runPull(args: Parsed): Promise<void> {
  const url = args.positional[0];
  if (!url) throw new UsageError("pull needs the site's address, e.g. wpsync pull https://example.com");

  const result = await pull(
    {
      url,
      dir: stringFlag(args, "dir"),
      name: stringFlag(args, "name"),
      allowHttp: args.flags.has("allow-http"),
      overwriteCode: args.flags.has("overwrite-code"),
      log: (line) => console.log(line),
    },
    { store: new MacKeychain() },
  );

  console.log(`
${result.firstPull ? "Pulled" : "Refreshed"} the local copy
  Folder     ${result.projectDir}
  Local URL  ${result.localUrl}
  Database   ${count(result.tables)} tables, ${count(result.rows)} rows
  Files      ${count(result.filesFetched)} downloaded (${bytes(result.bytesFetched)}), ${count(result.filesDeleted)} deleted, ${count(result.filesUnchanged)} unchanged`);
  for (const warning of result.warnings) console.log(`\nNote: ${warning}`);
}

function runInit(args: Parsed): void {
  const url = args.positional[0];
  if (!url) throw new UsageError("init needs the site's address, e.g. wpsync init https://example.com");
  const result = init(url, { dir: stringFlag(args, "dir"), allowHttp: args.flags.has("allow-http") });
  console.log(`${result.created ? "Created" : "Already set up"}: ${result.project.dir}
  Site: ${result.homeUrl} (setup pending: nothing has been pulled yet)

Next: start a new Claude Code session in that folder, so its CLAUDE.md and permissions load.
  Desktop app: start a new session on the folder; optionally set the permission mode to
               Bypass permissions.
  Terminal:    cd "${result.project.dir}" && claude
               (or claude --dangerously-skip-permissions to skip prompts)
Then say "continue wp-dev".`);
}

function runUpdateRules(args: Parsed): void {
  const result = updateProjectRules(stringFlag(args, "dir"));
  console.log(result.changed ? `Updated the rules in ${result.path}` : `The rules in ${result.path} are already current.`);
}

class UsageError extends Error {}

async function main(argv: string[]): Promise<number> {
  const args = parse(argv);
  try {
    switch (args.command) {
      case "connect":
        await runConnect(args);
        return 0;
      case "pull":
        await runPull(args);
        return 0;
      case "init":
        runInit(args);
        return 0;
      case "update-rules":
        runUpdateRules(args);
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
