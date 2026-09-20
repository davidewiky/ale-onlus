"use client";

import { useState, useTransition } from "react";
import { registerForEvent, cancelRegistration } from "@/app/eventi/actions";

export function RegisterButton({
  eventId,
  eventSlug,
  initiallyRegistered,
  isFull,
}: {
  eventId: string;
  eventSlug: string;
  initiallyRegistered: boolean;
  isFull: boolean;
}) {
  const [isRegistered, setIsRegistered] = useState(initiallyRegistered);
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      const result = isRegistered
        ? await cancelRegistration(eventId, eventSlug)
        : await registerForEvent(eventId, eventSlug);

      setMessage(result.message ?? null);
      if (result.status === "success") {
        setIsRegistered((prev) => !prev);
      }
    });
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={isPending || (!isRegistered && isFull)}
        className={`rounded-full px-6 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${
          isRegistered
            ? "border border-ink-300 text-ink-700 hover:border-ink-500"
            : "bg-brand-400 text-ink-900 hover:bg-brand-500"
        }`}
      >
        {isPending
          ? "Attendere..."
          : isRegistered
            ? "Annulla iscrizione"
            : isFull
              ? "Posti esauriti"
              : "Iscriviti all'evento"}
      </button>
      {message && <p className="mt-2 text-sm text-ink-600">{message}</p>}
    </div>
  );
}
