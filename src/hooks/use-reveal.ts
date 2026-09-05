import { useEffect, useRef, useState, type CSSProperties } from "react";

/** Reveals an element once when it scrolls into view. Reduced-motion safe. */
export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, className: shown ? "reveal reveal-in" : "reveal" };
}

/**
 * A one-time entrance reveal for content that's visible on load (the hero) —
 * no scroll, no IntersectionObserver, just a brief delay so the page arrives
 * in a considered order rather than all at once. Same `reveal`/`reveal-in`
 * classes as `useReveal`, so it's reduced-motion and no-JS safe for free.
 */
export function useMountReveal(delayMs = 0) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(true);
      return;
    }
    const t = setTimeout(() => setShown(true), delayMs);
    return () => clearTimeout(t);
  }, [delayMs]);

  return {
    shown,
    className: shown ? "reveal reveal-in" : "reveal",
    style: { transitionDelay: `${delayMs}ms` } as CSSProperties,
  };
}
