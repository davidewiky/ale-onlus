import type { Metadata } from "next";
import { EventForm } from "@/app/admin/eventi/EventForm";
import { createEvent } from "@/app/admin/eventi/actions";

export const metadata: Metadata = { title: "Nuovo evento" };

export default function NuovoEventoPage() {
  return (
    <div className="max-w-2xl">
      <h2 className="mb-6 text-lg font-semibold text-ink-900">Crea un nuovo evento</h2>
      <EventForm action={createEvent} submitLabel="Crea evento" />
    </div>
  );
}
