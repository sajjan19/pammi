/**
 * ─────────────────────────────────────────────────────────────
 *  ਪੰਜਾਬੀ — THE PUNJABI VERSION OF lib/content.ts
 *
 *  Only the words live here. Prices, turnaround days, pictures and
 *  everything else that isn't language stays in lib/content.ts, so
 *  changing a price there changes it in both languages at once.
 *
 *  Anything missing here falls back to the English, so a garment
 *  added to content.ts still appears in Punjabi mode — just in
 *  English until it's translated here.
 *
 *  These translations should be read over by a native speaker
 *  before the site goes live. Pammi herself is the ideal reviewer:
 *  the tailoring words especially should be the ones she uses.
 *
 *  Pammi is ਪੰਮੀ ਜੀ, with the respectful plural (ਉਹ ... ਕਰਦੇ ਹਨ),
 *  throughout.
 * ─────────────────────────────────────────────────────────────
 */

export const businessPa = {
  tailor: "ਪਰਮਜੀਤ ਕੌਰ ਸੱਜਣ",
  tagline: "ਪੰਜਾਬੀ ਸੂਟ, ਤੁਹਾਡੇ ਨਾਪ ਨਾਲ",
  intro:
    "ਔਰਤਾਂ, ਮਰਦਾਂ ਅਤੇ ਬੱਚਿਆਂ ਲਈ ਪੰਜਾਬੀ ਸੂਟ, ਤੁਹਾਡੇ ਮੇਚ ਦੇ। ਹਰ ਤਰ੍ਹਾਂ ਦੇ ਕੱਪੜਿਆਂ ਦੀ ਆਲਟਰੇਸ਼ਨ ਵੀ।",
  city: "ਸਾਊਥ ਵੈਨਕੂਵਰ, ਬੀ ਸੀ",
  addressNote: "ਆਰਡਰ ਪੱਕਾ ਹੋਣ 'ਤੇ ਤੁਹਾਨੂੰ ਪਤਾ ਦੱਸਿਆ ਜਾਵੇਗਾ।",
  languages: ["ਪੰਜਾਬੀ", "ਹਿੰਦੀ", "ਅੰਗਰੇਜ਼ੀ"],
};

/** See `about` in lib/content.ts. Facts are keyed by their `id`. */
export const aboutPa = {
  quote:
    "ਮੈਂ ਸਿਲਾਈ ਆਪਣੀ ਮਾਂ ਅਤੇ ਚਾਰ ਵੱਡੀਆਂ ਭੈਣਾਂ ਤੋਂ ਨਵਾਂਸ਼ਹਿਰ, ਪੰਜਾਬ ਵਿੱਚ ਸਿੱਖੀ। 18 ਸਾਲ ਦੀ ਉਮਰ ਵਿੱਚ ਵੈਨਕੂਵਰ ਆਉਣ ਤੋਂ ਬਾਅਦ, ਹਰ ਸੂਟ ਮੈਂ ਆਪ ਸਿਊਂਦੀ ਹਾਂ, ਇੱਕ-ਇੱਕ ਕਰਕੇ।",
  facts: {
    chai: {
      title: "ਹਮੇਸ਼ਾ ਚਾਹ ਦਾ ਕੱਪ",
      body: "ਹਰ ਸੂਟ ਤੋਂ ਪਹਿਲਾਂ, ਵਿੱਚ ਅਤੇ ਬਾਅਦ। ਧਾਗਾ ਮੁੱਕ ਜਾਂਦਾ ਹੈ, ਚਾਹ ਨਹੀਂ।",
    },
    cooking: {
      title: "ਖਾਣਾ ਬਣਾਉਣ ਦਾ ਸ਼ੌਕ",
      body: "ਉਹ ਹਰ ਤਰ੍ਹਾਂ ਦੇ ਪਕਵਾਨ ਬਣਾਉਂਦੇ ਹਨ, ਪਰ ਪੰਜਾਬੀ ਖਾਣਾ ਉਨ੍ਹਾਂ ਦੀ ਖ਼ਾਸੀਅਤ ਹੈ।",
    },
    shopping: {
      title: "ਸੂਟ ਖਰੀਦਣ ਦਾ ਸ਼ੌਕ",
      body: "ਘਰ ਵਿੱਚ ਸੂਟਾਂ ਲਈ ਜਗ੍ਹਾ ਕਦੋਂ ਦੀ ਮੁੱਕ ਗਈ। ਹੁਣ ਭੈਣ-ਭਰਾਵਾਂ ਦੇ ਘਰ ਵੀ ਭਰ ਰਹੇ ਹਨ।",
    },
    dramas: {
      title: "ਪੰਜਾਬੀ ਫ਼ਿਲਮਾਂ ਅਤੇ ਡਰਾਮੇ",
      body: "ਸਿਲਾਈ ਦੇ ਲੰਮੇ ਦਿਨ ਤੋਂ ਬਾਅਦ ਆਰਾਮ ਕਰਨ ਦਾ ਉਨ੍ਹਾਂ ਦਾ ਮਨਪਸੰਦ ਤਰੀਕਾ।",
    },
  } as Record<string, { title: string; body: string }>,
  photoAlt:
    "ਪਰਮਜੀਤ ਕੌਰ ਸੱਜਣ ਆਪਣਾ ਨੀਲਾ ਬਿਸਕੁਟਾਂ ਵਾਲਾ ਡੱਬਾ ਫੜੀ, ਜੋ ਧਾਗੇ ਦੀਆਂ ਰੀਲਾਂ ਨਾਲ ਭਰਿਆ ਹੈ।",
};

/** Keyed by garment slug — see `garments` in lib/content.ts. */
export const garmentsPa: Record<
  string,
  { name: string; otherNames?: string; summary: string }
> = {
  "salwar-kameez": {
    name: "ਔਰਤਾਂ ਦਾ ਪੰਜਾਬੀ ਸੂਟ",
    otherNames: "ਸਲਵਾਰ ਕਮੀਜ਼",
    summary: "ਰੋਜ਼ਾਨਾ ਦਾ ਸੂਟ। ਕੋਈ ਵੀ ਗਲਾ, ਕੋਈ ਵੀ ਬਾਂਹ।",
  },
  "patiala-suit": {
    name: "ਪਟਿਆਲਾ ਸੂਟ",
    summary: "ਪੂਰੀ, ਪਲੇਟਾਂ ਵਾਲੀ ਪਟਿਆਲਾ ਸਲਵਾਰ ਨਾਲ।",
  },
  anarkali: {
    name: "ਅਨਾਰਕਲੀ ਸੂਟ",
    summary: "ਉੱਪਰੋਂ ਫਿੱਟ, ਕਮਰ ਤੋਂ ਘੇਰੇਦਾਰ।",
  },
  "sharara-palazzo": {
    name: "ਸ਼ਰਾਰਾ ਅਤੇ ਪਲਾਜ਼ੋ ਸੂਟ",
    summary: "ਖੁੱਲ੍ਹੇ ਪਹੁੰਚੇ, ਛੋਟੀ ਜਾਂ ਲੰਮੀ ਕਮੀਜ਼ ਨਾਲ।",
  },
  kurti: {
    name: "ਕੁੜਤੀ / ਕੁੜਤਾ",
    summary: "ਸਿਰਫ਼ ਕੁੜਤੀ, ਕਿਸੇ ਵੀ ਡਿਜ਼ਾਈਨ ਜਾਂ ਲੰਬਾਈ ਦੀ।",
  },
  "kurta-pyjama": {
    name: "ਮਰਦਾਂ ਦਾ ਕੁੜਤਾ ਪਜਾਮਾ",
    otherNames: "ਮਰਦਾਂ ਦਾ ਪੰਜਾਬੀ ਸੂਟ",
    summary: "ਮਰਦਾਂ ਲਈ ਪੰਜਾਬੀ ਸੂਟ, ਤੁਹਾਡੇ ਮੇਚ ਦਾ।",
  },
  "kids-suits": {
    name: "ਬੱਚਿਆਂ ਦੇ ਪੰਜਾਬੀ ਸੂਟ",
    summary: "ਮੁੰਡਿਆਂ ਅਤੇ ਕੁੜੀਆਂ ਲਈ, ਹਰ ਉਮਰ ਦੇ।",
  },
  "turbans-patkas": {
    name: "ਪੱਗਾਂ ਅਤੇ ਪਟਕੇ",
    otherNames: "ਦਸਤਾਰ",
    summary: "ਮਰਦਾਂ ਦੀਆਂ ਪੱਗਾਂ ਅਤੇ ਬੱਚਿਆਂ ਦੇ ਪਟਕੇ, ਤੁਹਾਡੇ ਕੱਪੜੇ ਤੋਂ।",
  },
  repairs: {
    name: "ਆਲਟਰੇਸ਼ਨ ਅਤੇ ਮੁਰੰਮਤ",
    summary: "ਕਿਸੇ ਵੀ ਕੱਪੜੇ ਨੂੰ ਤੰਗ, ਖੁੱਲ੍ਹਾ, ਛੋਟਾ ਜਾਂ ਠੀਕ ਕਰਵਾਓ।",
  },
};

/** Same order as `steps` in lib/content.ts — the drawings come from there. */
export const stepsPa = [
  {
    title: "ਆਰਡਰ ਭੇਜੋ",
    body: "ਦੱਸੋ ਕਿ ਕੀ ਚਾਹੀਦਾ ਹੈ। ਫ਼ੋਟੋ ਹੋਵੇ ਤਾਂ ਲਾ ਦਿਓ।",
  },
  {
    title: "ਕੀਮਤ ਪਤਾ ਕਰੋ",
    body: "ਉਹ ਤੁਹਾਨੂੰ ਕੀਮਤ ਅਤੇ ਤਰੀਕ ਦਾ ਸੁਨੇਹਾ ਭੇਜਣਗੇ।",
  },
  {
    title: "ਨਾਪ ਦਿਓ",
    body: "ਆਪਣਾ ਕੱਪੜਾ ਲਿਆਓ। ਉਹ ਆਪ ਤੁਹਾਡਾ ਨਾਪ ਲੈਣਗੇ।",
  },
  {
    title: "ਸੂਟ ਲੈ ਜਾਓ",
    body: "ਪਾ ਕੇ ਦੇਖਣ ਤੋਂ ਬਾਅਦ ਛੋਟੀਆਂ ਤਬਦੀਲੀਆਂ ਮੁਫ਼ਤ ਹਨ।",
  },
];

/**
 * The customer's choices avoid gendered verbs — Punjabi "I'll bring" is
 * ਲਿਆਵਾਂਗੀ or ਲਿਆਵਾਂਗਾ depending on who's speaking, and a form can't know
 * which.
 */
export const fabricSourcesPa: Record<string, { label: string; hint: string }> = {
  customer: {
    label: "ਕੱਪੜਾ ਮੇਰਾ ਆਪਣਾ ਹੋਵੇਗਾ",
    hint: "ਜ਼ਿਆਦਾਤਰ ਲੋਕ ਇਹੀ ਕਰਦੇ ਹਨ।",
  },
  tailor: {
    label: "ਕਿਰਪਾ ਕਰਕੇ ਕੱਪੜਾ ਤੁਸੀਂ ਲਿਆ ਦਿਓ",
    hint: "ਕੱਪੜੇ ਦਾ ਖ਼ਰਚਾ ਕੀਮਤ ਵਿੱਚ ਜੁੜ ਜਾਵੇਗਾ।",
  },
  unsure: {
    label: "ਹਾਲੇ ਪੱਕਾ ਨਹੀਂ",
    hint: "ਬਾਅਦ ਵਿੱਚ ਫ਼ੈਸਲਾ ਕਰ ਲੈਣਾ।",
  },
  na: {
    label: "ਲਾਗੂ ਨਹੀਂ (ਮੁਰੰਮਤ)",
    hint: "",
  },
};

/**
 * Dropdown labels, keyed by the English value. The English is what gets
 * saved with the order, so the admin page reads the same whichever language
 * the customer ordered in.
 */
export const optionLabelsPa: Record<string, string> = {
  // Necklines
  Round: "ਗੋਲ ਗਲਾ",
  "V-neck": "ਵੀ (V) ਗਲਾ",
  "Boat neck": "ਬੋਟ ਗਲਾ (ਚੌੜਾ)",
  Square: "ਚੌਰਸ ਗਲਾ",
  "Collar / band": "ਕਾਲਰ / ਬੰਦ ਗਲਾ",
  Sweetheart: "ਸਵੀਟਹਾਰਟ ਗਲਾ",
  Keyhole: "ਕੀਹੋਲ ਗਲਾ",

  // Sleeves
  Sleeveless: "ਬਿਨਾਂ ਬਾਂਹ",
  "Cap sleeve": "ਬਹੁਤ ਛੋਟੀ ਬਾਂਹ (ਕੈਪ)",
  "Short sleeve": "ਛੋਟੀ ਬਾਂਹ",
  "Elbow length": "ਕੂਹਣੀ ਤੱਕ",
  "Three-quarter": "ਤਿੰਨ-ਚੌਥਾਈ ਬਾਂਹ",
  "Full length": "ਪੂਰੀ ਬਾਂਹ",
  "Bell sleeve": "ਘੰਟੀ ਵਰਗੀ ਖੁੱਲ੍ਹੀ ਬਾਂਹ",

  // Shared by necklines and sleeves
  "Same as my sample suit": "ਮੇਰੇ ਨਮੂਨੇ ਵਾਲੇ ਸੂਟ ਵਰਗਾ",
  "Not sure — please advise": "ਪੱਕਾ ਨਹੀਂ, ਸਲਾਹ ਦਿਓ",

  // Occasions
  "Everyday wear": "ਰੋਜ਼ਾਨਾ ਪਾਉਣ ਲਈ",
  Work: "ਕੰਮ ਲਈ",
  "Party / function": "ਪਾਰਟੀ / ਸਮਾਗਮ",
  "Wedding — guest": "ਵਿਆਹ (ਮਹਿਮਾਨ)",
  "Wedding — bride or family": "ਵਿਆਹ (ਲਾੜੀ ਜਾਂ ਪਰਿਵਾਰ)",
  Festival: "ਤਿਉਹਾਰ",
  Other: "ਹੋਰ",
};

/** What a customer sees on the status page, keyed by order status. */
export const statusLabelsPa: Record<string, string> = {
  new: "ਮਿਲ ਗਿਆ, ਪੱਕਾ ਹੋਣਾ ਬਾਕੀ",
  quoted: "ਕੀਮਤ ਭੇਜ ਦਿੱਤੀ, ਆਪਣੇ ਸੁਨੇਹੇ ਦੇਖੋ",
  confirmed: "ਪੱਕਾ ਹੋ ਗਿਆ, ਤੁਹਾਡੇ ਕੱਪੜੇ ਦੀ ਉਡੀਕ",
  stitching: "ਸਿਲਾਈ ਹੋ ਰਹੀ ਹੈ",
  ready: "ਲੈਣ ਲਈ ਤਿਆਰ",
  collected: "ਲੈ ਲਿਆ ਗਿਆ, ਧੰਨਵਾਦ!",
  cancelled: "ਰੱਦ ਕੀਤਾ ਗਿਆ",
};

/** Same order as `policies` in lib/content.ts — the drawings come from there. */
export const policiesPa = [
  {
    title: "ਪਹਿਲਾਂ ਕੀਮਤ",
    body: "ਕੰਮ ਸ਼ੁਰੂ ਹੋਣ ਤੋਂ ਪਹਿਲਾਂ ਤੁਹਾਨੂੰ ਕੀਮਤ ਪਤਾ ਹੋਵੇਗੀ।",
  },
  {
    title: "ਨਾਪ ਉਹ ਆਪ ਲੈਂਦੇ ਹਨ",
    body: "ਆਰਡਰ ਫ਼ਾਰਮ ਵਾਲੇ ਨਾਪ ਸਿਰਫ਼ ਅੰਦਾਜ਼ਾ ਹਨ।",
  },
  {
    title: "ਛੋਟੀਆਂ ਤਬਦੀਲੀਆਂ ਮੁਫ਼ਤ",
    body: "ਪਹਿਲੀ ਵਾਰ ਪਾ ਕੇ ਦੇਖਣ ਤੋਂ ਬਾਅਦ ਛੋਟੀਆਂ ਤਬਦੀਲੀਆਂ ਮੁਫ਼ਤ ਹਨ।",
  },
  {
    title: "ਭੁਗਤਾਨ",
    body: "ਸਿਰਫ਼ ਈ-ਟ੍ਰਾਂਸਫ਼ਰ ਜਾਂ ਨਕਦ।",
  },
];

/** Keyed by image path — see `gallery` in lib/content.ts. */
export const galleryPa: Record<string, { alt: string; caption: string }> = {
  "/gallery/placeholder-1.svg": {
    alt: "ਕਢਾਈ ਵਾਲੇ ਸਲਵਾਰ ਕਮੀਜ਼ ਦਾ ਚਿੱਤਰ",
    caption: "ਸਲਵਾਰ ਕਮੀਜ਼",
  },
  "/gallery/placeholder-2.svg": {
    alt: "ਪਟਿਆਲਾ ਸੂਟ ਦਾ ਚਿੱਤਰ",
    caption: "ਪਟਿਆਲਾ ਸੂਟ",
  },
  "/gallery/placeholder-3.svg": {
    alt: "ਲੰਮੇ ਅਨਾਰਕਲੀ ਸੂਟ ਦਾ ਚਿੱਤਰ",
    caption: "ਅਨਾਰਕਲੀ",
  },
  "/gallery/placeholder-4.svg": {
    alt: "ਸ਼ਰਾਰਾ ਸੂਟ ਦਾ ਚਿੱਤਰ",
    caption: "ਸ਼ਰਾਰਾ ਸੂਟ",
  },
  "/gallery/placeholder-5.svg": {
    alt: "ਏ-ਲਾਈਨ ਕੁੜਤੀ ਦਾ ਚਿੱਤਰ",
    caption: "ਕੁੜਤੀ",
  },
  "/gallery/placeholder-6.svg": {
    alt: "ਪਲਾਜ਼ੋ ਸੂਟ ਦਾ ਚਿੱਤਰ",
    caption: "ਪਲਾਜ਼ੋ ਸੂਟ",
  },
  "/gallery/placeholder-10.svg": {
    alt: "ਮਰਦਾਂ ਦੇ ਕੁੜਤੇ ਪਜਾਮੇ ਦਾ ਚਿੱਤਰ",
    caption: "ਮਰਦਾਂ ਦਾ ਕੁੜਤਾ ਪਜਾਮਾ",
  },
  "/gallery/placeholder-11.svg": {
    alt: "ਇੱਕ ਕੁੜੀ ਅਤੇ ਇੱਕ ਮੁੰਡੇ ਦੇ ਪੰਜਾਬੀ ਸੂਟਾਂ ਦਾ ਚਿੱਤਰ",
    caption: "ਬੱਚਿਆਂ ਦੇ ਸੂਟ",
  },
  "/gallery/placeholder-7.svg": {
    alt: "ਜੂੜੇ ਉੱਤੇ ਬੰਨ੍ਹੇ ਬੱਚੇ ਦੇ ਪਟਕੇ ਦਾ ਚਿੱਤਰ",
    caption: "ਬੱਚਿਆਂ ਦੇ ਪਟਕੇ",
  },
  "/gallery/placeholder-8.svg": {
    alt: "ਬੰਨ੍ਹੀ ਹੋਈ ਪੱਗ ਅਤੇ ਕੱਪੜੇ ਦਾ ਚਿੱਤਰ",
    caption: "ਪੱਗਾਂ",
  },
};

/** Keyed by id — see `examples` in lib/content.ts. */
export const examplesPa: Record<
  string,
  { title: string; asked: string; steps: string[]; result: string }
> = {
  hem: {
    title: "ਪੈਂਟ ਬਹੁਤ ਲੰਮੀ",
    asked: "ਨਵੀਂ ਪੈਂਟ ਜੋ ਬਹੁਤ ਲੰਮੀ ਹੈ।",
    steps: [
      "ਉਹ ਤੁਹਾਡੀ ਲੱਤ ਦਾ ਨਾਪ ਲੈਂਦੇ ਹਨ।",
      "ਉਹ ਸਹੀ ਲੰਬਾਈ 'ਤੇ ਨਿਸ਼ਾਨ ਲਾਉਂਦੇ ਹਨ।",
      "ਉਹ ਪੈਂਟ ਦੀ ਤੁਰਪਾਈ ਕਰਦੇ ਹਨ।",
    ],
    result: "ਬਿਲਕੁਲ ਠੀਕ ਲੰਬਾਈ ਦੀ ਪੈਂਟ।",
  },
  resize: {
    title: "ਪੈਂਟ ਹੁਣ ਮੇਚ ਨਹੀਂ ਆਉਂਦੀ",
    asked: "ਭਾਰ ਘਟਣ ਜਾਂ ਵਧਣ ਕਰਕੇ ਪੈਂਟ ਢਿੱਲੀ ਜਾਂ ਤੰਗ ਹੋ ਗਈ ਹੈ।",
    steps: [
      "ਤੁਸੀਂ ਪਾ ਕੇ ਦਿਖਾਉਂਦੇ ਹੋ, ਉਹ ਪਿੰਨ ਲਾਉਂਦੇ ਹਨ।",
      "ਉਹ ਪੈਂਟ ਨੂੰ ਤੰਗ ਜਾਂ ਖੁੱਲ੍ਹਾ ਕਰਦੇ ਹਨ।",
      "ਤੁਸੀਂ ਦੁਬਾਰਾ ਪਾ ਕੇ ਦੇਖਦੇ ਹੋ।",
    ],
    result: "ਉਹੀ ਪੈਂਟ, ਫਿਰ ਤੋਂ ਮੇਚ ਦੀ।",
  },
  suit: {
    title: "ਫ਼ੋਟੋ ਵਰਗਾ ਸੂਟ",
    asked: "ਕਿਸੇ ਫ਼ੋਟੋ ਵਰਗਾ ਪੰਜਾਬੀ ਸੂਟ।",
    steps: [
      "ਤੁਸੀਂ ਫ਼ੋਟੋ ਭੇਜਦੇ ਹੋ ਅਤੇ ਕੱਪੜਾ ਲਿਆਉਂਦੇ ਹੋ।",
      "ਉਹ ਆਪ ਤੁਹਾਡਾ ਨਾਪ ਲੈਂਦੇ ਹਨ।",
      "ਉਹ ਸੂਟ ਕੱਟ ਕੇ ਸਿਊਂਦੇ ਹਨ।",
      "ਤੁਸੀਂ ਪਾ ਕੇ ਦੇਖਦੇ ਹੋ, ਉਹ ਛੋਟੀਆਂ ਤਬਦੀਲੀਆਂ ਕਰਦੇ ਹਨ।",
    ],
    result: "ਤੁਹਾਡੀ ਪਸੰਦ ਦਾ ਸੂਟ, ਤੁਹਾਡੇ ਮੇਚ ਦਾ।",
  },
};

export const faqsPa = [
  {
    q: "ਮੈਨੂੰ ਕਿੰਨਾ ਕੱਪੜਾ ਚਾਹੀਦਾ ਹੈ?",
    a: "ਸਲਵਾਰ ਕਮੀਜ਼ ਲਈ ਲਗਭਗ 5 ਮੀਟਰ। ਅਨਾਰਕਲੀ ਜਾਂ ਸ਼ਰਾਰੇ ਲਈ ਲਗਭਗ 7 ਮੀਟਰ।",
  },
  {
    q: "ਕੀ ਮੈਨੂੰ ਆਪਣਾ ਨਾਪ ਆਪ ਲੈਣਾ ਪਵੇਗਾ?",
    a: "ਨਹੀਂ। ਉਹ ਆਪ ਤੁਹਾਡਾ ਨਾਪ ਲੈਂਦੇ ਹਨ।",
  },
  {
    q: "ਜੇ ਮੈਂ ਆ ਨਾ ਸਕਾਂ ਤਾਂ?",
    a: "ਆਪਣਾ ਕੋਈ ਚੰਗੇ ਮੇਚ ਵਾਲਾ ਸੂਟ ਭੇਜ ਦਿਓ, ਉਹ ਉਸੇ ਵਰਗਾ ਬਣਾ ਦੇਣਗੇ।",
  },
  {
    q: "ਕਿੰਨਾ ਸਮਾਂ ਲੱਗਦਾ ਹੈ?",
    a: "ਸੂਟ ਲਈ ਲਗਭਗ ਦੋ ਹਫ਼ਤੇ। ਵਿਆਹਾਂ ਦੇ ਸੀਜ਼ਨ ਵਿੱਚ ਜਲਦੀ ਦੱਸੋ।",
  },
  {
    q: "ਕੀ ਤੁਸੀਂ ਸਿਰਫ਼ ਪੰਜਾਬੀ ਕੱਪੜੇ ਹੀ ਬਣਾਉਂਦੇ ਹੋ?",
    a: "ਪੰਜਾਬੀ ਕੱਪੜੇ ਉਨ੍ਹਾਂ ਦਾ ਮੁੱਖ ਕੰਮ ਹਨ, ਪਰ ਉਹ ਹੋਰ ਕੱਪੜੇ ਵੀ ਸਿਊਂ ਅਤੇ ਠੀਕ ਕਰ ਸਕਦੇ ਹਨ।",
  },
  {
    q: "ਪੱਗਾਂ ਅਤੇ ਪਟਕੇ ਕਿਵੇਂ ਬਣਦੇ ਹਨ?",
    a: "ਕੱਪੜਾ ਲਿਆਓ। ਉਹ ਲੰਬਾਈ ਮੁਤਾਬਕ ਕੱਟ ਕੇ ਕਿਨਾਰੇ ਸਿਊਂ ਦਿੰਦੇ ਹਨ।",
  },
];

/* ── Measurements (see lib/measurements.ts) ─────────────────── */

export const measurementGroupsPa: Record<
  string,
  { title: string; description: string }
> = {
  upper: { title: "ਸਰੀਰ", description: "ਅੰਦਾਜ਼ਾ ਹੀ ਕਾਫ਼ੀ ਹੈ।" },
  sleeve: { title: "ਬਾਂਹ", description: "ਬਾਂਹ ਢਿੱਲੀ ਛੱਡ ਕੇ।" },
  kameez: { title: "ਕਮੀਜ਼ / ਕੁੜਤਾ", description: "ਮੋਢੇ ਤੋਂ ਨਾਪੋ।" },
  bottom: { title: "ਸਲਵਾਰ / ਪਜਾਮਾ", description: "ਕਮੀਜ਼ ਦੇ ਹੇਠਾਂ ਵਾਲਾ।" },
};

/** Keyed by field id. */
export const measurementFieldsPa: Record<string, { label: string; hint: string }> = {
  bust: { label: "ਛਾਤੀ", hint: "ਸਭ ਤੋਂ ਭਰਵੇਂ ਹਿੱਸੇ ਦੁਆਲੇ।" },
  waist: { label: "ਕਮਰ", hint: "ਸਭ ਤੋਂ ਪਤਲੇ ਹਿੱਸੇ ਦੁਆਲੇ।" },
  hips: { label: "ਹਿੱਪ", hint: "ਸਭ ਤੋਂ ਭਰਵੇਂ ਹਿੱਸੇ ਦੁਆਲੇ।" },
  shoulder: { label: "ਮੋਢਾ", hint: "ਪਿੱਠ ਉੱਤੋਂ, ਇੱਕ ਸਿਰੇ ਤੋਂ ਦੂਜੇ ਤੱਕ।" },
  armhole: { label: "ਬਗਲ (ਆਰਮਹੋਲ)", hint: "ਬਾਂਹ ਦੇ ਉੱਪਰਲੇ ਹਿੱਸੇ ਦੁਆਲੇ।" },
  sleeveLength: { label: "ਬਾਂਹ ਦੀ ਲੰਬਾਈ", hint: "ਮੋਢੇ ਤੋਂ ਬਾਂਹ ਦੇ ਸਿਰੇ ਤੱਕ।" },
  sleeveRound: { label: "ਬਾਂਹ ਦਾ ਘੇਰਾ", hint: "ਬਾਂਹ ਦੇ ਸਿਰੇ ਉੱਤੇ।" },
  kameezLength: { label: "ਕਮੀਜ਼ ਦੀ ਲੰਬਾਈ", hint: "ਮੋਢੇ ਤੋਂ ਥੱਲੇ ਤੱਕ।" },
  frontNeckDepth: { label: "ਅਗਲਾ ਗਲਾ", hint: "ਅੱਗੋਂ ਗਲਾ ਕਿੰਨਾ ਡੂੰਘਾ।" },
  backNeckDepth: { label: "ਪਿਛਲਾ ਗਲਾ", hint: "ਪਿੱਛੋਂ ਗਲਾ ਕਿੰਨਾ ਡੂੰਘਾ।" },
  slitLength: { label: "ਚਾਕ ਦੀ ਲੰਬਾਈ", hint: "ਚਾਕ ਕਿੰਨੇ ਉੱਚੇ।" },
  bottomLength: { label: "ਸਲਵਾਰ ਦੀ ਲੰਬਾਈ", hint: "ਕਮਰ ਤੋਂ ਗਿੱਟੇ ਤੱਕ।" },
  bottomWaist: { label: "ਸਲਵਾਰ ਦੀ ਕਮਰ", hint: "ਜਿੱਥੇ ਨਾਲਾ ਬੰਨ੍ਹਦੇ ਹੋ।" },
  thigh: { label: "ਪੱਟ", hint: "ਸਭ ਤੋਂ ਭਰਵੇਂ ਹਿੱਸੇ ਦੁਆਲੇ।" },
  bottomOpening: { label: "ਮੋਹਰੀ", hint: "ਗਿੱਟੇ ਉੱਤੇ ਕਿੰਨੀ ਖੁੱਲ੍ਹੀ।" },
};

/** Keyed by value — see `measurementSources` in lib/measurements.ts. */
export const measurementSourcesPa: Record<string, { label: string; hint: string }> = {
  "in-person": { label: "ਪੰਮੀ ਜੀ ਮੇਰਾ ਨਾਪ ਲੈਣਗੇ", hint: "ਆਮ ਤਰੀਕਾ।" },
  sample: {
    label: "ਮੇਰੇ ਮੇਚ ਵਾਲੇ ਸੂਟ ਵਰਗਾ ਬਣਾ ਦਿਓ",
    hint: "ਕੱਪੜਾ ਦੇਣ ਵੇਲੇ ਨਾਲ ਲੈ ਆਓ।",
  },
  onfile: {
    label: "ਮੇਰਾ ਨਾਪ ਉਨ੍ਹਾਂ ਕੋਲ ਹੈ",
    hint: "ਪੁਰਾਣੇ ਗਾਹਕਾਂ ਲਈ।",
  },
  "not-needed": { label: "ਇਸ ਕੰਮ ਲਈ ਲੋੜ ਨਹੀਂ", hint: "ਮੁਰੰਮਤ ਲਈ।" },
};
