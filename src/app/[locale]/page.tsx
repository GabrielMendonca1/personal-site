import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ExperienceSection from '@/components/ExperienceSection';
import ProjectsSection from '@/components/ProjectsSection';
import EducationSection from '@/components/EducationSection';
import { getDictionary } from '@/i18n/getDictionary';
import { TranslationProvider } from '@/contexts/TranslationContext';
import { locales, type Locale } from '@/i18n/config';

function resolveLocale(locale: string): Locale {
  const normalized = locale.toLowerCase();
  if (locales.includes(normalized as Locale)) {
    return normalized as Locale;
  }
  return notFound();
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(
        locales.map((availableLocale) => [availableLocale, `/${availableLocale}`])
      ),
    },
  };
}

export default async function LocaleHome({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const dictionary = await getDictionary(locale);

  return (
    <TranslationProvider locale={locale} dictionary={dictionary}>
      <Header />
      <main>
        <HeroSection content={dictionary.hero} />
        <ExperienceSection content={dictionary.experience} />
        <ProjectsSection content={dictionary.projects} />
        <EducationSection content={dictionary.education} />
      </main>
    </TranslationProvider>
  );
}
