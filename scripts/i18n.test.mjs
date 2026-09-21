import assert from "node:assert/strict";
import test from "node:test";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { isLocale, preferredLocale, locales } from "../src/lib/i18n.ts";
import { filterVisiblePosts, validateWritingMeta } from "../src/lib/writing-shared.ts";

test("negotiates supported browser languages and honors a valid explicit choice", () => {
  assert.equal(preferredLocale("pt-BR,pt;q=0.9,en;q=0.8"), "pt");
  assert.equal(preferredLocale("pt-PT"), "pt");
  assert.equal(preferredLocale("en-US,en;q=0.9,pt;q=0.8"), "en");
  assert.equal(preferredLocale("en;q=0.2,pt;q=0.9"), "pt");
  assert.equal(preferredLocale("fr,pt;q=0.9,en;q=0.8"), "pt");
  assert.equal(preferredLocale("pt;q=0,en;q=0.5"), "en");
  assert.equal(preferredLocale("pt;q=garbage,en;q=0.5"), "en");
  assert.equal(preferredLocale("en;q=0.8,pt;q=0.8"), "en");
  assert.equal(preferredLocale("en", "pt"), "pt");
  assert.equal(preferredLocale("pt", "en"), "en");
  assert.equal(preferredLocale("pt", "../../secret"), "pt");
  assert.equal(preferredLocale(null), "en");
  assert.equal(preferredLocale("fr,de"), "en");
  assert.equal(isLocale("pt-BR"), false);
});

test("only the two approved posts are published in both languages", async () => {
  const translations = {};
  for (const locale of locales) {
    const directory = path.join(process.cwd(), "content/writing", locale === "pt" ? "pt" : "");
    const posts = [];
    for (const file of await readdir(directory)) {
      if (!file.endsWith(".mdx")) continue;
      const { data, content } = matter(await readFile(path.join(directory, file), "utf8"));
      posts.push({ ...validateWritingMeta(data), slug: file.replace(/\.mdx$/, ""), content });
    }
    const published = filterVisiblePosts(posts, { NODE_ENV: "production" });
    assert.deepEqual(published.map((p) => p.slug).sort(), ["first-contact-with-ai", "first-contact-with-software"]);
    for (const post of published) {
      assert.equal(post.date, post.slug.endsWith("software") ? "2021" : "2022");
      assert.doesNotMatch(post.content, /<DraftNote|\[!|^# /m, "No editorial notes or duplicate H1 in published prose");
      assert.doesNotMatch(post.content, /<\w+Demo/, "The approved personal posts have no generated interactive demos");
    }
    translations[locale] = published;
  }
  for (const locale of locales) {
    const software = translations[locale].find((post) => post.slug.endsWith("software"));
    assert.match(software.content, /Arthur Samuel/);
    assert.match(software.content, /https:\/\/www.cs.virginia.edu\/[^\s)]+samuel1959.pdf/);
    assert.match(software.content, locale === "pt" ? /damas/ : /checkers/);
  }
});
