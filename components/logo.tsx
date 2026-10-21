/**
 * The brand mark: "PP" in a pink disc, underlined with a row of gold
 * stitches, the needle still threaded at the end of the line.
 *
 * Drawn inline rather than loaded as an image so "PP" can use the site's own
 * serif. The browser-tab version is app/icon.svg — keep the two in step.
 */
export function Logo({ size = 26 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="50" cy="50" r="46" fill="#c51a68" />
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke="#f5c842"
        strokeWidth="1.4"
        strokeDasharray="3.5 3"
      />
      <text
        x="50"
        y="57"
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontSize="38"
        fontWeight="600"
        fill="#fdf8f0"
      >
        PP
      </text>
      <path
        d="M19 69H41"
        stroke="#f5c842"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeDasharray="5 3.5"
      />
      <path
        d="M41 69c3 0 5-1 7-2.4c1.6-1.1 1.6 2.6-.4 2.4"
        fill="none"
        stroke="#f5c842"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path d="M86 69 79 67.4H49.5a1.6 1.6 0 0 0 0 3.2H79Z" fill="#fdf8f0" />
      <ellipse cx="52.2" cy="69" rx="2.3" ry=".7" fill="#c51a68" />
    </svg>
  );
}
