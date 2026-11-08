# wp-dev-automation

Pull a live WordPress site into local DDEV, work on it, publish it back to replace live,
with only a WordPress admin login (no hosting access, no paid migration plugin).

**Status: project created 2026-11-08. Next: write `docs/design.md`, then build.**

Planned layout (Turborepo, per the owner's global rules):

- `apps/wpsync` — CLI in TypeScript, compiled with Bun. Connects with an Application Password
  (stored in the macOS Keychain), installs the temporary bridge plugin, pulls and pushes, removes it.
- `packages/protocol` — the bridge's REST contract (TypeScript + zod) plus test cases the PHP side must pass.
- `packages/bridge-plugin` — temporary WordPress plugin (PHP): site info, chunked DB export,
  file transfer, staged import with table swap, rollback. Deleted after every run.
- `packages/site-template` — what each site project gets: DDEV config, .gitignore, CLAUDE.md template.
- `claude-plugin/` — Claude Code plugin (skills + WordPress-native rules as plain text files),
  installable from this private repo via `.claude-plugin/marketplace.json`.

Site projects live outside this repo, e.g. `~/AxDevProj/wp-sites/<domain>/`.

Rule departures the owner accepted: the bridge plugin is PHP (WordPress requires it); DDEV stands
in for the usual web stack. Test against a scratch site on the owner's Lightsail/CloudPanel server
before any real site.
