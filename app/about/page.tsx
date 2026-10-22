import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/lib/dictionary";
import { getLang } from "@/lib/i18n-server";
import { getContent } from "@/lib/localize";
import { Icon } from "@/components/icon";
import { PageHeader } from "@/components/page-header";
import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
  return { title: getDictionary(await getLang()).meta.about };
}

export default async function AboutPage() {
  const lang = await getLang();
  const t = getDictionary(lang);
  const { business, about } = getContent(lang);

  const story = about.story.map((paragraph) => (
    <p key={paragraph} className={styles.storyText}>
      {paragraph}
    </p>
  ));

  return (
    <>
      <PageHeader title={t.about.title} lede={t.about.lede(business.tailor)} />

      <section className="section">
        <div className="container-narrow">
          {/* With her photo, she sits beside her story. */}
          {about.photo ? (
            <div className={styles.intro}>
              <figure className={styles.photo}>
                <Image
                  src={about.photo}
                  alt={about.photoAlt}
                  width={1086}
                  height={1448}
                  sizes="(max-width: 760px) 90vw, 360px"
                  priority
                />
              </figure>
              <div className={styles.story}>{story}</div>
            </div>
          ) : (
            <div className={styles.story}>{story}</div>
          )}

          <h2 className={styles.factsTitle}>{t.about.factsTitle}</h2>
          <div className={styles.facts}>
            {about.facts.map((fact) => (
              <div key={fact.id} className={styles.fact}>
                <span className={styles.icon} aria-hidden="true">
                  <Icon name={fact.id} size={24} />
                </span>
                <div>
                  <h3 className={styles.factTitle}>{fact.title}</h3>
                  <p className={styles.factBody}>{fact.body}</p>
                </div>
              </div>
            ))}
          </div>

          <p className={styles.cta}>
            <Link href="/order" className="btn">
              {t.common.startOrder}
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
