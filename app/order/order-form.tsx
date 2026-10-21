"use client";

import Link from "next/link";
import { useActionState, useMemo, useState } from "react";
import { getDictionary } from "@/lib/dictionary";
import type { Lang } from "@/lib/i18n";
import { getContent, localizedGroupsFor } from "@/lib/localize";
import { shrinkPhotosIn } from "@/lib/shrink-photo";
import { Illustration } from "@/components/illustration";
import { submitOrder, type OrderFormState } from "./actions";
import styles from "./order-form.module.css";

const MAX_PHOTOS = 4;

const initialState: OrderFormState = { status: "idle" };

export function OrderForm({
  lang,
  initialGarment,
}: {
  lang: Lang;
  initialGarment?: string;
}) {
  const [state, formAction, pending] = useActionState(submitOrder, initialState);

  const t = getDictionary(lang).order;
  const common = getDictionary(lang).common;
  const c = getContent(lang);

  const [garmentSlug, setGarmentSlug] = useState(
    () => c.garments.find((g) => g.slug === initialGarment)?.slug ?? "",
  );
  const [measurementSource, setMeasurementSource] = useState("in-person");
  const [fabricSource, setFabricSource] = useState("customer");
  const [showSizes, setShowSizes] = useState(false);
  const [fileNames, setFileNames] = useState<string[]>([]);

  const garment = c.garments.find((g) => g.slug === garmentSlug);

  // Only the size fields this garment actually uses are rendered, so nobody
  // ordering a kurti is asked for a salwar length.
  const groups = useMemo(
    () => (garment ? localizedGroupsFor(garment.measurementGroups, lang) : []),
    [garment, lang],
  );

  const hasSleeves = garment?.measurementGroups.includes("sleeve") ?? false;
  // A repair is a different conversation: no fabric to choose, no style, no
  // sizes — just what's broken and a photo of it.
  const isRepair = garment?.kind === "repair";
  // Headwear sits in between: the customer brings the cloth, so there's no
  // fabric choice and nothing to measure, but it's still something she makes.
  const isHeadwear = garment?.kind === "headwear";

  const sourceChoices = c.measurementSources.filter(
    (option) => option.value !== "not-needed",
  );
  const fabricChoices = c.fabricSources.filter((option) => option.value !== "na");

  const errors = state.fieldErrors ?? {};

  if (state.status === "success" && state.reference) {
    return (
      <div className={styles.done}>
        <div className={styles.doneMark} aria-hidden="true">
          ✓
        </div>
        <h2>{t.doneTitle}</h2>
        <p className="lede" style={{ maxWidth: "40ch", margin: "0 auto" }}>
          {t.doneText}
        </p>

        <p className={styles.reference}>{state.reference}</p>

        <p className="hint" style={{ maxWidth: "40ch", margin: "0 auto" }}>
          {t.doneKeep}
        </p>

        <div className={styles.doneActions}>
          <Link href={`/status?reference=${state.reference}`} className="btn">
            {t.checkOrder}
          </Link>
          <Link href="/" className="btn btn-outline">
            {t.backHome}
          </Link>
        </div>
      </div>
    );
  }

  return (
    // noValidate: the browser's own warnings appear in the phone's language,
    // not the page's. The server checks everything and answers in the
    // customer's language instead.
    <form action={formAction} className={styles.form} noValidate>
      {state.status === "error" && state.message && (
        <div className="notice notice-error" role="alert">
          {state.message}
        </div>
      )}

      {/* ── 1. What ─────────────────────────────────────── */}
      <fieldset className={styles.step}>
        <div className={styles.stepHead}>
          <span className={styles.stepNumber}>1</span>
          <h2 className={styles.stepTitle}>{t.stepWhat}</h2>
        </div>

        <div className={styles.garments}>
          {c.garments.map((option) => (
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
              <span className={styles.garmentThumb} aria-hidden="true">
                <Illustration src={option.image} alt="" />
              </span>
              <span className={styles.garmentText}>
                <span className={styles.garmentName}>{option.name}</span>
                <span className={styles.garmentMeta}>
                  {common.aboutDays(option.turnaroundDays)}
                </span>
              </span>
            </label>
          ))}
        </div>
        {errors.garment && <p className="error-text">{errors.garment}</p>}

        <div className={styles.row} style={{ marginTop: "var(--sp-5)" }}>
          <label className={styles.field}>
            <span className="label">{t.howMany}</span>
            <input
              className={`input ${errors.quantity ? "input-error" : ""}`}
              type="number"
              inputMode="numeric"
              name="quantity"
              defaultValue={1}
              min={1}
              max={20}
            />
            {errors.quantity && <p className="error-text">{errors.quantity}</p>}
          </label>

          {!isRepair && (
            <label className={styles.field}>
              <span className="label">{t.whatFor}</span>
              <select className="select" name="occasion" defaultValue="">
                <option value="">{t.choose}</option>
                {c.occasions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          )}

          <label className={styles.field}>
            <span className="label">{t.neededBy}</span>
            <input
              className={`input ${errors.neededBy ? "input-error" : ""}`}
              type="date"
              name="neededBy"
            />
            <p className="hint">{t.optional}</p>
            {errors.neededBy && <p className="error-text">{errors.neededBy}</p>}
          </label>
        </div>
      </fieldset>

      {/* ── 2. Fabric / cloth / the fix ──────────────────── */}
      <fieldset className={styles.step}>
        <div className={styles.stepHead}>
          <span className={styles.stepNumber}>2</span>
          <h2 className={styles.stepTitle}>
            {isRepair ? t.stepFix : isHeadwear ? t.stepCloth : t.stepFabric}
          </h2>
        </div>

        {isRepair ? (
          <>
            <input type="hidden" name="fabricSource" value="na" />
            <label className="field">
              <span className="label">{t.fixLabel}</span>
              <textarea
                className="textarea"
                name="fabricNotes"
                rows={3}
                placeholder={t.fixPlaceholder}
              />
            </label>
          </>
        ) : isHeadwear ? (
          <>
            {/* You bring the cloth — there's no fabric decision to make. */}
            <input type="hidden" name="fabricSource" value="customer" />
            <p className="notice notice-success">{t.clothNotice}</p>
            <label className="field" style={{ marginTop: "var(--sp-5)" }}>
              <span className="label">{t.clothLabel}</span>
              <textarea
                className="textarea"
                name="fabricNotes"
                rows={3}
                placeholder={t.clothPlaceholder}
              />
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
              <span className="label">{t.aboutFabric}</span>
              <textarea
                className="textarea"
                name="fabricNotes"
                rows={2}
                placeholder={t.aboutFabricPlaceholder}
              />
            </label>

            {/* Neckline and sleeves only mean something on a stitched
                garment with sleeves. */}
            {hasSleeves && (
              <>
                <div className={styles.row}>
                  <label className={styles.field}>
                    <span className="label">{t.neckline}</span>
                    <select className="select" name="neckline" defaultValue="">
                      <option value="">{t.choose}</option>
                      {c.necklines.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className={styles.field}>
                    <span className="label">{t.sleeves}</span>
                    <select className="select" name="sleeveStyle" defaultValue="">
                      <option value="">{t.choose}</option>
                      {c.sleeveStyles.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="check" style={{ marginTop: "var(--sp-5)" }}>
                  <input type="checkbox" name="lining" />
                  <span>
                    <span className={styles.choiceLabel}>{t.lining}</span>
                    <span className={styles.choiceHint}>{t.liningHint}</span>
                  </span>
                </label>
              </>
            )}
          </>
        )}
      </fieldset>

      {/* ── 3. Sizing ───────────────────────────────────── */}
      <fieldset className={styles.step}>
        <div className={styles.stepHead}>
          <span className={styles.stepNumber}>3</span>
          <h2 className={styles.stepTitle}>{t.stepSizing}</h2>
        </div>

        {isRepair || isHeadwear ? (
          <>
            <input type="hidden" name="measurementSource" value="not-needed" />
            <p className="notice notice-success">
              {isRepair ? t.nothingForRepair : t.nothingForCloth}
            </p>
          </>
        ) : (
          <>
            <p className="notice notice-important">
              <strong>{t.dontMeasure}</strong>
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
            {garment ? (
              <div className={styles.roughBox}>
                <button
                  type="button"
                  className={styles.roughToggle}
                  aria-expanded={showSizes}
                  onClick={() => setShowSizes((v) => !v)}
                >
                  <span>
                    <strong>{t.addRoughSizes}</strong> {t.optionalParen}
                  </span>
                  <span aria-hidden="true">{showSizes ? "–" : "+"}</span>
                </button>

                {showSizes && (
                  <div className={styles.roughBody}>
                    <p className="hint" style={{ marginTop: 0 }}>
                      {t.roughHint}
                    </p>

                    {groups.map((group) => (
                      <div key={group.id} className={styles.mGroup}>
                        <h3 className={styles.mGroupTitle}>
                          {group.title}{" "}
                          <span className={styles.mGroupDesc}>
                            {group.description}
                          </span>
                        </h3>

                        <div className={styles.mFields}>
                          {group.fields.map((field) => {
                            const error = errors[`m_${field.id}`];
                            return (
                              <label key={field.id} className={styles.field}>
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
                                    name={`m_${field.id}`}
                                  />
                                  <span className={styles.mUnit}>
                                    {t.inches}
                                  </span>
                                </span>
                                <p className={styles.mHint}>{field.hint}</p>
                                {error && <p className="error-text">{error}</p>}
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <p className="hint">{t.pickFirst}</p>
            )}
          </>
        )}
      </fieldset>

      {/* ── 4. Photo ────────────────────────────────────── */}
      <fieldset className={styles.step}>
        <div className={styles.stepHead}>
          <span className={styles.stepNumber}>4</span>
          <h2 className={styles.stepTitle}>
            {isRepair ? t.stepPhotoFix : t.stepPhotoDesign}
          </h2>
          <span className={styles.stepNote}>
            {isRepair ? t.photoHelps : t.optional}
          </span>
        </div>

        {/* The browser's own file button can't be translated, so it's hidden
            and this label stands in for it, in the page's language. */}
        <label className={styles.drop}>
          <input
            className="sr-only"
            type="file"
            name="photos"
            accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
            multiple
            onChange={(event) => {
              const input = event.currentTarget;
              setFileNames(Array.from(input.files ?? []).map((f) => f.name));
              void shrinkPhotosIn(input);
            }}
          />
          <span className="btn btn-outline btn-sm">{t.choosePhotos}</span>
          <span className="hint" style={{ display: "block" }}>
            {t.photoHint(MAX_PHOTOS)}
          </span>
          {fileNames.length > 0 && (
            <ul className={styles.fileList}>
              {fileNames.map((fileName) => (
                <li key={fileName}>📎 {fileName}</li>
              ))}
            </ul>
          )}
        </label>
      </fieldset>

      {/* ── 5. Contact ──────────────────────────────────── */}
      <fieldset className={styles.step}>
        <div className={styles.stepHead}>
          <span className={styles.stepNumber}>5</span>
          <h2 className={styles.stepTitle}>{t.stepDetails}</h2>
        </div>

        <div className={styles.row}>
          <label className={styles.field}>
            <span className="label">{t.name}</span>
            <input
              className={`input ${errors.name ? "input-error" : ""}`}
              type="text"
              name="name"
              autoComplete="name"
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </label>

          <label className={styles.field}>
            <span className="label">{t.phone}</span>
            <input
              className={`input ${errors.phone ? "input-error" : ""}`}
              type="tel"
              name="phone"
              autoComplete="tel"
            />
            {errors.phone && <p className="error-text">{errors.phone}</p>}
          </label>

          <label className={styles.field}>
            <span className="label">{t.email}</span>
            <input
              className={`input ${errors.email ? "input-error" : ""}`}
              type="email"
              name="email"
              autoComplete="email"
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </label>

          <label className={styles.field}>
            <span className="label">{t.contactBy}</span>
            <select className="select" name="contactPreference" defaultValue="">
              <option value="">{t.contactOptions.none}</option>
              <option value="phone">{t.contactOptions.phone}</option>
              <option value="text">{t.contactOptions.text}</option>
              <option value="whatsapp">{t.contactOptions.whatsapp}</option>
              <option value="email">{t.contactOptions.email}</option>
            </select>
          </label>
        </div>

        <label className="field" style={{ marginTop: "var(--sp-5)" }}>
          <span className="label">{t.notes}</span>
          <textarea
            className={`textarea ${errors.notes ? "input-error" : ""}`}
            name="notes"
            rows={3}
          />
          {errors.notes && <p className="error-text">{errors.notes}</p>}
        </label>
      </fieldset>

      <div className={styles.submit}>
        <p className={styles.submitNote}>{t.submitNote}</p>
        <button className="btn" type="submit" disabled={pending}>
          {pending ? t.sending : t.submit}
        </button>
      </div>
    </form>
  );
}
