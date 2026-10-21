import Link from "next/link";
import { galleryIsIllustrated } from "@/lib/content";
import { getDictionary } from "@/lib/dictionary";
import { getLang } from "@/lib/i18n-server";
import { getContent } from "@/lib/localize";
import { GalleryTile } from "@/components/gallery-tile";
import { Seam } from "@/components/seam";
import { StepsNeedle } from "@/components/steps-needle";
import { Icon } from "@/components/icon";
import { Illustration } from "@/components/illustration";
import styles from "./page.module.css";

export default async function Home() {
  const lang = await getLang();
  const t = getDictionary(lang);
  const { business, garments, gallery, steps } = getContent(lang);

  const featured = garments.filter((g) => g.popular).slice(0, 3);

  return (
    <>
      <section className={styles.hero}>
        <div className={`container ${styles.heroGrid}`}>
          <div>
            <h1 className={styles.heroTitle}>
              {t.home.heroLine1}
              <br />
              {t.home.heroLine2}
            </h1>
            <p className={styles.heroLede}>{business.intro}</p>

            <div className={styles.heroActions}>
              <Link href="/order" className="btn">
                {t.common.startOrder}
              </Link>
              <Link href="/gallery" className="btn btn-outline">
                {t.home.seeWork}
              </Link>
            </div>
          </div>

          {/* Decorative: the same three suits are named in text below, so
              screen readers skip this rather than hear them twice. */}
          <div className={styles.collage} aria-hidden="true">
            {featured.map((garment, i) => (
              <div
                key={garment.slug}
                className={`${styles.frame} ${styles[`frame${i}`]}`}
              >
                <Illustration src={garment.image} alt="" eager />
              </div>
            ))}
            {/* A few tools left lying about the workroom. */}
            <Icon
              name="scissors"
              size={46}
              className={`${styles.tool} ${styles.toolScissors}`}
            />
            <Icon
              name="spool"
              size={42}
              className={`${styles.tool} ${styles.toolSpool}`}
            />
            <Icon
              name="button"
              size={34}
              className={`${styles.tool} ${styles.toolButton}`}
            />
          </div>
        </div>
      </section>

      <Seam />

      <section className="section">
        <div className="container">
          <h2 className={styles.sectionTitle}>{t.home.makesTitle}</h2>

          <div className={styles.garmentGrid}>
            {featured.map((garment) => (
              <Link
                key={garment.slug}
                href={`/services#${garment.slug}`}
                className={styles.garmentCard}
              >
                <div className={styles.garmentArt}>
                  <Illustration src={garment.image} alt="" />
                </div>
                <h3 className={styles.garmentName}>{garment.name}</h3>
                <span className={styles.garmentFoot}>
                  {t.common.aboutDays(garment.turnaroundDays)} →
                </span>
              </Link>
            ))}
          </div>

          <p className={styles.after}>
            <Link href="/services" className="btn btn-outline btn-sm">
              {t.home.seeAll}
            </Link>
          </p>
        </div>
      </section>

      <Seam />

      <section className="section section-tinted">
        <div className="container">
          <h2 className={`${styles.sectionTitle} ${styles.center}`}>
            {t.common.howItWorks}
          </h2>

          <ol className={styles.steps}>
            {steps.map((step, i) => (
              <li
                key={step.title}
                className={styles.step}
                style={{ "--i": i } as React.CSSProperties}
              >
                <span className={styles.stepIcon} aria-hidden="true" data-step-icon>
                  <Icon name={step.icon} size={30} />
                  <span className={styles.stepNumber}>{i + 1}</span>
                </span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepBody}>{step.body}</p>
              </li>
            ))}
            <StepsNeedle />
          </ol>
        </div>
      </section>

      <Seam />

      <section className="section">
        <div className="container">
          <h2 className={styles.sectionTitle}>
            {galleryIsIllustrated
              ? t.home.galleryTitleDrawn
              : t.home.galleryTitleReal}
          </h2>

          <div className={styles.strip}>
            {gallery.slice(0, 4).map((item) => (
              <GalleryTile key={item.src} item={item} />
            ))}
          </div>

          <p className={styles.after}>
            <Link href="/gallery" className="btn btn-outline btn-sm">
              {t.home.viewGallery}
            </Link>
          </p>
        </div>
      </section>

      <section className={styles.band}>
        <div className="container">
          <h2 className={styles.bandTitle}>{t.home.bandTitle}</h2>
          <p className={styles.bandLede}>{t.home.bandText}</p>
          <div className={styles.bandActions}>
            <Link href="/order" className="btn">
              {t.common.startOrder}
            </Link>
            <Link href="/measuring" className="btn btn-outline">
              {t.home.howMeasuring}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
