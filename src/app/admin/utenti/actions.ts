"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/guards";

export async function setUserRole(userId: string, role: "USER" | "ADMIN") {
  const session = await requireAdmin();

  if (session.user.id === userId && role !== "ADMIN") {
    throw new Error("Non puoi rimuovere i tuoi stessi permessi di amministratore.");
  }

  await db.user.update({ where: { id: userId }, data: { role } });
  revalidatePath("/admin/utenti");
}
