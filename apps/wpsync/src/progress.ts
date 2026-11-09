import { execFileSync } from "node:child_process";
import { bytes, count } from "./format";

/**
 * Progress for long jobs (pull, push, rollback), printed so a person, or Claude watching the
 * output, can tell slow from stuck:
 *
 *   progress: database 12/48 tables, 38.2 MB · 2m 10s · last data 1s ago
 *   stalled: no data for 1m 0s during database (wp_wffilemods)
 *
 * A `progress:` line goes out every `intervalMs` (10 s); a `stalled:` line when nothing has arrived for
 * `stallMs`, and again every further `stallMs` while it lasts.
 */
export class Progress {
  private started = 0;
  private lastActivity = 0;
  private lastStallReport = 0;
  private stepName = "starting";
  private detail = "";
  private done = 0;
  private total: number | undefined;
  private unit = "";
  private byteCount = 0;
  private network = true;
  private timer: ReturnType<typeof setInterval> | undefined;

  constructor(
    private readonly log: (line: string) => void,
    private readonly options: { intervalMs?: number; stallMs?: number; now?: () => number } = {},
  ) {
    this.started = this.now();
    this.lastActivity = this.started;
  }

  private now(): number {
    return this.options.now?.() ?? Date.now();
  }

  start(): this {
    const interval = this.options.intervalMs ?? 10_000;
    this.timer = setInterval(() => this.tick(), Math.min(interval, 5_000));
    this.timer.unref?.();
    this.lastPrinted = this.now();
    return this;
  }

  stop(): void {
    if (this.timer) clearInterval(this.timer);
    this.timer = undefined;
  }

  /**
   * Starts a new step: "database" over 48 "tables", say. `network: false` for steps that run only
   * on this Mac (loading into DDEV, say): they receive no data, so they can't stall that way.
   */
  step(name: string, options: { total?: number; unit?: string; network?: boolean } = {}): void {
    this.stepName = name;
    this.total = options.total;
    this.unit = options.unit ?? "";
    this.network = options.network ?? true;
    this.done = 0;
    this.byteCount = 0;
    this.detail = "";
    this.activity();
  }

  /** Something arrived or finished. Any field left out keeps its value. */
  update(change: { done?: number; total?: number; bytes?: number; detail?: string }): void {
    if (change.done !== undefined) this.done = change.done;
    if (change.total !== undefined) this.total = change.total;
    if (change.bytes !== undefined) this.byteCount = change.bytes;
    if (change.detail !== undefined) this.detail = change.detail;
    this.activity();
  }

  /** Data arrived, without anything else changing (a big file's next range, say). */
  activity(): void {
    this.lastActivity = this.now();
    this.lastStallReport = 0;
  }

  private lastPrinted = 0;

  /** Prints a line if one is due. Exposed for tests. */
  tick(): void {
    const now = this.now();
    const idle = now - this.lastActivity;
    const stallMs = this.options.stallMs ?? 60_000;
    if (this.network && idle >= stallMs && now - this.lastStallReport >= stallMs) {
      this.lastStallReport = now;
      this.log(`stalled: no data for ${duration(idle)} during ${this.stepName}${this.detail ? ` (${this.detail})` : ""}`);
      return;
    }
    if (now - this.lastPrinted >= (this.options.intervalMs ?? 10_000)) {
      this.lastPrinted = now;
      this.log(this.line(now));
    }
  }

  line(now = this.now()): string {
    const parts = [this.stepName];
    if (this.total !== undefined) parts[0] += ` ${count(this.done)}/${count(this.total)}${this.unit ? ` ${this.unit}` : ""}`;
    else if (this.done) parts[0] += ` ${count(this.done)}${this.unit ? ` ${this.unit}` : ""}`;
    if (this.byteCount) parts[0] += `, ${bytes(this.byteCount)}`;
    if (this.detail) parts[0] += ` (${this.detail})`;
    parts.push(duration(now - this.started));
    if (this.network) parts.push(`last data ${duration(now - this.lastActivity)} ago`);
    return `progress: ${parts.join(" · ")}`;
  }
}

export function duration(ms: number): string {
  const seconds = Math.max(0, Math.round(ms / 1000));
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ${seconds % 60}s`;
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
}

/** A macOS notification, so a long job's end is seen even from another app. Best effort. */
export function notify(title: string, message: string): void {
  const quote = (text: string) => `"${text.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
  try {
    execFileSync("osascript", ["-"], { input: `display notification ${quote(message)} with title ${quote(title)}`, stdio: ["pipe", "ignore", "ignore"], timeout: 5_000 });
  } catch {
    // No notification is fine.
  }
}
