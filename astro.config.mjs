// @ts-check
import { defineConfig } from 'astro/config';

/** @type {Record<string, string | undefined>} */
const env = /** @type {any} */ (globalThis).process?.env ?? {};

// SITE_URL overrides; on Railway use its public domain until piroliswiss.com is live.
const site =
  env.SITE_URL ??
  (env.RAILWAY_PUBLIC_DOMAIN ? `https://${env.RAILWAY_PUBLIC_DOMAIN}` : 'https://piroliswiss.com');

export default defineConfig({
  site,
  output: 'static',
  // The woods page became /fichas-tecnicas/ (Spanish only).
  redirects: {
    '/maderas': '/fichas-tecnicas',
    '/pt/madeiras': '/fichas-tecnicas',
    '/en/woods': '/fichas-tecnicas',
    '/zh/woods': '/fichas-tecnicas',
  },
  // `astro preview` serves dist/ on Railway; allow its generated domain.
  server: { host: true, allowedHosts: true },
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'pt', 'en', 'zh'],
    routing: { prefixDefaultLocale: false },
  },
});
