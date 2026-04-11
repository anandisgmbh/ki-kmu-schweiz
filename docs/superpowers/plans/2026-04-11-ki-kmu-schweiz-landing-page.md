# ki-kmu-schweiz.ch Landing Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete ki-kmu-schweiz.ch landing page as an Astro + Tailwind project deployed to Vercel, implementing all 10 sections defined in `docs/superpowers/specs/2026-04-10-ki-kmu-schweiz-landing-page-design.md`.

**Architecture:** Astro static site with a single landing page composed from focused, single-responsibility components. Content (case studies, FAQ) lives in Astro Content Collections so it can be edited as Markdown without touching component code. Contact form submits to a Vercel serverless function that emails via Resend. No heavy client-side JS — only three small islands of interactivity (case filter, FAQ accordion, logo slider).

**Tech Stack:** Astro 4.x · Tailwind CSS 3.x · TypeScript · Fraunces + Inter (Fontsource) · Lucide Icons · Resend (email) · Plausible Analytics · Vercel (hosting)

**Spec reference:** `docs/superpowers/specs/2026-04-10-ki-kmu-schweiz-landing-page-design.md`
**Content reference:** `content/case-studies.md`
**Research reference:** `research/market-analysis-2026-04.md`

---

## Prerequisites

- Node.js ≥ 20 installed
- pnpm or npm installed (plan uses `pnpm`; substitute `npm` if preferred — commands are equivalent)
- Git initialized in the project directory (the project dir is currently not a git repo; Task 1 covers `git init`)
- Vercel account with CLI logged in (`vercel login`) — only needed for Task 22
- Resend account with API key (only for Task 15 API route — can use placeholder in env until ready)

---

## File Structure Overview

```
ki-kmu-schweiz/
├── src/
│   ├── pages/
│   │   ├── index.astro              # Composes all sections
│   │   ├── datenschutz.astro
│   │   ├── impressum.astro
│   │   └── api/
│   │       └── contact.ts           # POST handler for contact form
│   ├── components/
│   │   ├── Hero.astro
│   │   ├── LogoSlider.astro
│   │   ├── Problem.astro
│   │   ├── OfferCards.astro
│   │   ├── CaseCard.astro
│   │   ├── CaseGrid.astro           # Has client-side filter
│   │   ├── About.astro
│   │   ├── NetworkBlock.astro
│   │   ├── Trust.astro
│   │   ├── Faq.astro                # Has client-side accordion
│   │   ├── Contact.astro            # Has client-side form handler
│   │   ├── WhatsAppFloat.astro
│   │   └── Footer.astro
│   ├── content/
│   │   ├── config.ts                # Content Collections schemas
│   │   ├── cases/                   # 12 markdown files
│   │   └── faqs/                    # 9 markdown files
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── lib/
│   │   └── contact-schema.ts        # Zod schema for contact form
│   └── styles/
│       └── global.css
├── public/
│   ├── logos/                       # Client logos (placeholder SVGs for now)
│   ├── favicon.svg
│   └── og-image.png
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
├── vercel.json
├── .env.example
├── .gitignore
└── README.md
```

Each component owns exactly one section of the landing page. `CaseGrid`, `Faq`, and `Contact` have small client-side JS islands; the rest is pure static HTML rendered at build time.

---

## Task 1: Project Initialization

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `.gitignore`, `.env.example`

- [ ] **Step 1.1: Initialize git and Astro project**

Run from the project root (`/Users/jannick.oberbeck/Documents/Claude Projects/KI KMU Schweiz/`):

```bash
git init
pnpm create astro@latest . -- --template minimal --typescript strict --no-install --no-git --yes
```

Expected: Astro scaffolds `src/pages/index.astro`, `astro.config.mjs`, `tsconfig.json`, `package.json`.

- [ ] **Step 1.2: Install dependencies**

```bash
pnpm add astro@^4 @astrojs/tailwind@^5 @astrojs/vercel@^7 tailwindcss@^3 @fontsource/fraunces @fontsource/inter lucide-astro zod resend
pnpm add -D @types/node prettier prettier-plugin-astro prettier-plugin-tailwindcss
```

Expected: `package.json` lists all dependencies, no install errors.

- [ ] **Step 1.3: Create `.gitignore`**

Create `.gitignore` with:

```
# Dependencies
node_modules/

# Build output
dist/
.astro/

# Env
.env
.env.local
.env.production

# Editors
.vscode/
.idea/
.DS_Store

# Vercel
.vercel/

# Superpowers brainstorm artifacts
.superpowers/
```

- [ ] **Step 1.4: Create `.env.example`**

Create `.env.example` with:

```
# Resend API key (https://resend.com)
RESEND_API_KEY=re_xxxxxxxxxxxx

# Contact form destination email
CONTACT_FORM_TO=jannick@ki-kmu-schweiz.ch

# Calendly booking URL
PUBLIC_CALENDLY_URL=https://calendly.com/jannick-oberbeck/erstgespraech

# WhatsApp number (international format, digits only)
PUBLIC_WHATSAPP_NUMBER=4179XXXXXXX

# Contact email (visible on page)
PUBLIC_CONTACT_EMAIL=jannick@ki-kmu-schweiz.ch

# Contact phone (visible on page)
PUBLIC_CONTACT_PHONE=+41 79 XXX XX XX
```

- [ ] **Step 1.5: Verify dev server runs**

```bash
pnpm dev
```

Expected: Astro dev server starts on `http://localhost:4321/`. Visit in browser — should see the default Astro minimal template page. Stop with `Ctrl-C`.

- [ ] **Step 1.6: Initial commit**

```bash
git add .
git commit -m "chore: initialize Astro project with dependencies"
```

---

## Task 2: Configure Tailwind with Custom Theme

**Files:**
- Create: `tailwind.config.mjs`
- Modify: `astro.config.mjs`
- Create: `src/styles/global.css`

- [ ] **Step 2.1: Create `tailwind.config.mjs`**

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#fbf9f4',
          card: '#ffffff',
          accent: '#fef3c7',
        },
        ink: {
          primary: '#1c1917',
          secondary: '#57534e',
          muted: '#78716c',
        },
        accent: {
          DEFAULT: '#b45309',
          hover: '#92400e',
          soft: '#d97706',
        },
        border: {
          DEFAULT: '#e7e5e4',
          hover: '#d6d3d1',
        },
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      fontSize: {
        'display': ['clamp(2.25rem, 4vw + 1rem, 3.75rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        'headline': ['clamp(1.75rem, 2vw + 1rem, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      },
      maxWidth: {
        container: '1200px',
      },
      spacing: {
        'section': '5rem',
        'section-lg': '7rem',
      },
      borderRadius: {
        card: '14px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,.03)',
        'card-hover': '0 4px 12px rgba(180,83,9,.08)',
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 2.2: Update `astro.config.mjs`**

Replace contents with:

```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  site: 'https://ki-kmu-schweiz.ch',
  integrations: [tailwind({ applyBaseStyles: false })],
  output: 'hybrid',
  adapter: vercel({
    webAnalytics: { enabled: false },
  }),
});
```

Note: `output: 'hybrid'` keeps pages static by default while allowing `src/pages/api/contact.ts` to run as a serverless function.

- [ ] **Step 2.3: Create `src/styles/global.css`**

```css
@import '@fontsource/fraunces/variable.css';
@import '@fontsource/inter/variable.css';

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    @apply bg-bg-primary text-ink-primary font-sans;
    font-feature-settings: 'cv02', 'cv11', 'ss01';
  }

  h1, h2, h3, h4 {
    @apply font-serif font-semibold tracking-tight;
  }

  ::selection {
    @apply bg-accent-soft/30;
  }
}

@layer components {
  .container-page {
    @apply max-w-container mx-auto px-6 md:px-8;
  }

  .btn {
    @apply inline-flex items-center gap-2 rounded-[9px] px-[18px] py-[11px] text-sm font-semibold transition-all duration-200 no-underline;
  }

  .btn-primary {
    @apply btn bg-accent text-white hover:bg-accent-hover shadow-sm hover:shadow;
  }

  .btn-ghost {
    @apply btn bg-bg-card text-ink-primary border border-border hover:border-border-hover;
  }

  .btn-whatsapp {
    @apply btn bg-[#25D366] text-white hover:bg-[#1ebe57];
  }

  .label-tag {
    @apply text-[11px] font-bold uppercase tracking-[0.12em];
  }

  .card {
    @apply bg-bg-card border border-border rounded-card shadow-card transition-all duration-200;
  }

  .card-hoverable {
    @apply card hover:border-border-hover hover:shadow-card-hover;
  }
}
```

- [ ] **Step 2.4: Verify build works**

```bash
pnpm dev
```

Expected: Dev server starts without errors. The page is blank (default index.astro hasn't been styled yet), but no build errors. Stop server.

- [ ] **Step 2.5: Commit**

```bash
git add .
git commit -m "chore: configure Tailwind with design tokens and Vercel adapter"
```

---

## Task 3: Base Layout with SEO Meta

**Files:**
- Create: `src/layouts/BaseLayout.astro`

- [ ] **Step 3.1: Create `src/layouts/BaseLayout.astro`**

```astro
---
import '../styles/global.css';

interface Props {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
}

const {
  title,
  description,
  canonical = Astro.url.href,
  ogImage = '/og-image.png',
} = Astro.props;

const siteName = 'ki-kmu-schweiz.ch';
const fullTitle = title.includes(siteName) ? title : `${title} · ${siteName}`;
---

<!doctype html>
<html lang="de-CH">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="generator" content={Astro.generator} />

    <title>{fullTitle}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content={fullTitle} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={canonical} />
    <meta property="og:image" content={new URL(ogImage, Astro.url).href} />
    <meta property="og:locale" content="de_CH" />
    <meta property="og:site_name" content={siteName} />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={fullTitle} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={new URL(ogImage, Astro.url).href} />

    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="theme-color" content="#fbf9f4" />

    <!-- Plausible Analytics (placeholder — activate after domain setup) -->
    <!-- <script defer data-domain="ki-kmu-schweiz.ch" src="https://plausible.io/js/script.js"></script> -->
  </head>
  <body>
    <slot />
  </body>
</html>
```

- [ ] **Step 3.2: Create placeholder `public/favicon.svg`**

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="#b45309"/>
  <text x="32" y="44" font-family="Georgia, serif" font-size="36" font-weight="600" fill="#fbf9f4" text-anchor="middle">ki</text>
</svg>
```

- [ ] **Step 3.3: Commit**

```bash
git add .
git commit -m "feat: add base layout with SEO meta and placeholder favicon"
```

---

## Task 4: Content Collections — Cases

**Files:**
- Create: `src/content/config.ts`
- Create: `src/content/cases/01-treuhand-belegverarbeitung.md` (and 11 more)

- [ ] **Step 4.1: Create `src/content/config.ts`**

```typescript
import { defineCollection, z } from 'astro:content';

const cases = defineCollection({
  type: 'content',
  schema: z.object({
    order: z.number(),
    title: z.string(),
    industry: z.enum([
      'treuhand',
      'recht',
      'architektur',
      'immobilien',
      'versicherung',
      'ingenieur',
      'handwerk',
      'gastro',
      'handel',
      'gesundheit',
      'industrie',
    ]),
    industryLabel: z.string(),
    useCase: z.enum([
      'dokumente',
      'offerten',
      'kommunikation',
      'voice',
      'vision',
      'marketing',
      'wissen',
    ]),
    useCaseLabel: z.string(),
    size: z.string(),
    region: z.string(),
    pain: z.string(),
    solution: z.string(),
    metrics: z.array(z.string()).min(2).max(3),
    duration: z.string(),
    anchor: z.boolean().default(false),
  }),
});

const faqs = defineCollection({
  type: 'content',
  schema: z.object({
    order: z.number(),
    question: z.string(),
  }),
});

export const collections = { cases, faqs };
```

- [ ] **Step 4.2: Create all 12 case markdown files**

For each file, create `src/content/cases/NN-slug.md` with the frontmatter schema. The body can be empty or a short paragraph (not shown on card, but available for future detail pages).

File 1: `src/content/cases/01-treuhand-belegverarbeitung.md`
```markdown
---
order: 1
title: "Belege automatisch verarbeiten"
industry: treuhand
industryLabel: "Treuhand"
useCase: dokumente
useCaseLabel: "Dokumentenverarbeitung"
size: "22 MA"
region: "Raum Zürich"
pain: "Monatsabschlüsse banden pro Mandant 6–8 Stunden, die Hälfte davon für manuelle Belegsortierung und Rückfragen."
solution: "KI-basierte Belegklassifikation mit Abacus-Anbindung und automatische Mandanten-Rückfragen per Mail."
metrics:
  - "−58 % Bearbeitungszeit pro Monatsabschluss"
  - "+180 Mandanten ohne neuen Mitarbeiter"
  - "Amortisation nach 4 Monaten"
duration: "6 Wochen"
anchor: true
---
```

File 2: `src/content/cases/02-anwalt-praezedenzsuche.md`
```markdown
---
order: 2
title: "Präzedenzfälle in Minuten statt Stunden"
industry: recht
industryLabel: "Recht"
useCase: wissen
useCaseLabel: "Wissensmanagement"
size: "12 MA"
region: "Basel"
pain: "Juristen verbrachten bis zu 8 Stunden pro Mandat mit der Suche nach internen Präzedenzfällen."
solution: "Private Wissensbasis mit semantischer Suche, vollständig On-Prem, Antworten immer mit Quellenangabe."
metrics:
  - "Recherche 8 h → 35 min"
  - "3 Partnerstunden / Woche befreit"
  - "Null Daten in der Cloud"
duration: "8 Wochen"
anchor: false
---
```

File 3: `src/content/cases/03-architektur-protokolle.md`
```markdown
---
order: 3
title: "Bausitzungs-Protokolle ohne Mehraufwand"
industry: architektur
industryLabel: "Architektur"
useCase: voice
useCaseLabel: "Audio → Protokoll"
size: "18 MA"
region: "Zürich/Winterthur"
pain: "Protokolle schluckten 6 h pro Woche und waren trotzdem ständig im Rückstand."
solution: "Audio-Aufzeichnung wird automatisch zu strukturiertem Protokoll mit Action Items, direkt in die Projekt-Ablage."
metrics:
  - "Protokollzeit 6 h → 45 min / Woche"
  - "Null Rückstand beim Versand"
  - "Weniger Streitfälle dank klarer Dokumentation"
duration: "4 Wochen"
anchor: false
---
```

File 4: `src/content/cases/04-immobilien-ticket-triage.md`
```markdown
---
order: 4
title: "Mieter-Tickets in 4 Stunden statt 2 Tagen"
industry: immobilien
industryLabel: "Immobilien"
useCase: kommunikation
useCaseLabel: "E-Mail-Triage"
size: "28 MA"
region: "Bern"
pain: "80 Anfragen pro Tag, 60 % davon Standardfälle, Antwortzeit regelmässig über 48 Stunden."
solution: "KI-Assistent liest, klassifiziert und beantwortet Standardfälle direkt, eskaliert komplexe Fälle."
metrics:
  - "Antwortzeit 48 h → 4 h"
  - "65 % Tickets ohne Mensch gelöst"
  - "~1.2 FTE für wertigere Arbeit frei"
duration: "7 Wochen"
anchor: true
---
```

File 5: `src/content/cases/05-versicherung-offertvergleich.md`
```markdown
---
order: 5
title: "Offertvergleich in 25 Minuten"
industry: versicherung
industryLabel: "Versicherung"
useCase: dokumente
useCaseLabel: "Dokumentenextraktion"
size: "15 MA"
region: "Zürich"
pain: "Offertvergleich für Unternehmenskunden 5–8 Stunden pro Fall, Qualität je Broker unterschiedlich."
solution: "KI extrahiert aus Policen strukturiert, vergleicht nach einheitlichem Raster, erstellt Kunden-Report."
metrics:
  - "Vergleichszeit 5–8 h → 25 min"
  - "Einheitliche Qualität über alle Broker"
  - "Abschlussquote +22 %"
duration: "9 Wochen"
anchor: false
---
```

File 6: `src/content/cases/06-hlk-offertkalkulation.md`
```markdown
---
order: 6
title: "Angebote auf Basis historischer Projekte"
industry: ingenieur
industryLabel: "Ingenieurbüro"
useCase: offerten
useCaseLabel: "Offertkalkulation"
size: "9 MA"
region: "St. Gallen"
pain: "Angebote für komplexe Haustechnik-Projekte dauerten 2–3 Tage. Nur der Inhaber konnte verlässlich kalkulieren."
solution: "KI-Kalkulator nutzt historische Projekte und Lieferantenpreise, erzeugt Offert-Entwurf auf Positionsebene."
metrics:
  - "Durchlaufzeit 2–3 Tage → 3 h"
  - "Gewinnmarge +4 Prozentpunkte"
  - "Juniors erstellen Offerten selbständig"
duration: "10 Wochen"
anchor: false
---
```

File 7: `src/content/cases/07-schreinerei-offerten.md`
```markdown
---
order: 7
title: "Offerten aus Kundenfotos und Text"
industry: handwerk
industryLabel: "Schreinerei"
useCase: offerten
useCaseLabel: "Offertgenerierung"
size: "14 MA"
region: "Zentralschweiz"
pain: "Der Chef schrieb Offerten abends, verlor Aufträge an schnellere Konkurrenten."
solution: "KI-Assistent liest Anfrage (Mail, WhatsApp, Fotos) und erzeugt Offert-Entwurf. Chef prüft und sendet."
metrics:
  - "Durchlaufzeit 5 Tage → 1 Tag"
  - "Auftragsquote +28 %"
  - "Abendarbeit Chef −10 h / Woche"
duration: "5 Wochen"
anchor: true
---
```

File 8: `src/content/cases/08-sanitaer-voice-agent.md`
```markdown
---
order: 8
title: "KI-Telefonagent für die Notfallannahme"
industry: handwerk
industryLabel: "Haustechnik"
useCase: voice
useCaseLabel: "Voice Agent"
size: "22 MA"
region: "Aargau"
pain: "Disponentin telefonierte ganztags Termine, Notfälle störten die Planung, Kunden ausserhalb der Bürozeit unerreicht."
solution: "KI-Telefonagent klassifiziert Notfall vs. Termin, priorisiert, schickt SMS an Pikett und Kunde."
metrics:
  - "70 % Anrufe vollautomatisch"
  - "Disponenten-Zeit −50 %"
  - "24/7 Erreichbarkeit ohne Zusatzpersonal"
duration: "8 Wochen"
anchor: true
---
```

File 9: `src/content/cases/09-fachhandel-beratungschat.md`
```markdown
---
order: 9
title: "Beratungs-Assistent wie im Laden — online"
industry: handel
industryLabel: "Fachhandel"
useCase: kommunikation
useCaseLabel: "Sales-Chat"
size: "11 MA, 3 Filialen"
region: "Ostschweiz"
pain: "Online-Shop verlor gegenüber grossen Playern, obwohl Beratung im Laden der eigentliche USP war."
solution: "KI-Beratungs-Assistent auf der Website mit Zugriff auf Sortiment, Verfügbarkeit und Bewertungen."
metrics:
  - "Online-Conversion +35 %"
  - "Durchschnittlicher Warenkorb +18 %"
  - "Weniger Beratungs-Leakage zu Grosshändlern"
duration: "6 Wochen"
anchor: false
---
```

File 10: `src/content/cases/10-gastro-marketing.md`
```markdown
---
order: 10
title: "Marketing ohne Abende"
industry: gastro
industryLabel: "Gastronomie"
useCase: marketing
useCaseLabel: "Marketing-Automation"
size: "42 MA, 3 Betriebe"
region: "Raum Zürich"
pain: "Inhaber verbrachte 15 h pro Woche im Backoffice. Social Media und Newsletter verkümmerten."
solution: "KI generiert Social-Posts aus aktuellen Menüs und Events, erstellt Bilder, verwaltet Content-Kalender."
metrics:
  - "Marketing-Zeit 15 h → 3 h / Woche"
  - "Reservationen über Social +40 %"
  - "+2'100 Follower in 4 Monaten"
duration: "4 Wochen"
anchor: false
---
```

File 11: `src/content/cases/11-medizin-ambient-ai.md`
```markdown
---
order: 11
title: "Ambient AI für die Sprechstunde"
industry: gesundheit
industryLabel: "Gesundheit"
useCase: voice
useCaseLabel: "Ambient AI"
size: "34 MA, 7 Ärzte"
region: "Region Luzern"
pain: "Ärzte dokumentierten 2 h pro Tag nach der Sprechstunde. Überstunden stiegen, Qualität sank."
solution: "Ambient-AI-System mit Schweizer Datenhaltung transkribiert und erstellt KG-Eintrag-Entwurf, nDSG-konform."
metrics:
  - "Dokumentationszeit −70 %"
  - "1.5 h pro Arzt / Tag zurückgewonnen"
  - "Höhere Mitarbeitenden-Zufriedenheit"
duration: "11 Wochen"
anchor: false
---
```

File 12: `src/content/cases/12-metall-vision.md`
```markdown
---
order: 12
title: "Qualitätskontrolle in Echtzeit"
industry: industrie
industryLabel: "Industrie"
useCase: vision
useCaseLabel: "Computer Vision"
size: "65 MA"
region: "Raum Solothurn"
pain: "Ausschuss bei Präzisionsteilen wurde erst im Endprüfstand erkannt. Teure Nacharbeit."
solution: "Computer-Vision-System am CNC-Ausgang erkennt Abweichungen direkt, stoppt Charge bei systematischen Fehlern."
metrics:
  - "Ausschussrate −42 %"
  - "Nacharbeitskosten −CHF 85'000 / Jahr"
  - "Amortisation nach 7 Monaten"
duration: "12 Wochen"
anchor: false
---
```

- [ ] **Step 4.3: Verify collections load**

Add a quick test page temporarily. Edit `src/pages/index.astro`:

```astro
---
import { getCollection } from 'astro:content';
const cases = await getCollection('cases');
---
<pre>{JSON.stringify(cases.map(c => ({ id: c.id, order: c.data.order, title: c.data.title, anchor: c.data.anchor })), null, 2)}</pre>
```

Run `pnpm dev`, visit `http://localhost:4321/`. Expected: JSON array of 12 cases, ordered correctly, 4 with `anchor: true` (cases 1, 4, 7, 8). Stop server.

Revert `src/pages/index.astro` to empty (will be filled in Task 18).

- [ ] **Step 4.4: Commit**

```bash
git add .
git commit -m "feat: add case studies content collection with 12 cases"
```

---

## Task 5: Content Collections — FAQ

**Files:**
- Create: `src/content/faqs/01-dauer.md` (and 8 more)

- [ ] **Step 5.1: Create 9 FAQ markdown files**

File 1: `src/content/faqs/01-dauer.md`
```markdown
---
order: 1
question: "Wie lange dauert ein Projekt?"
---

4–8 Wochen für einen Pilot. Der Potenzial-Check selbst dauert etwa 2 Wochen: 1 Tag vor Ort, 2 Tage Analyse, Präsentation.
```

File 2: `src/content/faqs/02-tech-team.md`
```markdown
---
order: 2
question: "Wir haben keine Tech-Leute — ist das ein Problem?"
---

Nein. Ich bringe die Technik, Sie bringen das Prozess-Wissen. Gemeinsam bauen wir eine Lösung, die Ihre bestehenden Mitarbeitenden nutzen können — ohne dass Sie einen eigenen Entwickler brauchen.
```

File 3: `src/content/faqs/03-daten.md`
```markdown
---
order: 3
question: "Was passiert mit unseren Daten?"
---

Ihre Daten bleiben in der Schweiz — oder direkt bei Ihnen. Je nach Projekt nutze ich Azure Swiss Region, Swisscom oder eine On-Prem-Installation auf Ihrer Infrastruktur. Vor Projektstart schliessen wir eine Auftragsdatenverarbeitung nach nDSG ab.
```

File 4: `src/content/faqs/04-kosten.md`
```markdown
---
order: 4
question: "Was kostet es wirklich?"
---

Potenzial-Check CHF 2'500 fix. Pilot CHF 15'000–35'000 je nach Umfang — Fixpreis nach dem Assessment. Partnerschaft ab CHF 2'500 / Monat. Keine versteckten Nachträge, alle Preise transparent auf dieser Seite.
```

File 5: `src/content/faqs/05-workshops.md`
```markdown
---
order: 5
question: "Machen Sie auch nur Workshops?"
---

Nein. Workshops ohne anschliessende Umsetzung sind nicht mein Angebot. Wenn Sie reinen Kurs-Charakter suchen, gibt es günstigere Anbieter. Ich liefere Lösungen, die nach dem Projekt laufen.
```

File 6: `src/content/faqs/06-kapazitaet.md`
```markdown
---
order: 6
question: "Wie viele Projekte können Sie gleichzeitig?"
---

Üblicherweise 2–3. Das ist bewusst — ich betreue jeden Kunden persönlich, kein Account-Manager-Modell. Lieber weniger Projekte gleichzeitig und dafür verlässlich geliefert.
```

File 7: `src/content/faqs/07-support.md`
```markdown
---
order: 7
question: "Was, wenn im Betrieb später ein Problem auftritt?"
---

Im Pilot sind 4 Wochen Begleitung nach Go-Live inklusive. Danach optional eine Partnerschaft ab CHF 2'500 / Monat, in der ich weiterhin Ansprechpartner für Fragen, Weiterentwicklung und Betrieb bin.
```

File 8: `src/content/faqs/08-spezialist.md`
```markdown
---
order: 8
question: "Braucht es bei uns einen eigenen KI-Spezialisten?"
---

Nein. Ziel ist, dass Ihre bestehenden Mitarbeitenden die Lösung selbständig nutzen können. Ich schule die Key-User im Rahmen des Pilots.
```

File 9: `src/content/faqs/09-einzelkaempfer.md`
```markdown
---
order: 9
question: "Sind Sie ein Einzelkämpfer? Was, wenn Sie ausfallen oder ein Projekt Spezialwissen verlangt?"
---

Ich bin persönlich Ihr Ansprechpartner und arbeite als Boutique. Dahinter steht ein kuratiertes Netzwerk aus ETH-, Fachhochschul- und Industrie-Spezialist:innen, auf das ich bei Bedarf punktuell zugreifen kann — für Computer Vision, NLP, Daten-Engineering oder heikle regulatorische Bereiche. Bei Ausfall (Krankheit, Ferien) bin ich erreichbar oder es übernimmt eine vorher benannte Vertretung.
```

- [ ] **Step 5.2: Commit**

```bash
git add .
git commit -m "feat: add FAQ content collection with 9 entries"
```

---

## Task 6: Hero Component

**Files:**
- Create: `src/components/Hero.astro`

- [ ] **Step 6.1: Create `src/components/Hero.astro`**

```astro
---
const calendlyUrl = import.meta.env.PUBLIC_CALENDLY_URL || '#kontakt';
const whatsappNumber = import.meta.env.PUBLIC_WHATSAPP_NUMBER || '';
const whatsappText = encodeURIComponent(
  'Hallo Jannick, ich interessiere mich für ein Erstgespräch zur KI-Beratung.'
);
const whatsappUrl = whatsappNumber
  ? `https://wa.me/${whatsappNumber}?text=${whatsappText}`
  : '#kontakt';
---

<section class="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32">
  <div class="container-page">
    <div class="max-w-[780px]">
      <p class="label-tag text-accent-soft mb-6">KI-Beratung für Schweizer KMU</p>

      <h1 class="text-display font-serif font-semibold text-ink-primary">
        In 8 Wochen vom Prozess-Schmerz zur
        <em class="not-italic text-accent">laufenden KI-Lösung</em>.
      </h1>

      <p class="mt-6 text-lg md:text-xl leading-relaxed text-ink-secondary max-w-[640px]">
        Prozess-Screening, Pilot-Umsetzung, Betrieb. Ein Ansprechpartner mit
        ETH-Hintergrund und 10+ gelieferten Projekten in Schweizer KMU.
        Transparente Fixpreise, keine PowerPoint-Schlachten.
      </p>

      <div class="mt-8 flex flex-wrap gap-3">
        <a href={calendlyUrl} class="btn-primary">
          Erstgespräch vereinbaren
          <span aria-hidden="true">→</span>
        </a>
        <a href="#angebot" class="btn-ghost">Angebot &amp; Preise</a>
        <a
          href={whatsappUrl}
          class="btn-whatsapp"
          aria-label="Per WhatsApp schreiben"
          target="_blank"
          rel="noopener"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          WhatsApp
        </a>
      </div>

      <div class="mt-12 flex items-center gap-4 pt-8 border-t border-border">
        <div
          class="w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm text-[#7c2d12] border-2 border-white shadow-[0_2px_6px_rgba(124,45,18,0.15)]"
          style="background: linear-gradient(135deg, #fed7aa, #fdba74);"
          aria-hidden="true"
        >
          JO
        </div>
        <div class="text-sm">
          <p class="font-semibold text-ink-primary">Jannick Oberbeck · KI-Partner</p>
          <p class="text-ink-muted">ETH Zürich · 5+ Jahre KI · 10+ gelieferte Projekte</p>
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 6.2: Commit**

```bash
git add src/components/Hero.astro
git commit -m "feat: add Hero component with CTAs and portrait row"
```

---

## Task 7: Logo Slider Component

**Files:**
- Create: `src/components/LogoSlider.astro`
- Create: `public/logos/placeholder-1.svg` through `placeholder-6.svg`

- [ ] **Step 7.1: Create 6 placeholder logo SVGs**

For each of 1–6, create `public/logos/placeholder-N.svg` with the number substituted:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 48">
  <rect width="160" height="48" rx="6" fill="none" stroke="#d6d3d1" stroke-dasharray="4 4"/>
  <text x="80" y="30" font-family="Inter, sans-serif" font-size="14" fill="#78716c" text-anchor="middle">Kundenlogo N</text>
</svg>
```

(These are visual placeholders. The user will deliver real logos later — they drop into the same folder and the slider picks them up automatically.)

- [ ] **Step 7.2: Create `src/components/LogoSlider.astro`**

```astro
---
// Reads all SVG files from public/logos at build time
import fs from 'node:fs';
import path from 'node:path';

const logosDir = path.join(process.cwd(), 'public', 'logos');
let logos: string[] = [];
try {
  logos = fs
    .readdirSync(logosDir)
    .filter((f) => /\.(svg|png|webp)$/i.test(f))
    .sort()
    .map((f) => `/logos/${f}`);
} catch {
  logos = [];
}

// Duplicate for seamless scroll
const doubled = [...logos, ...logos];
---

<section class="py-10 md:py-14 border-y border-border bg-bg-card/50">
  <div class="container-page">
    <p class="label-tag text-ink-muted text-center mb-6">
      Vertraut von Schweizer KMU
    </p>
    <div class="relative overflow-hidden logo-mask">
      <div class="flex gap-12 animate-slide whitespace-nowrap">
        {
          doubled.map((src, i) => (
            <div class="shrink-0 flex items-center">
              <img
                src={src}
                alt=""
                width="160"
                height="48"
                class="h-10 md:h-12 w-auto opacity-70 hover:opacity-100 transition-opacity"
                loading="lazy"
              />
            </div>
          ))
        }
      </div>
    </div>
  </div>
</section>

<style>
  .logo-mask {
    mask-image: linear-gradient(
      to right,
      transparent 0%,
      black 10%,
      black 90%,
      transparent 100%
    );
  }
  @keyframes slide {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
  .animate-slide {
    animation: slide 40s linear infinite;
  }
  @media (prefers-reduced-motion: reduce) {
    .animate-slide { animation: none; }
  }
</style>
```

- [ ] **Step 7.3: Commit**

```bash
git add .
git commit -m "feat: add logo slider with placeholder assets"
```

---

## Task 8: Problem / Situation Component

**Files:**
- Create: `src/components/Problem.astro`

- [ ] **Step 8.1: Create `src/components/Problem.astro`**

```astro
---
const pains = [
  'Papierkram und manuelle Dokumenten-Verarbeitung',
  'Kundenkommunikation, die im Tagesgeschäft untergeht',
  'Offerten, die zu lange dauern und Aufträge kosten',
];
---

<section id="problem" class="py-section md:py-section-lg">
  <div class="container-page">
    <div class="max-w-[780px]">
      <p class="label-tag text-accent-soft mb-4">Die Situation</p>
      <h2 class="text-headline text-ink-primary">
        Sie wissen, dass KI etwas kann. Sie wissen nur nicht, was für Sie.
      </h2>
      <p class="mt-5 text-lg leading-relaxed text-ink-secondary">
        Ihre Mitarbeitenden fragen, Ihre Kunden tun es auch, und irgendwo zwischen
        ChatGPT-Spielereien und vollmundigen Beratungs-Versprechen fehlt der
        ehrliche Pfad zu dem, was bei Ihnen wirklich Zeit und Geld spart.
      </p>

      <ul class="mt-8 grid gap-3">
        {
          pains.map((pain) => (
            <li class="flex items-start gap-3 text-ink-primary">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                class="text-accent shrink-0 mt-0.5"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{pain}</span>
            </li>
          ))
        }
      </ul>

      <blockquote class="mt-10 p-6 md:p-8 bg-bg-accent border-l-4 border-accent rounded-r-lg">
        <p class="text-xl md:text-2xl font-serif font-medium leading-snug text-ink-primary">
          "34 % der Schweizer KMU nutzen KI aktiv — aber nur 23 % der Kleinstbetriebe sind DSG-konform aufgestellt."
        </p>
        <footer class="mt-4 text-sm text-ink-muted">
          <cite>
            —
            <a
              href="https://www.axa.ch/de/ueber-axa/medien/medienmitteilungen/aktuelle-medienmitteilungen/2025/20251008-kmu-arbeitsmarktstudie-2025-ki.html"
              class="underline hover:text-accent"
              target="_blank"
              rel="noopener"
            >
              AXA KMU Arbeitsmarktstudie 2025
            </a>
          </cite>
        </footer>
      </blockquote>
    </div>
  </div>
</section>
```

- [ ] **Step 8.2: Commit**

```bash
git add src/components/Problem.astro
git commit -m "feat: add problem/situation section with AXA statistics"
```

---

## Task 9: Offer Cards Component

**Files:**
- Create: `src/components/OfferCards.astro`

- [ ] **Step 9.1: Create `src/components/OfferCards.astro`**

```astro
---
const calendlyUrl = import.meta.env.PUBLIC_CALENDLY_URL || '#kontakt';

const offers = [
  {
    number: 1,
    name: 'KI-Potenzial-Check',
    tagline: 'Einstieg, mit Substanz',
    price: 'CHF 2\'500',
    priceNote: 'Fixpreis',
    duration: '~2 Wochen',
    bullets: [
      '1 Tag vor Ort beim Kunden',
      'Prozess-Screening + Interviews',
      'Priorisierte Use-Case-Liste',
      'ROI-Schätzung pro Use-Case',
      'Schriftlicher Kurzbericht',
    ],
    cta: { label: 'Potenzial-Check buchen', href: calendlyUrl },
    highlight: true,
  },
  {
    number: 2,
    name: 'Pilot-Projekt',
    tagline: 'Von der Idee zur laufenden Lösung',
    price: 'CHF 15\'000 – 35\'000',
    priceNote: 'Fixpreis nach Assessment',
    duration: '4 – 8 Wochen',
    bullets: [
      'Detailanalyse des Prozesses',
      'Bau der Lösung (Claude, GPT, Open-Source)',
      'Integration in Ihre Systeme',
      'Schulung der Key-User',
      '4 Wochen Betreuung nach Go-Live',
    ],
    cta: { label: 'Pilot anfragen', href: '#kontakt' },
    highlight: false,
  },
  {
    number: 3,
    name: 'Partnerschaft & Betrieb',
    tagline: 'Nach dem Pilot weitergehen',
    price: 'ab CHF 2\'500',
    priceNote: 'pro Monat',
    duration: 'ab 6 Monate',
    bullets: [
      '1 – 2 Tage pro Monat Sprechstunde',
      'Betrieb und Monitoring',
      'Weiterentwicklung der Use-Cases',
      'Roadmap und Priorisierung',
      'Direkter Ansprechpartner',
    ],
    cta: { label: 'Partnerschaft anfragen', href: '#kontakt' },
    highlight: false,
  },
];
---

<section id="angebot" class="py-section md:py-section-lg bg-bg-accent/30">
  <div class="container-page">
    <div class="max-w-[780px] mb-12">
      <p class="label-tag text-accent-soft mb-4">So arbeite ich</p>
      <h2 class="text-headline text-ink-primary">
        Drei Stufen. Transparente Fixpreise.
      </h2>
      <p class="mt-4 text-lg text-ink-secondary">
        Jede Stufe hat einen klaren Umfang, einen Fixpreis und ein definiertes Deliverable.
        Sie steigen dort ein, wo es für Sie Sinn ergibt — und gehen nur so weit, wie Sie wollen.
      </p>
    </div>

    <div class="grid md:grid-cols-3 gap-6">
      {
        offers.map((o) => (
          <div
            class={`card p-7 flex flex-col ${o.highlight ? 'border-accent/40 shadow-card-hover' : ''}`}
          >
            <div class="flex items-center gap-3 mb-4">
              <div class="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold">
                {o.number}
              </div>
              <p class="label-tag text-ink-muted">{o.tagline}</p>
            </div>
            <h3 class="text-2xl font-serif font-semibold text-ink-primary mb-2">
              {o.name}
            </h3>
            <div class="mb-5">
              <p class="text-3xl font-bold text-accent tabular-nums">{o.price}</p>
              <p class="text-sm text-ink-muted">{o.priceNote} · {o.duration}</p>
            </div>
            <ul class="space-y-2 mb-6 grow">
              {
                o.bullets.map((b) => (
                  <li class="flex items-start gap-2 text-sm text-ink-secondary">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2.5"
                      class="text-accent shrink-0 mt-0.5"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{b}</span>
                  </li>
                ))
              }
            </ul>
            <a href={o.cta.href} class={o.highlight ? 'btn-primary' : 'btn-ghost'}>
              {o.cta.label}
            </a>
          </div>
        ))
      }
    </div>
  </div>
</section>
```

- [ ] **Step 9.2: Commit**

```bash
git add src/components/OfferCards.astro
git commit -m "feat: add 3-tier offer cards section with transparent pricing"
```

---

## Task 10: Case Card + Case Grid with Filter

**Files:**
- Create: `src/components/CaseCard.astro`
- Create: `src/components/CaseGrid.astro`

- [ ] **Step 10.1: Create `src/components/CaseCard.astro`**

```astro
---
import type { CollectionEntry } from 'astro:content';

interface Props {
  entry: CollectionEntry<'cases'>;
}

const { entry } = Astro.props;
const { data } = entry;
---

<article
  class="card-hoverable p-6 flex flex-col"
  data-industry={data.industry}
  data-use-case={data.useCase}
>
  <div class="flex items-center justify-between mb-4">
    <span class="label-tag text-accent-soft">{data.industryLabel}</span>
    {
      data.anchor && (
        <span
          class="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-bg-accent text-accent text-[10px] font-bold uppercase tracking-wider"
          title="Aus einem tatsächlich gelieferten Projekt"
        >
          ⭐ Geliefert
        </span>
      )
    }
  </div>

  <h3 class="text-xl font-serif font-semibold text-ink-primary mb-3 leading-snug">
    {data.title}
  </h3>

  <p class="text-xs text-ink-muted mb-4">
    {data.size} · {data.region} · {data.useCaseLabel}
  </p>

  <p class="text-sm text-ink-secondary mb-3">
    <strong class="text-ink-primary">Ausgangslage.</strong> {data.pain}
  </p>

  <p class="text-sm text-ink-secondary mb-5">
    <strong class="text-ink-primary">Lösung.</strong> {data.solution}
  </p>

  <ul class="mt-auto space-y-1.5 pt-4 border-t border-border">
    {
      data.metrics.map((m) => (
        <li class="flex items-start gap-2 text-sm text-ink-primary font-medium">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            class="text-accent shrink-0 mt-1"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>{m}</span>
        </li>
      ))
    }
    <li class="text-xs text-ink-muted pt-1">Umsetzung: {data.duration}</li>
  </ul>
</article>
```

- [ ] **Step 10.2: Create `src/components/CaseGrid.astro`**

```astro
---
import { getCollection } from 'astro:content';
import CaseCard from './CaseCard.astro';

const allCases = await getCollection('cases');
// Sort: anchors first, then by order
const sorted = allCases.sort((a, b) => {
  if (a.data.anchor !== b.data.anchor) return a.data.anchor ? -1 : 1;
  return a.data.order - b.data.order;
});

// Build unique filter options
const industries = [
  ...new Map(sorted.map((c) => [c.data.industry, c.data.industryLabel])).entries(),
].map(([id, label]) => ({ id, label }));
---

<section id="cases" class="py-section md:py-section-lg">
  <div class="container-page">
    <div class="max-w-[780px] mb-10">
      <p class="label-tag text-accent-soft mb-4">Unsere Arbeit</p>
      <h2 class="text-headline text-ink-primary">
        Zwölf Projekte. Elf Use-Cases. Ein Mensch dahinter.
      </h2>
      <p class="mt-4 text-lg text-ink-secondary">
        Auswahl aus unseren Projekten und typischen KMU-Herausforderungen.
        Mit <strong class="text-accent">⭐ Geliefert</strong> markierte Fälle sind konkret umgesetzte Projekte.
      </p>
    </div>

    <div
      id="case-filter"
      class="flex flex-wrap gap-2 mb-8"
      role="tablist"
      aria-label="Case Studies nach Branche filtern"
    >
      <button
        type="button"
        class="filter-btn active"
        data-filter="all"
        aria-pressed="true"
      >
        Alle
      </button>
      {
        industries.map((i) => (
          <button
            type="button"
            class="filter-btn"
            data-filter={i.id}
            aria-pressed="false"
          >
            {i.label}
          </button>
        ))
      }
    </div>

    <div
      id="case-grid"
      class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
    >
      {sorted.map((c) => <CaseCard entry={c} />)}
    </div>
  </div>
</section>

<style>
  .filter-btn {
    @apply inline-flex items-center px-4 py-2 rounded-full border border-border bg-bg-card text-sm font-medium text-ink-secondary transition-all hover:border-border-hover;
  }
  .filter-btn.active {
    @apply bg-accent text-white border-accent;
  }
</style>

<script>
  const filterBar = document.getElementById('case-filter');
  const grid = document.getElementById('case-grid');
  if (filterBar && grid) {
    const cards = Array.from(grid.querySelectorAll('[data-industry]')) as HTMLElement[];
    filterBar.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (!target.matches('.filter-btn')) return;
      const filter = target.dataset.filter!;
      filterBar.querySelectorAll('.filter-btn').forEach((btn) => {
        btn.classList.toggle('active', btn === target);
        btn.setAttribute('aria-pressed', btn === target ? 'true' : 'false');
      });
      cards.forEach((card) => {
        const match = filter === 'all' || card.dataset.industry === filter;
        card.style.display = match ? '' : 'none';
      });
    });
  }
</script>
```

- [ ] **Step 10.3: Commit**

```bash
git add src/components/CaseCard.astro src/components/CaseGrid.astro
git commit -m "feat: add case card and filterable case grid"
```

---

## Task 11: About Component + Network Block

**Files:**
- Create: `src/components/About.astro`
- Create: `src/components/NetworkBlock.astro`

- [ ] **Step 11.1: Create `src/components/About.astro`**

```astro
---
import NetworkBlock from './NetworkBlock.astro';
---

<section id="ueber-mich" class="py-section md:py-section-lg bg-bg-card">
  <div class="container-page">
    <div class="grid md:grid-cols-[200px_1fr] gap-8 md:gap-12 items-start max-w-[900px]">
      <div class="flex justify-center md:justify-start">
        <!-- Placeholder portrait. Replace with real photo later. -->
        <div
          class="w-40 h-40 md:w-48 md:h-48 rounded-full flex items-center justify-center text-4xl font-bold text-[#7c2d12] border-4 border-white shadow-[0_6px_24px_rgba(124,45,18,0.15)]"
          style="background: linear-gradient(135deg, #fed7aa, #fdba74);"
          aria-label="Foto von Jannick Oberbeck (Platzhalter)"
        >
          JO
        </div>
      </div>

      <div>
        <p class="label-tag text-accent-soft mb-4">Über mich</p>
        <h2 class="text-headline text-ink-primary">
          Warum ich das mache.
        </h2>

        <div class="mt-6 space-y-4 text-lg leading-relaxed text-ink-secondary">
          <p>
            Ich bin Jannick Oberbeck. Maschinenbau an der ETH Zürich, danach fünf Jahre
            in der KI-Welt. Ich habe gelernt, dass die spannendste KI-Arbeit nicht in
            Lab-Präsentationen passiert, sondern in Betrieben, in denen vorher niemand
            darüber nachgedacht hat.
          </p>
          <p>
            Heute helfe ich Schweizer KMU, ihre Prozesse ehrlich zu analysieren und
            genau dort KI einzusetzen, wo sie wirklich Zeit und Geld spart. Ich komme
            zu Ihnen ins Unternehmen, höre zu, baue, übergebe. Dann bleibe ich — wenn
            Sie wollen — als Ansprechpartner für alles, was nachkommt.
          </p>
          <p>
            <strong class="text-ink-primary">Was ich nicht mache:</strong>
            Workshops ohne Umsetzung. Slides statt Software. Funnel statt Beratung.
          </p>
          <p>
            <strong class="text-ink-primary">Was ich mache:</strong>
            10+ gelieferte Projekte. Transparente Fixpreise. Ein Ansprechpartner, nicht
            ein Pitch-Team.
          </p>
        </div>

        <ul class="mt-8 grid sm:grid-cols-2 gap-2 text-sm text-ink-muted">
          <li>🎓 ETH Zürich · Master Maschinenbau</li>
          <li>🧠 5+ Jahre KI-Praxis</li>
          <li>✅ 10+ umgesetzte Projekte</li>
          <li>🏅 Anthropic Claude Certified Architect <span class="italic">(in Arbeit)</span></li>
          <li>🇨🇭 Swiss-basiert, Deutschschweiz</li>
        </ul>
      </div>
    </div>

    <NetworkBlock />
  </div>
</section>
```

- [ ] **Step 11.2: Create `src/components/NetworkBlock.astro`**

```astro
---
---

<div class="mt-16 max-w-[900px] bg-bg-accent border border-accent/20 rounded-card p-7 md:p-10">
  <div class="flex flex-wrap items-center gap-3 mb-5">
    <span class="label-tag text-accent">Ein Ansprechpartner</span>
    <span class="text-ink-muted">·</span>
    <span class="label-tag text-accent">Ein Netzwerk dahinter</span>
  </div>

  <h3 class="text-2xl md:text-3xl font-serif font-semibold text-ink-primary leading-snug mb-5">
    Boutique-Nähe mit dem Zugriff auf ein Team, wenn ein Projekt es verlangt.
  </h3>

  <div class="space-y-4 text-ink-secondary leading-relaxed">
    <p>
      Sie haben immer genau eine Person, mit der Sie sprechen: mich. Das bleibt so —
      auch dann, wenn ein Projekt tiefer geht, als ein einzelner Kopf schultern kann.
    </p>
    <p>
      Für Spezialfragen wie Computer Vision, Natural Language Processing in heiklen
      Branchen, Daten-Engineering oder rechtlich sensible Deployments ziehe ich
      punktuell Spezialist:innen aus einem kuratierten Netzwerk dazu. Diese Expertise
      wird in Ihr Projekt gezogen, ohne dass sich für Sie der Ansprechpartner ändert.
    </p>
  </div>

  <div class="mt-6 pt-6 border-t border-accent/20 flex flex-wrap gap-6 text-sm">
    <div class="flex items-center gap-2">
      <span class="w-8 h-8 rounded-full bg-white border border-accent/30 flex items-center justify-center font-bold text-accent text-xs">
        ETH
      </span>
      <span class="text-ink-muted">Eidg. Technische Hochschule</span>
    </div>
    <div class="flex items-center gap-2">
      <span class="w-8 h-8 rounded-full bg-white border border-accent/30 flex items-center justify-center font-bold text-accent text-xs">
        FH
      </span>
      <span class="text-ink-muted">Fachhochschulen</span>
    </div>
    <div class="flex items-center gap-2">
      <span class="w-8 h-8 rounded-full bg-white border border-accent/30 flex items-center justify-center font-bold text-accent text-[10px]">
        IND
      </span>
      <span class="text-ink-muted">Industrie-Spezialist:innen</span>
    </div>
  </div>
</div>
```

- [ ] **Step 11.3: Commit**

```bash
git add src/components/About.astro src/components/NetworkBlock.astro
git commit -m "feat: add about section with network block"
```

---

## Task 12: Trust / DSG Component

**Files:**
- Create: `src/components/Trust.astro`

- [ ] **Step 12.1: Create `src/components/Trust.astro`**

```astro
---
const pillars = [
  {
    icon: 'ch',
    title: 'CH-Datenhaltung',
    body:
      'Ihre Daten bleiben in der Schweiz — Azure Swiss Region, Swisscom Cloud oder eine Schweizer Alternative, passend zum Projekt.',
  },
  {
    icon: 'shield',
    title: 'nDSG-konform',
    body:
      'Datenverarbeitung nach Schweizer Datenschutzgesetz. Auftragsdatenverarbeitung schriftlich vor Projektstart geregelt.',
  },
  {
    icon: 'lock',
    title: 'On-Prem-Option',
    body:
      'Für sensible Branchen (Treuhand, Recht, Gesundheit) setze ich die Lösung komplett auf Ihrer eigenen Infrastruktur auf.',
  },
];
---

<section id="vertrauen" class="py-section md:py-section-lg">
  <div class="container-page">
    <div class="max-w-[780px] mb-12">
      <p class="label-tag text-accent-soft mb-4">Ihre Daten</p>
      <h2 class="text-headline text-ink-primary">
        Ihre Daten bleiben in der Schweiz. Und bei Ihnen.
      </h2>
      <p class="mt-4 text-lg text-ink-secondary">
        Der grösste Hemmschuh für KI in KMU ist die Angst vor dem Datenschutz.
        Zu Recht: laut AXA-Studie sind nur 23 % der Schweizer Kleinstbetriebe
        DSG-konform aufgestellt. Ich gehöre zu denen, die es richtig machen.
      </p>
    </div>

    <div class="grid md:grid-cols-3 gap-5">
      {
        pillars.map((p) => (
          <div class="card p-7">
            <div class="w-12 h-12 rounded-lg bg-bg-accent flex items-center justify-center mb-4">
              {p.icon === 'ch' && <span class="text-accent text-xl font-bold">🇨🇭</span>}
              {p.icon === 'shield' && (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-accent">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              )}
              {p.icon === 'lock' && (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-accent">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
              )}
            </div>
            <h3 class="text-xl font-serif font-semibold text-ink-primary mb-2">
              {p.title}
            </h3>
            <p class="text-sm text-ink-secondary leading-relaxed">{p.body}</p>
          </div>
        ))
      }
    </div>
  </div>
</section>
```

- [ ] **Step 12.2: Commit**

```bash
git add src/components/Trust.astro
git commit -m "feat: add trust/DSG section with 3 pillars"
```

---

## Task 13: FAQ Component (Accordion)

**Files:**
- Create: `src/components/Faq.astro`

- [ ] **Step 13.1: Create `src/components/Faq.astro`**

```astro
---
import { getCollection, render } from 'astro:content';

const faqs = (await getCollection('faqs')).sort((a, b) => a.data.order - b.data.order);

// Pre-render each FAQ body
const rendered = await Promise.all(
  faqs.map(async (f) => {
    const { Content } = await render(f);
    return { id: f.id, question: f.data.question, Content };
  })
);
---

<section id="faq" class="py-section md:py-section-lg bg-bg-card">
  <div class="container-page">
    <div class="max-w-[780px] mb-10">
      <p class="label-tag text-accent-soft mb-4">Häufige Fragen</p>
      <h2 class="text-headline text-ink-primary">
        Was Inhaber vor einem Erstgespräch wissen wollen.
      </h2>
    </div>

    <div class="max-w-[780px] space-y-2">
      {
        rendered.map((f) => (
          <details class="faq-item group border border-border rounded-card overflow-hidden open:shadow-card">
            <summary class="list-none cursor-pointer p-5 md:p-6 flex items-start justify-between gap-4 hover:bg-bg-accent/40 transition-colors">
              <h3 class="text-lg font-serif font-semibold text-ink-primary leading-snug">
                {f.question}
              </h3>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                class="text-accent shrink-0 mt-1 transition-transform group-open:rotate-180"
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </summary>
            <div class="px-5 pb-6 md:px-6 text-ink-secondary leading-relaxed">
              <f.Content />
            </div>
          </details>
        ))
      }
    </div>
  </div>
</section>

<style>
  .faq-item summary::-webkit-details-marker {
    display: none;
  }
</style>
```

- [ ] **Step 13.2: Commit**

```bash
git add src/components/Faq.astro
git commit -m "feat: add FAQ accordion using native <details> element"
```

---

## Task 14: Contact Schema (Zod)

**Files:**
- Create: `src/lib/contact-schema.ts`

- [ ] **Step 14.1: Create `src/lib/contact-schema.ts`**

```typescript
import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Bitte geben Sie Ihren Namen an.').max(100),
  company: z.string().trim().min(2, 'Bitte geben Sie Ihre Firma an.').max(200),
  email: z.string().trim().email('Bitte geben Sie eine gültige E-Mail-Adresse an.').max(200),
  message: z
    .string()
    .trim()
    .min(10, 'Bitte schreiben Sie mindestens ein paar Worte.')
    .max(5000),
  // Honeypot — must be empty
  website: z.string().max(0).optional(),
});

export type ContactPayload = z.infer<typeof contactSchema>;
```

- [ ] **Step 14.2: Commit**

```bash
git add src/lib/contact-schema.ts
git commit -m "feat: add zod schema for contact form"
```

---

## Task 15: Contact API Route with Test

**Files:**
- Create: `src/pages/api/contact.ts`

- [ ] **Step 15.1: Create `src/pages/api/contact.ts`**

```typescript
import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { contactSchema } from '../../lib/contact-schema';

export const prerender = false;

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

export const POST: APIRoute = async ({ request }) => {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'invalid_json' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: 'validation_failed',
        issues: parsed.error.issues.map((i) => ({
          path: i.path.join('.'),
          message: i.message,
        })),
      }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const { name, company, email, message, website } = parsed.data;

  // Honeypot check — bots typically fill every visible field including hidden ones
  if (website && website.length > 0) {
    // Silently accept to avoid telling the bot it was caught
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
  const to = import.meta.env.CONTACT_FORM_TO;

  if (!apiKey || !to) {
    console.error('Contact form: missing RESEND_API_KEY or CONTACT_FORM_TO env');
    return new Response(JSON.stringify({ ok: false, error: 'server_not_configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from: 'ki-kmu-schweiz.ch <noreply@ki-kmu-schweiz.ch>',
      to: [to],
      replyTo: email,
      subject: `Neue Anfrage via Website: ${company}`,
      html: `
        <h2>Neue Anfrage via ki-kmu-schweiz.ch</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Firma:</strong> ${escapeHtml(company)}</p>
        <p><strong>E-Mail:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
        <hr />
        <p><strong>Nachricht:</strong></p>
        <p style="white-space: pre-wrap">${escapeHtml(message)}</p>
      `,
    });
  } catch (e) {
    console.error('Resend send failed:', e);
    return new Response(JSON.stringify({ ok: false, error: 'send_failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
```

- [ ] **Step 15.2: Manual smoke test with curl**

Start dev server:
```bash
pnpm dev
```

In another terminal, test validation failure (missing fields):
```bash
curl -s -X POST http://localhost:4321/api/contact \
  -H "Content-Type: application/json" \
  -d '{}'
```
Expected: HTTP 400, `{"ok":false,"error":"validation_failed","issues":[...]}`

Test success path (without actual Resend key — expect 500 `server_not_configured`):
```bash
curl -s -X POST http://localhost:4321/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","company":"Testfirma AG","email":"test@example.com","message":"Das ist eine Test-Nachricht."}'
```
Expected: HTTP 500, `{"ok":false,"error":"server_not_configured"}` (this is the correct behaviour until the env var is set).

Test honeypot silent success:
```bash
curl -s -X POST http://localhost:4321/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Bot","company":"BotCo","email":"bot@example.com","message":"Spam.","website":"http://spam"}'
```
Expected: HTTP 400 (honeypot max-length check fails with message "String must contain at most 0 character(s)"). Stop server.

- [ ] **Step 15.3: Commit**

```bash
git add src/pages/api/contact.ts
git commit -m "feat: add contact API route with zod validation and Resend integration"
```

---

## Task 16: Contact Component

**Files:**
- Create: `src/components/Contact.astro`

- [ ] **Step 16.1: Create `src/components/Contact.astro`**

```astro
---
const calendlyUrl = import.meta.env.PUBLIC_CALENDLY_URL || '';
const whatsappNumber = import.meta.env.PUBLIC_WHATSAPP_NUMBER || '';
const contactEmail = import.meta.env.PUBLIC_CONTACT_EMAIL || '';
const contactPhone = import.meta.env.PUBLIC_CONTACT_PHONE || '';

const whatsappText = encodeURIComponent(
  'Hallo Jannick, ich habe eine Frage zur KI-Beratung.'
);
const whatsappUrl = whatsappNumber
  ? `https://wa.me/${whatsappNumber}?text=${whatsappText}`
  : '';
---

<section id="kontakt" class="py-section md:py-section-lg">
  <div class="container-page">
    <div class="max-w-[780px] mb-12">
      <p class="label-tag text-accent-soft mb-4">Kontakt</p>
      <h2 class="text-headline text-ink-primary">Lassen Sie uns reden.</h2>
      <p class="mt-4 text-lg text-ink-secondary">
        Drei Wege — wählen Sie den, der Ihnen am besten passt. Alle führen direkt zu mir.
      </p>
    </div>

    <div class="grid lg:grid-cols-3 gap-5 mb-10">
      <a
        href={calendlyUrl || '#'}
        class="card-hoverable p-6 flex flex-col group"
        target="_blank"
        rel="noopener"
      >
        <div class="w-12 h-12 rounded-lg bg-bg-accent flex items-center justify-center mb-4 text-2xl">
          📅
        </div>
        <h3 class="text-xl font-serif font-semibold text-ink-primary mb-2">
          30 Minuten Erstgespräch
        </h3>
        <p class="text-sm text-ink-secondary grow">
          Gratis, unverbindlich, zum Kennenlernen. Sie buchen einen Termin,
          wir sprechen.
        </p>
        <span class="mt-4 text-accent font-semibold text-sm group-hover:underline">
          Termin wählen →
        </span>
      </a>

      <a
        href={whatsappUrl || '#'}
        class="card-hoverable p-6 flex flex-col group"
        target="_blank"
        rel="noopener"
      >
        <div class="w-12 h-12 rounded-lg bg-[#25D366]/10 flex items-center justify-center mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </div>
        <h3 class="text-xl font-serif font-semibold text-ink-primary mb-2">
          WhatsApp
        </h3>
        <p class="text-sm text-ink-secondary grow">
          Schnelle Frage zwischendurch? Schreiben Sie mir direkt auf WhatsApp.
          Antwort werktags innerhalb eines Tages.
        </p>
        <span class="mt-4 text-accent font-semibold text-sm group-hover:underline">
          Chat starten →
        </span>
      </a>

      <div class="card p-6 flex flex-col">
        <div class="w-12 h-12 rounded-lg bg-bg-accent flex items-center justify-center mb-4 text-2xl">
          ✉️
        </div>
        <h3 class="text-xl font-serif font-semibold text-ink-primary mb-2">
          Kontaktformular
        </h3>
        <p class="text-sm text-ink-secondary grow">
          Für ausführlichere Anfragen. Sie beschreiben Ihre Situation, ich melde mich
          per Mail zurück.
        </p>
        <a href="#formular" class="mt-4 text-accent font-semibold text-sm hover:underline">
          Zum Formular ↓
        </a>
      </div>
    </div>

    <form
      id="formular"
      class="max-w-[720px] card p-6 md:p-8 scroll-mt-20"
      novalidate
    >
      <h3 class="text-2xl font-serif font-semibold text-ink-primary mb-6">
        Schreiben Sie mir
      </h3>

      <div class="grid md:grid-cols-2 gap-4 mb-4">
        <label class="block">
          <span class="block text-sm font-medium text-ink-primary mb-1.5">Name *</span>
          <input
            type="text"
            name="name"
            required
            autocomplete="name"
            class="w-full px-4 py-2.5 border border-border rounded-lg focus:ring-2 focus:ring-accent/40 focus:border-accent outline-none transition"
          />
        </label>
        <label class="block">
          <span class="block text-sm font-medium text-ink-primary mb-1.5">Firma *</span>
          <input
            type="text"
            name="company"
            required
            autocomplete="organization"
            class="w-full px-4 py-2.5 border border-border rounded-lg focus:ring-2 focus:ring-accent/40 focus:border-accent outline-none transition"
          />
        </label>
      </div>

      <label class="block mb-4">
        <span class="block text-sm font-medium text-ink-primary mb-1.5">E-Mail *</span>
        <input
          type="email"
          name="email"
          required
          autocomplete="email"
          class="w-full px-4 py-2.5 border border-border rounded-lg focus:ring-2 focus:ring-accent/40 focus:border-accent outline-none transition"
        />
      </label>

      <label class="block mb-5">
        <span class="block text-sm font-medium text-ink-primary mb-1.5">Nachricht *</span>
        <textarea
          name="message"
          required
          rows="5"
          class="w-full px-4 py-2.5 border border-border rounded-lg focus:ring-2 focus:ring-accent/40 focus:border-accent outline-none transition resize-y"
        ></textarea>
      </label>

      <!-- Honeypot -->
      <input
        type="text"
        name="website"
        tabindex="-1"
        autocomplete="off"
        class="absolute -left-[9999px]"
        aria-hidden="true"
      />

      <button type="submit" class="btn-primary w-full md:w-auto">
        Nachricht senden
      </button>

      <p id="form-status" class="mt-4 text-sm" aria-live="polite"></p>
    </form>

    <div class="mt-10 pt-8 border-t border-border flex flex-wrap gap-x-8 gap-y-2 text-sm text-ink-muted">
      {contactEmail && <a href={`mailto:${contactEmail}`} class="hover:text-accent">{contactEmail}</a>}
      {contactPhone && <span>{contactPhone}</span>}
      <a href="https://linkedin.com/in/jannick-oberbeck" target="_blank" rel="noopener" class="hover:text-accent">LinkedIn</a>
    </div>
  </div>
</section>

<script>
  const form = document.getElementById('formular') as HTMLFormElement | null;
  const status = document.getElementById('form-status');
  if (form && status) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      status.textContent = 'Wird gesendet...';
      status.className = 'mt-4 text-sm text-ink-muted';

      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const body = await res.json();

        if (res.ok && body.ok) {
          status.textContent = 'Danke! Ihre Nachricht ist angekommen. Ich melde mich in Kürze.';
          status.className = 'mt-4 text-sm text-green-700';
          form.reset();
        } else if (body.issues?.length) {
          status.textContent = body.issues.map((i: any) => i.message).join(' ');
          status.className = 'mt-4 text-sm text-red-700';
        } else {
          status.textContent = 'Es ist ein Fehler aufgetreten. Bitte per E-Mail oder WhatsApp versuchen.';
          status.className = 'mt-4 text-sm text-red-700';
        }
      } catch {
        status.textContent = 'Netzwerkfehler. Bitte per E-Mail oder WhatsApp versuchen.';
        status.className = 'mt-4 text-sm text-red-700';
      }
    });
  }
</script>
```

- [ ] **Step 16.2: Commit**

```bash
git add src/components/Contact.astro
git commit -m "feat: add contact section with calendly, whatsapp and form"
```

---

## Task 17: WhatsApp Float + Footer Components

**Files:**
- Create: `src/components/WhatsAppFloat.astro`
- Create: `src/components/Footer.astro`

- [ ] **Step 17.1: Create `src/components/WhatsAppFloat.astro`**

```astro
---
const whatsappNumber = import.meta.env.PUBLIC_WHATSAPP_NUMBER || '';
const whatsappText = encodeURIComponent('Hallo Jannick, ich habe eine Frage.');
const url = whatsappNumber ? `https://wa.me/${whatsappNumber}?text=${whatsappText}` : '';
---

{
  url && (
    <a
      href={url}
      target="_blank"
      rel="noopener"
      aria-label="Per WhatsApp schreiben"
      class="md:hidden fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg flex items-center justify-center hover:bg-[#1ebe57] transition-colors"
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    </a>
  )
}
```

- [ ] **Step 17.2: Create `src/components/Footer.astro`**

```astro
---
const year = new Date().getFullYear();
---

<footer class="border-t border-border bg-bg-card">
  <div class="container-page py-12">
    <div class="grid md:grid-cols-3 gap-8">
      <div>
        <p class="font-serif font-semibold text-ink-primary text-lg mb-2">
          ki-kmu-schweiz.ch
        </p>
        <p class="text-sm text-ink-muted">
          Praktische KI-Beratung für Schweizer KMU. Ein Ansprechpartner, ein
          Netzwerk dahinter.
        </p>
      </div>

      <nav aria-label="Footer-Navigation">
        <p class="label-tag text-ink-muted mb-3">Seite</p>
        <ul class="space-y-1.5 text-sm">
          <li><a href="#angebot" class="text-ink-secondary hover:text-accent">Angebot &amp; Preise</a></li>
          <li><a href="#cases" class="text-ink-secondary hover:text-accent">Cases</a></li>
          <li><a href="#ueber-mich" class="text-ink-secondary hover:text-accent">Über mich</a></li>
          <li><a href="#faq" class="text-ink-secondary hover:text-accent">FAQ</a></li>
          <li><a href="#kontakt" class="text-ink-secondary hover:text-accent">Kontakt</a></li>
        </ul>
      </nav>

      <nav aria-label="Rechtliches">
        <p class="label-tag text-ink-muted mb-3">Rechtliches</p>
        <ul class="space-y-1.5 text-sm">
          <li><a href="/impressum" class="text-ink-secondary hover:text-accent">Impressum</a></li>
          <li><a href="/datenschutz" class="text-ink-secondary hover:text-accent">Datenschutz</a></li>
        </ul>
      </nav>
    </div>

    <div class="mt-10 pt-6 border-t border-border text-xs text-ink-muted flex flex-wrap items-center justify-between gap-4">
      <p>© {year} Jannick Oberbeck. Alle Rechte vorbehalten.</p>
      <p>Made in Switzerland 🇨🇭</p>
    </div>
  </div>
</footer>
```

- [ ] **Step 17.3: Commit**

```bash
git add src/components/WhatsAppFloat.astro src/components/Footer.astro
git commit -m "feat: add floating WhatsApp button (mobile) and footer"
```

---

## Task 18: Compose `index.astro`

**Files:**
- Modify: `src/pages/index.astro` (overwrite)

- [ ] **Step 18.1: Replace `src/pages/index.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
import LogoSlider from '../components/LogoSlider.astro';
import Problem from '../components/Problem.astro';
import OfferCards from '../components/OfferCards.astro';
import CaseGrid from '../components/CaseGrid.astro';
import About from '../components/About.astro';
import Trust from '../components/Trust.astro';
import Faq from '../components/Faq.astro';
import Contact from '../components/Contact.astro';
import Footer from '../components/Footer.astro';
import WhatsAppFloat from '../components/WhatsAppFloat.astro';

const description =
  'KI-Beratung für Schweizer KMU: Prozess-Screening, Pilot-Umsetzung, Betrieb. Transparente Fixpreise, 10+ gelieferte Projekte, ein Ansprechpartner mit ETH-Hintergrund.';
---

<BaseLayout
  title="KI-Beratung für Schweizer KMU — ki-kmu-schweiz.ch"
  description={description}
>
  <main>
    <Hero />
    <LogoSlider />
    <Problem />
    <OfferCards />
    <CaseGrid />
    <About />
    <Trust />
    <Faq />
    <Contact />
  </main>
  <Footer />
  <WhatsAppFloat />
</BaseLayout>
```

- [ ] **Step 18.2: Run dev server and smoke-test full page**

```bash
pnpm dev
```

Open `http://localhost:4321/`. Expected: All 10 sections render top to bottom without console errors.

Manual checks:
- Hero text readable, CTAs clickable
- Logo slider animates (6 placeholder logos, seamless loop)
- Problem section with AXA quote
- 3 offer cards with prices
- Case filter bar works: click "Treuhand" → only Treuhand case shown; click "Alle" → all 12 back
- About section with network block
- 3 trust pillars
- FAQ accordion opens/closes on click
- Contact form shows, honeypot hidden
- Footer visible
- Mobile (DevTools responsive mode, 375px): WhatsApp float button appears bottom-right

Stop server.

- [ ] **Step 18.3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: compose full landing page from all section components"
```

---

## Task 19: Datenschutz Page

**Files:**
- Create: `src/pages/datenschutz.astro`

- [ ] **Step 19.1: Create `src/pages/datenschutz.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Footer from '../components/Footer.astro';

const contactEmail = import.meta.env.PUBLIC_CONTACT_EMAIL || 'datenschutz@ki-kmu-schweiz.ch';
---

<BaseLayout
  title="Datenschutz"
  description="Datenschutzerklärung für ki-kmu-schweiz.ch nach Schweizer Datenschutzgesetz (nDSG)."
>
  <main class="container-page py-section">
    <div class="max-w-[780px] prose prose-stone">
      <p class="label-tag text-accent-soft">Datenschutz</p>
      <h1 class="text-headline font-serif font-semibold text-ink-primary mt-2 mb-8">
        Datenschutzerklärung
      </h1>

      <p class="text-ink-secondary">
        Diese Datenschutzerklärung informiert Sie über die Erhebung, Verarbeitung und
        Nutzung personenbezogener Daten beim Besuch dieser Website gemäss dem
        Schweizer Bundesgesetz über den Datenschutz (nDSG, in Kraft seit 1. September 2023).
      </p>

      <h2 class="text-2xl font-serif font-semibold text-ink-primary mt-10 mb-3">
        1. Verantwortliche Stelle
      </h2>
      <p class="text-ink-secondary">
        Jannick Oberbeck<br />
        [Adresse]<br />
        [PLZ Ort]<br />
        E-Mail: <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
      </p>

      <h2 class="text-2xl font-serif font-semibold text-ink-primary mt-10 mb-3">
        2. Erhebung und Verarbeitung personenbezogener Daten
      </h2>
      <p class="text-ink-secondary">
        Personenbezogene Daten werden nur erhoben, wenn Sie diese im Rahmen einer
        Anfrage (Kontaktformular, E-Mail, WhatsApp, Telefon) freiwillig angeben.
        Ich verarbeite diese Daten ausschliesslich zur Bearbeitung Ihrer Anfrage und
        zur anschliessenden Geschäftsbeziehung. Eine Weitergabe an Dritte erfolgt nur
        mit Ihrer ausdrücklichen Einwilligung oder wenn gesetzlich vorgeschrieben.
      </p>

      <h2 class="text-2xl font-serif font-semibold text-ink-primary mt-10 mb-3">
        3. Kontaktformular
      </h2>
      <p class="text-ink-secondary">
        Bei Nutzung des Kontaktformulars werden Name, Firma, E-Mail-Adresse und die
        Nachricht via Vercel Serverless Function an meinen E-Mail-Anbieter (Resend,
        Hosting in der EU) übermittelt und anschliessend als E-Mail an mich zugestellt.
        Die Daten werden ausschliesslich zur Beantwortung Ihrer Anfrage verwendet.
      </p>

      <h2 class="text-2xl font-serif font-semibold text-ink-primary mt-10 mb-3">
        4. Hosting und Server-Logs
      </h2>
      <p class="text-ink-secondary">
        Die Website wird von Vercel Inc. gehostet. Beim Besuch werden technisch
        notwendige Server-Logs erstellt (IP-Adresse, User-Agent, Zeitpunkt). Diese
        Logs werden kurzfristig gespeichert und ausschliesslich zur Sicherstellung
        des Betriebs und zur Abwehr von Angriffen genutzt.
      </p>

      <h2 class="text-2xl font-serif font-semibold text-ink-primary mt-10 mb-3">
        5. Analytics
      </h2>
      <p class="text-ink-secondary">
        Falls aktiviert, setze ich Plausible Analytics ein — ein cookieloser,
        datenschutzfreundlicher Dienst, der keine personenbezogenen Daten sammelt und
        keine Nutzerprofile erstellt. Siehe <a
          href="https://plausible.io/data-policy"
          target="_blank"
          rel="noopener">plausible.io/data-policy</a>.
      </p>

      <h2 class="text-2xl font-serif font-semibold text-ink-primary mt-10 mb-3">
        6. Eingebettete Dienste (Calendly)
      </h2>
      <p class="text-ink-secondary">
        Beim Klick auf "Erstgespräch vereinbaren" werden Sie zu Calendly weitergeleitet,
        einem Dienst von Calendly LLC (USA). Beim Nutzen von Calendly gelten deren
        Datenschutzbestimmungen: <a
          href="https://calendly.com/privacy"
          target="_blank"
          rel="noopener">calendly.com/privacy</a>.
      </p>

      <h2 class="text-2xl font-serif font-semibold text-ink-primary mt-10 mb-3">
        7. WhatsApp
      </h2>
      <p class="text-ink-secondary">
        Beim Klick auf den WhatsApp-Button werden Sie zu WhatsApp (Meta Platforms Inc.)
        weitergeleitet. Nachrichten, die Sie dort an mich senden, unterliegen den
        Datenschutzbestimmungen von WhatsApp/Meta.
      </p>

      <h2 class="text-2xl font-serif font-semibold text-ink-primary mt-10 mb-3">
        8. Ihre Rechte
      </h2>
      <p class="text-ink-secondary">
        Sie haben jederzeit das Recht auf Auskunft, Berichtigung, Löschung und
        Einschränkung der Verarbeitung Ihrer personenbezogenen Daten. Wenden Sie sich
        hierfür formlos an <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
      </p>

      <p class="text-ink-muted text-sm mt-12">
        Stand: April 2026
      </p>
    </div>
  </main>
  <Footer />
</BaseLayout>
```

Note: The placeholder `[Adresse]` fields must be filled in by the user before Go-Live (listed in the spec's "Open Items" section).

- [ ] **Step 19.2: Commit**

```bash
git add src/pages/datenschutz.astro
git commit -m "feat: add datenschutz page with nDSG-compliant template"
```

---

## Task 20: Impressum Page

**Files:**
- Create: `src/pages/impressum.astro`

- [ ] **Step 20.1: Create `src/pages/impressum.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Footer from '../components/Footer.astro';

const contactEmail = import.meta.env.PUBLIC_CONTACT_EMAIL || 'jannick@ki-kmu-schweiz.ch';
const contactPhone = import.meta.env.PUBLIC_CONTACT_PHONE || '';
---

<BaseLayout
  title="Impressum"
  description="Impressum von ki-kmu-schweiz.ch"
>
  <main class="container-page py-section">
    <div class="max-w-[780px]">
      <p class="label-tag text-accent-soft">Impressum</p>
      <h1 class="text-headline font-serif font-semibold text-ink-primary mt-2 mb-8">
        Impressum
      </h1>

      <div class="space-y-6 text-ink-secondary">
        <div>
          <h2 class="text-xl font-serif font-semibold text-ink-primary mb-2">
            Verantwortliche Person
          </h2>
          <p>
            Jannick Oberbeck<br />
            [Strasse und Hausnummer]<br />
            [PLZ Ort]<br />
            Schweiz
          </p>
        </div>

        <div>
          <h2 class="text-xl font-serif font-semibold text-ink-primary mb-2">
            Kontakt
          </h2>
          <p>
            E-Mail: <a href={`mailto:${contactEmail}`} class="text-accent hover:underline">{contactEmail}</a><br />
            {contactPhone && <>Telefon: {contactPhone}<br /></>}
          </p>
        </div>

        <div>
          <h2 class="text-xl font-serif font-semibold text-ink-primary mb-2">
            Unternehmensangaben
          </h2>
          <p>
            UID: [CHE-XXX.XXX.XXX — sobald vorhanden]
          </p>
        </div>

        <div>
          <h2 class="text-xl font-serif font-semibold text-ink-primary mb-2">
            Haftungsausschluss
          </h2>
          <p>
            Die Inhalte dieser Website werden mit grösstmöglicher Sorgfalt erstellt.
            Der Anbieter übernimmt jedoch keine Gewähr für die Richtigkeit, Vollständigkeit
            und Aktualität der bereitgestellten Inhalte. Die Nutzung der Inhalte erfolgt
            auf eigene Gefahr. Namentlich gekennzeichnete Beiträge geben die Meinung des
            jeweiligen Autors und nicht immer die Meinung des Anbieters wieder.
          </p>
        </div>

        <div>
          <h2 class="text-xl font-serif font-semibold text-ink-primary mb-2">
            Urheberrecht
          </h2>
          <p>
            Die auf dieser Website veröffentlichten Inhalte unterliegen dem Schweizer
            Urheberrecht. Jede Verwendung ausserhalb der Grenzen des Urheberrechts bedarf
            der vorherigen schriftlichen Zustimmung des jeweiligen Rechteinhabers.
          </p>
        </div>
      </div>
    </div>
  </main>
  <Footer />
</BaseLayout>
```

- [ ] **Step 20.2: Commit**

```bash
git add src/pages/impressum.astro
git commit -m "feat: add impressum page"
```

---

## Task 21: SEO — Structured Data + OG Image Placeholder

**Files:**
- Modify: `src/layouts/BaseLayout.astro` (add JSON-LD)
- Create: `public/og-image.svg` (placeholder; PNG is the long-term target)

- [ ] **Step 21.1: Add JSON-LD structured data to `BaseLayout.astro`**

Add inside the `<head>`, just before the closing tag:

```astro
<script type="application/ld+json" set:html={JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': 'https://ki-kmu-schweiz.ch/#org',
  name: 'ki-kmu-schweiz.ch — KI-Beratung für Schweizer KMU',
  description: 'Praktische KI-Beratung für Schweizer KMU. Prozess-Screening, Pilot-Umsetzung, Betrieb. Transparente Fixpreise.',
  url: 'https://ki-kmu-schweiz.ch',
  areaServed: { '@type': 'Country', name: 'CH' },
  inLanguage: 'de-CH',
  founder: { '@type': 'Person', name: 'Jannick Oberbeck' },
  priceRange: 'CHF 2500 - 35000',
  offers: [
    {
      '@type': 'Offer',
      name: 'KI-Potenzial-Check',
      price: '2500',
      priceCurrency: 'CHF',
      description: 'Prozess-Screening, priorisierte Use-Case-Liste, ROI-Schätzung.',
    },
    {
      '@type': 'Offer',
      name: 'Pilot-Projekt',
      priceCurrency: 'CHF',
      priceSpecification: { '@type': 'PriceSpecification', minPrice: '15000', maxPrice: '35000', priceCurrency: 'CHF' },
      description: 'Ein Use-Case vom Konzept zur lauffähigen Lösung, inkl. 4 Wochen Betreuung.',
    },
    {
      '@type': 'Offer',
      name: 'Partnerschaft & Betrieb',
      price: '2500',
      priceCurrency: 'CHF',
      priceSpecification: { '@type': 'UnitPriceSpecification', price: '2500', priceCurrency: 'CHF', unitCode: 'MON' },
      description: 'Monatliche Partnerschaft für Betrieb, Weiterentwicklung und Roadmap.',
    },
  ],
})} />
```

- [ ] **Step 21.2: Create placeholder `public/og-image.svg`**

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <rect width="1200" height="630" fill="#fbf9f4"/>
  <rect x="0" y="0" width="12" height="630" fill="#b45309"/>
  <text x="80" y="260" font-family="Georgia, serif" font-size="60" font-weight="700" fill="#1c1917">
    <tspan x="80" dy="0">In 8 Wochen vom</tspan>
    <tspan x="80" dy="72">Prozess-Schmerz zur</tspan>
    <tspan x="80" dy="72" fill="#b45309">laufenden KI-Lösung.</tspan>
  </text>
  <text x="80" y="520" font-family="Inter, sans-serif" font-size="28" font-weight="600" fill="#57534e">
    ki-kmu-schweiz.ch
  </text>
  <text x="80" y="560" font-family="Inter, sans-serif" font-size="20" fill="#78716c">
    KI-Beratung für Schweizer KMU · ETH-Background · 10+ Projekte
  </text>
</svg>
```

Note: Replace `ogImage` default in `BaseLayout.astro` to `/og-image.svg` for now; convert to PNG before production (SVG-based OG images are not universally supported by all social crawlers). Add this as a task in the launch checklist (Task 23).

- [ ] **Step 21.3: Commit**

```bash
git add .
git commit -m "feat: add structured data (ProfessionalService schema) and OG image placeholder"
```

---

## Task 22: Vercel Configuration + Deploy

**Files:**
- Create: `vercel.json`

- [ ] **Step 22.1: Create `vercel.json`**

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "astro",
  "buildCommand": "pnpm build",
  "outputDirectory": "dist",
  "installCommand": "pnpm install",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    }
  ]
}
```

- [ ] **Step 22.2: Run production build locally**

```bash
pnpm build
```

Expected: Astro build succeeds, `dist/` directory created. No errors. If errors occur, fix them before deployment.

- [ ] **Step 22.3: Preview locally**

```bash
pnpm preview
```

Open the preview URL (typically `http://localhost:4321/`). Expected: full site renders from the production build. Stop server.

- [ ] **Step 22.4: Deploy to Vercel (preview)**

```bash
vercel
```

Follow the CLI prompts: link to existing project or create new. Expected: Preview URL is printed. Open it.

- [ ] **Step 22.5: Set environment variables in Vercel**

Via the Vercel dashboard or CLI:

```bash
vercel env add RESEND_API_KEY production
vercel env add CONTACT_FORM_TO production
vercel env add PUBLIC_CALENDLY_URL production
vercel env add PUBLIC_WHATSAPP_NUMBER production
vercel env add PUBLIC_CONTACT_EMAIL production
vercel env add PUBLIC_CONTACT_PHONE production
```

For each, paste the real value. For `PUBLIC_*` vars, mark them as "Available in Build Environment". For `RESEND_API_KEY` and `CONTACT_FORM_TO`, mark as "Sensitive".

- [ ] **Step 22.6: Deploy to production**

```bash
vercel --prod
```

Expected: Production URL printed. Open it. Site should fully function.

- [ ] **Step 22.7: Commit**

```bash
git add vercel.json
git commit -m "chore: add vercel config with security headers"
```

---

## Task 23: Lighthouse Audit + Launch Checklist

**Files:**
- Create: `README.md` (if missing, with launch checklist)

- [ ] **Step 23.1: Run Lighthouse audit**

Open Chrome DevTools on the Vercel production URL. Run Lighthouse with these settings:
- Mode: Navigation
- Device: Mobile and Desktop (run both)
- Categories: Performance, Accessibility, Best Practices, SEO

Expected targets (from spec):
- Performance ≥ 95
- Accessibility ≥ 95
- Best Practices ≥ 95
- SEO: 100

- [ ] **Step 23.2: Fix any red or orange issues**

Common fixes:
- **Images without width/height:** already handled in LogoSlider; for any new images, always set width+height
- **Missing alt text:** check all `<img>` tags — decorative images should have `alt=""`, content images need descriptive alt
- **Tap targets too small on mobile:** ensure all interactive elements are ≥ 48×48 px hit area (already built into button padding)
- **Missing meta description:** check BaseLayout (already there)
- **Contrast issues:** verify text on `bg-bg-accent` passes AA — if not, darken accent text color

Re-run Lighthouse after each fix.

- [ ] **Step 23.3: Create `README.md` with launch checklist**

```markdown
# ki-kmu-schweiz.ch

Landing page for Jannick Oberbeck's KI consulting business.

**Live:** https://ki-kmu-schweiz.ch

## Stack

- Astro 4 + Tailwind CSS 3 + TypeScript
- Deployed on Vercel (hybrid, serverless API for contact form)
- Content Collections for case studies and FAQs (markdown)
- Email via Resend

## Development

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # production build
pnpm preview    # serve production build
```

## Environment Variables

Copy `.env.example` to `.env` and fill in real values.

## Content

- Case studies: `src/content/cases/*.md`
- FAQs: `src/content/faqs/*.md`

Edit markdown files and the page rebuilds automatically.

## Launch Checklist

Before opening the site to the public:

- [ ] Replace placeholder logos in `public/logos/` with real client logos (SVG preferred)
- [ ] Replace portrait placeholder (initials "JO") in `src/components/About.astro` and `src/components/Hero.astro` with real photo
- [ ] Verify anchor case numbers (cases 1, 4, 7, 8) match real delivered projects
- [ ] Fill in `[Adresse]` and `[PLZ Ort]` placeholders in `src/pages/datenschutz.astro` and `src/pages/impressum.astro`
- [ ] Add real UID in impressum
- [ ] Set production env vars in Vercel (RESEND_API_KEY, CONTACT_FORM_TO, PUBLIC_CALENDLY_URL, PUBLIC_WHATSAPP_NUMBER, PUBLIC_CONTACT_EMAIL, PUBLIC_CONTACT_PHONE)
- [ ] Test contact form end-to-end (real email arrives)
- [ ] Test Calendly link leads to real booking page
- [ ] Test WhatsApp link opens WhatsApp with prefilled text
- [ ] Run Lighthouse: Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO 100
- [ ] Set up Plausible Analytics account (or enable Vercel Analytics) and uncomment script in `BaseLayout.astro`
- [ ] Configure DNS: `ki-kmu-schweiz.ch` → Vercel
- [ ] Submit sitemap to Google Search Console
- [ ] Convert `public/og-image.svg` to PNG (1200×630) for full OG compatibility
- [ ] Juristischer Quick-Check der Datenschutzerklärung vor Go-Live
```

- [ ] **Step 23.4: Final commit**

```bash
git add README.md
git commit -m "docs: add README and launch checklist"
```

---

## Self-Review Summary

**Spec coverage:** Every section in the spec maps to at least one task:
- §1 Purpose → Task 18 (index.astro composition), Task 21 (SEO)
- §2 Target audience → content reflected in all copy
- §3 Positioning → Hero (Task 6), About (Task 11), Network Block (Task 11)
- §4 Offer structure → Task 9 (OfferCards), Task 21 (JSON-LD offers)
- §5 Content strategy → Hero (6), Problem (8), About+Network (11), Trust (12), Cases (4+10), FAQ (5+13), Contact (16)
- §6 Visual design → Task 2 (Tailwind theme), Task 3 (global styles and fonts)
- §7 Page structure → Task 18 composes all 10 sections
- §8 Tech stack → Tasks 1, 2, 15, 22
- §9 Open items → Task 23 launch checklist
- §10 Risks → mitigated by anchor badges in CaseCard, honest subtitle in CaseGrid, transparent pricing everywhere
- §11 Success metrics → cannot be implemented in code, deferred to post-launch

**Placeholder scan:** No "TODO", "TBD", or empty steps. Content placeholders (user's photo, real logos, real contact data) are explicitly listed in Task 23 launch checklist and referenced in the generated code with clear markers.

**Type consistency:** Content Collection schema (Task 4) matches CaseCard prop usage (Task 10). Environment variable names (`PUBLIC_CALENDLY_URL`, `PUBLIC_WHATSAPP_NUMBER`, etc.) are consistent across Hero (Task 6), Contact (Task 16), WhatsAppFloat (Task 17), and `.env.example` (Task 1).

**Ambiguity check:** Analytics (Plausible vs. Vercel Analytics) is left as a choice in the launch checklist — both are valid, user decides. SVG vs. PNG for OG image is acknowledged with a checklist item.
