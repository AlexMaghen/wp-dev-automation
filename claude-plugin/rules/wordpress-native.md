<!--
  PURPOSE: Instructions to Claude for every change it makes to a WordPress site: keep the site
  a normal WordPress site that people who don't code can run from wp-admin.
  USED BY: wpsync copies this file into each site project's CLAUDE.md (between the
  wpsync:rules markers); `wpsync update-rules` refreshes it there. The "work" skill also reads it.
  EDIT HERE, not in a site's CLAUDE.md: edits there are replaced on the next update-rules.
-->
## Keep it a WordPress site

**Every change should leave the site fully manageable in standard WordPress Admin** by someone who doesn't code. Build with WordPress's own tools first. Write PHP only when those tools truly can't do the job.

Before building anything, go down this list and use the first option that works:

1. **Content in wp-admin:** a Page, a Post, a menu item, a widget, a category, or a Reusable Block / Pattern. For example, a new section of the site is Pages with a menu entry, not a custom template.
2. **The block editor and the theme's own options:** core blocks, block patterns, the Site Editor or Customizer, and the theme's options panel.
3. **A plugin that's already installed and active** on this site. Check the site's plugin list first.
4. **A new, well-known, maintained plugin**, named to the developer and approved before installing. Check its last update date, active installs, and support for the site's PHP version.
5. **Child theme changes:** CSS in a child theme, or a template override copied from the parent theme into the child theme. Never edit a parent theme or any third-party plugin: their updates wipe out the changes. If the site has no child theme and one is needed, propose creating it first.
6. **Custom PHP, last:** only when 1–5 can't do it. Put it in a small custom plugin named after the site and the feature (for example `<site>-<feature>`), prefix every function, class, option and hook with the same prefix, and keep the theme for looks only. Anything an editor might want to change (text, links, numbers, on/off) goes in a settings field, a block, or post meta that shows in wp-admin, never hard-coded.

Also:

- No hard-coded page content, URLs or menu items in templates. Editors must be able to change them in wp-admin.
- When a change needs content on the live site (a new page or menu entry), remember that publishing replaces the whole live site with this local copy: make the content here, in the local wp-admin, so it goes live with the code.
- If a request can only be met by moving away from WordPress's way of doing things, say so and explain the trade-off before building it.
