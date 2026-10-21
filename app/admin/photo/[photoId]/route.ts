import { isAdmin } from "@/lib/auth";
import { getPhoto } from "@/lib/orders";

/**
 * Serves a customer's reference photo.
 *
 * These are kept out of /public precisely so they can't be reached without a
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

  const photo = await getPhoto(id);
  if (!photo?.data) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(new Uint8Array(photo.data), {
    headers: {
      "Content-Type": photo.mime,
      "Content-Length": String(photo.data.byteLength),
      // Private: these must never end up in a shared or CDN cache.
      "Cache-Control": "private, max-age=3600",
    },
  });
}
