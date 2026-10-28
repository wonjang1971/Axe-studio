import { test } from "node:test";
import assert from "node:assert/strict";
import { once } from "node:events";

process.env.DATABASE_URL = "postgresql://unused:unused@127.0.0.1:1/unused";
process.env.ADMIN_PASSWORD = "local-test-password-only";
process.env.NODE_ENV = "production";

test("combined web server serves SPA routes and enforces server-side admin auth", async () => {
  const { default: app } = await import("../artifacts/api-server/src/app.ts");
  const server = app.listen(0, "127.0.0.1");
  await once(server, "listening");
  const address = server.address();
  assert.ok(address && typeof address !== "string");
  const base = `http://127.0.0.1:${address.port}`;
  try {
    for (const route of ["/", "/casting", "/admin"]) {
      const response = await fetch(base + route);
      assert.equal(response.status, 200);
      assert.match(response.headers.get("content-type") ?? "", /text\/html/);
      assert.match(await response.text(), /id="root"/);
    }
    assert.equal((await fetch(base + "/api/admin/session")).status, 401);
    assert.equal((await fetch(base + "/api/admin/session", {
      headers: { authorization: "Bearer wrong-password" },
    })).status, 401);
    const login = await fetch(base + "/api/admin/session", {
      headers: { authorization: `Bearer ${process.env.ADMIN_PASSWORD}` },
    });
    assert.equal(login.status, 200);
    assert.equal(login.headers.get("cache-control"), "no-store");
    assert.deepEqual(await login.json(), { authenticated: true });
    const missing = await fetch(base + "/api/does-not-exist");
    assert.equal(missing.status, 404);
    assert.deepEqual(await missing.json(), { error: "Not found" });
    assert.equal((await fetch(base + "/api/healthz")).status, 200);
  } finally {
    await new Promise<void>((resolve, reject) => server.close(err => err ? reject(err) : resolve()));
  }
});
