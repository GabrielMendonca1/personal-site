import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { ThemeProvider } from '@/contexts/ThemeContext';
import { locales, type Locale } from '@/i18n/config';
import { geistSans, geistMono } from '@/styles/fonts';

function resolveLocale(locale: string): Locale {
  const normalized = locale.toLowerCase();
  if (locales.includes(normalized as Locale)) {
    return normalized as Locale;
  }
  notFound();
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
