import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Il nostro impatto",
  description:
    "I traguardi raggiunti grazie a Il Sogno di Ale: progetti di ricerca finanziati, famiglie sostenute e iniziative realizzate.",
};

const milestones = [
  {
    year: "2019",
    title: "Nasce Il Sogno di Ale",
    description:
      "Un gruppo di famiglie e volontari fonda l'associazione in memoria di Ale, con l'obiettivo di sostenere la ricerca sul sarcoma di Ewing.",
  },
  {
    year: "2020",
    title: "Primo progetto di ricerca finanziato",
    description:
      "Grazie alla prima campagna di raccolta fondi, finanziamo la prima borsa di studio per un progetto di ricerca su nuove terapie mirate.",
  },
  {
    year: "2021",
    title: "Nasce il fondo di sostegno alle famiglie",
    description:
      "Attiviamo un fondo dedicato al supporto pratico delle famiglie durante il percorso di cura: trasporti, soggiorni vicino agli ospedali, supporto psicologico.",
  },
  {
    year: "2022",
    title: "Collaborazione con i centri di oncologia pediatrica",
    description:
      "Avviamo collaborazioni strutturate con reparti di oncologia pediatrica per finanziare progetti di ricerca clinica e traslazionale.",
  },
  {
    year: "2023",
    title: "Oltre 30 eventi organizzati",
    description:
      "Camminate, cene di beneficenza e mercatini solidali coinvolgono migliaia di persone in tutta Italia.",
  },
  {
    year: "2024",
    title: "Superata quota 250.000€ raccolti",
    description:
      "Il contributo costante di donatori, aziende e volontari ci permette di ampliare il numero di progetti sostenuti.",
  },
  {
    year: "2025",
    title: "Nuovo protocollo di ricerca internazionale",
    description:
      "Sosteniamo la partecipazione italiana a uno studio clinico internazionale multicentrico sul sarcoma di Ewing.",
  },
  {
    year: "2026",
    title: "60+ famiglie sostenute, 7 progetti di ricerca attivi",
    description:
      "Continuiamo a crescere insieme alla nostra comunità di sostenitori, con l'obiettivo di finanziare nuovi progetti ogni anno.",
  },
];

const impactNumbers = [
  { value: "€ 320.000+", label: "Fondi raccolti dal 2019" },
  { value: "7", label: "Progetti di ricerca finanziati" },
  { value: "60+", label: "Famiglie sostenute" },
  { value: "48", label: "Eventi ed iniziative organizzate" },
];

export default function ImpattoPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-ink-900">
        <Image
          src="https://picsum.photos/seed/ale-impatto-hero/1920/700"
          alt="Volontari e famiglie sostenute dalla fondazione"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="container-page relative py-20 text-white">
          <span className="rounded-full bg-brand-400 px-4 py-1 text-sm font-semibold text-ink-900">
            Risultati
          </span>
          <h1 className="mt-4 max-w-2xl text-4xl font-bold sm:text-5xl">
            I passi fatti grazie a voi
          </h1>
          <p className="mt-4 max-w-xl text-ink-100">
            Dal 2019 ad oggi, ogni donazione e ogni evento hanno contribuito a risultati
            concreti per la ricerca e per le famiglie che affrontano il sarcoma di Ewing.
          </p>
        </div>
      </section>

      <section className="border-b border-ink-100 bg-white">
        <div className="container-page grid grid-cols-2 gap-6 py-12 md:grid-cols-4">
          {impactNumbers.map((item) => (
            <div key={item.label} className="text-center">
              <p className="text-2xl font-bold text-ink-900 sm:text-3xl">{item.value}</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-ink-500 sm:text-sm">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-16">
        <SectionHeading
          eyebrow="Il nostro percorso"
          title="Una storia fatta di traguardi concreti"
          description="Dalla nascita della fondazione ad oggi, ecco le tappe principali del nostro cammino."
        />

        <ol className="mt-12 space-y-10 border-l border-ink-200 pl-8">
          {milestones.map((milestone) => (
            <li key={milestone.year} className="relative">
              <span className="absolute -left-[calc(2rem+5px)] top-1 flex h-3 w-3 -translate-x-1/2 items-center justify-center rounded-full bg-brand-500 ring-4 ring-brand-100" />
              <span className="text-sm font-semibold text-brand-600">{milestone.year}</span>
              <h3 className="mt-1 text-lg font-semibold text-ink-900">{milestone.title}</h3>
              <p className="mt-1 text-sm text-ink-600">{milestone.description}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
