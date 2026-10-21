"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./steps-needle.module.css";

/**
 * A needle that sews its way through the "How it works" steps, stopping at
 * 1, then 2, 3 and 4, with gold thread trailing behind it.
 *
 * Sits inside the steps list. It finds each step's icon (marked with
 * `data-step-icon`) and measures where they are, so it follows the steps
 * across a row on a wide screen or down a column on a phone. It starts once
 * the steps scroll into view, and plays once.
 */
export function StepsNeedle() {
  const ref = useRef<HTMLSpanElement>(null);
  const [layout, setLayout] = useState<{
    vertical: boolean;
    stops: number[];
  } | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const track = ref.current;
    const list = track?.parentElement;
    if (!track || !list) return;

    const measure = () => {
      const box = list.getBoundingClientRect();
      const icons = Array.from(
        list.querySelectorAll<HTMLElement>("[data-step-icon]"),
      ).map((icon) => icon.getBoundingClientRect());
      if (icons.length < 2) return;

      // Side by side if the first two icons share a row.
      const vertical = Math.abs(icons[0].top - icons[1].top) > 4;
      setLayout({
        vertical,
        stops: icons.map((icon) =>
          vertical
            ? icon.top - box.top
            : icon.left + icon.width / 2 - box.left,
        ),
      });
    };

    measure();
    window.addEventListener("resize", measure);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlaying(true);
          // Lets the step icons light up in time with the needle.
          list.dataset.playing = "true";
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(list);

    return () => {
      window.removeEventListener("resize", measure);
      observer.disconnect();
    };
  }, []);

  const vars = Object.fromEntries(
    (layout?.stops ?? []).map((stop, i) => [`--p${i}`, `${stop}px`]),
  ) as React.CSSProperties;

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={[
        styles.track,
        layout?.vertical ? styles.vertical : styles.horizontal,
        layout && playing ? styles.playing : "",
        layout ? "" : styles.hidden,
      ].join(" ")}
      style={vars}
    >
      <span className={styles.thread} />
      <span className={styles.needle}>
        <svg width="54" height="12" viewBox="0 0 54 12">
          <path
            d="M54 6 46 3.6H4.5a2.4 2.4 0 0 0 0 4.8H46Z"
            fill="var(--slate)"
          />
          <ellipse cx="9" cy="6" rx="3.4" ry="1" fill="var(--white)" />
        </svg>
      </span>
    </span>
  );
}
