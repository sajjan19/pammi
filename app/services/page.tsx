import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary } from "@/lib/dictionary";
import { getLang } from "@/lib/i18n-server";
import { getContent } from "@/lib/localize";
import { Icon } from "@/components/icon";
import { Illustration } from "@/components/illustration";
import { PageHeader } from "@/components/page-header";
import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return {
    title: getDictionary(lang).meta.services,
    description: getContent(lang).business.intro,
  };
}

export default async function ServicesPage() {
  const lang = await getLang();
  const t = getDictionary(lang);
  const { garments, policies } = getContent(lang);

  return (
    <>
      <PageHeader title={t.services.title} lede={t.services.lede} />

      <section className="section">
        <div className="container">
          <div className={styles.list}>
            {garments.map((garment) => (
              <article key={garment.slug} id={garment.slug} className={styles.item}>
                <div className={styles.art}>
                  <Illustration src={garment.image} alt="" />
                </div>

                <div className={styles.body}>
                  <ul className={styles.forWho}>
                    {garment.forWho.map((who) => (
                      <li key={who} className={styles.forBadge}>
                        <Icon name={who === "everyone" ? "hanger" : who} size={16} />
                        {t.services.forWho[who]}
                      </li>
                    ))}
                  </ul>
                  <h2 className={styles.name}>{garment.name}</h2>
                  {garment.otherNames && (
                    <p className={styles.alt}>
                      {t.services.alsoCalled(garment.otherNames)}
                    </p>
                  )}
                  <p className={styles.summary}>{garment.summary}</p>
                </div>

                <aside className={styles.aside}>
                  <div>
                    <p className={styles.priceLabel}>{t.services.price}</p>
                    <p className={styles.price}>
                      {garment.price === null
                        ? t.services.askForPrice
                        : t.services.priceFrom(garment.price)}
                    </p>
                  </div>
                  <p className={styles.turnaround}>
                    {t.common.aboutDays(garment.turnaroundDays)}
                  </p>
                  <Link
                    href={`/order?garment=${garment.slug}`}
                    className="btn btn-outline btn-sm"
                  >
                    {t.services.orderThis}
                  </Link>
                </aside>
              </article>
            ))}
          </div>
        </div>
      </section>

      {policies.length > 0 && (
        <section className="section section-tinted">
          <div className="container">
            <h2 className={styles.policiesTitle}>{t.services.goodToKnow}</h2>
            <div className={styles.policies}>
              {policies.map((policy) => (
                <div key={policy.title} className={styles.policy}>
                  <span className={styles.policyIcon} aria-hidden="true">
                    <Icon name={policy.icon} size={26} />
                  </span>
                  <h3>{policy.title}</h3>
                  <p>{policy.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
