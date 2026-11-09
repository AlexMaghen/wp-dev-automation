import { existsSync, mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { destroyScript, sameHost } from "../src/confirm-dialog";
import { destroy, type DestroyConfirmProvider } from "../src/destroy";

/** A throwaway site project folder; `withDdev` adds a .ddev/config.yaml. */
function siteProject(withDdev = false): string {
  const dir = mkdtempSync(join(tmpdir(), "wpsync-destroy-"));
  writeFileSync(join(dir, ".wpsync.json"), JSON.stringify({ homeUrl: "https://example.com", setup: "ready", ddevName: "example-com" }));
  mkdirSync(join(dir, "wp"));
  writeFileSync(join(dir, "wp", "index.php"), "<?php");
  if (withDdev) {
    mkdirSync(join(dir, ".ddev"));
    writeFileSync(join(dir, ".ddev", "config.yaml"), "name: example-com\n");
  }
  return dir;
}

/** Answers the three confirmations from a list, recording which steps were asked. */
function answers(...yes: boolean[]): { confirm: DestroyConfirmProvider; asked: number[] } {
  const asked: number[] = [];
  return {
    asked,
    confirm: async (_request, step) => {
      asked.push(step);
      return yes[step - 1] ?? false;
    },
  };
}

describe("wpsync destroy", () => {
  it("deletes the DDEV project and the folder after three yeses", async () => {
    const dir = siteProject(true);
    const { confirm, asked } = answers(true, true, true);
    const deleted: string[] = [];
    const result = await destroy({ dir }, { confirm, ddevDelete: (d) => deleted.push(d) });
    expect(asked).toEqual([1, 2, 3]);
    expect(deleted).toEqual([dir]);
    expect(result).toMatchObject({ host: "example.com", homeUrl: "https://example.com", ddevDeleted: true });
    expect(existsSync(dir)).toBe(false);
  });

  for (const refused of [1, 2, 3]) {
    it(`deletes nothing when confirmation ${refused} of 3 is refused`, async () => {
      const dir = siteProject(true);
      const { confirm, asked } = answers(...[1, 2, 3].map((step) => step !== refused));
      const deleted: string[] = [];
      await expect(destroy({ dir }, { confirm, ddevDelete: (d) => deleted.push(d) })).rejects.toMatchObject({ code: "not_confirmed" });
      expect(asked).toEqual([1, 2, 3].slice(0, refused));
      expect(deleted).toEqual([]);
      expect(existsSync(join(dir, "wp", "index.php"))).toBe(true);
    });
  }

  it("skips DDEV for a project that was never pulled", async () => {
    const dir = siteProject(false);
    const result = await destroy({ dir }, { confirm: answers(true, true, true).confirm, ddevDelete: () => expect.fail("no DDEV project") });
    expect(result.ddevDeleted).toBe(false);
    expect(existsSync(dir)).toBe(false);
  });

  it("refuses a folder that isn't a site project, and refuses without a confirm", async () => {
    const empty = mkdtempSync(join(tmpdir(), "wpsync-destroy-"));
    await expect(destroy({ dir: empty }, { confirm: answers(true, true, true).confirm })).rejects.toMatchObject({ code: "not_a_project" });
    const dir = siteProject();
    await expect(destroy({ dir }, {})).rejects.toMatchObject({ code: "not_confirmed" });
    expect(existsSync(dir)).toBe(true);
  });

  it("shows three separate dialogs, Cancel by default, the last asking for the domain", () => {
    const request = { host: "example.com", dir: "/x", summary: 'Folder: /x "quoted"' };
    const [one, two, three] = ([1, 2, 3] as const).map((step) => destroyScript(request, step));
    expect(one).toContain("(1 of 3)");
    expect(one).toContain('\\"quoted\\"');
    expect(one).toContain('buttons {"Cancel", "Continue"} default button "Cancel"');
    expect(two).toContain("(2 of 3)");
    expect(two).toContain("can't be undone");
    expect(two).toContain('default button "Cancel"');
    expect(three).toContain("(3 of 3)");
    expect(three).toContain('default answer ""');
    expect(three).toContain('default button "Cancel"');
    expect(sameHost("example.com", "example.com")).toBe(true);
  });
});
