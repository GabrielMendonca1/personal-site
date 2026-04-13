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
            <div className="flex items-center gap-4">
              <svg
                width="24"
                height="24"
                viewBox="-5 -10 110 115"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M50 2L2 98H98L50 2Z"
                  stroke="var(--text-primary)"
                  strokeWidth="13"
                  strokeLinejoin="miter"
                  strokeMiterlimit="20"
                  fill="none"
                />
              </svg>
              <a
                href="https://arc-corporation.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center justify-center w-10 h-10 -m-2 hover:opacity-70 transition-opacity"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <g clipPath="url(#arc-clip)">
                    <path
                      d="M64 32C64 49.6731 49.6731 64 32 64C14.3269 64 0 49.6731 0 32C0 14.3269 14.3269 0 32 0C49.6731 0 64 14.3269 64 32ZM3.088 32C3.088 48.436 15.564 58.76 32 58.76C48.436 58.76 59.952 48.064 60.976 32C62 15.936 49.216 0 32 0.32C15.872 -0.512 2 15.296 3.088 32Z"
                      fill="var(--text-primary)"
                    />
                  </g>
                  <defs>
                    <clipPath id="arc-clip">
                      <rect width="64" height="64" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </a>
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
