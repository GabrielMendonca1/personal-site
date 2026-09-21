# Writing author guide

Articles are trusted, repository-local MDX files in `content/writing`. They are compiled on the server; this pipeline is not intended for uploaded or user-supplied MDX. The writing tests require Node.js 22.18 or newer (native TypeScript type stripping).

## Add or edit an article

Create `content/writing/<slug>.mdx`. Slugs must contain lowercase ASCII letters, numbers, and single hyphens only. Frontmatter is validated when the post is read:

```yaml
---
title: "A sentence-case title"
description: "A short lede shown by the article shell."
date: "2026-09-07"
updated: "2026-09-07" # optional
status: "draft"       # draft or published
order: 1              # optional positive integer; tie-breaker for equal dates
---
```

Keep dates quoted so YAML does not coerce them into `Date` objects. For retrospective entries where only the year is known, use `date: "2021"`: the list and article show just that year, without inventing a month/day. The year identifies the period described, not a claim that the text was published then; published year-only entries are labeled “Retrospective.” Explain the retrospective framing in the copy. Full dates retain the usual publication/editing labels. Missing or invalid frontmatter fails fast while reading the route/list and therefore fails a production build; posts are never silently skipped. The shell renders the title and description, so the MDX must not repeat an `h1`. Use `##` and optional `###` headings: the table of contents parses their CommonMark/GFM inline text and uses the same GitHub slug algorithm as the rendered headings. Unicode and underscores are preserved, and repeated anchors receive `-1`, `-2`, and so on across both heading levels. Keep JSX/components out of heading text. GFM links, lists, blockquotes, fenced code, and tables are supported.

The following components are globally available to article MDX (no imports):

- `<Callout title="…">…</Callout>` for reader-facing distinctions.
- `<DraftNote title="…">…</DraftNote>` for collapsible editorial notes. It is omitted from published output.
- `<Figure caption="…">…</Figure>` for a semantic demo and caption.
- `<LoopDemo />`, `<MemoryDemo />`, `<ApplicationDemo />`, `<ContextDemo />`, and `<TimeDemo />` for the local interactive demos.

Run `npm run test:writing` after metadata/data-layer changes and `npm run lint` before review.

## Draft behavior

Drafts are listed and routable during development. Production excludes drafts by default. Draft routes are fixed when Next.js builds (`dynamicParams = false`), so set `SHOW_DRAFTS=1` on the **build command**, not only when starting the server, for a conscious production-mode preview. Draft metadata also emits `noindex, nofollow`. **Noindex is not access control**: do not put private information or secrets in a draft.

To verify all drafts in a production compilation without deleting the active development cache, use only:

```bash
SHOW_DRAFTS=1 NEXT_DIST_DIR=.next-writing-build npm run build
```

Do not run a plain `npm run build` while the live preview uses `.next`. Publishing is an editorial decision: review claims and source notes, remove/resolve every `DraftNote`, set `status: "published"`, then verify links, mobile layout, keyboard controls, reduced motion, lint, and the isolated build. No deployment is performed by this workflow.
