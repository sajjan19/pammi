import "server-only";

import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { uploadDir } from "@/lib/db";

/**
 * Reference photos customers attach to an order.
 *
 * They're written outside /public and served only through the admin photo
 * route, because a customer's inspiration photo is often a picture of
 * themselves — it shouldn't be sitting on a guessable public URL.
 */

export const MAX_PHOTOS = 4;
export const MAX_PHOTO_BYTES = 8 * 1024 * 1024; // 8 MB

const ALLOWED: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/heic": ".heic",
  "image/heif": ".heif",
};

export type SavedPhoto = { filename: string; mime: string; bytes: number };

export type PhotoError = { message: string };

/**
 * Validates and writes uploaded files to disk.
 *
 * Nothing is written until every file has passed validation, so a rejected
 * third photo doesn't leave the first two orphaned on disk.
 */
export async function savePhotos(
  files: File[],
): Promise<{ ok: true; photos: SavedPhoto[] } | { ok: false } & PhotoError> {
  const real = files.filter((f) => f && f.size > 0);
  if (real.length === 0) return { ok: true, photos: [] };

  if (real.length > MAX_PHOTOS) {
    return { ok: false, message: `Please attach at most ${MAX_PHOTOS} photos.` };
  }

  const staged: { filename: string; mime: string; buffer: Buffer }[] = [];

  for (const file of real) {
    const ext = ALLOWED[file.type];
    if (!ext) {
      return {
        ok: false,
        message: `"${file.name}" isn't an image we can read. Please use JPG, PNG or WEBP.`,
      };
    }
    if (file.size > MAX_PHOTO_BYTES) {
      return {
        ok: false,
        message: `"${file.name}" is larger than 8 MB. Please send a smaller version.`,
      };
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    staged.push({
      filename: `${crypto.randomUUID()}${ext}`,
      mime: file.type,
      buffer,
    });
  }

  await fs.mkdir(uploadDir, { recursive: true });

  const written: SavedPhoto[] = [];
  try {
    for (const item of staged) {
      await fs.writeFile(path.join(uploadDir, item.filename), item.buffer);
      written.push({
        filename: item.filename,
        mime: item.mime,
        bytes: item.buffer.byteLength,
      });
    }
  } catch {
    await deletePhotoFiles(written.map((w) => w.filename));
    return { ok: false, message: "Your photos couldn't be saved. Please try again." };
  }

  return { ok: true, photos: written };
}

export async function readPhoto(
  filename: string,
): Promise<Buffer | null> {
  // Defence in depth: the filename always comes from our own database, but a
  // path separator here would otherwise read anywhere on disk.
  if (filename.includes("/") || filename.includes("\\") || filename.includes("..")) {
    return null;
  }
  try {
    return await fs.readFile(path.join(uploadDir, filename));
  } catch {
    return null;
  }
}

export async function deletePhotoFiles(filenames: string[]): Promise<void> {
  await Promise.all(
    filenames.map(async (filename) => {
      if (filename.includes("/") || filename.includes("\\")) return;
      try {
        await fs.unlink(path.join(uploadDir, filename));
      } catch {
        // Already gone — nothing to do.
      }
    }),
  );
}
