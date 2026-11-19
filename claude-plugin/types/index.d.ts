/**
 * What `wpsync status --json --local` reports, as far as the panel reads it.
 * `null` until the first check; `error` when wpsync couldn't run.
 */
export type SiteStatus = {
  phase: 'no-project' | 'start-gate' | 'connect' | 'pull' | 'work' | 'publish-pending' | 'archived'
  dir: string
  homeUrl?: string
  localUrl?: string
  ddevRunning?: boolean
  lastPull?: string
  lastPush?: { at: string; finalized: boolean }
  archivedAt?: string
  checkedAt: number
  error?: string
}

declare module 'claude-code' {
  interface PluginState {
    'wp-dev': { status: Shaped<SiteStatus | null> }
  }
}
