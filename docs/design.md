# wp-dev-automation: design

Status: draft, 2026-11-08. Owner: Alex Maghen.

## 1. Goal

Take a live WordPress site, copy it whole into a local DDEV environment, let Claude Code work on it
while it stays a normal WordPress site, then publish the local copy back so it **replaces** the live
site. Do this for many sites, often, from the owner's Mac or a friend's.

Hard constraints:

- **Only a WordPress admin login.** No SSH, FTP, hosting panel, or database access.
- **No clicking in wp-admin.** Everything runs from the command line.
- **No paid plugins.** No All-in-One Unlimited Extension, no WP Migrate Pro.
- **Claude never sees or types a password.** The person types it into a native macOS dialog
  that only the CLI reads.

Out of scope for version 1: multisite networks, merging live content changes into local work
(publishing is a full replacement), and hosts that forbid plugin installs (`DISALLOW_FILE_MODS`).

## 2. How it works

Two pieces cooperate:

| Piece | Runs on | Language | Job |
| --- | --- | --- | --- |
| **wpsync** (CLI) | The developer's Mac | TypeScript, compiled with Bun | Connects, drives DDEV, moves data, verifies |
| **wpsync-bridge** (plugin) | The live site | PHP (WordPress requires it) | Private REST endpoints that read and replace the site |

Around them:

- `packages/protocol` defines every bridge endpoint once (zod schemas), so the CLI and the bridge
  can't drift apart.
- `packages/site-template` is what each new local site project starts from.
- `claude-plugin/` teaches Claude the workflow and the WordPress-native rules.

## 3. Connecting to a site (once per site)

`wpsync connect https://example.com`

1. **Login.** wpsync shows a native macOS dialog (`osascript` with a hidden answer field) asking
   for the WordPress username and password. The password goes from the dialog straight to the CLI
   process. It is never printed, logged, stored, or passed through Claude.
2. **Session.** wpsync logs in the way a browser does: it posts `wp-login.php` and keeps the
   cookies. It then gets a REST nonce from core's `admin-ajax.php?action=rest-nonce`.
3. **Application Password.** It calls `POST /wp-json/wp/v2/users/me/application-passwords`
   (name: `wpsync <Mac name> <date>`). WordPress returns the new key once. wpsync stores it in
   the macOS Keychain (`security add-generic-password`, service `wpsync`, account = site URL).
   The login password is now discarded.
4. **Install the bridge.** Still using the cookie session, wpsync submits WordPress's own
   plugin-upload form (`update.php?action=upload-plugin`, with the nonce read from
   `plugin-install.php?tab=upload`) carrying `wpsync-bridge.zip`. The plugin is **left
   inactive**.
5. **Check.** With the Application Password, it activates the bridge through core REST
   (`PUT /wp/v2/plugins/wpsync-bridge/wpsync-bridge`), calls `/wpsync/v1/info`, and deactivates
   it again.

Every later run uses only the Application Password. The password dialog appears again only to
reconnect.

**Fallbacks**, detected and reported in plain words:

- **Login blocked** (two-factor, CAPTCHA, login-security plugins): the developer creates an
  Application Password in their own profile and pastes it into the wpsync dialog. The bridge
  install then needs one login session; if even that is impossible, wpsync stops and says why.
- **Application Passwords disabled** (some security plugins do this): report which setting to
  change. **Wordfence does it by default** (its "Disable WordPress application passwords"
  option, on its Firewall options page; found on the first real-host test, 2026-11-08). wpsync
  spots Wordfence from its public readme, prints step-by-step instructions with a direct link,
  and notes it in `.wpsync.json`. The developer switches it off while wpsync works on the site
  and back on afterwards; `wpsync status` checks which way it is on live, and the skills
  (`claude-plugin/skills/wp-dev/wordfence.md`) wait for each switch and remind them to switch
  it back on.
- **Authorization header stripped** by the host (some Apache/CGI setups): detected on the first
  REST call. Report it; version 1 does not work around it.
- **`DISALLOW_FILE_MODS` or uploads blocked:** stop. The site needs hosting access.

## 4. Bridge lifecycle and security

- **Inactive between runs.** A deactivated plugin runs no code, so it exposes nothing. Each wpsync
  command activates it, works, and deactivates it in a `finally` block.
- **Deadline.** On activation the bridge stores an expiry 2 hours ahead. After that it refuses
  requests and deactivates itself, so a crashed run never leaves it on.
- **Access.** Every endpoint requires an authenticated user with `manage_options`, over HTTPS.
- **One operation at a time**, enforced by a lock option with a timeout.
- **Staging area.** Uploaded data goes to `wp-content/uploads/wpsync-stage-<random>/` (a name no site's own upload is likely to have), with
  `index.php` and deny rules. It is deleted when the operation finishes or is abandoned.
- **Disconnect.** `wpsync disconnect` deletes the bridge, revokes the Application Password through
  REST, and removes the Keychain entry.
- **Updates.** When the CLI ships a newer bridge, it uploads the new version through the bridge
  itself (an endpoint that replaces only its own folder, after a checksum check).

## 5. Bridge endpoints (`/wp-json/wpsync/v1/...`)

Every response stays inside the host's limits. Each call works for at most ~20 seconds and returns
a cursor to continue. Transfers are gzip-compressed binary with a SHA-256 checksum per chunk.

| Endpoint | Purpose |
| --- | --- |
| `GET info` | WordPress, PHP and database versions; web server; table prefix; `siteurl`/`home`; charset; multisite flag; active theme, plugins, must-use plugins, drop-ins; paths; PHP limits (memory, time, upload, post size); disk space; writable checks; bridge version |
| `GET db/tables` | Every table with `CREATE TABLE`, row count, size, primary key |
| `GET db/rows` | One chunk of a table as SQL `INSERT`s, paged by primary key (offset paging only for tables with none) |
| `GET files/manifest` | Paged list of files: path, size, modified time. Hashes on request |
| `POST files/fetch` | A batch of small files as a tar stream; large files by byte range |
| `POST stage/begin` | Open a staging area for a push; returns its id and the chunk size to use |
| `PUT stage/chunk` | Upload one numbered chunk of the database dump or the file archive |
| `POST stage/apply` | Run the replacement, step by step (section 7); returns progress and a cursor |
| `POST rollback` | Restore the state saved by the last push |
| `POST finalize` | Delete the saved state once the developer is happy |
| `POST self-update` | Replace the bridge's own files with a newer version |

## 6. Pulling: `wpsync pull https://example.com [--dir <folder>]`

1. Activate the bridge and read `info`. Refuse multisite.
2. **First pull only** (or the first after `wpsync init`): create the site project (default `~/wp-sites/<domain>/`) from
   `site-template`, and write `.ddev/config.yaml` to match live:
   - `php_version`: the live version, or the nearest one DDEV supports
   - `database`: the live engine and version (MariaDB or MySQL)
   - `webserver_type`: `apache-fpm` when live runs Apache or LiteSpeed (sites there rely on
     `.htaccess`); otherwise `nginx-fpm`
3. **Database:** download every table chunk into `backups/pull-<time>.sql.gz`, then
   `ddev import-db`.
4. **Files:** compare the live manifest with the local files and download only what's new or
   changed. Then delete local files that are gone from live. Never fetched: `wp-config.php`,
   wpsync staging folders, host cache folders. DDEV writes its own `wp-config.php`.
5. **Protect local code.** On a refresh, git-tracked folders (the site's theme and custom plugins)
   are not overwritten. If live differs from git there, wpsync lists the files and stops for a
   decision.
6. **Addresses:** `ddev wp search-replace <live URL> https://<project>.ddev.site --all-tables
   --precise`, safe for WordPress's serialized data.
7. `ddev wp cache flush`, `ddev wp rewrite flush`, deactivate the bridge, print a summary.

## 7. Publishing: `wpsync push [--dry-run]` (replaces live)

Before anything changes on live:

1. Refuse if git-tracked code under `wp/` has uncommitted changes, or if the last push is still
   waiting for finalize or rollback.
2. Re-check (section 14.6): the saved key still signs in, and live can write its own files.
3. Show what will happen: database tables and size, files to upload (only new or changed ones)
   and to delete, plugins added, removed or updated, theme change, and **what people changed on
   live since it last matched the local copy** (the later of the last pull and the last push).
   **`--dry-run` stops here.** Otherwise the developer types the live domain into a native macOS
   dialog, not the terminal (section 14.6): when Claude runs wpsync, a terminal prompt or a flag
   is no safeguard. Cancelling, or typing anything else, changes nothing.
4. **Back up locally** into `backups/push-<time>/`: live's database, and live's copy of every
   file this push will overwrite or delete.

Then:

5. **Open a stage** (`stage/begin`): the bridge checks free disk space (about twice the upload)
   and returns a stage id, a temporary table prefix (`wpsync_n_<id>_`) and the chunk size the
   host's request limit allows.
6. **Prepare locally**, leaving the local copy as it was: take a DDEV snapshot, switch the local
   addresses to live's with WP-CLI's serialization-safe search-replace, export every table under
   the stage's prefix with the bridge's own SQL writer (run with `ddev wp eval-file`), and
   restore the snapshot. Pack the files to upload, plus a delete entry for each file to remove,
   into one archive.
7. **Upload** both in gzip-compressed chunks, each with a SHA-256 checksum (`stage/chunk`).
   Compression also keeps PHP and SQL text from tripping web firewalls.
8. **Apply on live** (`stage/apply`, resumable steps of at most ~15 seconds):
   1. **assemble:** un-gzip the chunks into the database and files parts.
   2. **import:** run the SQL. It may only create and fill tables under the stage's prefix; any
      other statement stops the push. Live tables are untouched.
   3. **carry:** into the new tables, copy what must survive the swap: the bridge switched on with
      its deadline, the stage id, and the publishing user's Application Passwords. Stop if that
      user isn't an administrator in the new tables (publishing would lock them out).
   4. **maintenance:** the bridge's own maintenance page (WordPress's `.maintenance` file would
      block the bridge too). It answers everyone but the bridge with a 503 and ends by itself
      30 minutes after the last push step.
   5. **files:** for each file, write a line to a journal first, move live's original into the
      stage's `backup/`, then write the new one with its modification time. Protected paths are
      skipped and reported.
   6. **swap:** one `RENAME TABLE` moves live's tables to `wpsync_o_<id>_` and the new ones into
      place. The new tables have no maintenance flag, so the site is live again at once.
   7. **cleanup:** clear the flag in the saved old tables; delete the assembled parts.
9. **Verify:** the home page and a few recent pages and posts return HTTP 200 with no PHP error.
   If not, roll back automatically and report.
10. Switch the bridge off. The old tables and files stay on the server until `wpsync finalize`
    (drops them), so `wpsync rollback` remains a one-command undo: it restores every journaled
    file, swaps the old tables back, and drops the published ones. Rollback and finalize also
    ask for a click in a macOS dialog.

A failure before the files step leaves live as it was (the stage is discarded). A failure from
the files step on is rolled back automatically. Every step can be repeated after a crash; a
push interrupted mid-way is undone with `wpsync rollback`.

**Never replaced on live:** `wp-config.php`; `.htaccess` (unless `--include-htaccess`);
`.user.ini`, `php.ini`, `web.config`; must-use plugins and drop-ins (`object-cache.php`,
`advanced-cache.php`, `db.php`, `sunrise.php`); `.well-known/`; wpsync's own files.

## 8. Other commands

| Command | Does |
| --- | --- |
| `wpsync init <url>` | The start gate's folder: `CLAUDE.md`, `.claude/settings.json`, `.gitignore`, `.wpsync.json` marked pending. Contacts nothing. (A later `pull` is the refresh; section 6, step 5 protects code.) |
| `wpsync doctor --local` / `doctor <url>` | Every check before anything changes, reported together with fixes (section 14.4) |
| `wpsync new <url>` | Phase 1 in one resumable command: init, doctor, connect, pull, verify; stops at the first thing that needs the developer |
| `wpsync rollback` / `finalize` | Undo the last push / delete its saved state (each confirmed in a dialog) |
| `wpsync status [--json]` | Where the project stands (phase, connection, last pull and push, DDEV), for the `wp-dev` skill |
| `wpsync verify` | The local copy works: pages, wp-admin, permalinks, no live URLs left, images, plugins and theme match live |
| `wpsync disconnect` | Section 4 |
| `wpsync update-rules` | Refresh the WordPress-native rules in the project's `CLAUDE.md` from the installed plugin |

Each site project has `.wpsync.json` (site URL, local URL, last pull/push times, bridge version;
**no secrets**), `.ddev/config.yaml`, `CLAUDE.md`, `wp/` (docroot) and `backups/` (gitignored).

## 9. Site projects

Created from `packages/site-template`:

```
<domain>/
├── CLAUDE.md          site facts + the WordPress-native rules (from claude-plugin/rules)
├── .wpsync.json
├── .ddev/config.yaml  committed
├── .gitignore         tracks only CLAUDE.md, .wpsync.json, .ddev/config.yaml,
│                      and the site's own theme/plugins once the developer starts changing them
├── backups/           gitignored: database dumps and pre-push backups
└── wp/                WordPress docroot
```

Git tracks only code the team writes. The rest can always be pulled again from live.

## 10. Claude Code plugin

Installed from this private repository (`.claude-plugin/marketplace.json`); the friend needs read
access to the repo.

- **Skills** (plugin `wp-dev`; section 14.3):
  - `wp-dev`: works out the phase from `wpsync status`, and runs phase 1 in full: the start gate
    below, Mac and site checks (`wpsync doctor`), connect, pull, making the copy safe, verify,
    and the hand-over.
  - `wp-connect`: `wpsync connect`, the macOS dialog, the Application Password fallback for
    protected logins, and each failure.
  - `wp-pull`: refresh from live, and what to do when git-tracked code changed on both sides.
  - `wp-publish`: content-freeze check, dry run, the developer's yes, `wpsync push` with its
    confirmation dialog, verify, and rollback or finalize.
  - `wp-work`: how to make changes while keeping the site a WordPress site.
- **How wpsync ships in the plugin:** `claude-plugin/bin/wpsync` is a launcher that runs
  `bin/wpsync.mjs`, the CLI bundled into one file (`pnpm --filter wpsync bundle`; a unit test
  fails when it's stale) with Bun. Skills call it as `${CLAUDE_PLUGIN_ROOT}/bin/wpsync`, and it
  tells each site's `CLAUDE.md` its own path. The standalone binaries (`pnpm --filter wpsync
  build`) remain for running wpsync without the plugin.
- **Rules** (`claude-plugin/rules/*.md`, plain text, per the owner's rule on AI instructions,
  number-prefixed because they're copied in file-name order): the WordPress editing rules
  (`1-wordpress-editing.md`: work with WordPress rather than overriding it, so admins can see and
  change everything in wp-admin, and say so when code is the only way; the theme holds looks,
  not content, so the home page is a Page set as the front page; Pages, Posts, blocks, menus,
  existing plugins first; child theme for looks; custom PHP last, in a prefixed plugin),
  safety rules (nothing touches live without a yes) and the definition of done. `wpsync` copies
  them into each site's `CLAUDE.md`.
- **Install helper:** the plugin's setup skill installs `wpsync`, DDEV and Docker (OrbStack or Docker Desktop) with
  Homebrew where missing, and says when a password or click is needed.
- **Start gate (before any setup):** a Claude Code session's folder is fixed when it starts, and
  Claude can't change its own permission mode, so both are chosen by starting the session: the
  developer starts a new session **in a new, empty folder** for the site (optionally with Bypass
  permissions) and says "new wp-dev project". The skill checks the folder is empty (only
  `.DS_Store` or `.claude` allowed); anywhere else (Desktop, home, another project) it explains
  how to start in a new folder and stops. In the right folder it asks only for the site's
  address, runs `wpsync init <url> --dir .` (`CLAUDE.md`, `.claude/settings.json`,
  `.wpsync.json` marked pending; contacts nothing), and carries on in the same session with
  prerequisites, connect, pull and verify. (Revised 2026-11-08 after the first run: choosing
  the folder inside a session meant starting a second one, which felt like starting over.)

## 11. Repository layout

```
apps/wpsync/               CLI (TypeScript, Bun build to a single binary)
packages/protocol/         zod schemas for every endpoint + JSON test cases
packages/bridge-plugin/    PHP plugin; built into wpsync-bridge.zip and embedded in the CLI
packages/site-template/    files for new site projects
claude-plugin/             skills/, rules/, bin/ (wpsync launcher + bundle), plugin manifest
.claude-plugin/            marketplace.json, so the repo installs as a plugin source
docs/                      this design, setup guide for a new user
```

**Testing the bridge against the contract:** a test harness starts a DDEV WordPress site that
plays the role of "live", installs the bridge, calls every endpoint, and validates responses
against the zod schemas.

## 12. Test plan

1. **Local "live":** a second DDEV project acts as the remote site, with both Apache and nginx
   variants. Fast, and covers most logic.
2. **Owner's server:** a scratch site created with `new-wp-site.sh` on the Lightsail/CloudPanel
   server and filled with a copy of kol-ami. Run connect, pull, edit, push, rollback, push,
   finalize, disconnect, repeatedly.
3. **A different host** (shared hosting with Apache or LiteSpeed) before calling it done.
4. **Large site:** at least 2 GB of uploads and a database over 200 MB, to prove chunking and
   resuming.
5. **Failure drills:** kill the CLI mid-push; fill the disk; wrong checksum; expired deadline.
   Each must leave live either unchanged or recoverable with `wpsync rollback`.

## 13. Build order

1. `protocol` + bridge `info`, with the contract test harness
2. `wpsync connect` (dialog, login, Application Password, Keychain, bridge upload)
3. Pull: database, files, DDEV config, search-replace
4. Site template, Claude plugin (`wp-dev` skill, rules), `doctor`, `new`, `verify`, connect
   fallback (plan: section 14)
5. Push: staging, apply steps, table swap, verify, rollback, finalize (with section 14.6)
6. `status`, `disconnect`, bridge self-update
7. Test plan steps 2–5, then a setup guide for the friend

Status, 2026-11-08: steps 1–6 are built and pass their contract tests against the DDEV harness,
as is the setup guide (`docs/setup-guide.md`). Step 7's test-plan items 1 and 5 (local "live"
site, failure drills) run on the harness; items 2–4 (the owner's server, another host, a large
site) need the owner.

## 14. Build step 4 plan: the `wp-dev` skill and up-front checks

The developer will not be the owner, so the whole flow must work for someone who has never seen
it: missing tools are found and explained **before** anything is half-done.

### 14.1 Principles

- **Check everything before changing anything.** All checks run first, and every problem is
  reported in one list, each with its fix. The developer never meets problem 2 only after fixing
  problem 1.
- **Every step is safe to re-run.** Each step checks whether it is already done, and progress is
  recorded in `.wpsync.json`. After any interruption (a crash, a closed laptop, a missing tool),
  "continue my wp-dev project" picks up where it stopped.
- **The CLI does the work; the skill guides.** The steps and checks live in `wpsync` (testable):
  a `wpsync new` command and an expanded `wpsync doctor`. The skill orders the steps and explains
  them. Text instructions to Claude are guidance, not guarantees.
- **The rules travel with the plugin.** The owner's global `CLAUDE.md` is not on the developer's
  Mac. Every rule Claude must follow ships in `claude-plugin/rules/` and is copied into the
  site's `CLAUDE.md`.

### 14.2 Installing the plugin (the real first step)

The developer installs Claude Code, then the plugin at **user level** from the marketplace, so
the skill works from any folder. The repo is private, so this needs a GitHub collaborator invite
and `gh auth login`. Alternative: publish the plugin as its own public repo (the bridge holds no
secrets). The setup guide (step 7) covers this.

### 14.3 One `wp-dev` skill that picks the phase

It triggers on "new wp-dev project", "pull/refresh my site", "publish", "continue my wp-dev
project". It reads `.wpsync.json` and `wpsync status` to see where things stand, then runs the
connect, pull, work or publish part (`wp-connect`, `wp-pull`, `wp-work`, `wp-publish`, section
10).

### 14.4 Phase 1: set up the local copy

In this order:

1. **Start gate** (section 10): ask for the site URL, create the site folder with
   `.claude/settings.json` and `.wpsync.json` (`setup: pending`), and have the developer start a
   new session there (with Bypass permissions if they want it). Nothing else happens until then.
2. **Mac checks** (`wpsync doctor --local`, no site needed):
   - macOS version, Apple Silicon or Intel, Xcode Command Line Tools (git), Homebrew
   - a Docker provider installed **and running** (OrbStack or Docker Desktop; either needs a
     first launch the developer clicks through)
   - Docker's disk allocation (Docker Desktop's virtual disk can fill up during a large import)
   - DDEV, and `mkcert -install` (trusted HTTPS for the local site)
   - the `wpsync` binary and its version
3. **Install what's missing.** Steps that need the developer's password (Homebrew, `mkcert
   -install`, Docker's privileged helper) are hard stops: Claude never types a password, so the
   skill opens a terminal tab with the command ready and waits while the developer types.
4. **Site checks** (`wpsync doctor <url>`, before downloading anything):
   - reachable over HTTPS, is WordPress, REST API answers
   - not multisite
   - Application Passwords enabled; the Authorization header gets through the host
   - plugin uploads allowed (`DISALLOW_FILE_MODS` not set)
   - live PHP and database versions are ones DDEV supports
   - **local disk space** of about 2.5× the site's size (dump + imported database + files),
     from the sizes `info` reports
   - router DNS-rebinding protection (some routers stop `*.ddev.site` resolving to 127.0.0.1)
5. **Connect:** the macOS password dialog (section 3). The two-factor/CAPTCHA fallback (the
   developer pastes an Application Password they made) must be built here, since other people's
   sites are more likely to have login protection.
6. **Pull** (section 6).
7. **Local domain:** keep DDEV's `https://<project>.ddev.site`. It resolves through public DNS,
   so it needs no `/etc/hosts` edit and no sudo. A custom name like `example.test` is an option
   only, since it needs a hosts-file edit with a password.
8. **Make the copy safe to run locally.** The copied database can hold live payment keys, real
   customer emails, scheduled jobs and webhooks. DDEV catches outgoing mail in Mailpit. Also set
   `WP_ENVIRONMENT_TYPE=local`, and have the pull report plugins that hold payment or API keys.
9. **Local login:** the copied database keeps live admin users, so the developer signs in locally
   with their live password; optionally wpsync creates a local-only admin.
10. **Verify** (`wpsync verify`):
    - home page, a few posts and pages, and wp-admin return 200 with no PHP errors in the logs
    - pretty permalinks work
    - no live URL left in the database
    - images load
    - active plugins and theme match live
    - a side-by-side screenshot of live and local, checked in the browser
11. **Hand over.** The skill reads the site's `CLAUDE.md` into the conversation so the rules apply
    now, and says: "Local site is ready for us to work on together according to your rules. You
    can view it at {local domain}. How shall we get started?"

### 14.5 Phase 2: work on the local copy

The `wp-work` skill plus the rules files (section 10): WordPress features first, a child theme for
looks, custom PHP last in a prefixed plugin, git commits as work goes, and a definition of done
that includes a check in the browser.

### 14.6 Phase 3: publish over production

Section 7 stays as designed. Decided now, built in step 5:

- **Re-run the checks before pushing:** the Application Password is still valid, and the live
  server has about 2× the site's size free (staging area + saved state), from `info`.
- **A confirmation only a person can give.** The push confirmation is a native macOS dialog where
  the developer types the live domain, not a terminal prompt. If Claude runs `wpsync push`,
  Claude is the one at the terminal, so a terminal prompt is no safeguard. This is what makes
  Bypass permissions acceptable.
- **Optional hook** in the plugin that blocks `wpsync push`, `rollback` and `finalize` unless the
  developer asked for them in this session.

### 14.7 Deliverables for step 4

- `packages/site-template`: DDEV config, `.gitignore`, `CLAUDE.md` template,
  `.claude/settings.json` allowlist
- `claude-plugin/`: manifest, `.claude-plugin/marketplace.json`, the `wp-dev` skill and its
  sub-skills, `rules/*.md`
- `wpsync doctor --local` and `wpsync doctor <url>` (pulled forward from step 6), `wpsync new`
  (the resumable phase 1 driver), `wpsync verify`
- the two-factor/CAPTCHA connect fallback
- contract tests for doctor and verify against the harness; a first run of the skill end to end
  against the harness site

## 15. Open questions

- Which hosts the friend's sites are on (some managed hosts block plugin uploads or Application
  Passwords).
- WooCommerce or membership sites: orders and sign-ups during the freeze need a policy beyond
  "warn and ask".
- Whether to keep more than one saved state on live (disk space versus a deeper undo).
