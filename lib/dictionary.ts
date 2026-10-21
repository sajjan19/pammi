/**
 * The site's own words — buttons, headings, labels, messages — in both
 * languages. The business's content (garments, FAQs, policies) lives in
 * lib/content.ts and lib/content-pa.ts instead.
 *
 * Keep every line short and plain. Many visitors read slowly, or in their
 * second language: one simple sentence beats two careful ones.
 *
 * `pa` is typed as `Dictionary`, so a line added to English without a
 * Punjabi version fails the build rather than going quietly missing.
 */

import type { Lang } from "@/lib/i18n";

const en = {
  langSwitch: {
    /** Read aloud by screen readers on the switch that leads *to* English. */
    readIn: "Read in English",
  },

  meta: {
    services: "What she makes",
    gallery: "Gallery",
    measuring: "Measuring",
    about: "About",
    contact: "Contact",
    order: "Start an order",
    status: "Check your order",
  },

  nav: {
    services: "What she makes",
    gallery: "Gallery",
    measuring: "Measuring",
    about: "About",
    contact: "Contact",
    myOrder: "My order",
    order: "Start an order",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    skipToContent: "Skip to content",
  },

  footer: {
    stitching: "Stitching",
    seeAll: "See everything",
    getInTouch: "Get in touch",
    startOrder: "Start an order",
    checkOrder: "Check your order",
    admin: "Admin",
  },

  common: {
    startOrder: "Start an order",
    aboutDays: (days: number) => `About ${days} days`,
    howItWorks: "How it works",
  },

  home: {
    heroLine1: "Every kind of suit,",
    heroLine2: "made to fit you",
    seeWork: "See her work",
    makesTitle: "Punjabi suits, made for you",
    seeAll: "See everything she makes",
    galleryTitleDrawn: "A few things she makes",
    galleryTitleReal: "Some of her work",
    viewGallery: "See the gallery",
    bandTitle: "No tape measure needed",
    bandText: "She measures you in person. Ordering takes five minutes.",
    howMeasuring: "How measuring works",
  },

  services: {
    title: "What she makes",
    lede: "Everything is made to fit you.",
    alsoCalled: (names: string) => `Also called ${names}`,
    price: "Price",
    askForPrice: "Ask for a price",
    forWho: {
      women: "Women",
      men: "Men",
      kids: "Kids",
      everyone: "Everyone",
    },
    priceFrom: (amount: number) => `From $${amount}`,
    orderThis: "Order this",
    goodToKnow: "Good to know",
  },

  gallery: {
    title: "Gallery",
    ledeDrawn: "A few things she makes.",
    ledeReal: "Some of her finished work.",
    drawingsNotice: "These are drawings. Real photos are coming soon.",
    examplesTitle: "For example",
    examplesLede: "How a job goes, from what you ask for to the result.",
    asked: "You ask for",
    steps: "What she does",
    result: "Result",
  },

  measuring: {
    title: "She measures you",
    figure: {
      caption: "What she measures at your fitting. You don't need to.",
      chest: "Chest",
      waist: "Waist",
      hips: "Hips",
      length: "Length",
    },
    lede: "No tape measure needed. Pammi measures you in person, so your suit fits.",
    points: [
      {
        title: "Five minutes",
        body: "Usually when you drop off your fabric.",
      },
      {
        title: "Bring a suit you like",
        body: "She can copy one that already fits you.",
      },
      {
        title: "Only once",
        body: "She keeps your measurements for next time.",
      },
    ],
  },

  about: {
    title: "Meet Pammi",
    lede: (fullName: string) =>
      `${fullName}.\nEveryone calls her Pammi Penji.`,
    factsTitle: "A little more about her",
  },

  contact: {
    title: "Get in touch",
    lede: "The order form is the quickest way. Or reach her directly.",
    email: "Email",
    phone: "Phone",
    whatsapp: "WhatsApp",
    whatsappLink: "Message on WhatsApp",
    instagram: "Instagram",
    area: "Area",
    address: "Address",
    languages: "Languages",
    questions: "Questions",
    readyTitle: "Ready to order?",
    readyText: "It takes about five minutes.",
    alreadyOrdered: "Already ordered? Check your order",
  },

  order: {
    title: "Start an order",
    lede: "About five minutes. No measuring needed.",

    stepWhat: "What do you need?",
    howMany: "How many",
    whatFor: "What's it for?",
    choose: "Choose…",
    neededBy: "Needed by",
    optional: "Optional",

    stepFabric: "Fabric and style",
    stepCloth: "About the cloth",
    stepFix: "What needs fixing?",
    aboutFabric: "About the fabric",
    aboutFabricPlaceholder: "e.g. georgette, 5 metres",
    neckline: "Neckline",
    sleeves: "Sleeves",
    lining: "Add lining",
    liningHint: "For thin or itchy fabric.",
    clothNotice: "Bring your own cloth. She cuts it to length and finishes the edges.",
    clothLabel: "Length, colour, and who it's for",
    clothPlaceholder: "e.g. 2 navy turbans for an adult",
    fixLabel: "Tell her about it",
    fixPlaceholder: "e.g. a split seam under the arm",

    stepSizing: "Sizing",
    nothingForRepair: "Nothing needed here. She'll see it when you bring it in.",
    nothingForCloth: "Nothing to measure.",
    dontMeasure: "Please don't measure yourself. Pammi measures you in person.",
    addRoughSizes: "Add rough sizes",
    optionalParen: "(optional)",
    roughHint: "Only to plan fabric. A guess is fine.",
    inches: "in",
    pickFirst: "Pick an option above first.",

    stepPhotoDesign: "Photo of the design",
    stepPhotoFix: "Photo of the clothes",
    photoHelps: "Helps a lot",
    choosePhotos: "Choose photos",
    photoHint: (max: number) => `Up to ${max} photos. Only she sees them.`,

    stepDetails: "Your details",
    name: "Your name",
    email: "Email",
    phone: "Phone",
    contactBy: "Best way to reach you",
    contactOptions: {
      none: "No preference",
      phone: "Phone call",
      text: "Text message",
      whatsapp: "WhatsApp",
      email: "Email",
    },
    notes: "Anything else?",

    submitNote: "You'll get a price first. Nothing starts until you say yes.",
    submit: "Send my order",
    sending: "Sending…",

    doneTitle: "Your order is in",
    doneText: "She'll message you with a price and a date.",
    doneKeep: "Keep this order number. You can use it to check your order.",
    checkOrder: "Check your order",
    backHome: "Back to home",

    errors: {
      chooseGarment: "Please choose what you need.",
      pickOne: "Pick one.",
      quantity: "Enter a number from 1 to 20.",
      chooseOption: "Please choose an option.",
      pickDate: "Please pick a date.",
      nameMissing: "Please enter your name.",
      nameLong: "That name is too long.",
      emailMissing: "We need an email to send your price.",
      emailBad: "That email doesn't look right.",
      phoneMissing: "We need a phone number.",
      phoneBad: "That phone number looks too short.",
      notesLong: "Please keep this under 2000 characters.",
      checkFields: "Please check the boxes marked in red.",
      notNumber: "Please enter a number, or leave it blank.",
      outOfRange: (min: number, max: number) =>
        `Between ${min} and ${max} inches, or leave it blank.`,
      tooManyPhotos: (max: number) => `Please add up to ${max} photos.`,
      badPhoto: (name: string) =>
        `"${name}" isn't a photo we can use. Please use JPG or PNG.`,
      bigPhoto: (name: string) =>
        `"${name}" is too large. Please use one under 8 MB.`,
      photoSaveFailed: "Your photos couldn't be saved. Please try again.",
      generic: "Something went wrong. Please try again.",
    },
  },

  status: {
    title: "Check your order",
    lede: "Enter your order number and email.",
    orderNumber: "Order number",
    email: "Email",
    check: "Check",
    checking: "Checking…",
    ordered: "Ordered",
    updated: "Last update",
    neededBy: "Needed by",
    price: "Price",
    message: "Message from Pammi Penji",
    questions: "Questions? Contact her with your order number.",
    contact: "Contact",
    missing: "Please enter your order number and email.",
    notFound: "We couldn't find that order. Check the number and email.",
    stages: {
      new: "Received",
      quoted: "Price sent",
      confirmed: "Confirmed",
      stitching: "Stitching",
      ready: "Ready",
      collected: "Collected",
    },
  },
};

export type Dictionary = typeof en;

const pa: Dictionary = {
  langSwitch: {
    readIn: "ਪੰਜਾਬੀ ਵਿੱਚ ਪੜ੍ਹੋ",
  },

  meta: {
    services: "ਕੀ ਬਣਦਾ ਹੈ",
    gallery: "ਗੈਲਰੀ",
    measuring: "ਨਾਪ",
    about: "ਸਾਡੇ ਬਾਰੇ",
    contact: "ਸੰਪਰਕ",
    order: "ਆਰਡਰ ਦਿਓ",
    status: "ਆਪਣਾ ਆਰਡਰ ਦੇਖੋ",
  },

  nav: {
    services: "ਕੀ ਬਣਦਾ ਹੈ",
    gallery: "ਗੈਲਰੀ",
    measuring: "ਨਾਪ",
    about: "ਸਾਡੇ ਬਾਰੇ",
    contact: "ਸੰਪਰਕ",
    myOrder: "ਮੇਰਾ ਆਰਡਰ",
    order: "ਆਰਡਰ ਦਿਓ",
    openMenu: "ਮੀਨੂ ਖੋਲ੍ਹੋ",
    closeMenu: "ਮੀਨੂ ਬੰਦ ਕਰੋ",
    skipToContent: "ਸਿੱਧਾ ਮੁੱਖ ਹਿੱਸੇ 'ਤੇ ਜਾਓ",
  },

  footer: {
    stitching: "ਸਿਲਾਈ",
    seeAll: "ਸਭ ਕੁਝ ਦੇਖੋ",
    getInTouch: "ਸੰਪਰਕ ਕਰੋ",
    startOrder: "ਆਰਡਰ ਦਿਓ",
    checkOrder: "ਆਪਣਾ ਆਰਡਰ ਦੇਖੋ",
    admin: "ਐਡਮਿਨ",
  },

  common: {
    startOrder: "ਆਰਡਰ ਦਿਓ",
    aboutDays: (days: number) => `ਲਗਭਗ ${days} ਦਿਨ`,
    howItWorks: "ਕਿਵੇਂ ਹੁੰਦਾ ਹੈ",
  },

  home: {
    heroLine1: "ਤੁਹਾਡੇ ਮੇਚ ਦੇ",
    heroLine2: "ਪੰਜਾਬੀ ਸੂਟ",
    seeWork: "ਕੰਮ ਦੇਖੋ",
    makesTitle: "ਤੁਹਾਡੇ ਲਈ ਬਣੇ ਪੰਜਾਬੀ ਸੂਟ",
    seeAll: "ਸਾਰਾ ਕੰਮ ਦੇਖੋ",
    galleryTitleDrawn: "ਕੁਝ ਨਮੂਨੇ",
    galleryTitleReal: "ਉਨ੍ਹਾਂ ਦਾ ਕੁਝ ਕੰਮ",
    viewGallery: "ਗੈਲਰੀ ਦੇਖੋ",
    bandTitle: "ਨਾਪ ਲੈਣ ਦੀ ਲੋੜ ਨਹੀਂ",
    bandText: "ਪੰਮੀ ਜੀ ਆਪ ਤੁਹਾਡਾ ਨਾਪ ਲੈਂਦੇ ਹਨ। ਆਰਡਰ ਦੇਣ ਵਿੱਚ ਪੰਜ ਮਿੰਟ ਲੱਗਦੇ ਹਨ।",
    howMeasuring: "ਨਾਪ ਬਾਰੇ",
  },

  services: {
    title: "ਕੀ ਬਣਦਾ ਹੈ",
    lede: "ਹਰ ਚੀਜ਼ ਤੁਹਾਡੇ ਮੇਚ ਦੀ ਬਣਦੀ ਹੈ।",
    alsoCalled: (names: string) => `ਇਸਨੂੰ ${names} ਵੀ ਕਹਿੰਦੇ ਹਨ`,
    price: "ਕੀਮਤ",
    askForPrice: "ਕੀਮਤ ਪੁੱਛੋ",
    forWho: {
      women: "ਔਰਤਾਂ",
      men: "ਮਰਦ",
      kids: "ਬੱਚੇ",
      everyone: "ਸਾਰੇ",
    },
    priceFrom: (amount: number) => `$${amount} ਤੋਂ ਸ਼ੁਰੂ`,
    orderThis: "ਇਹ ਆਰਡਰ ਕਰੋ",
    goodToKnow: "ਜਾਣਨ ਵਾਲੀਆਂ ਗੱਲਾਂ",
  },

  gallery: {
    title: "ਗੈਲਰੀ",
    ledeDrawn: "ਕੁਝ ਚੀਜ਼ਾਂ ਜੋ ਉਹ ਬਣਾਉਂਦੇ ਹਨ।",
    ledeReal: "ਉਨ੍ਹਾਂ ਦਾ ਕੁਝ ਤਿਆਰ ਕੰਮ।",
    drawingsNotice: "ਇਹ ਚਿੱਤਰ ਹਨ। ਅਸਲ ਫ਼ੋਟੋਆਂ ਜਲਦੀ ਆਉਣਗੀਆਂ।",
    examplesTitle: "ਉਦਾਹਰਣਾਂ",
    examplesLede: "ਕੰਮ ਕਿਵੇਂ ਹੁੰਦਾ ਹੈ, ਤੁਹਾਡੀ ਮੰਗ ਤੋਂ ਨਤੀਜੇ ਤੱਕ।",
    asked: "ਤੁਸੀਂ ਮੰਗਦੇ ਹੋ",
    steps: "ਉਹ ਕੀ ਕਰਦੇ ਹਨ",
    result: "ਨਤੀਜਾ",
  },

  measuring: {
    title: "ਨਾਪ ਉਹ ਆਪ ਲੈਂਦੇ ਹਨ",
    figure: {
      caption: "ਫਿਟਿੰਗ ਵੇਲੇ ਉਹ ਇਹ ਨਾਪ ਲੈਂਦੇ ਹਨ। ਤੁਹਾਨੂੰ ਲੈਣ ਦੀ ਲੋੜ ਨਹੀਂ।",
      chest: "ਛਾਤੀ",
      waist: "ਕਮਰ",
      hips: "ਕੁੱਲ੍ਹੇ",
      length: "ਲੰਬਾਈ",
    },
    lede: "ਤੁਹਾਨੂੰ ਨਾਪ ਲੈਣ ਦੀ ਲੋੜ ਨਹੀਂ। ਪੰਮੀ ਜੀ ਆਪ ਤੁਹਾਡਾ ਨਾਪ ਲੈਂਦੇ ਹਨ, ਤਾਂ ਜੋ ਸੂਟ ਠੀਕ ਆਵੇ।",
    points: [
      {
        title: "ਪੰਜ ਮਿੰਟ",
        body: "ਆਮ ਤੌਰ 'ਤੇ ਕੱਪੜਾ ਦੇਣ ਵੇਲੇ।",
      },
      {
        title: "ਪਸੰਦ ਦਾ ਸੂਟ ਲਿਆਓ",
        body: "ਉਹ ਤੁਹਾਡੇ ਮੇਚ ਵਾਲੇ ਸੂਟ ਵਰਗਾ ਬਣਾ ਸਕਦੇ ਹਨ।",
      },
      {
        title: "ਸਿਰਫ਼ ਇੱਕ ਵਾਰ",
        body: "ਅਗਲੀ ਵਾਰ ਲਈ ਉਹ ਤੁਹਾਡਾ ਨਾਪ ਰੱਖ ਲੈਂਦੇ ਹਨ।",
      },
    ],
  },

  about: {
    title: "ਪੰਮੀ ਜੀ ਨੂੰ ਮਿਲੋ",
    lede: (fullName: string) => `${fullName}।\nਸਾਰੇ ਉਨ੍ਹਾਂ ਨੂੰ ਪੰਮੀ ਭੈਣ ਜੀ ਕਹਿੰਦੇ ਹਨ।`,
    factsTitle: "ਉਨ੍ਹਾਂ ਬਾਰੇ ਥੋੜ੍ਹਾ ਹੋਰ",
  },

  contact: {
    title: "ਸੰਪਰਕ ਕਰੋ",
    lede: "ਆਰਡਰ ਫ਼ਾਰਮ ਸਭ ਤੋਂ ਸੌਖਾ ਤਰੀਕਾ ਹੈ। ਜਾਂ ਸਿੱਧਾ ਗੱਲ ਕਰੋ।",
    email: "ਈਮੇਲ",
    phone: "ਫ਼ੋਨ",
    whatsapp: "ਵਟਸਐਪ",
    whatsappLink: "ਵਟਸਐਪ 'ਤੇ ਸੁਨੇਹਾ ਭੇਜੋ",
    instagram: "ਇੰਸਟਾਗ੍ਰਾਮ",
    area: "ਇਲਾਕਾ",
    address: "ਪਤਾ",
    languages: "ਭਾਸ਼ਾਵਾਂ",
    questions: "ਸਵਾਲ",
    readyTitle: "ਆਰਡਰ ਦੇਣਾ ਹੈ?",
    readyText: "ਲਗਭਗ ਪੰਜ ਮਿੰਟ ਲੱਗਦੇ ਹਨ।",
    alreadyOrdered: "ਆਰਡਰ ਦੇ ਦਿੱਤਾ? ਆਪਣਾ ਆਰਡਰ ਦੇਖੋ",
  },

  order: {
    title: "ਆਰਡਰ ਦਿਓ",
    lede: "ਲਗਭਗ ਪੰਜ ਮਿੰਟ। ਨਾਪ ਦੀ ਲੋੜ ਨਹੀਂ।",

    stepWhat: "ਤੁਹਾਨੂੰ ਕੀ ਚਾਹੀਦਾ ਹੈ?",
    howMany: "ਕਿੰਨੇ",
    whatFor: "ਕਿਸ ਮੌਕੇ ਲਈ?",
    choose: "ਚੁਣੋ…",
    neededBy: "ਕਦੋਂ ਤੱਕ ਚਾਹੀਦਾ",
    optional: "ਜ਼ਰੂਰੀ ਨਹੀਂ",

    stepFabric: "ਕੱਪੜਾ ਅਤੇ ਡਿਜ਼ਾਈਨ",
    stepCloth: "ਕੱਪੜੇ ਬਾਰੇ",
    stepFix: "ਕੀ ਠੀਕ ਕਰਨਾ ਹੈ?",
    aboutFabric: "ਕੱਪੜੇ ਬਾਰੇ",
    aboutFabricPlaceholder: "ਜਿਵੇਂ: ਜਾਰਜੈੱਟ, 5 ਮੀਟਰ",
    neckline: "ਗਲਾ",
    sleeves: "ਬਾਂਹ",
    lining: "ਅਸਤਰ ਲਾਓ",
    liningHint: "ਪਤਲੇ ਜਾਂ ਚੁਭਣ ਵਾਲੇ ਕੱਪੜੇ ਲਈ।",
    clothNotice: "ਆਪਣਾ ਕੱਪੜਾ ਲਿਆਓ। ਉਹ ਲੰਬਾਈ ਮੁਤਾਬਕ ਕੱਟ ਕੇ ਕਿਨਾਰੇ ਸਿਊਂ ਦਿੰਦੇ ਹਨ।",
    clothLabel: "ਲੰਬਾਈ, ਰੰਗ, ਅਤੇ ਕਿਸ ਲਈ",
    clothPlaceholder: "ਜਿਵੇਂ: ਵੱਡੇ ਲਈ 2 ਨੀਲੀਆਂ ਪੱਗਾਂ",
    fixLabel: "ਦੱਸੋ ਕੀ ਹੋਇਆ ਹੈ",
    fixPlaceholder: "ਜਿਵੇਂ: ਬਾਂਹ ਹੇਠੋਂ ਸਿਲਾਈ ਉੱਧੜ ਗਈ ਹੈ",

    stepSizing: "ਨਾਪ",
    nothingForRepair: "ਇੱਥੇ ਕੁਝ ਨਹੀਂ ਚਾਹੀਦਾ। ਕੱਪੜਾ ਲਿਆਓਗੇ ਤਾਂ ਉਹ ਦੇਖ ਲੈਣਗੇ।",
    nothingForCloth: "ਨਾਪ ਦੀ ਲੋੜ ਨਹੀਂ।",
    dontMeasure: "ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਨਾਪ ਆਪ ਨਾ ਲਓ। ਪੰਮੀ ਜੀ ਆਪ ਤੁਹਾਡਾ ਨਾਪ ਲੈਣਗੇ।",
    addRoughSizes: "ਅੰਦਾਜ਼ਨ ਨਾਪ ਲਿਖੋ",
    optionalParen: "(ਜ਼ਰੂਰੀ ਨਹੀਂ)",
    roughHint: "ਸਿਰਫ਼ ਕੱਪੜੇ ਦੇ ਅੰਦਾਜ਼ੇ ਲਈ। ਅੰਦਾਜ਼ਾ ਹੀ ਕਾਫ਼ੀ ਹੈ।",
    inches: "ਇੰਚ",
    pickFirst: "ਪਹਿਲਾਂ ਉੱਪਰੋਂ ਕੁਝ ਚੁਣੋ।",

    stepPhotoDesign: "ਡਿਜ਼ਾਈਨ ਦੀ ਫ਼ੋਟੋ",
    stepPhotoFix: "ਕੱਪੜੇ ਦੀ ਫ਼ੋਟੋ",
    photoHelps: "ਬਹੁਤ ਕੰਮ ਆਉਂਦੀ ਹੈ",
    choosePhotos: "ਫ਼ੋਟੋਆਂ ਚੁਣੋ",
    photoHint: (max: number) => `${max} ਤੱਕ ਫ਼ੋਟੋਆਂ। ਸਿਰਫ਼ ਉਹ ਹੀ ਦੇਖਣਗੇ।`,

    stepDetails: "ਤੁਹਾਡੇ ਵੇਰਵੇ",
    name: "ਤੁਹਾਡਾ ਨਾਮ",
    email: "ਈਮੇਲ",
    phone: "ਫ਼ੋਨ",
    contactBy: "ਸੰਪਰਕ ਦਾ ਤਰੀਕਾ",
    contactOptions: {
      none: "ਕੋਈ ਵੀ",
      phone: "ਫ਼ੋਨ ਕਾਲ",
      text: "ਟੈਕਸਟ ਸੁਨੇਹਾ",
      whatsapp: "ਵਟਸਐਪ",
      email: "ਈਮੇਲ",
    },
    notes: "ਹੋਰ ਕੁਝ?",

    submitNote: "ਪਹਿਲਾਂ ਤੁਹਾਨੂੰ ਕੀਮਤ ਦੱਸੀ ਜਾਵੇਗੀ। ਤੁਹਾਡੀ ਹਾਂ ਤੋਂ ਬਿਨਾਂ ਕੰਮ ਸ਼ੁਰੂ ਨਹੀਂ ਹੁੰਦਾ।",
    submit: "ਆਰਡਰ ਭੇਜੋ",
    sending: "ਭੇਜ ਰਹੇ ਹਾਂ…",

    doneTitle: "ਤੁਹਾਡਾ ਆਰਡਰ ਮਿਲ ਗਿਆ",
    doneText: "ਉਹ ਤੁਹਾਨੂੰ ਕੀਮਤ ਅਤੇ ਤਰੀਕ ਦਾ ਸੁਨੇਹਾ ਭੇਜਣਗੇ।",
    doneKeep: "ਇਹ ਆਰਡਰ ਨੰਬਰ ਸੰਭਾਲ ਕੇ ਰੱਖੋ। ਇਸ ਨਾਲ ਤੁਸੀਂ ਆਪਣਾ ਆਰਡਰ ਦੇਖ ਸਕਦੇ ਹੋ।",
    checkOrder: "ਆਪਣਾ ਆਰਡਰ ਦੇਖੋ",
    backHome: "ਮੁੱਖ ਸਫ਼ੇ 'ਤੇ ਜਾਓ",

    errors: {
      chooseGarment: "ਕਿਰਪਾ ਕਰਕੇ ਚੁਣੋ ਕਿ ਤੁਹਾਨੂੰ ਕੀ ਚਾਹੀਦਾ ਹੈ।",
      pickOne: "ਇੱਕ ਚੁਣੋ।",
      quantity: "1 ਤੋਂ 20 ਤੱਕ ਕੋਈ ਨੰਬਰ ਲਿਖੋ।",
      chooseOption: "ਕਿਰਪਾ ਕਰਕੇ ਇੱਕ ਚੁਣੋ।",
      pickDate: "ਕਿਰਪਾ ਕਰਕੇ ਤਰੀਕ ਚੁਣੋ।",
      nameMissing: "ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਨਾਮ ਲਿਖੋ।",
      nameLong: "ਨਾਮ ਬਹੁਤ ਲੰਮਾ ਹੈ।",
      emailMissing: "ਕੀਮਤ ਭੇਜਣ ਲਈ ਈਮੇਲ ਚਾਹੀਦੀ ਹੈ।",
      emailBad: "ਈਮੇਲ ਠੀਕ ਨਹੀਂ ਲੱਗਦੀ।",
      phoneMissing: "ਫ਼ੋਨ ਨੰਬਰ ਚਾਹੀਦਾ ਹੈ।",
      phoneBad: "ਫ਼ੋਨ ਨੰਬਰ ਬਹੁਤ ਛੋਟਾ ਲੱਗਦਾ ਹੈ।",
      notesLong: "ਕਿਰਪਾ ਕਰਕੇ 2000 ਅੱਖਰਾਂ ਤੋਂ ਘੱਟ ਲਿਖੋ।",
      checkFields: "ਕਿਰਪਾ ਕਰਕੇ ਲਾਲ ਨਿਸ਼ਾਨ ਵਾਲੇ ਖ਼ਾਨੇ ਦੇਖੋ।",
      notNumber: "ਕੋਈ ਨੰਬਰ ਲਿਖੋ, ਜਾਂ ਖ਼ਾਲੀ ਛੱਡ ਦਿਓ।",
      outOfRange: (min: number, max: number) =>
        `${min} ਤੋਂ ${max} ਇੰਚ ਦੇ ਵਿੱਚ, ਜਾਂ ਖ਼ਾਲੀ ਛੱਡ ਦਿਓ।`,
      tooManyPhotos: (max: number) => `ਵੱਧ ਤੋਂ ਵੱਧ ${max} ਫ਼ੋਟੋਆਂ ਲਾਓ।`,
      badPhoto: (name: string) =>
        `"${name}" ਵਰਤੀ ਨਹੀਂ ਜਾ ਸਕਦੀ। ਕਿਰਪਾ ਕਰਕੇ JPG ਜਾਂ PNG ਫ਼ੋਟੋ ਲਾਓ।`,
      bigPhoto: (name: string) =>
        `"${name}" ਬਹੁਤ ਵੱਡੀ ਹੈ। 8 MB ਤੋਂ ਛੋਟੀ ਫ਼ੋਟੋ ਲਾਓ।`,
      photoSaveFailed: "ਫ਼ੋਟੋਆਂ ਸੇਵ ਨਹੀਂ ਹੋ ਸਕੀਆਂ। ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
      generic: "ਕੁਝ ਗ਼ਲਤ ਹੋ ਗਿਆ। ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
    },
  },

  status: {
    title: "ਆਪਣਾ ਆਰਡਰ ਦੇਖੋ",
    lede: "ਆਪਣਾ ਆਰਡਰ ਨੰਬਰ ਅਤੇ ਈਮੇਲ ਲਿਖੋ।",
    orderNumber: "ਆਰਡਰ ਨੰਬਰ",
    email: "ਈਮੇਲ",
    check: "ਦੇਖੋ",
    checking: "ਦੇਖ ਰਹੇ ਹਾਂ…",
    ordered: "ਆਰਡਰ ਦੀ ਤਰੀਕ",
    updated: "ਆਖ਼ਰੀ ਬਦਲਾਅ",
    neededBy: "ਕਦੋਂ ਤੱਕ ਚਾਹੀਦਾ",
    price: "ਕੀਮਤ",
    message: "ਪੰਮੀ ਭੈਣ ਜੀ ਵੱਲੋਂ ਸੁਨੇਹਾ",
    questions: "ਕੋਈ ਸਵਾਲ? ਆਪਣੇ ਆਰਡਰ ਨੰਬਰ ਨਾਲ ਸੰਪਰਕ ਕਰੋ।",
    contact: "ਸੰਪਰਕ ਕਰੋ",
    missing: "ਕਿਰਪਾ ਕਰਕੇ ਆਰਡਰ ਨੰਬਰ ਅਤੇ ਈਮੇਲ ਦੋਵੇਂ ਲਿਖੋ।",
    notFound: "ਇਹ ਆਰਡਰ ਨਹੀਂ ਮਿਲਿਆ। ਨੰਬਰ ਅਤੇ ਈਮੇਲ ਦੁਬਾਰਾ ਦੇਖੋ।",
    stages: {
      new: "ਮਿਲ ਗਿਆ",
      quoted: "ਕੀਮਤ ਭੇਜੀ",
      confirmed: "ਪੱਕਾ",
      stitching: "ਸਿਲਾਈ",
      ready: "ਤਿਆਰ",
      collected: "ਲੈ ਗਏ",
    },
  },
};

const dictionaries: Record<Lang, Dictionary> = { en, pa };

export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang];
}
