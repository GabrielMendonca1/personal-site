import { defaultLocale, type Locale } from "./config";
import type { Dictionary } from "./types";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  "pt-br": () => import("./locales/pt-br").then((module) => module.dictionary),
  en: () => import("./locales/en").then((module) => module.dictionary),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const loadDictionary = dictionaries[locale] ?? dictionaries[defaultLocale];
  return loadDictionary();
}
