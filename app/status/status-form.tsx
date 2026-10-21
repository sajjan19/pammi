"use client";

import Link from "next/link";
import { useActionState } from "react";
import { formatDay, formatTimestamp } from "@/lib/dates";
import { getDictionary } from "@/lib/dictionary";
import { dateLocale, type Lang } from "@/lib/i18n";
import { customerStatusLabel, getLocalizedGarment } from "@/lib/localize";
import { StatusTracker } from "./status-tracker";
import { lookupOrder, type StatusFormState } from "./actions";

const initialState: StatusFormState = { status: "idle" };

export function StatusForm({
  lang,
  initialReference,
}: {
  lang: Lang;
  initialReference?: string;
}) {
  const [state, formAction, pending] = useActionState(
    lookupOrder,
    initialState,
  );

  const t = getDictionary(lang).status;
  const locale = dateLocale[lang];

  if (state.status === "found" && state.result) {
    const result = state.result;
    const garmentName =
      getLocalizedGarment(result.garmentSlug, lang)?.name ?? result.garmentName;

    return (
      <div className="panel" style={{ padding: "var(--sp-7)" }}>
        <p className="eyebrow">{result.reference}</p>
        <h2 style={{ marginBottom: "var(--sp-4)" }}>
          {result.quantity > 1 && `${result.quantity} × `}
          {garmentName}
        </h2>

        <p>
          <span className={`badge badge-${result.tone}`}>
            {customerStatusLabel(result.status, lang)}
          </span>
        </p>

        <StatusTracker status={result.status} labels={t.stages} />

        <hr className="rule" />

        <dl
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: "var(--sp-3) var(--sp-6)",
            margin: 0,
          }}
        >
          <dt className="muted">{t.ordered}</dt>
          <dd style={{ margin: 0 }}>{formatTimestamp(result.placedOn, locale)}</dd>

          <dt className="muted">{t.updated}</dt>
          <dd style={{ margin: 0 }}>{formatTimestamp(result.updatedOn, locale)}</dd>

          {result.neededBy && (
            <>
              <dt className="muted">{t.neededBy}</dt>
              <dd style={{ margin: 0 }}>{formatDay(result.neededBy, locale)}</dd>
            </>
          )}

          {result.quotedPrice !== null && (
            <>
              <dt className="muted">{t.price}</dt>
              <dd style={{ margin: 0 }}>${result.quotedPrice}</dd>
            </>
          )}
        </dl>

        {result.message && (
          <div className="notice" style={{ marginTop: "var(--sp-6)" }}>
            <strong>{t.message}</strong>
            <p style={{ margin: "var(--sp-1) 0 0", whiteSpace: "pre-line" }}>
              {result.message}
            </p>
          </div>
        )}

        <p className="hint" style={{ marginTop: "var(--sp-6)" }}>
          {t.questions}
        </p>

        <p style={{ marginTop: "var(--sp-4)" }}>
          <Link href="/contact" className="btn btn-outline btn-sm">
            {t.contact}
          </Link>
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="panel"
      style={{ padding: "var(--sp-7)" }}
      noValidate
    >
      {state.status === "error" && state.error && (
        <div
          className="notice notice-error"
          role="alert"
          style={{ marginBottom: "var(--sp-5)" }}
        >
          {state.error === "missing" ? t.missing : t.notFound}
        </div>
      )}

      <label className="field">
        <span className="label">{t.orderNumber}</span>
        <input
          className="input"
          type="text"
          name="reference"
          placeholder="PTA-XXX-XXX"
          defaultValue={initialReference}
          autoComplete="off"
          style={{ textTransform: "uppercase" }}
        />
      </label>

      <label className="field">
        <span className="label">{t.email}</span>
        <input
          className="input"
          type="email"
          name="email"
          autoComplete="email"
        />
      </label>

      <button className="btn btn-block" type="submit" disabled={pending}>
        {pending ? t.checking : t.check}
      </button>
    </form>
  );
}
