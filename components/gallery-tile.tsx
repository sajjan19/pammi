import type { GalleryItem } from "@/lib/content";
import { Illustration } from "@/components/illustration";
import styles from "./gallery-tile.module.css";

export function GalleryTile({ item }: { item: GalleryItem }) {
  return (
    <figure className={styles.tile}>
      <div className={styles.frame}>
        <Illustration className={styles.image} src={item.src} alt={item.alt} />
      </div>
      <figcaption className={styles.caption}>{item.caption}</figcaption>
    </figure>
  );
}
