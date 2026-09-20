import "server-only";
import { auth } from "@/auth";
import type { Session } from "next-auth";

export class UnauthorizedError extends Error {
  constructor() {
    super("Non autenticato");
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends Error {
  constructor() {
    super("Permessi insufficienti");
    this.name = "ForbiddenError";
  }
}

export async function requireSession(): Promise<Session> {
  const session = await auth();
  if (!session?.user) throw new UnauthorizedError();
  return session;
}

export async function requireAdmin(): Promise<Session> {
  const session = await requireSession();
  if (session.user.role !== "ADMIN") throw new ForbiddenError();
  return session;
}
