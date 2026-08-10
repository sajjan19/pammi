import type { Metadata } from "next";
import Link from "next/link";
import {
  business,
  faqs,
  instagramUrl,
  isPlaceholder,
  whatsappUrl,
} from "@/lib/content";
import { PageHeader } from "@/components/page-header";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${business.name}.`,
};

export default function ContactPage() {
  const whatsapp = whatsappUrl();
  const instagram = instagramUrl();

  const methods: { label: string; value: React.ReactNode }[] = [];

  if (!isPlaceholder(business.email)) {
    methods.push({
      label: "Email",
      value: <a href={`mailto:${business.email}`}>{business.email}</a>,
    });
  }
  if (business.phone) {
    methods.push({
      label: "Phone",
      value: (
        <a href={`tel:${business.phone.replace(/\s/g, "")}`}>
          {business.phone}
        </a>
      ),
    });
  }
  if (whatsapp) {
    methods.push({
      label: "WhatsApp",
      value: (
        <a href={whatsapp} target="_blank" rel="noreferrer">
          Message on WhatsApp
        </a>
      ),
    });
  }
  if (instagram) {
    methods.push({
      label: "Instagram",
      value: (
        <a href={instagram} target="_blank" rel="noreferrer">
          @{business.instagram?.replace(/^@/, "")}
        </a>
      ),
    });
  }
  if (!isPlaceholder(business.city)) {
    methods.push({ label: "Area", value: business.city });
  }
  if (business.showAddress && !isPlaceholder(business.address)) {
    methods.push({ label: "Address", value: business.address });
  }
  methods.push({ label: "Languages", value: business.languages.join(", ") });

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        lede="The order form is the quickest way to get a quote — it asks for everything she needs in one go. For anything else, reach her directly."
      />

      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            <div>
              <div className={styles.methods}>
                {methods.map((method, i) => (
                  <div key={i} className={styles.method}>
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
                <h2>Common questions</h2>
                <hr className="thread" />
                <div style={{ marginTop: "var(--sp-6)" }}>
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
              <h3>Ready to order?</h3>
              <p>
                Tell her what you&rsquo;d like made, add your measurements and
                a photo of the design, and she&rsquo;ll come back with a price
                and a date.
              </p>
              <Link href="/order" className="btn btn-block">
                Start an order
              </Link>
              <p style={{ margin: "var(--sp-4) 0 0", textAlign: "center" }}>
                <Link href="/status" className="hint">
                  Already ordered? Check your order →
                </Link>
              </p>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
