"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/eventi", label: "Eventi" },
  { href: "/admin/iscrizioni", label: "Iscrizioni" },
  { href: "/admin/utenti", label: "Utenti" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-2 overflow-x-auto border-b border-ink-100 pb-3 md:w-56 md:flex-col md:border-b-0 md:border-r md:pb-0 md:pr-4">
      {links.map((link) => {
        const isActive = link.exact ? pathname === link.href : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition ${
              isActive ? "bg-ink-900 text-white" : "text-ink-600 hover:bg-ink-100"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
