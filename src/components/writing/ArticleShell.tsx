import Link from "next/link";
import type { ReactNode } from "react";
import type { TocItem, WritingStatus } from "@/lib/writing-shared";
import ArticleNav from "./ArticleNav";
import ArticleProgress from "./ArticleProgress";
import ArticleReveal from "./ArticleReveal";
import LanguageSwitcher from "../LanguageSwitcher";
import { copy, type Locale } from "@/lib/i18n";

function displayDate(value: string, locale: Locale): string {
  if (value.length === 4) return value;
  return new Intl.DateTimeFormat(locale === "pt" ? "pt-BR" : "en", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

type Props = {
  locale: Locale;
  slug: string;
  availableLocales: Locale[];
  title: string;
  description: string;
  date: string;
  updated?: string;
  status: WritingStatus;
  readingMinutes: number;
  toc: TocItem[];
  children: ReactNode;
};

export default function ArticleShell({ locale, availableLocales, title, description, date, updated, status, readingMinutes, toc, children }: Props) {
  const t = copy[locale];
  const effectiveDate = updated ?? date;
  const dateLabel = status === "draft"
    ? (updated ? t.lastEdited : t.workingDraft)
    : (updated ? t.lastEdited : (date.length === 4 ? t.retrospective : t.published));

  return (
    <main className="writing-page">
      <ArticleProgress />
      <ArticleNav items={toc} locale={locale} />
      <article className="writing-article">
        <header className="writing-header">
          <LanguageSwitcher locale={locale} available={availableLocales} />
          <h1>{title}</h1>
          <p className="writing-meta">
            <span>{dateLabel}</span>
            <span aria-hidden="true"> · </span>
            <time dateTime={effectiveDate}>{displayDate(effectiveDate, locale)}</time>
            <span aria-hidden="true"> · </span>
            <span>{readingMinutes} {t.reading}</span>
          </p>
          <p className="writing-lede">{description}</p>
        </header>
        <ArticleReveal>{children}</ArticleReveal>
        <footer className="writing-article-footer"><Link href="/">← {t.back}</Link></footer>
      </article>
    </main>
  );
}
