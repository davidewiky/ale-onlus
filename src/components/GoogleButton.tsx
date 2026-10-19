"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

type Props = {
  callbackUrl: string;
  label: string;
};

export function GoogleButton({ callbackUrl, label }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick() {
    setIsLoading(true);
    await signIn("google", { callbackUrl });
  }

  return (
    <div className="space-y-5">
      <button
        type="button"
        onClick={handleClick}
        disabled={isLoading}
        className="flex w-full items-center justify-center gap-3 rounded-full border border-ink-200 bg-white px-4 py-2.5 text-sm font-semibold text-ink-800 transition hover:bg-ink-50 disabled:opacity-60"
      >
        <svg aria-hidden="true" viewBox="0 0 48 48" className="h-5 w-5">
          <path
            fill="#EA4335"
            d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"
          />
          <path
            fill="#4285F4"
            d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.6 5.9c4.4-4.1 7-10.1 7-17.6z"
          />
          <path
            fill="#FBBC05"
            d="M10.5 28.7A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.8-4.7l-7.9-6.1A24 24 0 0 0 0 24c0 3.9.9 7.5 2.6 10.8l7.9-6.1z"
          />
          <path
            fill="#34A853"
            d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.9 2.3-8.3 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z"
          />
        </svg>
        {isLoading ? "Reindirizzamento..." : label}
      </button>

      <div className="flex items-center gap-3 text-xs text-ink-400">
        <span className="h-px flex-1 bg-ink-100" />
        oppure
        <span className="h-px flex-1 bg-ink-100" />
      </div>
    </div>
  );
}
