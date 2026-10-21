import styles from "./seam.module.css";

/**
 * A row of gold stitches, edge to edge, laid right on the line where one
 * section of a page meets the next — like a seam.
 */
export function Seam() {
  return <div className={styles.seam} aria-hidden="true" />;
}
