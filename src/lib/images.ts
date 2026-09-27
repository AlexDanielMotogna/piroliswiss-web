import type { ImageMetadata } from 'astro';

// Images live in src/assets/img, optionally in section subfolders
// (e.g. "04-productos/acido-pirolenoso"). The key is the path below
// src/assets/img without the extension.
const files = import.meta.glob<{ default: ImageMetadata }>('../assets/img/**/*.{jpg,jpeg,png,webp}', { eager: true });

const byKey: Record<string, ImageMetadata> = Object.fromEntries(
  Object.entries(files).map(([path, mod]) => [path.replace('../assets/img/', '').replace(/\.\w+$/, ''), mod.default]),
);

/** Looks up an approved photo by its key (file name without extension, with subfolder if any). */
export function img(key: string): ImageMetadata {
  const found = byKey[key];
  if (!found) throw new Error(`Unknown image "${key}". Add it to src/assets/img.`);
  return found;
}
