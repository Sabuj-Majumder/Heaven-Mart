import { useMemo, useState, type ReactNode } from "react";
import { Phone } from "lucide-react";
import { CtaButton } from "@/components/CtaButton";
import { ConfigStage } from "@/components/three/ConfigStage";
import { configStore, useConfig } from "@/lib/config-store";
import { useMountReveal } from "@/hooks/use-reveal";
import { brand, configAlt, finishes, hero, pieces, sizes } from "@/content/site";

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex shrink-0 items-center gap-2 rounded-sm border px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.14em] transition-all duration-300 ${
        active
          ? "border-primary bg-[color-mix(in_oklab,var(--brass)_10%,transparent)] text-foreground"
          : "border-border text-muted-foreground hover:-translate-y-px hover:border-primary/60 hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

/** Label + a row of options that scrolls sideways on phones instead of wrapping. */
function SpecRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:gap-5">
      <span className="w-12 shrink-0 text-[0.58rem] uppercase tracking-[0.3em] text-muted-foreground">
        {label}
      </span>
      <div className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden">
        {children}
      </div>
    </div>
  );
}

export function Hero() {
  const { piece, finish, size } = useConfig();
  const [explore3D, setExplore3D] = useState(false);

  const activeFinish = finishes.find((f) => f.id === finish)!;
  const activeSize = sizes.find((s) => s.id === size)!;
  const pieceLabel = pieces.find((p) => p.id === piece)!.label;
  const finishLabel = activeFinish.label;
  const announce = useMemo(
    () => `Showing ${pieceLabel}, ${finishLabel} finish, ${activeSize.label} size`,
    [pieceLabel, finishLabel, activeSize.label],
  );

  // A brief, considered arrival on first paint — not scroll-triggered, since
  // the hero is already on screen. Reduced-motion and no-JS safe (see
  // useMountReveal / the .reveal + .line-rise fallbacks in styles.css).
  const eyebrowReveal = useMountReveal(0);
  const headingReveal = useMountReveal(0);
  const ledeReveal = useMountReveal(220);
  const ctaReveal = useMountReveal(340);
  const marksReveal = useMountReveal(460);

  return (
    <section id="top" className="grain relative min-h-[100svh] overflow-hidden pt-24">
      <p className="sr-only" aria-live="polite">
        {announce}
      </p>

      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-10 px-6 pb-16 pt-4 lg:min-h-[calc(100svh-6rem)] lg:grid-cols-[0.92fr_1.08fr] lg:items-start lg:gap-x-16 lg:px-12 lg:pt-10">
        {/* LEFT — message, CTA, credentials */}
        <div className="relative z-10 order-1 flex max-w-xl flex-col">
          <p className={`eyebrow ${eyebrowReveal.className}`} style={eyebrowReveal.style}>
            {hero.eyebrow}
          </p>
          <h1
            className="mt-6 text-[clamp(2.6rem,8vw,5.5rem)] leading-[0.98] tracking-[-0.02em]"
            data-shown={headingReveal.shown ? "true" : "false"}
          >
            <span className="line-clip">
              <span className="line-rise" style={{ transitionDelay: "40ms" }}>
                Furniture,
              </span>
            </span>
            <span className="line-clip">
              <span className="line-rise" style={{ transitionDelay: "130ms" }}>
                crafted <em className="not-italic text-primary">around you</em>
              </span>
            </span>
          </h1>
          <p
            className={`mt-6 max-w-md text-base leading-relaxed text-foreground/90 sm:text-lg ${ledeReveal.className}`}
            style={ledeReveal.style}
          >
            {hero.lede}
          </p>
          <div
            className={`mt-9 flex flex-wrap items-center gap-x-8 gap-y-3 ${ctaReveal.className}`}
            style={ctaReveal.style}
          >
            <CtaButton size="lg" />
            <a
              href={brand.phoneHref}
              className="group inline-flex items-center gap-1.5 text-sm tracking-wide text-muted-foreground transition-colors hover:text-foreground"
            >
              <Phone aria-hidden="true" className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
              <span className="underline-grow pb-0.5 transition-[background-size] duration-300 group-hover:[background-size:100%_1px]">
                {brand.phone}
              </span>
            </a>
          </div>
          <div className={`mt-10 ${marksReveal.className}`} style={marksReveal.style}>
            <span aria-hidden="true" className="rule-hair block w-14" />
            <p className="mt-4 flex flex-wrap gap-y-1 text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
              {hero.marks.map((m, i) => (
                <span key={m} className="whitespace-nowrap">
                  {m}
                  {i < hero.marks.length - 1 && (
                    <span aria-hidden="true" className="mx-3 text-primary/40">
                      ·
                    </span>
                  )}
                </span>
              ))}
            </p>
          </div>
        </div>

        {/* RIGHT — the piece and its controls, one unit */}
        <div className="relative z-[1] order-2">
          <div className="relative aspect-[4/3] w-full overflow-hidden border border-border bg-[var(--surface)]">
            <ConfigStage
              piece={piece}
              finish={finish}
              tint={activeFinish.tint}
              scale={activeSize.scale}
              label={configAlt(pieceLabel, finishLabel)}
              active={explore3D}
            />

            {explore3D ? (
              <div className="pointer-events-none absolute inset-x-0 bottom-3 flex items-center justify-between px-4">
                <span className="hidden text-[0.6rem] uppercase tracking-[0.28em] text-muted-foreground md:block">
                  {hero.hint}
                </span>
                <button
                  type="button"
                  onClick={() => setExplore3D(false)}
                  className="pointer-events-auto ml-auto text-[0.6rem] uppercase tracking-[0.28em] text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                >
                  Show photo
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setExplore3D(true)}
                className="absolute bottom-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-sm border border-primary/50 bg-background/70 px-4 py-2 text-[0.65rem] uppercase tracking-[0.24em] text-primary backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-[color-mix(in_oklab,var(--brass)_12%,transparent)] hover:shadow-[0_14px_28px_-14px_color-mix(in_oklab,var(--brass)_60%,transparent)]"
              >
                <span aria-hidden="true">⟲</span> Explore in 3D
              </button>
            )}
          </div>

          <div className="mt-4 flex items-baseline justify-between gap-4">
            <p className="font-display text-xl tracking-wide">
              {pieceLabel} · {finishLabel} · {activeSize.label}
            </p>
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
              {activeSize.note}
            </p>
          </div>

          <div className="mt-5 divide-y divide-border border-t border-border">
            <SpecRow label="Piece">
              {pieces.map((p) => (
                <Pill
                  key={p.id}
                  active={p.id === piece}
                  onClick={() => configStore.set({ piece: p.id })}
                >
                  {p.label}
                </Pill>
              ))}
            </SpecRow>
            <SpecRow label="Finish">
              {finishes.map((f) => (
                <Pill
                  key={f.id}
                  active={f.id === finish}
                  onClick={() => configStore.set({ finish: f.id })}
                >
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 rounded-full"
                    style={{ background: f.swatch }}
                  />
                  {f.label}
                </Pill>
              ))}
            </SpecRow>
            <SpecRow label="Size">
              {sizes.map((s) => (
                <Pill
                  key={s.id}
                  active={s.id === size}
                  onClick={() => configStore.set({ size: s.id })}
                >
                  {s.label}
                </Pill>
              ))}
            </SpecRow>
          </div>
          <p className="mt-2.5 text-[0.65rem] uppercase tracking-[0.24em] text-muted-foreground">
            Carried into your quote
          </p>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-8 left-6 hidden flex-col items-center gap-2 lg:left-12 lg:flex"
      >
        <span className="text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
          Scroll
        </span>
        <span className="h-10 w-px bg-gradient-to-b from-border to-transparent" />
      </div>
    </section>
  );
}
