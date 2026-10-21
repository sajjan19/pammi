import type { Metadata } from "next";
import Link from "next/link";
import { isPlaceholder } from "@/lib/content";
import { getDictionary } from "@/lib/dictionary";
import { getLang } from "@/lib/i18n-server";
import { getContent } from "@/lib/localize";
import { PageHeader } from "@/components/page-header";

export async function generateMetadata(): Promise<Metadata> {
  return { title: getDictionary(await getLang()).meta.about };
}

export default async function AboutPage() {
  const lang = await getLang();
  const t = getDictionary(lang);
  const { business, steps } = getContent(lang);

  return (
    <>
      <PageHeader
        title={
          isPlaceholder(business.tailor)
            ? t.about.titleDefault
            : t.about.titleNamed(business.tailor)
        }
        lede={business.story}
      />

      <section className="section">
        <div className="container-narrow">
          <h2 style={{ marginBottom: "var(--sp-5)" }}>{t.common.howItWorks}</h2>
          <ol className="stack" style={{ paddingLeft: "1.2em" }}>
            {steps.map((step) => (
              <li key={step.title}>
                <strong>{step.title}.</strong> {step.body}
              </li>
            ))}
          </ol>

          <p style={{ marginTop: "var(--sp-7)" }}>
            <Link href="/order" className="btn">
              {t.common.startOrder}
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
