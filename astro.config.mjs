// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Placeholder until the domain is registered (see docs/BRIEF.md, "Before launch").
  site: 'https://www.example.com',
  output: 'static',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'pt', 'en', 'zh'],
    routing: { prefixDefaultLocale: false },
  },
});
