import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/img/*.{jpg,jpeg,png,webp}', { eager: true });

const byKey: Record<string, ImageMetadata> = Object.fromEntries(
  Object.entries(files).map(([path, mod]) => [path.split('/').pop()!.replace(/\.\w+$/, ''), mod.default]),
);

/** Looks up an approved photo by file name (without extension). */
export function img(key: string): ImageMetadata {
  const found = byKey[key];
  if (!found) throw new Error(`Unknown image "${key}". Add it to src/assets/img.`);
  return found;
}
