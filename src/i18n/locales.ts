export const locales = ['es', 'pt', 'en', 'zh'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'es';

/** Value for <html lang> and hreflang. */
export const htmlLang: Record<Locale, string> = {
  es: 'es',
  pt: 'pt-BR',
  en: 'en',
  zh: 'zh-Hans',
};

/** Short code shown on the language button. */
export const switchLabel: Record<Locale, string> = {
  es: 'ES',
  pt: 'PT',
  en: 'EN',
  zh: '中文',
};

/** Language name, written in that language, for the dropdown. */
export const langName: Record<Locale, string> = {
  es: 'Español',
  pt: 'Português',
  en: 'English',
  zh: '中文',
};

/** Every page and its URL per locale. Spanish is served without a prefix. */
export const pages = {
  home: { es: '/', pt: '/pt/', en: '/en/', zh: '/zh/' },
  company: { es: '/empresa/', pt: '/pt/empresa/', en: '/en/company/', zh: '/zh/company/' },
} as const satisfies Record<string, Record<Locale, string>>;
export type PageKey = keyof typeof pages;

export function pagePath(page: PageKey, locale: Locale): string {
  return pages[page][locale];
}

export function localeRoot(locale: Locale): string {
  return pagePath('home', locale);
}

/**
 * Resolves a content link: "#products" points at a homepage section,
 * "company" or "company#team" at another page.
 */
export function resolveHref(href: string, locale: Locale): string {
  const [page, hash] = href.split('#');
  const base = page ? pagePath(page as PageKey, locale) : localeRoot(locale);
  return hash ? `${base}#${hash}` : base;
}
