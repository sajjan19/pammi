"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { business } from "@/lib/content";
import { Logo } from "@/components/logo";
import styles from "./site-header.module.css";

const links = [
  { href: "/services", label: "What she makes" },
  { href: "/gallery", label: "Gallery" },
  { href: "/measuring", label: "Measuring & fit" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Tapping any link closes the mobile menu — otherwise it stays open over
  // the page the customer just navigated to. Done on the click rather than in
  // an effect watching the pathname, which would be a second render pass.
  const close = () => setOpen(false);

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

        <button
          type="button"
          className={`${styles.toggle} ${open ? styles.toggleOpen : ""}`}
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className={styles.toggleBars} aria-hidden="true">
            <span />
          </span>
        </button>

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
            Start an order
          </Link>
        </nav>
      </div>
    </header>
  );
}
