"use server";

import { getGarment } from "@/lib/content";
import { groupsFor, parseMeasurements } from "@/lib/measurements";
import { createOrder } from "@/lib/orders";
import { deletePhotoFiles, savePhotos } from "@/lib/uploads";

export type OrderFormState = {
  status: "idle" | "error" | "success";
  message?: string;
  fieldErrors?: Record<string, string>;
  reference?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export async function submitOrder(
  _prev: OrderFormState,
  formData: FormData,
): Promise<OrderFormState> {
  const garmentSlug = String(formData.get("garment") ?? "");
  const garment = getGarment(garmentSlug);

  if (!garment) {
    return {
      status: "error",
      message: "Please choose what you'd like made.",
      fieldErrors: { garment: "Pick one of the options." },
    };
  }

  const quantity = Number(formData.get("quantity") ?? 1);
  const occasion = String(formData.get("occasion") ?? "").trim();
  const neededBy = String(formData.get("neededBy") ?? "").trim();
  const fabricSource = String(formData.get("fabricSource") ?? "").trim();
  const fabricNotes = String(formData.get("fabricNotes") ?? "").trim();
  const neckline = String(formData.get("neckline") ?? "").trim();
  const sleeveStyle = String(formData.get("sleeveStyle") ?? "").trim();
  const lining = formData.get("lining") === "on";
  const measurementSource = String(formData.get("measurementSource") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const contactPreference = String(formData.get("contactPreference") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();

  const fieldErrors: Record<string, string> = {};

  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
    fieldErrors.quantity = "Please enter a number between 1 and 20.";
  }

  if (!fabricSource) {
    fieldErrors.fabricSource = "Let her know who's supplying the fabric.";
  }

  if (neededBy && !DATE_RE.test(neededBy)) {
    fieldErrors.neededBy = "Please pick a date from the calendar.";
  }

  if (!name) fieldErrors.name = "Please tell her your name.";
  else if (name.length > 100) fieldErrors.name = "That name is too long.";

  if (!email) fieldErrors.email = "An email is needed to send your quote.";
  else if (!EMAIL_RE.test(email))
    fieldErrors.email = "That doesn't look like a valid email.";

  if (!phone) fieldErrors.phone = "A phone number is needed for updates.";
  else if (phone.replace(/\D/g, "").length < 7)
    fieldErrors.phone = "That doesn't look like a full phone number.";

  if (notes.length > 2000)
    fieldErrors.notes = "Please keep notes under 2000 characters.";

  if (!measurementSource) {
    fieldErrors.measurementSource = "Choose how she should get your measurements.";
  }

  // Only the fields belonging to this garment are read, and none of them is
  // ever required — these are rough sizes for planning fabric, not the
  // measurements she cuts from. She takes those herself.
  const groups = groupsFor(garment.measurementGroups);
  const { values: measurements, errors: measurementErrors } = parseMeasurements(
    formData,
    groups,
  );

  for (const [field, error] of Object.entries(measurementErrors)) {
    fieldErrors[`m_${field}`] = error;
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors,
    };
  }

  // Photos are written only once everything else has passed, so a rejected
  // form never leaves stray files on disk.
  const files = formData.getAll("photos").filter((f): f is File => f instanceof File);
  const saved = await savePhotos(files);
  if (!saved.ok) {
    return { status: "error", message: saved.message };
  }

  try {
    const { reference } = createOrder({
      garmentSlug: garment.slug,
      garmentName: garment.name,
      quantity,
      occasion,
      neededBy,
      fabricSource,
      fabricNotes,
      neckline,
      sleeveStyle,
      lining,
      measurementSource,
      measurements,
      name,
      email,
      phone,
      contactPreference,
      notes,
      photos: saved.photos,
    });

    return { status: "success", reference };
  } catch {
    // The order row never landed, so its photos are orphans — clean them up.
    await deletePhotoFiles(saved.photos.map((p) => p.filename));
    return {
      status: "error",
      message:
        "Something went wrong saving your order. Please try again, or get in touch directly.",
    };
  }
}
