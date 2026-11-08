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
  change.
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
- **Staging area.** Uploaded data goes to `wp-content/uploads/wpsync-<random>/`, with
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
2. **First pull only:** create the site project (default `~/AxDevProj/wp-sites/<domain>/`) from
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

1. Refuse if git has uncommitted changes.
2. Show what will happen: database size, number of files changed and deleted, plugins added or
   removed compared with live. **`--dry-run` stops here.** Otherwise the developer types the live
   domain to confirm.
3. **Back up live locally:** a full pull into `backups/live-before-push-<time>/`.

Then:

4. **Prepare locally:** `ddev wp search-replace <local URL> <live URL> --all-tables --precise
   --export=<file>` writes a live-ready dump without touching the local database. Pack the
   changed files into a tar archive.
5. **Upload** both in chunks to a staging area (`stage/begin`, `stage/chunk`).
6. **Apply on live** (`stage/apply`, resumable steps):
   1. Verify every checksum.
   2. Turn on maintenance mode (a `.maintenance` file).
   3. Import the dump into **new tables under a temporary prefix**, a batch of statements per
      step. Live tables are untouched so far.
   4. Carry over from live into the new tables: the bridge's own active state (so it survives the
      swap) and the connecting user's Application Passwords (so wpsync keeps access).
   5. Move the WordPress files being replaced into a saved-state folder (a rename on the same disk,
      so fast), then unpack the new ones.
   6. **Swap in one statement:** a single `RENAME TABLE` moves the live tables to a saved prefix
      and the new tables to the real prefix.
   7. Turn off maintenance mode.
7. **Verify:** home page and three more pages return HTTP 200 with no PHP errors; `info` reports
   the expected URLs and versions. If not, roll back automatically and report.
8. Deactivate the bridge. The saved state stays on the server until `wpsync finalize`, so
   `wpsync rollback` remains a one-command undo.

**Never replaced on live:** `wp-config.php`; `.htaccess` (unless `--include-htaccess`); host
must-use plugins and drop-ins (`object-cache.php`, `advanced-cache.php`, anything the host
added); `.well-known/`; files outside WordPress in the web root.

**Content freeze.** Publishing replaces everything, so edits made on live after the pull are lost.
wpsync records the pull time. At push time, if live posts, comments or orders changed since then,
it lists them and asks before going ahead.

## 8. Other commands

| Command | Does |
| --- | --- |
| `wpsync refresh` | Re-pull into an existing project (section 6, step 5 protects code) |
| `wpsync status` | Connection, bridge version, last pull and push, saved state on live |
| `wpsync doctor` | Checks: login, Application Password, Authorization header, file mods, PHP limits, disk space, DDEV and Docker |
| `wpsync rollback` / `finalize` | Undo the last push / delete its saved state |
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

- **Skills:**
  - `wp-connect`: run `wpsync connect`, explain the dialog, handle each fallback.
  - `wp-pull`: first pull or refresh, then compare local with live in the browser.
  - `wp-publish`: content-freeze check, dry run, explicit confirmation, push, verify, offer
    `finalize` only after the developer is happy.
  - `wp-work`: how to make changes while keeping the site a WordPress site.
- **Rules** (`claude-plugin/rules/*.md`, plain text, per the owner's rule on AI instructions): the
  WordPress-native rules (Pages, Posts, blocks, menus, existing plugins first; child theme for
  looks; custom PHP last, in a prefixed plugin; nothing an editor might change is hard-coded),
  safety rules (nothing touches live without a yes) and the definition of done. `wpsync` copies
  them into each site's `CLAUDE.md`.
- **Install helper:** the plugin's setup skill installs `wpsync`, DDEV and Docker Desktop with
  Homebrew where missing, and says when a password or click is needed.

## 11. Repository layout

```
apps/wpsync/               CLI (TypeScript, Bun build to a single binary)
packages/protocol/         zod schemas for every endpoint + JSON test cases
packages/bridge-plugin/    PHP plugin; built into wpsync-bridge.zip and embedded in the CLI
packages/site-template/    files for new site projects
claude-plugin/             skills/, rules/, plugin manifest
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
4. Site template + Claude plugin rules and skills
5. Push: staging, apply steps, table swap, verify, rollback, finalize
6. `doctor`, `status`, `disconnect`, bridge self-update
7. Test plan steps 2–5, then a setup guide for the friend

## 14. Open questions

- Which hosts the friend's sites are on (some managed hosts block plugin uploads or Application
  Passwords).
- WooCommerce or membership sites: orders and sign-ups during the freeze need a policy beyond
  "warn and ask".
- Whether to keep more than one saved state on live (disk space versus a deeper undo).
