# wp-dev-automation

Pull a live WordPress site into local DDEV, work on it, publish it back to replace live,
with only a WordPress admin login (no hosting access, no paid migration plugin).

**Status: design drafted 2026-11-08 in `docs/design.md` (read it first). Next: build, in the order in its section 13.**

Planned layout (Turborepo, per the owner's global rules):

- `apps/wpsync` — CLI in TypeScript, compiled with Bun. One-time connect (password typed into a
  native macOS dialog, never seen by Claude) creates an Application Password kept in the macOS
  Keychain and uploads the bridge plugin; later runs activate the bridge, pull or push, deactivate it.
- `packages/protocol` — the bridge's REST contract (TypeScript + zod) plus test cases the PHP side must pass.
- `packages/bridge-plugin` — temporary WordPress plugin (PHP): site info, chunked DB export,
  file transfer, staged import with table swap, rollback. Inactive between runs, with a
  2-hour self-deactivation deadline.
- `packages/site-template` — what each site project gets: DDEV config, .gitignore, CLAUDE.md template.
- `claude-plugin/` — Claude Code plugin (skills + WordPress-native rules as plain text files),
  installable from this private repo via `.claude-plugin/marketplace.json`.

Site projects live outside this repo, e.g. `~/AxDevProj/wp-sites/<domain>/`.

Rule departures the owner accepted: the bridge plugin is PHP (WordPress requires it); DDEV stands
in for the usual web stack. Test against a scratch site on the owner's Lightsail/CloudPanel server
before any real site.

GitHub: private repo `AlexMaghen/wp-dev-automation` on the owner's personal account. The `gh` CLI's
active account is AlexMaghen-Tenant, so push with the personal token per command:
`GH_TOKEN=$(gh auth token -u AlexMaghen) git -c credential.helper= -c 'credential.helper=!gh auth git-credential' push`
