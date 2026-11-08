import { startSite } from "@wp-dev-automation/test-harness";

/**
 * Starts the harness site once. Each test file then puts the site in the state it needs in its
 * own beforeAll: vitest may run the files in any order (slowest first, by default).
 */
export default function setup(): void {
  startSite();
}
