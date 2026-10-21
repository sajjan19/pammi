/**
 * Phone photos are often 3–8 MB each, and Vercel turns away any request over
 * 4.5 MB. So before an order is sent, each photo is redrawn at a sensible
 * size in the customer's browser — plenty for showing a style or a tear.
 *
 * A photo the browser can't draw (HEIC, outside Safari) is sent as it is.
 */

const LONGEST_SIDE = 1600;
const QUALITY = 0.82;

async function shrink(file: File): Promise<File> {
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, LONGEST_SIDE / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", QUALITY),
    );
    if (!blob || blob.size >= file.size) return file;

    const name = file.name.replace(/\.[^.]+$/, "") + ".jpg";
    return new File([blob], name, { type: "image/jpeg" });
  } catch {
    return file;
  }
}

/** Swaps the files in a file input for shrunk copies. */
export async function shrinkPhotosIn(input: HTMLInputElement): Promise<void> {
  const files = Array.from(input.files ?? []);
  if (files.length === 0) return;

  const shrunk = await Promise.all(files.map(shrink));
  const transfer = new DataTransfer();
  for (const file of shrunk) transfer.items.add(file);
  input.files = transfer.files;
}
