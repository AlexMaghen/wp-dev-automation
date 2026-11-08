---
name: publish
description: Publish a local wpsync copy of a WordPress site to the live site, replacing it; roll back or finalize afterwards. Use only when the developer asks to publish, push, deploy, go live, roll back or finalize.
---

<!--
  PURPOSE: Instructions to Claude for publishing a site project with `wpsync push`, which
  replaces the live site, and for the rollback/finalize steps after it. Every live-changing
  step needs the developer's explicit yes.
-->

# Publish to the live site

Run wpsync as `${CLAUDE_PLUGIN_ROOT}/bin/wpsync`, inside the site's folder.

**Publishing replaces the whole live site** (database and files) with the local copy. Live's
`wp-config.php`, `.htaccess` and host-added files are kept. Edits people made on live since the
last pull are lost.

1. **Commit first.** wpsync refuses to publish uncommitted code.
2. **Dry run:** `wpsync push --dry-run`. Show the developer its summary: database size, files
   changed and deleted, plugins added or removed, and **any live changes since the last pull**
   (posts, pages, comments, orders). If there are live changes, ask whether to pull first, and
   remind them that pulling replaces local content.
3. **Ask for a clear yes**, naming the live site. Don't take an earlier yes as covering this
   push.
4. **Publish:** `wpsync push --confirm <live domain>`. It backs up live to `backups/` first,
   uploads in pieces, swaps everything in, then checks key pages. If the check fails it rolls
   back on its own and says so.
5. **Check live yourself:** open the home page and the pages the change touched.
6. Live keeps the previous version until **finalize**:
   - Something wrong? `wpsync rollback` restores it (ask first).
   - All good? Once the developer confirms, `wpsync finalize` deletes the saved copy on the
     server (ask first; after this, rollback is no longer possible, though `backups/` keeps a
     local copy).
