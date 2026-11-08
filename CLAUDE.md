# wp-dev-automation

Pull a live WordPress site into local DDEV, work on it, publish it back to replace live,
with only a WordPress admin login (no hosting access, no paid migration plugin).

**Status: design in `docs/design.md` (read it first). Build steps 1–3 of its section 13 are done
(2026-11-08): protocol + bridge `info`, `wpsync connect`, and `wpsync pull`. Next: step 4.**
Not built yet from step 2: the fallback for sites whose login is blocked (two-factor, CAPTCHA),
where the developer pastes an Application Password they made themselves.

- `packages/protocol` is the single source of truth. Change it there, run `pnpm generate`
  (writes the bridge's `includes/protocol.php` and `json-schema/`), then update the PHP until
  `pnpm test:contract` passes.
- `pnpm test` runs unit tests; `pnpm test:contract` (needs Docker and DDEV) runs the bridge
  and the CLI against `wpsync-harness`, a throwaway DDEV WordPress site in
  `packages/test-harness/site/` (helpers in `packages/test-harness/src`). Stop it with
  `pnpm --filter @wp-dev-automation/test-harness stop`.
- After changing the bridge's PHP, run `pnpm generate`: it also re-embeds the bridge files into
  `apps/wpsync/src/generated/bridge-files.ts`, which the CLI zips and uploads.
- Run the CLI with `apps/wpsync/node_modules/.bin/bun apps/wpsync/src/main.ts`; `pnpm --filter
  wpsync build` compiles standalone binaries into `apps/wpsync/dist/`.
- Claude never handles a site password: `wpsync connect` takes it through a macOS dialog the
  person types into. Contract tests pass harness-generated throwaway passwords in code instead.
- `pnpm --filter @wp-dev-automation/bridge-plugin test` checks the PHP without DDEV: the path
  rules against `packages/protocol/test-vectors/paths.json`, and that every `WPSYNC_*` constant
  used is defined (a missing one only fails at runtime, and takes the site's REST API down
  while the bridge is on).
- Each contract-test file sets up the harness state it needs in its own `beforeAll`; vitest runs
  files slowest first, so never rely on another file having run.
- DDEV here uses Mutagen: files written on the Mac reach the container only after
  `ddev mutagen sync` (`Project.syncFiles()` / `syncFiles()` in the harness).
- The bridge targets PHP 7.4+: no PHP 8-only syntax (match, union types, nullsafe, named args).

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
