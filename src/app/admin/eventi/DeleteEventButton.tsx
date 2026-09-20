"use client";

import { useTransition } from "react";
import { deleteEvent } from "@/app/admin/eventi/actions";

export function DeleteEventButton({ eventId }: { eventId: string }) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    if (!confirm("Sei sicuro di voler eliminare questo evento? L'azione è irreversibile.")) {
      return;
    }
    startTransition(() => {
      deleteEvent(eventId);
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-60"
    >
      {isPending ? "Eliminazione..." : "Elimina evento"}
    </button>
  );
}
