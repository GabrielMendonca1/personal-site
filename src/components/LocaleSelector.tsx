'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocaleTransition } from './LocaleTransitionProvider';
import { useTranslations } from '@/contexts/TranslationContext';
import { locales, type Locale } from '@/i18n/config';

const localeDisplay: Record<Locale, { prefix: string; flag: string; label: string }> = {
  'pt-br': { prefix: 'PT', flag: '/flags/brazil.svg', label: 'Brazil' },
  en: { prefix: 'EN', flag: '/flags/united-states.svg', label: 'United States' },
};

const updateLocaleCookie = (doc: Document, win: Window, targetLocale: Locale) => {
  const maxAge = 60 * 60 * 24 * 365;
  const secureAttribute = win.location.protocol === 'https:' ? '; Secure' : '';
  doc.cookie = `locale=${targetLocale}; path=/; max-age=${maxAge}; SameSite=Lax${secureAttribute}`;
};

export default function LocaleSelector() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { locale } = useTranslations();
  const { animateLocaleChange, isLocaleTransitioning } = useLocaleTransition();
  const router = useRouter();
  const currentLocaleDisplay = localeDisplay[locale];

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
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!isDropdownOpen) {
        return;
      }
      const target = event.target as HTMLElement;
      if (!target.closest('[data-locale-dropdown]')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('pointerdown', handleOutsideClick);
    return () => {
      document.removeEventListener('pointerdown', handleOutsideClick);
    };
  }, [isDropdownOpen]);

  return (
    <div data-locale-dropdown className="relative">
      <button
        type="button"
        aria-label="Change language"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        disabled={isLocaleTransitioning}
        className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-sm uppercase tracking-[0.5em] transition hover:border-[var(--text-primary)] focus-visible:outline focus-visible:outline-[var(--text-primary)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <img
          src={currentLocaleDisplay.flag}
          alt={`${currentLocaleDisplay.label} flag`}
          className="h-5 w-auto"
          width={18}
          height={12}
        />
      </button>

      {isDropdownOpen && (
        <ul className="absolute right-0 bottom-full mb-2 w-28 rounded-xl border border-[var(--border)] bg-[var(--surface)] py-1 text-[var(--text-primary)] shadow-lg">
          {locales.map((option) => {
            const display = localeDisplay[option];
            const isCurrent = option === locale;
            return (
              <li key={option}>
                <button
                  type="button"
                  onClick={() => handleLocaleChange(option)}
                  className={`flex w-full items-center gap-2 px-3 py-1 text-sm uppercase tracking-[0.35em] transition ${
                    isCurrent ? 'cursor-default opacity-60' : 'hover:bg-[var(--background)]'
                  }`}
                >
                  <img
                    src={display.flag}
                    alt={`${display.label} flag`}
                    className="h-5 w-auto"
                    width={18}
                    height={12}
                  />
                  <span className="font-semibold leading-none">{display.prefix}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
