"use server";

import { getStatus } from "@/lib/content";
import { getOrderByReference } from "@/lib/orders";

export type StatusResult = {
  reference: string;
  garmentName: string;
  quantity: number;
  statusLabel: string;
  tone: string;
  placedOn: string;
  updatedOn: string;
  neededBy: string | null;
  quotedPrice: number | null;
};

export type StatusFormState = {
  status: "idle" | "error" | "found";
  message?: string;
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
    return {
      status: "error",
      message: "Please enter both your reference and your email.",
    };
  }

  const order = getOrderByReference(reference);

  // Deliberately the same message either way, so this can't be used to work
  // out which references exist.
  const notFound: StatusFormState = {
    status: "error",
    message:
      "No order found with that reference and email. Check both and try again, or get in touch directly.",
  };

  if (!order) return notFound;
  if (order.email.toLowerCase() !== email.toLowerCase()) return notFound;

  const status = getStatus(order.status);

  return {
    status: "found",
    result: {
      reference: order.reference,
      garmentName: order.garment_name,
      quantity: order.quantity,
      statusLabel: status.customerLabel,
      tone: status.tone,
      placedOn: order.created_at,
      updatedOn: order.updated_at,
      neededBy: order.needed_by,
      quotedPrice: order.quoted_price,
    },
  };
}
