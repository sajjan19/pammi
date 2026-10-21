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
  customer_message: string | null;
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
 * Writes the order and its photos in one transaction, so a failure halfway
 * through can never leave an order without its reference photos.
 */
async function createOrderTx(order: NewOrder, reference: string): Promise<void> {
  const db = await getDb();
  const now = new Date().toISOString();
  const tx = await db.transaction("write");

  try {
    const result = await tx.execute({
      sql: `INSERT INTO orders (
        reference, garment_slug, garment_name, quantity, occasion, needed_by,
        fabric_source, fabric_notes, neckline, sleeve_style, lining,
        measurement_source, measurements, customer_name, email, phone,
        contact_preference, notes, status, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new', ?, ?)`,
      args: [
        reference,
        order.garmentSlug,
        order.garmentName,
        order.quantity,
        order.occasion || null,
        order.neededBy || null,
        order.fabricSource,
        order.fabricNotes || null,
        order.neckline || null,
        order.sleeveStyle || null,
        order.lining ? 1 : 0,
        order.measurementSource,
        JSON.stringify(order.measurements),
        order.name,
        order.email,
        order.phone,
        order.contactPreference || null,
        order.notes || null,
        now,
        now,
      ],
    });

    const orderId = Number(result.lastInsertRowid);
    for (const photo of order.photos) {
      await tx.execute({
        sql: `INSERT INTO order_photos (order_id, filename, mime, bytes, data, created_at)
              VALUES (?, ?, ?, ?, ?, ?)`,
        args: [orderId, photo.filename, photo.mime, photo.bytes, photo.data, now],
      });
    }

    await tx.commit();
  } finally {
    tx.close();
  }
}

export async function createOrder(order: NewOrder): Promise<{ reference: string }> {
  // A collision is vanishingly unlikely, but the column is UNIQUE — retry
  // rather than throwing a database error at the customer.
  for (let attempt = 0; attempt < 5; attempt++) {
    const reference = newReference();
    try {
      await createOrderTx(order, reference);
      return { reference };
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      if (!message.includes("UNIQUE")) throw error;
    }
  }
  throw new Error("Could not allocate an order reference.");
}

export async function updateOrderStatus(id: number, status: OrderStatus): Promise<void> {
  await (await getDb()).execute({
    sql: `UPDATE orders SET status = ?, updated_at = ? WHERE id = ?`,
    args: [status, new Date().toISOString(), id],
  });
}

export async function updateOrderDetails(
  id: number,
  {
    quotedPrice,
    privateNotes,
    customerMessage,
  }: { quotedPrice: number | null; privateNotes: string; customerMessage: string },
): Promise<void> {
  await (await getDb()).execute({
    sql: `UPDATE orders SET quoted_price = ?, private_notes = ?, customer_message = ?,
            updated_at = ?
          WHERE id = ?`,
    args: [
      quotedPrice,
      privateNotes || null,
      customerMessage || null,
      new Date().toISOString(),
      id,
    ],
  });
}

/** Deletes the order and its photos together. */
export async function deleteOrder(id: number): Promise<void> {
  // Photos first, explicitly: a hosted database doesn't promise to enforce
  // ON DELETE CASCADE.
  await (await getDb()).batch(
    [
      { sql: `DELETE FROM order_photos WHERE order_id = ?`, args: [id] },
      { sql: `DELETE FROM orders WHERE id = ?`, args: [id] },
    ],
    "write",
  );
}

/* ── Reads ─────────────────────────────────────────────────── */

/** Photo details without the image bytes, which only the photo route needs. */
const PHOTO_COLUMNS = "id, order_id, filename, mime, bytes, created_at";

// libsql returns rows as plain objects with these columns; this just tells
// TypeScript which columns they are.
function as<T>(rows: unknown[]): T[] {
  return rows as T[];
}

async function photosFor(orderIds: number[]): Promise<Map<number, PhotoRow[]>> {
  const byOrder = new Map<number, PhotoRow[]>();
  if (orderIds.length === 0) return byOrder;

  const { rows } = await (await getDb()).execute({
    sql: `SELECT ${PHOTO_COLUMNS} FROM order_photos
          WHERE order_id IN (${orderIds.map(() => "?").join(",")}) ORDER BY id`,
    args: orderIds,
  });

  for (const photo of as<PhotoRow>(rows)) {
    const list = byOrder.get(photo.order_id) ?? [];
    list.push(photo);
    byOrder.set(photo.order_id, list);
  }
  return byOrder;
}

async function withPhotos(rows: OrderRow[]): Promise<Order[]> {
  const photos = await photosFor(rows.map((row) => row.id));
  return rows.map((row) => hydrate(row, photos.get(row.id) ?? []));
}

export async function listOrders(status?: OrderStatus | "all"): Promise<Order[]> {
  const db = await getDb();

  const { rows } =
    !status || status === "all"
      ? await db.execute(`SELECT * FROM orders ORDER BY created_at DESC`)
      : await db.execute({
          sql: `SELECT * FROM orders WHERE status = ? ORDER BY created_at DESC`,
          args: [status],
        });

  return withPhotos(as<OrderRow>(rows));
}

export async function getOrder(id: number): Promise<Order | null> {
  const { rows } = await (await getDb()).execute({
    sql: `SELECT * FROM orders WHERE id = ?`,
    args: [id],
  });
  const [order] = await withPhotos(as<OrderRow>(rows));
  return order ?? null;
}

export async function getOrderByReference(reference: string): Promise<Order | null> {
  const { rows } = await (await getDb()).execute({
    sql: `SELECT * FROM orders WHERE reference = ?`,
    args: [reference.toUpperCase()],
  });
  const [order] = await withPhotos(as<OrderRow>(rows));
  return order ?? null;
}

/** One photo, with its image bytes, for the admin photo route. */
export async function getPhoto(
  id: number,
): Promise<(PhotoRow & { data: ArrayBuffer | null }) | null> {
  const { rows } = await (await getDb()).execute({
    sql: `SELECT ${PHOTO_COLUMNS}, data FROM order_photos WHERE id = ?`,
    args: [id],
  });
  const [photo] = as<PhotoRow & { data: ArrayBuffer | null }>(rows);
  return photo ?? null;
}

export async function statusCounts(): Promise<Record<string, number>> {
  const { rows } = await (await getDb()).execute(
    `SELECT status, COUNT(*) AS count FROM orders GROUP BY status`,
  );

  const counts: Record<string, number> = {};
  for (const row of as<{ status: string; count: number }>(rows)) {
    counts[row.status] = Number(row.count);
  }
  return counts;
}
