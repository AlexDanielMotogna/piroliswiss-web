import type { CollectionEntry } from 'astro:content';

export type Home = CollectionEntry<'home'>['data'];
export type Ui = CollectionEntry<'ui'>['data'];
