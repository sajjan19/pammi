/**
 * Date formatting shared by the server and the browser.
 *
 * The two kinds of date in this app must not be formatted the same way:
 *
 * - timestamps (`created_at`, `updated_at`) are full ISO instants
 * - `needed_by` is a plain calendar day, "2026-10-15", straight from a
 *   `<input type="date">`
 *
 * `new Date("2026-10-15")` is parsed as UTC midnight, so anywhere west of
 * Greenwich it renders as the day before. A customer asking for the 15th
 * seeing "14 October" is not a rounding error to them — it's the wrong date.
 */

const DAY_RE = /^\d{4}-\d{2}-\d{2}$/;

const DAY_FORMAT: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "long",
  year: "numeric",
};

/** Formats a calendar day ("2026-10-15") without shifting it by timezone. */
export function formatDay(value: string): string {
  if (!DAY_RE.test(value)) return value;
  // The time suffix makes this parse in local time rather than as UTC.
  return new Date(`${value}T00:00:00`).toLocaleDateString(undefined, DAY_FORMAT);
}

/** Formats a full ISO timestamp as a day. */
export function formatTimestamp(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, DAY_FORMAT);
}
