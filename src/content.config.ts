import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Every locale file must match the same strict shape, so a missing
// translation fails the build instead of rendering an empty slot.
const text = z.string().min(1);
const imgKey = text; // file name in src/assets/img without extension
const link = z.object({ href: text, label: text }).strict();
const titled = z.object({ title: text, text: text }).strict();

/** A value that may still be missing: rendered as an ember [placeholder]. */
const cell = z
  .object({
    v: z.string().optional(),
    unit: z.string().optional(),
    tbc: z.string().optional(),
    note: z.string().optional(),
  })
  .strict();

const product = z
  .object({
    id: text,
    img: imgKey,
    alt: text,
    navLabel: text,
    tag: text,
    title: text,
    desc: text,
    featLabel: text,
    features: z.array(text).min(1),
    specLabel: z.string().optional(),
    spec: z.array(z.object({ k: text, ...cell.shape }).strict()).optional(),
    appLabel: text,
    app: text,
    output: cell.optional(),
    outputLabel: z.string().optional(),
    cta: text,
    woodsLink: z.string().optional(),
  })
  .strict();

const ui = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/ui' }),
  schema: z
    .object({
      skip: text,
      home: text,
      nav: z.array(link).length(6),
      navLabel: text,
      menu: text,
      langLabel: text,
      requestCta: text,
      footer: z
        .object({
          about: text,
          markAlt: text,
          columns: z.array(z.object({ title: text, links: z.array(link) }).strict()).length(2),
          contact: z.object({ title: text, city: text, email: text, address: text, phone: text }).strict(),
          copyright: text,
          imprint: text,
          privacy: text,
        })
        .strict(),
    })
    .strict(),
});

const home = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/home' }),
  schema: z
    .object({
      meta: z.object({ title: text, description: text }).strict(),
      hero: z
        .object({
          img: imgKey,
          alt: text,
          title: text,
          sub: text,
          secondary: text,
        })
        .strict(),
      plant: z
        .object({
          figure: text,
          unit: text,
          figureLabel: text,
          facts: z.array(text).min(2).max(5),
        })
        .strict(),
      problems: z
        .object({
          label: text,
          title: text,
          items: z.array(z.object({ img: imgKey, alt: text, title: text, text: text }).strict()).length(3),
          solutionLabel: text,
          solutions: z
            .array(z.object({ icon: z.enum(['residue', 'supply', 'agro']), title: text, text: text }).strict())
            .length(3),
        })
        .strict(),
      products: z
        .object({
          label: text,
          title: text,
          lede: text,
          indexLabel: text,
          items: z.array(product).length(3),
        })
        .strict(),
      process: z
        .object({
          label: text,
          title: text,
          lede: text,
          ui: z
            .object({
              stage: text, chimney: text, retort: text, condenser: text, acid: text,
              burner: text, gasOut: text, returnGas: text, phase: text, outputs: text, reads: text, door: text,
              note: text, aria: text, phasesLabel: text,
            })
            .strict(),
          outputs: z.object({ steam: text, acid: text, gas: text, gasres: text, charcoal: text }).strict(),
          bracket: text,
          phases: z.array(z.object({ name: text, range: text, text: text, wood: text }).strict()).length(4),
        })
        .strict(),
      control: z
        .object({
          label: text,
          title: text,
          lede: text,
          slides: z.array(z.object({ img: imgKey, label: text, alt: text }).strict()).min(1),
          points: z.array(titled).length(4),
          note: text,
        })
        .strict(),
      model: z
        .object({
          label: text,
          title: text,
          lede: text,
          steps: z.array(z.object({ img: imgKey, alt: text, title: text, text: text }).strict()).length(5),
        })
        .strict(),
      compare: z
        .object({
          img: imgKey,
          alt: text,
          caption: text,
          label: text,
          title: text,
          rowHead: text,
          us: text,
          them: text,
          rows: z.array(z.object({ k: text, us: text, them: text }).strict()).min(1),
        })
        .strict(),
      ops: z
        .object({
          label: text,
          title: text,
          photos: z.array(z.object({ img: imgKey, alt: text }).strict()).length(5),
        })
        .strict(),
      scale: z
        .object({
          label: text,
          title: text,
          lede: text,
          head: z.array(text).length(3),
          unit: text,
          rows: z.array(z.object({ k: text, plant: text, five: text }).strict()).length(3),
          phases: z
            .array(z.object({ img: imgKey, alt: text, tag: text, planned: z.boolean(), title: text, text: text }).strict())
            .length(2),
        })
        .strict(),
      request: z
        .object({
          label: text,
          title: text,
          text: text,
          fields: z
            .object({
              company: text,
              country: text,
              email: text,
              product: text,
              volume: text,
              incoterm: text,
              message: text,
            })
            .strict(),
          productOptions: z.array(z.object({ value: text, label: text }).strict()).min(1),
          volumeOptions: z.array(text).min(1),
          incotermOptions: z.array(text).min(1),
          submit: text,
          note: text,
          error: text,
          done: text,
        })
        .strict(),
    })
    .strict(),
});

const company = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/company' }),
  schema: z
    .object({
      meta: z.object({ title: text, description: text }).strict(),
      intro: z
        .object({
          label: text,
          title: text,
          items: z.array(z.object({ label: text, text: text }).strict()).length(3),
        })
        .strict(),
      team: z
        .object({
          label: text,
          title: text,
          photo: text,
          members: z.array(z.object({ name: text, role: text, email: z.email() }).strict()).min(1),
        })
        .strict(),
      facts: z.object({ label: text, rows: z.array(z.object({ k: text, ...cell.shape }).strict()) }).strict(),
      cta: z.object({ title: text, text: text }).strict(),
    })
    .strict(),
});

const woods = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/woods' }),
  schema: z
    .object({
      meta: z.object({ title: text, description: text }).strict(),
      intro: z.object({ label: text, title: text, lede: text }).strict(),
      pending: text,
      species: z
        .array(
          z
            .object({
              id: text,
              name: text,
              // species without a datasheet yet only carry id + name
              scientific: z.string().optional(),
              keyLabel: z.string().optional(),
              key: z.array(z.object({ label: text, v: text, unit: text }).strict()).optional(),
              sections: z.array(z.object({ title: text, rows: z.array(z.object({ k: text, v: text }).strict()) }).strict()).optional(),
              usesLabel: z.string().optional(),
              uses: z.array(text).optional(),
              sourcesLabel: z.string().optional(),
              sources: z.array(z.object({ label: text, text: text }).strict()).optional(),
              legend: z.string().optional(),
            })
            .strict(),
        )
        .min(1),
      cta: z.object({ title: text, text: text }).strict(),
    })
    .strict(),
});

export const collections = { ui, home, company, woods };
