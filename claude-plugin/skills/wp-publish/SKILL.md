---
name: wp-publish
description: Publish a local wpsync copy of a WordPress site to the live site, replacing it; roll back or finalize afterwards. Use only when the developer asks to publish, push, deploy, go live, roll back or finalize.
---

<!--
  PURPOSE: Instructions to Claude for publishing a site project with `wpsync push`, which
  replaces the live site, and for rollback/finalize after it. Each of these needs the developer
  to confirm in a macOS dialog on their screen, which Claude can't answer.
-->

# Publish to the live site

Run wpsync as `${CLAUDE_PLUGIN_ROOT}/bin/wpsync`, inside the site's folder.

**Publishing replaces the whole live site** (database and files) with the local copy. Live's
`wp-config.php`, `.htaccess` and host-added files are kept. Edits people made on live since the
last pull are lost.

0. **Wordfence:** if `wpsync status --json` shows `"wordfence": "back-on"`, follow
   `${CLAUDE_PLUGIN_ROOT}/skills/wp-dev/wordfence.md` ("Before") now. It must stay off until the publish is finalized or rolled back;
   then follow its "When wpsync is done" part to have it switched back on.
1. **Commit first.** wpsync refuses to publish uncommitted code.
2. **Dry run:** `wpsync push --dry-run`. Show the developer its summary: database size, files to
   upload and delete, plugins added, removed or updated, and **any live changes since the last
   pull** (posts, pages, comments, new users). If live has changes, ask whether to pull first, and
   remind them that pulling replaces local content.
3. **Ask for a clear yes** in the chat, naming the live site.
4. **Publish:** `wpsync push`. It shows the same summary in a macOS dialog, and only goes ahead
   when **the developer types the live domain there**. Tell them the dialog is coming; you can't
   answer it. It then backs up what will change to `backups/`, uploads, swaps everything in, and
   checks key pages. If the check fails, it puts the old site back by itself and says so.
5. **Check live yourself:** open the home page and the pages the change touched.
6. Live keeps the previous version until **finalize**:
   - Something wrong? `wpsync rollback` (a dialog asks the developer to confirm) restores it.
   - All good? `wpsync finalize` (also confirmed in a dialog) deletes the saved copy on the server.
     After that, rollback is no longer possible; `backups/` still has a local copy.

Before publishing, wpsync re-checks that its key still works and that the server has room (about
twice the site's size). If either fails, say what it reported and stop.
