"use server";

import { getStatus } from "@/lib/content";
import { getOrderByReference } from "@/lib/orders";

export type StatusResult = {
  reference: string;
  garmentSlug: string;
  /** The English name stored with the order — a fallback if the slug's gone. */
  garmentName: string;
  quantity: number;
  status: string;
  tone: string;
  placedOn: string;
  updatedOn: string;
  neededBy: string | null;
  quotedPrice: number | null;
  message: string | null;
};

/**
 * Codes and raw values rather than sentences: the form puts them into words
 * itself, so switching language while a result is on screen re-labels it.
 */
export type StatusFormState = {
  status: "idle" | "error" | "found";
  error?: "missing" | "notFound";
  result?: StatusResult;
};

/**
 * Looking an order up needs both the reference and the email it was placed
 * with. The reference alone is short enough to guess at, and an order carries
 * someone's phone number and measurements.
 */
export async function lookupOrder(
  _prev: StatusFormState,
  formData: FormData,
): Promise<StatusFormState> {
  const reference = String(formData.get("reference") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();

  if (!reference || !email) {
    return { status: "error", error: "missing" };
  }

  const order = await getOrderByReference(reference);

  // Deliberately the same answer either way, so this can't be used to work
  // out which references exist.
  if (!order || order.email.toLowerCase() !== email.toLowerCase()) {
    return { status: "error", error: "notFound" };
  }

  return {
    status: "found",
    result: {
      reference: order.reference,
      garmentSlug: order.garment_slug,
      garmentName: order.garment_name,
      quantity: order.quantity,
      status: order.status,
      tone: getStatus(order.status).tone,
      placedOn: order.created_at,
      updatedOn: order.updated_at,
      neededBy: order.needed_by,
      quotedPrice: order.quoted_price,
      message: order.customer_message,
    },
  };
}
