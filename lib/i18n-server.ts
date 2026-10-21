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
export async function getLang(): Promise<Lang> {
  const stored = (await cookies()).get(LANG_COOKIE)?.value;
  if (isLang(stored)) return stored;

  return langFromAcceptLanguage((await headers()).get("accept-language"));
}
