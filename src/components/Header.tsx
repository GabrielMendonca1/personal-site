'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import ContactModal from './ContactModal';
import { useLocaleTransition } from '@/components/LocaleTransitionProvider';
import { useTranslations } from '@/contexts/TranslationContext';
import { locales, type Locale } from '@/i18n/config';

export default function Header() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isLocaleDropdownOpen, setIsLocaleDropdownOpen] = useState(false);
  const { dictionary, locale } = useTranslations();
  const localeDisplay: Record<
    Locale,
    { prefix: string; flag: string; label: string }
  > = {
    'pt-br': { prefix: 'PT', flag: '/flags/brazil.svg', label: 'Brazil' },
    en: { prefix: 'EN', flag: '/flags/united-states.svg', label: 'United States' },
  };
  const currentLocaleDisplay = localeDisplay[locale];
  const { animateLocaleChange, isLocaleTransitioning } = useLocaleTransition();
  const router = useRouter();
  const headerRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY.current;
      const isScrollingUp = currentScrollY < lastScrollY.current;

      lastScrollY.current = currentScrollY;

      setIsHeaderVisible((previouslyVisible) => {
        if (isScrollingDown && currentScrollY > 80 && previouslyVisible) {
          return false;
        }

        if (isScrollingUp && !previouslyVisible) {
          return true;
        }

        return previouslyVisible;
      });
    };

    const isInteractiveElement = (target: EventTarget | null) => {
      if (!(target instanceof Element)) {
        return false;
      }
      return Boolean(
        target.closest('button,a,input,textarea,select,[role="button"]'),
      );
    };

    const handleInteraction = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (headerRef.current?.contains(target) || isInteractiveElement(target)) {
        return;
      }
      lastScrollY.current = window.scrollY;
      setIsHeaderVisible((previouslyVisible) => !previouslyVisible);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('pointerdown', handleInteraction);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('pointerdown', handleInteraction);
    };
  }, []);

  const updateLocaleCookie = (doc: Document, win: Window, targetLocale: Locale) => {
    const maxAge = 60 * 60 * 24 * 365;
    const secureAttribute = win.location.protocol === 'https:' ? '; Secure' : '';
    doc.cookie = `locale=${targetLocale}; path=/; max-age=${maxAge}; SameSite=Lax${secureAttribute}`;
  };

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

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!isLocaleDropdownOpen) {
        return;
      }
      const target = event.target as HTMLElement;
      if (!target.closest('[data-locale-dropdown]')) {
        setIsLocaleDropdownOpen(false);
      }
    };

    document.addEventListener('pointerdown', handleOutsideClick);
    return () => {
      document.removeEventListener('pointerdown', handleOutsideClick);
    };
  }, [isLocaleDropdownOpen]);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed bg-[var(--background)] top-0 left-0 right-0 z-50 p-4 px-8 transition-transform duration-300 will-change-transform ${
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-4xl mx-auto flex justify-between items-center gap-4">
          <h1 className="text-[var(--text-primary)] font-bold">
            <div className="group flex items-center gap-3">
              <span
                aria-hidden="true"
                className="relative inline-flex h-4 w-5 items-center justify-center overflow-hidden"
              >
                <span
                  className="absolute inset-0 bg-[var(--text-primary)] transition-transform duration-500"
                  style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
                />
              </span>

              <span className="text-[var(--text-primary)] text-sm uppercase tracking-[0.4em] transform -translate-x-4 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                {dictionary.layout.brandName}
              </span>
            </div>
            <span className="sr-only">{dictionary.layout.brandName}</span>
          </h1>

          <div className="flex items-center gap-2">
            <div data-locale-dropdown className="relative">
              <button
                type="button"
                aria-label="Change language"
                onClick={() => setIsLocaleDropdownOpen((prev) => !prev)}
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

              {isLocaleDropdownOpen && (
                <ul className="absolute right-0 mt-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-lg w-28 py-1 text-[var(--text-primary)]">
                  {locales.map((option) => {
                    const display = localeDisplay[option];
                    const isCurrent = option === locale;
                    return (
                      <li key={option}>
                        <button
                          type="button"
                          onClick={() => {
                            handleLocaleChange(option);
                            setIsLocaleDropdownOpen(false);
                          }}
                          className={`flex w-full items-center gap-2 px-3 py-1 text-sm uppercase tracking-[0.35em] transition ${
                            isCurrent
                              ? 'cursor-default opacity-60'
                              : 'hover:bg-[var(--background)]'
                          }`}
                        >
                          <img
                            src={display.flag}
                            alt={`${display.label} flag`}
                            className="h-5 w-auto"
                            width={18}
                            height={12}
                          />
                          <span className="font-semibold leading-none">
                            {display.prefix}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <button
              type="button"
              onClick={() => setIsContactModalOpen(true)}
              className="bg-[var(--text-primary)] text-[var(--background)] px-4 py-1 rounded-full text-sm font-bold hover:opacity-80 transition-opacity"
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
