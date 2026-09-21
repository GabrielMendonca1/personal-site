import assert from "node:assert/strict";
import test from "node:test";
import {
  estimateReadingMinutes,
  extractToc,
  filterVisiblePosts,
  sortWritingPosts,
  validateSlug,
  validateWritingMeta,
} from "../src/lib/writing-shared.ts";

const base = {
  title: "A useful title",
  description: "A short description.",
  date: "2026-09-07",
  status: "draft",
};

test("validates metadata dates, status, order, and slugs", () => {
  assert.deepEqual(validateWritingMeta({ ...base, order: 3 }), { ...base, order: 3 });
  assert.equal(validateWritingMeta({ ...base, date: "2021" }).date, "2021");
  assert.throws(() => validateWritingMeta({ ...base, date: 2021 }), /quoted YYYY-MM-DD/);
  assert.throws(() => validateWritingMeta({ ...base, date: "0000" }), /valid quoted/);
  assert.throws(() => validateWritingMeta({ ...base, date: "2021-02" }), /valid quoted/);
  assert.throws(() => validateWritingMeta({ ...base, date: new Date() }), /quoted YYYY-MM-DD/);
  assert.throws(() => validateWritingMeta({ ...base, date: "2026-02-30" }), /valid quoted/);
  assert.equal(validateWritingMeta({ ...base, order: 6 }).order, 6);
  assert.throws(() => validateWritingMeta({ ...base, order: 0 }), /positive safe integer/);
  assert.throws(() => validateWritingMeta({ ...base, order: 1.5 }), /positive safe integer/);
  assert.equal(validateSlug("context-is-not-accumulation"), "context-is-not-accumulation");
  assert.throws(() => validateSlug("../private"), /Invalid writing slug/);
});

test("draft filtering defaults closed in production and can be explicitly enabled", () => {
  const posts = [{ status: "draft", title: "Draft" }, { status: "published", title: "Public" }];
  assert.deepEqual(filterVisiblePosts(posts, { NODE_ENV: "production" }).map((post) => post.title), ["Public"]);
  assert.equal(filterVisiblePosts(posts, { NODE_ENV: "production", SHOW_DRAFTS: "1" }).length, 2);
  assert.equal(filterVisiblePosts(posts, { NODE_ENV: "development" }).length, 2);
});

test("sorts newest first, then explicit order, then title", () => {
  const posts = [
    { ...base, title: "B", order: 2 },
    { ...base, title: "A", order: 1 },
    { ...base, title: "Newest", date: "2026-09-08" },
    { ...base, title: "First software", date: "2021" },
    { ...base, title: "First AI", date: "2022" },
  ];
  assert.deepEqual(sortWritingPosts(posts).map((post) => post.title), ["Newest", "A", "B", "First AI", "First software"]);
});

test("extracts GFM-compatible TOC anchors and ignores fenced headings", () => {
  const source = [
    "## *Design* & [operation](#details)",
    "### Café notes",
    "## snake_case",
    "### Café notes",
    "```md",
    "## Not a heading",
    "```",
    "### snake_case",
    "#### Another level",
    "## Another level",
  ].join("\n");

  assert.deepEqual(extractToc(source), [
    { id: "design--operation", title: "Design & operation", level: 2 },
    { id: "café-notes", title: "Café notes", level: 3 },
    { id: "snake_case", title: "snake_case", level: 2 },
    { id: "café-notes-1", title: "Café notes", level: 3 },
    { id: "snake_case-1", title: "snake_case", level: 3 },
    { id: "another-level-1", title: "Another level", level: 2 },
  ]);
});

test("excludes DraftNote contents from reading time", () => {
  const editorialWords = Array.from({ length: 300 }, () => "editorial").join(" ");
  assert.equal(estimateReadingMinutes(`Reader prose.\n<DraftNote>${editorialWords}</DraftNote>`), 1);
  assert.equal(estimateReadingMinutes(`${editorialWords}\n<DraftNote>note</DraftNote>`), 2);
});
