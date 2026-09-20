import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { requireSession } from "@/lib/guards";
import { formatDateTime } from "@/lib/format";
import { RegisterButton } from "@/app/eventi/RegisterButton";

type Props = { params: Promise<{ slug: string }> };

async function getEvent(slug: string) {
  return db.event.findUnique({
    where: { slug },
    include: {
      _count: { select: { registrations: { where: { status: "CONFIRMED" } } } },
    },
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) return { title: "Evento non trovato" };
  return { title: event.title, description: event.summary };
}

export default async function EventoDettaglioPage({ params }: Props) {
  const session = await requireSession();
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event || !event.published) notFound();

  const myRegistration = await db.registration.findUnique({
    where: { userId_eventId: { userId: session.user.id, eventId: event.id } },
  });
  const isRegistered = myRegistration?.status === "CONFIRMED";
  const isFull = Boolean(event.capacity && event._count.registrations >= event.capacity);
  const isPast = event.startsAt < new Date();

  return (
    <div>
      <section className="relative overflow-hidden bg-ink-900">
        {event.coverImageUrl && (
          <Image
            src={event.coverImageUrl}
            alt={event.title}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40"
          />
        )}
        <div className="container-page relative py-20 text-white">
          <Link href="/eventi" className="text-sm text-ink-200 hover:text-white">
            ← Torna agli eventi
          </Link>
          <h1 className="mt-4 max-w-2xl text-4xl font-bold sm:text-5xl">{event.title}</h1>
          <p className="mt-4 max-w-xl text-ink-100">{event.summary}</p>
        </div>
      </section>

      <section className="container-page grid gap-12 py-16 lg:grid-cols-[2fr_1fr]">
        <article className="prose-content max-w-none">
          <h2>Descrizione</h2>
          <p>{event.description}</p>
        </article>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-ink-100 bg-ink-50 p-6">
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="font-medium text-ink-900">Data e ora</dt>
                <dd className="text-ink-600">{formatDateTime(event.startsAt)}</dd>
              </div>
              <div>
                <dt className="font-medium text-ink-900">Luogo</dt>
                <dd className="text-ink-600">{event.location}</dd>
              </div>
              <div>
                <dt className="font-medium text-ink-900">Iscritti</dt>
                <dd className="text-ink-600">
                  {event._count.registrations}
                  {event.capacity ? ` / ${event.capacity}` : ""} partecipanti
                </dd>
              </div>
            </dl>
          </div>

          {isPast ? (
            <p className="rounded-2xl border border-ink-100 bg-white p-6 text-sm text-ink-500">
              Questo evento si è già svolto.
            </p>
          ) : (
            <RegisterButton
              eventId={event.id}
              eventSlug={event.slug}
              initiallyRegistered={isRegistered}
              isFull={isFull}
            />
          )}
        </aside>
      </section>
    </div>
  );
}
