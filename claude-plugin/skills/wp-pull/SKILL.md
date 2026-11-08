---
name: wp-pull
description: Refresh a local wpsync copy of a WordPress site from the live site. Use when the developer asks to pull, refresh, sync from live, or get the latest content, and before starting new work on a site that hasn't been pulled recently.
---

<!--
  PURPOSE: Instructions to Claude for refreshing a site project from live with `wpsync pull`,
  and for handling code that changed on both sides.
-->

# Refresh the local copy from live

Run wpsync as `${CLAUDE_PLUGIN_ROOT}/bin/wpsync`, inside the site's folder (it has
`.wpsync.json`; the live address is its `homeUrl`).

```
wpsync pull <homeUrl> --dir .
```

**Wordfence first:** if `wpsync status --json` shows `"wordfence": "back-on"`, or the pull stops
saying Wordfence switched Application Passwords off, follow `${CLAUDE_PLUGIN_ROOT}/skills/wp-dev/wordfence.md` ("Before"), then pull.
After the pull, follow its "When wpsync is done" part to have it switched back on.

A pull only reads the live site. Locally it **replaces the database** with live's and brings
files in line with live's, so local content changes made since the last pull are lost. If the
developer has been making content in the local wp-admin, ask before pulling.

**Code in git is protected.** If someone changed a git-tracked file on the live site too, the
pull stops with a list of those files and changes nothing. Then:

1. Show the developer what differs. To see live's version of a file without changing anything,
   compare it in the live site's theme or plugin editor, or ask them.
2. Let them choose: keep theirs (publish later and it goes live), or take live's with
   `wpsync pull <homeUrl> --dir . --overwrite-code` and commit the result.

After a pull, report what changed (the summary wpsync prints), and any notes it gave, such as
the live server's PHP or database version having changed.
