import assert from "node:assert/strict";
import test from "node:test";
import { sanitizeArticleHtml } from "../lib/sanitize.ts";

test("unsafe article markup is removed", () => {
  const html = sanitizeArticleHtml('<p>Hello</p><script>alert(1)</script><a href="javascript:alert(1)">bad</a>');
  assert.match(html, /Hello/);
  assert.doesNotMatch(html, /script|javascript:/i);
});
