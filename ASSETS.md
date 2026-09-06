# Asset Register

Every external/generated asset used on the site, with provenance.

## Favicon

| File                          | Usage                                                                                                           |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `public/favicon.svg`          | Browser tab icon (primary — scalable, all modern browsers)                                                      |
| `public/favicon.ico`          | Browser tab icon (fallback for older browsers) — multi-resolution (16/32/48/256px), rendered from `favicon.svg` |
| `public/apple-touch-icon.png` | iOS "Add to Home Screen" icon, 180×180, opaque PNG (Apple doesn't reliably render SVG here)                     |

All three are the same mark — a brass "H" on the site's charcoal — set in `src/routes/__root.tsx`. They replace the generic placeholder favicon that shipped with the starter template. `favicon.svg` itself already existed at the repo root from earlier in the build but was never wired up or servable (outside `public/`, and not referenced by any `<link>`) — moved into `public/` and connected. If the mark changes, regenerate `favicon.ico`/`apple-touch-icon.png` from the new `favicon.svg` (render to PNG, then re-export at the sizes above) rather than hand-editing the binary files.

## 3D model

All from **Poly Haven** (CC0). Each is a `_1k.gltf` + companion `.bin` geometry buffer + `textures/` (diff / nor_gl / arm, 1k JPEG).

| Folder                                 | Poly Haven asset                 | Used by                                                           |
| -------------------------------------- | -------------------------------- | ----------------------------------------------------------------- |
| `public/models/lounge_chair/`          | "Mid Century Lounge Chair"       | hero configurator — Living / Bespoke; Bespoke section craft scene |
| `public/models/gothic_bed/`            | "Gothic Bed 01" (`GothicBed_01`) | hero configurator — Bedroom                                       |
| `public/models/round_wooden_table_01/` | "Round Wooden Table 01"          | hero configurator — Dining                                        |
| `public/models/dining_chair_02/`       | "Dining Chair 02"                | hero configurator — Dining, Office                                |
| `public/models/metal_office_desk/`     | "Metal Office Desk"              | hero configurator — Office                                        |

Loaded client-side only via `three` / `@react-three/fiber` / `@react-three/drei` in `src/components/three/` (`ConfigScene.tsx`).

The hero always shows a static photo first (`configImage(piece, finish)`, below). `ConfigScene` — and its five glTF models — is code-split and only imported when a visitor clicks **"Explore in 3D"** (`ConfigStage.tsx`, opted into from `Hero.tsx`); it never loads on page visit, on any device. A "Show photo" control switches back without unmounting the config controls.

> An earlier copy of the four newer models had `.bin` geometry buffers corrupted (byte-inflated ~1.66×, mismatching each glTF's declared `byteLength`), which made those pieces load without error but render nothing — they were re-downloaded directly from Poly Haven.

## Photography (AI-generated for this project)

| File                                              | Usage                                                                           | Size               |
| ------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------ |
| `public/images/bespoke-detail-01.jpg`             | How it works — hero image                                                       | 1600×1008 (~16:10) |
| `public/images/studio-workshop.jpg`               | Why Heaven — full-width workshop band (between the intro copy and the trust grid) | 1896×830 (16:7)    |
| `public/images/beliefs-joinery.jpg`               | Beliefs — cinematic joinery banner above the 3-value cards                       | 1024×449 (~16:7 / 8:3) |
| `public/images/config-{piece}-{finish}.jpg` (×15) | Hero configurator — SSR/mobile static image, one per Piece × Finish combination | 1280×960 (4:3)     |

These are illustrative AI renders, not photographs of actual Heaven Furniture Mart work or premises — replace with real, AI-enhanced photography per the client's house-style prompt set. Each replacement should keep the **same filename and aspect ratio** so no code changes are needed — just overwrite the file in `public/images/`.

## Photography (real)

| File                                   | Usage                                                                         | Size                        | Source                                                                                                                                                                                                                                                    |
| -------------------------------------- | ----------------------------------------------------------------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `public/images/showroom-agrabad.jpg`   | Proof/Visit — storefront photo                                                | 1448×1086 (4:3, full frame) | Real photo, client-provided — the actual Heaven Furniture Mart storefront, Agrabad Access Road. Re-shot without a promotional discount banner that appeared in an earlier version (client's request — the site states no prices/discounts anywhere else). |
| `public/images/collection-living.jpg`  | Collections — Living room · brief builder "Warm & editorial" style card       | 1200×1504 (4:5)             | Client-provided, AI-enhanced from a real room photo per the house-style prompt set.                                                                                                                                                                       |
| `public/images/collection-bedroom.jpg` | Collections — Bedroom · brief builder "Light & calm" style card               | 1200×1504 (4:5)             | As above.                                                                                                                                                                                                                                                 |
| `public/images/collection-dining.jpg`  | Collections — Dining · brief builder "Dark & grounded" style card             | 1200×1504 (4:5)             | As above.                                                                                                                                                                                                                                                 |
| `public/images/collection-office.jpg`  | Collections — Office & study · brief builder "Structured & formal" style card | 1200×1504 (4:5)             | As above.                                                                                                                                                                                                                                                 |
| `public/images/bespoke-highlight.jpg`  | Bespoke section spotlight image (`bespoke.image`)                             | 1200×1504 (4:5)             | As above — a hand-carved mahogany armchair set. Separate file from `config-bespoke-*.jpg` so the hero configurator's Bespoke fallback is untouched.                                                                                                       |

Unlike the illustrative renders above, this one is not a placeholder — no further AI enhancement was applied, since recoloring or restyling a real storefront toward the site's charcoal/brass palette would make it _less_ accurate for a visitor trying to recognize the building.

The file is the **full, uncropped photo** — it is not pre-cropped to the page's 16:10 display box. `FramedPhoto` (in `Sections.tsx`) uses `object-cover object-top` so the browser always trims from the bottom (open forecourt) to fit the 16:10 frame, never off the roofline — that keeps the building's top edge and the "HEAVEN FURNITURE MART" sign fully framed and symmetric regardless of viewport width. If this gets reshot later, keep the same filename and this stays correct automatically; no manual crop needed.

The site's standalone photography moments — this storefront shot, `bespoke-detail-01.jpg` in How it works, `studio-workshop.jpg` in Why Heaven and `beliefs-joinery.jpg` in Beliefs — all render through a shared `FramedPhoto` component: a thin mat border, a brass hairline rule (the `rule-hair` utility in `styles.css`, previously unused) and a small caption plaque underneath. Each also runs its own scroll-in reveal (a left-to-right `clip-path` wipe, then the caption fades in), driven by a per-photo `IntersectionObserver` in the component. It's a deliberate framing device, not decoration for its own sake — it presents every photo as a curated exhibit rather than asking a real photo (warm daylight, red signage) and an AI-illustrative one (studio-lit, on-brand palette) to blend seamlessly into the same page, which they can't honestly do. The caption text is honest about what each image actually is: the storefront's says where it is ("Agrabad Access Road"); the illustrative shots stay generic ("Our Agrabad workshop", "In the workshop", "Hand-cut joinery") rather than claiming a specific real moment.

## Video

| File                                                              | Usage                                         | Source                                                                                                   |
| ----------------------------------------------------------------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `public/videos/workshop-01.mp4`                                   | Story ("In motion") — "The gold finish" card  | AI-generated (Google Flow) from a still of the real gold-leaf footage — 1280×720, 10s, 3.7 MB, H.264/AAC |
| `public/videos/workshop-02.mp4`                                   | Story ("In motion") — "Shaping the edge" card | AI-generated (Google Flow) from the real edge-shaping footage — 1280×720, 8s, 2.3 MB, H.264/AAC          |
| `public/images/workshop-01-poster.jpg` · `workshop-02-poster.jpg` | Poster stills for the two Story cards         | A frame from each clip, grabbed at ~2–3s and re-exported at 1200×675                                     |

Both clips are landscape 16:9. `StoryCard` (`Sections.tsx`) shows the poster still under a dark scrim with a chapter numeral and a play ring; the `<video>` only loads on tap and plays inline at 16:9. `story.videos[].aspect` still drives the card shape, so a future portrait clip would just need `"9 / 16"`.

## Typography

- **Cormorant Garamond** — display serif (Google Fonts, OFL)
- **Jost** — sans body (Google Fonts, OFL)

Loaded via `<link>` in `src/routes/__root.tsx`.
