import Link from "next/link";
import { auth } from "@/auth";
import { SignOutButton } from "@/components/SignOutButton";
import { MobileMenu } from "@/components/MobileMenu";

const navLinks = [
  { href: "/la-malattia", label: "La malattia" },
  { href: "/il-nostro-impatto", label: "Il nostro impatto" },
  { href: "/eventi", label: "Eventi" },
];

export async function Navbar() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 border-b border-ink-100 bg-white/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-ink-900">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-400 text-ink-900">
            IS
          </span>
          <span className="hidden sm:inline">Il Sogno di Ale</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-600 transition hover:text-ink-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {session?.user ? (
            <>
              {session.user.role === "ADMIN" && (
                <Link
                  href="/admin"
                  className="text-sm font-medium text-ink-600 transition hover:text-ink-900"
                >
                  Admin
                </Link>
              )}
              <span className="text-sm text-ink-500">Ciao, {session.user.name}</span>
              <SignOutButton className="rounded-full border border-ink-200 px-4 py-1.5 text-sm font-medium text-ink-700 transition hover:border-ink-400" />
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-ink-600 transition hover:text-ink-900"
              >
                Accedi
              </Link>
              <Link
                href="/registrati"
                className="rounded-full bg-ink-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-ink-800"
              >
                Registrati
              </Link>
            </>
          )}
          <Link
            href="/dona"
            className="rounded-full bg-brand-400 px-4 py-2 text-sm font-semibold text-ink-900 transition hover:bg-brand-500"
          >
            Dona ora
          </Link>
        </div>

        <MobileMenu
          navLinks={navLinks}
          isAuthenticated={Boolean(session?.user)}
          isAdmin={session?.user.role === "ADMIN"}
          userName={session?.user.name ?? undefined}
        />
      </div>
    </header>
  );
}
