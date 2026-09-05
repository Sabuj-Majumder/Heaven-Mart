// Single source of truth for all page copy. Every claim traces back to the brief.

const WA_NUMBER = "8801960481983";

/** Build a wa.me deep link with a prefilled message. */
export const waLink = (message: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

export const brand = {
  name: "Heaven Furniture Mart",
  // Placeholder — the client's current live site. Update to this build's real
  // production domain once it's deployed (see OPEN-ITEMS.md).
  website: "https://heavenfurnituremart.axistro.dev",
  tagline: "Designed. Crafted. Customized.",
  statement: "Made for your room, not a showroom.",
  founded: "2020",
  founder: "Abul Kalam Bhuiyan",
  address: "Agrabad Access Road, Chattogram, Bangladesh",
  phone: "+880 1960-481983",
  phoneHref: "tel:+8801960481983",
  email: "heavenfurnituremart@gmail.com",
  whatsapp: waLink(
    "Hello Heaven Furniture Mart, I would like to request a quote for custom furniture.",
  ),
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Agrabad+Access+Road+Chattogram+Bangladesh",
  social: {
    facebook: "https://facebook.com/HeavenFurnitureMart",
    instagram: "https://instagram.com/heaven_furniture_ltd",
    youtube: "https://youtube.com/@HeavenFurnitureMart",
  },
};

export const CTA_LABEL = "Request a quote";

export const hero = {
  eyebrow: "Agrabad Showroom · Chattogram · Since 2020",
  heading: "Furniture, crafted around you",
  lede: "We design, build and fit custom furniture and interiors — from our own workshop in Agrabad, Chattogram.",
  hint: "Drag to rotate",
  // Three trust anchors from the brief, kept to a single scannable line.
  marks: ["Free consultation", "Delivery & fitting", "Easy payments"],
};

// --- Configurator (hero) -------------------------------------------------
// The one place the visitor plays with a piece. Its choices carry straight
// into the brief builder so nothing is asked twice.

export const pieces = [
  { id: "living", label: "Living" },
  { id: "bedroom", label: "Bedroom" },
  { id: "dining", label: "Dining" },
  { id: "office", label: "Office" },
  { id: "bespoke", label: "Bespoke" },
] as const;

export const finishes = [
  { id: "walnut", label: "Walnut", swatch: "#8a5a35", tint: "#8a5a35" },
  { id: "teak", label: "Teak", swatch: "#b98a52", tint: "#b98a52" },
  { id: "ebony", label: "Ebony", swatch: "#3a2f2a", tint: "#3a2f2a" },
] as const;

export const sizes = [
  { id: "compact", label: "Compact", scale: 0.9, note: "For flats and tighter rooms" },
  { id: "standard", label: "Standard", scale: 1, note: "Our most-ordered dimensions" },
  { id: "grand", label: "Grand", scale: 1.12, note: "For large, open rooms" },
] as const;

export type PieceId = (typeof pieces)[number]["id"];
export type FinishId = (typeof finishes)[number]["id"];
export type SizeId = (typeof sizes)[number]["id"];

/** Piece → the room the brief builder should preselect. */
export const roomForPiece: Record<PieceId, string> = {
  living: "living",
  bedroom: "bedroom",
  dining: "dining",
  office: "office",
  bespoke: "other",
};

export const configImage = (piece: string, finish: string) =>
  `/images/config-${piece}-${finish}.jpg`;

export const configAlt = (piece: string, finish: string) =>
  `${finish} ${piece} furniture by Heaven Furniture Mart — studio render`;

export const finishNotes: Record<FinishId, string> = {
  walnut: "Deep chocolate brown, open dramatic grain.",
  teak: "Warm golden-brown; dense and hard-wearing.",
  ebony: "Near-black, fine-grained — quiet and formal.",
};

// --- Guided brief builder ("Start your piece") -------------------------
// Room / wood / size arrive prefilled from the hero; the builder only asks
// what it still needs, then composes the full WhatsApp handoff.

export const briefRooms = [
  { id: "living", label: "Living room" },
  { id: "bedroom", label: "Bedroom" },
  { id: "dining", label: "Dining" },
  { id: "office", label: "Office & study" },
  { id: "other", label: "Somewhere else" },
];

export const briefPieces: Record<string, string[]> = {
  living: ["Sofa", "Coffee table", "TV unit", "Console"],
  bedroom: ["Bed", "Wardrobe", "Dressing table", "Bedside table"],
  dining: ["Dining table", "Dining chairs", "Cabinet"],
  office: ["Executive desk", "Bookshelf", "Workstation"],
  other: [],
};

export const briefStyles = [
  {
    id: "warm",
    label: "Warm & editorial",
    note: "Soft light, natural texture, layered.",
    image: "/images/collection-living.jpg",
  },
  {
    id: "grounded",
    label: "Dark & grounded",
    note: "Deep tones, solid wood, quiet drama.",
    image: "/images/collection-dining.jpg",
  },
  {
    id: "calm",
    label: "Light & calm",
    note: "Pale palette, simple lines, airy.",
    image: "/images/collection-bedroom.jpg",
  },
  {
    id: "formal",
    label: "Structured & formal",
    note: "Defined shapes, built-in, considered.",
    image: "/images/collection-office.jpg",
  },
];

export const briefSizes = [
  { id: "compact", label: "Compact" },
  { id: "standard", label: "Standard" },
  { id: "grand", label: "Grand" },
];

export const briefTimelines = [
  { id: "exploring", label: "Just exploring" },
  { id: "planning", label: "Planning — next few months" },
  { id: "ready", label: "Ready to start" },
];

// Deliberately not stated as a number of weeks — see OPEN-ITEMS.md.
export const briefLeadTime =
  "Your consultation confirms the timeline — it depends on the design, the wood and the finish.";

export const briefStages = [
  {
    t: "Consultation",
    d: "Free. Bring your room, measurements and any photos — in the showroom or at your place.",
  },
  { t: "Design", d: "We draw your piece and agree the wood and finish with you." },
  { t: "Craft", d: "Built by hand in our Agrabad workshop." },
  { t: "Install", d: "Delivered and fitted in your room by our own team." },
];

export const briefIncluded = [
  "Free design consultation",
  "Delivery and installation",
  "Easy payment options",
];

// Named investment bands — no figures (see OPEN-ITEMS.md). Gives the visitor
// a sense of range without a catalogue price.
export const pricingIntro =
  "Bespoke pricing depends on the piece, the wood and the finish. Most projects sit in one of three bands — we place yours at the free consultation, and there are easy payment options.";

export const pricingBands = [
  { name: "Considered", note: "Clean forms, standard sizes, our core woods." },
  { name: "Signature", note: "Larger pieces, mixed materials, brass detailing." },
  { name: "Atelier", note: "Statement builds, rare woods, complex joinery." },
];

export type BriefState = {
  room: string;
  piece: string;
  style: string | null;
  wood: string;
  size: string;
  timeline: string | null;
  notes: string;
  hasPhoto: boolean;
};

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function buildBriefMessage(b: BriefState): string {
  const room = briefRooms.find((r) => r.id === b.room)?.label ?? "—";
  const style = briefStyles.find((s) => s.id === b.style)?.label;
  const size = briefSizes.find((s) => s.id === b.size)?.label;
  const timeline = briefTimelines.find((t) => t.id === b.timeline)?.label;
  return [
    "Hello Heaven Furniture Mart — here is my brief.",
    "",
    `Room: ${room}`,
    b.piece.trim() ? `Piece: ${b.piece.trim()}` : null,
    style ? `Style: ${style}` : null,
    b.wood ? `Wood: ${cap(b.wood)}` : null,
    size ? `Size: ${size}` : null,
    timeline ? `Timeline: ${timeline}` : null,
    b.notes.trim() ? `Notes: ${b.notes.trim()}` : null,
    b.hasPhoto ? "I have a photo of the room to share." : null,
    "",
    "Could we book the free design consultation?",
  ]
    .filter((line) => line !== null)
    .join("\n");
}

export const briefWaLink = (b: BriefState) => waLink(buildBriefMessage(b));

export const visitWaLink = waLink(
  "Hello Heaven Furniture Mart, I would like to book a showroom visit in Agrabad.",
);

// --- Sections ---------------------------------------------------------

export const studio = {
  heading: "A workshop, not a warehouse",
  body: [
    "Heaven Furniture Mart designs, builds and styles furniture for homes and offices in Chattogram. Nothing here is pulled off a shelf.",
    "We measure your room, agree the wood and the finish with you, then build it by hand in our own workshop — and fit it in place when it's done.",
  ],
};

export const trustPoints = [
  {
    title: "Free design consultation",
    note: "We start with your room, your measurements, your brief.",
  },
  { title: "Fully bespoke", note: "Built to your space and taste — never mass-produced." },
  {
    title: "Premium materials",
    note: "Quality wood and skilled in-house craftsmanship.",
  },
  { title: "Large Agrabad showroom", note: "See and sit on the work before you commit." },
  { title: "Delivery & installation", note: "Included, fitted in place by our own team." },
  { title: "Easy payment options", note: "Arranged with you once the design is agreed." },
];

// Timber the workshop builds in, and where it comes from — a compact strip
// inside the studio section. Origins to be confirmed (see OPEN-ITEMS.md).
export const timber = {
  heading: "Timber, chosen by hand",
  note: "Regional hardwoods for most pieces — other woods imported to order.",
  woods: [
    {
      name: "Teak",
      origin: "Chittagong Hill Tracts",
      swatch: "#b98a52",
      note: "Dense and golden; naturally weather-resistant.",
    },
    {
      name: "Mahogany",
      origin: "Bangladesh",
      swatch: "#7a4433",
      note: "Deep red-brown, smooth — takes a fine polish.",
    },
    {
      name: "Sheesham",
      origin: "Bengal",
      swatch: "#584634",
      note: "Streaked dark grain; extremely hard-wearing.",
    },
  ],
};

// What the studio stands by — a quiet values section.
export const beliefs = {
  eyebrow: "What we hold to",
  heading: "A few things we don't bend on",
  items: [
    {
      t: "Measured, then made",
      d: "We start with your room and your measurements. Nothing is drawn to a catalogue size.",
    },
    {
      t: "Wood that ages well",
      d: "Solid timber and honest joinery — chosen for how it looks in ten years, not on delivery day.",
    },
    {
      t: "Finished in place",
      d: "We deliver and fit every piece ourselves. The job isn't done until it sits right in the room.",
    },
  ],
};

export const collections = [
  {
    id: "living",
    name: "Living room",
    items: "Sofas, coffee tables, TV units, consoles",
    image: "/images/collection-living.jpg",
    alt: "Living room with an ivory linen sofa and a solid walnut coffee table",
  },
  {
    id: "bedroom",
    name: "Bedroom",
    items: "Beds, wardrobes, dressing tables, bedside tables",
    image: "/images/collection-bedroom.jpg",
    alt: "Bedroom with a walnut bed frame, linen bedding and a brass wall light",
  },
  {
    id: "dining",
    name: "Dining",
    items: "Dining tables, dining chairs, cabinets",
    image: "/images/collection-dining.jpg",
    alt: "Dining room with a long walnut table, upholstered chairs and brass pendants",
  },
  {
    id: "office",
    name: "Office & study",
    items: "Executive tables, bookshelves, workstations",
    image: "/images/collection-office.jpg",
    alt: "Study with an executive walnut desk and built-in bookshelves",
  },
];

export const collectionsNote =
  "A sense of the range, not a catalogue — every piece is drawn and built to your room, your dimensions and your finish.";

// The one thing that isn't a category — bespoke is the default, not an
// upgrade. Gets its own moment rather than sitting inside the collections
// grid as a fifth equal option.
export const bespoke = {
  eyebrow: "Bespoke",
  body: "Sofas, beds and dining sets are only the start. Bring us a space that doesn't fit a category — an awkward alcove, a fitted window seat, a piece no catalogue makes — and we design and build it from nothing, in our own workshop, to your exact room.",
  image: "/images/bespoke-highlight.jpg",
  alt: "A pair of hand-carved mahogany armchairs and a round glass-topped pedestal table, spotlit against a dark panelled wall",
};

export const howItWorks = {
  eyebrow: "How it works",
  heading: "Built to your space, not to a catalogue",
  body: "You tell us the room, the size and the taste. We draw it, agree the wood and finish with you, build it in our own workshop, and fit it in place. Delivery and installation are part of the job.",
  steps: [
    {
      n: "01",
      t: "Consultation",
      q: "How do you live here?",
      d: "Free. We look at how the room is really used — mornings, meals, quiet hours — before a line is drawn.",
    },
    {
      n: "02",
      t: "Design",
      q: "What should it feel like?",
      d: "Drawings, wood and finish agreed with you before anything is cut.",
    },
    {
      n: "03",
      t: "Craft",
      q: "How is it built?",
      d: "Cut, joined and finished by hand in our own Agrabad workshop.",
    },
    {
      n: "04",
      t: "Install",
      q: "When is it yours?",
      d: "When we've delivered and fitted it, and it sits right in your room.",
    },
  ],
  image: "/images/bespoke-detail-01.jpg",
  alt: "A craftsman planing a length of solid walnut on a workshop bench",
};

// Real clips from the workshop floor — tap to play, nothing autoplays.
export const story = {
  eyebrow: "In motion",
  heading: "From timber to your room",
  note: "A short, unscripted look inside the workshop — tap a frame to watch.",
  videos: [
    {
      src: "/videos/workshop-02.mp4",
      poster: "/images/workshop-02-poster.jpg",
      label: "Shaping the edge",
      note: "A router smooths and profiles the panel before anything is finished.",
      aspect: "16 / 9",
    },
    {
      src: "/videos/workshop-01.mp4",
      poster: "/images/workshop-01-poster.jpg",
      label: "The gold finish",
      note: "A gold-leaf detail pressed on by hand — piece by piece.",
      aspect: "16 / 9",
    },
  ],
};

export const proof = {
  quote:
    "Furniture is more than function — it is a reflection of lifestyle, taste and comfort. Every piece we make is designed to bring lasting elegance into our clients' homes.",
  attribution: "Abul Kalam Bhuiyan",
  role: "Founder & Managing Director",
  line: "Trusted by hundreds of homeowners across Chattogram.",
  image: "/images/showroom-agrabad.jpg",
  alt: "The Heaven Furniture Mart storefront on Agrabad Access Road, Chattogram",
  milestones: [
    { year: "2020", text: "Founded by Abul Kalam Bhuiyan" },
    { year: "2021", text: "Agrabad showroom opened" },
    { year: "2024–25", text: "Exhibited at the International Furniture Fair, Chattogram" },
    { year: "2025", text: "Member of the Chamber of Commerce" },
    { year: "2026", text: "Nationwide BFIOA recognition" },
  ],
};

export const visit = {
  expect: [
    "Sit on the work before you commit.",
    "Meet the team and talk through your room.",
    "Bring your measurements and any inspiration.",
  ],
  founded: "Founded in 2020 by Abul Kalam Bhuiyan.",
  hours: "Mon–Sat 10am–8pm · Sun 11am–6pm",
  payment: "Cards and bKash accepted — easy payment options arranged with you.",
};

export const faq = [
  {
    q: "Do you only make custom furniture?",
    a: "Bespoke is how we work by default — every piece is built to your space and taste. The showroom also has finished work you can see, sit on and order.",
  },
  {
    q: "Can you work around furniture I already own?",
    a: "Yes. Bring measurements or photos to the consultation and we design around what is staying.",
  },
  {
    q: "Do you deliver and install?",
    a: "Delivery and installation are included, and fitted in place by our own team.",
  },
  {
    q: "What does it cost?",
    a: "It depends on the piece, the wood and the finish. Most projects fall into three bands — Considered, Signature or Atelier — and we place yours at the free consultation. There are easy payment options.",
  },
  {
    q: "Where are you, and when are you open?",
    a: "Agrabad Access Road, Chattogram. The showroom is open Mon–Sat 10am–8pm and Sun 11am–6pm — or message us to arrange a time.",
  },
  {
    q: "How do I start?",
    a: "Build your brief below, or send a WhatsApp message with your room and what you're looking for. The consultation is free, with no obligation to order.",
  },
];
