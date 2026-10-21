import type { Metadata } from "next";
import Link from "next/link";
import { instagramUrl, isPlaceholder, whatsappUrl } from "@/lib/content";
import { getDictionary } from "@/lib/dictionary";
import { getLang } from "@/lib/i18n-server";
import { getContent } from "@/lib/localize";
import { PageHeader } from "@/components/page-header";
import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
  return { title: getDictionary(await getLang()).meta.contact };
}

export default async function ContactPage() {
  const lang = await getLang();
  const t = getDictionary(lang);
  const { business, faqs } = getContent(lang);
  const whatsapp = whatsappUrl();
  const instagram = instagramUrl();

  const methods: { label: string; value: React.ReactNode }[] = [];

  if (!isPlaceholder(business.email)) {
    methods.push({
      label: t.contact.email,
      value: <a href={`mailto:${business.email}`}>{business.email}</a>,
    });
  }
  if (business.phone) {
    methods.push({
      label: t.contact.phone,
      value: (
        <a href={`tel:${business.phone.replace(/\s/g, "")}`}>
          {business.phone}
        </a>
      ),
    });
  }
  if (whatsapp) {
    methods.push({
      label: t.contact.whatsapp,
      value: (
        <a href={whatsapp} target="_blank" rel="noreferrer">
          {t.contact.whatsappLink}
        </a>
      ),
    });
  }
  if (instagram) {
    methods.push({
      label: t.contact.instagram,
      value: (
        <a href={instagram} target="_blank" rel="noreferrer">
          @{business.instagram?.replace(/^@/, "")}
        </a>
      ),
    });
  }
  if (!isPlaceholder(business.city)) {
    methods.push({ label: t.contact.area, value: business.city });
  }
  if (business.showAddress && !isPlaceholder(business.address)) {
    methods.push({ label: t.contact.address, value: business.address });
  }
  methods.push({
    label: t.contact.languages,
    value: business.languages.join(", "),
  });

  return (
    <>
      <PageHeader title={t.contact.title} lede={t.contact.lede} />

      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            <div>
              <div className={styles.methods}>
                {methods.map((method) => (
                  <div key={method.label} className={styles.method}>
                    <span className={styles.methodLabel}>{method.label}</span>
                    <span className={styles.methodValue}>{method.value}</span>
                  </div>
                ))}
              </div>

              {!business.showAddress && (
                <p className="hint" style={{ marginTop: "var(--sp-4)" }}>
                  {business.addressNote}
                </p>
              )}

              <div className={styles.faq}>
                <h2>{t.contact.questions}</h2>
                <div style={{ marginTop: "var(--sp-5)" }}>
                  {faqs.map((faq) => (
                    <details key={faq.q} className={styles.faqItem}>
                      <summary>{faq.q}</summary>
                      <p className={styles.faqBody}>{faq.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            </div>

            <aside className={styles.aside}>
              <h3>{t.contact.readyTitle}</h3>
              <p>{t.contact.readyText}</p>
              <Link href="/order" className="btn btn-block">
                {t.common.startOrder}
              </Link>
              <p style={{ margin: "var(--sp-4) 0 0", textAlign: "center" }}>
                <Link href="/status" className="hint">
                  {t.contact.alreadyOrdered} →
                </Link>
              </p>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
