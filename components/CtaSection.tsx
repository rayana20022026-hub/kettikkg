import { getDictionary } from "@/app/[lang]/dictionaries";
import type { Locale } from "@/app/[lang]/dictionaries-shared";
import { IconArrowRight, IconBell, IconBolt, IconRoute } from "./icons";

export async function CtaSection({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);
  const t = dict.cta;

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-brand-100 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 px-6 py-14 sm:px-12 sm:py-16">
          <div className="absolute inset-0 bg-grid opacity-[0.07]" />
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent-400/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          <div className="relative mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white">
              <IconBolt className="h-3.5 w-3.5 text-accent-400" />
              {t.badge}
            </span>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t.title}
            </h2>
            <p className="mt-4 text-lg text-brand-100">{t.description}</p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#search"
                className="flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-brand-700 shadow-lg transition-colors hover:bg-slate-100"
              >
                {t.findRide}
                <IconArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#drivers"
                className="flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <IconRoute className="h-4 w-4" />
                {t.publishTrip}
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-brand-100">
              <span className="flex items-center gap-1.5">
                <IconBell className="h-4 w-4" />
                {t.pushNotifications}
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:block" />
              <span className="flex items-center gap-1.5">
                <IconBolt className="h-4 w-4" />
                {t.fastLoad}
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:block" />
              <span className="flex items-center gap-1.5">
                <IconRoute className="h-4 w-4" />
                {t.offlinePage}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
