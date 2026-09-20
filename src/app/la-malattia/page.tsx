import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "La malattia",
  description:
    "Cos'è il sarcoma di Ewing, chi colpisce, come si manifesta e come si cura: una guida informativa a cura de Il Sogno di Ale.",
};

const faqs = [
  {
    question: "Chi colpisce il sarcoma di Ewing?",
    answer:
      "Colpisce prevalentemente bambini, adolescenti e giovani adulti, con un picco di incidenza tra i 10 e i 20 anni. È leggermente più frequente nei maschi.",
  },
  {
    question: "Quali sono i sintomi più comuni?",
    answer:
      "Dolore osseo persistente, gonfiore o tumefazione nella zona colpita, febbre non spiegata e, in alcuni casi, una frattura ossea senza trauma apparente. I sintomi possono essere facilmente confusi con quelli di traumi sportivi, motivo per cui la diagnosi richiede attenzione specialistica.",
  },
  {
    question: "Come si diagnostica?",
    answer:
      "La diagnosi si basa su esami di imaging (radiografia, risonanza magnetica, TAC, PET) seguiti da una biopsia del tessuto per la conferma istologica e le analisi molecolari.",
  },
  {
    question: "Quali sono le terapie disponibili?",
    answer:
      "Il trattamento standard combina chemioterapia, chirurgia e, quando necessario, radioterapia, in un percorso multidisciplinare che può durare diversi mesi. La ricerca sta esplorando nuove terapie mirate e immunoterapie.",
  },
];

export default function LaMalattiaPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-ink-900">
        <Image
          src="https://picsum.photos/seed/ale-malattia-hero/1920/700"
          alt="Ricerca scientifica in laboratorio"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="container-page relative py-20 text-white">
          <span className="rounded-full bg-brand-400 px-4 py-1 text-sm font-semibold text-ink-900">
            Informazione
          </span>
          <h1 className="mt-4 max-w-2xl text-4xl font-bold sm:text-5xl">
            Cos&apos;è il sarcoma di Ewing
          </h1>
          <p className="mt-4 max-w-xl text-ink-100">
            Conoscere la malattia è il primo passo per sostenere chi la affronta: pazienti,
            famiglie e la comunità scientifica che ogni giorno lavora per sconfiggerla.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
          <article className="prose-content max-w-none">
            <h2>Una malattia rara, un impegno concreto</h2>
            <p>
              Il sarcoma di Ewing è un tumore raro e aggressivo che origina nel tessuto osseo o,
              più raramente, nei tessuti molli. Prende il nome dal medico James Ewing, che lo
              descrisse per la prima volta nel 1921. È il secondo tumore osseo maligno più
              frequente in età pediatrica e adolescenziale, dopo l&apos;osteosarcoma, ma resta
              comunque una malattia rara nel panorama oncologico complessivo.
            </p>
            <p>
              Le sedi più colpite sono le ossa lunghe (femore, tibia, omero), il bacino e le
              costole, ma può insorgere anche in altre localizzazioni. Proprio per la sua
              rarità e per la sovrapposizione dei sintomi con condizioni comuni in età
              pediatrica, la diagnosi richiede spesso il coinvolgimento di centri specializzati
              in oncologia pediatrica.
            </p>

            <h2>Il percorso di cura</h2>
            <p>
              Il trattamento è multidisciplinare e coinvolge oncologi, chirurghi ortopedici,
              radioterapisti e team di supporto psicologico e riabilitativo. Il percorso
              tipico prevede:
            </p>
            <ul>
              <li>Chemioterapia neoadiuvante, per ridurre la massa tumorale prima dell&apos;intervento</li>
              <li>Chirurgia conservativa o, nei casi più complessi, demolitiva</li>
              <li>Radioterapia, quando indicata, per completare il trattamento locale</li>
              <li>Chemioterapia adiuvante e follow-up a lungo termine</li>
            </ul>
            <p>
              Negli ultimi decenni i progressi della ricerca hanno migliorato in modo
              significativo le prospettive di cura, soprattutto nelle forme localizzate.
              Restano tuttavia sfide aperte per le forme metastatiche o recidivanti, a cui la
              ricerca scientifica sostenuta da realtà come la nostra continua a dedicare
              energie e risorse.
            </p>

            <h2>Perché la ricerca fa la differenza</h2>
            <p>
              Ogni progetto di ricerca finanziato da Il Sogno di Ale contribuisce a
              comprendere meglio i meccanismi biologici della malattia, a identificare nuovi
              bersagli terapeutici e a migliorare la qualità di vita dei pazienti durante e
              dopo le cure. Il nostro impegno non si ferma alla ricerca: sosteniamo anche le
              famiglie nel percorso di cura, spesso lungo e complesso, sia dal punto di vista
              pratico che emotivo.
            </p>
          </article>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-ink-100 bg-ink-50 p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-500">
                In breve
              </h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="font-medium text-ink-900">Età più colpita</dt>
                  <dd className="text-ink-600">10-20 anni</dd>
                </div>
                <div>
                  <dt className="font-medium text-ink-900">Sedi più frequenti</dt>
                  <dd className="text-ink-600">Ossa lunghe, bacino, costole</dd>
                </div>
                <div>
                  <dt className="font-medium text-ink-900">Approccio terapeutico</dt>
                  <dd className="text-ink-600">Chemioterapia, chirurgia, radioterapia</dd>
                </div>
              </dl>
            </div>
            <div className="rounded-2xl border border-brand-200 bg-brand-50 p-6 text-sm text-ink-700">
              Le informazioni riportate hanno finalità divulgativa e non sostituiscono il
              parere di uno specialista. Per qualsiasi dubbio medico, rivolgiti a un centro di
              oncologia pediatrica di riferimento.
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-ink-50">
        <div className="container-page py-16">
          <SectionHeading eyebrow="Domande frequenti" title="Le domande più comuni" />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-ink-100 bg-white p-6">
                <h3 className="text-base font-semibold text-ink-900">{faq.question}</h3>
                <p className="mt-2 text-sm text-ink-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
