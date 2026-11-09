<!--
  PURPOSE: Instructions to Claude for sites where Wordfence blocks wpsync. Wordfence's option
  "Disable WordPress application passwords" is on by default, and wpsync signs in with an
  Application Password, so the developer switches it off while wpsync works on the site and
  back on afterwards. Only the developer can do either (in wp-admin); Claude guides, waits, and
  checks. Used by the wp-dev, wp-connect, wp-pull and wp-publish skills.
-->

# When Wordfence blocks wpsync

## How you'll know

- `wpsync doctor <site-url>` reports **Application Passwords: turned off, most likely by
  Wordfence**, or
- a wpsync command stops with "Application Passwords switched off, most likely by Wordfence", or
- `wpsync status --json` shows `"wordfence": "back-on"` when a pull or publish is next.

wpsync prints the exact steps each time, with a link that opens the right page. Use those
steps; `wpsync status --json` also has them in `wordfenceSteps`.

## Before wpsync works on the site: switch it off

1. **Send this message, word for word.** Don't paraphrase it, shorten it, or fold it into a
   longer sentence: the developer has to find one box on a long page. Only the part in
   {braces} changes: what you'll do once it's saved (for example "recheck the other two
   site-check failures", or "carry on with the pull"). If this Mac isn't fully set up yet, drop
   the opening "This Mac is set up, but".

   > This Mac is set up, but Wordfence is blocking the application-password sign-in that wpsync
   > needs. In the live site's Wordfence plugin in admin, go to Wordfence->Firewall, click "All
   > Firewall Options", and under the Brute Force Protection section uncheck "Disable WordPress
   > application passwords" and save, and I'll {next step} afterward.

2. After the message, on its own line, give the direct link wpsync printed (the first line of
   its steps) as a shortcut to the same box. Add that it only needs to stay off while wpsync
   copies or publishes the site, and that you'll remind them to switch it back on.
3. **Ask them to tell you when they've saved it, then wait.** Run nothing against the site in
   the meantime.
4. **Check:** run `wpsync doctor <site-url>`. Application Passwords should now say "available".
   If not, say what you see, and ask them to look again: the box must be **unticked**, and saved.
5. Carry on with what you were doing.

## When wpsync is done: switch it back on

**When:** right after the last wpsync step that needs the site in this sitting:
- after setup's hand-over (step 8 of the wp-dev skill);
- after a pull the developer asked for;
- after `wpsync finalize` or `wpsync rollback`.

While a publish is waiting for finalize or rollback, the setting must stay off, because both
need it. Say so, and remind them once that publish is settled.

1. Run `wpsync status --json`. If `wordfence` is `"switched-off"`, it's time.
2. **Send this message, word for word**, as above:

   > wpsync is done with the live site for now, so please switch Wordfence's protection back
   > on. In the live site's Wordfence plugin in admin, go to Wordfence->Firewall, click "All
   > Firewall Options", and under the Brute Force Protection section check "Disable WordPress
   > application passwords" again and save, and I'll confirm it's back on.

   Then the direct link on its own line, as above.
3. **Ask them to tell you when it's saved, then wait.**
4. **Check:** `wpsync status --json` should now show `"wordfence": "back-on"`. If it still says
   `"switched-off"`, it isn't saved yet: say so and repeat the steps.
5. Confirm it's done, and that local work doesn't need it. You'll ask for it to be switched off
   again before the next pull or publish.

If the developer ends the session while it's still off, remind them once more before they go.

## Never

- Never ask for their password or try to change the setting yourself.
- Never leave the setting off without telling them, and never skip the switch-back reminder.
