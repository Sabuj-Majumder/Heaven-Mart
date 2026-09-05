# Heaven Furniture Mart

The official website for **Heaven Furniture Mart** — a bespoke furniture and interior-styling studio on Agrabad Access Road, Chattogram, Bangladesh.

This is a single-page, conversion-focused site. Its purpose is simple: help a first-time visitor understand the brand within 30 seconds and send an enquiry. Every "Request a quote" button opens a pre-filled **WhatsApp** message — no contact forms, no backend inbox, no CRM to maintain.

---

## 🏆 Hackathon Submission

Built for the **RACDOX Hackathon** as a real-world client project for
**Heaven Furniture Mart**, a bespoke furniture studio in Chattogram, Bangladesh.

|                    |                                                                          |
| ------------------ | ------------------------------------------------------------------------ |
| **Event**          | RACDOX Hackathon                                                        |
| **Client / Brief** | Heaven Furniture Mart — conversion-focused brand site                    |
| **Live demo**      | <https://heaven-mart.sabujmajumder100.workers.dev/>                     |
| **Team**           | Sabuj Majumder                                                          |
| **Submission date**| 06.09.2026                                                             |
| **Built with**     | TanStack Start · React 19 · Tailwind v4 · three.js · Cloudflare Workers  |

---

## Table of Contents

- [Overview](#overview)
- [Page Sections](#page-sections)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Content Management](#content-management)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Design System](#design-system)
- [SEO & Structured Data](#seo--structured-data)
- [Accessibility](#accessibility)
- [Reference Documents](#reference-documents)
- [License](#license)

---

## Overview

Heaven Furniture Mart was founded in 2020 by Abul Kalam Bhuiyan. The studio designs, builds, and installs custom furniture and interiors from its own workshop in Agrabad, Chattogram. This website serves as the brand's digital storefront — a single landing page that communicates the full brand story, showcases collections, and funnels all enquiries through WhatsApp.

The site is server-side rendered for fast initial loads and SEO, deploys to Cloudflare Workers for global edge delivery, and uses no third-party analytics or tracking scripts.

---

## Page Sections

The page is composed of the following sections, scrolled top to bottom:

| Section           | What the Visitor Sees                                                                 |
| ----------------- | ------------------------------------------------------------------------------------- |
| **Hero**          | Brand headline, a hero photo with optional 3D model viewer, and the primary CTA       |
| **Why Heaven**    | The short brand story, trust points (free consultation, delivery included, etc.)       |
| **Collections**   | Living, Bedroom, Dining, Office — a photo card for each collection                    |
| **Bespoke**       | The studio's main differentiator — "if it doesn't exist yet, we build it"             |
| **Beliefs**       | Three things the studio does not compromise on                                        |
| **How It Works**  | The four-stage process: Consultation → Design → Craft → Install                       |
| **In Motion**     | Two short workshop video clips (tap to play — nothing loads until tapped)              |
| **Proof**         | Founder's quote, real storefront photo, and a timeline of milestones                  |
| **FAQ**           | Six common questions answered in an accordion                                         |
| **Build a Brief** | A guided form (room → piece → style → timeline) that composes the WhatsApp message    |
| **Footer**        | Address, phone, email, social links, and opening hours                                |

---

## Key Features

- **3D Product Configurator** — The hero section offers an optional interactive 3D viewer ("Explore in 3D") using three.js and React Three Fiber. The 3D models are code-split and lazy-loaded — they only download if the visitor explicitly requests them. On initial load, a static photograph is shown instead.
- **Guided Brief Builder** — A multi-step form that collects the visitor's room type, furniture piece, preferred style, wood finish, size, and timeline. Selections made in the hero configurator carry forward automatically. On submission, it composes a structured WhatsApp message.
- **Sticky Mobile CTA** — On phones, a "Request a quote" bar stays pinned to the bottom of the screen for always-accessible conversion.
- **Scroll Reveal Animations** — Subtle entrance animations as sections come into view, with full respect for `prefers-reduced-motion`.
- **Server-Side Rendering** — Full SSR via TanStack Start and Nitro for fast first contentful paint and SEO indexability.
- **Edge Deployment** — Deploys as a Cloudflare Worker for sub-50ms TTFB worldwide, free HTTPS, and no bandwidth limits.

---

## Tech Stack

| Layer           | Technology                                                             |
| --------------- | ---------------------------------------------------------------------- |
| **Framework**   | [TanStack Start](https://tanstack.com/start) (React 19, Vite 8, SSR)  |
| **Styling**     | [Tailwind CSS v4](https://tailwindcss.com/) with custom design tokens  |
| **3D**          | [three.js](https://threejs.org/) / [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) / [Drei](https://github.com/pmndrs/drei) |
| **UI**          | [Radix UI](https://www.radix-ui.com/) (accordion), [Lucide](https://lucide.dev/) (icons) |
| **Build**       | [Vite 8](https://vite.dev/) + [Nitro](https://nitro.build/) → Cloudflare Worker |
| **Hosting**     | [Cloudflare Workers](https://workers.cloudflare.com/) (free tier)      |
| **Typography**  | Cormorant Garamond (display serif) + Jost (geometric sans) via Google Fonts |
| **Language**     | TypeScript (strict mode)                                               |
| **Linting**     | ESLint 9 + Prettier                                                    |

---

## Prerequisites

- **[Node.js](https://nodejs.org/)** — version 20 or newer (22 recommended)
- **npm** — ships with Node.js

To verify your Node version:

```sh
node --version
```

---

## Getting Started

1. **Clone the repository:**

   ```sh
   git clone https://github.com/Sabuj-Majumder/Heaven-Mart.git
   cd Heaven-Mart
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Start the development server:**

   ```sh
   npm run dev
   ```

4. **Open your browser** at **http://localhost:8080**

The dev server supports hot module replacement — any file change is reflected in the browser immediately. Press `Ctrl + C` in the terminal to stop.

---

## Deployment

The site is configured to deploy on **Cloudflare Workers** — free, globally distributed, with automatic HTTPS and no bandwidth limits.

### First-Time Setup

1. Create a free Cloudflare account at [dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up) (no credit card required).

2. Authenticate with Wrangler:

   ```sh
   npx wrangler login
   ```

   Your browser will open — click **Allow**. This only needs to be done once.

3. Open `src/content/site.ts` and set the `website` field to your production URL:

   ```ts
   website: "https://your-production-domain.com",
   ```

   On first deploy, use the `*.workers.dev` URL that Cloudflare assigns, then update this field and re-deploy.

### Publishing

```sh
npm run deploy
```

This builds the site and pushes it live in about 30 seconds. The public URL is printed when done.

### Custom Domain

In the Cloudflare dashboard: **Workers & Pages → heaven-furniture-mart → Settings → Domains & Routes → Add → Custom Domain**. Cloudflare provisions the HTTPS certificate automatically. Update `website` in `src/content/site.ts` to match, then run `npm run deploy` once more.

---

## Content Management

### All site copy lives in a single file

**[`src/content/site.ts`](src/content/site.ts)** is the single source of truth for every piece of text on the page — headlines, the brand story, FAQ answers, the address, phone number, opening hours, milestones, wood descriptions, and more.

To change any wording:
1. Edit the text between the quote marks in `site.ts`
2. Save the file
3. Check the result at `http://localhost:8080`
4. When it looks right, run `npm run deploy`

### Swapping a Photo

Place your new image in **`public/images/`** using the **exact same filename** as the one it replaces (e.g., overwrite `collection-living.jpg`). Keep the same aspect ratio as the original. No code changes needed — just re-deploy.

See [`ASSETS.md`](ASSETS.md) for a full inventory of every image and video, where it appears on the page, and what dimensions to use.

### Swapping a Workshop Video

Same approach — put the new `.mp4` in **`public/videos/`** with the same filename (`workshop-01.mp4` or `workshop-02.mp4`). Both clips should be landscape 16:9.

---

## Project Structure

```
heaven-furniture-mart/
├── public/                          # Static assets (served as-is)
│   ├── images/                      # Photos, poster stills, configurator renders
│   ├── models/                      # glTF 3D models (CC0, from Poly Haven)
│   ├── videos/                      # Workshop video clips
│   ├── favicon.svg                  # Primary favicon (SVG)
│   ├── favicon.ico                  # Fallback favicon (multi-resolution)
│   ├── apple-touch-icon.png         # iOS home screen icon
│   └── robots.txt                   # Search engine directives
├── src/
│   ├── components/
│   │   ├── sections/
│   │   │   ├── Hero.tsx             # Hero section with configurator toggle
│   │   │   ├── Sections.tsx         # All other page sections
│   │   │   └── BriefBuilder.tsx     # Guided WhatsApp brief form
│   │   ├── three/
│   │   │   ├── ConfigScene.tsx      # 3D scene (client-only, code-split, lazy)
│   │   │   └── ConfigStage.tsx      # 3D stage wrapper and loading state
│   │   ├── ui/                      # Reusable UI primitives (accordion, etc.)
│   │   ├── SiteHeader.tsx           # Fixed navigation header
│   │   ├── BackToTop.tsx            # Scroll-to-top button
│   │   ├── CtaButton.tsx            # Primary CTA button component
│   │   └── StickyMobileCTA.tsx      # Mobile-only persistent CTA bar
│   ├── content/
│   │   └── site.ts                  # All copy, business data, and configuration
│   ├── hooks/
│   │   └── use-reveal.ts            # Intersection Observer hook for scroll reveals
│   ├── lib/
│   │   ├── config-store.ts          # Shared state: hero configurator ↔ brief builder
│   │   ├── concept.ts               # Stub for future "see it in your room" feature
│   │   ├── error-capture.ts         # Error boundary utilities
│   │   ├── error-page.ts            # Static error page HTML
│   │   └── utils.ts                 # Shared utility functions (cn, etc.)
│   ├── routes/
│   │   ├── __root.tsx               # App shell, head tags, error/404 boundaries
│   │   └── index.tsx                # Page composition, SEO meta, JSON-LD
│   ├── styles.css                   # Tailwind v4 theme tokens and custom utilities
│   ├── router.tsx                   # TanStack Router setup
│   ├── server.ts                    # SSR entry point
│   └── start.ts                     # TanStack Start entry
├── ASSETS.md                        # Full asset register with provenance
├── OPEN-ITEMS.md                    # Unconfirmed facts — read before adding claims
├── package.json
├── tsconfig.json
├── vite.config.ts
├── eslint.config.js
├── .prettierrc
└── .gitignore
```

---

## Available Scripts

| Command              | Description                                                    |
| -------------------- | -------------------------------------------------------------- |
| `npm run dev`        | Start the dev server at `http://localhost:8080`                 |
| `npm run build`      | Production build → `.output/`                                  |
| `npm run start`      | Build + serve the real Cloudflare Worker locally (wrangler dev) |
| `npm run deploy`     | Build + deploy to Cloudflare Workers                           |
| `npm run typecheck`  | Run `tsc --noEmit` (strict TypeScript checking)                |
| `npm run lint`       | Run ESLint across the project                                  |
| `npm run format`     | Run Prettier on all files                                      |

Both `typecheck` and `lint` pass cleanly with zero errors and zero warnings.

---

## Design System

The site uses a curated, restrained palette designed to evoke a high-end furniture showroom:

| Token         | Value                          | Role                                           |
| ------------- | ------------------------------ | ---------------------------------------------- |
| `background`  | Deep charcoal with teal cast   | Primary ground — "a showroom at dusk, not black" |
| `surface`     | Slightly lighter charcoal-teal | Card and panel backgrounds                     |
| `ivory`       | Warm off-white                 | Primary text, never clinical against brass      |
| `brass`       | Muted gold from the logo       | Accent only — links, rules, focus rings         |
| `walnut`      | Natural walnut tan             | Material-led secondary accents                  |
| `espresso`    | Deep warm brown                | Grounding accents on light panels               |

**Typography:**
- **Cormorant Garamond** — display headings and blockquotes
- **Jost** — body text, UI labels, and navigation

**Motion:** A single animation pattern — gentle scroll reveals (`reveal` / `reveal-in`) and a headline rise effect (`line-clip` / `line-rise`). All motion respects `prefers-reduced-motion`.

**Texture:** A subtle SVG film-grain overlay (`grain` utility) on dark backgrounds adds perceived depth without visual noise.

---

## SEO & Structured Data

- Server-side rendered HTML for full search engine indexability
- Proper `<title>`, `meta description`, `og:*`, and `twitter:card` tags
- Canonical URL set via `src/content/site.ts`
- `FurnitureStore` JSON-LD schema (Schema.org) with business name, address, phone, email, founder, and founding date
- `robots.txt` for crawler directives
- Semantic HTML with a single `<h1>` per page and proper heading hierarchy

---

## Accessibility

- All interactive elements have visible `:focus-visible` outlines (brass ring, 3px offset)
- `::selection` uses the brand palette for consistent visual identity
- Scroll reveal animations degrade gracefully:
  - `prefers-reduced-motion: reduce` — all animations and transitions are disabled
  - `scripting: none` — SSR content remains visible without JavaScript
- `suppressHydrationWarning` on `<html>` and `<body>` prevents false-positive mismatch warnings from browser extensions (Grammarly, QuillBot, etc.)
- Semantic heading structure and ARIA attributes on interactive components (Radix accordion)
- WCAG AA–compliant contrast ratios for body copy on the charcoal background

---

## Reference Documents

Two supporting documents ship alongside this README:

- **[`ASSETS.md`](ASSETS.md)** — A complete register of every photo, video, 3D model, and favicon used on the site: where each asset appears, its dimensions, and its source/provenance. Consult this before swapping or adding any media.
- **[`OPEN-ITEMS.md`](OPEN-ITEMS.md)** — Facts the site deliberately does **not** claim because they have not been confirmed by the client (exact timber origins, price ranges, social profile URLs, etc.). Read this before adding new claims to the copy — nothing on the site is invented.

---

## License

This is a private project for Heaven Furniture Mart, produced as an entry for the RACDOX Hackathon. All rights reserved.

3D models sourced from [Poly Haven](https://polyhaven.com/) under [CC0](https://creativecommons.org/publicdomain/zero/1.0/). Fonts loaded from [Google Fonts](https://fonts.google.com/) under the [Open Font License](https://openfontlicense.org/).
