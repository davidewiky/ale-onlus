import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/format";

export type EventSummary = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  location: string;
  startsAt: Date | string;
  coverImageUrl: string | null;
  registrationsCount?: number;
  capacity?: number | null;
};

export function EventCard({
  event,
  locked = false,
}: {
  event: EventSummary;
  locked?: boolean;
}) {
  const card = (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink-100">
        {event.coverImageUrl && (
          <Image
            src={event.coverImageUrl}
            alt={event.title}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className={`object-cover transition duration-300 ${locked ? "scale-105 blur-sm" : "group-hover:scale-105"}`}
          />
        )}
        {locked && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-ink-900/60 text-center text-white">
            <span aria-hidden className="text-2xl">🔒</span>
            <span className="px-4 text-sm font-medium">Accedi per vedere i dettagli</span>
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink-800">
          {formatDate(event.startsAt)}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="text-lg font-semibold text-ink-900">{event.title}</h3>
        <p className="text-sm text-ink-600">{locked ? "Dettagli riservati agli utenti registrati." : event.summary}</p>
        <div className="mt-auto flex items-center justify-between pt-3 text-xs text-ink-500">
          <span>{locked ? "•••••••" : event.location}</span>
          {!locked && (
            <span className="font-medium text-brand-700 transition group-hover:underline">
              Scopri di più →
            </span>
          )}
        </div>
      </div>
    </div>
  );

  if (locked) return card;

  return (
    <Link href={`/eventi/${event.slug}`} className="block h-full">
      {card}
    </Link>
  );
}
