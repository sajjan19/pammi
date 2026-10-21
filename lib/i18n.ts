/**
 * The site's two languages.
 *
 * The choice lives in a cookie rather than the URL: a visitor taps the switch
 * in the header once and every page after that is in their language. This
 * file is safe to import anywhere — lib/i18n-server.ts does the cookie
 * reading, which only the server can do.
 */

export const LANGS = ["en", "pa"] as const;

export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = "en";

export const LANG_COOKIE = "lang";

export function isLang(value: unknown): value is Lang {
  return typeof value === "string" && (LANGS as readonly string[]).includes(value);
}

/** Each language's name written in that language — how the switch labels it. */
export const langNames: Record<Lang, string> = {
  en: "English",
  pa: "ਪੰਜਾਬੀ",
};

/**
 * Locale for formatting dates. English leaves it to the reader's own
 * settings, which is what the site did before Punjabi existed; Punjabi asks
 * for Gurmukhi month names explicitly.
 */
export const dateLocale: Record<Lang, string | undefined> = {
  en: undefined,
  pa: "pa-IN",
};

/**
 * Picks a language from an Accept-Language header, for first visits before
 * the cookie exists. Punjabi wins only if the browser ranks it above English
 * — plenty of Punjabi speakers' phones list it second, and their phone's
 * first choice is the better guess.
 */
export function langFromAcceptLanguage(header: string | null): Lang {
  if (!header) return DEFAULT_LANG;

  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().toLowerCase().split(";");
      const q = params
        .map((p) => p.trim())
        .find((p) => p.startsWith("q="));
      return { base: tag.split("-")[0], q: q ? Number(q.slice(2)) : 1 };
    })
    .filter((entry) => entry.base && Number.isFinite(entry.q))
    .sort((a, b) => b.q - a.q);

  for (const entry of ranked) {
    if (entry.base === "pa") return "pa";
    if (entry.base === "en") return "en";
  }
  return DEFAULT_LANG;
}
