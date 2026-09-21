import type { MetadataRoute } from "next";
import { locales, siteUrl } from "@/lib/i18n";
import { getWritingPosts } from "@/lib/writing";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const urls = new Set([`${siteUrl}/`]);
  for (const locale of locales) {
    for (const post of await getWritingPosts(locale)) {
      if (post.status === "published") urls.add(`${siteUrl}/writing/${post.slug}`);
    }
  }
  return [...urls].map((url) => ({ url }));
}
