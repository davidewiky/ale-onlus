import type { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "@/app/registrati/RegisterForm";

export const metadata: Metadata = {
  title: "Registrati",
  description: "Crea un account per iscriverti agli eventi de Il Sogno di Ale.",
};

export default function RegistratiPage() {
  return (
    <div className="container-page flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-md rounded-2xl border border-ink-100 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-ink-900">Crea un account</h1>
        <p className="mt-1 text-sm text-ink-500">
          Registrati per accedere alla sezione eventi e iscriverti alle nostre iniziative.
        </p>
        <div className="mt-6">
          <RegisterForm />
        </div>
        <p className="mt-6 text-center text-xs text-ink-400">
          Hai già un account?{" "}
          <Link href="/login" className="font-medium text-ink-600 hover:underline">
            Accedi
          </Link>
        </p>
      </div>
    </div>
  );
}
