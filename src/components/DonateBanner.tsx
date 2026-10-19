"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Link di donazione PayPal (es. https://www.paypal.com/donate/?hosted_button_id=XXXX).
// Il valore è incorporato in fase di build: se manca, il banner porta a /dona.
const PAYPAL_DONATE_URL = process.env.NEXT_PUBLIC_PAYPAL_DONATE_URL;

export function DonateBanner() {
  const pathname = usePathname();

  // Nessun banner nel pannello di amministrazione.
  if (pathname.startsWith("/admin")) return null;

  const buttonClasses =
    "inline-flex items-center justify-center rounded-full bg-brand-400 px-4 py-2 text-sm font-semibold text-ink-900 transition hover:bg-brand-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white";

  return (
    <aside
      aria-label="Sostieni Il Sogno di Ale"
      className="fixed bottom-4 right-4 z-50 w-[calc(100vw-2rem)] max-w-xs rounded-2xl border border-white/10 bg-ink-900 p-4 text-white shadow-xl sm:bottom-6 sm:right-6"
    >
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-400 text-ink-900"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            <path d="M12 21s-7.5-4.6-9.6-9.3C.9 8.2 2.8 4.5 6.4 4.5c2 0 3.5 1 4.3 2.4.5.8 1.1.8 1.6 0 .8-1.4 2.3-2.4 4.3-2.4 3.6 0 5.5 3.7 4 7.2C19.5 16.4 12 21 12 21z" />
          </svg>
        </span>
        <div>
          <p className="text-sm font-semibold leading-snug">Aiutaci a sconfiggere il sarcoma di Ewing</p>
          <p className="mt-0.5 text-xs text-ink-300">Ogni donazione finanzia la ricerca.</p>
        </div>
      </div>

      <div className="mt-3">
        {PAYPAL_DONATE_URL ? (
          <a
            href={PAYPAL_DONATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`${buttonClasses} w-full`}
          >
            Dona con PayPal
          </a>
        ) : (
          <Link href="/dona" className={`${buttonClasses} w-full`}>
            Dona ora
          </Link>
        )}
      </div>
    </aside>
  );
}
