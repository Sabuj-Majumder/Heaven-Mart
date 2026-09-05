import type { LucideIcon } from "lucide-react";
import { CTA_LABEL } from "@/content/site";

export function CtaButton({
  size = "md",
  className = "",
  to = "#start",
  tabIndex,
}: {
  size?: "md" | "lg";
  className?: string;
  /** In-page target — defaults to the guided brief builder. */
  to?: string;
  /** Pass -1 to pull it out of tab order, e.g. while it sits inside a visually hidden container. */
  tabIndex?: number | undefined;
}) {
  const pad = size === "lg" ? "px-9 py-4 text-[0.95rem]" : "px-7 py-3.5 text-sm";
  return (
    <a
      href={to}
      tabIndex={tabIndex}
      className={`group inline-flex items-center gap-3 rounded-sm bg-primary ${pad} font-normal uppercase tracking-[0.18em] text-primary-foreground transition-all duration-500 hover:-translate-y-0.5 hover:bg-[color-mix(in_oklab,var(--brass)_88%,white)] hover:shadow-[0_18px_36px_-16px_color-mix(in_oklab,var(--brass)_70%,transparent)] ${className}`}
    >
      {CTA_LABEL}
      <span
        aria-hidden="true"
        className="inline-block transition-transform duration-500 group-hover:translate-x-1"
      >
        →
      </span>
    </a>
  );
}

export function QuietLink({
  href,
  children,
  external = false,
  icon: Icon,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  /** Small line icon shown before the label — kept outside the underline so it doesn't get ruled through. */
  icon?: LucideIcon;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group inline-flex items-center gap-1.5 text-sm tracking-wide text-muted-foreground transition-colors duration-300 hover:text-foreground"
    >
      {Icon && <Icon aria-hidden="true" className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />}
      <span className="underline-grow pb-0.5 transition-[background-size] duration-300 group-hover:[background-size:100%_1px]">
        {children}
      </span>
    </a>
  );
}
