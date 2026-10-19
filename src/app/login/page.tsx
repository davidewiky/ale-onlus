import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/app/login/LoginForm";
import { GoogleButton } from "@/components/GoogleButton";
import { isGoogleAuthEnabled } from "@/auth";

export const metadata: Metadata = {
  title: "Accedi",
  description: "Accedi al tuo account Il Sogno di Ale per iscriverti agli eventi.",
};

type Props = { searchParams: Promise<{ callbackUrl?: string; error?: string }> };

const ERROR_MESSAGES: Record<string, string> = {
  EmailExists:
    "Esiste già un account con questa email, registrato con password. Accedi con email e password.",
  GoogleEmailNotVerified: "L'email del tuo account Google non risulta verificata.",
};

function getErrorMessage(error: string | undefined): string | null {
  if (!error) return null;
  return ERROR_MESSAGES[error] ?? "Accesso non riuscito, riprova.";
}

function sanitizeCallbackUrl(callbackUrl: string | undefined): string {
  if (callbackUrl && callbackUrl.startsWith("/") && !callbackUrl.startsWith("//")) {
    return callbackUrl;
  }
  return "/eventi";
}

export default async function LoginPage({ searchParams }: Props) {
  const { callbackUrl, error } = await searchParams;
  const errorMessage = getErrorMessage(error);
  const safeCallbackUrl = sanitizeCallbackUrl(callbackUrl);

  return (
    <div className="container-page flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-md rounded-2xl border border-ink-100 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-ink-900">Accedi</h1>
        <p className="mt-1 text-sm text-ink-500">
          Accedi per iscriverti agli eventi de Il Sogno di Ale.
        </p>
        {errorMessage && (
          <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </p>
        )}
        <div className="mt-6">
          {isGoogleAuthEnabled && (
            <div className="mb-5">
              <GoogleButton callbackUrl={safeCallbackUrl} label="Accedi con Google" />
            </div>
          )}
          <LoginForm callbackUrl={safeCallbackUrl} />
        </div>
        <p className="mt-6 text-center text-xs text-ink-400">
          <Link href="/" className="hover:underline">
            ← Torna alla home
          </Link>
        </p>
      </div>
    </div>
  );
}
