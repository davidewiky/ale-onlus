"use client";

import { useState, useTransition } from "react";
import { setUserRole } from "@/app/admin/utenti/actions";

export function RoleToggle({
  userId,
  role,
  isCurrentUser,
}: {
  userId: string;
  role: "USER" | "ADMIN";
  isCurrentUser: boolean;
}) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleChange(nextRole: "USER" | "ADMIN") {
    setError(null);
    startTransition(async () => {
      try {
        await setUserRole(userId, nextRole);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Errore durante l'aggiornamento.");
      }
    });
  }

  return (
    <div>
      <select
        value={role}
        disabled={isPending || isCurrentUser}
        onChange={(e) => handleChange(e.target.value as "USER" | "ADMIN")}
        className="rounded-lg border border-ink-200 px-3 py-1.5 text-sm disabled:opacity-60"
      >
        <option value="USER">Utente</option>
        <option value="ADMIN">Amministratore</option>
      </select>
      {isCurrentUser && <p className="mt-1 text-xs text-ink-400">Non puoi modificare il tuo ruolo</p>}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
