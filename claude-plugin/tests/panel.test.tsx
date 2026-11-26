import { expect, test } from 'claude-code/testing'

const PANE = {
  plugin: 'wp-dev',
  component: 'Pane',
  requestId: 'wp-dev',
  props: { title: 'wp-dev', isFocused: false, bodyColumns: 40, placement: 'dock', scroll: { offset: 0, bodyRows: 40 }, view: {} },
} as const

type World = {
  status: Record<string, unknown>
  doctor?: Array<Record<string, unknown>>
  sites?: Array<Record<string, unknown>>
  ls?: string
}

const ok = (stdout: string, exitCode = 0) => ({ exitCode, stdout, stderr: '', isStdoutTruncated: false, isStderrTruncated: false })

/** Stands in for wpsync and the rest of the engine around the panel. */
function engine(on: Parameters<Parameters<typeof test>[1]>[1], world: World, sent: string[], opened: string[] = [], runs: string[][] = []) {
  on('process.hookEnv', () => ({ value: { CLAUDE_PLUGIN_ROOT: '/plugin' } }))
  on('session.cwd', () => ({ value: '/somewhere' }))
  on('clock.every', () => ({ value: () => undefined }))
  on('process.run', (_, e) => {
    runs.push(e.argv)
    const [cmd, sub] = e.argv
    if (cmd === 'ls') return { value: ok(world.ls ?? 'something\n') }
    if (sub === 'status') return { value: ok(JSON.stringify(world.status)) }
    if (sub === 'doctor') {
      const checks = world.doctor ?? [{ id: 'docker', label: 'Docker', ok: true }]
      return { value: ok(JSON.stringify(checks), checks.every(c => c.ok) ? 0 : 1) }
    }
    if (sub === 'sites') return { value: ok(JSON.stringify(world.sites ?? [])) }
    return { value: ok('') }
  })
  on('ui.open', (_, e) => {
    opened.push(e.id)
    return { value: { isPlaced: true } }
  })
  on('session.start', (_, e) => ({ cwd: e.cwd }))
  on('prompt.submit', (_, e) => {
    sent.push(e.text)
    return { text: e.text }
  })
}

const WORK = { phase: 'work', dir: '/sites/example.com', homeUrl: 'https://example.com', localUrl: 'https://example-com.ddev.site', ddevRunning: true, lastPull: '2026-11-18T10:00:00.000Z' }
const start = ($: Parameters<Parameters<typeof test>[1]>[0]) => $.session.start({ cwd: '/somewhere', surface: 'desktop', isInteractive: true })

test('a working copy shows its addresses and hands each action to Claude, on every surface', async ($, on) => {
  const sent: string[] = []
  engine(on, { status: WORK }, sent)
  await start($)

  for (const surface of ['terminal', 'desktop', 'vscode', 'mobile'] as const) {
    const ui = await $.ui.mount({ ...PANE, surface })
    expect((await ui.find({ type: 'Text', text: /^example\.com$/ }))?.text).toBe('example.com')
    expect(await ui.find({ type: 'Text', text: /Ready to work/ })).toBeDefined()
    expect(await ui.find({ type: 'Text', text: /has everything/ })).toBeDefined()
    expect(await ui.find({ key: 'publish' })).toBeDefined()
    expect(await ui.find({ key: 'unarchive' })).toBeUndefined()
    await ui.unmount()
  }

  const ui = await $.ui.mount({ ...PANE, surface: 'desktop' })
  await ui.press({ key: 'publish' })
  await ui.press({ key: 'archive' })
  expect(sent).toEqual(['publish to live', 'archive the local copy'])
  await ui.unmount()
})

test('an archived copy offers unarchive and delete, not publish', async ($, on) => {
  const sent: string[] = []
  engine(on, { status: { ...WORK, phase: 'archived', archivedAt: '2026-11-18T11:00:00.000Z' } }, sent)
  await start($)

  const ui = await $.ui.mount({ ...PANE, surface: 'desktop' })
  expect(await ui.find({ key: 'publish' })).toBeUndefined()
  await ui.press({ key: 'unarchive' })
  expect(sent).toEqual(['unarchive my wp-dev project'])
  await ui.unmount()
})

test('after a publish, finalize and roll back are offered', async ($, on) => {
  engine(on, { status: { ...WORK, phase: 'publish-pending', lastPush: { at: '2026-11-18T12:00:00.000Z', finalized: false } } }, [])
  await start($)

  const ui = await $.ui.mount({ ...PANE, surface: 'desktop' })
  expect(await ui.find({ key: 'finalize' })).toBeDefined()
  expect(await ui.find({ key: 'rollback' })).toBeDefined()
  expect(await ui.find({ type: 'Text', text: /not finalized/ })).toBeDefined()
  await ui.unmount()
})

test('/wp-dev in any folder opens the panel: missing prerequisites, a new site, and the sites to open', async ($, on) => {
  const sent: string[] = []
  const opened: string[] = []
  engine(on, {
    status: { phase: 'no-project', dir: '/somewhere' },
    doctor: [
      { id: 'docker', label: 'Docker', ok: true },
      { id: 'mkcert', label: 'mkcert (trusted https)', ok: false, needsPerson: true },
    ],
    sites: [{ dir: '/Users/x/wp-sites/a.com', host: 'a.com', homeUrl: 'https://a.com', state: 'archived' }],
  }, sent, opened)
  await start($)
  expect(opened).toEqual([])

  await $.prompt.submit({ text: '/wp-dev', command: { name: 'wp-dev:wp-dev', args: '' } })
  expect(opened).toEqual(['wp-dev'])
  // Let the checks that run beside the skill land.
  await new Promise(resolve => setTimeout(resolve, 50))

  const ui = await $.ui.mount({ ...PANE, surface: 'desktop' })
  expect(await ui.find({ type: 'Text', text: /mkcert/ })).toBeDefined()
  expect(await ui.find({ key: 'open:/Users/x/wp-sites/a.com' })).toBeDefined()
  await ui.press({ key: 'prerequisites' })
  await ui.press({ key: 'new' })
  await ui.press({ key: 'open:/Users/x/wp-sites/a.com' })
  expect(sent.slice(-3)).toEqual([
    'install the missing wp-dev prerequisites on this Mac',
    'set up a new wp-dev site',
    'open my wp-dev site in /Users/x/wp-sites/a.com',
  ])
  await ui.unmount()
})

test('the panel opens by itself only in a site\'s folder, never in an empty or other folder', async ($, on) => {
  const opened: string[] = []
  const runs: string[][] = []
  engine(on, { status: { phase: 'no-project', dir: '/new' }, ls: '.DS_Store\n' }, [], opened, runs)
  await start($)
  expect(opened).toEqual([])
  // Every command names the session's folder.
  expect(runs.find(r => r[1] === 'status')).toContain('/somewhere')
  expect(runs.find(r => r[0] === 'ls')).toContain('/somewhere')
})

test('a site\'s folder opens the panel by itself', async ($, on) => {
  const opened: string[] = []
  engine(on, { status: WORK }, [], opened)
  await start($)
  expect(opened).toEqual(['wp-dev'])
})
