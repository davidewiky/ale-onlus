import type { Metadata } from "next";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { formatDate } from "@/lib/format";
import { RoleToggle } from "@/app/admin/utenti/RoleToggle";

export const metadata: Metadata = { title: "Utenti" };

export default async function AdminUtentiPage() {
  const [session, users] = await Promise.all([
    auth(),
    db.user.findMany({
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { registrations: true } } },
    }),
  ]);

  return (
    <div>
      <h2 className="mb-6 text-lg font-semibold text-ink-900">Utenti registrati ({users.length})</h2>

      <div className="overflow-x-auto rounded-2xl border border-ink-100">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-ink-50 text-xs uppercase text-ink-500">
            <tr>
              <th className="px-4 py-3">Nome</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Iscrizioni</th>
              <th className="px-4 py-3">Registrato il</th>
              <th className="px-4 py-3">Ruolo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-3 font-medium text-ink-900">{user.name}</td>
                <td className="px-4 py-3 text-ink-600">{user.email}</td>
                <td className="px-4 py-3 text-ink-600">{user._count.registrations}</td>
                <td className="px-4 py-3 text-ink-500">{formatDate(user.createdAt)}</td>
                <td className="px-4 py-3">
                  <RoleToggle
                    userId={user.id}
                    role={user.role}
                    isCurrentUser={session?.user.id === user.id}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
