import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { EventForm } from "@/app/admin/eventi/EventForm";
import { updateEvent } from "@/app/admin/eventi/actions";
import { DeleteEventButton } from "@/app/admin/eventi/DeleteEventButton";

export const metadata: Metadata = { title: "Modifica evento" };

type Props = { params: Promise<{ id: string }> };

export default async function ModificaEventoPage({ params }: Props) {
  const { id } = await params;
  const event = await db.event.findUnique({ where: { id } });

  if (!event) notFound();

  const boundUpdateEvent = updateEvent.bind(null, event.id);

  return (
    <div className="max-w-2xl">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-ink-900">Modifica evento</h2>
        <DeleteEventButton eventId={event.id} />
      </div>
      <EventForm action={boundUpdateEvent} initialValues={event} submitLabel="Salva modifiche" />
    </div>
  );
}
