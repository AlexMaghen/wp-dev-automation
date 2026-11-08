---
name: setup
description: Set up a live WordPress site for local work, with wpsync and DDEV, from only its admin login. Use when the developer wants to start working on a WordPress site ("set up example.com", "work on my WordPress site locally", "copy this site to my Mac"), or says "continue wp-dev".
---

<!--
  PURPOSE: Instructions to Claude for taking a developer from "I want to work on this live
  WordPress site" to a working local copy: the start gate, prerequisites, connect, pull, check.
  Design: docs/design.md, section 10 (start gate).
-->

# Set up a WordPress site for local work

Run wpsync as `${CLAUDE_PLUGIN_ROOT}/bin/wpsync` (below: `wpsync`).

## 0. Where are we?

Look for `.wpsync.json` in the current folder.

- **It says `"setup": "pending"`** → the start gate is done: go to step 2.
- **It says `"setup": "ready"`** → this site is already set up. Say so, and offer to refresh it
  (the `pull` skill) or to start work (the `work` skill).
- **No `.wpsync.json`** → do the start gate (step 1), even if the developer asked to go further.
  Nothing can be set up properly until a session runs in the site's own folder.

## 1. Start gate (two things only the developer can do)

1. **Ask for the site's address** (only that, nothing else yet). Then propose its folder:
   `~/wp-sites/<domain>/`, or one the developer names. Create it with:

   ```
   wpsync init <site-url> --dir <folder>
   ```

   That writes the folder's `CLAUDE.md`, `.claude/settings.json` (pre-approves `ddev`, `git`,
   `brew` and the read-only wpsync commands; publishing still asks) and `.wpsync.json` marked
   pending. It contacts nothing.
2. **Tell the developer to start a new Claude Code session in that folder.** A session's folder
   is fixed when it starts, and the site's `CLAUDE.md` and permissions only load in a session
   started there. You can't change your own permission mode either, so give them the choice:
   - **Desktop app:** start a new session on the folder. To skip permission prompts, set its
     permission mode to **Bypass permissions** before starting.
   - **Terminal:** `cd <folder> && claude` (or `claude --dangerously-skip-permissions` to skip
     prompts).

   Without bypass, the pre-approved commands keep prompts rare. Then they say
   **"continue wp-dev"** in the new session. Stop here: don't continue in this session.

If this skill runs in a folder that isn't a pending wpsync project, repeat the gate rather than
setting up somewhere else. You can't detect the permission mode: ask about it once, then go on.

## 2. Prerequisites

Check each and install what's missing with Homebrew, telling the developer before anything that
needs their password or a click:

| Tool | Check | Install |
| --- | --- | --- |
| Homebrew | `brew --version` | The developer runs the installer from https://brew.sh themselves (it asks for their password). |
| Docker (OrbStack or Docker Desktop) | `docker info` | Either one works with DDEV. Ask which they'd like: `brew install --cask orbstack` (lighter) or `brew install --cask docker`. Either way, the developer opens it once and accepts its terms. |
| DDEV | `ddev version` | `brew install ddev/ddev/ddev` |
| Bun | `bun --version` | `brew install oven-sh/bun/bun` |

Optional, for trusted HTTPS on local sites: the developer runs `mkcert -install` once in their
own terminal (it asks for their password). Without it, local sites work over `http://` or with a
browser warning.

If Docker isn't running, start it (`open -a OrbStack` or `open -a Docker`, whichever is installed)
and wait for `docker info` to succeed.

## 3. Connect

```
wpsync connect <site-url>
```

A macOS dialog asks for a WordPress **administrator's** username and password. Tell the developer
to type them **there, never in the chat**: wpsync uses the password once to create its own
revocable key (an Application Password, kept in the macOS Keychain) and to install its bridge
plugin, which stays switched off between runs. Never put a password in a command.

If it fails, wpsync's message says why. The usual ones:

- **Wrong password / not an administrator:** run connect again.
- **Login blocked** (two-factor, CAPTCHA, a security plugin): this version can't work around
  it. Explain, and ask whether they can turn that protection off for a few minutes.
- **Application Passwords unavailable / Authorization header stripped / plugin uploads not
  allowed:** these are hosting or security-plugin settings. Explain what to ask the host for.

## 4. Pull

```
wpsync pull <site-url> --dir .
```

It reads the live site (changes nothing there), creates the DDEV project matched to live's PHP,
database and web server, downloads the database and files, and rewrites live addresses to the
local ones. Big sites take a while: run it in the background and report progress.

## 5. Check it

1. `ddev launch` (or open the local URL from `.wpsync.json`) and compare the home page and a few
   key pages with the live site, in the browser.
2. `ddev logs` should show no PHP fatal errors.
3. Log in to the local wp-admin with the same account as on live.

Then tell the developer it's ready, what you checked, and anything that looked different. From
here, the `work` skill covers making changes and `publish` covers going live.
