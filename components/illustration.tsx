/**
 * One of the drawings from /public/gallery.
 *
 * A plain <img> rather than next/image, deliberately. The artwork is SVG,
 * which the image optimiser refuses to touch unless `dangerouslyAllowSVG` is
 * switched on — and that flag opens an XSS hole for any SVG not authored
 * in-house. There'd be nothing to gain anyway: SVGs are a few kilobytes and
 * already scale perfectly to any size.
 *
 * Every illustration on the site goes through here so that reasoning lives
 * in one place. When real photos replace the drawings, switch this to
 * next/image and they'll all be optimised at once.
 */
export function Illustration({
  src,
  alt,
  className,
  eager = false,
}: {
  src: string;
  alt: string;
  className?: string;
  /** Load immediately rather than when scrolled near — for above the fold. */
  eager?: boolean;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- SVG; see above
    <img
      src={src}
      alt={alt}
      className={className}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
    />
  );
}
