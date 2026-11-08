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

| Use | For | Without it (for example in a terminal session) |
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

1. Choose the site and its folder
2. Start a session in that folder
3. Check this Mac and install what's missing
4. Check the live site
5. Connect to the live site
6. Copy the live site to this Mac
7. Make the copy safe to run
8. Check the copy works
9. Hand over

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

## Long jobs

A first pull or a publish of a big site can take many minutes. Run it in the background, report
progress from its output every few minutes in one line ("database done; 1,240 of 8,400 files"),
and send a notification when it finishes, in case they stepped away.
