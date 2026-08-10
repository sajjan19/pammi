import type { Metadata } from "next";
import Link from "next/link";
import { garments, policies } from "@/lib/content";
import { PageHeader } from "@/components/page-header";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "What she makes",
  description:
    "Salwar kameez, Patiala suits, Anarkalis, shararas, lehengas, saree blouses and alterations — all stitched to measure.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Stitching"
        title="What she makes"
        lede="Everything below is cut to your own measurements. Most customers supply their own fabric — bring it along once your order is confirmed."
      />

      <section className="section">
        <div className="container">
          <div className={styles.list}>
            {garments.map((garment) => (
              <article key={garment.slug} id={garment.slug} className={styles.item}>
                <div>
                  <div className={styles.head}>
                    <h2 className={styles.name}>{garment.name}</h2>
                    {garment.otherNames && (
                      <span className={styles.alt}>
                        also called a {garment.otherNames}
                      </span>
                    )}
                  </div>

                  <p className={styles.summary}>{garment.summary}</p>

                  <ul className={styles.includes}>
                    {garment.includes.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>

                <aside className={styles.aside}>
                  <div>
                    <p className={styles.priceLabel}>Stitching from</p>
                    <p className={styles.price}>
                      {garment.price === null ? "On request" : `$${garment.price}`}
                    </p>
                    <p className={styles.priceNote}>
                      {garment.price === null
                        ? "Quoted once she's seen the design and fabric."
                        : "Stitching only — you supply the fabric."}
                    </p>
                  </div>

                  <p className={styles.turnaround}>
                    Usually ready in about{" "}
                    <strong>{garment.turnaroundDays} days</strong>.
                  </p>

                  <Link
                    href={`/order?garment=${garment.slug}`}
                    className="btn btn-outline btn-sm"
                  >
                    Order this
                  </Link>
                </aside>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tinted">
        <div className="container">
          <div style={{ maxWidth: "58ch", marginBottom: "var(--sp-7)" }}>
            <p className="eyebrow">Good to know</p>
            <h2>How orders work</h2>
            <hr className="thread" />
          </div>

          <div className={styles.policies}>
            {policies.map((policy) => (
              <div key={policy.title} className={styles.policy}>
                <h3>{policy.title}</h3>
                <p>{policy.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
