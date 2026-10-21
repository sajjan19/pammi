/**
 * The site's small line drawings — mostly sewing tools.
 *
 * All drawn on the same 32×32 grid with the same rounded stroke, so any two
 * sit happily side by side. They take the colour of the text around them.
 *
 * Always decorative: each one sits next to words that already say what it
 * shows, so screen readers skip it.
 */

export type IconName =
  | "scissors"
  | "spool"
  | "needle"
  | "tape"
  | "machine"
  | "button"
  | "pins"
  | "hanger"
  | "tag"
  | "cash"
  | "order"
  | "chai"
  | "cooking"
  | "dramas"
  | "shopping"
  | "mail"
  | "phone"
  | "pin"
  | "languages"
  | "clock"
  | "camera"
  | "fabric"
  | "women"
  | "men"
  | "kids";

/** A filled dot — for pin heads, button holes and pivots. */
function Dot({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return <circle cx={cx} cy={cy} r={r} fill="currentColor" stroke="none" />;
}

const shapes: Record<IconName, React.ReactNode> = {
  scissors: (
    <>
      <circle cx="9.5" cy="23.5" r="4" />
      <circle cx="22.5" cy="23.5" r="4" />
      <path d="M12.3 20.6 23 4.5M19.7 20.6 9 4.5" />
      <Dot cx={16} cy={15} r={1.1} />
    </>
  ),

  // A reel of thread with a loose end.
  spool: (
    <>
      <rect x="8" y="5" width="16" height="3" rx="1.2" />
      <rect x="8" y="24" width="16" height="3" rx="1.2" />
      <path d="M10 8v16M22 8v16M10 12h12M10 16h12M10 20h12" />
      <path d="M22 18c3.5.5 4.5 4 2.5 7.5" />
    </>
  ),

  // A needle, threaded.
  needle: (
    <>
      <path d="M5.5 26.5 21 11" />
      <ellipse cx="23.2" cy="8.8" rx="1.4" ry="3.2" transform="rotate(45 23.2 8.8)" />
      <path d="M23.2 8.8c3-1 5 1 3.5 4s-5 3-5.5 7.5" />
    </>
  ),

  // A tailor's measuring tape, part unrolled.
  tape: (
    <>
      <circle cx="13" cy="14" r="9" />
      <circle cx="13" cy="14" r="3" />
      <path d="M13 23h16v-5h-8M24 18v2.2M27 18v2.2" />
    </>
  ),

  machine: (
    <>
      <rect x="3" y="24" width="26" height="3.5" rx="1" />
      <path d="M23 24V10a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v5h4.5v-3H19v12" />
      <path d="M8 15v4.5M15 7V4.5M13 4.5h4" />
      <circle cx="25.5" cy="13" r="2.4" />
    </>
  ),

  button: (
    <>
      <circle cx="16" cy="16" r="10.5" />
      <circle cx="16" cy="16" r="7" />
      <Dot cx={13.6} cy={13.6} r={1.3} />
      <Dot cx={18.4} cy={13.6} r={1.3} />
      <Dot cx={13.6} cy={18.4} r={1.3} />
      <Dot cx={18.4} cy={18.4} r={1.3} />
    </>
  ),

  // A pincushion with three pins in it.
  pins: (
    <>
      <path d="M5.5 22a10.5 7 0 0 1 21 0" />
      <path d="M5 22h22v3a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3Z" />
      <path d="M12 16.5 9 9M16 15V6.5M20 16.5 23 9" />
      <Dot cx={9} cy={9} r={1.8} />
      <Dot cx={16} cy={6.5} r={1.8} />
      <Dot cx={23} cy={9} r={1.8} />
    </>
  ),

  hanger: (
    <path d="M13.5 7a2.5 2.5 0 1 1 2.5 2.5V11L4.6 20.2a1.4 1.4 0 0 0 .8 2.5h21.2a1.4 1.4 0 0 0 .8-2.5L16 11" />
  ),

  tag: (
    <>
      <path d="M16.5 4H26a2 2 0 0 1 2 2v9.5L15.4 28.1a1.8 1.8 0 0 1-2.5 0L3.9 19.1a1.8 1.8 0 0 1 0-2.5Z" />
      <circle cx="22.5" cy="9.5" r="1.8" />
    </>
  ),

  // A banknote, for "cash or e-transfer".
  cash: (
    <>
      <rect x="3" y="8.5" width="26" height="15" rx="2" />
      <circle cx="16" cy="16" r="3.5" />
      <Dot cx={7.5} cy={12.5} r={1.2} />
      <Dot cx={24.5} cy={19.5} r={1.2} />
    </>
  ),

  // A clipboard with a written order on it.
  order: (
    <>
      <rect x="7" y="5.5" width="18" height="22.5" rx="2" />
      <path d="M12 7.5v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v3" />
      <path d="M11.5 13h9M11.5 17.5h9M11.5 22h5.5" />
    </>
  ),

  // A steaming cup on its saucer.
  chai: (
    <>
      <path d="M7 14h16v6a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6v-6Z" />
      <path d="M23 16h1.5a3 3 0 0 1 0 6H23M5 28.5h20" />
      <path d="M11 4.5c-1.2 1.4 1.2 2.6 0 4M15 4c-1.2 1.4 1.2 2.6 0 4M19 4.5c-1.2 1.4 1.2 2.6 0 4" />
    </>
  ),

  // A pot on the go, lid on, steam escaping.
  cooking: (
    <>
      <path d="M6.5 15h19v6a6 6 0 0 1-6 6h-7a6 6 0 0 1-6-6v-6Z" />
      <path d="M3.5 15h25M13.5 12h5M16 12v-2" />
      <path d="M11 6c-.8 1 .8 1.8 0 2.8M21 6c-.8 1 .8 1.8 0 2.8" />
    </>
  ),

  // A shopping bag.
  shopping: (
    <>
      <path d="M7 11h18l-1.5 16.5a1.6 1.6 0 0 1-1.6 1.5H10.1a1.6 1.6 0 0 1-1.6-1.5Z" />
      <path d="M12 14v-4a4 4 0 0 1 8 0v4" />
    </>
  ),

  // An envelope.
  mail: (
    <>
      <rect x="4" y="7.5" width="24" height="17" rx="2.5" />
      <path d="m5 9 11 8.5L27 9" />
    </>
  ),

  // A phone handset.
  phone: (
    <path d="M11.5 4.5H8a2.5 2.5 0 0 0-2.5 2.7C6.6 18.3 13.7 25.4 24.8 26.5a2.5 2.5 0 0 0 2.7-2.5v-3.5l-5.5-2.5-2.8 2.8a14 14 0 0 1-7-7l2.8-2.8Z" />
  ),

  // A map pin.
  pin: (
    <>
      <path d="M16 28.5s9-8.4 9-15.5a9 9 0 0 0-18 0c0 7.1 9 15.5 9 15.5Z" />
      <circle cx="16" cy="13" r="3.2" />
    </>
  ),

  // Two speech bubbles — for the languages she speaks.
  languages: (
    <>
      <path d="M4 7.5a2.5 2.5 0 0 1 2.5-2.5h11A2.5 2.5 0 0 1 20 7.5v6a2.5 2.5 0 0 1-2.5 2.5H10l-4 3.5V16a2.5 2.5 0 0 1-2-2.5Z" />
      <path d="M23 12h2.5A2.5 2.5 0 0 1 28 14.5v6a2.5 2.5 0 0 1-2 2.5v3.5L22 23h-7.5A2.5 2.5 0 0 1 12 20.5V19" />
    </>
  ),

  clock: (
    <>
      <circle cx="16" cy="16" r="11.5" />
      <path d="M16 9v7l4.5 3" />
    </>
  ),

  camera: (
    <>
      <path d="M4 11.5A2.5 2.5 0 0 1 6.5 9h3.5l2-3h8l2 3h3.5a2.5 2.5 0 0 1 2.5 2.5v12A2.5 2.5 0 0 1 25.5 26h-19A2.5 2.5 0 0 1 4 23.5Z" />
      <circle cx="16" cy="17" r="4.5" />
    </>
  ),

  // A bolt of cloth, partly unrolled.
  fabric: (
    <>
      <ellipse cx="9" cy="10" rx="4" ry="5.5" />
      <path d="M9 4.5h15a4 5.5 0 0 1 0 11H9" />
      <path d="M13 15.5v12l4-2.5 4 2.5v-12" />
    </>
  ),

  // A flared kameez — for women's suits.
  women: (
    <path d="M12.5 4h7l1.5 3.5 4.5 2-2 5-2.5-1V17l4 11H7l4-11v-3.5l-2.5 1-2-5 4.5-2Z" />
  ),

  // A straight kurta with a band collar — for men's.
  men: (
    <>
      <path d="M12 4h8l5 3 2.5 7.5-3 1L23 13v15H9V13l-1.5 2.5-3-1L7 7Z" />
      <path d="M16 4.5v8" />
    </>
  ),

  // A little kurta — for kids.
  kids: (
    <>
      <path d="M13 9h6l3.5 2.5 2 5-2.5 1-1.5-2V26h-9V15.5l-1.5 2-2.5-1 2-5Z" />
      <circle cx="16" cy="5.5" r="2.2" />
    </>
  ),

  // A television — for the Punjabi dramas.
  dramas: (
    <>
      <rect x="4" y="8" width="24" height="16" rx="2.5" />
      <path d="M12 28h8M16 24v4M11 3l5 5 5-5" />
    </>
  ),
};

export function Icon({
  name,
  size = 28,
  className,
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {shapes[name]}
    </svg>
  );
}
