import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { SectionHeading } from "@/components/SectionHeading";
import { VideoPlaceholder } from "@/components/VideoPlaceholder";
import { EventCard } from "@/components/EventCard";

const stats = [
  { label: "Raccolti per la ricerca", value: "€ 320.000+" },
  { label: "Eventi organizzati", value: "48" },
  { label: "Famiglie sostenute", value: "60+" },
  { label: "Progetti di ricerca finanziati", value: "7" },
];

const galleryImages = [
  { seed: "ale-gallery-1", alt: "Volontari alla camminata solidale" },
  { seed: "ale-gallery-2", alt: "Bambini durante un laboratorio creativo" },
  { seed: "ale-gallery-3", alt: "Cena di beneficenza della fondazione" },
  { seed: "ale-gallery-4", alt: "Squadra di volontari con le magliette dell'associazione" },
];

export default async function HomePage() {
  const session = await auth();
  const isAuthenticated = Boolean(session?.user);

  const upcomingEvents = await db.event.findMany({
    where: { published: true, startsAt: { gte: new Date() } },
    orderBy: { startsAt: "asc" },
    take: 3,
  });

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink-900">
        <Image
          src="https://picsum.photos/seed/ale-hero/1920/1080"
          alt="Bambini e volontari de Il Sogno di Ale"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/70 to-ink-900/30" />
        <div className="container-page relative flex flex-col items-start gap-6 py-28 sm:py-36">
          <span className="rounded-full bg-brand-400 px-4 py-1 text-sm font-semibold text-ink-900">
            Onlus · Insieme è possibile
          </span>
          <h1 className="max-w-2xl text-4xl font-bold leading-tight text-white sm:text-5xl">
            Il Sogno di Ale: insieme contro il sarcoma di Ewing
          </h1>
          <p className="max-w-xl text-lg text-ink-100">
            Sosteniamo la ricerca scientifica, le famiglie e i piccoli pazienti colpiti dal
            sarcoma di Ewing attraverso eventi, iniziative e il contributo di chi crede, come
            noi, in un futuro senza questa malattia.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/dona"
              className="rounded-full bg-brand-400 px-6 py-3 text-sm font-semibold text-ink-900 transition hover:bg-brand-500"
            >
              Dona ora
            </Link>
            <Link
              href="/la-malattia"
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Scopri di più
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-ink-100 bg-white">
        <div className="container-page grid grid-cols-2 gap-6 py-12 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-ink-900 sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-ink-500 sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* La nostra storia + video mock */}
      <section className="container-page grid gap-10 py-20 md:grid-cols-2 md:items-center">
        <div>
          <SectionHeading
            eyebrow="La nostra storia"
            title="Il sogno di Ale continua a vivere"
            description="Ale amava sognare in grande. La sua famiglia ha trasformato il dolore in un impegno concreto: sostenere chi oggi combatte la stessa battaglia. Guarda la nostra storia."
          />
          <ul className="prose-content mt-6">
            <li>Fondazione nata nel 2019 da un gruppo di famiglie e volontari</li>
            <li>Collaborazione con centri di oncologia pediatrica in tutta Italia</li>
            <li>100% del ricavato degli eventi destinato a ricerca e sostegno alle famiglie</li>
          </ul>
        </div>
        <VideoPlaceholder label="La storia de Il Sogno di Ale" />
      </section>

      {/* Teaser malattia */}
      <section className="bg-ink-50">
        <div className="container-page grid gap-10 py-20 md:grid-cols-2 md:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="https://picsum.photos/seed/ale-malattia/900/700"
              alt="Ricerca scientifica sul sarcoma di Ewing"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="Informazione"
              title="Cos'è il sarcoma di Ewing?"
              description="Un tumore osseo raro che colpisce soprattutto bambini e adolescenti. Conoscerlo è il primo passo per sostenere chi lo affronta ogni giorno."
            />
            <Link
              href="/la-malattia"
              className="mt-6 inline-block rounded-full bg-ink-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-ink-800"
            >
              Scopri di più sulla malattia
            </Link>
          </div>
        </div>
      </section>

      {/* Teaser impatto */}
      <section className="container-page py-20">
        <SectionHeading
          eyebrow="Risultati"
          title="I passi fatti grazie a voi"
          description="Ogni evento, ogni donazione, ogni volontario ha contribuito a risultati concreti."
          align="center"
        />
        <div className="mt-10 text-center">
          <Link
            href="/il-nostro-impatto"
            className="inline-block rounded-full border border-ink-300 px-6 py-3 text-sm font-semibold text-ink-800 transition hover:border-ink-500"
          >
            Guarda tutti i traguardi raggiunti
          </Link>
        </div>
      </section>

      {/* Eventi */}
      <section className="bg-ink-50">
        <div className="container-page py-20">
          <SectionHeading
            eyebrow="Eventi e iniziative"
            title="Partecipa ai nostri prossimi eventi"
            description={
              isAuthenticated
                ? "Ecco i prossimi appuntamenti: scopri i dettagli e iscriviti."
                : "Accedi con il tuo account per scoprire i dettagli e iscriverti ai nostri eventi."
            }
          />
          {upcomingEvents.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} locked={!isAuthenticated} />
              ))}
            </div>
          ) : (
            <p className="mt-10 text-ink-500">
              Nessun evento in programma al momento: torna presto a trovarci!
            </p>
          )}
          <div className="mt-10">
            <Link
              href={isAuthenticated ? "/eventi" : "/login?callbackUrl=/eventi"}
              className="inline-block rounded-full bg-brand-400 px-6 py-3 text-sm font-semibold text-ink-900 transition hover:bg-brand-500"
            >
              {isAuthenticated ? "Vai alla sezione eventi" : "Accedi per vedere tutti gli eventi"}
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery mock */}
      <section className="container-page py-20">
        <SectionHeading eyebrow="Momenti" title="Gli scatti delle nostre iniziative" align="center" />
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {galleryImages.map((image) => (
            <div key={image.seed} className="relative aspect-square overflow-hidden rounded-xl">
              <Image
                src={`https://picsum.photos/seed/${image.seed}/500/500`}
                alt={image.alt}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover transition duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-xs text-ink-400">
          Foto segnaposto — verranno sostituite con gli scatti ufficiali della fondazione.
        </p>
      </section>

      {/* CTA finale */}
      <section className="bg-ink-900">
        <div className="container-page flex flex-col items-center gap-6 py-20 text-center">
          <h2 className="max-w-2xl text-3xl font-bold text-white sm:text-4xl">
            Ogni contributo avvicina la cura
          </h2>
          <p className="max-w-xl text-ink-200">
            Che sia una donazione, la partecipazione a un evento o il tuo tempo come volontario,
            ogni gesto conta per Il Sogno di Ale.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/dona"
              className="rounded-full bg-brand-400 px-6 py-3 text-sm font-semibold text-ink-900 transition hover:bg-brand-500"
            >
              Dona ora
            </Link>
            <Link
              href="/registrati"
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Crea un account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
