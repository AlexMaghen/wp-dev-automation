# Setting up wp-dev for a new developer

How someone who isn't the owner gets from nothing to working on a live WordPress site with
Claude Code. About 30 minutes the first time, most of it installs.

## What the owner does once per developer

1. **Give them access to this repository.** It's private: on GitHub, open
   `AlexMaghen/wp-dev-automation` → Settings → Collaborators → Add people, and invite their GitHub
   account with **Read** access. (Alternative: publish `claude-plugin/` as its own public repo;
   nothing in it is secret.)
2. **Make sure they have an administrator login** on each site they'll work on, or a way to get
   one. wpsync needs nothing else: no hosting, SSH, FTP or database access.

## What the developer does once

1. **Install the Claude desktop app** from https://claude.ai/download and sign in. wp-dev runs
   in its **Code** tab.
2. **Let git reach the private repo:** install the GitHub CLI (`brew install gh`, or from
   https://cli.github.com), then run `gh auth login` and follow its steps. Accept the
   collaborator invitation from the email GitHub sent.
3. **Install the plugin**, at user level so it works from any folder. In a terminal:

   ```bash
   claude plugin marketplace add AlexMaghen/wp-dev-automation
   ```

   ```bash
   claude plugin install wp-dev@wp-dev-automation
   ```

   (Inside an interactive `claude` session, `/plugin` does the same through a menu.)

That's all to install by hand. Docker, DDEV, Bun and the rest are checked and, where possible,
installed by the `wp-dev` skill itself, which says when it needs the developer's password or a
click.

## Starting a site

Make a new, empty folder for the site (for example `~/wp-sites/<domain>/`) and start a Claude
Code session **in it**, optionally with **Bypass permissions** (the desktop app's
permission-mode picker). Say **"new
wp-dev project"**. Claude:

1. asks for the site's address and sets the folder up;
2. stays in that session for everything that follows;
3. checks the Mac (`wpsync doctor --local`) and installs what's missing;
4. checks the site (`wpsync doctor <url>`);
5. connects: **a macOS dialog asks for the WordPress admin login**. Type it there, never in the
   chat;
6. pulls the whole site into DDEV, makes it safe to run locally, and verifies it;
7. says the local site is ready, at `https://<project>.ddev.site`.

After any interruption, open a session in the site's folder and say "continue my wp-dev
project".

## Day to day

- **Change the site:** ask for it. Claude follows the WordPress editing rules in the site's
  `CLAUDE.md`: content in Pages and Posts, looks in the theme's settings, custom code last.
- **Get the latest from live:** "pull the site".
- **Publish:** "publish the site". Claude shows what will change; **a macOS dialog asks the
  developer to type the live domain** before anything happens. Afterwards, "finalize" keeps it
  and "roll back" undoes it.

## If something goes wrong

- `wpsync status` says where the project stands; `wpsync doctor --local` and
  `wpsync doctor <url>` say what's wrong and how to fix it.
- A publish that fails partway puts the old site back by itself. If wpsync itself was stopped
  partway (a closed laptop), run `wpsync rollback` in the site's folder.
- The bridge plugin wpsync installs on the site switches itself off within two hours, whatever
  happens. `wpsync disconnect` removes it and revokes wpsync's key.
- **Done with a local copy:** "delete the local copy" (or `wpsync destroy` in its folder)
  removes its DDEV project, database and folder. Three macOS dialogs confirm it first, the
  last asking you to type the domain. The live site isn't touched.
