import "server-only";

import { cookies, headers } from "next/headers";
import { LANG_COOKIE, isLang, langFromAcceptLanguage, type Lang } from "@/lib/i18n";

/**
 * The visitor's language: whatever they last picked with the switch, or — on
 * a first visit — their browser's preference.
 *
 * Reading cookies makes every page render per request rather than once at
 * build time. That's fine here: the site already needs a running server for
 * its database, and the pages are small.
 */
const SWITCH_OFF = true;

export async function getLang(): Promise<Lang> {
  // The language switch is switched off for now, so the site is English
  // only. Delete this line (and put <LanguageSwitch> back in the header) to
  // bring Punjabi back.
  if (SWITCH_OFF) return "en";

  const stored = (await cookies()).get(LANG_COOKIE)?.value;
  if (isLang(stored)) return stored;

  return langFromAcceptLanguage((await headers()).get("accept-language"));
}
