import assert from "node:assert/strict";
import test from "node:test";
import { articleCategoryLabel } from "../lib/articles.ts";
import { articleInput, normalizeEmail } from "../lib/validation.ts";

test("Essay is fixed while topic remains customizable", () => {
  assert.equal(articleCategoryLabel("History of science"), "Essay / History of science");
  assert.equal(articleCategoryLabel("Essay"), "Essay");
});

test("article input removes unsafe markup", () => {
  const article = articleInput({
    title: "A title",
    slug: "a-title",
    topic: "Science",
    status: "draft",
    bodyHtml: '<p>Hello</p><script>alert(1)</script><a href="javascript:alert(1)">bad</a>',
  });
  assert.match(article.bodyHtml, /Hello/);
  assert.doesNotMatch(article.bodyHtml, /script|javascript:/i);
});

test("newsletter email is normalized", () => {
  assert.equal(normalizeEmail(" Reader@Example.COM "), "reader@example.com");
});
