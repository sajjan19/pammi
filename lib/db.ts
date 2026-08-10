import "server-only";

import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

/**
 * A single SQLite file holds every order. For a one-person tailoring business
 * this is plenty — it's fast, needs no separate service, and the whole
 * database is one file you can copy as a backup.
 *
 * Set DATABASE_PATH in the environment to move it (useful on hosts with a
 * mounted disk). Defaults to ./data/pammi.db.
 */

const dataDir = process.env.DATA_DIR ?? path.join(process.cwd(), "data");

const dbPath = process.env.DATABASE_PATH ?? path.join(dataDir, "pammi.db");

/** Reference photos are written here, outside /public — see lib/uploads.ts. */
export const uploadDir =
  process.env.UPLOAD_DIR ?? path.join(dataDir, "uploads");

declare global {
  // Reused across hot reloads in development so we don't open a new handle
  // on every file change.
  var __pammiDb: Database.Database | undefined;
}

function connect(): Database.Database {
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });

  const db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  // `next build` collects page data in parallel workers, each of which opens
  // this file. Without a busy timeout the losers of that race fail outright
  // with SQLITE_BUSY instead of waiting their turn.
  db.pragma("busy_timeout = 5000");

  db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
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
      created_at         TEXT    NOT NULL,
      updated_at         TEXT    NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_orders_status
      ON orders (status, created_at DESC);

    CREATE TABLE IF NOT EXISTS order_photos (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id   INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
      filename   TEXT    NOT NULL,
      mime       TEXT    NOT NULL,
      bytes      INTEGER NOT NULL,
      created_at TEXT    NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_photos_order
      ON order_photos (order_id);
  `);

  return db;
}

/**
 * Connects on first use rather than at import.
 *
 * Importing this module must stay side-effect free: `next build` imports
 * every page to read its config, and a connection opened at module scope
 * would have each build worker racing to run the schema DDL.
 */
export function getDb(): Database.Database {
  if (!globalThis.__pammiDb) {
    globalThis.__pammiDb = connect();
  }
  return globalThis.__pammiDb;
}
