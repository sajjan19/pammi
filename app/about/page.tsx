import type { Metadata } from "next";
import Link from "next/link";
import { business, isPlaceholder, steps } from "@/lib/content";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "About",
  description: `About ${business.name} — custom Indian suit tailoring.`,
};

export default function AboutPage() {
  const named = !isPlaceholder(business.tailor);

  return (
    <>
      <PageHeader
        eyebrow="About"
        title={named ? `Meet ${business.tailor}` : "About the workshop"}
        lede={business.story}
      />

      <section className="section">
        <div className="container-narrow">
          <h2>Why measurements beat sizes</h2>
          <p className="lede">
            A ready-made suit is cut for an average nobody actually is. It
            pulls across the shoulders, or the sleeve lands in the wrong place,
            or the kameez is an inch too short and you never quite reach for
            it.
          </p>
          <p>
            Everything here starts from measurements she takes herself, in
            person — or from a suit you already love the fit of, copied seam
            for seam. She won&rsquo;t cut from numbers someone guessed at home,
            and the difference shows up the first time you put it on.
          </p>

          <hr className="rule" />

          <h2>What working together looks like</h2>
          <ol className="stack" style={{ paddingLeft: "1.2em" }}>
            {steps.map((step) => (
              <li key={step.title}>
                <strong>{step.title}.</strong> {step.body}
              </li>
            ))}
          </ol>

          <hr className="rule" />

          <h2>Bring your own fabric</h2>
          <p>
            Most customers bring fabric they&rsquo;ve chosen themselves —
            picked up on a trip, sent by family, or bought locally. Bring a
            little more than you think you need: heavy embroidery and prints
            that have to line up both eat into the yardage. If you&rsquo;d
            rather she sourced it for you, say so on the order form and
            she&rsquo;ll suggest options.
          </p>

          <p style={{ marginTop: "var(--sp-7)" }}>
            <Link href="/order" className="btn">
              Start an order
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
