/**
 * Structured data (schema.org JSON-LD) for search engines. Facts only, taken
 * from the company data shown on /empresa/ and the legal notice; not visible copy.
 */
export const org = {
  name: 'Piroliswiss',
  legalName: 'Piroliswiss S.R.L.',
  email: 'sales@piroliswiss.com',
  address: {
    streetAddress: 'Calle Clara 2885',
    addressLocality: 'Santa Cruz de la Sierra',
    addressRegion: 'Santa Cruz',
    addressCountry: 'BO',
  },
  languages: ['es', 'pt', 'en', 'zh'],
};

interface Crumb { name: string; url: string }

export function jsonLd(opts: { site: string; url: string; lang: string; description: string; logo: string; crumbs?: Crumb[] }) {
  const orgId = `${opts.site}#org`;
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Organization',
      '@id': orgId,
      name: org.name,
      legalName: org.legalName,
      url: opts.site,
      logo: opts.logo,
      email: org.email,
      description: opts.description,
      address: { '@type': 'PostalAddress', ...org.address },
      contactPoint: [{ '@type': 'ContactPoint', contactType: 'sales', email: org.email, availableLanguage: org.languages }],
    },
    {
      '@type': 'WebSite',
      '@id': `${opts.site}#website`,
      name: org.name,
      url: opts.site,
      inLanguage: opts.lang,
      publisher: { '@id': orgId },
    },
  ];
  if (opts.crumbs?.length) {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: opts.crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.url })),
    });
  }
  // escape "<" so the JSON can never close the script tag
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
}
