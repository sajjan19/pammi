import Link from "next/link";
import {
  business,
  gallery,
  galleryIsIllustrated,
  garments,
  getGarment,
  steps,
} from "@/lib/content";
import { GalleryTile } from "@/components/gallery-tile";
import styles from "./page.module.css";

export default function Home() {
  const featured = garments.filter((g) => g.popular).slice(0, 3);
  // The headline number is the everyday Punjabi suit, not the fastest job on
  // the list — quoting the 5-day alteration turnaround here would mislead.
  const suitDays = getGarment("salwar-kameez")?.turnaroundDays ?? 14;

  return (
    <>
      <section className={styles.hero}>
        <div className={`container ${styles.heroGrid}`}>
          <div>
            <p className="eyebrow">{business.tagline}</p>
            <h1 className={styles.heroTitle}>
              Suits that fit
              <br />
              the way they should
            </h1>
            <p className={styles.heroLede}>{business.intro}</p>

            <div className={styles.heroActions}>
              <Link href="/order" className="btn">
                Start an order
              </Link>
              <Link href="/gallery" className="btn btn-outline">
                See her work
              </Link>
            </div>

            <div className={styles.heroMeta}>
              <div className={styles.heroMetaItem}>
                <strong>{garments.length}</strong>
                kinds of job
              </div>
              <div className={styles.heroMetaItem}>
                <strong>{suitDays} days</strong>
                for a suit, typically
              </div>
              <div className={styles.heroMetaItem}>
                <strong>By hand</strong>
                every single one
              </div>
            </div>
          </div>

          <div className={styles.swatches} aria-hidden="true">
            <div className={`${styles.swatch} ${styles.swatchA}`} />
            <div className={`${styles.swatch} ${styles.swatchB}`} />
            <div className={`${styles.swatch} ${styles.swatchC}`} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.sectionHead}>
            <p className="eyebrow">What she makes</p>
            <h2>From everyday salwar kameez to bridal lehengas</h2>
            <p className="lede">
              Every garment is cut fresh for the person wearing it — no
              standard sizes, no guessing.
            </p>
            <hr className="thread" />
          </div>

          <div className={styles.garmentGrid}>
            {featured.map((garment) => (
              <Link
                key={garment.slug}
                href={`/services#${garment.slug}`}
                className={styles.garmentCard}
              >
                <h3 className={styles.garmentName}>{garment.name}</h3>
                {garment.otherNames && (
                  <p className={styles.garmentAlt}>{garment.otherNames}</p>
                )}
                <p className={styles.garmentSummary}>{garment.summary}</p>
                <span className={styles.garmentFoot}>
                  Usually {garment.turnaroundDays} days →
                </span>
              </Link>
            ))}
          </div>

          <p style={{ marginTop: "var(--sp-6)" }}>
            <Link href="/services" className="btn btn-outline btn-sm">
              See everything she stitches
            </Link>
          </p>
        </div>
      </section>

      <section className="section section-tinted">
        <div className="container">
          <div className={`${styles.sectionHead} ${styles.sectionHeadCenter}`}>
            <p className="eyebrow">How it works</p>
            <h2>Four steps, start to finish</h2>
            <hr className="thread thread-center" />
          </div>

          <div className={styles.steps}>
            {steps.map((step) => (
              <div key={step.title} className={styles.step}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepBody}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.sectionHead}>
            <p className="eyebrow">
              {galleryIsIllustrated ? "What she makes" : "Recent work"}
            </p>
            <h2>
              {galleryIsIllustrated
                ? "A few of the things she makes"
                : "A few pieces she’s finished"}
            </h2>
            <hr className="thread" />
          </div>

          <div className={styles.strip}>
            {gallery.slice(0, 4).map((item) => (
              <GalleryTile key={item.src} item={item} />
            ))}
          </div>

          <p style={{ marginTop: "var(--sp-6)" }}>
            <Link href="/gallery" className="btn btn-outline btn-sm">
              View the full gallery
            </Link>
          </p>
        </div>
      </section>

      <section className={styles.band}>
        <div className="container">
          <h2 className={styles.bandTitle}>No tape measure needed</h2>
          <p className={styles.bandLede}>
            Don&rsquo;t measure yourself — she does that in person before
            anything is cut. Ordering takes about five minutes, and you can
            bring a suit you already love the fit of to be copied.
          </p>
          <div className={styles.bandActions}>
            <Link href="/order" className={`btn ${styles.bandBtn}`}>
              Start an order
            </Link>
            <Link href="/measuring" className={`btn ${styles.bandBtnGhost}`}>
              How measuring works
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
