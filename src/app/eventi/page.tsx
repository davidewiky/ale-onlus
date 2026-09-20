import type { Metadata } from "next";
import { db } from "@/lib/db";
import { requireSession } from "@/lib/guards";
import { SectionHeading } from "@/components/SectionHeading";
import { EventCard } from "@/components/EventCard";

export const metadata: Metadata = {
  title: "Eventi e iniziative",
  description: "Scopri e iscriviti ai prossimi eventi organizzati da Il Sogno di Ale.",
};

export default async function EventiPage() {
  await requireSession();

  const now = new Date();
  const [upcomingEvents, pastEvents] = await Promise.all([
    db.event.findMany({
      where: { published: true, startsAt: { gte: now } },
      orderBy: { startsAt: "asc" },
    }),
    db.event.findMany({
      where: { published: true, startsAt: { lt: now } },
      orderBy: { startsAt: "desc" },
      take: 6,
    }),
  ]);

  return (
    <div className="container-page py-16">
      <SectionHeading
        eyebrow="Eventi e iniziative"
        title="Partecipa alle nostre iniziative"
        description="Camminate, cene di beneficenza, mercatini e convegni: scegli l'evento a cui vuoi partecipare e iscriviti in pochi click."
      />

      <div className="mt-10">
        <h2 className="text-xl font-semibold text-ink-900">Prossimi eventi</h2>
        {upcomingEvents.length > 0 ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <p className="mt-4 text-ink-500">Nessun evento in programma al momento.</p>
        )}
      </div>

      {pastEvents.length > 0 && (
        <div className="mt-16">
          <h2 className="text-xl font-semibold text-ink-900">Eventi passati</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pastEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
