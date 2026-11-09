---
name: wp-connect
description: Connect wpsync to a live WordPress site, so it can copy and publish it. Use during wp-dev setup, or when wpsync says it isn't connected or its key stopped working.
---

<!--
  PURPOSE: Instructions to Claude for `wpsync connect`: the macOS sign-in dialog, the
  Application Password fallback for sites whose login is protected, and each failure.
-->

# Connect wpsync to the live site

Run wpsync as `${CLAUDE_PLUGIN_ROOT}/bin/wpsync`. Ask and wait the way
`${CLAUDE_PLUGIN_ROOT}/skills/wp-dev/guiding.md` says.

```
wpsync connect <site-url>
```

A macOS dialog asks for a WordPress **administrator's** username and password. Tell the developer
to type them **there, never in the chat**. wpsync uses the password once: it creates its own
revocable key (an Application Password named "wpsync <Mac> <date>", kept in the macOS
Keychain), installs its bridge plugin (switched off between runs), and logs out. Never put a
password in a command or a file.

Say before running it that a dialog is coming, asking for the username and password in one go.
It comes to the front with the cursor in it.

## When Wordfence blocks it

If connect says Application Passwords are "switched off, most likely by Wordfence", follow
`${CLAUDE_PLUGIN_ROOT}/skills/wp-dev/wordfence.md`: the developer switches one setting off, you wait until it's saved, check with
`wpsync doctor <site-url>`, then connect again.

## When the login is protected (two-factor, CAPTCHA, security plugins)

wpsync says the login was blocked. Explain that wpsync can't get past that protection, but the
developer can make the key for it themselves. Then:

1. The developer signs in to the live wp-admin in their browser, goes to **Users → Profile →
   Application Passwords**, adds one named `wpsync`, and copies it. Give these steps as a
   numbered list, then **ask** "Have you copied the new Application Password for <domain>?":
   **Copied it** (Recommended), or **Can't find that section** (then it's most likely switched
   off by a security plugin: run `wpsync doctor <site-url>` and go by what it says). Tell them
   not to paste it in the chat: the next dialog asks for it.
2. `wpsync connect <site-url> --application-password`: a dialog asks for the username and that
   Application Password.
3. If the bridge isn't on the site yet, wpsync saves `wpsync-bridge.zip` to the Downloads folder
   and says so: the developer uploads it once under **Plugins → Add New → Upload Plugin** (and
   doesn't activate it). Wait with the "Done, check it" dialog, then run the same connect
   command again.

## Other failures

| wpsync says | What it means |
| --- | --- |
| WordPress refused the login | Wrong username or password. **Ask**: **Try again** (Recommended), or **Use an Application Password instead** (the route above). |
| isn't an administrator | Use an administrator account. |
| doesn't offer Application Passwords | The site isn't on HTTPS, or a security plugin turned them off. Most often Wordfence: see `${CLAUDE_PLUGIN_ROOT}/skills/wp-dev/wordfence.md`. |
| drops the Authorization header | A hosting setting: ask the host to pass the Authorization header to PHP. |
| doesn't allow uploading plugins | The host forbids plugin installs; wpsync can't work there. |

Afterwards, `wpsync doctor <site-url>` confirms everything works.
