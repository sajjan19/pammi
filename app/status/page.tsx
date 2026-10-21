import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionary";
import { getLang } from "@/lib/i18n-server";
import { PageHeader } from "@/components/page-header";
import { StatusForm } from "./status-form";

export async function generateMetadata(): Promise<Metadata> {
  return { title: getDictionary(await getLang()).meta.status };
}

export default async function StatusPage({
  searchParams,
}: {
  searchParams: Promise<{ reference?: string }>;
}) {
  const lang = await getLang();
  const t = getDictionary(lang).status;
  const { reference } = await searchParams;

  return (
    <>
      <PageHeader title={t.title} lede={t.lede} />

      <section className="section">
        <div className="container-narrow" style={{ maxWidth: "560px" }}>
          <StatusForm lang={lang} initialReference={reference} />
        </div>
      </section>
    </>
  );
}
