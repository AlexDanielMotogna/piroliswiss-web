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
    caption: text,
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
          location: z.array(text).length(2),
          eyebrow: text,
          title: text,
          sub: text,
          secondary: text,
        })
        .strict(),
      specs: z.array(z.object({ label: text, v: text, unit: z.string().optional() }).strict()).length(4),
      about: z
        .object({
          label: text,
          title: text,
          items: z.array(z.object({ label: text, text: text }).strict()).length(3),
        })
        .strict(),
      problems: z
        .object({
          label: text,
          title: text,
          items: z.array(z.object({ img: imgKey, alt: text, title: text, text: text }).strict()).length(4),
          solutionLabel: text,
          solutions: z.array(titled).length(3),
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
          aria: text,
          unit: text,
          stages: z.array(z.object({ name: text, range: text }).strict()).length(4),
          bracket: text,
          gaugeAlt: text,
          gaugeCaption: text,
          notes: z.array(titled).length(3),
        })
        .strict(),
      model: z
        .object({
          label: text,
          title: text,
          lede: text,
          steps: z.array(z.object({ img: imgKey, alt: text, title: text, text: text }).strict()).length(6),
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
          photos: z.array(z.object({ img: imgKey, alt: text, caption: text }).strict()).length(5),
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
            .array(z.object({ img: imgKey, alt: text, tag: text, planned: z.boolean(), title: text }).strict())
            .length(2),
        })
        .strict(),
      investors: z
        .object({
          label: text,
          title: text,
          lede: text,
          oppLabel: text,
          opportunity: z.array(text).min(1),
          structLabel: text,
          structure: z.array(z.object({ k: text, v: text }).strict()),
          note: text,
          ctaText: text,
          cta: text,
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

export const collections = { ui, home };
