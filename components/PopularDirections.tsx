import { getDictionary } from "@/app/[lang]/dictionaries";
import type { Locale } from "@/app/[lang]/dictionaries-shared";
import { IconArrowRight } from "./icons";

export async function PopularDirections({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);
  const t = dict.popularDirections;
  const common = dict.common;

  return (
    <section id="directions" className="scroll-mt-20 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={t.title}
          description={t.description}
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.items.map((d) => (
            <a
              key={`${d.from}-${d.to}`}
              href="#search"
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl"
            >
              <div
                className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${d.gradient}`}
              />
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 text-slate-900">
                  <span className="text-lg font-bold">{d.from}</span>
                  <IconArrowRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-600" />
                  <span className="text-lg font-bold">{d.to}</span>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
                <span>{d.distanceKm} {common.km}</span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <span>{common.about} {d.durationHours} {common.hourShort}</span>
              </div>
              <div className="mt-5 flex items-end justify-between border-t border-slate-100 pt-4">
                <div>
                  <p className="text-xs text-slate-400">{common.from}</p>
                  <p className="text-xl font-bold text-slate-900">
                    {d.fromPrice}{" "}
                    <span className="text-sm font-medium text-slate-500">
                      {common.currency}
                    </span>
                  </p>
                </div>
                <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                  {d.trips} {dict.plural.trip[2]}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={
        align === "center"
          ? "mx-auto max-w-2xl text-center"
          : "max-w-2xl text-left"
      }
    >
      <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">
        {eyebrow}
      </span>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg leading-relaxed text-slate-600">
          {description}
        </p>
      )}
    </div>
  );
}
