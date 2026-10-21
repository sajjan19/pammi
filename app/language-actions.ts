"use server";

import { cookies } from "next/headers";
import { LANG_COOKIE, isLang } from "@/lib/i18n";

/**
 * Remembers the visitor's language.
 *
 * Setting a cookie from a Server Action makes Next re-render the current page
 * on the server, so the new language appears without a manual refresh — and
 * because it's a plain form post, the switch works even before JavaScript has
 * loaded.
 */
export async function setLanguage(formData: FormData): Promise<void> {
  const lang = formData.get("lang");
  if (!isLang(lang)) return;

  (await cookies()).set(LANG_COOKIE, lang, {
    path: "/",
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 365, // a year
  });
}
