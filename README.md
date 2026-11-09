# wp-dev-automation

Work on a live WordPress site with Claude Code, on your Mac, using **only a WordPress admin
login**.

## Quick start

Go into Claude Desktop on macOS and say this:

> Install the wp-dev Claude plugin from https://github.com/AlexMaghen/wp-dev-automation by following its README, then tell me how to start my first site.

## Initial setup

**1. Make sure git works.** In Terminal:

```bash
git --version
```

If it offers to install developer tools, click **Install** and wait.

**2. Sign in to GitHub** (this repo is private, so you need an invite from Alex):

```bash
gh auth login
```

```bash
gh auth setup-git
```

No `gh` command? Get it from https://cli.github.com first.

**3. Install the plugin:**

```bash
claude plugin marketplace add AlexMaghen/wp-dev-automation
```

```bash
claude plugin install wp-dev@wp-dev-automation
```

**4. Copy a site to your Mac.** Make a new, empty folder for the site, for example
`~/wp-sites/example.com`. In the Claude app's **Code** tab, start a new session **in that
folder** (choose **Bypass permissions** if you don't want to approve each step) and say:

> new wp-dev project

It asks for the site's address. Later, when a **macOS dialog** asks for the site's admin username
and password, type them there, never in the chat. Claude installs anything missing, copies the
site, checks it, and tells you where to see it.

**5. Work, then publish.** In that folder's session:

- **Change things:** just ask, for example "add a Team page to the main menu". Nothing on the
  live site changes while you work.
- **Get the latest from live:** "pull from live".
- **Put it on the live site:** "publish to live". Claude shows what will change, then a dialog
  asks you to **type the site's domain**. Afterwards, say **"finalize"** to keep it or **"roll
  back"** to undo it.

Interrupted? Open a session in the site's folder and say **"continue my wp-dev project"**.

The rest of this page explains each step in more detail.

## How it works

You need only a WordPress admin login: no hosting panel, SSH, FTP or database access, and no
paid migration plugin.

1. **Pull:** copy the live site (database and files) into a local WordPress running in DDEV.
2. **Work:** ask Claude for changes. It keeps the site a normal WordPress site that anyone can
   keep editing in wp-admin (see [the editing rules](claude-plugin/rules/1-wordpress-editing.md)).
3. **Push:** publish the local copy back. It **replaces** the live site, can be rolled back, and
   only happens after you type the site's domain into a confirmation dialog.

It comes as a Claude Code plugin, **wp-dev**, which bundles:

- **wpsync**, a command-line tool that does the copying.
- A small temporary WordPress plugin (the "bridge"). wpsync installs it on the live site, and it
  stays switched off between runs.
- Skills that guide Claude through each step.

Claude never sees your WordPress password. You type it once into a macOS dialog, and wpsync
swaps it for a revocable Application Password kept in your Keychain.

## Set up (once per Mac)

You need a Mac, the Claude desktop app, and read access to this private repository.

1. **Let your Mac read this repo.** Sign in to GitHub on the command line as an account that can
   see it:

   ```bash
   gh auth login
   ```

   ```bash
   gh auth setup-git
   ```

   (An SSH key for GitHub works too.)
2. **Add the plugin.** In Terminal (this needs the `claude` command, which installs with Claude
   Code):

   ```bash
   claude plugin marketplace add AlexMaghen/wp-dev-automation
   ```

   ```bash
   claude plugin install wp-dev@wp-dev-automation
   ```

   Or, once the marketplace is added: in the desktop app's **Code** tab, click **+** next to
   the prompt box, choose **Add plugins** (or **Plugins → Browse plugins**), and pick
   **wp-dev**. Installed plugins work in every folder.
3. That's all. Docker (OrbStack or Docker Desktop), DDEV, Bun and Homebrew get checked and
   installed during the first pull. Claude does what it can, and opens a Terminal tab for the
   few steps that need your Mac password.

**To update the plugin later:**

```bash
claude plugin marketplace update wp-dev-automation
```

```bash
claude plugin update wp-dev@wp-dev-automation
```

## 1. Pull a site down

1. Make a new, empty folder for the site, for example `~/wp-sites/example.com`.
2. Open the Claude desktop app's **Code** tab and start a new session **in that folder**. To let
   Claude work without asking each time, set the permission mode to **Bypass permissions** before
   you start (publishing still waits for you to type the live domain in a dialog). Then say:

   > new wp-dev project

3. Claude asks for the live site's address and sets the folder up. (Said in a folder that's
   already in use, like the Desktop, it explains how to start in a new folder instead.)
4. Claude checks your Mac and the site, then installs what's missing. Then wpsync asks for a
   WordPress **administrator's** username and password in a **macOS dialog**. Type them there,
   never in the chat. The dialog may open behind other windows.
5. Claude pulls the site, which can take a while for big sites. Then it checks the local copy
   against live and opens it in your browser. Sign in to the local wp-admin with your live
   password.

To refresh the local copy from live later, say **"pull from live"**. A pull only reads the live
site. Locally it replaces the content with live's, but keeps the code you committed. If a file
you committed was also changed on live, Claude asks which version to keep.

If you're interrupted at any point, open a session in the project folder and say **"continue my
wp-dev project"**.

## 2. Work with Claude to change it

In a session in the project folder, ask for what you want, in plain words:

> Add a Team page with a photo and short bio for each person, and put it in the main menu.

> Make the header buttons dark green and the headings a little bigger.

Claude makes the change on the local site and opens it in your browser. Then it tells you how
an editor would maintain it in wp-admin. It works the WordPress way:

- **Content stays editable.** Pages, posts, menus and blocks rather than hard-coded templates.
  The home page is a WordPress Page set as the front page, not part of the theme.
- **Code is the last resort.** It uses settings, blocks and plugins already on the site first.
  When code really is the only way, it tells you what it's writing and why. It asks before
  installing a new plugin.
- **Code it writes** (child theme, small custom plugin) is committed to git in the project
  folder.

Nothing reaches the live site while you work. You can also make content changes yourself in the
local wp-admin: they go live with the next push.

## 3. Push the site back up

Say **"publish to live"**. Claude then:

1. Commits any uncommitted code (asking first).
2. Runs a **dry run** and shows what would change: database size, files, plugins, and anything
   people changed on **live** since your last pull. Those live changes would be lost, so it asks
   whether to pull them first.
3. Asks you to confirm. Then **a macOS dialog asks you to type the live domain**. Claude can't
   answer it, so nothing is published without you.
4. Backs up what will change, uploads, swaps the new site in, and checks key pages. If the check
   fails, the old site goes back automatically.
5. Opens live in your browser, and asks how it looks:
   - **"roll back"** puts the previous live site back.
   - **"finalize"** deletes the saved previous version from the server, once you're sure. After
     that, rollback isn't possible, though `backups/` in the project folder keeps a copy.

Publishing replaces the **whole** live site: its database and files. Live's `wp-config.php`,
`.htaccess` and files your host added are kept.

## Limits

- WordPress multisite networks aren't supported. Each site gets its own project folder.
- Hosts that block plugin uploads or Application Passwords can't be used. When a security plugin
  (for example Wordfence) or a login with two-factor or a CAPTCHA gets in the way, Claude walks
  you through it.
- Plugins installed in the desktop app work in local sessions on your Mac, not in cloud sessions.

## For developers of this repo

A Turborepo monorepo: `apps/wpsync` (the CLI, TypeScript on Bun), `packages/protocol` (the bridge
contract), `packages/bridge-plugin` (PHP), `packages/site-template`, and `claude-plugin/`.
Read [docs/design.md](docs/design.md) first. Commands and conventions are in
[CLAUDE.md](CLAUDE.md). Run `pnpm test` for unit tests, and `pnpm test:contract` (needs Docker
and DDEV) for the end-to-end tests.
