<!--
  PURPOSE: Instructions to Claude on HOW to show the wp-dev flow to the developer: a progress
  checklist, question dialogs for every decision and every "tell me when you're done", Terminal
  tabs for steps that need their password, the browser for looking at the site, and plain-text
  fallbacks where the app doesn't offer these. WHAT to do at each step is in the skills
  (wp-dev, wp-connect, wp-pull, wp-work, wp-publish); they point here.
-->

# Guiding the developer through wp-dev

The developer has probably never done this before. Make it easy to see **where they are**, **what
happens next**, and **when it's their turn**.

## The tools, and what to use when none is there

| Use | For | If the app doesn't offer it |
| --- | --- | --- |
| **Progress checklist** (the app's task list) | Each phase's steps, ticked off as they finish | A short "Step 3 of 8: check the site" line at the start of each step |
| **Question dialog** (`AskUserQuestion`) | Every decision, and every wait for the developer | The same question in the chat, with the choices as a numbered list |
| **Terminal tab** | Commands that need their password, so they type it there | Give the command in a `bash` block for them to run in Terminal |
| **Browser** | Showing the local site, and live next to it | Give both addresses to open |
| **Chapters** | One per phase: "Setup", "Working on the site", "Publishing" | Skip |
| **Notification** | A long pull or publish finishing while they may be away | Skip |

**Never** use a dialog, button or checklist as a safety check. Publishing, rollback and finalize
still go through wpsync's own macOS dialog, where the developer types the live domain. Only a
person can answer that dialog. A question-dialog answer is the developer's "yes" in the chat;
the macOS dialog is the final check.

## Progress checklist

Start the checklist at the beginning of a phase with every step in it, so the developer sees
the whole road at once. Keep exactly one step in progress. When you resume ("continue my wp-dev
project"), show the full list again, with the finished steps already ticked.

**Setup** (wp-dev skill, phase 1):

1. Name the live site
2. Check this Mac and install what's missing
3. Check the live site
4. Connect to the live site
5. Copy the live site to this Mac
6. Make the copy safe to run
7. Check the copy works
8. Hand over

**Publishing** (wp-publish skill):

1. Check everything is committed
2. Dry run: what will change on live
3. Developer says yes
4. Publish (developer confirms in the macOS dialog)
5. Check the live site
6. Keep it (finalize) or undo it (rollback)

If Wordfence must be switched off, add "Switch Wordfence's setting off" before the first step
that contacts the site and "Switch Wordfence's setting back on" at the end.

## Question dialogs

Use one for **every** choice and every wait, so it's always clear when the developer is up.

- **One decision per question.** Up to four questions in one dialog only when they're
  independent (for example the folder and the permission mode).
- **Each question stands on its own.** The developer may see only the dialog, so name the site,
  the folder or the files in the question itself.
- **Put the recommended choice first**, with "(Recommended)" at the end of its label.
- **Labels are short** (1–5 words). Say what each choice does in its description, including what
  can't be undone.
- **Typed answers:** the dialog always offers "Other" for typing, so a folder or a name can come
  through it. Ask for the site address in the chat instead: it's free text with no choices.
- **Never ask for a password, key or code** in a dialog or in the chat.

### Waiting for the developer

Whenever they have to do something outside the chat (install Homebrew, click through Docker's
first launch, change a wp-admin setting, upload the bridge), give the steps as a numbered list,
then ask:

- **Done, check it** — "I've done it. Check that it worked."
- **I'm stuck** — "Something didn't match the steps."

On "Done, check it", run the check the skill names (usually `wpsync doctor`), and say what you
found. On "I'm stuck", ask what they see, and help from there. Don't run anything against the
site while you wait.

### When a check needs someone else

Some problems need the site's host or whoever manages its security plugin. Say who to ask and
what to ask for, then:

- **It's fixed, check again**
- **Stop for now** — "Leave everything as it is. I'll come back with 'continue my wp-dev project'."

## Showing check results

Show `wpsync doctor` and `wpsync verify` results as a table: **Check**, **Result** (OK, FIX or
NOTE, as words), **What to do**. Put FIX rows first. Then one sentence: how many need fixing
and who fixes each.

Don't use symbol characters as status icons (no check marks, crosses or warning signs): they
look different on every device. Use the words.

## Terminal tabs for password steps

For a command that asks for the Mac's password (Homebrew's installer, `mkcert -install`), open a
Terminal tab with the command typed in, so the developer only presses Return and types their
password. Say first that it will ask for their **Mac's** password, and that you can't see it.
Then wait with the "Done, check it" dialog.

## The browser

- **After setup:** open the local site, and the live home page in a second tab, so the
  developer can compare.
- **During work:** after each change, open the page it affected.
- **After publishing:** open the live pages the change touched.

Open the browser yourself to check; tell the developer which tab to look at.

**Use Chrome (Claude in Chrome) for the local site.** The app's built-in browser pane blocks a
`*.ddev.site` page's styles, scripts and images (`ERR_BLOCKED_BY_CLIENT` in its network log), so
the copy looks unstyled there even when it's perfect. Never take that look as a broken copy.
The built-in pane is fine for the live site. Chrome also needs `mkcert -install` to have run
(setup step 2), or it refuses the local https address.

## Long jobs (pull, publish, rollback)

A first pull or a publish can take many minutes, and the developer can't tell from the chat
whether it's working, slow or stuck. Nothing can lock the chat, so make it plain:

1. **Before starting, say it in one message:** what's starting, roughly how long it will take,
   that they don't need to do anything, that the Mac should stay awake with this window open,
   and that you'll say when it's done. For example:

   > Copying wp-dev-automation.maghen.com to this Mac now: about 250 MB, so probably 5 to 10
   > minutes. You don't need to do anything. You can watch it live in the terminal tab I'm
   > opening; I'll also post a short update here about once a minute and tell you when it's
   > done. Please keep the Mac awake and this window open.

   The size comes from `wpsync doctor <site-url>` ("site is about …"). Allow about a minute per
   50 MB on a home connection, and say it's a rough guess.
2. **Mark it in the checklist:** the step in progress with its estimate, for example "Copy the
   live site to this Mac (about 10 minutes)". If the app can keep the Mac awake (a keep-awake
   tool), ask for it for the duration.
3. **Run it where the developer can watch it.** Start the command in a **terminal tab** of the
   app (the terminal tool that runs a command in a tab they can see), and link that tab in the
   chat. wpsync prints a `progress:` line **every 10 seconds**, including while DDEV starts and
   loads the database on this Mac ("loading the database into DDEV · 1m 20s (Importing…)"), so
   the tab never sits silent. Then **stay with the job:** read the tab's output every minute or
   so (the tool that reads a terminal tab), so the session keeps working until it finishes
   instead of going idle. Don't start other work in the meantime. Only if the app has no
   terminal tab: run it in the background and watch its output instead.
4. **Pass on progress, not noise.** About once a minute, one line in the chat with the latest
   numbers: "Database done (48 tables); files: 1,240 of 8,400 (310 MB)", or "Loading the
   database into DDEV, 2 minutes so far." The tab has the 10-second detail.
5. **Stalls.** wpsync prints `stalled:` when no data has arrived for a minute. Tell the developer
   at once, in plain words ("It's stopped receiving data for a minute; I'm checking why"), then
   investigate: is the site answering, is the Mac online, is the size still changing. Never let
   a stall pass in silence: that's how a broken step looks like a slow one.
6. **When it finishes:** wpsync posts a macOS notification ("wpsync: pull finished" or "… failed"),
   so they see it even in another app. Then tick the step and give the result in one or two
   lines. If they asked something in the chat meanwhile, answer it now.

If the developer asks whether it's still working, check the job's latest output before
answering, and give the numbers.
