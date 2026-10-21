import "server-only";

import crypto from "node:crypto";

/**
 * Reference photos customers attach to an order.
 *
 * They're stored in the database with the order and served only through the
 * admin photo route, because a customer's inspiration photo is often a
 * picture of themselves — it shouldn't be sitting on a guessable public URL.
 */

export const MAX_PHOTOS = 4;

/**
 * Vercel turns away any request over 4.5 MB, so all the photos together
 * must fit under that. The order form shrinks photos in the browser before
 * sending them, which keeps them well inside it — see lib/shrink-photo.ts.
 */
export const MAX_PHOTO_BYTES = 4 * 1024 * 1024;

const ALLOWED: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/heic": ".heic",
  "image/heif": ".heif",
};

export type SavedPhoto = {
  filename: string;
  mime: string;
  bytes: number;
  data: Uint8Array;
};

/**
 * Why a set of photos was turned away. Codes rather than sentences, so the
 * caller can say it in the customer's own language.
 */
export type PhotoError =
  | { code: "tooMany" }
  | { code: "badType"; name: string }
  | { code: "tooBig"; name: string }
  | { code: "saveFailed" };

/** Checks the uploaded files and reads them, ready to store with the order. */
export async function savePhotos(
  files: File[],
): Promise<{ ok: true; photos: SavedPhoto[] } | { ok: false; error: PhotoError }> {
  const real = files.filter((f) => f && f.size > 0);
  if (real.length === 0) return { ok: true, photos: [] };

  if (real.length > MAX_PHOTOS) {
    return { ok: false, error: { code: "tooMany" } };
  }

  const photos: SavedPhoto[] = [];

  for (const file of real) {
    const ext = ALLOWED[file.type];
    if (!ext) {
      return { ok: false, error: { code: "badType", name: file.name } };
    }
    if (file.size > MAX_PHOTO_BYTES) {
      return { ok: false, error: { code: "tooBig", name: file.name } };
    }

    try {
      const data = new Uint8Array(await file.arrayBuffer());
      photos.push({
        filename: `${crypto.randomUUID()}${ext}`,
        mime: file.type,
        bytes: data.byteLength,
        data,
      });
    } catch {
      return { ok: false, error: { code: "saveFailed" } };
    }
  }

  return { ok: true, photos };
}
