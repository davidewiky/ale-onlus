"use client";

import { useActionState } from "react";
import type { EventFormState } from "@/app/admin/eventi/actions";

type EventFormValues = {
  title: string;
  summary: string;
  description: string;
  location: string;
  coverImageUrl: string;
  startsAt: string;
  endsAt: string;
  capacity: string;
  published: boolean;
};

const emptyValues: EventFormValues = {
  title: "",
  summary: "",
  description: "",
  location: "",
  coverImageUrl: "",
  startsAt: "",
  endsAt: "",
  capacity: "",
  published: true,
};

function toDatetimeLocal(date?: Date | string | null): string {
  if (!date) return "";
  const d = new Date(date);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function EventForm({
  action,
  initialValues,
  submitLabel,
}: {
  action: (prevState: EventFormState, formData: FormData) => Promise<EventFormState>;
  initialValues?: Partial<{
    title: string;
    summary: string;
    description: string;
    location: string;
    coverImageUrl: string | null;
    startsAt: Date | string;
    endsAt: Date | string | null;
    capacity: number | null;
    published: boolean;
  }>;
  submitLabel: string;
}) {
  const [state, formAction, isPending] = useActionState(action, { status: "idle" });

  const values: EventFormValues = {
    ...emptyValues,
    ...(initialValues
      ? {
          title: initialValues.title ?? "",
          summary: initialValues.summary ?? "",
          description: initialValues.description ?? "",
          location: initialValues.location ?? "",
          coverImageUrl: initialValues.coverImageUrl ?? "",
          startsAt: toDatetimeLocal(initialValues.startsAt),
          endsAt: toDatetimeLocal(initialValues.endsAt),
          capacity: initialValues.capacity != null ? String(initialValues.capacity) : "",
          published: initialValues.published ?? true,
        }
      : {}),
  };

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label htmlFor="title" className="mb-1 block text-sm font-medium text-ink-800">
          Titolo
        </label>
        <input
          id="title"
          name="title"
          required
          defaultValue={values.title}
          className="w-full rounded-lg border border-ink-200 px-4 py-2.5 text-sm outline-none focus:border-ink-500"
        />
      </div>

      <div>
        <label htmlFor="summary" className="mb-1 block text-sm font-medium text-ink-800">
          Riassunto breve
        </label>
        <input
          id="summary"
          name="summary"
          required
          defaultValue={values.summary}
          placeholder="Mostrato nelle card e negli elenchi"
          className="w-full rounded-lg border border-ink-200 px-4 py-2.5 text-sm outline-none focus:border-ink-500"
        />
      </div>

      <div>
        <label htmlFor="description" className="mb-1 block text-sm font-medium text-ink-800">
          Descrizione completa
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={6}
          defaultValue={values.description}
          className="w-full rounded-lg border border-ink-200 px-4 py-2.5 text-sm outline-none focus:border-ink-500"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="location" className="mb-1 block text-sm font-medium text-ink-800">
            Luogo
          </label>
          <input
            id="location"
            name="location"
            required
            defaultValue={values.location}
            className="w-full rounded-lg border border-ink-200 px-4 py-2.5 text-sm outline-none focus:border-ink-500"
          />
        </div>
        <div>
          <label htmlFor="coverImageUrl" className="mb-1 block text-sm font-medium text-ink-800">
            URL immagine di copertina
          </label>
          <input
            id="coverImageUrl"
            name="coverImageUrl"
            type="url"
            placeholder="https://..."
            defaultValue={values.coverImageUrl}
            className="w-full rounded-lg border border-ink-200 px-4 py-2.5 text-sm outline-none focus:border-ink-500"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label htmlFor="startsAt" className="mb-1 block text-sm font-medium text-ink-800">
            Data e ora inizio
          </label>
          <input
            id="startsAt"
            name="startsAt"
            type="datetime-local"
            required
            defaultValue={values.startsAt}
            className="w-full rounded-lg border border-ink-200 px-4 py-2.5 text-sm outline-none focus:border-ink-500"
          />
        </div>
        <div>
          <label htmlFor="endsAt" className="mb-1 block text-sm font-medium text-ink-800">
            Data e ora fine (opz.)
          </label>
          <input
            id="endsAt"
            name="endsAt"
            type="datetime-local"
            defaultValue={values.endsAt}
            className="w-full rounded-lg border border-ink-200 px-4 py-2.5 text-sm outline-none focus:border-ink-500"
          />
        </div>
        <div>
          <label htmlFor="capacity" className="mb-1 block text-sm font-medium text-ink-800">
            Posti disponibili (opz.)
          </label>
          <input
            id="capacity"
            name="capacity"
            type="number"
            min={1}
            defaultValue={values.capacity}
            className="w-full rounded-lg border border-ink-200 px-4 py-2.5 text-sm outline-none focus:border-ink-500"
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm font-medium text-ink-800">
        <input type="checkbox" name="published" defaultChecked={values.published} className="h-4 w-4" />
        Pubblicato (visibile agli utenti)
      </label>

      {state.status === "error" && <p className="text-sm text-red-600">{state.message}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-full bg-ink-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-ink-800 disabled:opacity-60"
      >
        {isPending ? "Salvataggio..." : submitLabel}
      </button>
    </form>
  );
}
