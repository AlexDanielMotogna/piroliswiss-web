# Piroliswiss website

Corporate B2B site for Piroliswiss S.R.L. (Santa Cruz de la Sierra, Bolivia): producer and exporter of hardwood lump charcoal, pyroligneous acid and charcoal briquettes, made in metal retorts from licensed forest residue.

## Read first
- `docs/BRIEF.md`: sitemap, page-by-page content, design tokens, launch checklist. Source of truth.
- `prototype/index.html`: approved homepage design. Match it pixel-for-pixel when porting; reuse its CSS tokens and component patterns for every other page.
- `prototype/img/`: approved photos. Use only these (or files the user adds later).

## Stack
- Astro (static output), TypeScript, plain CSS with custom properties in `src/styles/tokens.css`. No Tailwind, no component libraries, no icon packs.
- Fonts: Geist (brand font, display + body; headlines weight 600, letter-spacing -0.04em) and Geist Mono (labels/specs), self-hosted from `public/fonts/`. Geist Mono has a slashed zero; the mono stack starts with "Geist Digits" (digits 0–9 from Geist Sans) so every number shows an open 0. Keep it that way.
- i18n: Spanish (default) at `/`, Brazilian Portuguese at `/pt/`, English at `/en/`, Simplified Chinese at `/zh/`. Page URLs per locale live in `src/i18n/locales.ts` (`pages`); company page: `/empresa/`, `/pt/empresa/`, `/en/company/`, `/zh/company/`. Content links use `"#section"` (homepage) or `"company#team"` and go through `resolveHref`. Language switcher is a dropdown. All copy lives in content collections (`src/content/{home,company,ui}/<locale>.json`), never hard-coded in components. The schema in `src/content.config.ts` is strict, so a missing key in any language fails the build. Numbers follow each locale (es/pt: `12,97`; en/zh: `12.97`).
- Images through `astro:assets` (AVIF/WebP, responsive `srcset`).

## Design rules (non-negotiable)
- Square corners, except the application cards in Products (white, 10px radius, owner request). No box-shadows. No gradients except photo scrims and the pyrolysis scale.
- No icons, emoji or illustration, except the three custom line icons in "Our solution" (`SolutionIcon.astro`, owner request). Never use icon packs. Structure comes from type, rules and tables.
- Left-aligned layouts on a 12-column grid. Nothing centred except where the prototype does it.
- Brand colours come from the logo (2026-09-26): flag red `--red` #D40000 and leaf green `--leaf` #769B17, with deep olive `--olive` for bands (plant sheet, request form, CTA). Red is for primary buttons, the small square before section labels, step and product numbers, hover and the carbonisation segment; use it sparingly, never for body text. Green for the wordmark, "our" column in comparisons and application notes.
- Ember orange (`--ember`) is only for temperatures and `[missing data]` placeholders.
- Numbered markers only where the order is real (the 5 supply stages).
- Every page must work at 360 px wide without horizontal scroll, and in light and dark mode.

## Content rules
- Never invent facts, figures, names, emails, certifications or quotes. Missing data stays as a visible placeholder: `<span class="tbc">[lab value]</span>`.
- Never publish coordinates, parcel maps, landowner names, permit numbers or the forest census.
- Renders must carry the tag "Planned · Rendering".
- Product copy (description + key characteristics) comes from the client deck and is already in the prototype. Do not add new claims. The wood vinegar claims (insect repellent, fungi control) are pending legal review for the target market.
- Specs are typical values from the owners' previous production, not a lab report: always label them "Typical specification".
- Capacity is always shown as "+1,800 t / month" per plant (never t/day) and always marked projected. Plant 1 is in development, not in production.
- Feedstock: say "collection of wood and forest residue from authorised areas / authorised land-use change". Do not lead with "clearing / desmonte", but never claim the biomass comes from anywhere else.

## Workflow
- Build page by page in sitemap order. After each page: `npm run build`, check for errors, then stop and summarise what's done and which placeholders remain.
- Never publish prices, profits, ROI, equity split or investment terms. Owners decided (2026-09-26): no investors section on the public site.
- Keep components small: `Header`, `Footer`, `Hero`, `SpecStrip`, `SectionHead`, `SpecTable`, `PyrolysisScale`, `StageList`, `CompareTable`, `PhotoStrip`, `Phase`, `ScaleTable`, `RequestForm`.
