import type { Metadata } from "next";
import Link from "next/link";
import { measurementGroups } from "@/lib/measurements";
import { PageHeader } from "@/components/page-header";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Measuring & fit",
  description:
    "How measuring works: Pammi takes your measurements herself before anything is cut. No need to measure at home.",
};

const points = [
  {
    title: "She measures you, not you",
    body: "A tape held half an inch loose becomes a suit that doesn't sit right, and there's no undoing it once the fabric is cut. So she takes the measurements herself, in person, every time.",
  },
  {
    title: "It takes about five minutes",
    body: "Wear something close-fitting and it's done quickly, usually while you're dropping your fabric off. She'll ask how you like things to sit as she goes.",
  },
  {
    title: "Bring a suit you love the fit of",
    body: "If you have one, bring it. Copying a garment that already fits you is the most reliable starting point there is, and it settles a lot of questions at once.",
  },
  {
    title: "Once she has them, she keeps them",
    body: "Returning customers don't need measuring again unless something has changed. Just say so on the order form.",
  },
];

export default function MeasuringPage() {
  return (
    <>
      <PageHeader
        eyebrow="Measuring & fit"
        title="Leave the measuring to her"
        lede="You don't need a tape measure to place an order. Pammi measures every customer herself before anything is cut — it's the difference between a suit that fits and one that nearly does."
      />

      <section className="section">
        <div className="container">
          <div className={styles.intro}>
            {points.map((point) => (
              <div key={point.title} className={styles.tip}>
                <h3>{point.title}</h3>
                <p>{point.body}</p>
              </div>
            ))}
          </div>

          <div className={styles.roughIntro}>
            <p className="eyebrow">If you want to fill something in</p>
            <h2>Rough sizes on the order form</h2>
            <p className="lede">
              The order form has an optional block of sizes. They&rsquo;re
              there for one reason — so she can work out roughly how much
              fabric you&rsquo;ll need before you go shopping. A guess is
              genuinely fine, and leaving every one of them blank is fine too.
            </p>
            <hr className="thread" />
          </div>

          {measurementGroups.map((group) => (
            <div key={group.id} className={styles.group}>
              <div className={styles.groupHead}>
                <h2 className={styles.groupTitle}>{group.title}</h2>
                <span className={styles.groupDesc}>{group.description}</span>
              </div>

              <div className={styles.fields}>
                {group.fields.map((field) => (
                  <div key={field.id} className={styles.field}>
                    <p className={styles.fieldName}>{field.label}</p>
                    <p className={styles.fieldHint}>{field.hint}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <p style={{ textAlign: "center", marginTop: "var(--sp-8)" }}>
            <Link href="/order" className="btn">
              Start your order
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
