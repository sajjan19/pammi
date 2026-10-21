/**
 * A tailor's dress form with a gold tape round the chest, waist and hips,
 * and a line down the side for length — what Pammi measures at a fitting.
 *
 * It shows what *she* measures; it's not a guide for doing it yourself.
 */
export function DressForm({
  labels,
}: {
  labels: { chest: string; waist: string; hips: string; length: string };
}) {
  const label = {
    fontFamily: "var(--font-body)",
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: "0.08em",
    fill: "var(--wine)",
  } as const;

  return (
    <svg
      viewBox="0 0 340 340"
      width="100%"
      style={{ maxWidth: 340, display: "block", margin: "0 auto" }}
      role="img"
      aria-label={`${labels.chest}, ${labels.waist}, ${labels.hips}, ${labels.length}`}
    >
      {/* Stand */}
      <path d="M168 252v56" stroke="var(--slate)" strokeWidth="5" strokeLinecap="round" />
      <path
        d="M168 306 132 326M168 306l36 20M168 306v22"
        stroke="var(--slate)"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Neck and knob */}
      <circle cx="168" cy="34" r="8" fill="var(--slate)" />
      <rect x="157" y="42" width="22" height="24" rx="4" fill="var(--wine)" />

      {/* Body */}
      <path
        d="M120 72c14-8 34-10 48-10s34 2 48 10c10 6 14 22 12 40-2 20-14 34-18 58-4 22 12 34 14 58 1 14-4 24-10 26H122c-6-2-11-12-10-26 2-24 18-36 14-58-4-24-16-38-18-58-2-18 2-34 12-40Z"
        fill="var(--wine)"
      />
      {/* A seam down the middle */}
      <path d="M168 66v186" stroke="rgba(253,248,240,0.35)" strokeWidth="1.5" strokeDasharray="4 4" />

      {/* Tape round the chest, waist and hips */}
      <g fill="none" stroke="var(--gold-bright)" strokeWidth="3" strokeDasharray="6 4">
        <ellipse cx="168" cy="108" rx="62" ry="8" />
        <ellipse cx="168" cy="168" rx="44" ry="6" />
        <ellipse cx="168" cy="224" rx="58" ry="8" />
      </g>

      {/* Leader lines and labels */}
      <g stroke="var(--gold)" strokeWidth="1.5">
        <path d="M106 108H70" />
        <path d="M124 168H70" />
        <path d="M110 224H70" />
      </g>
      <text x="64" y="112" textAnchor="end" style={label}>{labels.chest}</text>
      <text x="64" y="172" textAnchor="end" style={label}>{labels.waist}</text>
      <text x="64" y="228" textAnchor="end" style={label}>{labels.hips}</text>

      {/* Length, down the right-hand side */}
      <g stroke="var(--gold)" strokeWidth="1.5" fill="none">
        <path d="M252 72v178" strokeDasharray="5 4" />
        <path d="M245 72h14M245 250h14" />
      </g>
      <text x="264" y="166" style={label}>{labels.length}</text>
    </svg>
  );
}
