import type { Metadata } from "next";
import Link from "next/link";
import { gallery, galleryIsIllustrated } from "@/lib/content";
import { GalleryTile } from "@/components/gallery-tile";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Gallery",
  description: "The Punjabi suits, turbans and patkas she makes.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow={galleryIsIllustrated ? "What she makes" : "Her work"}
        title="Gallery"
        lede={
          galleryIsIllustrated
            ? "The kinds of thing she makes. Seen something here you'd like in your own fabric? Mention it when you order."
            : "Pieces she's finished for customers. Seen something here you'd like made in your own fabric? Mention it when you order."
        }
      />

      <section className="section">
        <div className="container">
          {galleryIsIllustrated && (
            <p
              className="notice notice-warn"
              style={{ maxWidth: "60ch", marginBottom: "var(--sp-7)" }}
            >
              These are drawings, not photographs — real photos of her finished
              work will replace them.
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
              Start an order
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
