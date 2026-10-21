import { Icon } from "@/components/icon";
import styles from "./seam.module.css";

/**
 * A row of gold stitches with a needle in the middle, laid right on the
 * line where one section of a page meets the next — like a seam.
 */
export function Seam() {
  return (
    <div className={styles.seam} aria-hidden="true">
      <div className={`container ${styles.inner}`}>
        <span className={styles.line} />
        <span className={styles.badge}>
          <Icon name="needle" size={20} />
        </span>
        <span className={styles.line} />
      </div>
    </div>
  );
}
