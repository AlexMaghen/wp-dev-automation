<!--
  PURPOSE: Instructions to Claude on when a change to a WordPress site counts as finished.
  USED BY: copied into each site project's CLAUDE.md with the other rules (see
  wordpress-native.md).
  EDIT HERE, not in a site's CLAUDE.md.
-->
## A change is done when

1. It's built locally and, where possible, uses the WordPress-native options above.
2. The affected pages load on the local site with no PHP errors or notices (`ddev logs` is clean), and look right in a browser, checked at desktop and phone widths.
3. Editors can still change it in wp-admin: anything they'd want to edit is editable there.
4. Code changes are committed with a message describing the change.
5. The developer has seen it working locally. Publishing is a separate step, done only when the developer asks.
