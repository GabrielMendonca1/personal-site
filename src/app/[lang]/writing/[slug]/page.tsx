import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import ArticleShell from "@/components/writing/ArticleShell";
import { DraftNote, mdxElements } from "@/components/writing/ArticleContent";
import {
  ApplicationDemo,
  ContextDemo,
  LoopDemo,
  MemoryDemo,
  TimeDemo,
} from "@/components/writing/demos";
import { getPostBySlug, getWritingPosts } from "@/lib/writing";
import { isLocale, locales } from "@/lib/i18n";
import "@/app/writing/writing.css";

type RouteProps = { params: Promise<{ lang: string; slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) return [];
  return (await getWritingPosts(params.lang)).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const post = await getPostBySlug(slug, lang);
  if (!post) return {};

  return {
    title: `${post.title} — G`,
    description: post.description,
    robots: post.status === "draft" ? { index: false, follow: false } : undefined,
    alternates: { canonical: `/writing/${slug}` },
    openGraph: { title: post.title, description: post.description, type: "article", url: `/writing/${slug}`, locale: lang === "pt" ? "pt_BR" : "en_US" },
    twitter: { card: "summary", title: post.title, description: post.description },
  };
}

export default async function WritingPostPage({ params }: RouteProps) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const post = await getPostBySlug(slug, lang);
  if (!post) notFound();
  const availableLocales = (await Promise.all(locales.map(async (locale) =>
    (await getPostBySlug(slug, locale)) ? locale : null
  ))).filter((locale) => locale !== null);

  const components = {
    ...mdxElements,
    DraftNote: post.status === "draft" ? DraftNote : () => null,
    LoopDemo,
    MemoryDemo,
    ApplicationDemo,
    ContextDemo,
    TimeDemo,
  };
  const { content } = await compileMDX({
    source: post.source,
    components,
    options: {
      parseFrontmatter: false,
      mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] },
    },
  });

  return (
    <ArticleShell {...post} locale={lang} availableLocales={availableLocales}>
      {content}
    </ArticleShell>
  );
}
