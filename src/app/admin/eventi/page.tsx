import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { formatDateTime } from "@/lib/format";

export const metadata: Metadata = { title: "Gestione eventi" };

export default async function AdminEventiPage() {
  const events = await db.event.findMany({
    orderBy: { startsAt: "desc" },
    include: { _count: { select: { registrations: { where: { status: "CONFIRMED" } } } } },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-ink-900">Eventi ({events.length})</h2>
        <Link
          href="/admin/eventi/nuovo"
          className="rounded-full bg-brand-400 px-4 py-2 text-sm font-semibold text-ink-900 hover:bg-brand-500"
        >
          + Nuovo evento
        </Link>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-ink-100">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-ink-50 text-xs uppercase text-ink-500">
            <tr>
              <th className="px-4 py-3">Titolo</th>
              <th className="px-4 py-3">Data</th>
              <th className="px-4 py-3">Stato</th>
              <th className="px-4 py-3">Iscritti</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {events.map((event) => (
              <tr key={event.id}>
                <td className="px-4 py-3 font-medium text-ink-900">{event.title}</td>
                <td className="px-4 py-3 text-ink-600">{formatDateTime(event.startsAt)}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      event.published ? "bg-green-100 text-green-700" : "bg-ink-100 text-ink-500"
                    }`}
                  >
                    {event.published ? "Pubblicato" : "Bozza"}
                  </span>
                </td>
                <td className="px-4 py-3 text-ink-600">
                  {event._count.registrations}
                  {event.capacity ? ` / ${event.capacity}` : ""}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/eventi/${event.id}`}
                    className="font-medium text-brand-700 hover:underline"
                  >
                    Modifica
                  </Link>
                </td>
              </tr>
            ))}
            {events.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-ink-500">
                  Nessun evento ancora creato.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
