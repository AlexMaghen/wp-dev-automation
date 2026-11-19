/**
 * The wp-dev panel: a pane beside the chat that shows where this folder's wp-dev site stands
 * and offers the next actions as buttons.
 *
 * - Status comes from `wpsync status --json --local`, which contacts nothing; it is read when
 *   the session starts, after every turn, and on Refresh.
 * - Every button that does something hands it to Claude as a prompt ("publish to live"), so the
 *   wp-dev skill runs it with its explanations, Wordfence steps and macOS confirmation dialogs.
 *   The panel itself never runs anything that changes a site.
 * - The pane opens by itself only in a folder that is a wp-dev site (or an empty folder, where
 *   one can be set up); anywhere else, /wp-panel opens it.
 */
import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register } from 'claude-code'

import type { SiteStatus } from '../types'

const PANE = 'wp-dev'
const TITLE = 'wp-dev'

const status = atom({ plugin: 'wp-dev', key: 'status' } as const, null as SiteStatus | null, { shape: 'status-1' })

/** One action: its button, and the words sent to Claude. */
type Action = { key: string; label: string; prompt: string; primary?: boolean }

/** The actions that fit each phase, most likely first. */
const ACTIONS: Record<SiteStatus['phase'], Action[]> = {
  'no-project': [{ key: 'new', label: 'Set up a new site', prompt: 'new wp-dev project', primary: true }],
  'start-gate': [{ key: 'continue', label: 'Continue setup', prompt: 'continue my wp-dev project', primary: true }],
  connect: [{ key: 'continue', label: 'Continue setup', prompt: 'continue my wp-dev project', primary: true }],
  pull: [{ key: 'continue', label: 'Continue setup', prompt: 'continue my wp-dev project', primary: true }],
  work: [
    { key: 'pull', label: 'Pull from live', prompt: 'pull from live' },
    { key: 'publish', label: 'Publish to live', prompt: 'publish to live' },
    { key: 'verify', label: 'Check the local copy', prompt: 'check the local copy works (wpsync verify)' },
    { key: 'archive', label: 'Archive', prompt: 'archive the local copy' },
  ],
  'publish-pending': [
    { key: 'finalize', label: 'Finalize (keep it)', prompt: 'finalize the publish', primary: true },
    { key: 'rollback', label: 'Roll back', prompt: 'roll back the publish' },
  ],
  archived: [
    { key: 'unarchive', label: 'Unarchive', prompt: 'unarchive my wp-dev project', primary: true },
    { key: 'delete', label: 'Delete local copy', prompt: 'delete the local copy' },
  ],
}

/** What each phase means, in plain words. */
const PHASE_TEXT: Record<SiteStatus['phase'], string> = {
  'no-project': 'This folder is not a wp-dev site.',
  'start-gate': 'Setup has started.',
  connect: 'Setup: wpsync needs to connect to the live site.',
  pull: 'Setup: the site has not been copied yet.',
  work: 'Ready to work on the local copy.',
  'publish-pending': 'Published. Check the live site, then keep it or roll back.',
  archived: 'Archived: the database is saved in the folder, and DDEV is deleted.',
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const result = await next(e)
    // Not /wp-dev: that name is the wp-dev skill's own shortcut.
    await $.command.register({ name: 'wp-panel', description: 'Open the wp-dev panel: where this site stands, and what to do next' }).catch(() => undefined)
    const now = await refresh($)
    const isEmpty = await folderIsEmpty($)
    if (now.phase !== 'no-project' || isEmpty) void $.ui.open({ id: PANE, title: TITLE })
    return result
  })

  on('command.run', { command: 'wp-panel' }, async $ => {
    await refresh($)
    await $.ui.open({ id: PANE, title: TITLE })
    return { text: 'The wp-dev panel is open.' }
  })

  on('turn.complete', async ($, e, next) => {
    const result = await next(e)
    void refresh($)
    return result
  })

  on('ui.render', { component: 'Pane', requestId: PANE }, async ($, e) => {
    const { Box, Text, Button, Link } = $.ui.resolve(e)
    const now = await read($, status)

    if (!now) {
      return <Text dimColor>Checking this folder…</Text>
    }

    const site = now.homeUrl ? new URL(now.homeUrl).host : undefined
    const actions = ACTIONS[now.phase]

    return (
      <Box flexDirection="column" gap={1}>
        <Box flexDirection="column">
          <Text bold>{site ?? 'No site here yet'}</Text>
          <Text>{PHASE_TEXT[now.phase]}</Text>
          {now.error && now.phase === 'no-project' && <Text dimColor>wpsync: {now.error}</Text>}
        </Box>

        {now.homeUrl && (
          <Box flexDirection="column">
            <Text>
              Live: <Link href={now.homeUrl} label={now.homeUrl} />
            </Text>
            {now.localUrl && now.phase !== 'archived' && (
              <Text>
                Local: <Link href={now.localUrl} label={now.localUrl} />
                <Text dimColor>{now.ddevRunning ? ' (running)' : ' (stopped)'}</Text>
              </Text>
            )}
            {now.lastPull && <Text dimColor>Last pull: {formatDate(now.lastPull)}</Text>}
            {now.lastPush && (
              <Text dimColor>
                Last publish: {formatDate(now.lastPush.at)}
                {now.lastPush.finalized ? '' : ' (not finalized)'}
              </Text>
            )}
            {now.archivedAt && <Text dimColor>Archived: {formatDate(now.archivedAt)}</Text>}
          </Box>
        )}

        <Box flexDirection="column" gap={1}>
          {now.phase === 'work' && (
            <Button
              key="change"
              label="Make a change"
              variant="primary"
              onPress={() => void $.prompt.fill({ text: 'Change the site: ' })}
            />
          )}
          {actions.map(action => (
            <Button
              key={action.key}
              label={action.label}
              variant={action.primary ? 'primary' : undefined}
              onPress={() => void $.prompt.submit({ text: action.prompt, asUser: true })}
            />
          ))}
        </Box>

        <Box gap={1}>
          <Button key="status" label="Where does it stand?" onPress={() => void $.prompt.submit({ text: 'where does my wp-dev project stand?', asUser: true })} />
          <Button key="refresh" label="Refresh" onPress={() => void refresh($)} />
        </Box>
        <Text dimColor>Buttons ask Claude to do it. Publishing and deleting still ask you to confirm in a dialog.</Text>
      </Box>
    )
  })
}

/** Reads the folder's status (contacts nothing) into the panel's state. */
async function refresh($: EngineInterface): Promise<SiteStatus> {
  const env = await $.process.hookEnv()
  const wpsync = `${env.CLAUDE_PLUGIN_ROOT}/bin/wpsync`
  const checkedAt = await $.clock.now()
  let next: SiteStatus
  try {
    const run = await $.process.run([wpsync, 'status', '--json', '--local'], { timeoutMs: 20_000 })
    next = run.exitCode === 0
      ? { ...(JSON.parse(run.stdout) as Omit<SiteStatus, 'checkedAt'>), checkedAt }
      : { phase: 'no-project', dir: await $.session.cwd(), checkedAt, error: (run.stderr || run.stdout).trim().split('\n').pop() }
  } catch (error) {
    next = { phase: 'no-project', dir: await $.session.cwd(), checkedAt, error: String(error) }
  }
  await update($, status, () => next)
  return next
}

/** Is the session's folder empty (a new site's folder)? .DS_Store and .claude don't count. */
async function folderIsEmpty($: EngineInterface): Promise<boolean> {
  const run = await $.process.run(['ls', '-A'], { timeoutMs: 5_000 }).catch(() => null)
  if (!run || run.exitCode !== 0) return false
  return run.stdout.split('\n').filter(name => name && name !== '.DS_Store' && name !== '.claude').length === 0
}

/** "Nov 18, 2026, 4:40 PM", in the Mac's own time zone. */
function formatDate(iso: string): string {
  const date = new Date(iso)
  return Number.isNaN(date.getTime()) ? iso : date.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })
}
