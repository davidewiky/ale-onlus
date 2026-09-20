"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireSession } from "@/lib/guards";

export type RegistrationActionState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function registerForEvent(
  eventId: string,
  eventSlug: string,
): Promise<RegistrationActionState> {
  const session = await requireSession();

  const event = await db.event.findUnique({
    where: { id: eventId },
    include: { _count: { select: { registrations: { where: { status: "CONFIRMED" } } } } },
  });

  if (!event || !event.published) {
    return { status: "error", message: "Evento non trovato." };
  }

  if (event.capacity && event._count.registrations >= event.capacity) {
    return { status: "error", message: "I posti disponibili per questo evento sono esauriti." };
  }

  await db.registration.upsert({
    where: { userId_eventId: { userId: session.user.id, eventId } },
    update: { status: "CONFIRMED" },
    create: { userId: session.user.id, eventId, status: "CONFIRMED" },
  });

  revalidatePath(`/eventi/${eventSlug}`);
  revalidatePath("/eventi");
  return { status: "success", message: "Iscrizione confermata! Ti aspettiamo." };
}

export async function cancelRegistration(
  eventId: string,
  eventSlug: string,
): Promise<RegistrationActionState> {
  const session = await requireSession();

  await db.registration.updateMany({
    where: { userId: session.user.id, eventId },
    data: { status: "CANCELLED" },
  });

  revalidatePath(`/eventi/${eventSlug}`);
  revalidatePath("/eventi");
  return { status: "success", message: "Iscrizione annullata." };
}
