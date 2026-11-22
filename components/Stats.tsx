import { getDictionary } from "@/app/[lang]/dictionaries";
import type { Locale } from "@/app/[lang]/dictionaries-shared";

export async function Stats({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);

  return (
    <section className="border-y border-slate-100 bg-brand-700 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {dict.stats.map((n) => (
            <div key={n.label} className="text-center">
              <p className="text-3xl font-bold text-white sm:text-4xl">
                {n.value}
              </p>
              <p className="mt-2 text-sm text-brand-200">{n.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
