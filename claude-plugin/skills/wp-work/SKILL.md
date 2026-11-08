---
name: wp-work
description: Make a change or addition to a WordPress site in a wpsync site project while keeping it a normal, wp-admin-editable WordPress site. Use for any request to change, add to, fix or restyle a site in a folder that has .wpsync.json.
---

<!--
  PURPOSE: Instructions to Claude for building changes on a wpsync site project the WordPress
  way. The rules themselves live in claude-plugin/rules/ and are also in the site's CLAUDE.md.
-->

# Work on the site, the WordPress way

1. **Read the rules**, above all the **WordPress editing rules**, in the site's `CLAUDE.md` (the
   block between the `wpsync:rules` markers). If it's missing or looks out of date, run
   `${CLAUDE_PLUGIN_ROOT}/bin/wpsync update-rules`. The source is
   `${CLAUDE_PLUGIN_ROOT}/rules/1-wordpress-editing.md` (and the other files beside it).
2. **Start from what's live.** If `.wpsync.json`'s `lastPull` is more than a day old, offer to
   pull first (the `wp-pull` skill).
3. **Make sure DDEV is up:** `ddev start`.
4. **Choose the most WordPress-native way** to do what was asked, in the order the rules give:
   content and settings in wp-admin first, custom PHP last. Content (including the home page)
   goes in Pages and other wp-admin content, never in the theme. If code is the only way to get
   the effect, tell the developer what you're writing and why, then go ahead. Content changes are made in the
   local wp-admin (or with `ddev wp`), so they go live with the code when the site is
   published.
5. **Track the code you change.** Before editing a child theme or a custom plugin, make sure
   `.gitignore` lets git track its folder (the comment at the top shows how), and commit.
6. **Check it** as the definition of done says: the pages load with clean `ddev logs`, look
   right at desktop and phone widths, and editors can still change it in wp-admin.
7. **Report** what you changed and how an editor would maintain it in wp-admin. Publishing is a
   separate step that only happens when the developer asks (the `wp-publish` skill).
