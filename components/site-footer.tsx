import Link from "next/link";
import { instagramUrl, isPlaceholder, whatsappUrl } from "@/lib/content";
import { getDictionary } from "@/lib/dictionary";
import type { Lang } from "@/lib/i18n";
import { getContent } from "@/lib/localize";
import { Logo } from "@/components/logo";
import styles from "./site-footer.module.css";

export function SiteFooter({ lang }: { lang: Lang }) {
  const t = getDictionary(lang);
  const { business, garments } = getContent(lang);
  const whatsapp = whatsappUrl();
  const instagram = instagramUrl();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div>
            <Link href="/" className={styles.brand}>
              <Logo size={40} />
              <span className={styles.brandName}>{business.name}</span>
            </Link>
            <p className={styles.blurb}>{business.intro}</p>
          </div>

          <div>
            <p className={styles.heading}>{t.footer.stitching}</p>
            <ul className={styles.list}>
              {garments.slice(0, 5).map((garment) => (
                <li key={garment.slug}>
                  <Link href={`/services#${garment.slug}`}>{garment.name}</Link>
                </li>
              ))}
              <li>
                <Link href="/services">{t.footer.seeAll}</Link>
              </li>
            </ul>
          </div>

          <div>
            <p className={styles.heading}>{t.footer.getInTouch}</p>
            <ul className={styles.list}>
              <li>
                <Link href="/order">{t.footer.startOrder}</Link>
              </li>
              <li>
                <Link href="/status">{t.footer.checkOrder}</Link>
              </li>
              {!isPlaceholder(business.email) && (
                <li>
                  <a href={`mailto:${business.email}`}>{business.email}</a>
                </li>
              )}
              {business.phone && (
                <li>
                  <a href={`tel:${business.phone.replace(/\s/g, "")}`}>
                    {business.phone}
                  </a>
                </li>
              )}
              {whatsapp && (
                <li>
                  <a href={whatsapp} target="_blank" rel="noreferrer">
                    {t.contact.whatsapp}
                  </a>
                </li>
              )}
              {instagram && (
                <li>
                  <a href={instagram} target="_blank" rel="noreferrer">
                    {t.contact.instagram}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>
            © {new Date().getFullYear()} {business.name}
            {!isPlaceholder(business.city) && ` · ${business.city}`}
          </span>
          <Link href="/admin">{t.footer.admin}</Link>
        </div>
      </div>
    </footer>
  );
}
