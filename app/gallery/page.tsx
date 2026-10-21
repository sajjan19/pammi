import type { Metadata } from "next";
import Link from "next/link";
import { galleryIsIllustrated } from "@/lib/content";
import { getDictionary } from "@/lib/dictionary";
import { getLang } from "@/lib/i18n-server";
import { getContent } from "@/lib/localize";
import { GalleryTile } from "@/components/gallery-tile";
import { PageHeader } from "@/components/page-header";

export async function generateMetadata(): Promise<Metadata> {
  return { title: getDictionary(await getLang()).meta.gallery };
}

export default async function GalleryPage() {
  const lang = await getLang();
  const t = getDictionary(lang);
  const { gallery } = getContent(lang);

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
