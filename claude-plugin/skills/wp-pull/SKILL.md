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
`.wpsync.json`; the live address is its `homeUrl`). Ask, wait and report the way
`${CLAUDE_PLUGIN_ROOT}/skills/wp-dev/guiding.md` says.

```
wpsync pull <homeUrl> --dir .
```

**Wordfence first:** if `wpsync status --json` shows `"wordfence": "back-on"`, or the pull stops
saying Wordfence switched Application Passwords off, follow `${CLAUDE_PLUGIN_ROOT}/skills/wp-dev/wordfence.md` ("Before"), then pull.
After the pull, follow its "When wpsync is done" part to have it switched back on.

A pull only reads the live site. Locally it **replaces the database** with live's and brings
files in line with live's, so local content changes made since the last pull are lost. Unless
this is the first pull, **ask** "Refresh the local copy of <domain> from live? This replaces
local content (pages, posts, settings) with live's; committed code is kept.": **Refresh from
live** (Recommended when no content was made locally), or **Not now**. If you know content was
made in the local wp-admin since the last pull, name it in the question and put **Not now** first.

A pull of a big site can take a while: run it as a long job (`guiding.md`).

**Code in git is protected.** If someone changed a git-tracked file on the live site too, the
pull stops with a list of those files and changes nothing. Then:

1. Show the developer what differs. To see live's version of a file without changing anything,
   compare it in the live site's theme or plugin editor, or ask them.
2. **Ask**, naming the files: "These files changed both here and on live <domain>. Which
   version should we keep?": **Keep mine** (the pull goes ahead without them; publishing later
   puts mine on live), or **Take live's** (`wpsync pull <homeUrl> --dir . --overwrite-code`,
   then commit the result; my local changes to those files are lost). Put first whichever looks
   right from the comparison, marked (Recommended).

After a pull, report what changed (the summary wpsync prints), and any notes it gave, such as
the live server's PHP or database version having changed.
