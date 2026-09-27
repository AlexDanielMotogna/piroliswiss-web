import type { CollectionEntry } from 'astro:content';

export type Home = CollectionEntry<'home'>['data'];
export type Ui = CollectionEntry<'ui'>['data'];
export type Company = CollectionEntry<'company'>['data'];
export type Fichas = CollectionEntry<'fichas'>['data'];
