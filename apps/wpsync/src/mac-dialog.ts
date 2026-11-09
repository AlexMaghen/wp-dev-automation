import { execFileSync } from "node:child_process";
import { WpsyncError } from "./errors";

/**
 * The one macOS dialog every wpsync question uses (sign-in, Application Password, publish,
 * rollback, finalize). It's an AppKit alert built by a small JavaScript for Automation (JXA)
 * script run with osascript, rather than AppleScript's `display dialog`, for two reasons:
 *
 * - It takes keyboard focus. A `display dialog` from a background process opens above other
 *   windows but leaves the app you were in (Claude) active, so typing goes there until you click
 *   the dialog. An accessory-policy app that activates itself becomes the key window.
 * - It holds several fields, so the site, username and password are all in one dialog instead
 *   of a chain of them.
 *
 * Whatever the person types comes back on osascript's stdout to this process only: never
 * printed or logged.
 */

/** A read-only line shown above the fields, e.g. Site: https://example.com. */
export interface DialogInfo {
  label: string;
  value: string;
}

export interface DialogField {
  label: string;
  value?: string;
  /** Hides the typing (password fields). */
  secret?: boolean;
}

export interface DialogSpec {
  /** Bold first line. */
  heading: string;
  /** Smaller text under the heading. */
  message: string;
  info?: DialogInfo[];
  fields?: DialogField[];
  /** Left to right as written; the LAST one is the default (Return). Escape means "Cancel". */
  buttons: string[];
  /** Shows the caution icon (changes to the live site). */
  caution?: boolean;
}

export interface DialogResult {
  /** The button clicked, or null when the dialog gave up after DIALOG_GIVE_UP_SECONDS. */
  button: string | null;
  values: string[];
}

/** Gives up after half an hour, which counts as Cancel, so nothing waits for hours (with the bridge switched on). */
export const DIALOG_GIVE_UP_SECONDS = 1800;

/** The JXA script for a dialog (exported for tests). The spec goes in as a JSON literal. */
export function dialogScript(spec: DialogSpec): string {
  return `ObjC.import("Cocoa");
function run() {
  const spec = ${JSON.stringify(spec)};
  const giveUp = ${DIALOG_GIVE_UP_SECONDS};
  const app = $.NSApplication.sharedApplication;
  // Accessory: no Dock icon, but allowed to activate itself and take keyboard focus.
  app.setActivationPolicy($.NSApplicationActivationPolicyAccessory);

  // An Edit menu, without which Cmd+V (pasting from a password manager) does nothing.
  const menu = $.NSMenu.alloc.init;
  const top = $.NSMenuItem.alloc.init;
  menu.addItem(top);
  const edit = $.NSMenu.alloc.initWithTitle("Edit");
  [["Undo", "undo:", "z"], ["Cut", "cut:", "x"], ["Copy", "copy:", "c"], ["Paste", "paste:", "v"], ["Select All", "selectAll:", "a"]]
    .forEach(([title, action, key]) => edit.addItem($.NSMenuItem.alloc.initWithTitleActionKeyEquivalent(title, action, key)));
  top.submenu = edit;
  app.mainMenu = menu;

  const alert = $.NSAlert.alloc.init;
  alert.messageText = spec.heading;
  alert.informativeText = spec.message;
  if (spec.caution) alert.alertStyle = $.NSAlertStyleCritical;
  // NSAlert makes the first button added the default (rightmost, Return), so add them right to
  // left. It gives a button titled Cancel the Escape key by itself.
  const buttons = spec.buttons.slice().reverse();
  buttons.forEach((title) => alert.addButtonWithTitle(title));

  const info = spec.info || [];
  const fields = spec.fields || [];
  const width = 320, infoH = 22, fieldH = 50;
  const height = info.length * infoH + fields.length * fieldH;
  const inputs = [];
  if (height > 0) {
    const view = $.NSView.alloc.initWithFrame($.NSMakeRect(0, 0, width, height));
    let y = height;
    info.forEach((row) => {
      y -= infoH;
      const label = $.NSTextField.labelWithString(row.label + ":");
      label.frame = $.NSMakeRect(0, y + 2, 70, 17);
      view.addSubview(label);
      const value = $.NSTextField.labelWithString(row.value);
      value.frame = $.NSMakeRect(70, y + 2, width - 70, 17);
      value.font = $.NSFont.boldSystemFontOfSize(13);
      value.selectable = true;
      value.lineBreakMode = $.NSLineBreakByTruncatingMiddle;
      view.addSubview(value);
    });
    fields.forEach((field) => {
      y -= fieldH;
      const label = $.NSTextField.labelWithString(field.label);
      label.frame = $.NSMakeRect(0, y + 26, width, 17);
      view.addSubview(label);
      const input = (field.secret ? $.NSSecureTextField : $.NSTextField).alloc.initWithFrame($.NSMakeRect(0, y + 2, width, 22));
      input.stringValue = field.value || "";
      view.addSubview(input);
      inputs.push(input);
    });
    inputs.forEach((input, i) => { input.nextKeyView = inputs[(i + 1) % inputs.length]; });
    alert.accessoryView = view;
  }
  alert.layout;
  // Typing starts in the first empty field (the password when the username is filled in).
  if (inputs.length) alert.window.initialFirstResponder = inputs.find((x) => x.stringValue.js === "") || inputs[0];

  const timer = $.NSTimer.timerWithTimeIntervalRepeatsBlock(giveUp, false, () => app.abortModal);
  $.NSRunLoop.currentRunLoop.addTimerForMode(timer, $.NSModalPanelRunLoopMode);
  app.activateIgnoringOtherApps(true);
  const response = alert.runModal;
  const index = response - $.NSAlertFirstButtonReturn;
  const button = index >= 0 && index < buttons.length ? buttons[index] : null;
  return JSON.stringify({ button: button, values: inputs.map((x) => x.stringValue.js) });
}
`;
}

/**
 * Shows a dialog and waits. Cancel, Escape or giving up throws `cancelled` with `cancelMessage`.
 * `what` names the dialog in the error when it can't be shown ("sign-in", "confirmation").
 */
export function showDialog(spec: DialogSpec, cancelMessage: string, what: string): DialogResult {
  let output: string;
  try {
    output = execFileSync("osascript", ["-l", "JavaScript", "-"], {
      input: dialogScript(spec),
      encoding: "utf8",
      stdio: ["pipe", "pipe", "pipe"],
      // A backstop only: the dialog gives up by itself after DIALOG_GIVE_UP_SECONDS.
      timeout: (DIALOG_GIVE_UP_SECONDS + 60) * 1000,
    });
  } catch {
    throw new WpsyncError("dialog_failed", `Couldn't show the ${what} dialog.`, "Run wpsync on a Mac where you're logged in to the desktop.");
  }
  let result: DialogResult;
  try {
    result = JSON.parse(output) as DialogResult;
  } catch {
    throw new WpsyncError("dialog_failed", `The ${what} dialog returned no answer.`);
  }
  if (result.button === null || result.button === "Cancel") throw new WpsyncError("cancelled", cancelMessage);
  return result;
}
