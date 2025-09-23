import type { Metadata } from 'next';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ExperienceSection from '@/components/ExperienceSection';
import ProjectsSection from '@/components/ProjectsSection';
import EducationSection from '@/components/EducationSection';
import { LocaleTransitionProvider } from '@/components/LocaleTransitionProvider';
import { TranslationProvider } from '@/contexts/TranslationContext';
import { getDictionary } from '@/i18n/getDictionary';
import { getRequestLocale } from '@/i18n/getRequestLocale';
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
    alternates: {
      canonical: '/',
    },
  };
}

export default async function HomePage() {
  const locale = await getRequestLocale();
  const dictionary = await getDictionary(locale);

  return (
    <TranslationProvider locale={locale} dictionary={dictionary}>
      <LocaleTransitionProvider>
        <Header />
        <main>
          <HeroSection content={dictionary.hero} />
          <ExperienceSection content={dictionary.experience} />
          <ProjectsSection content={dictionary.projects} />
          <EducationSection content={dictionary.education} />
        </main>
      </LocaleTransitionProvider>
    </TranslationProvider>
  );
}
