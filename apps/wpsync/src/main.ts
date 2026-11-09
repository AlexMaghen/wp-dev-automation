#!/usr/bin/env bun
/**
 * wpsync: copy a live WordPress site into local DDEV and publish it back, using only an
 * administrator login. See docs/design.md.
 */
import { resolve } from "node:path";
import { BRIDGE_VERSION } from "@wp-dev-automation/protocol";
import { connect, disconnect, prepareDisconnect } from "./connect";
import { allOk, checkLocal, checkSite, formatChecks } from "./doctor";
import { destroy } from "./destroy";
import { newProject } from "./new-project";
import { status } from "./status";
import { verify } from "./verify";
import { macLoginDialog } from "./dialog";
import { WpsyncError } from "./errors";
import { bytes, count } from "./format";
import { init, updateProjectRules } from "./local-commands";
import { pull } from "./pull";
import { describePlan, finalize, push, rollback } from "./push";
import { macApplicationPasswordDialog, macConfirmDialog, macDestroyDialog } from "./confirm-dialog";
import { noteWordfence } from "./project";
import { notify } from "./progress";
import { MacKeychain } from "./secrets";
import { normalizeUrl } from "./site";

const VERSION = "0.2.1";

const USAGE = `wpsync ${VERSION}

Usage:
  wpsync new <site-url> [--dir <folder>]
      Set up a local copy, step by step, picking up where it stopped: the folder (start
      gate), checks of this Mac and the site, connect, pull, verify. Stops at the first
      thing you need to do, listing everything that needs fixing.

  wpsync init <site-url> [--dir <folder>]
      Make the site's project folder (default ~/wp-sites/<host>) with its CLAUDE.md
      and Claude Code permissions, ready for a session started in it. Contacts nothing.

  wpsync connect <site-url> [--user <username>] [--application-password]
      Sign in once (a macOS dialog asks for the password), create wpsync's own
      Application Password, and install the wpsync bridge, switched off. For sites with
      a protected login, --application-password asks for one you made in your profile.

  wpsync doctor --local | <site-url> [--json]
      Check this Mac, or a site, before anything changes; lists every problem with its fix.

  wpsync status [--dir <folder>] [--json]
      Where a site project stands, and what to do next.

  wpsync verify [--dir <folder>] [--json]
      Check the local copy works: pages, wp-admin, permalinks, leftover live addresses,
      images, and the same plugins and theme as live.

  wpsync disconnect <site-url>
      Remove the bridge from the site and revoke wpsync's key.

  wpsync destroy [--dir <folder>] [--keep-connection]
      Delete the whole local copy: its DDEV project (containers, database) and its folder
      (files, git history, backups/). Confirmed in three macOS dialogs, the last asking you
      to type the site's domain. Also removes wpsync from the live site (bridge plugin, key,
      Keychain entry), never its content; --keep-connection leaves that for another copy.

  wpsync pull <site-url> [--dir <folder>] [--name <ddev-name>] [--overwrite-code]
      Copy the live site into a local DDEV project (default folder:
      ~/wp-sites/<host>). The first pull creates the project; later
      pulls download only what changed. Code you track in git is never
      overwritten unless you add --overwrite-code. The live site is only read.

  wpsync push [--dry-run] [--include-htaccess] [--dir <folder>]
      Publish: replace the live site (database and files) with the local copy. A macOS
      dialog shows what will change and asks you to type the live domain; --dry-run
      only shows it. Live's wp-config.php, .htaccess and host-added files are kept.
      Backs up what changes into backups/ first; checks live after.

  wpsync rollback [--dir <folder>]
      Put live back as it was before the last push (confirmed in a dialog).

  wpsync finalize [--dir <folder>]
      Keep the last push and delete the old version saved on the server (confirmed in
      a dialog).

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
      useApplicationPassword: args.flags.has("application-password"),
      allowHttp: args.flags.has("allow-http"),
      log: (line) => console.log(line),
    },
    { credentials: macLoginDialog, applicationPassword: macApplicationPasswordDialog, store: new MacKeychain() },
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
  notify("wpsync: pull finished", `The local copy of ${url} is ready.`);
}

function runInit(args: Parsed): void {
  const url = args.positional[0];
  if (!url) throw new UsageError("init needs the site's address, e.g. wpsync init https://example.com");
  const result = init(url, { dir: stringFlag(args, "dir"), allowHttp: args.flags.has("allow-http") });
  const here = resolve(result.project.dir) === resolve(process.cwd());
  console.log(`${result.created ? "Created" : "Already set up"}: ${result.project.dir}
  Site: ${result.homeUrl} (setup pending: nothing has been pulled yet)`);
  if (here) {
    console.log(`\nNext: wpsync doctor --local, then wpsync doctor ${result.homeUrl}`);
    return;
  }
  console.log(`
Next: start a new Claude Code session in that folder, so its CLAUDE.md and permissions load.
  Desktop app: start a new session on the folder; optionally set the permission mode to
               Bypass permissions.
  Terminal:    cd "${result.project.dir}" && claude
               (or claude --dangerously-skip-permissions to skip prompts)
Then say "continue my wp-dev project".`);
}

function runUpdateRules(args: Parsed): void {
  const result = updateProjectRules(stringFlag(args, "dir"));
  console.log(result.changed ? `Updated the rules in ${result.path}` : `The rules in ${result.path} are already current.`);
}

async function runPush(args: Parsed): Promise<void> {
  const dryRun = args.flags.has("dry-run");
  const result = await push(
    {
      dir: stringFlag(args, "dir"),
      dryRun,
      includeHtaccess: args.flags.has("include-htaccess"),
      allowHttp: args.flags.has("allow-http"),
      log: (line) => console.log(line),
    },
    { store: new MacKeychain(), confirm: macConfirmDialog },
  );
  if (!result.applied) {
    console.log(describePlan(result.plan));
    console.log("\nTo publish: wpsync push (a dialog asks you to type the live domain).");
    return;
  }
  console.log(`\nPublished to ${result.plan.homeUrl}`);
  notify("wpsync: publish finished", `${result.plan.homeUrl} now has the local copy. Check it, then finalize or roll back.`);
  for (const check of result.checks ?? []) console.log(`  ${check.ok ? "ok " : "BAD"} ${check.status} ${check.url}`);
  if (result.skipped?.length) console.log(`  Left alone on live (protected): ${result.skipped.join(", ")}`);
  console.log(`  Backup of what changed: ${result.backupDir}`);
  console.log("\nThe old version stays saved on the server. When you're happy: wpsync finalize. To undo: wpsync rollback.");
}

async function runRollback(args: Parsed): Promise<void> {
  await rollback({ dir: stringFlag(args, "dir"), allowHttp: args.flags.has("allow-http"), log: (line) => console.log(line) }, { store: new MacKeychain(), confirm: macConfirmDialog });
  console.log("Rolled back: live is as it was before the last push.");
}

async function runFinalize(args: Parsed): Promise<void> {
  await finalize({ dir: stringFlag(args, "dir"), allowHttp: args.flags.has("allow-http"), log: (line) => console.log(line) }, { store: new MacKeychain(), confirm: macConfirmDialog });
  console.log("Finalized: the previous version on the server is deleted. (backups/ still has a local copy.)");
}

function print(args: Parsed, value: unknown, text: string): void {
  console.log(args.flags.has("json") ? JSON.stringify(value, null, 2) : text);
}

async function runDoctor(args: Parsed): Promise<number> {
  const url = args.positional[0];
  if (!url && !args.flags.has("local")) throw new UsageError("doctor needs --local or a site address.");
  const checks = url ? await checkSite(url, new MacKeychain(), { allowHttp: args.flags.has("allow-http") }) : await checkLocal();
  if (url && checks.some((c) => c.cause === "wordfence-application-passwords")) {
    noteWordfence(stringFlag(args, "dir") ?? process.cwd(), normalizeUrl(url, args.flags.has("allow-http")));
  }
  print(args, checks, `${formatChecks(checks)}\n\n${allOk(checks) ? "Nothing to fix." : "Fix the FIX lines above, then run this again."}`);
  return allOk(checks) ? 0 : 1;
}

async function runStatus(args: Parsed): Promise<void> {
  const result = await status({ dir: stringFlag(args, "dir"), allowHttp: args.flags.has("allow-http") }, new MacKeychain());
  const lines = [`Folder   ${result.dir}`, `Phase    ${result.phase}`];
  const connection = !result.connected
    ? " (not connected)"
    : result.keyWorks
      ? " (connected)"
      : result.wordfence === "back-on"
        ? " (connected; Wordfence blocks wpsync's key until its setting is switched off)"
        : " (key no longer works)";
  if (result.homeUrl) lines.push(`Live     ${result.homeUrl}${connection}`);
  if (result.localUrl) lines.push(`Local    ${result.localUrl}${result.ddevRunning ? " (running)" : ""}`);
  if (result.lastPull) lines.push(`Pulled   ${result.lastPull}`);
  if (result.lastPush) lines.push(`Pushed   ${result.lastPush.at}${result.lastPush.finalized ? "" : " (waiting for finalize or rollback)"}`);
  if (result.wordfence === "switched-off") lines.push("Wordfence  \"Disable WordPress application passwords\" is off for wpsync: switch it back on when done");
  if (result.wordfence === "back-on") lines.push("Wordfence  \"Disable WordPress application passwords\" is on (switch it off before pulling or publishing)");
  lines.push(`Next     ${result.next}`);
  print(args, result, lines.join("\n"));
}

async function runVerify(args: Parsed): Promise<number> {
  const checks = await verify({ dir: stringFlag(args, "dir") });
  print(args, checks, `${formatChecks(checks)}\n\n${allOk(checks) ? "The local copy works." : "Fix the FIX lines above, then run wpsync verify again."}`);
  return allOk(checks) ? 0 : 1;
}

async function runNew(args: Parsed): Promise<number> {
  const url = args.positional[0];
  if (!url) throw new UsageError("new needs the site's address, e.g. wpsync new https://example.com");
  const result = await newProject(
    url,
    { dir: stringFlag(args, "dir"), allowHttp: args.flags.has("allow-http"), log: (line) => console.log(line) },
    { store: new MacKeychain(), credentials: macLoginDialog },
  );
  if (args.flags.has("json")) {
    console.log(JSON.stringify(result, null, 2));
  } else if (result.stoppedAt === "start-gate") {
    console.log(`Created ${result.dir} for ${result.homeUrl}.

Next: start a new Claude Code session in that folder (optionally with Bypass permissions),
then say "continue my wp-dev project" (or run wpsync new ${result.homeUrl} there).`);
  } else {
    console.log(formatChecks(result.checks));
    console.log(
      result.stoppedAt === "done"
        ? `\nLocal site is ready at ${result.localUrl}.`
        : `\nStopped at the ${result.stoppedAt === "mac-checks" ? "Mac" : "site"} checks: fix the FIX lines, then run wpsync new ${result.homeUrl} again.`,
    );
  }
  return result.stoppedAt === "done" || result.stoppedAt === "start-gate" ? 0 : 1;
}

async function runDisconnect(args: Parsed): Promise<void> {
  const url = args.positional[0];
  if (!url) throw new UsageError("disconnect needs the site's address.");
  const result = await disconnect({ url, allowHttp: args.flags.has("allow-http") }, { store: new MacKeychain() });
  console.log(`Disconnected from ${result.homeUrl}.
  Bridge plugin  ${result.bridgeRemoved ? "removed" : "not removed: delete wpsync bridge under Plugins in wp-admin"}
  wpsync's key   ${result.keyRevoked ? "revoked" : "not revoked: remove it under Users → Profile → Application Passwords"}
  Keychain       forgotten`);
}

async function runDestroy(args: Parsed): Promise<void> {
  const allowHttp = args.flags.has("allow-http");
  const store = new MacKeychain();
  const result = await destroy(
    { dir: stringFlag(args, "dir"), keepConnection: args.flags.has("keep-connection"), log: (line) => console.log(line) },
    { confirm: macDestroyDialog, live: (url) => prepareDisconnect({ url, allowHttp }, { store }) },
  );
  console.log(`Deleted the local copy of ${result.host} (${result.dir}${result.ddevDeleted ? " and its DDEV project" : ""}).`);
  const live = result.live;
  if (live.status === "removed") {
    console.log(`Removed wpsync from ${result.homeUrl}; its content is untouched.
  Bridge plugin  ${live.bridgeRemoved ? "removed" : "not removed: delete wpsync bridge under Plugins in wp-admin"}
  wpsync's key   ${live.keyRevoked ? "revoked" : "not revoked: remove it under Users → Profile → Application Passwords"}
  Keychain       forgotten`);
  } else if (live.status === "failed") {
    console.log(`Couldn't remove wpsync from ${result.homeUrl}: ${live.message}
To finish: wpsync disconnect ${result.homeUrl}`);
  } else if (live.status === "kept") {
    console.log(`wpsync is still connected to ${result.homeUrl}. To remove it: wpsync disconnect ${result.homeUrl}`);
  } else {
    console.log(`wpsync had no connection to ${result.homeUrl}, so nothing there was changed.`);
  }
}

/** Commands long enough that their end deserves a notification. */
const LONG_COMMANDS = new Set(["pull", "push", "rollback", "finalize", "new"]);

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
      case "push":
        await runPush(args);
        return 0;
      case "rollback":
        await runRollback(args);
        return 0;
      case "finalize":
        await runFinalize(args);
        return 0;
      case "new":
        return await runNew(args);
      case "doctor":
        return await runDoctor(args);
      case "status":
        await runStatus(args);
        return 0;
      case "verify":
        return await runVerify(args);
      case "disconnect":
        await runDisconnect(args);
        return 0;
      case "destroy":
        await runDestroy(args);
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
      if (LONG_COMMANDS.has(args.command ?? "") && error.code !== "cancelled" && error.code !== "not_confirmed") {
        notify(`wpsync: ${args.command} stopped`, error.message.split("\n")[0]!.slice(0, 180));
      }
      if (error.code === "wordfence_application_passwords" && args.positional[0]) {
        try {
          noteWordfence(stringFlag(args, "dir") ?? process.cwd(), normalizeUrl(args.positional[0], args.flags.has("allow-http")));
        } catch {
          // Not in a project folder: nothing to note.
        }
      }
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
