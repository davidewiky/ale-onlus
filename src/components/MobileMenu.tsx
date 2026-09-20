"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

type NavLink = { href: string; label: string };

export function MobileMenu({
  navLinks,
  isAuthenticated,
  isAdmin,
  userName,
}: {
  navLinks: NavLink[];
  isAuthenticated: boolean;
  isAdmin: boolean;
  userName?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Chiudi menu" : "Apri menu"}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-ink-200 text-ink-700"
      >
        {open ? "✕" : "☰"}
      </button>

      {open && (
        <div className="absolute inset-x-0 top-16 border-b border-ink-100 bg-white px-5 py-4 shadow-lg">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-ink-700"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/dona" onClick={() => setOpen(false)} className="text-base font-medium text-brand-600">
              Dona ora
            </Link>
            <div className="mt-2 flex flex-col gap-3 border-t border-ink-100 pt-4">
              {isAuthenticated ? (
                <>
                  {isAdmin && (
                    <Link href="/admin" onClick={() => setOpen(false)} className="text-base font-medium text-ink-700">
                      Admin
                    </Link>
                  )}
                  {userName && <span className="text-sm text-ink-500">Ciao, {userName}</span>}
                  <button
                    type="button"
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="rounded-full border border-ink-200 px-4 py-2 text-sm font-medium text-ink-700"
                  >
                    Esci
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="rounded-full border border-ink-200 px-4 py-2 text-center text-sm font-medium text-ink-700"
                  >
                    Accedi
                  </Link>
                  <Link
                    href="/registrati"
                    onClick={() => setOpen(false)}
                    className="rounded-full bg-ink-900 px-4 py-2 text-center text-sm font-semibold text-white"
                  >
                    Registrati
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
