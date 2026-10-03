/**
 * Structured data (schema.org JSON-LD) for search engines. Facts only, taken
 * from the company data shown on /empresa/ and the legal notice; not visible copy.
 */
/** Google Analytics 4 measurement ID (stream https://www.piroliswiss.com, 2026-10-01). */
export const GA_ID = 'G-9TN0VX7TGH';

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

/** Founders (team on /empresa/), so search engines link the company to its people. */
export const founders = [
  { id: 'frederico-zwald', name: 'Frederico Zwald', jobTitle: 'Founder & CEO', linkedin: 'https://www.linkedin.com/in/frederico-zwald-aa6618306/' },
  { id: 'christian-vargas', name: 'Christian Vargas', jobTitle: 'Co-Founder & CFO', linkedin: 'https://www.linkedin.com/in/christian-vargas-gonzales-032857169/' },
  { id: 'alex-motogna', name: 'Alex Motogna', jobTitle: 'Co-Founder & CTO', linkedin: 'https://www.linkedin.com/in/alex-daniel-motogna-96a519137/' },
];

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
      founder: founders.map((f) => ({ '@id': `${opts.site}#${f.id}` })),
    },
    ...founders.map((f) => ({
      '@type': 'Person',
      '@id': `${opts.site}#${f.id}`,
      name: f.name,
      jobTitle: f.jobTitle,
      worksFor: { '@id': orgId },
      sameAs: [f.linkedin],
    })),
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
