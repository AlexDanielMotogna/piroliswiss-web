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

/** Short label shown in the language switcher. */
export const switchLabel: Record<Locale, string> = {
  es: 'ES',
  pt: 'PT',
  en: 'EN',
  zh: '中文',
};

/** Root path of a locale; Spanish is served at "/". */
export function localeRoot(locale: Locale): string {
  return locale === defaultLocale ? '/' : `/${locale}/`;
}
