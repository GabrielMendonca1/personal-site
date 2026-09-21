import Link from "next/link";
import type { TocItem } from "@/lib/writing-shared";
import { copy, type Locale } from "@/lib/i18n";

export default function ArticleNav({ items, locale }: { items: TocItem[]; locale: Locale }) {
  const t = copy[locale];
  return (
    <nav className="article-index" aria-label={t.navigation}>
      <Link className="article-index-back" href="/">← {t.index}</Link>
      {items.length > 0 && (
        <>
          <ul className="article-index-sections">
            {items.map((item) => (
              <li className={item.level === 3 ? "article-index-nested" : undefined} key={item.id}>
                <a href={`#${item.id}`}>{item.title}</a>
              </li>
            ))}
          </ul>
          <details className="article-index-mobile">
            <summary>{t.sections}</summary>
            <ul>
              {items.map((item) => <li key={item.id}><a href={`#${item.id}`}>{item.title}</a></li>)}
            </ul>
          </details>
        </>
      )}
    </nav>
  );
}
