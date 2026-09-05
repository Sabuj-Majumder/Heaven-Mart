import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { BackToTop } from "@/components/BackToTop";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { Hero } from "@/components/sections/Hero";
import { BriefBuilder } from "@/components/sections/BriefBuilder";
import {
  Beliefs,
  Bespoke,
  Collections,
  FAQ,
  Footer,
  HowItWorks,
  Proof,
  Story,
  Studio,
} from "@/components/sections/Sections";
import { brand } from "@/content/site";

const TITLE = "Heaven Furniture Mart — Bespoke Furniture in Chattogram";
const DESC =
  "Heaven Furniture Mart designs, builds and installs bespoke furniture and interior styling for homes and offices in Chattogram, Bangladesh. Designed. Crafted. Customized.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: brand.website },
    ],
    links: [{ rel: "canonical", href: brand.website }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FurnitureStore",
          name: brand.name,
          slogan: brand.tagline,
          foundingDate: brand.founded,
          founder: { "@type": "Person", name: brand.founder },
          telephone: brand.phone,
          email: brand.email,
          address: {
            "@type": "PostalAddress",
            streetAddress: "Agrabad Access Road",
            addressLocality: "Chattogram",
            addressCountry: "BD",
          },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <SiteHeader />
      <main>
        <Hero />
        <Studio />
        <Collections />
        <Bespoke />
        <Beliefs />
        <HowItWorks />
        <Story />
        <Proof />
        <FAQ />
        <BriefBuilder />
      </main>
      <Footer />
      <BackToTop />
      <StickyMobileCTA />
    </div>
  );
}
