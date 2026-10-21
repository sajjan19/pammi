import styles from "./page-header.module.css";

export function PageHeader({
  eyebrow,
  title,
  lede,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
}) {
  return (
    <div className={styles.header}>
      <div className="container">
        <div className={styles.inner}>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className={styles.title}>{title}</h1>
          {lede && <p className={styles.lede}>{lede}</p>}
          <Stitch />
        </div>
      </div>
    </div>
  );
}

/**
 * A line of running stitches trailing into a needle. On load the needle
 * sews its way across, then keeps dipping gently, as if mid-stitch.
 */
function Stitch() {
  return (
    <svg
      className={styles.stitch}
      width="120"
      height="16"
      viewBox="0 0 120 16"
      aria-hidden="true"
      focusable="false"
    >
      <path
        className={styles.thread}
        d="M2 8H76"
        stroke="var(--gold)"
        strokeWidth="2"
        strokeDasharray="6 5"
        strokeLinecap="round"
      />
      <g className={styles.needle}>
        <path
          d="M80 6.6H108L116 8L108 9.4H80A1.4 1.4 0 0 1 80 6.6Z"
          fill="var(--slate)"
        />
        {/* The needle's eye, cut out in the header's own colour. */}
        <ellipse cx="85" cy="8" rx="2.6" ry="0.55" fill="var(--cream)" />
      </g>
    </svg>
  );
}
