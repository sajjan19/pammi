/**
 * ─────────────────────────────────────────────────────────────
 *  EDIT THIS FILE TO CHANGE THE SITE.
 *
 *  Everything a non-developer would want to change lives here:
 *  business details, garments, prices, hours and policy text.
 *  Nothing else needs to be touched.
 *
 *  Anything marked TODO is a placeholder — swap in the real value.
 * ─────────────────────────────────────────────────────────────
 */

export const business = {
  name: "Pammi's Tailoring & Alterations",
  // TODO: confirm how she wants her name shown on the site.
  tailor: "TODO: full name",
  tagline: "Punjabi Suits, Stitched to Measure",
  /** Shown in the hero. One or two sentences. */
  intro:
    "Punjabi suits for women, stitched by hand to fit you. Salwar kameez, Patiala and Anarkali. She also makes turbans and children's patkas from cloth you bring, and does small repairs on anything else you own.",
  /** Longer paragraph for the About page. */
  story:
    "Punjabi suits are the whole of the work: every one cut and stitched by hand, one at a time. Bring your own fabric, or a suit you already love the fit of. She measures you herself before anything is cut — and it comes back the way you asked for it, with the neckline you wanted, a sleeve length that actually works, and a fit that sits right the first time.",

  // TODO: replace with her real city / service area.
  city: "TODO: city",

  // Home-based tailors usually don't publish an address. Set to true only
  // once she's happy for it to be public.
  showAddress: false,
  address: "TODO: address",
  addressNote: "The address is shared once your order is confirmed.",

  // TODO: replace with her real contact details.
  // Set any of these to null to hide them across the site.
  email: "TODO@example.com" as string | null,
  phone: null as string | null,
  /** Digits only, with country code — used for the WhatsApp link. */
  whatsapp: null as string | null,
  instagram: null as string | null,

  /** Languages she's comfortable talking in. Shown on the contact page. */
  languages: ["Punjabi", "Hindi", "English"],

  /**
   * The logo badge, as a file in /public. Set to null to fall back to a
   * simple drawn needle mark.
   *
   * The badge already contains the business name, so at header size the
   * wording inside it reads as texture rather than text — that's expected,
   * and the name is still spelled out beside it.
   */
  logoSrc: "/logo.jpeg" as string | null,
};

/**
 * True while a value is still one of the TODO placeholders above.
 *
 * Pages use this to hide half-finished details rather than printing
 * "TODO: city" to a customer — so the site stays presentable while she's
 * still deciding what to put there.
 */
export function isPlaceholder(value: string | null | undefined): boolean {
  return !value || value.startsWith("TODO");
}

export function whatsappUrl(): string | null {
  if (!business.whatsapp) return null;
  return `https://wa.me/${business.whatsapp.replace(/\D/g, "")}`;
}

export function instagramUrl(): string | null {
  if (!business.instagram) return null;
  return `https://www.instagram.com/${business.instagram.replace(/^@/, "")}/`;
}

/* ── Garments ──────────────────────────────────────────────── */

/**
 * Everything she takes on.
 *
 * The women's Punjabi suits come first deliberately — that's the work. The
 * order of this list is the order they appear everywhere on the site, with
 * repairs last.
 *
 * `measurementGroups` decides which rough-size fields the order form offers —
 * see lib/measurements.ts for what each group contains. They're optional
 * hints for planning fabric, never the numbers she cuts from.
 *
 * `price` is in whole dollars and is the *starting* price for stitching only
 * (customer supplies the fabric). Set it to `null` to show "Price on request"
 * instead of a number.
 *
 * TODO: every price below is a placeholder. She needs to confirm her real
 * stitching charges before this site goes live — leave them as `null` rather
 * than guessing.
 */
export type Garment = {
  slug: string;
  name: string;
  otherNames?: string;
  /**
   * What kind of job this is. The order form asks a different set of
   * questions for each, because they genuinely are different conversations:
   *
   * - `stitching` — made from your fabric, to measurements she takes.
   * - `headwear`  — turbans and patkas: you bring the cloth, she cuts and
   *                 finishes it. No fabric choice, nothing to measure.
   * - `repair`    — a fix on a garment you already own. Needs a description
   *                 and a photo, not measurements.
   */
  kind: "stitching" | "headwear" | "repair";
  price: number | null;
  turnaroundDays: number;
  summary: string;
  includes: string[];
  measurementGroups: MeasurementGroupId[];
  popular?: boolean;
};

export type MeasurementGroupId = "upper" | "sleeve" | "kameez" | "bottom";

export const garments: Garment[] = [
  {
    slug: "salwar-kameez",
    name: "Punjabi Suit",
    otherNames: "salwar kameez",
    kind: "stitching",
    price: null,
    turnaroundDays: 14,
    summary:
      "The everyday suit and the thing she makes most — kameez, salwar and matching dupatta finishing. Any neckline, any sleeve, straight or flared.",
    includes: [
      "Kameez stitched to your measurements",
      "Salwar with drawstring or elastic waist",
      "Dupatta hemmed and finished",
      "Side slits, piping and lining as you like",
    ],
    measurementGroups: ["upper", "sleeve", "kameez", "bottom"],
    popular: true,
  },
  {
    slug: "patiala-suit",
    name: "Patiala Suit",
    kind: "stitching",
    price: null,
    turnaroundDays: 14,
    summary:
      "Deeply pleated Patiala salwar with a kameez cut to sit right above the pleats.",
    includes: [
      "Full Patiala salwar with hand-set pleats",
      "Kameez to your chosen length",
      "Dupatta hemmed and finished",
    ],
    measurementGroups: ["upper", "sleeve", "kameez", "bottom"],
    popular: true,
  },
  {
    slug: "anarkali",
    name: "Anarkali Suit",
    kind: "stitching",
    price: null,
    turnaroundDays: 21,
    summary:
      "Fitted through the bodice and flared from the waist down, with as much or as little flare as you want.",
    includes: [
      "Fitted, lined bodice",
      "Flared skirt with your chosen number of panels",
      "Churidar or straight bottoms",
      "Dupatta hemmed and finished",
    ],
    measurementGroups: ["upper", "sleeve", "kameez", "bottom"],
    popular: true,
  },
  {
    slug: "sharara-palazzo",
    name: "Sharara & Palazzo Suit",
    kind: "stitching",
    price: null,
    turnaroundDays: 18,
    summary:
      "Wide-legged sharara, gharara or palazzo bottoms with a short or long kameez.",
    includes: [
      "Sharara, gharara or palazzo bottoms",
      "Kameez or short kurti",
      "Dupatta hemmed and finished",
    ],
    measurementGroups: ["upper", "sleeve", "kameez", "bottom"],
  },
  {
    slug: "kurti",
    name: "Kurti / Kurta",
    kind: "stitching",
    price: null,
    turnaroundDays: 10,
    summary:
      "A standalone kurti or kurta — straight, A-line or high-low, in any length.",
    includes: [
      "Kurti stitched to your measurements",
      "Your choice of neckline and sleeve",
      "Optional lining",
    ],
    measurementGroups: ["upper", "sleeve", "kameez"],
  },
  {
    slug: "turbans-patkas",
    name: "Turbans & Patkas",
    otherNames: "pagg, dastaar",
    kind: "headwear",
    price: null,
    turnaroundDays: 7,
    summary:
      "Men's turbans and children's patkas. You bring the cloth and she cuts it to length and finishes the edges.",
    includes: [
      "Turban cloth cut to the length you want",
      "Patkas made up to size for children",
      "Edges hemmed or rolled all round",
      "Whole sets done in one colour for a function",
    ],
    // Nothing to measure — she works from the cloth you bring and the length
    // you ask for, so the order form skips sizing entirely.
    measurementGroups: [],
  },
  {
    slug: "repairs",
    name: "Repairs & Hemming",
    kind: "repair",
    price: null,
    turnaroundDays: 5,
    summary:
      "Small fixes on clothes you already own — a split seam, a little rip, a hem that needs taking up. Any kind of garment, not just suits.",
    includes: [
      "Trousers, skirts and dresses hemmed",
      "Split seams and small rips closed up",
      "Sleeves shortened",
      "Buttons, hooks and simple zip fixes",
    ],
    // Nothing to measure — a repair needs a description and a photo, and the
    // order form asks for exactly that instead.
    measurementGroups: [],
  },
];

export function getGarment(slug: string): Garment | undefined {
  return garments.find((g) => g.slug === slug);
}

/* ── How it works ──────────────────────────────────────────── */

export const steps = [
  {
    title: "Send your order",
    body: "Pick what you'd like made, describe the design, and add a photo of something you like. It takes about five minutes — no measuring needed.",
  },
  {
    title: "She confirms the details",
    body: "You'll hear back with the price, the fabric you need to supply, and a realistic date. Nothing is started until you say yes.",
  },
  {
    title: "Come in to be measured",
    body: "Bring your fabric and she'll measure you properly, in person. It takes a few minutes and it's the reason the fit comes out right.",
  },
  {
    title: "Collect your finished suit",
    body: "You'll get a message when it's ready. Small adjustments after the first try-on are always free.",
  },
];

/* ── Fabric & options ──────────────────────────────────────── */

/** Offered on the order form so she knows what she's stitching. */
export const fabricSources = [
  {
    value: "customer",
    label: "I'll supply the fabric",
    hint: "Most orders. Bring or post it once your order is confirmed.",
  },
  {
    value: "tailor",
    label: "Please source the fabric for me",
    hint: "She'll suggest options and the cost is added to your quote.",
  },
  {
    value: "unsure",
    label: "Not sure yet",
    hint: "That's fine — you can decide when you drop things off.",
  },
  {
    // Never shown as a choice; the order form sets it for repair jobs so the
    // admin page has something sensible to label rather than a blank.
    value: "na",
    label: "Not applicable — repair job",
    hint: "",
  },
];

export const necklines = [
  "Round",
  "V-neck",
  "Boat neck",
  "Square",
  "Collar / band",
  "Sweetheart",
  "Keyhole",
  "Same as my sample suit",
  "Not sure — please advise",
];

export const sleeveStyles = [
  "Sleeveless",
  "Cap sleeve",
  "Short sleeve",
  "Elbow length",
  "Three-quarter",
  "Full length",
  "Bell sleeve",
  "Same as my sample suit",
  "Not sure — please advise",
];

export const occasions = [
  "Everyday wear",
  "Work",
  "Party / function",
  "Wedding — guest",
  "Wedding — bride or family",
  "Festival",
  "Other",
];

/* ── Order statuses ────────────────────────────────────────── */

/**
 * The lifecycle of an order in the admin page. `customerLabel` is what the
 * customer sees when they look their order up on the status page.
 */
export const orderStatuses = [
  {
    value: "new",
    label: "New request",
    customerLabel: "Received — waiting to be confirmed",
    tone: "pending",
  },
  {
    value: "quoted",
    label: "Quoted",
    customerLabel: "Quoted — check your messages",
    tone: "pending",
  },
  {
    value: "confirmed",
    label: "Confirmed",
    customerLabel: "Confirmed — waiting on your fabric",
    tone: "confirmed",
  },
  {
    value: "stitching",
    label: "Stitching",
    customerLabel: "Being stitched",
    tone: "confirmed",
  },
  {
    value: "ready",
    label: "Ready for collection",
    customerLabel: "Ready to collect",
    tone: "confirmed",
  },
  {
    value: "collected",
    label: "Collected",
    customerLabel: "Collected — thank you!",
    tone: "done",
  },
  {
    value: "cancelled",
    label: "Cancelled",
    customerLabel: "Cancelled",
    tone: "cancelled",
  },
] as const;

export type OrderStatus = (typeof orderStatuses)[number]["value"];

export const statusValues = orderStatuses.map((s) => s.value) as OrderStatus[];

export function getStatus(value: string) {
  return orderStatuses.find((s) => s.value === value) ?? orderStatuses[0];
}

/* ── Policies ──────────────────────────────────────────────── */

/** TODO: confirm these with her — they're sensible defaults, not her words. */
export const policies = [
  {
    title: "Quotes",
    body: "Every order is quoted before any work starts. The price depends on the garment, the lining and any hand-finishing — you'll always know it before you commit.",
  },
  {
    title: "Fabric",
    body: "Most customers supply their own fabric. Bring a little more than you think you need — heavy embroidery and matching prints both eat into the yardage.",
  },
  {
    title: "Measuring",
    body: "She measures you herself before anything is cut — it takes a few minutes and it's the reason the fit comes out right. Any sizes you put on the order form are only a rough guide for planning fabric.",
  },
  {
    title: "Fittings & adjustments",
    body: "Small adjustments after your first try-on are free. Changes to the design after cutting has started may be charged separately.",
  },
  {
    title: "Timing",
    body: "Turnaround times on this site are typical, not guaranteed. Wedding season books up quickly — please ask early.",
  },
  {
    title: "Payment",
    body: "TODO: confirm how she takes payment (cash, e-transfer, deposit up front?).",
  },
];

/* ── Gallery ───────────────────────────────────────────────── */

/**
 * Gallery images.
 *
 * Drop photos into /public/gallery/ and list them here.
 * TODO: replace these placeholders with photos of her real work.
 */
export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  garment?: string;
};

/**
 * True while the gallery is still drawn stand-ins rather than photographs of
 * her actual work.
 *
 * The gallery page says which it is, out loud. Showing illustrations under a
 * heading like "pieces she's finished for customers" would be claiming work
 * that hasn't been photographed — set this to false the moment real photos go
 * in, and the wording switches back.
 */
export const galleryIsIllustrated = true;

export const gallery: GalleryItem[] = [
  {
    src: "/gallery/placeholder-1.svg",
    alt: "Illustration of an embroidered salwar kameez",
    caption: "Embroidered salwar kameez",
    garment: "salwar-kameez",
  },
  {
    src: "/gallery/placeholder-2.svg",
    alt: "Illustration of a Patiala suit",
    caption: "Patiala suit with pleated salwar",
    garment: "patiala-suit",
  },
  {
    src: "/gallery/placeholder-3.svg",
    alt: "Illustration of a floor-length Anarkali",
    caption: "Floor-length Anarkali",
    garment: "anarkali",
  },
  {
    src: "/gallery/placeholder-4.svg",
    alt: "Illustration of a sharara suit",
    caption: "Sharara suit",
    garment: "sharara-palazzo",
  },
  {
    src: "/gallery/placeholder-5.svg",
    alt: "Illustration of an A-line kurti",
    caption: "A-line kurti",
    garment: "kurti",
  },
  {
    src: "/gallery/placeholder-6.svg",
    alt: "Illustration of a palazzo suit",
    caption: "Palazzo suit",
    garment: "sharara-palazzo",
  },
  {
    src: "/gallery/placeholder-7.svg",
    alt: "Illustration of a child's patka tied over the joora",
    caption: "Children's patkas",
    garment: "turbans-patkas",
  },
  {
    src: "/gallery/placeholder-8.svg",
    alt: "Illustration of a tied turban with a length of cloth",
    caption: "Turbans",
    garment: "turbans-patkas",
  },
];

/* ── FAQ ───────────────────────────────────────────────────── */

export const faqs = [
  {
    q: "How much fabric should I buy?",
    a: "For a straight salwar kameez, about 5 metres covers the kameez, salwar and dupatta. Anarkalis and shararas need more — 7 metres or above depending on the flare. Message before you buy if you're unsure; it's much easier than being half a metre short.",
  },
  {
    q: "Do I need to measure myself before I order?",
    a: "No — please don't. She measures you herself before anything is cut, and that's the whole reason the fit comes out right. The order form asks for rough sizes only, and only so she can work out how much fabric you'll need. Leave them blank if you'd rather.",
  },
  {
    q: "What if I can't come in to be measured?",
    a: "Bring or send a suit that already fits you well and it'll be measured and copied. That's the next best thing to measuring you in person.",
  },
  {
    q: "How long does an order take?",
    a: "Everyday suits are usually around two weeks, Anarkalis a little longer. Wedding season is the busy period, so give as much notice as you can.",
  },
  {
    q: "Can you copy a design from a photo?",
    a: "Yes — that's very common. Attach the photo to your order form and it will be matched as closely as the fabric allows.",
  },
  {
    q: "Do you only do Punjabi suits?",
    a: "For stitching from scratch, yes — that's the work, and it's what she's quick and good at. She also does men's turbans and children's patkas from cloth you bring, and small repairs and hemming on anything else you own: a split seam, a little rip, trousers that need taking up.",
  },
  {
    q: "How do turbans and patkas work?",
    a: "You bring the cloth — she cuts it to the length you want and finishes the edges. Say how many you need and what length on the order form, and whether they're for an adult or a child. Whole sets in one colour for a function are a common request before weddings.",
  },
  {
    q: "Do you stitch for children?",
    a: "Suits for girls are done regularly — choose the closest option on the order form and mention their age in the notes.",
  },
];
