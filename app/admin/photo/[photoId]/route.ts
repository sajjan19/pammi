import { isAdmin } from "@/lib/auth";
import { getPhoto } from "@/lib/orders";
import { readPhoto } from "@/lib/uploads";

/**
 * Serves a customer's reference photo.
 *
 * These live outside /public precisely so they can't be reached without a
 * session — inspiration photos are often pictures of the customer themselves.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ photoId: string }> },
) {
  if (!(await isAdmin())) {
    return new Response("Not found", { status: 404 });
  }

  const { photoId } = await params;
  const id = Number(photoId);
  if (!Number.isInteger(id)) {
    return new Response("Not found", { status: 404 });
  }

  const photo = getPhoto(id);
  if (!photo) {
    return new Response("Not found", { status: 404 });
  }

  const data = await readPhoto(photo.filename);
  if (!data) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(new Uint8Array(data), {
    headers: {
      "Content-Type": photo.mime,
      "Content-Length": String(photo.bytes),
      // Private: these must never end up in a shared or CDN cache.
      "Cache-Control": "private, max-age=3600",
    },
  });
}
