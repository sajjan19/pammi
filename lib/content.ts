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

import type { IconName } from "@/components/icon";

export const business = {
  name: "Pammi Penji's Tailoring & Alterations",
  /**
   * The name as a logo lockup: `shortName` large, `trade` small underneath.
   * Shown in the header and footer. `shortName` alone also goes in tab
   * titles, where the full name gets cut off. Both stay in English in
   * Punjabi mode — they're the business's name, as on the logo.
   */
  shortName: "Pammi Penji",
  trade: "Tailoring & Alterations",
  /** Her full name. "Pammi" is what everyone calls her. */
  tailor: "Parmjit Kaur Sajjan",
  tagline: "Indian Suits, Stitched to Measure",
  /** Shown in the hero, the footer and search results. Keep it short. */
  intro:
    "She makes all kinds of suits, mostly Indian suits for women, men and kids. Alterations on any clothes too.",
  /** Shown on the Contact page and in the footer. */
  city: "South Vancouver, BC",

  // Home-based tailors usually don't publish an address. Set to true only
  // once she's happy for it to be public.
  showAddress: false,
  address: "TODO: address",
  addressNote: "You'll get the address once your order is confirmed.",

  // Set any of these to null to hide them across the site.
  email: "parmjitksajjan@gmail.com" as string | null,
  phone: "672-999-3798" as string | null,
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
  logoSrc: null as string | null,
};

/* ── About her ─────────────────────────────────────────────── */

export const about = {
  /** Her story, in her own words, shown as a quote. */
  quote:
    "I learned to sew from my mother and my four older sisters in Nawanshahr, Punjab. Since moving to Vancouver at 18, I've sewn every suit myself, one at a time.",
  /**
   * Small things about her, each with a little drawing. `id` picks the
   * drawing and links each fact to its Punjabi in lib/content-pa.ts.
   */
  facts: [
    {
      id: "chai",
      title: "Always a cup of chai",
      body: "Before, during and after every suit.",
    },
    {
      id: "cooking",
      title: "Loves to cook",
      body: "Punjabi food is her speciality.",
    },
    {
      id: "dramas",
      title: "Punjabi dramas",
      body: "Her favourite way to relax.",
    },
    {
      id: "shopping",
      title: "Loves suit shopping",
      body: "Her suits fill her house, and her siblings' houses too.",
    },
  ] as {
    id: "chai" | "cooking" | "dramas" | "shopping";
    title: string;
    body: string;
  }[],
  /**
   * A photo of her, in /public. Set it to null to leave it off.
   *
   * A replacement photo should go through scripts/prepare-photo.mjs first,
   * which strips the location data phones hide in photos. (This one was
   * checked: it carries none.)
   */
  photo: "/parmjit-photo.jpeg" as string | null,
  photoAlt:
    "Parmjit Kaur Sajjan holding her blue cookie tin, open and full of thread spools.",
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
 * Punjabi clothes are her main work — women's first, then men's and kids'
 * — so they come first. The order of this list is the order they appear
 * everywhere on the site, with alterations on other clothes last.
 *
 * `measurementGroups` decides which rough-size fields the order form offers —
 * see lib/measurements.ts for what each group contains. They're optional
 * hints for planning fabric, never the numbers she cuts from.
 *
 * `price` is in whole dollars and is the *starting* price. Set it to `null`
 * to show "On request" instead of a number.
 *
 * TODO: these starting prices were proposed from what other tailors in
 * Surrey, Brampton, Calgary and Toronto list publicly (October 2026). She
 * still needs to confirm them.
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
  /** Who it's for — shown as small badges on the services page. */
  forWho: ("women" | "men" | "kids" | "everyone")[];
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
    name: "Women's Punjabi Suit",
    otherNames: "salwar kameez",
    kind: "stitching",
    forWho: ["women"],
    image: "/gallery/placeholder-1.svg",
    price: 50,
    turnaroundDays: 14,
    summary: "The everyday suit. Any neckline, any sleeve.",
    measurementGroups: ["upper", "sleeve", "kameez", "bottom"],
    popular: true,
  },
  {
    slug: "patiala-suit",
    name: "Patiala Suit",
    kind: "stitching",
    forWho: ["women"],
    image: "/gallery/placeholder-2.svg",
    price: 60,
    turnaroundDays: 14,
    summary: "With a full, pleated Patiala salwar.",
    measurementGroups: ["upper", "sleeve", "kameez", "bottom"],
  },
  {
    slug: "anarkali",
    name: "Anarkali Suit",
    kind: "stitching",
    forWho: ["women"],
    image: "/gallery/placeholder-3.svg",
    price: 80,
    turnaroundDays: 21,
    summary: "Fitted on top, flared from the waist.",
    measurementGroups: ["upper", "sleeve", "kameez", "bottom"],
  },
  {
    slug: "sharara-palazzo",
    name: "Sharara & Palazzo Suit",
    kind: "stitching",
    forWho: ["women"],
    image: "/gallery/placeholder-4.svg",
    price: 70,
    turnaroundDays: 18,
    summary: "Wide-legged bottoms with a short or long kameez.",
    measurementGroups: ["upper", "sleeve", "kameez", "bottom"],
  },
  {
    slug: "kurti",
    name: "Kurti / Kurta",
    kind: "stitching",
    forWho: ["women", "men"],
    image: "/gallery/placeholder-5.svg",
    price: 35,
    turnaroundDays: 10,
    summary: "Just the top, in any style or length.",
    measurementGroups: ["upper", "sleeve", "kameez"],
  },
  {
    slug: "kurta-pyjama",
    name: "Men's Kurta Pyjama",
    otherNames: "men's Punjabi suit",
    kind: "stitching",
    forWho: ["men"],
    image: "/gallery/placeholder-10.svg",
    price: 55,
    turnaroundDays: 14,
    summary: "The men's Punjabi suit, made to fit.",
    measurementGroups: ["upper", "sleeve", "kameez", "bottom"],
    popular: true,
  },
  {
    slug: "kids-suits",
    name: "Kids' Punjabi Suits",
    kind: "stitching",
    forWho: ["kids"],
    image: "/gallery/placeholder-11.svg",
    price: 35,
    turnaroundDays: 10,
    summary: "For boys and girls, any age.",
    measurementGroups: ["upper", "sleeve", "kameez", "bottom"],
    popular: true,
  },
  {
    slug: "turbans-patkas",
    name: "Turbans & Patkas",
    otherNames: "pagg, dastaar",
    kind: "headwear",
    forWho: ["men", "kids"],
    image: "/gallery/placeholder-8.svg",
    price: 10,
    turnaroundDays: 7,
    summary: "Men's turbans and children's patkas, from cloth you bring.",
    // Nothing to measure — she works from the cloth you bring and the length
    // you ask for, so the order form skips sizing entirely.
    measurementGroups: [],
  },
  {
    slug: "repairs",
    name: "Alterations & Repairs",
    kind: "repair",
    forWho: ["everyone"],
    image: "/gallery/placeholder-9.svg",
    price: 15,
    turnaroundDays: 5,
    summary: "Take in, let out, hem or fix any clothes.",
    // Nothing to measure — a repair needs a description and a photo, and the
    // order form asks for exactly that instead.
    measurementGroups: [],
  },
];

export function getGarment(slug: string): Garment | undefined {
  return garments.find((g) => g.slug === slug);
}

/* ── How it works ──────────────────────────────────────────── */

/** Each step's `icon` is a drawing from components/icon.tsx. */
export const steps: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "order",
    title: "Send your order",
    body: "Tell her what you want. Add a photo if you have one.",
  },
  {
    icon: "tag",
    title: "Get a price",
    body: "She'll message you with the price and a date.",
  },
  {
    icon: "tape",
    title: "Get measured",
    body: "Bring your fabric. She measures you in person.",
  },
  {
    icon: "hanger",
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
 * A policy whose body starts with "TODO" is hidden from customers. Each
 * `icon` is a drawing from components/icon.tsx.
 */
export const policies: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "tag",
    title: "Price first",
    body: "You'll know the price before any work starts.",
  },
  {
    icon: "tape",
    title: "She measures you",
    body: "Sizes on the order form are only a rough guide.",
  },
  {
    icon: "needle",
    title: "Free small fixes",
    body: "Small changes after your first try-on are free.",
  },
  {
    icon: "cash",
    title: "Payment",
    body: "E-transfer or cash only.",
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
    src: "/gallery/placeholder-10.svg",
    alt: "Illustration of a men's kurta pyjama",
    caption: "Men's kurta pyjama",
    garment: "kurta-pyjama",
  },
  {
    src: "/gallery/placeholder-11.svg",
    alt: "Illustration of Punjabi suits for a girl and a boy",
    caption: "Kids' suits",
    garment: "kids-suits",
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

/* ── Examples ──────────────────────────────────────────────── */

/**
 * Made-up examples, shown on the Gallery page, of how a job goes from what
 * someone asks for to the finished result. They're labelled as examples on
 * the page — not customer reviews — so keep them general.
 */
export const examples = [
  {
    id: "hem",
    image: "/gallery/placeholder-9.svg",
    title: "Pants too long",
    asked: "New pants that are too long.",
    steps: [
      "She measures your leg.",
      "She marks the right length.",
      "She hems the pants.",
    ],
    result: "Pants that sit just right.",
  },
  {
    id: "resize",
    image: "/gallery/placeholder-9.svg",
    title: "Pants don't fit any more",
    asked: "You lost or gained weight, and your pants are too loose or too tight.",
    steps: [
      "You try them on and she pins them.",
      "She takes them in, or lets them out.",
      "You try them again to check.",
    ],
    result: "The same pants, fitting again.",
  },
  {
    id: "suit",
    image: "/gallery/placeholder-1.svg",
    title: "A suit from a photo",
    asked: "A Punjabi suit like one in a photo.",
    steps: [
      "You send the photo and bring your fabric.",
      "She measures you in person.",
      "She cuts and stitches the suit.",
      "You try it on, and she fixes any small things.",
    ],
    result: "The suit you wanted, made to fit you.",
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
    q: "Do you only do Punjabi clothes?",
    a: "Punjabi clothes are her main work, but she can alter and tailor other clothes too.",
  },
  {
    q: "How do turbans and patkas work?",
    a: "Bring the cloth. She cuts it to length and finishes the edges.",
  },
];
