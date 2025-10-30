'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import ContactModal from './ContactModal';
import { useLocaleTransition } from '@/components/LocaleTransitionProvider';
import { useTranslations } from '@/contexts/TranslationContext';
import { locales, type Locale } from '@/i18n/config';

export default function Header() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { dictionary, locale } = useTranslations();
  const { animateLocaleChange, isLocaleTransitioning } = useLocaleTransition();
  const router = useRouter();
  const updateLocaleCookie = (doc: Document, win: Window, targetLocale: Locale) => {
    const maxAge = 60 * 60 * 24 * 365;
    const secureAttribute = win.location.protocol === 'https:' ? '; Secure' : '';
    doc.cookie = `locale=${targetLocale}; path=/; max-age=${maxAge}; SameSite=Lax${secureAttribute}`;
  };

  const localeOptions = useMemo<Array<{ value: Locale; label: string }>>(
    () =>
      locales.map((value) => ({
        value,
        label: value === 'pt-br' ? 'PT' : value.toUpperCase(),
      })),
    [],
  );

  const handleLocaleChange = async (targetLocale: Locale) => {
    if (targetLocale === locale || isLocaleTransitioning) {
      return;
    }

    const transition = animateLocaleChange();
    if (typeof document !== 'undefined' && typeof window !== 'undefined') {
      updateLocaleCookie(document, window, targetLocale);
    }
    router.refresh();
    await transition;
  };

  return (
    <>
      <header className="fixed bg-[var(--background)] top-0 left-0 right-0 z-50 p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center gap-4">
          <h1 className="text-[var(--text-primary)] font-bold">{dictionary.layout.brandName}</h1>

          <div className="flex items-center gap-2">
            <div className="flex rounded-full border border-[var(--border)] p-[2px] bg-[var(--surface)]">
              {localeOptions.map((option) => {
                const isActive = option.value === locale;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleLocaleChange(option.value)}
                    disabled={isLocaleTransitioning}
                    className={`px-3 py-1 text-xs font-medium rounded-full transition-all disabled:cursor-not-allowed disabled:opacity-60 ${
                      isActive
                        ? 'bg-[var(--text-primary)] text-[var(--background)]'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setIsContactModalOpen(true)}
              className="bg-[var(--text-primary)] text-[var(--background)] px-4 py-1 rounded-full text-sm font-medium hover:opacity-80 transition-opacity"
            >
              {dictionary.header.contactCta}
            </button>
          </div>
        </div>
      </header>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  );
}
