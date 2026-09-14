import assert from "node:assert/strict";
import test from "node:test";
import { issueSession, validSession } from "../lib/security.ts";

process.env.ADMIN_SESSION_SECRET = "test-secret-that-is-longer-than-thirty-two-characters";

test("private sessions expire and reject tampering", () => {
  const now = 1_800_000_000_000;
  const token = issueSession(now);
  assert.equal(validSession(token, now + 1_000), true);
  assert.equal(validSession(`${token}x`, now + 1_000), false);
  assert.equal(validSession(token, now + 12 * 60 * 60 * 1000 + 1), false);
});
