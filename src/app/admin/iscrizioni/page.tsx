import type { Metadata } from "next";
import { db } from "@/lib/db";
import { formatDateTime } from "@/lib/format";

export const metadata: Metadata = { title: "Iscrizioni" };

export default async function AdminIscrizioniPage() {
  const registrations = await db.registration.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true, email: true } },
      event: { select: { title: true, startsAt: true } },
    },
    take: 200,
  });

  return (
    <div>
      <h2 className="mb-6 text-lg font-semibold text-ink-900">
        Iscrizioni agli eventi ({registrations.length})
      </h2>

      <div className="overflow-x-auto rounded-2xl border border-ink-100">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-ink-50 text-xs uppercase text-ink-500">
            <tr>
              <th className="px-4 py-3">Utente</th>
              <th className="px-4 py-3">Evento</th>
              <th className="px-4 py-3">Data evento</th>
              <th className="px-4 py-3">Stato</th>
              <th className="px-4 py-3">Iscritto il</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {registrations.map((registration) => (
              <tr key={registration.id}>
                <td className="px-4 py-3">
                  <div className="font-medium text-ink-900">{registration.user.name}</div>
                  <div className="text-xs text-ink-500">{registration.user.email}</div>
                </td>
                <td className="px-4 py-3 text-ink-700">{registration.event.title}</td>
                <td className="px-4 py-3 text-ink-600">
                  {formatDateTime(registration.event.startsAt)}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      registration.status === "CONFIRMED"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {registration.status === "CONFIRMED" ? "Confermata" : "Annullata"}
                  </span>
                </td>
                <td className="px-4 py-3 text-ink-500">{formatDateTime(registration.createdAt)}</td>
              </tr>
            ))}
            {registrations.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-ink-500">
                  Nessuna iscrizione ancora registrata.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
