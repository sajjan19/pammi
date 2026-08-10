import Image from "next/image";
import { business } from "@/lib/content";

/**
 * The brand mark.
 *
 * Renders the logo badge from /public once `business.logoSrc` is set, and
 * falls back to a drawn needle mark until then — so the header never shows a
 * broken image while the file is missing.
 *
 * The badge ships as a large square PNG, so it goes through next/image rather
 * than a plain <img>: at header size that's the difference between sending a
 * 1.5 MB original and a few kilobytes of resized WebP.
 */
export function Logo({ size = 26 }: { size?: number }) {
  if (business.logoSrc) {
    return (
      <Image
        src={business.logoSrc}
        alt=""
        width={size}
        height={size}
        priority
        // The badge is a JPEG, so it carries its own cream square with it.
        // Clipping to a circle trims the corners the artwork doesn't use,
        // which matters on the dark footer where that square would otherwise
        // sit there as a pale block.
        style={{ width: size, height: "auto", borderRadius: "50%" }}
      />
    );
  }

  return <NeedleMark size={size} />;
}

/** A needle drawing a thread through cloth. Inherits the current text colour. */
function NeedleMark({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M25.5 4.5 12 18"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="m25.5 4.5 2.2 2.2L14 20.2l-3.4 1.2 1.2-3.4L25.5 4.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="24.4" cy="7.8" r="1" fill="currentColor" />
      <path
        d="M11 21c-4.5 1.4-7 4-7 6.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="2.6 2.6"
      />
    </svg>
  );
}
