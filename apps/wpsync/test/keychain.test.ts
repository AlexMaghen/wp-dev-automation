import { describe, expect, it } from "vitest";
import { MacKeychain, type StoredConnection } from "../src/secrets";

/** Uses a separate Keychain service so it never touches real wpsync entries. */
describe.runIf(process.platform === "darwin")("MacKeychain", () => {
  const store = new MacKeychain("wpsync-unit-test");
  const key = "https://keychain-test.example";
  const value: StoredConnection = {
    homeUrl: key,
    siteUrl: key,
    username: "admin",
    applicationPassword: "abcd EFGH 1234 ijkl mnop QRST",
    applicationPasswordUuid: "00000000-0000-4000-8000-000000000000",
    applicationPasswordName: 'wpsync "quoted" name',
    connectedAt: "2026-11-08T00:00:00.000Z",
  };

  it("saves, reads back, replaces and deletes a connection", async () => {
    await store.delete(key);
    expect(await store.get(key)).toBeNull();

    await store.set(key, value);
    expect(await store.get(key)).toEqual(value);

    const replaced = { ...value, applicationPasswordUuid: "11111111-1111-4111-8111-111111111111" };
    await store.set(key, replaced);
    expect(await store.get(key)).toEqual(replaced);

    await store.delete(key);
    expect(await store.get(key)).toBeNull();
  });
});
