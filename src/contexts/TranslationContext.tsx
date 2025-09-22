'use client';

import { createContext, useContext } from 'react';
import type { Dictionary } from '@/i18n/types';
import type { Locale } from '@/i18n/config';

type TranslationContextValue = {
  locale: Locale;
  dictionary: Dictionary;
};

const TranslationContext = createContext<TranslationContextValue | null>(null);

export function TranslationProvider({
  locale,
  dictionary,
  children,
}: {
  locale: Locale;
  dictionary: Dictionary;
  children: React.ReactNode;
}) {
  return (
    <TranslationContext.Provider value={{ locale, dictionary }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslations() {
  const context = useContext(TranslationContext);

  if (!context) {
    throw new Error('useTranslations must be used within a TranslationProvider');
  }

  return context;
}
