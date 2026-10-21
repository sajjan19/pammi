"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getDictionary } from "@/lib/dictionary";
import { type Lang } from "@/lib/i18n";
import { getContent } from "@/lib/localize";
import { LanguageSwitch } from "@/components/language-switch";
import { Logo } from "@/components/logo";
import styles from "./site-header.module.css";

export function SiteHeader({ lang }: { lang: Lang }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const t = getDictionary(lang);
  const { business } = getContent(lang);

  const links = [
    { href: "/services", label: t.nav.services },
    { href: "/gallery", label: t.nav.gallery },
    { href: "/measuring", label: t.nav.measuring },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];

  // Tapping any link closes the mobile menu — otherwise it stays open over
  // the page the customer just navigated to. Done on the click rather than in
  // an effect watching the pathname, which would be a second render pass.
  const close = () => setOpen(false);

  // The open menu fills the screen, so Escape has to close it — otherwise a
  // keyboard user has no way back to the page short of tabbing to the button.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand} onClick={close}>
          <span className={styles.brandMark}>
            <Logo size={44} />
          </span>
          <span className={styles.brandText}>
            <span className={styles.brandName}>{business.name}</span>
            <span className={styles.brandTag}>{business.tagline}</span>
          </span>
        </Link>

        {/*
          The language switch sits outside the menu, so it's on screen on a
          phone too — someone who only reads Punjabi can't be expected to
          open an English menu to find it. It comes before the menu button,
          and the menu after both, so the menu's links follow the button that
          opens them in keyboard order.
        */}
        <div className={styles.actions}>
          <LanguageSwitch lang={lang} />

          <button
            type="button"
            className={`${styles.toggle} ${open ? styles.toggleOpen : ""}`}
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">
              {open ? t.nav.closeMenu : t.nav.openMenu}
            </span>
            <span className={styles.toggleBars} aria-hidden="true">
              <span />
            </span>
          </button>
        </div>

        <nav
          id="site-nav"
          className={`${styles.nav} ${open ? styles.navOpen : ""}`}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={close}
              className={`${styles.link} ${
                pathname.startsWith(link.href) ? styles.linkActive : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/order"
            onClick={close}
            className={`btn btn-sm ${styles.cta}`}
          >
            {t.nav.order}
          </Link>
        </nav>
      </div>
    </header>
  );
}
