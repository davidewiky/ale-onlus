import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Dona ora",
  description: "Sostieni la ricerca sul sarcoma di Ewing con una donazione a Il Sogno di Ale.",
};

const donationMethods = [
  {
    title: "Bonifico bancario",
    detail: "IT00 A000 0000 0000 0000 0000 000 — Il Sogno di Ale ONLUS",
  },
  {
    title: "5x1000",
    detail: "Codice fiscale 00000000000 — nessun costo aggiuntivo per te",
  },
  {
    title: "Donazione online",
    detail: "Il sistema di pagamento online sarà disponibile a breve.",
  },
];

export default function DonaPage() {
  return (
    <div className="container-page py-16">
      <SectionHeading
        eyebrow="Sostienici"
        title="Dona ora"
        description="Ogni euro raccolto finanzia la ricerca scientifica sul sarcoma di Ewing e il sostegno concreto alle famiglie dei piccoli pazienti."
      />
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {donationMethods.map((method) => (
          <div key={method.title} className="rounded-2xl border border-ink-100 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-ink-900">{method.title}</h3>
            <p className="mt-2 text-sm text-ink-600">{method.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
