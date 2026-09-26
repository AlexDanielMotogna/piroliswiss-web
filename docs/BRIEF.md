# Piroliswiss Website Brief

Source of truth for content and structure. Live version: https://claude.ai/code/artifact/f3a78453-50ba-4380-bf14-4e7c57bfd4e7

## 1. Source deck verdict

The 77-page deck is a strong field record but a weak sales document. The site inverts that: product data and process first, camp photos last.

**Usable:** problem framing (residue burned in the field, costly licensed clearing (PDM), hardwood supply pressure from Brazilian pulp mills); the 5-stage operating model; real field photography; specs (fixed carbon 80–85 %, species Curupaú, Soto, Cuchi).

**Must NOT go on the public site**

| Deck content | Why |
| --- | --- |
| Wood Vinegar bottle (p. 8) | Third-party brand (Ryzome) |
| Briquette photo (p. 9), contract-signing photo (p. 26) | Stock/AI images |
| INRA/SINACAR screenshots, GEE code, coordinates, parcel maps (p. 11–19) | Identifies landowners and parcels |
| Forest census table (p. 20) | Commercially sensitive |
| ABT permit numbers (p. 3) | On request only |
| Tents, beds, toilets, pickups (p. 29–44) | Reads as a startup camp; max 1–2 on Operations |
| Retort-plant renders (p. 74–76) | Only with the label "Planned · Rendering" |

**Missing (placeholders in the prototype, shown as `[…]` in ember):** lab certificate (fixed carbon, moisture, ash, volatiles, kcal/kg, grading); monthly capacity now and target; exact region and registrations; packaging, Incoterms, ports; team; function emails.

**Brand risk:** Swiss cross on a Bolivian product (Swissness rules, Coat of Arms Protection Act). Header uses the wordmark without the cross until a lawyer confirms.

## 2. Positioning and audiences

One job: get a qualified buyer to request the specification sheet.

Positioning line: Premium hardwood charcoal made from licensed forest residue, in controlled metal retorts, with a traceable supply chain.

Proof pillars, in order: Product → Process → Provenance.

| Audience | Looks for | Lands on |
| --- | --- | --- |
| Industrial buyers (steel, silicon, metallurgy) | Fixed carbon, ash, size, t/month, continuity | Products → Charcoal |
| Export distributors (Brazil, Asia, BBQ/restaurant) | Species, packaging, Incoterms, certificates | Products, Export |
| Investors and partners | Model, capacity roadmap, team, legal standing | Operations |
| Landowners with approved clearing (PDM) | How the agreement works | /es/propietarios |
| Agricultural buyers of wood vinegar | Application, availability | Products → Pyroligneous acid |

Languages: Spanish (default), Brazilian Portuguese, English, Simplified Chinese. The Landowners page stays Spanish-only.

## 3. Sitemap

| # | Page | URL | Purpose | Primary CTA |
| --- | --- | --- | --- | --- |
| 1 | Home | / | Thesis, proof, route each audience | Request specifications |
| 2 | Company | /company | Who, where, why Swiss, team, legal standing | Contact |
| 3 | Products | /products + /products/charcoal, /products/pyroligneous-acid, /products/briquettes | Datasheets | Request spec sheet |
| 4 | Process | /process | Pyrolysis, retort vs. brick kiln, quality control | Request lab report |
| 5 | Provenance | /provenance | 5-stage supply model, legality, satellite verification | Sourcing policy |
| 6 | Operations | /operations | Site, capacity, roadmap to 16-retort plant | Investor contact |
| 7 | Export & Logistics | /export | Packaging, volumes, Incoterms, routes, lead times | Request a quote |
| 8 | Contact | /contact | Segmented form (buyer / investor / landowner / press) | Send |
| — | Landowners | /es/propietarios | Spanish-only page for PDM holders | Solicitar evaluación |
| — | Legal | /legal, /privacy | Imprint, privacy | — |

Nav: Company · Products · Process · Provenance · Operations · Export + persistent "Request specifications" button + ES/PT/EN/中文 switch. No blog, no shop, no generic "Sustainability" page.

## 4. Page-by-page content

### Home (built in /prototype)
1. Hero: charcoal pile photo, "Hardwood charcoal from recovered forest residue.", two CTAs.
2. Spec strip: fixed carbon, species, process, feedstock.
3. The problem: three blocks with photos.
4. Products: charcoal lead with spec table; pyroligneous acid and briquettes secondary.
5. Pyrolysis scale 0–600 °C (signature element).
6. Supply model: 5 numbered stages with photos.
7. Retort vs. brick kiln table.
8. Operations photo strip.
9. Roadmap: Phase 1 operating → Phase 2 16-retort plant (render labelled).
10. Specification request form.
11. Footer.

### Company
Opening statement; why "Swiss" (real link, or rename to "Our standards"); team (founder, operations lead, forestry engineer); legal standing; static department-level map.

### Products (index + 3 datasheets, same template)
Product photo (studio + in context); spec table with test method and lab; applications; packaging and MOQ; PDF datasheet. Wood vinegar copy: "soil conditioner / biostimulant" only; no pesticide claims ("controls fungi", "repels insects") until registered.

### Process
Pyrolysis in five sentences + temperature scale; retort vs. brick kiln (yield, control, emissions, by-products, labour exposure); quality control (temperature logging, burn tests, lab per lot); video loop of a retort firing at night.

### Provenance
Stages 1–5 in detail (area selection; technical forest analysis: legal docs, satellite ETFS, field census; residue agreement; camp and equipment; production and per-lot traceability). Impact block with measured numbers only.

### Operations
Retorts count, t/month, team, energy (solar + generator); curated gallery (9–12 images); roadmap with dates and capacity.

### Export & Logistics
Formats (big-bag, 3/5/10 kg bags, briquette boxes); MOQ, t per 40' HC, lead time; Incoterms and routes; shipment documents (origin, phytosanitary, lab report).

### Contact
"I am a" selector that changes fields; function emails; phone; address; response-time commitment.

## 5. Design system

Industrial datasheet direction. Square corners, no shadows, no icons, no stock images, numbering only where order is real.

| Role | Light | Dark |
| --- | --- | --- |
| Background (mineral grey) | #E7E9E6 | #141718 |
| Surface 2 | #DCDFDB | #1C2022 |
| Text (graphite) | #15181A | #E3E6E3 |
| Secondary text (slate) | #586166 | #9AA3A6 |
| Rules | #C3C8C4 | #2E3437 |
| Brand red (logo flag) | #D40000 | #E8201A |
| Brand green (logo leaf) | #769B17; text-safe #4A650D | #A6C94A |
| Deep olive bands | #22300B | #1A240A |
| Heat accent (ember): temperatures and missing data only | #D4521C | #EE7A42 |
| Process band | #111314 | #0B0D0E |

Type: Geist (brand font from the company deck; display weight 600, letter-spacing -0.04em; body 400) · Geist Mono (labels, specs, captions; uppercase, +0.08em).

Photography: full-bleed or strict grid, no text burned in, no tilt or frames.

Logo: current file is a raster with gradients; needs a vector redraw (full lock-up + one-colour wordmark).

## 6. Before launch

- [ ] Accredited lab analysis of the charcoal
- [ ] Capacity today and Phase 2 target
- [x] Location: Santa Cruz de la Sierra, Bolivia
- [ ] Photo/video day (drone, night retorts, studio product, team)
- [ ] Own photos for pyroligneous acid and briquettes
- [ ] Team names, roles, portraits
- [ ] Legal: registrations, imprint, privacy
- [ ] Swiss cross checked by a lawyer
- [ ] Wood vinegar claims reviewed
- [ ] Vector logo
- [ ] Domain + function emails
- [x] Spanish, Portuguese and Chinese translation of the homepage (native-speaker review pending for PT and ZH)
- [ ] Landowner page (Spanish)

**Target markets:** Bolivia, Brazil (steelworks) and Asia. The EU Deforestation Regulation (EUDR) does not apply to these sales; it would only matter if charcoal were later sold to EU buyers.

## 7. Build

| Item | Decision |
| --- | --- |
| Framework | Astro (static), plain CSS with custom properties (no Tailwind, no UI kit) |
| i18n | ES default at /, PT at /pt/, EN at /en/, ZH at /zh/, hreflang |
| Content | Markdown/JSON content collections per page and product |
| Forms | Posted to HubSpot (or Formspree) via env var endpoint |
| Images | astro:assets → AVIF/WebP, hero < 250 KB |
| Analytics | Plausible; conversion = spec-sheet request |
| Quality | Lighthouse ≥ 90 on mobile, WCAG AA contrast, keyboard focus visible |

## 8. Additions from the short deck (Piroliswiss corto)

- Location: Santa Cruz de la Sierra, Bolivia.
- Who we are: industrial producer and exporter; applications metallurgical, industrial, agricultural, premium BBQ; responsible sourcing, no open burning.
- Problems: forest residue wasted; industrial charcoal shortage in Brazil (pulp demand); high farm input costs. (Plus licensed-clearing cost from the long deck.)
- Solution: residue → industrial products via controlled pyrolysis; constant supply to steelworks in Brazil and Asia; natural agricultural bio-inputs.
- Applications: charcoal → industry (iron foundry, steelmaking); pyroligneous acid → agriculture; eco briquettes → premium BBQ.
- Technology: retorts with gas recovery for self-combustion; integrated system; modular and scalable.
- Operating model (6 steps): forest study + legal confirmation → organised clearing + biomass sorting → wood processing → industrial carbonisation → by-product separation → packaging, logistics, export.
- Scale (projected, t/day per plant → 5 plants): charcoal 60 → 300; pyroligneous acid 12.97 → 64.8; briquettes 9.26 → 46.3. Project ≈ 800 ha, ≈ 1,000 operating days, independent unit.
- Structure per plant: Grupo Zwald S.R.L. 51 %, investors/partners 49 %. Zwald provides know-how and technology, clients and channels, production management and technical supervision. Equity or joint-venture.
- NOT on the public site: selling prices (236 / 650 / 500 USD/t), daily profit, 21.6 M revenue, 11 M net profit, ROI (320 % / 217 %), investor shares and payouts. These go in the investor deck under NDA.
- Deck images not used: stock/AI photos (vinegar bottle, briquettes, handshake, refinery, factory smokestacks).

## 9. Owners' answers (2026-09-26)

- No lab report. Specs are typical values from previous production: charcoal FC 80–85 %, > 7,300 kcal/kg, moisture < 5 %, fines (< 10 mm) < 4 %, size > 50 mm; briquettes FC ≥ 80 %, > 7,300 kcal/kg, moisture < 5 %, ash < 4 %, > 30 mm; pyroligneous acid pH 2.5–3.2, acidity 4–7 %, density ≥ 1.005 g/mL, ≥ 6 months maturation, filtered and decanted.
- Capacity: +1,800 t/month per plant, 16 metal retorts, projected (Plant 1 not built yet). Plant 2: 2028, Plant 3: 2029, Plants 4–5 within five years.
- Formats: bulk, big-bag 400 kg, 5/10/30 kg bags (BBQ). ≈ 22 t per 40' HC. No MOQ, Incoterms, ports or lead times on the site: private quotation only.
- Legal name: Piroliswiss S.R.L. by Grupo Zwald S.R.L. NIT pending. Office: Calle Clara 2885, Santa Cruz de la Sierra. Domain: piroliswiss.com.
- Team: Frederico Zwald (Founder & CEO), Christian Vargas (Co-Founder & CFO), Alex Motogna (Co-Founder & CTO). No portraits yet.
- No investors section (51/49, fundraising) on the public site.
- Swiss cross: owners accept it. Legal risk noted in §1 remains their decision.
- Operating model: 5 steps; step "forest study" removed, "clearing" reworded as biomass collection from the authorised area.
- Emails: office@, sales@ and personal addresses (fredericozwald@, christianvargas@, alexdanielmotogna@) at piroliswiss.com.
- Open: wood vinegar claims, phone, photo origin, vector logo, PT/ZH native review.
- Piroliswiss Control (oven-monitoring app, design in ../piroliswiss-control/design): 4 probes per kiln, reading every 30 s, cycle phases by threshold, alarms, offline queue, CSV export. On the homepage as "Control y trazabilidad", always labelled as in-house system in development with sample data.
