export const locales = ["pt", "en"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: unknown): value is Locale {
  return value === "pt" || value === "en";
}

export function preferredLocale(acceptLanguage: string | null, preference?: string): Locale {
  if (isLocale(preference)) return preference;
  const languages = (acceptLanguage ?? "").split(",").map((entry, index) => {
    const [tag, ...parameters] = entry.trim().toLowerCase().split(";");
    const quality = parameters.find((part) => part.trim().startsWith("q="));
    const q = quality === undefined ? 1 : Number(quality.trim().slice(2));
    return { locale: tag.split("-")[0], q, index };
  }).filter(({ q }) => Number.isFinite(q) && q > 0 && q <= 1)
    .sort((a, b) => b.q - a.q || a.index - b.index);
  return languages.find(({ locale }) => isLocale(locale))?.locale as Locale | undefined ?? "en";
}

export const siteUrl = process.env.SITE_URL || "https://gabrielrm.org";

export const copy = {
  pt: {
    description: "Engenheiro de Software e IA de Salvador, Brasil. Fundador da ARCA, construindo sistemas de IA aplicada para o mundo real.",
    writing: "Textos", draft: "Rascunho", index: "Índice", back: "Voltar ao índice",
    sections: "Seções", navigation: "Navegação do artigo", language: "Idioma",
    lastEdited: "Última edição", workingDraft: "Rascunho em andamento", retrospective: "Retrospectiva",
    published: "Publicado", reading: "min de leitura", location: "em Salvador, Brasil",
  },
  en: {
    description: "Software and AI Engineer from Salvador, Brazil. Founder of ARCA, building applied AI systems for the real world.",
    writing: "Writing", draft: "Draft", index: "Index", back: "Back to index",
    sections: "Sections", navigation: "Article navigation", language: "Language",
    lastEdited: "Last edited", workingDraft: "Working draft", retrospective: "Retrospective",
    published: "Published", reading: "min read", location: "in Salvador, Brazil",
  },
} as const;

