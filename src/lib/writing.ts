import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Locale } from "./i18n";
import {
  estimateReadingMinutes,
  extractToc,
  filterVisiblePosts,
  sortWritingPosts,
  validateSlug,
  validateWritingMeta,
  type TocItem,
  type WritingMeta,
} from "./writing-shared";

const WRITING_DIRECTORY = path.join(process.cwd(), "content", "writing");

export type WritingPostSummary = WritingMeta & {
  slug: string;
  readingMinutes: number;
};

export type WritingPost = WritingPostSummary & {
  source: string;
  toc: TocItem[];
};

async function readPostFile(fileName: string, locale: Locale): Promise<WritingPost> {
  const slug = validateSlug(fileName.replace(/\.mdx$/, ""));
  const directory = locale === "pt" ? path.join(WRITING_DIRECTORY, "pt") : WRITING_DIRECTORY;
  const filePath = path.join(directory, `${slug}.mdx`);
  const raw = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(raw);
  const metadata = validateWritingMeta(data, filePath);

  return {
    ...metadata,
    slug,
    source: content,
    toc: extractToc(content),
    readingMinutes: estimateReadingMinutes(content),
  };
}

async function allPosts(locale: Locale): Promise<WritingPost[]> {
  let entries: string[];
  try {
    entries = await fs.readdir(locale === "pt" ? path.join(WRITING_DIRECTORY, "pt") : WRITING_DIRECTORY);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }

  const files = entries.filter((entry) => entry.endsWith(".mdx"));
  return Promise.all(files.map((file) => readPostFile(file, locale)));
}

export async function getWritingPosts(locale: Locale = "en"): Promise<WritingPostSummary[]> {
  const posts = filterVisiblePosts(await allPosts(locale));
  return sortWritingPosts(posts).map(({ source: _source, toc: _toc, ...summary }) => summary);
}

export async function getPostBySlug(slug: string, locale: Locale = "en"): Promise<WritingPost | null> {
  try {
    validateSlug(slug);
    const post = await readPostFile(`${slug}.mdx`, locale);
    return filterVisiblePosts([post]).at(0) ?? null;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    if (error instanceof Error && error.message.startsWith("Invalid writing slug:")) return null;
    throw error;
  }
}
