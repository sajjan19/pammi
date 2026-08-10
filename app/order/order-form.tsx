"use client";

import Link from "next/link";
import { useActionState, useMemo, useState } from "react";
import {
  fabricSources,
  garments,
  necklines,
  occasions,
  sleeveStyles,
  type Garment,
} from "@/lib/content";
import { groupsFor, measurementSources } from "@/lib/measurements";
import { submitOrder, type OrderFormState } from "./actions";
import styles from "./order-form.module.css";

const MAX_PHOTOS = 4;

const initialState: OrderFormState = { status: "idle" };

export function OrderForm({ initialGarment }: { initialGarment?: string }) {
  const [state, formAction, pending] = useActionState(submitOrder, initialState);

  const [garmentSlug, setGarmentSlug] = useState(
    () => garments.find((g) => g.slug === initialGarment)?.slug ?? "",
  );
  const [measurementSource, setMeasurementSource] = useState("in-person");
  const [fabricSource, setFabricSource] = useState("customer");
  const [showSizes, setShowSizes] = useState(false);
  const [fileNames, setFileNames] = useState<string[]>([]);

  const garment: Garment | undefined = useMemo(
    () => garments.find((g) => g.slug === garmentSlug),
    [garmentSlug],
  );

  // Only the size fields this garment actually uses are rendered, so nobody
  // ordering a kurti is asked for a salwar length.
  const groups = useMemo(
    () => (garment ? groupsFor(garment.measurementGroups) : []),
    [garment],
  );

  const hasSleeves = garment?.measurementGroups.includes("sleeve") ?? false;
  // A repair is a different conversation: no fabric to choose, no style, no
  // sizes — just what's broken and a photo of it.
  const isRepair = garment?.kind === "repair";
  // Headwear sits in between: the customer brings the cloth, so there's no
  // fabric choice and nothing to measure, but it's still something she makes.
  const isHeadwear = garment?.kind === "headwear";
  const needsSizing = Boolean(garment) && !isRepair && !isHeadwear;

  const sourceChoices = measurementSources.filter(
    (option) => option.value !== "not-needed",
  );
  const fabricChoices = fabricSources.filter((option) => option.value !== "na");

  const errors = state.fieldErrors ?? {};

  if (state.status === "success" && state.reference) {
    return (
      <div className={styles.done}>
        <div className={styles.doneMark} aria-hidden="true">
          ✓
        </div>
        <h2>Your order is in</h2>
        <p className="lede" style={{ maxWidth: "48ch", margin: "0 auto" }}>
          She&rsquo;ll be in touch with a price and a realistic date. Nothing
          is started until you&rsquo;ve said yes.
        </p>

        <p className={styles.reference}>{state.reference}</p>

        <p className="hint" style={{ maxWidth: "44ch", margin: "0 auto" }}>
          Keep this reference — you can use it to check on your order at any
          time, and it&rsquo;s handy to quote if you call.
        </p>

        <div className={styles.doneActions}>
          <Link href={`/status?reference=${state.reference}`} className="btn">
            Check your order
          </Link>
          <Link href="/" className="btn btn-outline">
            Back to the site
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} className={styles.form}>
      {state.status === "error" && state.message && (
        <div className="notice notice-error" role="alert">
          {state.message}
        </div>
      )}

      {/* ── 1. What ─────────────────────────────────────── */}
      <fieldset className={styles.step} style={{ border: 0, margin: 0 }}>
        <div className={styles.stepHead}>
          <span className={styles.stepNumber}>01</span>
          <h2 className={styles.stepTitle}>What can she help with?</h2>
        </div>

        <div className={styles.garments}>
          {garments.map((option) => (
            <label
              key={option.slug}
              className={`${styles.garment} ${
                garmentSlug === option.slug ? styles.garmentSelected : ""
              }`}
            >
              <input
                type="radio"
                name="garment"
                value={option.slug}
                checked={garmentSlug === option.slug}
                onChange={() => setGarmentSlug(option.slug)}
              />
              <span className={styles.garmentName}>{option.name}</span>
              <span className={styles.garmentMeta}>
                {option.otherNames ? `${option.otherNames} · ` : ""}
                about {option.turnaroundDays} days
              </span>
            </label>
          ))}
        </div>
        {errors.garment && <p className="error-text">{errors.garment}</p>}

        <div className={styles.row} style={{ marginTop: "var(--sp-5)" }}>
          <label className={styles.mField}>
            <span className="label">How many</span>
            <input
              className={`input ${errors.quantity ? "input-error" : ""}`}
              type="number"
              name="quantity"
              defaultValue={1}
              min={1}
              max={20}
            />
            {errors.quantity && <p className="error-text">{errors.quantity}</p>}
          </label>

          {!isRepair && (
            <label className={styles.mField}>
              <span className="label">What&rsquo;s it for</span>
              <select className="select" name="occasion" defaultValue="">
                <option value="">Please choose</option>
                {occasions.map((occasion) => (
                  <option key={occasion} value={occasion}>
                    {occasion}
                  </option>
                ))}
              </select>
            </label>
          )}

          <label className={styles.mField}>
            <span className="label">Needed by</span>
            <input
              className={`input ${errors.neededBy ? "input-error" : ""}`}
              type="date"
              name="neededBy"
            />
            <p className="hint">Optional — but it helps her plan.</p>
            {errors.neededBy && <p className="error-text">{errors.neededBy}</p>}
          </label>
        </div>
      </fieldset>

      {/* ── 2. Fabric & style ───────────────────────────── */}
      <fieldset className={styles.step} style={{ border: 0, margin: 0 }}>
        <div className={styles.stepHead}>
          <span className={styles.stepNumber}>02</span>
          <h2 className={styles.stepTitle}>
            {isRepair
              ? "What needs fixing?"
              : isHeadwear
                ? "About the cloth"
                : "Fabric and style"}
          </h2>
        </div>

        {isRepair ? (
          <>
            <input type="hidden" name="fabricSource" value="na" />
            <label className="field">
              <span className="label">Tell her about the job</span>
              <textarea
                className="textarea"
                name="fabricNotes"
                rows={4}
                placeholder="A split seam under the arm of a cotton kurti, trousers that need taking up about two inches, a small tear near the hem…"
              />
              <p className="hint">
                What the garment is, what&rsquo;s wrong, and roughly where.
                A photo in the next step helps more than anything.
              </p>
            </label>
          </>
        ) : isHeadwear ? (
          <>
            {/* You bring the cloth — there's no fabric decision to make. */}
            <input type="hidden" name="fabricSource" value="customer" />
            <p className="notice notice-success">
              Bring your own cloth and she&rsquo;ll cut it to length and finish
              the edges.
            </p>
            <label className="field" style={{ marginTop: "var(--sp-5)" }}>
              <span className="label">Length, colour and who it&rsquo;s for</span>
              <textarea
                className="textarea"
                name="fabricNotes"
                rows={4}
                placeholder="Five metres of navy voile, cut to two turbans for an adult — or four patkas for a seven-year-old, all in the same cream…"
              />
              <p className="hint">
                Say whether they&rsquo;re for an adult or a child, and what
                length you&rsquo;re after. Not sure? Say so and she&rsquo;ll
                advise.
              </p>
            </label>
          </>
        ) : (
          <>
            <div className={styles.choices}>
              {fabricChoices.map((option) => (
                <label
                  key={option.value}
                  className={`${styles.choice} ${
                    fabricSource === option.value ? styles.choiceSelected : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="fabricSource"
                    value={option.value}
                    checked={fabricSource === option.value}
                    onChange={() => setFabricSource(option.value)}
                  />
                  <span>
                    <span className={styles.choiceLabel}>{option.label}</span>
                    <span className={styles.choiceHint}>{option.hint}</span>
                  </span>
                </label>
              ))}
            </div>
            {errors.fabricSource && (
              <p className="error-text">{errors.fabricSource}</p>
            )}

            <label className="field">
              <span className="label">About the fabric</span>
              <textarea
                className="textarea"
                name="fabricNotes"
                rows={3}
                placeholder="Cotton, georgette, heavy embroidery, how many metres you have…"
              />
            </label>
          </>
        )}

        {/* Neckline and sleeves only mean something on a stitched garment —
            nobody ordering a patka should be asked about a boat neck. */}
        {hasSleeves && (
          <div className={styles.row}>
            <label className={styles.mField}>
              <span className="label">Neckline</span>
              <select className="select" name="neckline" defaultValue="">
                <option value="">Please choose</option>
                {necklines.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className={styles.mField}>
              <span className="label">Sleeves</span>
              <select className="select" name="sleeveStyle" defaultValue="">
                <option value="">Please choose</option>
                {sleeveStyles.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}

        {hasSleeves && (
          <label className="check" style={{ marginTop: "var(--sp-4)" }}>
            <input type="checkbox" name="lining" />
            <span>
              <span className={styles.choiceLabel}>Please line it</span>
              <span className={styles.choiceHint}>
                Recommended for sheer or scratchy fabrics. Adds to the cost.
              </span>
            </span>
          </label>
        )}
      </fieldset>

      {/* ── 3. Sizing ───────────────────────────────────── */}
      <fieldset className={styles.step} style={{ border: 0, margin: 0 }}>
        <div className={styles.stepHead}>
          <span className={styles.stepNumber}>03</span>
          <h2 className={styles.stepTitle}>Sizing</h2>
          {needsSizing && (
            <span className={styles.stepNote}>
              <Link href="/measuring">How measuring works →</Link>
            </span>
          )}
        </div>

        {isRepair || isHeadwear ? (
          <>
            <input type="hidden" name="measurementSource" value="not-needed" />
            <p className="notice notice-success">
              {isRepair
                ? "Nothing needed here for a repair — she'll see the garment itself when you bring it in."
                : "Nothing to measure — she works from the cloth you bring and the length you asked for above."}
            </p>
          </>
        ) : (
          <>
            <p className="notice notice-warn">
              <strong>Please don&rsquo;t measure yourself.</strong> Pammi takes
              your measurements in person before anything is cut — it takes a
              few minutes and it&rsquo;s the reason the fit comes out right.
            </p>

            <div className={styles.choices} style={{ marginTop: "var(--sp-5)" }}>
              {sourceChoices.map((option) => (
                <label
                  key={option.value}
                  className={`${styles.choice} ${
                    measurementSource === option.value
                      ? styles.choiceSelected
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="measurementSource"
                    value={option.value}
                    checked={measurementSource === option.value}
                    onChange={() => setMeasurementSource(option.value)}
                  />
                  <span>
                    <span className={styles.choiceLabel}>{option.label}</span>
                    <span className={styles.choiceHint}>{option.hint}</span>
                  </span>
                </label>
              ))}
            </div>
            {errors.measurementSource && (
              <p className="error-text">{errors.measurementSource}</p>
            )}

            {/* Rough sizes are tucked behind a toggle on purpose: they're a
                fabric-planning hint, and putting them front and centre would
                invite exactly the self-measuring this step warns against. */}
            {garment && (
              <div className={styles.roughBox}>
                <button
                  type="button"
                  className={styles.roughToggle}
                  aria-expanded={showSizes}
                  onClick={() => setShowSizes((v) => !v)}
                >
                  <span>
                    <strong>Add rough sizes</strong> (optional)
                  </span>
                  <span aria-hidden="true">{showSizes ? "–" : "+"}</span>
                </button>

                {showSizes && (
                  <div className={styles.roughBody}>
                    <p className="hint" style={{ marginTop: 0 }}>
                      Only so she can work out how much fabric you&rsquo;ll
                      need. A guess is fine, blanks are fine, and none of it is
                      what she cuts from.
                    </p>

                    {groups.map((group) => (
                      <div key={group.id} className={styles.mGroup}>
                        <div className={styles.mGroupHead}>
                          <h3 className={styles.mGroupTitle}>{group.title}</h3>
                          <p className={styles.mGroupDesc}>
                            {group.description}
                          </p>
                        </div>

                        <div className={styles.mFields}>
                          {group.fields.map((field) => {
                            const error = errors[`m_${field.id}`];
                            return (
                              <label key={field.id} className={styles.mField}>
                                <span className={styles.mLabel}>
                                  {field.label}
                                </span>
                                <span className={styles.mInputWrap}>
                                  <input
                                    className={`input ${
                                      error ? "input-error" : ""
                                    }`}
                                    type="number"
                                    inputMode="decimal"
                                    step="0.25"
                                    min={field.min}
                                    max={field.max}
                                    name={`m_${field.id}`}
                                  />
                                  <span className={styles.mUnit}>in</span>
                                </span>
                                <p className={styles.mHint}>{field.hint}</p>
                                {error && (
                                  <p className="error-text">{error}</p>
                                )}
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {!garment && (
              <p className="hint">
                Pick what you&rsquo;re after above and the right size fields
                appear here.
              </p>
            )}
          </>
        )}
      </fieldset>

      {/* ── 4. Design reference ─────────────────────────── */}
      <fieldset className={styles.step} style={{ border: 0, margin: 0 }}>
        <div className={styles.stepHead}>
          <span className={styles.stepNumber}>04</span>
          <h2 className={styles.stepTitle}>
            {isRepair ? "A photo of the damage" : "Design reference"}
          </h2>
          <span className={styles.stepNote}>
            {isRepair ? "Strongly recommended" : "Optional"}
          </span>
        </div>

        <div className={styles.drop}>
          <p style={{ margin: 0, fontWeight: 600 }}>
            {isRepair
              ? "Show her what needs fixing"
              : "Got a photo of the design you want?"}
          </p>
          <p className="hint" style={{ marginTop: "var(--sp-2)" }}>
            {isRepair
              ? "A close-up of the rip or hem tells her more than a paragraph can, and means she can quote you properly. "
              : "A screenshot, a photo from a shop, a suit you already own — "}
            up to {MAX_PHOTOS} images, 8 MB each. Only she sees them.
          </p>
          <input
            type="file"
            name="photos"
            accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
            multiple
            onChange={(event) =>
              setFileNames(
                Array.from(event.target.files ?? []).map((f) => f.name),
              )
            }
          />
          {fileNames.length > 0 && (
            <ul className={styles.fileList}>
              {fileNames.map((fileName) => (
                <li key={fileName}>📎 {fileName}</li>
              ))}
            </ul>
          )}
        </div>
      </fieldset>

      {/* ── 5. Contact ──────────────────────────────────── */}
      <fieldset className={styles.step} style={{ border: 0, margin: 0 }}>
        <div className={styles.stepHead}>
          <span className={styles.stepNumber}>05</span>
          <h2 className={styles.stepTitle}>How to reach you</h2>
        </div>

        <div className={styles.row}>
          <label className={styles.mField}>
            <span className="label">Your name</span>
            <input
              className={`input ${errors.name ? "input-error" : ""}`}
              type="text"
              name="name"
              autoComplete="name"
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </label>

          <label className={styles.mField}>
            <span className="label">Email</span>
            <input
              className={`input ${errors.email ? "input-error" : ""}`}
              type="email"
              name="email"
              autoComplete="email"
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </label>

          <label className={styles.mField}>
            <span className="label">Phone</span>
            <input
              className={`input ${errors.phone ? "input-error" : ""}`}
              type="tel"
              name="phone"
              autoComplete="tel"
            />
            {errors.phone && <p className="error-text">{errors.phone}</p>}
          </label>

          <label className={styles.mField}>
            <span className="label">Best way to reach you</span>
            <select className="select" name="contactPreference" defaultValue="">
              <option value="">No preference</option>
              <option value="phone">Phone call</option>
              <option value="text">Text message</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="email">Email</option>
            </select>
          </label>
        </div>

        <label className="field" style={{ marginTop: "var(--sp-2)" }}>
          <span className="label">Anything else she should know</span>
          <textarea
            className={`textarea ${errors.notes ? "input-error" : ""}`}
            name="notes"
            rows={4}
            placeholder="Changes to the design, a colour of thread you want, someone who's hard to fit, a date you're travelling…"
          />
          {errors.notes && <p className="error-text">{errors.notes}</p>}
        </label>
      </fieldset>

      <div className={styles.submit}>
        <p className={styles.submitNote}>
          Sending this doesn&rsquo;t commit you to anything. You&rsquo;ll get a
          price first, and nothing is cut until you agree to it.
        </p>
        <button className="btn" type="submit" disabled={pending}>
          {pending ? "Sending…" : "Send my order"}
        </button>
      </div>
    </form>
  );
}
