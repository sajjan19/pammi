import Link from "next/link";
import {
  business,
  garments,
  isPlaceholder,
  instagramUrl,
  whatsappUrl,
} from "@/lib/content";
import { Logo } from "@/components/logo";
import styles from "./site-footer.module.css";

export function SiteFooter() {
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
            <p className={styles.heading}>Stitching</p>
            <ul className={styles.list}>
              {garments.slice(0, 5).map((garment) => (
                <li key={garment.slug}>
                  <Link href={`/services#${garment.slug}`}>{garment.name}</Link>
                </li>
              ))}
              <li>
                <Link href="/services">Everything else</Link>
              </li>
            </ul>
          </div>

          <div>
            <p className={styles.heading}>Get in touch</p>
            <ul className={styles.list}>
              <li>
                <Link href="/order">Start an order</Link>
              </li>
              <li>
                <Link href="/status">Check your order</Link>
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
                    WhatsApp
                  </a>
                </li>
              )}
              {instagram && (
                <li>
                  <a href={instagram} target="_blank" rel="noreferrer">
                    Instagram
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
          <Link href="/admin">Orders</Link>
        </div>
      </div>
    </footer>
  );
}
