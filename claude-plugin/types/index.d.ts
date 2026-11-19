/**
 * The wp-dev panel's state: what wpsync reported (it contacts nothing for any of these).
 */

/** `wpsync status --json --local` for the session's folder. `null` until the first check. */
export type SiteStatus = {
  phase: 'no-project' | 'start-gate' | 'connect' | 'pull' | 'work' | 'publish-pending' | 'archived'
  dir: string
  homeUrl?: string
  localUrl?: string
  ddevRunning?: boolean
  lastPull?: string
  lastPush?: { at: string; finalized: boolean }
  archivedAt?: string
  /** The folder holds nothing yet (a new site's folder). */
  isEmpty?: boolean
  error?: string
}

/** One failing check of `wpsync doctor --local --json`. */
export type MissingPrerequisite = { id: string; label: string; needsPerson: boolean }

/** This Mac's prerequisites: `null` until checked. */
export type Prerequisites = { missing: MissingPrerequisite[]; error?: string }

/** One local copy, from `wpsync sites --json`. */
export type LocalSite = {
  dir: string
  host: string
  state: 'setting-up' | 'ready' | 'publish-pending' | 'archived'
}

declare module 'claude-code' {
  interface PluginState {
    'wp-dev': {
      status: Shaped<SiteStatus | null>
      prerequisites: Shaped<Prerequisites | null>
      sites: Shaped<LocalSite[]>
    }
  }
}
