export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wide text-brand-600">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">{title}</h2>
      {description && <p className="mt-3 text-base text-ink-600">{description}</p>}
    </div>
  );
}
