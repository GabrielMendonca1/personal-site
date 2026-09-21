import GithubSlugger from "github-slugger";
import { gfmFromMarkdown } from "mdast-util-gfm";
import { fromMarkdown } from "mdast-util-from-markdown";
import { toString } from "mdast-util-to-string";
import { gfm } from "micromark-extension-gfm";

export type WritingStatus = "draft" | "published";

export type WritingMeta = {
  title: string;
  description: string;
  date: string;
  updated?: string;
  status: WritingStatus;
  order?: number;
};

export type TocItem = {
  id: string;
  title: string;
  level: 2 | 3;
};

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isCalendarDate(value: unknown): value is string {
  if (typeof value !== "string") return false;
  if (/^\d{4}$/.test(value)) return Number(value) > 0;
  if (!DATE_PATTERN.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
}

export function validateSlug(slug: string): string {
  if (!SLUG_PATTERN.test(slug)) throw new Error(`Invalid writing slug: ${slug}`);
  return slug;
}

export function validateWritingMeta(value: unknown, source = "writing post"): WritingMeta {
  if (!isPlainObject(value)) throw new Error(`${source}: frontmatter must be an object`);

  const { title, description, date, updated, status, order } = value;
  if (typeof title !== "string" || !title.trim()) throw new Error(`${source}: title is required`);
  if (typeof description !== "string" || !description.trim()) throw new Error(`${source}: description is required`);
  if (!isCalendarDate(date)) throw new Error(`${source}: date must be a valid quoted YYYY-MM-DD or YYYY string`);
  if (updated !== undefined && !isCalendarDate(updated)) throw new Error(`${source}: updated must be a valid quoted YYYY-MM-DD or YYYY string`);
  if (status !== "draft" && status !== "published") throw new Error(`${source}: status must be draft or published`);
  if (order !== undefined && (!Number.isSafeInteger(order) || Number(order) < 1)) {
    throw new Error(`${source}: order must be a positive safe integer`);
  }

  return {
    title: title.trim(),
    description: description.trim(),
    date,
    ...(updated ? { updated } : {}),
    status,
    ...(order !== undefined ? { order: Number(order) } : {}),
  };
}

export function draftsAreVisible(environment = process.env): boolean {
  return environment.NODE_ENV !== "production" || environment.SHOW_DRAFTS === "1";
}

export function filterVisiblePosts<T extends { status: WritingStatus }>(posts: T[], environment = process.env): T[] {
  return draftsAreVisible(environment) ? posts : posts.filter((post) => post.status === "published");
}

export function sortWritingPosts<T extends WritingMeta>(posts: T[]): T[] {
  return [...posts].sort((a, b) => {
    const dateDifference = b.date.localeCompare(a.date);
    if (dateDifference) return dateDifference;
    const orderDifference = (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER);
    return orderDifference || a.title.localeCompare(b.title);
  });
}

export function extractToc(source: string): TocItem[] {
  const tree = fromMarkdown(source, {
    extensions: [gfm()],
    mdastExtensions: [gfmFromMarkdown()],
  });
  const slugger = new GithubSlugger();

  return tree.children.flatMap((node): TocItem[] => {
    if (node.type !== "heading") return [];
    const title = toString(node).trim();
    const id = slugger.slug(title);
    if (!id) throw new Error(`Heading has no usable anchor: ${title}`);
    if (node.depth !== 2 && node.depth !== 3) return [];
    return [{ id, title, level: node.depth }];
  });
}

export function estimateReadingMinutes(source: string): number {
  const prose = source
    .replace(/<DraftNote\b[^>]*>[\s\S]*?<\/DraftNote\s*>|<DraftNote\b[^>]*\/>/g, "")
    .replace(/^---[\s\S]*?---/, "")
    .replace(/```[\s\S]*?```|~~~[\s\S]*?~~~/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_`\[\]()!|:-]/g, " ");
  const words = prose.match(/[\p{L}\p{N}’'-]+/gu)?.length ?? 0;
  return Math.max(1, Math.ceil(words / 220));
}
