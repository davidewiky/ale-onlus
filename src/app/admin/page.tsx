import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { formatDateTime } from "@/lib/format";

export const metadata: Metadata = { title: "Dashboard admin" };

export default async function AdminDashboardPage() {
  const [userCount, eventCount, registrationCount, upcomingEvents] = await Promise.all([
    db.user.count(),
    db.event.count(),
    db.registration.count({ where: { status: "CONFIRMED" } }),
    db.event.findMany({
      where: { startsAt: { gte: new Date() } },
      orderBy: { startsAt: "asc" },
      take: 5,
      include: { _count: { select: { registrations: { where: { status: "CONFIRMED" } } } } },
    }),
  ]);

  const stats = [
    { label: "Utenti registrati", value: userCount },
    { label: "Eventi totali", value: eventCount },
    { label: "Iscrizioni confermate", value: registrationCount },
  ];

  return (
    <div className="space-y-10">
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-ink-100 bg-white p-6">
            <p className="text-3xl font-bold text-ink-900">{stat.value}</p>
            <p className="mt-1 text-sm text-ink-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ink-900">Prossimi eventi</h2>
          <Link href="/admin/eventi" className="text-sm font-medium text-brand-700 hover:underline">
            Gestisci tutti gli eventi →
          </Link>
        </div>
        {upcomingEvents.length === 0 ? (
          <p className="text-sm text-ink-500">Nessun evento in programma.</p>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-ink-100">
            <table className="w-full text-left text-sm">
              <thead className="bg-ink-50 text-xs uppercase text-ink-500">
                <tr>
                  <th className="px-4 py-3">Evento</th>
                  <th className="px-4 py-3">Data</th>
                  <th className="px-4 py-3">Iscritti</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {upcomingEvents.map((event) => (
                  <tr key={event.id}>
                    <td className="px-4 py-3 font-medium text-ink-900">
                      <Link href={`/admin/eventi/${event.id}`} className="hover:underline">
                        {event.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-ink-600">{formatDateTime(event.startsAt)}</td>
                    <td className="px-4 py-3 text-ink-600">
                      {event._count.registrations}
                      {event.capacity ? ` / ${event.capacity}` : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
