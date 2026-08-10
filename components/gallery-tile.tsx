import type { GalleryItem } from "@/lib/content";
import styles from "./gallery-tile.module.css";

/**
 * A plain <img> rather than next/image: the placeholders are SVGs, which the
 * image optimiser refuses to process without `dangerouslyAllowSVG`. Once real
 * photos replace them, this is a good candidate for switching over.
 */
export function GalleryTile({ item }: { item: GalleryItem }) {
  return (
    <figure className={styles.tile}>
      <div className={styles.frame}>
        <img
          className={styles.image}
          src={item.src}
          alt={item.alt}
          loading="lazy"
        />
      </div>
      <figcaption className={styles.caption}>{item.caption}</figcaption>
    </figure>
  );
}
