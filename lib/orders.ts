import "server-only";

import crypto from "node:crypto";
import { getDb } from "@/lib/db";
import type { OrderStatus } from "@/lib/content";
import type { MeasurementValues } from "@/lib/measurements";
import type { SavedPhoto } from "@/lib/uploads";

/* ── Types ─────────────────────────────────────────────────── */

export type OrderRow = {
  id: number;
  reference: string;
  garment_slug: string;
  garment_name: string;
  quantity: number;
  occasion: string | null;
  needed_by: string | null;
  fabric_source: string;
  fabric_notes: string | null;
  neckline: string | null;
  sleeve_style: string | null;
  lining: number;
  measurement_source: string;
  measurements: string;
  customer_name: string;
  email: string;
  phone: string;
  contact_preference: string | null;
  notes: string | null;
  status: OrderStatus;
  quoted_price: number | null;
  private_notes: string | null;
  created_at: string;
  updated_at: string;
};

export type PhotoRow = {
  id: number;
  order_id: number;
  filename: string;
  mime: string;
  bytes: number;
  created_at: string;
};

export type Order = Omit<OrderRow, "measurements" | "lining"> & {
  lining: boolean;
  measurements: MeasurementValues;
  photos: PhotoRow[];
};

function hydrate(row: OrderRow, photos: PhotoRow[]): Order {
  const { measurements, lining, ...rest } = row;
  let parsed: MeasurementValues = {};
  try {
    parsed = JSON.parse(measurements) as MeasurementValues;
  } catch {
    // A corrupt blob shouldn't take the admin page down — show the rest.
  }
  return { ...rest, lining: lining === 1, measurements: parsed, photos };
}

/* ── Reference codes ───────────────────────────────────────── */

/**
 * Short, human-readable code a customer can quote over the phone.
 * No vowels, so it can't spell anything unfortunate, and no 0/O or 1/I.
 */
const ALPHABET = "23456789BCDFGHJKLMNPQRSTVWXYZ";

function newReference(): string {
  const bytes = crypto.randomBytes(6);
  const code = Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join("");
  return `PTA-${code.slice(0, 3)}-${code.slice(3)}`;
}

/* ── Writes ────────────────────────────────────────────────── */

export type NewOrder = {
  garmentSlug: string;
  garmentName: string;
  quantity: number;
  occasion: string;
  neededBy: string;
  fabricSource: string;
  fabricNotes: string;
  neckline: string;
  sleeveStyle: string;
  lining: boolean;
  measurementSource: string;
  measurements: MeasurementValues;
  name: string;
  email: string;
  phone: string;
  contactPreference: string;
  notes: string;
  photos: SavedPhoto[];
};

/**
 * Writes the order and its photo records in one transaction, so a failure
 * halfway through can never leave an order without its reference photos.
 *
 * Built on demand rather than at module scope: preparing a statement opens
 * the database, and importing this file must not do that — see lib/db.ts.
 */
function createOrderTx(order: NewOrder, reference: string): number {
  const db = getDb();

  const insertOrder = db.prepare(`
    INSERT INTO orders (
      reference, garment_slug, garment_name, quantity, occasion, needed_by,
      fabric_source, fabric_notes, neckline, sleeve_style, lining,
      measurement_source, measurements, customer_name, email, phone,
      contact_preference, notes, status, created_at, updated_at
    ) VALUES (
      @reference, @garmentSlug, @garmentName, @quantity, @occasion, @neededBy,
      @fabricSource, @fabricNotes, @neckline, @sleeveStyle, @lining,
      @measurementSource, @measurements, @name, @email, @phone,
      @contactPreference, @notes, 'new', @now, @now
    )
  `);

  const insertPhoto = db.prepare(`
    INSERT INTO order_photos (order_id, filename, mime, bytes, created_at)
    VALUES (?, ?, ?, ?, ?)
  `);

  const run = db.transaction(() => {
    const now = new Date().toISOString();

    const result = insertOrder.run({
      reference,
      garmentSlug: order.garmentSlug,
      garmentName: order.garmentName,
      quantity: order.quantity,
      occasion: order.occasion || null,
      neededBy: order.neededBy || null,
      fabricSource: order.fabricSource,
      fabricNotes: order.fabricNotes || null,
      neckline: order.neckline || null,
      sleeveStyle: order.sleeveStyle || null,
      lining: order.lining ? 1 : 0,
      measurementSource: order.measurementSource,
      measurements: JSON.stringify(order.measurements),
      name: order.name,
      email: order.email,
      phone: order.phone,
      contactPreference: order.contactPreference || null,
      notes: order.notes || null,
      now,
    });

    const orderId = Number(result.lastInsertRowid);
    for (const photo of order.photos) {
      insertPhoto.run(orderId, photo.filename, photo.mime, photo.bytes, now);
    }

    return orderId;
  });

  return run();
}

export function createOrder(order: NewOrder): { reference: string } {
  // A collision is vanishingly unlikely, but the column is UNIQUE — retry
  // rather than throwing a database error at the customer.
  for (let attempt = 0; attempt < 5; attempt++) {
    const reference = newReference();
    try {
      createOrderTx(order, reference);
      return { reference };
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      if (!message.includes("UNIQUE")) throw error;
    }
  }
  throw new Error("Could not allocate an order reference.");
}

export function updateOrderStatus(id: number, status: OrderStatus): void {
  getDb().prepare(
    `UPDATE orders SET status = ?, updated_at = ? WHERE id = ?`,
  ).run(status, new Date().toISOString(), id);
}

export function updateOrderDetails(
  id: number,
  { quotedPrice, privateNotes }: { quotedPrice: number | null; privateNotes: string },
): void {
  getDb().prepare(
    `UPDATE orders SET quoted_price = ?, private_notes = ?, updated_at = ?
     WHERE id = ?`,
  ).run(quotedPrice, privateNotes || null, new Date().toISOString(), id);
}

/** Returns the photo filenames so the caller can delete them from disk. */
export function deleteOrder(id: number): string[] {
  const db = getDb();

  const photos = db
    .prepare(`SELECT filename FROM order_photos WHERE order_id = ?`)
    .all(id) as { filename: string }[];

  db.prepare(`DELETE FROM orders WHERE id = ?`).run(id);
  return photos.map((p) => p.filename);
}

/* ── Reads ─────────────────────────────────────────────────── */

function photosFor(orderId: number): PhotoRow[] {
  return getDb()
    .prepare(`SELECT * FROM order_photos WHERE order_id = ? ORDER BY id`)
    .all(orderId) as PhotoRow[];
}

export function listOrders(status?: OrderStatus | "all"): Order[] {
  const db = getDb();

  const rows = (
    !status || status === "all"
      ? db.prepare(`SELECT * FROM orders ORDER BY created_at DESC`).all()
      : db
          .prepare(
            `SELECT * FROM orders WHERE status = ? ORDER BY created_at DESC`,
          )
          .all(status)
  ) as OrderRow[];

  return rows.map((row) => hydrate(row, photosFor(row.id)));
}

export function getOrder(id: number): Order | null {
  const row = getDb().prepare(`SELECT * FROM orders WHERE id = ?`).get(id) as
    | OrderRow
    | undefined;
  return row ? hydrate(row, photosFor(row.id)) : null;
}

export function getOrderByReference(reference: string): Order | null {
  const row = getDb()
    .prepare(`SELECT * FROM orders WHERE reference = ?`)
    .get(reference.toUpperCase()) as OrderRow | undefined;
  return row ? hydrate(row, photosFor(row.id)) : null;
}

export function getPhoto(id: number): PhotoRow | null {
  const row = getDb()
    .prepare(`SELECT * FROM order_photos WHERE id = ?`)
    .get(id) as
    | PhotoRow
    | undefined;
  return row ?? null;
}

export function statusCounts(): Record<string, number> {
  const rows = getDb()
    .prepare(`SELECT status, COUNT(*) AS count FROM orders GROUP BY status`)
    .all() as { status: string; count: number }[];

  const counts: Record<string, number> = {};
  for (const row of rows) counts[row.status] = row.count;
  return counts;
}
