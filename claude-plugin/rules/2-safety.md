<!--
  PURPOSE: Instructions to Claude about what it must never do, or never do without asking,
  while working on a wpsync site project.
  USED BY: copied into each site project's CLAUDE.md with the other rules (see
  1-wordpress-editing.md); the "publish" skill repeats the publishing part.
  EDIT HERE, not in a site's CLAUDE.md.
-->
## Safety rules

- **Nothing touches the live site without the developer's yes for that specific action.** That covers `wpsync push`, `wpsync rollback` and `wpsync finalize`. `wpsync pull` only reads the live site and needs no extra yes.
- **Publishing replaces the whole live site** (database and files) with the local copy. Anything people changed on live since the last pull is lost unless it was pulled first. Always run `wpsync push --dry-run` and show the developer its summary before a real push.
- **Never handle a site password.** `wpsync connect` asks for it in its own macOS dialog. Never ask the developer to type a password into the chat, never put one in a command, a file or a commit.
- **Never put secrets in git or in chat:** passwords, Application Passwords, license keys, or anything from `backups/` (database dumps hold users' emails and password hashes).
- **Never edit WordPress core** (`wp/wp-admin/`, `wp/wp-includes/`, the PHP files in `wp/`), parent themes, or third-party plugins. Never edit `wp/wp-config.php` beyond what DDEV writes: it doesn't go live.
- **Always use `ddev wp …`** for WP-CLI, never a bare `wp`: WordPress runs inside DDEV.
- **Do one task at a time.** Don't refactor code you weren't asked about.
- **Git:** commit the code you change (child theme, custom plugins) with clear messages. If the site's own code isn't tracked yet, add its folder to `.gitignore`'s allow-list (the comment at the top shows how) before changing it, so `wpsync pull` can protect it.
