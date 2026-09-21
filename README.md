# Gabriel Mendonça — personal site

A Next.js personal site with a small, repository-local writing system.

## Requirements

Node.js 22.18 or newer is required (the writing tests use native TypeScript type stripping).

## Development

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. Environment defaults are documented in `.env.example`.

## Writing

Articles live in `content/writing` as trusted local MDX. Metadata is validated, posts are date/order sorted, and draft visibility is gated by environment. See [`docs/writing.md`](docs/writing.md) for the frontmatter contract, available components, editorial checklist, and safe build command.

```bash
npm run test:writing
npm run lint
SHOW_DRAFTS=1 NEXT_DIST_DIR=.next-writing-build npm run build
```

The isolated build directory protects a running development server's `.next` cache. Draft `noindex` metadata is not access control. This repository workflow does not deploy the site.
