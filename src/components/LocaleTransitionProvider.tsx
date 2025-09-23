'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useTranslations } from '@/contexts/TranslationContext';

type LocaleTransitionContextValue = {
  animateLocaleChange: () => Promise<void>;
  isLocaleTransitioning: boolean;
};

const LocaleTransitionContext =
  createContext<LocaleTransitionContextValue | null>(null);

export function LocaleTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fallbackTimerRef = useRef<number | null>(null);
  const isAnimatingRef = useRef(false);
  const [isLocaleTransitioning, setIsLocaleTransitioning] = useState(false);
  const hasMountedRef = useRef(false);
  const { locale } = useTranslations();

  const clearFallbackTimer = useCallback(() => {
    if (fallbackTimerRef.current !== null) {
      window.clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      clearFallbackTimer();
    };
  }, [clearFallbackTimer]);

  const animateLocaleChange = useCallback(() => {
    const node = containerRef.current;
    if (!node) {
      return Promise.resolve();
    }

    if (isAnimatingRef.current) {
      return Promise.resolve();
    }

    isAnimatingRef.current = true;
    setIsLocaleTransitioning(true);
    node.classList.add('locale-transition');

    return new Promise<void>((resolve) => {
      const cleanup = () => {
        node.removeEventListener('transitionend', handleTransitionEnd);
        clearFallbackTimer();
        resolve();
      };

      const handleTransitionEnd = (event: TransitionEvent) => {
        if (event.target !== node || event.propertyName !== 'opacity') {
          return;
        }
        cleanup();
      };

      node.addEventListener('transitionend', handleTransitionEnd);

      fallbackTimerRef.current = window.setTimeout(() => {
        cleanup();
      }, 360);

      requestAnimationFrame(() => {
        node.classList.add('locale-transition--hidden');
      });
    }).finally(() => {
      isAnimatingRef.current = false;
      setIsLocaleTransitioning(false);
    });
  }, [clearFallbackTimer]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) {
      return;
    }

    node.classList.add('locale-transition');

    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      node.classList.remove('locale-transition--hidden');
      return;
    }

    node.classList.add('locale-transition--hidden');

    const frame = requestAnimationFrame(() => {
      node.classList.remove('locale-transition--hidden');
    });

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [locale]);

  return (
    <LocaleTransitionContext.Provider
      value={{ animateLocaleChange, isLocaleTransitioning }}
    >
      <div ref={containerRef} className="locale-transition locale-transition-wrapper">
        {children}
      </div>
    </LocaleTransitionContext.Provider>
  );
}

export function useLocaleTransition() {
  const context = useContext(LocaleTransitionContext);

  if (!context) {
    throw new Error(
      'useLocaleTransition must be used within a LocaleTransitionProvider',
    );
  }

  return context;
}
