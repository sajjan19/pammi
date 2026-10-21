import "server-only";

import { createClient, type Client } from "@libsql/client";
import fs from "node:fs";
import path from "node:path";

/**
 * Every order, and every photo attached to one, lives in a single SQLite
 * database.
 *
 * On Vercel there's no disk that survives between requests, so the database
 * is hosted on Turso: set TURSO_DATABASE_URL (libsql://…) and
 * TURSO_AUTH_TOKEN. Without them — on your own computer — it's a plain file
 * at ./data/pammi.db, which you can copy as a backup.
 */

const remoteUrl = process.env.TURSO_DATABASE_URL;

function localUrl(): string {
  const file =
    process.env.DATABASE_PATH ?? path.join(process.cwd(), "data", "pammi.db");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  return `file:${file}`;
}

const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS orders (
    id                 INTEGER PRIMARY KEY AUTOINCREMENT,
    reference          TEXT    NOT NULL UNIQUE,
    garment_slug       TEXT    NOT NULL,
    garment_name       TEXT    NOT NULL,
    quantity           INTEGER NOT NULL DEFAULT 1,
    occasion           TEXT,
    needed_by          TEXT,
    fabric_source      TEXT    NOT NULL,
    fabric_notes       TEXT,
    neckline           TEXT,
    sleeve_style       TEXT,
    lining             INTEGER NOT NULL DEFAULT 0,
    measurement_source TEXT    NOT NULL,
    measurements       TEXT    NOT NULL DEFAULT '{}',
    customer_name      TEXT    NOT NULL,
    email              TEXT    NOT NULL,
    phone              TEXT    NOT NULL,
    contact_preference TEXT,
    notes              TEXT,
    status             TEXT    NOT NULL DEFAULT 'new',
    quoted_price       INTEGER,
    private_notes      TEXT,
    customer_message   TEXT,
    created_at         TEXT    NOT NULL,
    updated_at         TEXT    NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS idx_orders_status
     ON orders (status, created_at DESC)`,
  // The photo itself is stored in `data`, so there are no files to lose.
  `CREATE TABLE IF NOT EXISTS order_photos (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id   INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    filename   TEXT    NOT NULL,
    mime       TEXT    NOT NULL,
    bytes      INTEGER NOT NULL,
    data       BLOB,
    created_at TEXT    NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS idx_photos_order
     ON order_photos (order_id)`,
];

/** Columns added after launch, for databases made before them. */
const ADDED_COLUMNS: [table: string, column: string, type: string][] = [
  ["orders", "customer_message", "TEXT"],
  ["order_photos", "data", "BLOB"],
];

async function connect(): Promise<Client> {
  const client = remoteUrl
    ? createClient({ url: remoteUrl, authToken: process.env.TURSO_AUTH_TOKEN })
    : createClient({ url: localUrl() });

  await client.batch(SCHEMA, "write");

  for (const [table, column, type] of ADDED_COLUMNS) {
    const { rows } = await client.execute(`PRAGMA table_info(${table})`);
    if (!rows.some((row) => row.name === column)) {
      await client.execute(`ALTER TABLE ${table} ADD COLUMN ${column} ${type}`);
    }
  }

  return client;
}

declare global {
  // Reused across hot reloads in development, and across requests on a warm
  // serverless instance.
  var __pammiDb: Promise<Client> | undefined;
}

/**
 * Connects on first use rather than at import, so `next build` can import
 * every page without touching the database.
 */
export function getDb(): Promise<Client> {
  if (!globalThis.__pammiDb) {
    globalThis.__pammiDb = connect().catch((error) => {
      // Let the next request try again rather than caching the failure.
      globalThis.__pammiDb = undefined;
      throw error;
    });
  }
  return globalThis.__pammiDb;
}
