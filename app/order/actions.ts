"use server";

import { getGarment } from "@/lib/content";
import { getDictionary, type Dictionary } from "@/lib/dictionary";
import { getLang } from "@/lib/i18n-server";
import { groupsFor, parseMeasurements } from "@/lib/measurements";
import { createOrder } from "@/lib/orders";
import {
  MAX_PHOTOS,
  savePhotos,
  type PhotoError,
} from "@/lib/uploads";

export type OrderFormState = {
  status: "idle" | "error" | "success";
  message?: string;
  fieldErrors?: Record<string, string>;
  reference?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function photoMessage(error: PhotoError, e: Dictionary["order"]["errors"]): string {
  switch (error.code) {
    case "tooMany":
      return e.tooManyPhotos(MAX_PHOTOS);
    case "badType":
      return e.badPhoto(error.name);
    case "tooBig":
      return e.bigPhoto(error.name);
    case "saveFailed":
      return e.photoSaveFailed;
  }
}

export async function submitOrder(
  _prev: OrderFormState,
  formData: FormData,
): Promise<OrderFormState> {
  // Messages go back in the language the customer is reading the form in.
  const e = getDictionary(await getLang()).order.errors;

  const garmentSlug = String(formData.get("garment") ?? "");
  const garment = getGarment(garmentSlug);

  if (!garment) {
    return {
      status: "error",
      message: e.chooseGarment,
      fieldErrors: { garment: e.pickOne },
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
    fieldErrors.quantity = e.quantity;
  }

  if (!fabricSource) fieldErrors.fabricSource = e.chooseOption;

  if (neededBy && !DATE_RE.test(neededBy)) fieldErrors.neededBy = e.pickDate;

  if (!name) fieldErrors.name = e.nameMissing;
  else if (name.length > 100) fieldErrors.name = e.nameLong;

  if (!email) fieldErrors.email = e.emailMissing;
  else if (!EMAIL_RE.test(email)) fieldErrors.email = e.emailBad;

  if (!phone) fieldErrors.phone = e.phoneMissing;
  else if (phone.replace(/\D/g, "").length < 7) fieldErrors.phone = e.phoneBad;

  if (notes.length > 2000) fieldErrors.notes = e.notesLong;

  if (!measurementSource) fieldErrors.measurementSource = e.chooseOption;

  // Only the fields belonging to this garment are read, and none of them is
  // ever required — these are rough sizes for planning fabric, not the
  // measurements she cuts from. She takes those herself.
  const { values: measurements, errors: measurementErrors } = parseMeasurements(
    formData,
    groupsFor(garment.measurementGroups),
    { notNumber: e.notNumber, outOfRange: e.outOfRange },
  );

  for (const [field, error] of Object.entries(measurementErrors)) {
    fieldErrors[`m_${field}`] = error;
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: e.checkFields, fieldErrors };
  }

  // Photos are read only once everything else has passed.
  const files = formData.getAll("photos").filter((f): f is File => f instanceof File);
  const saved = await savePhotos(files);
  if (!saved.ok) {
    return { status: "error", message: photoMessage(saved.error, e) };
  }

  try {
    // The English garment name is what's stored, so the admin page reads the
    // same whichever language the order came in.
    const { reference } = await createOrder({
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
    return { status: "error", message: e.generic };
  }
}
