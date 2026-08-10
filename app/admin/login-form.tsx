"use client";

import { useActionState } from "react";
import { login, type LoginState } from "./actions";

export function LoginForm({ configured }: { configured: boolean }) {
  const [state, formAction, pending] = useActionState(login, {} as LoginState);

  return (
    <form action={formAction} className="panel" style={{ padding: "var(--sp-7)" }}>
      <h2 style={{ marginBottom: "var(--sp-2)" }}>Orders</h2>
      <p className="hint" style={{ marginBottom: "var(--sp-6)" }}>
        This page is for the workshop only.
      </p>

      {!configured && (
        <div
          className="notice notice-warn"
          style={{ marginBottom: "var(--sp-5)" }}
        >
          Admin isn&rsquo;t set up yet. Copy <code>.env.example</code> to{" "}
          <code>.env.local</code> and set a password.
        </div>
      )}

      {state.error && (
        <div
          className="notice notice-error"
          role="alert"
          style={{ marginBottom: "var(--sp-5)" }}
        >
          {state.error}
        </div>
      )}

      <label className="field">
        <span className="label">Password</span>
        <input
          className="input"
          type="password"
          name="password"
          autoComplete="current-password"
          autoFocus
        />
      </label>

      <button className="btn btn-block" type="submit" disabled={pending}>
        {pending ? "Checking…" : "Sign in"}
      </button>
    </form>
  );
}
