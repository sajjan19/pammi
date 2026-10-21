import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionary";
import { getLang } from "@/lib/i18n-server";
import { PageHeader } from "@/components/page-header";
import { OrderForm } from "./order-form";

export async function generateMetadata(): Promise<Metadata> {
  return { title: getDictionary(await getLang()).meta.order };
}

export default async function OrderPage({
  searchParams,
}: {
  searchParams: Promise<{ garment?: string }>;
}) {
  const lang = await getLang();
  const t = getDictionary(lang);

  // Links from the services page arrive with ?garment=… so the right option
  // is already selected when the form opens.
  const { garment } = await searchParams;

  return (
    <>
      <PageHeader title={t.order.title} lede={t.order.lede} />

      <section className="section">
        <div className="container-narrow">
          {/* Deliberately not keyed on the language: switching mid-form
              re-labels it in place and keeps everything already typed. */}
          <OrderForm lang={lang} initialGarment={garment} />
        </div>
      </section>
    </>
  );
}
