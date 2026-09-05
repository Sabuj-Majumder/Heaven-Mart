# Open Items

Things deliberately left out because the brief did not supply them — do not invent them.

- **Showroom opening hours** — now shown as **Mon–Sat 10am–8pm · Sun 11am–6pm**, taken from the client's official site (heavenfurnituremart.axistro.dev). Confirm before publishing.
- **Timber origins** — the "Timber, chosen by hand" strip states Teak (Chittagong Hill Tracts), Mahogany (Bangladesh), Sheesham (Bengal). Plausible for a Chattogram maker but **unconfirmed** — verify the actual species and sourcing (`timber` in `src/content/site.ts`).
- **Payment methods** — "Cards and bKash accepted" is stated (Visit block + footer), inferred from the official site's payment logos. Confirm which cards / wallets.
- **Named projects** — the official site lists projects (Prestige Evergreen, Silver Oak, Ventara). Not added here — needs real project photography and client permission. Add a `/work` route when that exists.
- **Showroom floor area / size** — "large showroom" is used (from the brief), no square footage claimed.
- **Product pricing** — no prices published; all enquiry via WhatsApp quote request.
- **Real photography** — the storefront (`showroom-agrabad.jpg`), the four Collections images, the Bespoke spotlight (`bespoke-highlight.jpg`) and the "gold finish" Story clip are now real / client-provided (AI-enhanced from real source material). Still illustrative AI: `config-*.jpg` (hero configurator) and `bespoke-detail-01.jpg` (How it works).
- **Social profile URLs** — assumed handles (`HeavenFurnitureMart`, `heaven_furniture_ltd`); verify against the real accounts.
- **Warranty / guarantee terms** — not stated in the brief; omitted.
- **Payment plan details** — brief says "easy payment options"; no specifics invented.
- **Finish range & descriptions** — Walnut / Teak / Ebony with tone notes (`woodStrip` / `finishNotes` in `src/content/site.ts`). Illustrative; confirm the actual woods offered.
- **Investment bands** — the FAQ and brief builder use three _named_ bands (Considered / Signature / Atelier, `pricingBands` in `src/content/site.ts`) with **no figures**. Confirm the band names and one-line scopes, or supply real "from" ranges.
- **Bespoke lead time** — no durations are claimed for any stage. Add if known.
- **FAQ phrasing** — answers are derived only from the brief. Confirm the wording of "we work around furniture you own" and "message us to arrange a visit" before publishing.
- **Imagery** — the Collections grid ("a sense of the range, not a catalogue") now uses real, client-provided photos. Still illustrative AI: `config-*.jpg` and `bespoke-detail-01.jpg`.
- **Milestones** — "2026 — Nationwide BFIOA recognition" was removed earlier as an unconfirmed forward-looking claim, then **restored** once the client brief confirmed it as an established fact (not a projection).
- **Bespoke Highlight** — the company brief calls for a dedicated Bespoke moment ("their #1 differentiator... give it its own moment"), separate from the Collections grid. Added as its own section (`Bespoke` in `Sections.tsx`, between Collections and Beliefs); uses `bespoke-highlight.jpg`, a real client-provided (AI-enhanced) photo.
- **Story clips** — both are now landscape 16:9 Flow-generated clips (`workshop-01` gold finish, `workshop-02` edge shaping), matched; the Story section was rebuilt as cinematic poster cards. Replace with real workshop footage when a good landscape cut exists.
- **Production domain** — `brand.website` (`src/content/site.ts`) is set to the client's current live site, `heavenfurnituremart.axistro.dev`, and used for the canonical URL and `og:url` in `src/routes/index.tsx`. It's a real, working placeholder rather than an invented one, but **update it to wherever this build actually deploys** — an absolute canonical pointing at the wrong host is worse for SEO than a relative one.

## Conversion action

Single primary CTA everywhere: **"Request a quote"** → scrolls to the guided **brief builder** (`#start`). The builder composes the full brief and hands it to WhatsApp (+880 1960-481983). Secondary: phone call link, and a "book a showroom visit" WhatsApp link.

- **Concept render (photo → styled image)** — `src/lib/concept.ts` is a stub. Set `CONCEPT_ENABLED = true` and implement `requestConcept()` against an image model (via a serverless route so the key stays server-side) to turn on the "see it in your room" preview. The BriefBuilder already collects the photo and has the UI state for it.
- **Brief lead time** — the builder deliberately states no week count (`briefLeadTime` in `src/content/site.ts`). Add real ranges only if the client confirms them.
- **Brief step copy** — room/piece/style/size/timeline options and the "what happens next" stages all trace to the brief; confirm wording (esp. "book a showroom visit — message us to arrange a time") before publishing.
