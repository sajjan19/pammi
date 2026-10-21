/**
 * ─────────────────────────────────────────────────────────────
 *  EDIT THIS FILE TO CHANGE THE SITE.
 *
 *  Everything a non-developer would want to change lives here:
 *  business details, garments, prices and policy text.
 *
 *  The Punjabi words live alongside in lib/content-pa.ts. Prices,
 *  days and pictures are only ever set here, so changing one here
 *  changes it in both languages.
 *
 *  Keep the words short. Many visitors read slowly or in their
 *  second language — one plain sentence beats a paragraph.
 *
 *  Anything marked TODO is a placeholder — swap in the real value.
 * ─────────────────────────────────────────────────────────────
 */

export const business = {
  name: "Pammi's Tailoring & Alterations",
  // TODO: confirm how she wants her name shown on the site.
  tailor: "TODO: full name",
  tagline: "Punjabi Suits, Stitched to Measure",
  /** Shown in the hero, the footer and search results. Keep it short. */
  intro:
    "Punjabi suits for women, made to fit you. Also turbans, patkas and small repairs.",
  /** Shown on the About page. */
  story:
    "Pammi stitches every suit herself, one at a time. She measures you in person, so it fits the first time.",

  // TODO: replace with her real city / service area.
  city: "TODO: city",

  // Home-based tailors usually don't publish an address. Set to true only
  // once she's happy for it to be public.
  showAddress: false,
  address: "TODO: address",
  addressNote: "You'll get the address once your order is confirmed.",

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
 * `price` is in whole dollars and is the *starting* price. Set it to `null`
 * to show "On request" instead of a number.
 *
 * TODO: every price below is a placeholder. She needs to confirm her real
 * charges before this site goes live — leave them as `null` rather than
 * guessing.
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
  /** Illustration shown on cards and in the order form's picker. */
  image: string;
  price: number | null;
  turnaroundDays: number;
  /** One short line. */
  summary: string;
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
    image: "/gallery/placeholder-1.svg",
    price: null,
    turnaroundDays: 14,
    summary: "The everyday suit. Any neckline, any sleeve.",
    measurementGroups: ["upper", "sleeve", "kameez", "bottom"],
    popular: true,
  },
  {
    slug: "patiala-suit",
    name: "Patiala Suit",
    kind: "stitching",
    image: "/gallery/placeholder-2.svg",
    price: null,
    turnaroundDays: 14,
    summary: "With a full, pleated Patiala salwar.",
    measurementGroups: ["upper", "sleeve", "kameez", "bottom"],
    popular: true,
  },
  {
    slug: "anarkali",
    name: "Anarkali Suit",
    kind: "stitching",
    image: "/gallery/placeholder-3.svg",
    price: null,
    turnaroundDays: 21,
    summary: "Fitted on top, flared from the waist.",
    measurementGroups: ["upper", "sleeve", "kameez", "bottom"],
    popular: true,
  },
  {
    slug: "sharara-palazzo",
    name: "Sharara & Palazzo Suit",
    kind: "stitching",
    image: "/gallery/placeholder-4.svg",
    price: null,
    turnaroundDays: 18,
    summary: "Wide-legged bottoms with a short or long kameez.",
    measurementGroups: ["upper", "sleeve", "kameez", "bottom"],
  },
  {
    slug: "kurti",
    name: "Kurti / Kurta",
    kind: "stitching",
    image: "/gallery/placeholder-5.svg",
    price: null,
    turnaroundDays: 10,
    summary: "Just the top, in any style or length.",
    measurementGroups: ["upper", "sleeve", "kameez"],
  },
  {
    slug: "turbans-patkas",
    name: "Turbans & Patkas",
    otherNames: "pagg, dastaar",
    kind: "headwear",
    image: "/gallery/placeholder-8.svg",
    price: null,
    turnaroundDays: 7,
    summary: "Men's turbans and children's patkas, from cloth you bring.",
    // Nothing to measure — she works from the cloth you bring and the length
    // you ask for, so the order form skips sizing entirely.
    measurementGroups: [],
  },
  {
    slug: "repairs",
    name: "Repairs & Hemming",
    kind: "repair",
    image: "/gallery/placeholder-9.svg",
    price: null,
    turnaroundDays: 5,
    summary: "Small rips, split seams and hems, on any clothes.",
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
    body: "Tell her what you want. Add a photo if you have one.",
  },
  {
    title: "Get a price",
    body: "She'll message you with the price and a date.",
  },
  {
    title: "Get measured",
    body: "Bring your fabric. She measures you in person.",
  },
  {
    title: "Collect it",
    body: "Small fixes after you try it on are free.",
  },
];

/* ── Fabric & options ──────────────────────────────────────── */

/** Offered on the order form so she knows what she's stitching. */
export const fabricSources = [
  {
    value: "customer",
    label: "I'll bring my own fabric",
    hint: "Most people do.",
  },
  {
    value: "tailor",
    label: "Please get the fabric for me",
    hint: "The cost is added to your price.",
  },
  {
    value: "unsure",
    label: "Not sure yet",
    hint: "You can decide later.",
  },
  {
    // Never shown as a choice; the order form sets it for repair jobs so the
    // admin page has something sensible to label rather than a blank.
    value: "na",
    label: "Not applicable — repair job",
    hint: "",
  },
];

/*
 * The dropdown options below are also the values saved with an order, so
 * they stay in English whichever language the customer used — the admin
 * page reads the same either way. Their Punjabi labels are in
 * lib/content-pa.ts.
 */

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
    customerLabel: "Received, waiting to be confirmed",
    tone: "pending",
  },
  {
    value: "quoted",
    label: "Quoted",
    customerLabel: "Price sent, check your messages",
    tone: "pending",
  },
  {
    value: "confirmed",
    label: "Confirmed",
    customerLabel: "Confirmed, waiting for your fabric",
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
    customerLabel: "Collected, thank you!",
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

/**
 * TODO: confirm these with her — they're sensible defaults, not her words.
 * A policy whose body starts with "TODO" is hidden from customers.
 */
export const policies = [
  {
    title: "Price first",
    body: "You'll know the price before any work starts.",
  },
  {
    title: "She measures you",
    body: "Sizes on the order form are only a rough guide.",
  },
  {
    title: "Free small fixes",
    body: "Small changes after your first try-on are free.",
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
    caption: "Salwar kameez",
    garment: "salwar-kameez",
  },
  {
    src: "/gallery/placeholder-2.svg",
    alt: "Illustration of a Patiala suit",
    caption: "Patiala suit",
    garment: "patiala-suit",
  },
  {
    src: "/gallery/placeholder-3.svg",
    alt: "Illustration of a floor-length Anarkali",
    caption: "Anarkali",
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
    caption: "Kurti",
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
    q: "How much fabric do I need?",
    a: "About 5 metres for a salwar kameez. Around 7 metres for an Anarkali or sharara.",
  },
  {
    q: "Do I need to measure myself?",
    a: "No. She measures you in person.",
  },
  {
    q: "What if I can't come in?",
    a: "Send a suit that fits you well and she'll copy it.",
  },
  {
    q: "How long does it take?",
    a: "About two weeks for a suit. Book early in wedding season.",
  },
  {
    q: "How do turbans and patkas work?",
    a: "Bring the cloth. She cuts it to length and finishes the edges.",
  },
];
