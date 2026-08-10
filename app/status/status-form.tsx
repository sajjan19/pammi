"use client";

import Link from "next/link";
import { useActionState } from "react";
import { formatDay, formatTimestamp } from "@/lib/dates";
import { lookupOrder, type StatusFormState } from "./actions";

const initialState: StatusFormState = { status: "idle" };

export function StatusForm({ initialReference }: { initialReference?: string }) {
  const [state, formAction, pending] = useActionState(
    lookupOrder,
    initialState,
  );

  if (state.status === "found" && state.result) {
    const result = state.result;
    return (
      <div className="panel" style={{ padding: "var(--sp-7)" }}>
        <p className="eyebrow">{result.reference}</p>
        <h2 style={{ marginBottom: "var(--sp-4)" }}>
          {result.quantity > 1 && `${result.quantity} × `}
          {result.garmentName}
        </h2>

        <p>
          <span className={`badge badge-${result.tone}`}>
            {result.statusLabel}
          </span>
        </p>

        <hr className="rule" />

        <dl
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: "var(--sp-3) var(--sp-6)",
            margin: 0,
            fontSize: "0.9375rem",
          }}
        >
          <dt className="muted">Ordered</dt>
          <dd style={{ margin: 0 }}>{formatTimestamp(result.placedOn)}</dd>

          <dt className="muted">Last update</dt>
          <dd style={{ margin: 0 }}>{formatTimestamp(result.updatedOn)}</dd>

          {result.neededBy && (
            <>
              <dt className="muted">Needed by</dt>
              <dd style={{ margin: 0 }}>{formatDay(result.neededBy)}</dd>
            </>
          )}

          {result.quotedPrice !== null && (
            <>
              <dt className="muted">Quoted</dt>
              <dd style={{ margin: 0 }}>${result.quotedPrice}</dd>
            </>
          )}
        </dl>

        <p className="hint" style={{ marginTop: "var(--sp-6)" }}>
          Questions about your order? Get in touch and quote your reference.
        </p>

        <p style={{ marginTop: "var(--sp-5)" }}>
          <Link href="/contact" className="btn btn-outline btn-sm">
            Contact her
          </Link>
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="panel" style={{ padding: "var(--sp-7)" }}>
      {state.status === "error" && state.message && (
        <div
          className="notice notice-error"
          role="alert"
          style={{ marginBottom: "var(--sp-5)" }}
        >
          {state.message}
        </div>
      )}

      <label className="field">
        <span className="label">Order reference</span>
        <input
          className="input"
          type="text"
          name="reference"
          placeholder="PTA-XXX-XXX"
          defaultValue={initialReference}
          autoComplete="off"
          style={{ textTransform: "uppercase" }}
        />
        <p className="hint">The code you were given when you placed the order.</p>
      </label>

      <label className="field">
        <span className="label">Email</span>
        <input
          className="input"
          type="email"
          name="email"
          autoComplete="email"
        />
        <p className="hint">The same one you used on the order form.</p>
      </label>

      <button className="btn btn-block" type="submit" disabled={pending}>
        {pending ? "Looking…" : "Check my order"}
      </button>
    </form>
  );
}
