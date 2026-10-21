"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./sticky-order.module.css";

/**
 * A "Start an order" button pinned to the bottom of the screen. It stays
 * out of the way until the visitor starts scrolling, then slides up.
 *
 * Not shown on the order page itself, or in the admin area.
 */
export function StickyOrder({ label }: { label: string }) {
  const pathname = usePathname();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const update = () => setShown(window.scrollY > 40);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  if (pathname.startsWith("/order") || pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <div
      className={`${styles.bar} ${shown ? styles.shown : ""}`}
      // Hidden from keyboards and screen readers until it's on screen.
      inert={!shown}
    >
      <Link href="/order" className={`btn ${styles.button}`}>
        {label}
      </Link>
    </div>
  );
}
