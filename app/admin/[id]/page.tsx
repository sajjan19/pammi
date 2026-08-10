import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import {
  fabricSources,
  getGarment,
  getStatus,
  orderStatuses,
} from "@/lib/content";
import { formatDay } from "@/lib/dates";
import { fieldsById, groupsFor, measurementSources } from "@/lib/measurements";
import { getOrder } from "@/lib/orders";
import { ConfirmButton } from "@/components/confirm-button";
import { removeOrder, saveDetails, setStatus } from "../actions";
import styles from "../page.module.css";

export const metadata: Metadata = {
  title: "Order",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function labelFor(list: { value: string; label: string }[], value: string) {
  return list.find((item) => item.value === value)?.label ?? value;
}

export default async function AdminOrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await isAdmin())) redirect("/admin");

  const { id } = await params;
  const orderId = Number(id);
  if (!Number.isInteger(orderId)) notFound();

  const order = getOrder(orderId);
  if (!order) notFound();

  const status = getStatus(order.status);
  const garment = getGarment(order.garment_slug);

  // Grouped the same way the customer filled them in, so a measurement is
  // where she expects it rather than in one long alphabetical list.
  const groups = garment ? groupsFor(garment.measurementGroups) : [];
  const hasMeasurements = Object.keys(order.measurements).length > 0;

  return (
    <div className="container">
      <div className={styles.wrap}>
        <Link href="/admin" className={styles.back}>
          ← All orders
        </Link>

        <div className={styles.top}>
          <div>
            <p className="eyebrow" style={{ margin: 0 }}>
              {order.reference}
            </p>
            <h1 className={styles.title}>
              {order.quantity > 1 && `${order.quantity} × `}
              {order.garment_name}
            </h1>
          </div>
          <span className={`badge badge-${status.tone}`}>{status.label}</span>
        </div>

        <div className={styles.detail}>
          <div>
            <section className={styles.card}>
              <p className={styles.cardTitle}>Customer</p>
              <dl className={styles.defs}>
                <dt>Name</dt>
                <dd>{order.customer_name}</dd>

                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${order.email}`}>{order.email}</a>
                </dd>

                <dt>Phone</dt>
                <dd>
                  <a href={`tel:${order.phone.replace(/\s/g, "")}`}>
                    {order.phone}
                  </a>
                </dd>

                {order.contact_preference && (
                  <>
                    <dt>Prefers</dt>
                    <dd>{order.contact_preference}</dd>
                  </>
                )}

                <dt>Ordered</dt>
                <dd>{formatDateTime(order.created_at)}</dd>
              </dl>
            </section>

            <section className={styles.card}>
              <p className={styles.cardTitle}>The order</p>
              <dl className={styles.defs}>
                <dt>Garment</dt>
                <dd>{order.garment_name}</dd>

                <dt>Quantity</dt>
                <dd>{order.quantity}</dd>

                {order.occasion && (
                  <>
                    <dt>Occasion</dt>
                    <dd>{order.occasion}</dd>
                  </>
                )}

                {order.needed_by && (
                  <>
                    <dt>Needed by</dt>
                    <dd>
                      <strong>{formatDay(order.needed_by)}</strong>
                    </dd>
                  </>
                )}

                <dt>Fabric</dt>
                <dd>{labelFor(fabricSources, order.fabric_source)}</dd>

                {order.fabric_notes && (
                  <>
                    <dt>Fabric notes</dt>
                    <dd>{order.fabric_notes}</dd>
                  </>
                )}

                {order.neckline && (
                  <>
                    <dt>Neckline</dt>
                    <dd>{order.neckline}</dd>
                  </>
                )}

                {order.sleeve_style && (
                  <>
                    <dt>Sleeves</dt>
                    <dd>{order.sleeve_style}</dd>
                  </>
                )}

                <dt>Lining</dt>
                <dd>{order.lining ? "Yes" : "No"}</dd>
              </dl>

              {order.notes && (
                <>
                  <hr className="rule" style={{ margin: "var(--sp-5) 0" }} />
                  <p className={styles.cardTitle}>Their notes</p>
                  <p style={{ margin: 0, whiteSpace: "pre-wrap" }}>
                    {order.notes}
                  </p>
                </>
              )}
            </section>

            <section className={styles.card}>
              <p className={styles.cardTitle}>
                Measurements —{" "}
                {labelFor(measurementSources, order.measurement_source)}
              </p>

              {!hasMeasurements ? (
                <p className="muted" style={{ margin: 0 }}>
                  {order.measurement_source === "sample"
                    ? "They're bringing a suit to be copied."
                    : order.measurement_source === "onfile"
                      ? "Use the measurements already on file for this customer."
                      : "No measurements were submitted."}
                </p>
              ) : (
                groups.map((group) => {
                  const present = group.fields.filter(
                    (field) => order.measurements[field.id] !== undefined,
                  );
                  if (present.length === 0) return null;

                  return (
                    <div key={group.id} style={{ marginBottom: "var(--sp-5)" }}>
                      <p
                        className={styles.cardTitle}
                        style={{ marginBottom: "var(--sp-3)" }}
                      >
                        {group.title}
                      </p>
                      <div className={styles.measureGrid}>
                        {present.map((field) => (
                          <div key={field.id} className={styles.measure}>
                            <span className={styles.measureLabel}>
                              {field.label}
                            </span>
                            <span className={styles.measureValue}>
                              {order.measurements[field.id]}
                              <span
                                style={{
                                  fontSize: "0.75rem",
                                  color: "var(--stone)",
                                }}
                              >
                                {" "}
                                in
                              </span>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })
              )}

              {/* A garment whose measurement groups changed after the order
                  was placed would otherwise hide values — show the strays. */}
              {hasMeasurements &&
                (() => {
                  const shown = new Set(
                    groups.flatMap((g) => g.fields.map((f) => f.id)),
                  );
                  const strays = Object.entries(order.measurements).filter(
                    ([key]) => !shown.has(key),
                  );
                  if (strays.length === 0) return null;

                  return (
                    <div>
                      <p
                        className={styles.cardTitle}
                        style={{ marginBottom: "var(--sp-3)" }}
                      >
                        Other
                      </p>
                      <div className={styles.measureGrid}>
                        {strays.map(([key, value]) => (
                          <div key={key} className={styles.measure}>
                            <span className={styles.measureLabel}>
                              {fieldsById[key]?.label ?? key}
                            </span>
                            <span className={styles.measureValue}>
                              {value}
                              <span
                                style={{
                                  fontSize: "0.75rem",
                                  color: "var(--stone)",
                                }}
                              >
                                {" "}
                                in
                              </span>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}
            </section>

            {order.photos.length > 0 && (
              <section className={styles.card}>
                <p className={styles.cardTitle}>
                  Reference photos ({order.photos.length})
                </p>
                <div className={styles.photos}>
                  {order.photos.map((photo) => (
                    <a
                      key={photo.id}
                      className={styles.photo}
                      href={`/admin/photo/${photo.id}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src={`/admin/photo/${photo.id}`}
                        alt={`Reference photo for order ${order.reference}`}
                      />
                    </a>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside>
            <section className={styles.card}>
              <p className={styles.cardTitle}>Move to</p>
              <div className={styles.statusButtons}>
                {orderStatuses.map((option) => (
                  <form key={option.value} action={setStatus}>
                    <input type="hidden" name="id" value={order.id} />
                    <input type="hidden" name="status" value={option.value} />
                    <button
                      type="submit"
                      className={`${styles.statusButton} ${
                        order.status === option.value
                          ? styles.statusCurrent
                          : ""
                      }`}
                      disabled={order.status === option.value}
                    >
                      {option.label}
                    </button>
                  </form>
                ))}
              </div>
              <p className="hint" style={{ marginTop: "var(--sp-4)" }}>
                The customer sees a plainer version of this on the order
                check page.
              </p>
            </section>

            <section className={styles.card}>
              <p className={styles.cardTitle}>Quote &amp; private notes</p>
              <form action={saveDetails}>
                <input type="hidden" name="id" value={order.id} />

                <label className="field">
                  <span className="label">Quoted price</span>
                  <input
                    className="input"
                    type="number"
                    name="quotedPrice"
                    min={0}
                    step={1}
                    defaultValue={order.quoted_price ?? ""}
                    placeholder="—"
                  />
                  <p className="hint">Shown to the customer once saved.</p>
                </label>

                <label className="field">
                  <span className="label">Private notes</span>
                  <textarea
                    className="textarea"
                    name="privateNotes"
                    rows={5}
                    defaultValue={order.private_notes ?? ""}
                    placeholder="Fabric received, adjustments after fitting, anything to remember…"
                  />
                  <p className="hint">Only you see these.</p>
                </label>

                <button className="btn btn-block btn-sm" type="submit">
                  Save
                </button>
              </form>

              <div className={styles.danger}>
                <form action={removeOrder}>
                  <input type="hidden" name="id" value={order.id} />
                  <ConfirmButton
                    className={`btn btn-block btn-sm ${styles.dangerButton}`}
                    message={`Delete order ${order.reference} and its photos? This can't be undone.`}
                  >
                    Delete this order
                  </ConfirmButton>
                </form>
                <p className="hint" style={{ marginTop: "var(--sp-2)" }}>
                  Deletes the order and its photos for good.
                </p>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
