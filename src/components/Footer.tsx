import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-ink-100 bg-ink-900 text-ink-100">
      <div className="container-page grid gap-10 py-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-bold text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-400 text-ink-900">
              IS
            </span>
            Il Sogno di Ale
          </div>
          <p className="mt-3 text-sm text-ink-300">
            Onlus impegnata nella lotta contro il sarcoma di Ewing: sosteniamo la ricerca
            scientifica e le famiglie dei piccoli pazienti.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-200">
            Scopri
          </h3>
          <ul className="space-y-2 text-sm text-ink-300">
            <li><Link href="/la-malattia" className="hover:text-white">La malattia</Link></li>
            <li><Link href="/il-nostro-impatto" className="hover:text-white">Il nostro impatto</Link></li>
            <li><Link href="/eventi" className="hover:text-white">Eventi e iniziative</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-200">
            Partecipa
          </h3>
          <ul className="space-y-2 text-sm text-ink-300">
            <li><Link href="/registrati" className="hover:text-white">Crea un account</Link></li>
            <li><Link href="/login" className="hover:text-white">Accedi</Link></li>
            <li><Link href="/dona" className="hover:text-white">Dona ora</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-200">
            Contatti
          </h3>
          <ul className="space-y-2 text-sm text-ink-300">
            <li>info@ilsognodiale.it</li>
            <li>+39 02 0000 0000</li>
            <li>Via della Speranza 1, Milano</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-800 py-6 text-center text-xs text-ink-400">
        © {new Date().getFullYear()} Il Sogno di Ale ONLUS · P.IVA/CF 00000000000 · Tutti i
        diritti riservati
      </div>
    </footer>
  );
}
