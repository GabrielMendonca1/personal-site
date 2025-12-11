'use client';

import { useEffect, useRef, useState } from 'react';
import ContactModal from './ContactModal';
import { useTranslations } from '@/contexts/TranslationContext';

export default function Header() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { dictionary } = useTranslations();
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

          <button
            type="button"
            onClick={() => setIsContactModalOpen(true)}
            className="bg-[var(--text-primary)] text-[var(--background)] px-4 py-1 rounded-full text-sm font-bold hover:opacity-80 transition-opacity"
          >
            {dictionary.header.contactCta}
          </button>
        </div>
      </header>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  );
}
