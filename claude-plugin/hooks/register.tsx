/**
 * The wp-dev panel: a pane beside the chat that shows where this folder's wp-dev site stands
 * and offers the next actions as buttons. /wp-dev (the wp-dev skill's command) opens it from any
 * folder, and the skill then checks this Mac and takes it from there.
 *
 * - Everything shown comes from wpsync, which contacts nothing for it:
 *   `wpsync status --json --local` (this folder; read when the session starts, after every
 *   turn and every 20 seconds, so it follows the session into a site's folder),
 *   `wpsync doctor --local --json` (this Mac's prerequisites) and `wpsync sites --json` (the
 *   local copies on this Mac), both read when the panel opens and on Refresh.
 * - Every button that does something hands it to Claude as a prompt ("publish to live"), so the
 *   wp-dev skill runs it with its explanations, Wordfence steps and macOS confirmation dialogs.
 *   The panel itself never changes a site or this Mac.
 * - It opens by itself only in a folder that is a wp-dev site; /wp-dev opens it anywhere. Every
 *   command gets the session's folder explicitly: a child's default working directory isn't
 *   reliably the session's (0.5.0 opened the panel in every session because of it).
 */
import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register } from 'claude-code'

import type { LocalSite, MissingPrerequisite, Prerequisites, SiteStatus } from '../types'

const PANE = 'wp-dev'
const TITLE = 'wp-dev'

const status = atom({ plugin: 'wp-dev', key: 'status' } as const, null as SiteStatus | null, { shape: 'status-2' })
const prerequisites = atom({ plugin: 'wp-dev', key: 'prerequisites' } as const, null as Prerequisites | null, { shape: 'prerequisites-1' })
const sites = atom({ plugin: 'wp-dev', key: 'sites' } as const, [] as LocalSite[], { shape: 'sites-1' })

/** One action: its button, and the words sent to Claude. */
type Action = { key: string; label: string; prompt: string; primary?: boolean }

/** The actions that fit each phase, most likely first. */
const ACTIONS: Record<SiteStatus['phase'], Action[]> = {
  'no-project': [{ key: 'new', label: 'Set up a new site', prompt: 'set up a new wp-dev site', primary: true }],
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

const SITE_STATE_TEXT: Record<LocalSite['state'], string> = {
  'setting-up': 'setup not finished',
  ready: 'ready',
  'publish-pending': 'waiting after a publish',
  archived: 'archived',
}

/** The wp-dev skill's command, however the engine names it. */
const isWpDevCommand = (name: string | undefined): boolean => name === 'wp-dev' || name === 'wp-dev:wp-dev'

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const result = await next(e)
    const now = await refreshStatus($)
    if (now.phase !== 'no-project') {
      await refreshMac($)
      void $.ui.open({ id: PANE, title: TITLE })
    }
    void $.clock.every(20_000, () => void refreshStatus($))
    return result
  })

  // /wp-dev: open the panel with fresh checks, then let the skill run as usual.
  on('prompt.submit', async ($, e, next) => {
    // Never held up or stopped by the panel: the checks run beside the skill.
    if (isWpDevCommand(e.command?.name)) {
      void $.ui.open({ id: PANE, title: TITLE }).catch(() => undefined)
      void refreshAll($).catch(() => undefined)
    }
    return next(e)
  })

  on('turn.complete', async ($, e, next) => {
    const result = await next(e)
    void refreshStatus($)
    return result
  })

  on('ui.render', { component: 'Pane', requestId: PANE }, async ($, e) => {
    const { Box, Text, Button, Link } = $.ui.resolve(e)
    const now = await read($, status)
    const mac = await read($, prerequisites)
    const localSites = await read($, sites)

    if (!now) {
      return <Text dimColor>Checking this folder…</Text>
    }

    const site = now.homeUrl ? new URL(now.homeUrl).host : undefined
    const actions = ACTIONS[now.phase]
    const missing = mac?.missing ?? []
    const elsewhere = now.phase === 'no-project' ? localSites.filter(s => s.dir !== now.dir) : []

    return (
      <Box flexDirection="column" gap={1}>
        <Box flexDirection="column">
          <Text bold>{site ?? 'wp-dev'}</Text>
          <Text>{now.phase === 'no-project' && now.isEmpty ? 'This empty folder can hold a new site.' : PHASE_TEXT[now.phase]}</Text>
          {now.error && now.phase === 'no-project' && <Text dimColor>wpsync: {now.error}</Text>}
        </Box>

        {mac && (
          <Box flexDirection="column">
            {missing.length === 0 ? (
              <Text dimColor>This Mac has everything wp-dev needs.</Text>
            ) : (
              <Box flexDirection="column">
                <Text bold>This Mac still needs:</Text>
                {missing.map(item => (
                  <Text>
                    · {item.label}
                    {item.needsPerson ? <Text dimColor> (needs you)</Text> : ''}
                  </Text>
                ))}
                <Button
                  key="prerequisites"
                  label="Set up this Mac"
                  variant="primary"
                  onPress={() => void $.prompt.submit({ text: 'install the missing wp-dev prerequisites on this Mac', asUser: true })}
                />
              </Box>
            )}
          </Box>
        )}

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

        {elsewhere.length > 0 && (
          <Box flexDirection="column">
            <Text bold>Your sites</Text>
            {elsewhere.map(one => (
              <Box key={one.dir} gap={1}>
                <Button
                  key={`open:${one.dir}`}
                  label={`Open ${one.host}`}
                  onPress={() => void $.prompt.submit({ text: `open my wp-dev site in ${one.dir}`, asUser: true })}
                />
                <Text dimColor>{SITE_STATE_TEXT[one.state]}</Text>
              </Box>
            ))}
          </Box>
        )}

        <Box gap={1}>
          {now.phase !== 'no-project' && (
            <Button key="status" label="Where does it stand?" onPress={() => void $.prompt.submit({ text: 'where does my wp-dev project stand?', asUser: true })} />
          )}
          <Button key="refresh" label="Refresh" onPress={() => void refreshAll($)} />
        </Box>
        <Text dimColor>Buttons ask Claude to do it. Publishing and deleting still ask you to confirm in a dialog.</Text>
      </Box>
    )
  })
}

/** The plugin's own wpsync. */
async function wpsync($: EngineInterface, args: string[]): Promise<{ exitCode: number; stdout: string; stderr: string }> {
  const env = await $.process.hookEnv()
  return $.process.run([`${env.CLAUDE_PLUGIN_ROOT}/bin/wpsync`, ...args], { cwd: await $.session.cwd(), timeoutMs: 30_000 })
}

async function refreshAll($: EngineInterface): Promise<void> {
  await refreshStatus($)
  await refreshMac($)
}

/** Reads this folder's status (contacts nothing) into the panel's state. */
async function refreshStatus($: EngineInterface): Promise<SiteStatus> {
  const dir = await $.session.cwd()
  let next: SiteStatus
  try {
    const run = await wpsync($, ['status', '--json', '--local', '--dir', dir])
    next = run.exitCode === 0
      ? (JSON.parse(run.stdout) as SiteStatus)
      : { phase: 'no-project', dir, error: (run.stderr || run.stdout).trim().split('\n').pop() }
  } catch (error) {
    next = { phase: 'no-project', dir, error: String(error) }
  }
  if (next.phase === 'no-project') next = { ...next, isEmpty: await folderIsEmpty($, dir) }
  await update($, status, () => next)
  return next
}

/** This Mac's prerequisites and the local copies on it. */
async function refreshMac($: EngineInterface): Promise<void> {
  try {
    // doctor exits 1 when something needs fixing; its JSON is on stdout either way.
    const run = await wpsync($, ['doctor', '--local', '--json'])
    const checks = JSON.parse(run.stdout) as Array<{ id: string; label: string; ok: boolean; needsPerson?: boolean }>
    const missing: MissingPrerequisite[] = checks.filter(c => !c.ok).map(c => ({ id: c.id, label: c.label, needsPerson: !!c.needsPerson }))
    await update($, prerequisites, () => ({ missing }))
  } catch (error) {
    // Bun missing (wpsync can't run at all), say: the skill installs it.
    await update($, prerequisites, () => ({ missing: [{ id: 'wpsync', label: 'Bun, which wpsync runs on', needsPerson: false }], error: String(error) }))
  }
  try {
    const run = await wpsync($, ['sites', '--json'])
    const list = JSON.parse(run.stdout) as LocalSite[]
    await update($, sites, () => list.map(s => ({ dir: s.dir, host: s.host, state: s.state })))
  } catch {
    await update($, sites, () => [])
  }
}

/** Is the session's folder empty (a new site's folder)? .DS_Store and .claude don't count. */
async function folderIsEmpty($: EngineInterface, dir: string): Promise<boolean> {
  const run = await $.process.run(['ls', '-A', dir], { timeoutMs: 5_000 }).catch(() => null)
  if (!run || run.exitCode !== 0) return false
  return run.stdout.split('\n').filter(name => name && name !== '.DS_Store' && name !== '.claude').length === 0
}

/** "Nov 18, 2026, 4:40 PM", in the Mac's own time zone. */
function formatDate(iso: string): string {
  const date = new Date(iso)
  return Number.isNaN(date.getTime()) ? iso : date.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })
}
