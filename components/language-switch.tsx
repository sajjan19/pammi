"use client";

import { useFormStatus } from "react-dom";
import { setLanguage } from "@/app/language-actions";
import { getDictionary } from "@/lib/dictionary";
import { langNames, type Lang } from "@/lib/i18n";
import styles from "./language-switch.module.css";

/**
 * One button that names the *other* language, in that language: an English
 * page shows "ਪੰਜਾਬੀ", a Punjabi page shows "English". That's the word the
 * person who needs the switch can actually read.
 *
 * A plain form post to a Server Action, so it works before JavaScript has
 * loaded — and on a slow phone, that matters.
 */
export function LanguageSwitch({ lang }: { lang: Lang }) {
  const target: Lang = lang === "en" ? "pa" : "en";

  return (
    <form action={setLanguage} className={styles.form}>
      <input type="hidden" name="lang" value={target} />
      <SwitchButton target={target} />
    </form>
  );
}

/** Split out because useFormStatus only reads the form it's inside. */
function SwitchButton({ target }: { target: Lang }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={styles.button}
      lang={target}
      aria-label={getDictionary(target).langSwitch.readIn}
      disabled={pending}
    >
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.6 2.6 3.9 5.6 3.9 9s-1.3 6.4-3.9 9c-2.6-2.6-3.9-5.6-3.9-9S9.4 5.6 12 3Z" />
      </svg>
      <span>{langNames[target]}</span>
    </button>
  );
}
