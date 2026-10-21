import type { Metadata } from "next";
import Link from "next/link";
import { galleryIsIllustrated } from "@/lib/content";
import { getDictionary } from "@/lib/dictionary";
import { getLang } from "@/lib/i18n-server";
import { getContent } from "@/lib/localize";
import { GalleryTile } from "@/components/gallery-tile";
import { Icon } from "@/components/icon";
import { Illustration } from "@/components/illustration";
import styles from "./gallery.module.css";
import { PageHeader } from "@/components/page-header";

export async function generateMetadata(): Promise<Metadata> {
  return { title: getDictionary(await getLang()).meta.gallery };
}

export default async function GalleryPage() {
  const lang = await getLang();
  const t = getDictionary(lang);
  const { gallery, examples } = getContent(lang);

  return (
    <>
      <PageHeader
        title={t.gallery.title}
        lede={galleryIsIllustrated ? t.gallery.ledeDrawn : t.gallery.ledeReal}
      />

      <section className="section">
        <div className="container">
          {/* Drawings shouldn't pass for photos of finished commissions. */}
          {galleryIsIllustrated && (
            <p
              className="notice notice-warn"
              style={{ maxWidth: "60ch", marginBottom: "var(--sp-7)" }}
            >
              {t.gallery.drawingsNotice}
            </p>
          )}

          <div
            style={{
              display: "grid",
              gap: "var(--sp-5)",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            }}
          >
            {gallery.map((item) => (
              <GalleryTile key={item.src} item={item} />
            ))}
          </div>

          <h2 className={styles.examplesTitle}>{t.gallery.examplesTitle}</h2>
          <p className={styles.examplesLede}>{t.gallery.examplesLede}</p>

          <div className={styles.examples}>
            {examples.map((ex) => (
              <article key={ex.id} className={styles.example}>
                <Illustration src={ex.image} alt="" className={styles.exampleArt} />
                <div className={styles.exampleBody}>
                  <h3 className={styles.exampleName}>{ex.title}</h3>

                  <p className={styles.label}>
                    <Icon name="order" size={20} /> {t.gallery.asked}
                  </p>
                  <p className={styles.text}>{ex.asked}</p>

                  <p className={styles.label}>
                    <Icon name="needle" size={20} /> {t.gallery.steps}
                  </p>
                  <ol className={styles.steps}>
                    {ex.steps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>

                  <p className={styles.label}>
                    <Icon name="hanger" size={20} /> {t.gallery.result}
                  </p>
                  <p className={styles.result}>{ex.result}</p>
                </div>
              </article>
            ))}
          </div>

          <p style={{ marginTop: "var(--sp-8)", textAlign: "center" }}>
            <Link href="/order" className="btn">
              {t.common.startOrder}
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
