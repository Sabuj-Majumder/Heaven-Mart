import { createElement, useState } from "react";
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { CtaButton, QuietLink } from "@/components/CtaButton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useReveal } from "@/hooks/use-reveal";
import {
  beliefs,
  bespoke,
  brand,
  collections,
  collectionsNote,
  faq,
  howItWorks,
  proof,
  story,
  studio,
  timber,
  trustPoints,
  visit,
} from "@/content/site";

function Reveal({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}) {
  const { ref, className: revealClass } = useReveal<HTMLDivElement>();
  return createElement(Tag as string, { ref, className: `${revealClass} ${className}` }, children);
}

/** A photograph presented as a deliberate exhibit — a thin mat, a brass
 *  hairline rule and a small caption plaque — rather than an image bleeding
 *  straight onto the page. Used for the site's two standalone photography
 *  moments, so a real photo and an illustrative one read as one system. */
function FramedPhoto({
  src,
  alt,
  width,
  height,
  aspect,
  caption,
  className = "",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  aspect: string;
  caption: string;
  className?: string;
}) {
  return (
    <div className={`group border border-border/70 p-2 ${className}`}>
      <div className="overflow-hidden">
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          className={`w-full object-cover object-top transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] ${aspect}`}
        />
      </div>
      <div className="mt-2 flex items-center gap-3 px-1 pb-0.5">
        <span aria-hidden="true" className="rule-hair flex-1" />
        <span className="shrink-0 text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground">
          {caption}
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

export function Studio() {
  return (
    <section id="studio" className="border-t border-border bg-[var(--surface)]">
      <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-12 lg:py-32">
        <Reveal className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <p className="eyebrow">Why Heaven</p>
            <h2 className="mt-6 text-[clamp(2.25rem,5vw,4rem)] tracking-[-0.02em]">
              {studio.heading}
            </h2>
          </div>
          <div className="max-w-xl space-y-5 text-lg leading-relaxed text-muted-foreground">
            {studio.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="pt-2 font-display text-2xl tracking-wide text-foreground">
              {brand.tagline}
            </p>
          </div>
        </Reveal>

        <ul className="mt-16 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {trustPoints.map((t, i) => (
            <Reveal
              as="li"
              key={t.title}
              className="group relative overflow-hidden bg-[var(--surface)] p-8 transition-colors duration-500 hover:bg-[color-mix(in_oklab,var(--brass)_6%,var(--surface))] lg:p-10"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px origin-center scale-x-0 bg-primary transition-transform duration-500 ease-[var(--ease-quiet)] group-hover:scale-x-100"
              />
              <span className="inline-block font-display text-2xl text-primary transition-transform duration-500 ease-[var(--ease-quiet)] group-hover:-translate-y-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-2xl">{t.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.note}</p>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-14 border-t border-border pt-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <p className="eyebrow">{timber.heading}</p>
            <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">{timber.note}</p>
          </div>
          <ul className="mt-6 grid gap-8 sm:grid-cols-3">
            {timber.woods.map((w) => (
              <li key={w.name} className="group flex gap-4">
                <span
                  aria-hidden="true"
                  className="mt-1 h-9 w-9 shrink-0 rounded-full ring-1 ring-transparent transition-all duration-500 ease-[var(--ease-quiet)] group-hover:scale-110 group-hover:ring-[color-mix(in_oklab,var(--brass)_50%,transparent)] group-hover:ring-offset-2 group-hover:ring-offset-[var(--surface)]"
                  style={{ background: w.swatch }}
                />
                <span>
                  <span className="block text-lg">{w.name}</span>
                  <span className="mt-0.5 block text-[0.7rem] uppercase tracking-[0.18em] text-primary">
                    {w.origin}
                  </span>
                  <span className="mt-1.5 block text-sm leading-relaxed text-muted-foreground">
                    {w.note}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

export function Collections() {
  return (
    <section id="collections" className="border-t border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-12 lg:py-36">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Collections</p>
            <h2 className="mt-6 max-w-xl text-[clamp(2.1rem,4.6vw,3.5rem)] tracking-[-0.02em]">
              A sense of the range
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            {collectionsNote}
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((c) => (
            <Reveal as="article" key={c.id} className="group">
              <div className="relative overflow-hidden bg-[var(--surface)]">
                <img
                  src={c.image}
                  alt={c.alt}
                  width={1200}
                  height={1504}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-4 left-4 flex translate-y-2 items-center gap-2 text-[0.65rem] uppercase tracking-[0.22em] text-ivory opacity-0 transition-all duration-500 ease-[var(--ease-quiet)] group-hover:translate-y-0 group-hover:opacity-100"
                >
                  View the collection <span aria-hidden="true">→</span>
                </span>
              </div>
              <h3 className="mt-5 text-2xl transition-colors duration-300 group-hover:text-primary">
                {c.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.items}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

/** Bespoke isn't a fifth room category — it's the default posture of the
 *  whole business, and gets its own moment rather than a grid slot. */
export function Bespoke() {
  return (
    <section id="bespoke" className="border-t border-border bg-[var(--surface)]">
      <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-12 lg:py-36">
        <Reveal className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
          <div>
            <p className="eyebrow">{bespoke.eyebrow}</p>
            <h2 className="mt-6 text-[clamp(2.2rem,5vw,4rem)] leading-[1.03] tracking-[-0.02em]">
              If it doesn't exist yet,
              <br />
              <em className="not-italic text-primary">we build it</em>
            </h2>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-muted-foreground">
              {bespoke.body}
            </p>
            <div className="mt-10">
              <CtaButton />
            </div>
          </div>
          <div className="group relative overflow-hidden border border-border">
            <img
              src={bespoke.image}
              alt={bespoke.alt}
              width={1200}
              height={1504}
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

export function Beliefs() {
  return (
    <section id="beliefs" className="border-t border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-12 lg:py-32">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{beliefs.eyebrow}</p>
          <h2 className="mt-6 text-[clamp(2.1rem,4.6vw,3.5rem)] tracking-[-0.02em]">
            {beliefs.heading}
          </h2>
        </Reveal>
        <ul className="mt-14 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-3">
          {beliefs.items.map((b, i) => (
            <Reveal
              as="li"
              key={b.t}
              className="group relative overflow-hidden bg-[var(--surface)] p-8 transition-colors duration-500 hover:bg-[color-mix(in_oklab,var(--brass)_6%,var(--surface))] lg:p-10"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px origin-center scale-x-0 bg-primary transition-transform duration-500 ease-[var(--ease-quiet)] group-hover:scale-x-100"
              />
              <span className="inline-block font-display text-2xl text-primary transition-transform duration-500 ease-[var(--ease-quiet)] group-hover:-translate-y-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-2xl leading-tight">{b.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b.d}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

export function HowItWorks() {
  return (
    <section id="how" className="border-t border-border bg-[var(--surface)]">
      <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-12 lg:py-36">
        <Reveal className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20">
          <div>
            <p className="eyebrow">{howItWorks.eyebrow}</p>
            <h2 className="mt-6 text-[clamp(2.2rem,5vw,4rem)] leading-[1.03] tracking-[-0.02em]">
              Built to your space,
              <br />
              <em className="not-italic text-primary">not to a catalogue</em>
            </h2>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-muted-foreground">
              {howItWorks.body}
            </p>
            <div className="mt-10">
              <CtaButton />
            </div>
          </div>
          <FramedPhoto
            src={howItWorks.image}
            alt={howItWorks.alt}
            width={1600}
            height={1000}
            aspect="aspect-[16/11]"
            caption="In the workshop"
          />
        </Reveal>

        <ol className="mt-20 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.steps.map((s) => (
            <Reveal
              as="li"
              key={s.n}
              className="group relative overflow-hidden bg-[var(--surface)] p-8 transition-colors duration-500 hover:bg-[color-mix(in_oklab,var(--brass)_6%,var(--surface))]"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px origin-center scale-x-0 bg-primary transition-transform duration-500 ease-[var(--ease-quiet)] group-hover:scale-x-100"
              />
              <span className="eyebrow">
                {s.n} · {s.t}
              </span>
              <h3 className="mt-4 text-2xl leading-tight">{s.q}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

export function Story() {
  if (story.videos.length === 0) return null;
  return (
    <section id="story" className="border-t border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-12 lg:py-36">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="eyebrow">{story.eyebrow}</p>
            <h2 className="mt-6 text-[clamp(2.1rem,4.6vw,3.5rem)] tracking-[-0.02em]">
              {story.heading}
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">{story.note}</p>
        </Reveal>

        <ol className="mt-14 grid gap-6 sm:grid-cols-2">
          {story.videos.map((v, i) => (
            <Reveal as="li" key={v.src}>
              <StoryCard
                n={i + 1}
                label={v.label}
                note={v.note}
                src={v.src}
                poster={v.poster}
                aspect={v.aspect}
              />
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** A film-chapter card: a still from the clip under a dark scrim, a chapter
 *  numeral and a play ring. Nothing downloads or moves until the visitor taps. */
function StoryCard({
  n,
  label,
  note,
  src,
  poster,
  aspect = "16 / 9",
}: {
  n: number;
  label: string;
  note?: string;
  src: string;
  poster?: string;
  aspect?: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className="relative w-full overflow-hidden border border-border bg-black"
      style={{ aspectRatio: aspect }}
    >
      {playing ? (
        <video
          src={src}
          poster={poster}
          controls
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play: ${label}`}
          className="group absolute inset-0 flex flex-col justify-between overflow-hidden text-left transition-all duration-500 ease-[var(--ease-quiet)] hover:-translate-y-1 hover:shadow-[0_28px_60px_-26px_color-mix(in_oklab,var(--brass)_60%,transparent)]"
        >
          {poster && (
            <img
              src={poster}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
            />
          )}
          <span
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, color-mix(in oklab, black 48%, transparent) 0%, transparent 30%, color-mix(in oklab, black 30%, transparent) 52%, color-mix(in oklab, black 90%, transparent) 100%)",
            }}
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 border border-transparent transition-colors duration-500 group-hover:border-primary/70"
          />

          <span className="relative z-10 p-6 font-display text-4xl leading-none text-ivory/85 transition-colors group-hover:text-primary">
            {String(n).padStart(2, "0")}
          </span>

          <span
            aria-hidden="true"
            className="absolute left-1/2 top-[42%] flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/60 bg-black/25 text-ivory backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-primary group-hover:bg-[color-mix(in_oklab,var(--brass)_22%,transparent)] group-hover:text-primary sm:h-16 sm:w-16"
          >
            <span className="ml-1 text-lg">▶</span>
          </span>

          <span className="relative z-10 p-6">
            <span className="block max-w-[70%] text-sm uppercase tracking-[0.24em] text-ivory sm:max-w-none">
              {label}
            </span>
            {note && (
              <span className="mt-1.5 block max-w-sm text-xs leading-relaxed text-ivory/75">
                {note}
              </span>
            )}
          </span>
        </button>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */

export function Proof() {
  return (
    <section id="proof" className="border-t border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-12 lg:py-32">
        <Reveal className="mx-auto max-w-3xl text-center">
          <blockquote className="text-[clamp(1.5rem,3.2vw,2.4rem)] leading-[1.3]">
            “{proof.quote}”
          </blockquote>
          <p className="mt-8 text-sm uppercase tracking-[0.22em] text-primary">
            {proof.attribution}
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
            {proof.role}
          </p>
          <p className="mt-8 text-sm tracking-wide text-muted-foreground">{proof.line}</p>
        </Reveal>

        <Reveal className="mt-16 grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <FramedPhoto
            src={proof.image}
            alt={proof.alt}
            width={1448}
            height={1086}
            aspect="aspect-[16/10]"
            caption="Agrabad Access Road"
          />
          <div>
            <p className="eyebrow">The showroom</p>
            <h3 className="mt-5 text-[clamp(1.9rem,4vw,3rem)] tracking-[-0.02em]">
              Visit us in Agrabad
            </h3>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{brand.address}</p>
            <p className="mt-2 text-sm uppercase tracking-[0.16em] text-primary">{visit.hours}</p>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
              {visit.expect.map((e) => (
                <li key={e} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 h-px w-4 shrink-0 bg-primary" />
                  {e}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-muted-foreground">{visit.founded}</p>
            <p className="mt-2 text-sm text-muted-foreground">{visit.payment}</p>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              <CtaButton />
              <QuietLink href={brand.mapUrl} external icon={MapPin}>
                View on map
              </QuietLink>
            </div>
          </div>
        </Reveal>

        <ol className="mt-16 border-t border-border pt-14 lg:flex lg:items-start">
          {proof.milestones.map((m, i) => (
            <Reveal
              as="li"
              key={m.year}
              className="group relative flex gap-4 pb-8 last:pb-0 lg:flex-1 lg:flex-col lg:items-center lg:gap-0 lg:pb-0 lg:text-center"
            >
              {/* connecting rail — vertical on phones, horizontal on desktop */}
              <div className="flex flex-col items-center lg:w-full lg:flex-row">
                <span
                  aria-hidden="true"
                  className={`w-px flex-1 bg-border lg:h-px lg:w-full ${i === 0 ? "invisible" : ""}`}
                />
                <span
                  aria-hidden="true"
                  className="h-2 w-2 shrink-0 rounded-full bg-primary transition-transform duration-500 ease-[var(--ease-quiet)] group-hover:scale-150"
                />
                <span
                  aria-hidden="true"
                  className={`w-px flex-1 bg-border lg:h-px lg:w-full ${
                    i === proof.milestones.length - 1 ? "invisible" : ""
                  }`}
                />
              </div>
              <div className="lg:mt-5 lg:px-3">
                <p className="font-display text-2xl text-primary transition-transform duration-500 ease-[var(--ease-quiet)] group-hover:-translate-y-0.5">
                  {m.year}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

export function FAQ() {
  return (
    <section id="faq" className="border-t border-border bg-[var(--surface)]">
      <div className="mx-auto max-w-[900px] px-6 py-24 lg:py-32">
        <Reveal>
          <p className="eyebrow">Questions</p>
          <h2 className="mt-6 text-[clamp(2.1rem,4.6vw,3.5rem)] tracking-[-0.02em]">
            Before you ask
          </h2>
        </Reveal>
        <Reveal className="mt-12">
          <Accordion type="single" collapsible className="w-full">
            {faq.map((q, i) => (
              <AccordionItem key={q.q} value={`faq-${i}`} className="border-border">
                <AccordionTrigger className="py-6 text-left text-lg font-normal transition-colors duration-300 hover:text-primary hover:no-underline">
                  {q.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-base leading-relaxed text-muted-foreground">
                  {q.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-16 lg:grid-cols-4 lg:px-12">
        <div>
          <p className="font-display text-2xl tracking-wide">{brand.name}</p>
          <p className="mt-3 max-w-[16rem] font-display text-lg leading-snug text-muted-foreground">
            {brand.statement}
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.28em] text-primary">{brand.tagline}</p>
        </div>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p className="text-xs uppercase tracking-[0.24em] text-foreground">Showroom</p>
          <p className="flex items-start gap-1.5 leading-relaxed">
            <MapPin aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
            <span>{brand.address}</span>
          </p>
          <p>{visit.hours}</p>
          <QuietLink href={brand.mapUrl} external icon={MapPin}>
            View on map
          </QuietLink>
        </div>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p className="text-xs uppercase tracking-[0.24em] text-foreground">Contact</p>
          <QuietLink href={brand.phoneHref} icon={Phone}>
            {brand.phone}
          </QuietLink>
          <QuietLink href={`mailto:${brand.email}`} icon={Mail}>
            {brand.email}
          </QuietLink>
        </div>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p className="text-xs uppercase tracking-[0.24em] text-foreground">Follow</p>
          <ul className="space-y-2">
            {[
              { label: "Facebook", href: brand.social.facebook, icon: Facebook },
              { label: "Instagram", href: brand.social.instagram, icon: Instagram },
              { label: "YouTube", href: brand.social.youtube, icon: Youtube },
            ].map(({ label, href, icon }) => (
              <li key={label}>
                <QuietLink href={href} external icon={icon}>
                  {label}
                </QuietLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-6 py-6 text-xs tracking-wide text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-12">
          <span>
            © {new Date().getFullYear()} {brand.name}. Chattogram, Bangladesh.
          </span>
          <span className="text-muted-foreground">
            Delivery &amp; installation included · Cards &amp; bKash accepted
          </span>
        </div>
      </div>
    </footer>
  );
}
