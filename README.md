# Heaven Furniture Mart — Website

The official one-page website for **Heaven Furniture Mart**, a bespoke furniture and
interior-styling studio on Agrabad Access Road, Chattogram.

Its one job is to make a first-time visitor understand the brand within 30 seconds and
send an enquiry. Every "Request a quote" button opens a pre-filled **WhatsApp** message,
so there is no form to manage and no inbox to check besides WhatsApp.

Built with [Claude Code](https://claude.com/claude-code).

---

## What's on the page

One page, scrolled top to bottom:

| Section           | What the visitor sees                                                                |
| ----------------- | ------------------------------------------------------------------------------------ |
| **Hero**          | The headline, a photo of a piece, and the main "Request a quote" button              |
| **Why Heaven**    | The short brand story and the trust points (free consultation, delivery included, …) |
| **Collections**   | Living, Bedroom, Dining, Office — a photo for each                                   |
| **Bespoke**       | The "if it doesn't exist yet, we build it" moment — the studio's main differentiator |
| **Beliefs**       | Three things the studio does not compromise on                                       |
| **How it works**  | Consultation → Design → Craft → Install, with a workshop photo                       |
| **In motion**     | Two short workshop video clips (tap to play — nothing loads until tapped)            |
| **Proof**         | The founder's quote, the real storefront photo, and a timeline of milestones         |
| **FAQ**           | Six common questions answered                                                        |
| **Build a brief** | A short guided form (piece → style → timeline) that composes the WhatsApp message    |
| **Footer**        | Address, phone, email, social links                                                  |

A few interactive touches: the hero photo can switch to a **live 3D model** ("Explore in
3D") that only loads if the visitor asks for it; on phones a **"Request a quote" bar**
stays pinned to the bottom of the screen.

---

## See it on your own computer

You need **[Node.js](https://nodejs.org)** installed — version 20 or newer (22 is
recommended). To check what you have, open a terminal and run `node --version`.

Then, in this project folder:

```sh
npm install      # first time only — downloads what the site needs (~1–2 min)
npm run dev      # starts the site
```

Open **http://localhost:8080** in your browser. Leave the terminal window open while you
work; press `Ctrl + C` in it to stop.

Any change you save to a file shows up in the browser immediately.

---

## Put it online (free, on Cloudflare)

The site is set up to run on **Cloudflare** — free, fast worldwide, free HTTPS, no
bandwidth limit.

### First time only

1. Make a free account at **[dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)** (no card required).
2. In the project folder, run:
   ```sh
   npx wrangler login
   ```
   Your browser opens — click **Allow**. This links the project to your account and only
   has to be done once.
3. Open `src/content/site.ts` and set `website:` (near the top) to the address the site
   will live at. On the first deploy this is
   `https://heaven-furniture-mart.<your-name>.workers.dev` — you can deploy once, copy the
   address it prints, paste it here, and deploy again.

### Every time you want to publish

```sh
npm run deploy
```

That builds the site and pushes it live in about 30 seconds. It prints the public address
when it's done.

### Using your own domain (e.g. `heavenfurnituremart.com`)

In the Cloudflare dashboard: **Workers & Pages → heaven-furniture-mart → Settings →
Domains & Routes → Add → Custom Domain**. Cloudflare sets up the HTTPS certificate
automatically. Then update `website:` in `src/content/site.ts` to that domain and run
`npm run deploy` once more.

---

## Making changes

### Change any wording on the page

**All of the site's text lives in one file: [`src/content/site.ts`](src/content/site.ts).**
Headlines, the brand story, FAQ answers, the address, phone number, opening hours,
milestones — all of it. Edit the text between the quote marks, save, and check
`http://localhost:8080`. When it looks right, run `npm run deploy`.

### Swap a photo

Put your new image in **`public/images/`** using the **exact same file name** as the one
it replaces (for example, overwrite `collection-living.jpg`). Keep it roughly the same
shape (portrait or landscape) as the original. No code change needed — just re-deploy.

`ASSETS.md` lists every image and video, where it appears, and what size it should be.

### Swap a workshop video

Same idea — put the new `.mp4` in **`public/videos/`** with the same file name
(`workshop-01.mp4` or `workshop-02.mp4`).

### Two reference documents

- **`ASSETS.md`** — every photo, video and 3D model: where it's used and where it came from.
- **`OPEN-ITEMS.md`** — facts the site does **not** claim yet because they haven't been
  confirmed (exact timber origins, price ranges, etc.). Read it before adding new claims —
  nothing on the site is invented.

---

## For developers

**Stack:** [TanStack Start](https://tanstack.com/start) (React 19, Vite 8, SSR) ·
Tailwind CSS v4 · three.js / React Three Fiber for the opt-in 3D · Nitro builds a
Cloudflare Worker.

| Path                       | Contents                                                        |
| -------------------------- | --------------------------------------------------------------- |
| `src/routes/index.tsx`     | page composition, SEO `<head>`, `FurnitureStore` JSON-LD        |
| `src/routes/__root.tsx`    | app shell, error / not-found boundaries                         |
| `src/content/site.ts`      | all copy + business facts                                       |
| `src/components/sections/` | one file per page section (plus `BriefBuilder`)                 |
| `src/components/three/`    | the 3D scene — client-only, code-split, lazy                    |
| `src/lib/config-store.ts`  | shared store linking the hero configurator to the brief builder |
| `src/styles.css`           | Tailwind v4 theme tokens and the site's custom utilities        |
| `public/`                  | images, videos, glTF models, favicons, `robots.txt`             |

```sh
npm run dev          # dev server, http://localhost:8080
npm run start        # build + serve the real Cloudflare Worker locally (wrangler dev)
npm run build        # production build -> .output/
npm run deploy       # build + wrangler deploy
npm run typecheck    # tsc --noEmit
npm run lint         # eslint
npm run format       # prettier --write .
```

`npm run typecheck` and `npm run lint` both run clean (0 errors, 0 warnings).
