#!/usr/bin/env bash
# Compiles wpsync into single programs in dist/, with the bridge plugin inside:
#
#   wpsync-macos-arm64   Macs with Apple silicon
#   wpsync-macos-x64     Intel Macs
#
# Nothing needs installing to run them, not even Bun. Run `pnpm generate` first if the bridge
# changed.
set -euo pipefail

APP="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BUN="$APP/node_modules/.bin/bun"

rm -rf "$APP/dist"
for target in darwin-arm64:macos-arm64 darwin-x64:macos-x64; do
  "$BUN" build "$APP/src/main.ts" --compile --minify --target="bun-${target%%:*}" \
    --outfile "$APP/dist/wpsync-${target#*:}" >/dev/null
done
ls -lh "$APP/dist" | awk 'NR>1 {print $5, $9}'
