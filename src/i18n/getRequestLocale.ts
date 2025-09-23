import { cookies } from 'next/headers';
import { defaultLocale, locales, type Locale } from './config';

function resolveLocale(candidate?: string | null): Locale {
  if (!candidate) {
    return defaultLocale;
  }

  const normalized = candidate.toLowerCase();
  return locales.includes(normalized as Locale)
    ? (normalized as Locale)
    : defaultLocale;
}

export async function getRequestLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get('locale');
  return resolveLocale(localeCookie?.value ?? null);
}
