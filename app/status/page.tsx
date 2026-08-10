import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { StatusForm } from "./status-form";

export const metadata: Metadata = {
  title: "Check your order",
  description: "Look up an order with your reference and email.",
};

export default async function StatusPage({
  searchParams,
}: {
  searchParams: Promise<{ reference?: string }>;
}) {
  const { reference } = await searchParams;

  return (
    <>
      <PageHeader
        eyebrow="Your order"
        title="Check your order"
        lede="Enter the reference you were given along with the email you ordered with."
      />

      <section className="section">
        <div className="container-narrow" style={{ maxWidth: "560px" }}>
          <StatusForm initialReference={reference} />
        </div>
      </section>
    </>
  );
}
