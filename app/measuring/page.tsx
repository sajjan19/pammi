import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary } from "@/lib/dictionary";
import { getLang } from "@/lib/i18n-server";
import { DressForm } from "@/components/dress-form";
import { Icon, type IconName } from "@/components/icon";
import { PageHeader } from "@/components/page-header";
import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
  return { title: getDictionary(await getLang()).meta.measuring };
}

/** One tool per point, in the order the points are written. */
const pointIcons: IconName[] = ["tape", "hanger", "order"];

/**
 * Short on purpose. The point of this page is one message — don't measure
 * yourself, she does it — and three plain points carry it better than a
 * guide to every measurement, which would only invite people to try.
 */
export default async function MeasuringPage() {
  const t = getDictionary(await getLang());

  return (
    <>
      <PageHeader title={t.measuring.title} lede={t.measuring.lede} />

      <section className="section">
        <div className="container">
          <div className={styles.layout}>
            <figure className={styles.figure}>
              <DressForm labels={t.measuring.figure} />
              <figcaption className={styles.caption}>
                {t.measuring.figure.caption}
              </figcaption>
            </figure>

            <div className={styles.points}>
              {t.measuring.points.map((point, i) => (
                <div key={point.title} className={styles.point}>
                  <span className={styles.icon} aria-hidden="true">
                    <Icon name={pointIcons[i]} size={28} />
                  </span>
                  <div>
                    <h2 className={styles.pointTitle}>{point.title}</h2>
                    <p>{point.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p style={{ marginTop: "var(--sp-8)" }}>
            <Link href="/order" className="btn">
              {t.common.startOrder}
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
