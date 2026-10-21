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
        </div>
      </div>
    </div>
  );
}
