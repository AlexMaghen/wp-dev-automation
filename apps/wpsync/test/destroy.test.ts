import { existsSync, mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { destroySpec, sameHost } from "../src/confirm-dialog";
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
    expect(result).toMatchObject({ host: "example.com", homeUrl: "https://example.com", ddevDeleted: true, live: { status: "not-connected" } });
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

  it("removes wpsync from live after the dialogs, and says so in them", async () => {
    const dir = siteProject(true);
    const events: string[] = [];
    const live = async (url: string) => {
      events.push(`check ${url}`);
      return { homeUrl: url, remove: async () => (events.push("remove"), { bridgeRemoved: true, keyRevoked: true, homeUrl: url }) };
    };
    const confirm: DestroyConfirmProvider = async (request, step) => {
      events.push(`confirm ${step}`);
      expect(request.disconnect).toBe(true);
      expect(request.summary).toContain("On example.com: the wpsync bridge plugin");
      return true;
    };
    const result = await destroy({ dir }, { confirm, ddevDelete: () => events.push("ddev"), live });
    expect(events).toEqual(["check https://example.com", "confirm 1", "confirm 2", "confirm 3", "remove", "ddev"]);
    expect(result.live).toEqual({ status: "removed", bridgeRemoved: true, keyRevoked: true });
    expect(existsSync(dir)).toBe(false);
  });

  it("deletes nothing, and shows no dialog, when the live check fails", async () => {
    const dir = siteProject(true);
    const { confirm, asked } = answers(true, true, true);
    const live = async () => {
      throw Object.assign(new Error("Wordfence"), { code: "wordfence_application_passwords" });
    };
    await expect(destroy({ dir }, { confirm, ddevDelete: () => expect.fail("kept"), live })).rejects.toMatchObject({ code: "wordfence_application_passwords" });
    expect(asked).toEqual([]);
    expect(existsSync(dir)).toBe(true);
  });

  it("still deletes the local copy if removing from live fails after the dialogs", async () => {
    const dir = siteProject(false);
    const live = async (url: string) => ({ homeUrl: url, remove: async () => Promise.reject(new Error("network down")) });
    const result = await destroy({ dir }, { confirm: answers(true, true, true).confirm, live });
    expect(result.live).toEqual({ status: "failed", message: "network down" });
    expect(existsSync(dir)).toBe(false);
  });

  it("leaves live alone with --keep-connection", async () => {
    const dir = siteProject(false);
    const result = await destroy({ dir, keepConnection: true }, { confirm: answers(true, true, true).confirm, live: () => expect.fail("no check") });
    expect(result.live).toEqual({ status: "kept" });
  });

  it("shows three separate dialogs, Cancel by default, the last asking for the domain", () => {
    const request = { host: "example.com", dir: "/x", disconnect: false, summary: 'Folder: /x "quoted"' };
    const one = destroySpec(request, 1);
    const two = destroySpec(request, 2);
    const three = destroySpec(request, 3);
    expect(one.heading).toContain("(1 of 3)");
    expect(one.message).toContain('Folder: /x "quoted"');
    expect(one.buttons).toEqual(["Continue", "Cancel"]);
    expect(two.heading).toContain("(2 of 3)");
    expect(two.heading).toContain("can't be undone");
    expect(two.buttons.at(-1)).toBe("Cancel");
    expect(three.heading).toContain("(3 of 3)");
    expect(three.fields).toHaveLength(1);
    expect(three.buttons.at(-1)).toBe("Cancel");
    expect(sameHost("example.com", "example.com")).toBe(true);
    expect(one.message).toContain("are not touched");
    expect(destroySpec({ ...request, disconnect: true }, 3).message).toContain("removed from the live site");
  });
});
