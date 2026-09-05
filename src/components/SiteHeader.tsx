import { useEffect, useState } from "react";
import { CTA_LABEL } from "@/content/site";

const NAV = [
  ["Why Heaven", "#studio"],
  ["Collections", "#collections"],
  ["How it works", "#how"],
  ["Visit", "#proof"],
] as const;

export function SiteHeader() {
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const ids = NAV.map(([, href]) => href.slice(1));
    const onScroll = () => {
      setSolid(window.scrollY > 24);

      // Whichever tracked section's top has scrolled past the header is the
      // current one — walk them in order and keep the last match.
      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          current = id;
        }
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid ? "border-b border-border bg-background/85 backdrop-blur-md" : ""
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6 py-5 lg:px-12">
        <a
          href="#top"
          className="group font-display text-base tracking-[0.06em] transition-[letter-spacing] duration-500 ease-[var(--ease-quiet)] hover:tracking-[0.1em] sm:text-lg"
        >
          Heaven{" "}
          <span className="text-primary transition-colors duration-500 group-hover:text-[color-mix(in_oklab,var(--brass)_100%,white_18%)]">
            Furniture Mart
          </span>
        </a>
        <nav aria-label="Sections" className="hidden items-center gap-9 lg:flex">
          {NAV.map(([label, href]) => {
            const isActive = active === href.slice(1);
            return (
              <a
                key={href}
                href={href}
                aria-current={isActive ? "true" : undefined}
                className={`underline-grow pb-1 text-xs uppercase tracking-[0.22em] transition-colors duration-300 hover:text-foreground hover:[background-size:100%_1px] ${
                  isActive ? "text-foreground [background-size:100%_1px]" : "text-muted-foreground"
                }`}
              >
                {label}
              </a>
            );
          })}
        </nav>
        <a
          href="#start"
          className="shrink-0 rounded-sm border border-primary/40 px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.2em] text-primary transition-all duration-300 hover:-translate-y-px hover:border-primary hover:bg-[color-mix(in_oklab,var(--brass)_10%,transparent)] hover:shadow-[0_10px_24px_-14px_color-mix(in_oklab,var(--brass)_65%,transparent)] sm:border-0 sm:px-0 sm:py-0 sm:text-xs sm:tracking-[0.22em]"
        >
          <span className="sm:hidden">Quote</span>
          <span className="hidden sm:inline">{CTA_LABEL}</span>
        </a>
      </div>
    </header>
  );
}
