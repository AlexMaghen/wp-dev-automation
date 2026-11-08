---
name: wp-dev
description: Local development of live WordPress sites with wpsync and DDEV, from only an admin login. Use when the developer says "new wp-dev project", "I want to work on my WordPress site locally", "set up example.com", "continue my wp-dev project" or "continue wp-dev", or asks where a wp-dev project stands. Works out the phase (set up, work, publish) and runs it.
---

<!--
  PURPOSE: Instructions to Claude for the whole wp-dev flow: find out which phase a site
  project is in and run it. Phase 1 (setting up the local copy) is here in full; connecting,
  pulling, working and publishing have their own skills (wp-connect, wp-pull, wp-work,
  wp-publish). Design: docs/design.md, sections 10 and 14.
-->

# wp-dev: work on a live WordPress site locally

Run wpsync as `${CLAUDE_PLUGIN_ROOT}/bin/wpsync` (below: `wpsync`). The developer is usually not
the person who built this, so explain each step in plain words, and say when something needs
them.

**Principles:** check everything before changing anything, and report every problem at once with
its fix. Every step is safe to re-run, so after any interruption the developer says "continue my
wp-dev project" and you pick up where it stopped.

## Where are we?

Run `wpsync status --json` in the current folder and go by its `phase`:

| phase | Do |
| --- | --- |
| `no-project` | Phase 1 from step 1 (the start gate) |
| `start-gate`, `connect`, `pull` | Phase 1 from step 2 (it skips what's done) |
| `work` | Phase 2: the `wp-work` skill for changes, `wp-pull` to refresh, `wp-publish` to go live |

Whatever the phase: if `status` has a `wordfence` field, this site's Wordfence must be switched
off while wpsync works on it and back on afterwards. Follow `${CLAUDE_PLUGIN_ROOT}/skills/wp-dev/wordfence.md`.
| `publish-pending` | The last publish is waiting for finalize or rollback: see `wp-publish` |

## Phase 1: set up the local copy

### 1. Start gate: two things only the developer can do

Remind them up front that two steps are theirs: choosing the folder this session works in, and
(if they want) letting you work without asking permission each time.

1. Ask for the **site's address** (only that, nothing else yet). Propose its folder,
   `~/wp-sites/<domain>/`, or one they name, and create it:
   `wpsync init <site-url> --dir <folder>`. It writes the folder's `CLAUDE.md`,
   `.claude/settings.json` (pre-approves `ddev`, `git`, `brew` and the read-only wpsync
   commands; publishing still asks) and `.wpsync.json` marked pending. It contacts nothing.
2. Tell them to **start a new Claude Code session in that folder**: a session's folder is fixed
   when it starts, and the site's rules and permissions load only in a session started there.
   You can't change your own permission mode, so offer the choice:
   - **Desktop app:** start a new session on the folder; to skip permission prompts, set its
     permission mode to **Bypass permissions** before starting.
   - **Terminal:** `cd <folder> && claude` (or `claude --dangerously-skip-permissions`).

   Publishing is safe either way: it needs them to type the live domain into a dialog on their
   screen, which you can't do. Then they say **"continue my wp-dev project"** there. Stop here.

If you're in a folder that isn't this site's project, repeat the gate instead of setting up
somewhere else. You can't detect the permission mode: ask once, then go on.

### 2. Check this Mac

`wpsync doctor --local` lists everything at once. Install what's missing, in this order:

- **Needs the developer** (a password or a click, which you never do for them): the Xcode
  command line tools (`xcode-select --install`), Homebrew (from https://brew.sh), the first
  launch of OrbStack or Docker Desktop, and `mkcert -install`. Open a Terminal tab with the
  command ready if you can, and wait while they do it.
- **You can install:** `brew install --cask orbstack` (or `--cask docker`; ask which they
  prefer), `brew install ddev/ddev/ddev`, `brew install oven-sh/bun/bun`.

Run `wpsync doctor --local` again until nothing says FIX. Notes (like mkcert) can wait, but say
what they mean.

### 3. Check the site

`wpsync doctor <site-url>` (read-only). Before connecting it checks the site is WordPress with
its REST API and that Application Passwords are on. (Whether the host passes the Authorization
header can only be tested with a real key, so that's checked once wpsync connects.) Fix or
explain each FIX before going on; most are hosting or security-plugin settings the developer has
to ask someone about.

**Wordfence:** if it reports Application Passwords "turned off, most likely by Wordfence", follow
`${CLAUDE_PLUGIN_ROOT}/skills/wp-dev/wordfence.md` ("Before"): the developer switches one setting off in wp-admin, and you wait until
they say it's saved and doctor confirms it. You'll remind them to switch it back on in step 8.

### 4. Connect

The `wp-connect` skill. Afterwards run `wpsync doctor <site-url>` again: it now also checks the
Authorization header, multisite, file permissions, versions, and disk space on this Mac and the
server.

(`wpsync new <site-url>` runs steps 2 to 7 in one go and stops at the first thing that needs the
developer; it's handy for resuming. Step by step, as here, explains more along the way.)

### 5. Pull

The `wp-pull` skill (first pull: `wpsync pull <site-url> --dir .`). It creates the DDEV project
at `https://<project>.ddev.site`, which needs no hosts-file change. Big sites take a while: run it
in the background and report progress.

### 6. Make the copy safe to run

The copy has live's database: real customers' emails, maybe live payment or API keys, scheduled
jobs. DDEV catches all outgoing mail (see it with `ddev mailpit`) and wpsync sets
`WP_ENVIRONMENT_TYPE=local`. Look at the active plugins in `CLAUDE.md`: for any payment,
shipping, CRM, newsletter or webhook plugin, tell the developer, and suggest switching it to
test mode in the local wp-admin.

### 7. Verify

`wpsync verify` checks pages, wp-admin, permalinks, leftover live addresses, images, and that
plugins and theme match live. Then look yourself: open live and the local copy side by side in
the browser (home page and a couple of inner pages) and compare. Fix or explain any difference.

Local login: the copy has live's users, so the developer signs in to the local wp-admin with
their live password.

### 8. Hand over

Read the site's `CLAUDE.md` now, so its rules apply from here on, then say:

> Local site is ready for us to work on together according to your rules. You can view it at
> {local domain}. How shall we get started?

with {local domain} from `.wpsync.json`'s `localUrl`.

**Then, if this site uses Wordfence** (`wpsync status --json` shows `"wordfence": "switched-off"`):
setup no longer needs the live site, so follow `${CLAUDE_PLUGIN_ROOT}/skills/wp-dev/wordfence.md` ("When wpsync is done") to have the
developer switch Wordfence's protection back on, wait, and confirm with `wpsync status`.
