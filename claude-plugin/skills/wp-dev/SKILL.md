---
name: wp-dev
description: Local development of live WordPress sites with wpsync and DDEV, from only an admin login. Use when the developer says "new wp-dev project", "I want to work on my WordPress site locally", "set up example.com", "continue my wp-dev project" or "continue wp-dev", asks where a wp-dev project stands, or asks to delete a local copy. Works out the phase (set up, work, publish) and runs it.
---

<!--
  PURPOSE: Instructions to Claude for the whole wp-dev flow: find out which phase a site
  project is in and run it. Phase 1 (setting up the local copy) is here in full; connecting,
  pulling, working and publishing have their own skills (wp-connect, wp-pull, wp-work,
  wp-publish). How to show progress and ask questions: guiding.md beside this file.
  Design: docs/design.md, sections 10 and 14.
-->

# wp-dev: work on a live WordPress site locally

Run wpsync as `${CLAUDE_PLUGIN_ROOT}/bin/wpsync` (below: `wpsync`). The developer is usually not
the person who built this, so explain each step in plain words, and say when something needs
them.

**First read `${CLAUDE_PLUGIN_ROOT}/skills/wp-dev/guiding.md`.** It says how to show progress
(a checklist of the phase's steps), how to ask (a question dialog for every decision and every
wait), and what to do where the app doesn't offer those. The **Ask** lines below name the
dialogs to use.

**Principles:** check everything before changing anything, and report every problem at once with
its fix. Every step is safe to re-run, so after any interruption the developer says "continue my
wp-dev project" and you pick up where it stopped.

## Before anything: can wpsync run?

wpsync runs on **Bun**, so on a Mac that doesn't have Bun yet every wpsync command (including
`status`, `init` and `doctor`) fails with "wpsync needs Bun" (exit code 127). Check this first,
before any wpsync command:

1. Run `${CLAUDE_PLUGIN_ROOT}/bin/wpsync --version`. If it prints a version, go on to "Where are
   we?".
2. If it says wpsync needs Bun, find Homebrew: `command -v brew || ls /opt/homebrew/bin/brew
   /usr/local/bin/brew`.
   - **Homebrew found** → `brew install oven-sh/bun/bun` (using the full path to `brew` if it
     isn't on PATH), then run `wpsync --version` again.
   - **No Homebrew** → it needs the developer (it asks for their Mac password). Explain that
     wpsync and the other tools are installed with Homebrew, open a Terminal tab with the
     installer command from https://brew.sh ready (see `guiding.md`), and wait with the "Done,
     check it" dialog. Then make Homebrew usable (see "Homebrew right after installing it" in
     step 2) and install Bun as above.

If wpsync runs, say nothing about it and go on. Only if you had to install Bun, tell the
developer in one line that this was the first prerequisite, and that `wpsync doctor --local` will
check the rest in step 2.

## Where are we?

Run `wpsync status --json` in the current folder and go by its `phase`:

| phase | Do |
| --- | --- |
| `no-project` | Phase 1 from step 1 (the start gate) |
| `start-gate` (folder made in an earlier session) | Phase 1 from step 2 |
| `connect`, `pull` | Phase 1 from step 2 (it skips what's done) |
| `work` | Phase 2: the `wp-work` skill for changes, `wp-pull` to refresh, `wp-publish` to go live |
| `publish-pending` | The last publish is waiting for finalize or rollback: see `wp-publish` |

In any phase: if the developer asks to delete, remove or destroy the local copy, see
"Deleting a local copy" at the end.

Whatever the phase: if `status` has a `wordfence` field, this site's Wordfence must be switched
off while wpsync works on it and back on afterwards. Follow `${CLAUDE_PLUGIN_ROOT}/skills/wp-dev/wordfence.md`.

In phase 1, start (or, when resuming, show again) the **Setup checklist** from `guiding.md`,
with finished steps ticked, and start a "Setup" chapter.

## Phase 1: set up the local copy

### 1. Start gate: the right folder, then the address

A session's folder is fixed when it starts, so the developer **starts the session in the folder
where the local copy should go**. Then everything happens in this one session.

**Is this session in a usable folder?** Look at the current folder (`ls -A`):

- **Empty** (or holding only `.DS_Store` or `.claude`): it's the site's new folder. Go on below.
- **Anything else** (Desktop, the home folder, another project): don't set up here. Send this,
  and stop:

  > To set up a site, start a new Claude Code session in the folder where you want its local
  > copy: a new, empty folder, for example `~/wp-sites/example.com`.
  >
  > Start a new session, choose (or create) that folder, and set the permission mode to
  > **Bypass permissions** if you'd rather not approve each step. (Publishing to the live site
  > always waits for you to type its domain in a dialog.) Then say **"new wp-dev project"**
  > there.

**In the new folder,** ask one thing, the live site's address, in one short line:

> What's the live site's address? For example, `https://example.com`.

If the folder's name contains a domain (for example `example.com-local`), offer it instead:
"What's the live site's address? From the folder name I'd guess `https://example.com`."

Then create the project here: `wpsync init <site-url> --dir .`. It writes the folder's
`CLAUDE.md`, `.claude/settings.json` (pre-approves `ddev`, `git`, `brew` and the read-only wpsync
commands; publishing still asks) and `.wpsync.json` marked pending. It contacts nothing. Go
straight on to step 2. Those settings take effect from the next session in this folder; if you
aren't in Bypass permissions, this session may ask a little more often meanwhile. You can't
detect the permission mode, and don't need to.

### 2. Check this Mac

`wpsync doctor --local` lists everything at once. Show it as the results table in `guiding.md`.
Install what's missing, in this order:

- **You can do:** `brew install ddev/ddev/ddev`, `brew install oven-sh/bun/bun`, and Docker.
  If neither Docker app is installed, **ask** "Which Docker app should I install on this Mac?":
  **OrbStack** (Recommended: lighter and faster on a Mac, free for personal use) or **Docker
  Desktop** (the standard one; free for personal use and small companies). Then
  `brew install --cask orbstack` or `brew install --cask docker`.
  **Docker installed but "not running":** start it yourself (`open -a OrbStack` or
  `open -a Docker`) and wait up to a minute for `docker info` to succeed. Only a first launch
  (terms, password) needs the developer; if `docker info` still fails after a minute, a
  first-launch dialog is waiting for them.
- **Needs the developer** (a password or a click, which you never do for them): the Xcode
  command line tools (`xcode-select --install`), Homebrew (from https://brew.sh), the first
  launch of OrbStack or Docker Desktop, and `mkcert -install`. Open a Terminal tab with the
  command ready (see `guiding.md`), and wait with the "Done, check it" dialog. When several are
  missing, list them all in one message and wait once, not once per item.

**mkcert is required** (doctor reports it as FIX until it's set up). The local copy's address is
`https://…ddev.site`. Without `mkcert -install`, Chrome refuses that address, and over plain
http the page loads without its styles or images (WordPress links them over https). That looks
like a broken copy in step 7. So do it here, before the first pull: say it will ask for their
**Mac's** password, run `mkcert -install` in a Terminal tab, and wait. If it's installed only
after DDEV has started (resuming an older setup), DDEV is still using its untrusted certificate:
run `ddev poweroff && ddev start` in the site folder, then ask them to reload the page.

Run `wpsync doctor --local` again until nothing says FIX. Notes can wait, but say what they
mean.

**Homebrew right after installing it:** on Apple Silicon Macs Homebrew lands in
`/opt/homebrew`, which isn't on the PATH until the installer's "Next steps" lines are run. doctor
reports this as "installed at /opt/homebrew/bin/brew, but not on the PATH yet", with the line to
add to `~/.zprofile`; never send them to reinstall it. Your own shell doesn't pick up
`~/.zprofile`, so in this session prefix commands with `eval "$(/opt/homebrew/bin/brew shellenv)" &&`.

### 3. Check the site

`wpsync doctor <site-url>` (read-only). Before connecting it checks the site is WordPress with
its REST API and that Application Passwords are on. (Whether the host passes the Authorization
header can only be tested with a real key, so that's checked once wpsync connects.) Show the
results table. Fix or explain each FIX before going on; most are hosting or security-plugin
settings the developer has to ask someone about: use the "When a check needs someone else"
dialog in `guiding.md`.

**Wordfence:** if it reports Application Passwords "turned off, most likely by Wordfence", follow
`${CLAUDE_PLUGIN_ROOT}/skills/wp-dev/wordfence.md` ("Before"): the developer switches one setting
off in wp-admin, and you wait with the "Done, check it" dialog until doctor confirms it. You'll
remind them to switch it back on in step 8.

### 4. Connect

The `wp-connect` skill. Afterwards run `wpsync doctor <site-url>` again: it now also checks the
Authorization header, multisite, file permissions, versions, and disk space on this Mac and the
server.

(`wpsync new <site-url>` runs steps 2 to 7 in one go and stops at the first thing that needs the
developer; it's handy for resuming. Step by step, as here, explains more along the way.)

### 5. Pull

The `wp-pull` skill (first pull: `wpsync pull <site-url> --dir .`). It creates the DDEV project
at `https://<project>.ddev.site`, which needs no hosts-file change. Big sites take a while: run it
as a long job (`guiding.md`).

### 6. Make the copy safe to run

The copy has live's database: real customers' emails, maybe live payment or API keys, scheduled
jobs. DDEV catches all outgoing mail (see it with `ddev mailpit`) and wpsync sets
`WP_ENVIRONMENT_TYPE=local`. Look at the active plugins in `CLAUDE.md`. If any is a payment,
shipping, CRM, newsletter or webhook plugin, list them and **ask** "These plugins on the local
copy of <domain> may still talk to real services. What should we do?": **Walk me through test
mode** (Recommended: you guide them to each plugin's test or sandbox setting in the local
wp-admin), or **Leave them as they are** (they accept that the local copy can reach those
services).

If none of the active plugins is like that, don't ask: say so in one line (naming any that only
send email, which DDEV catches) and go on.

### 7. Verify

`wpsync verify` checks pages, wp-admin, permalinks, leftover live addresses, images, and that
plugins and theme match live. Show the results table.

**Before investigating a failed page check**, ask the page once yourself:
`curl -s -o /dev/null -w '%{http_code}' <localUrl>/`. If it answers 200, the check probably ran
while DDEV was still starting (it answers 502 for a moment after `ddev start`): run
`wpsync verify` once more before digging into logs.

Then look yourself: open live and the local copy side by side in **Chrome** (Claude in Chrome),
home page and a couple of inner pages, and compare. Don't judge the copy in the app's built-in
browser pane: it blocks a `*.ddev.site` page's styles, scripts and images
(`ERR_BLOCKED_BY_CLIENT`), so even a perfect copy looks broken there. If Chrome isn't
available, check the page with `curl` and ask the developer to look. If something differs that
you can't explain, describe it and **ask**: **Fix it now** (Recommended), or **It's fine, go
on**.

Local login: the copy has live's users, so the developer signs in to the local wp-admin with
their live password.

### 8. Hand over

Read the site's `CLAUDE.md` now, so its rules apply from here on.

**First, if this site uses Wordfence** (`wpsync status --json` shows `"wordfence": "switched-off"`):
setup no longer needs the live site, so follow `${CLAUDE_PLUGIN_ROOT}/skills/wp-dev/wordfence.md` ("When wpsync is done") to have the
developer switch Wordfence's protection back on, wait, and confirm with `wpsync status`. Do
this before the hand-over line, so the developer's last step is starting work rather than
another chore.

Then open the local site in Chrome, finish the checklist, and say:

> Local site is ready for us to work on together according to your rules. You can view it at
> {local domain}. How shall we get started?

with {local domain} from `.wpsync.json`'s `localUrl`. Add one line on signing in: the local
wp-admin takes their live username and password.

## Deleting a local copy

Only when the developer asks for it in words. `wpsync destroy` (in the site's folder, or with
`--dir`) deletes the DDEV project (containers, local database) and the whole folder (files, git
history, `backups/`). It can't be undone. It never touches the live site.

1. First run `git status --short` in the folder. If anything is uncommitted, or work was done
   since the last publish, say so in one line: it will be lost.
2. Tell the developer that three macOS dialogs are about to appear, and that the last one asks
   them to type the site's domain. Then run `wpsync destroy`. You never answer the dialogs and
   never look for a way around them.
3. If it says "Not confirmed" or "Cancelled", nothing was deleted: say so and stop.
4. When it's done, the session's folder no longer exists, so suggest closing this session. Ask
   whether they also want wpsync removed from the live site (`wpsync disconnect <site-url>`,
   which deletes the bridge plugin and revokes wpsync's key). Only run it on their yes, since it
   changes the live site.
