"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/guards";

const eventSchema = z.object({
  title: z.string().trim().min(3, "Il titolo deve avere almeno 3 caratteri").max(150),
  summary: z.string().trim().min(10, "Il riassunto deve avere almeno 10 caratteri").max(300),
  description: z.string().trim().min(20, "La descrizione deve avere almeno 20 caratteri"),
  location: z.string().trim().min(2, "Indica un luogo valido").max(200),
  coverImageUrl: z.string().trim().url("URL immagine non valido").optional().or(z.literal("")),
  startsAt: z.string().min(1, "Indica data e ora di inizio"),
  endsAt: z.string().optional().or(z.literal("")),
  capacity: z.string().optional().or(z.literal("")),
  published: z.string().optional(),
});

export type EventFormState = {
  status: "idle" | "error";
  message?: string;
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function uniqueSlug(title: string, ignoreId?: string): Promise<string> {
  const base = slugify(title) || "evento";
  let slug = base;
  let suffix = 1;

  while (true) {
    const existing = await db.event.findUnique({ where: { slug } });
    if (!existing || existing.id === ignoreId) return slug;
    suffix += 1;
    slug = `${base}-${suffix}`;
  }
}

function parseFormData(formData: FormData) {
  return eventSchema.safeParse({
    title: formData.get("title"),
    summary: formData.get("summary"),
    description: formData.get("description"),
    location: formData.get("location"),
    coverImageUrl: formData.get("coverImageUrl"),
    startsAt: formData.get("startsAt"),
    endsAt: formData.get("endsAt"),
    capacity: formData.get("capacity"),
    published: formData.get("published"),
  });
}

export async function createEvent(
  _prevState: EventFormState,
  formData: FormData,
): Promise<EventFormState> {
  const session = await requireAdmin();
  const parsed = parseFormData(formData);

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Dati non validi" };
  }

  const data = parsed.data;
  const slug = await uniqueSlug(data.title);

  const event = await db.event.create({
    data: {
      title: data.title,
      slug,
      summary: data.summary,
      description: data.description,
      location: data.location,
      coverImageUrl: data.coverImageUrl || null,
      startsAt: new Date(data.startsAt),
      endsAt: data.endsAt ? new Date(data.endsAt) : null,
      capacity: data.capacity ? Number(data.capacity) : null,
      published: data.published === "on",
      createdById: session.user.id,
    },
  });

  revalidatePath("/admin/eventi");
  revalidatePath("/eventi");
  revalidatePath("/");
  redirect(`/admin/eventi/${event.id}`);
}

export async function updateEvent(
  eventId: string,
  _prevState: EventFormState,
  formData: FormData,
): Promise<EventFormState> {
  await requireAdmin();
  const parsed = parseFormData(formData);

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Dati non validi" };
  }

  const data = parsed.data;
  const slug = await uniqueSlug(data.title, eventId);

  await db.event.update({
    where: { id: eventId },
    data: {
      title: data.title,
      slug,
      summary: data.summary,
      description: data.description,
      location: data.location,
      coverImageUrl: data.coverImageUrl || null,
      startsAt: new Date(data.startsAt),
      endsAt: data.endsAt ? new Date(data.endsAt) : null,
      capacity: data.capacity ? Number(data.capacity) : null,
      published: data.published === "on",
    },
  });

  revalidatePath("/admin/eventi");
  revalidatePath(`/admin/eventi/${eventId}`);
  revalidatePath(`/eventi/${slug}`);
  revalidatePath("/eventi");
  revalidatePath("/");
  return { status: "idle" };
}

export async function deleteEvent(eventId: string) {
  await requireAdmin();
  await db.event.delete({ where: { id: eventId } });
  revalidatePath("/admin/eventi");
  revalidatePath("/eventi");
  revalidatePath("/");
  redirect("/admin/eventi");
}
