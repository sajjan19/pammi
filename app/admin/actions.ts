"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  endAdminSession,
  isPasswordValid,
  requireAdmin,
  startAdminSession,
} from "@/lib/auth";
import { statusValues, type OrderStatus } from "@/lib/content";
import { deleteOrder, updateOrderDetails, updateOrderStatus } from "@/lib/orders";
import { deletePhotoFiles } from "@/lib/uploads";

export type LoginState = { error?: string };

export async function login(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");

  if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_SECRET) {
    return {
      error:
        "Admin isn't set up yet. Add ADMIN_PASSWORD and ADMIN_SECRET to .env.local.",
    };
  }

  if (!isPasswordValid(password)) {
    return { error: "That password isn't right." };
  }

  await startAdminSession();
  redirect("/admin");
}

export async function logout(): Promise<void> {
  await endAdminSession();
  redirect("/admin");
}

/* ── Order management ──────────────────────────────────────── */

// Every action below re-checks the session: Server Functions are reachable
// by direct POST, so the admin page rendering the button isn't the guard.

function parseId(formData: FormData): number {
  const id = Number(formData.get("id"));
  if (!Number.isInteger(id) || id < 1) throw new Error("Bad order id.");
  return id;
}

export async function setStatus(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = parseId(formData);
  const status = String(formData.get("status") ?? "");
  if (!statusValues.includes(status as OrderStatus)) {
    throw new Error("Unknown status.");
  }

  updateOrderStatus(id, status as OrderStatus);
  revalidatePath("/admin");
  revalidatePath(`/admin/${id}`);
}

export async function saveDetails(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = parseId(formData);
  const rawPrice = String(formData.get("quotedPrice") ?? "").trim();
  const privateNotes = String(formData.get("privateNotes") ?? "").trim();

  let quotedPrice: number | null = null;
  if (rawPrice) {
    const parsed = Number(rawPrice);
    if (!Number.isFinite(parsed) || parsed < 0 || parsed > 100_000) {
      throw new Error("That price doesn't look right.");
    }
    quotedPrice = Math.round(parsed);
  }

  updateOrderDetails(id, { quotedPrice, privateNotes });
  revalidatePath(`/admin/${id}`);
}

export async function removeOrder(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = parseId(formData);
  const filenames = deleteOrder(id);
  await deletePhotoFiles(filenames);

  revalidatePath("/admin");
  redirect("/admin");
}
