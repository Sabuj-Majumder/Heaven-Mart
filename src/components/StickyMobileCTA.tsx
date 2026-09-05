import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { CtaButton } from "@/components/CtaButton";
import { brand } from "@/content/site";

/**
 * A persistent mobile-only conversion bar. Desktop already keeps the CTA
 * live in the header at all times, but on a phone the header shrinks to a
 * small "Quote" pill — this gives a scrolled-in visitor a full-width,
 * always-reachable way back to the quote flow without hunting for it.
 * Hidden in the hero (its own CTA is already on screen) and once the brief
 * builder itself scrolls into view (it has its own, bigger call to action).
 */
export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    const start = document.getElementById("start");
    if (!hero) return;

    const onScroll = () => {
      const heroPassed = window.scrollY > hero.offsetHeight * 0.75;
      const atForm = start ? start.getBoundingClientRect().top < window.innerHeight * 0.6 : false;
      setVisible(heroPassed && !atForm);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden={!visible}
      // `inert` keeps every focusable child out of the tab order while the bar is off-screen.
      inert={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-border bg-background/95 px-4 pt-3 backdrop-blur-md transition-transform duration-500 ease-[var(--ease-quiet)] lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <a
        href={brand.phoneHref}
        aria-label={`Call ${brand.phone}`}
        tabIndex={visible ? undefined : -1}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-primary transition-colors hover:border-primary"
      >
        <Phone aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />
      </a>
      <CtaButton className="flex-1 justify-center" tabIndex={visible ? undefined : -1} />
    </div>
  );
}
