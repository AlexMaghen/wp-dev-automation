import { expect, test } from 'claude-code/testing'

const PANE = {
  plugin: 'wp-dev',
  component: 'Pane',
  requestId: 'wp-dev',
  props: { title: 'wp-dev', isFocused: false, bodyColumns: 40, placement: 'dock', scroll: { offset: 0, bodyRows: 30 }, view: {} },
} as const

/** Stands in for `wpsync status --json --local` and the rest of the engine around it. */
function engine(on: Parameters<Parameters<typeof test>[1]>[1], status: Record<string, unknown>, sent: string[]) {
  on('process.hookEnv', () => ({ value: { CLAUDE_PLUGIN_ROOT: '/plugin' } }))
  on('session.cwd', () => ({ value: '/sites/example.com' }))
  on('clock.now', () => ({ value: 1 }))
  on('process.run', (_, e) => ({
    value: e.argv[0] === 'ls'
      ? { exitCode: 0, stdout: '.wpsync.json\nwp\n', stderr: '', isStdoutTruncated: false, isStderrTruncated: false }
      : { exitCode: 0, stdout: JSON.stringify(status), stderr: '', isStdoutTruncated: false, isStderrTruncated: false },
  }))
  on('command.register', () => ({ value: { command: 'wp-panel' } }))
  on('ui.open', () => ({ value: { isPlaced: true } }))
  on('session.start', (_, e) => ({ cwd: e.cwd }))
  on('prompt.submit', (_, e) => {
    sent.push(e.text)
    return { text: e.text }
  })
}

const WORK = { phase: 'work', dir: '/sites/example.com', homeUrl: 'https://example.com', localUrl: 'https://example-com.ddev.site', ddevRunning: true, lastPull: '2026-11-18T10:00:00.000Z' }

test('a working copy shows its addresses and hands each action to Claude', async ($, on) => {
  const sent: string[] = []
  engine(on, WORK, sent)
  await $.session.start({ cwd: '/sites/example.com', surface: 'desktop', isInteractive: true })

  for (const surface of ['terminal', 'desktop', 'vscode', 'mobile'] as const) {
    const ui = await $.ui.mount({ ...PANE, surface })
    expect((await ui.find({ type: 'Text', text: /^example\.com$/ }))?.text).toBe('example.com')
    expect(await ui.find({ type: 'Text', text: /Ready to work/ })).toBeDefined()
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
  engine(on, { ...WORK, phase: 'archived', archivedAt: '2026-11-18T11:00:00.000Z' }, sent)
  await $.session.start({ cwd: '/sites/example.com', surface: 'desktop', isInteractive: true })

  const ui = await $.ui.mount({ ...PANE, surface: 'desktop' })
  expect(await ui.find({ key: 'publish' })).toBeUndefined()
  await ui.press({ key: 'unarchive' })
  expect(sent).toEqual(['unarchive my wp-dev project'])
  await ui.unmount()
})

test('after a publish, finalize and roll back are offered', async ($, on) => {
  engine(on, { ...WORK, phase: 'publish-pending', lastPush: { at: '2026-11-18T12:00:00.000Z', finalized: false } }, [])
  await $.session.start({ cwd: '/sites/example.com', surface: 'desktop', isInteractive: true })

  const ui = await $.ui.mount({ ...PANE, surface: 'desktop' })
  expect(await ui.find({ key: 'finalize' })).toBeDefined()
  expect(await ui.find({ key: 'rollback' })).toBeDefined()
  expect(await ui.find({ type: 'Text', text: /not finalized/ })).toBeDefined()
  await ui.unmount()
})
