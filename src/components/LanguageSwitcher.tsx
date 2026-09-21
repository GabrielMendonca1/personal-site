"use client";

import { useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { copy, locales, type Locale } from "@/lib/i18n";

export default function LanguageSwitcher({ locale, available = locales }: {
  locale: Locale;
  available?: readonly Locale[];
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  useEffect(() => {
    document.documentElement.lang = locale === "pt" ? "pt-BR" : "en";
  }, [locale]);
  return (
    <nav className="language-switcher" aria-label={copy[locale].language} aria-busy={pending}>
      {available.map((language) => (
        <button
          type="button"
          key={language}
          lang={language === "pt" ? "pt-BR" : "en"}
          aria-label={language === "pt" ? "Português" : "English"}
          aria-pressed={language === locale}
          disabled={pending}
          onClick={() => {
            if (language === locale) return;
            document.cookie = `site-language=${language}; Path=/; Max-Age=31536000; SameSite=Lax`;
            startTransition(() => router.refresh());
          }}
        >{language.toUpperCase()}</button>
      ))}
    </nav>
  );
}
