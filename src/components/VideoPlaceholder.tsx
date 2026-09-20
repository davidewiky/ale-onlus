export function VideoPlaceholder({
  label = "Video in arrivo",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-ink-800 via-ink-700 to-ink-900 ${className}`}
    >
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:20px_20px]" />
      <div className="relative flex flex-col items-center gap-3 text-center text-white">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-400 text-ink-900 shadow-lg">
          <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-6 w-6">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
        <p className="text-sm font-medium text-ink-100">{label}</p>
        <p className="max-w-xs text-xs text-ink-300">
          Questo è un contenuto segnaposto: verrà sostituito con il video ufficiale della
          fondazione.
        </p>
      </div>
    </div>
  );
}
