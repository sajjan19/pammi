import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { OrderForm } from "./order-form";

export const metadata: Metadata = {
  title: "Start an order",
  description:
    "Tell her what you'd like made, add your measurements and a reference photo, and get a quote back.",
};

export default async function OrderPage({
  searchParams,
}: {
  searchParams: Promise<{ garment?: string }>;
}) {
  // Links from the services page arrive with ?garment=… so the right option
  // is already selected when the form opens.
  const { garment } = await searchParams;

  return (
    <>
      <PageHeader
        eyebrow="Custom order"
        title="Start an order"
        lede="About five minutes, and no measuring needed — Pammi does that in person. You'll get a price and a realistic date back, and nothing is cut until you've said yes."
      />

      <section className="section">
        <div className="container-narrow">
          <OrderForm initialGarment={garment} />
        </div>
      </section>
    </>
  );
}
