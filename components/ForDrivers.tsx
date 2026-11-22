import { getDictionary } from "@/app/[lang]/dictionaries";
import type { Locale } from "@/app/[lang]/dictionaries-shared";
import {
  IconCar,
  IconWallet,
  IconBolt,
  IconClipboardCheck,
  IconArrowRight,
  IconCheck,
} from "./icons";

export async function ForDrivers({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);
  const t = dict.forDrivers;

  return (
    <section id="drivers" className="scroll-mt-20 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-slate-900 px-6 py-12 sm:px-12 sm:py-16">
          {/* decorative */}
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand-600/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-accent-500/15 blur-3xl" />
          <div className="absolute inset-0 bg-grid opacity-[0.06]" />

          <div className="relative grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white">
                <IconBolt className="h-3.5 w-3.5 text-accent-400" />
                {t.badge}
              </span>
              <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {t.title}
              </h2>
              <p className="mt-4 max-w-lg text-lg leading-relaxed text-slate-300">
                {t.description}
              </p>

              <ul className="mt-7 space-y-3">
                {t.perks.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-slate-200">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                      <IconCheck className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-[15px]">{p}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#search"
                  className="flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100"
                >
                  {t.becomeDriver}
                  <IconArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#how"
                  className="flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  {t.howItWorks}
                </a>
              </div>
            </div>

            {/* earnings card */}
            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute -right-3 -top-3 hidden h-full w-full rounded-3xl border border-white/10 bg-white/[0.03] sm:block" />
              <div className="relative rounded-3xl border border-white/10 bg-slate-800/70 p-6 backdrop-blur">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500/20 text-brand-300">
                      <IconWallet className="h-4 w-4" />
                    </span>
                    {t.weeklyEarnings}
                  </div>
                  <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-400">
                    +12%
                  </span>
                </div>
                <p className="mt-5 text-4xl font-bold text-white">
                  {t.weeklyAmount}{" "}
                  <span className="text-xl font-medium text-slate-400">
                    {dict.common.currency}
                  </span>
                </p>

                {/* mini bar chart */}
                <div className="mt-6 flex h-24 items-end gap-2">
                  {[40, 65, 35, 80, 55, 95, 70].map((h, i) => (
                    <div key={i} className="flex-1">
                      <div
                        className="w-full rounded-t-md bg-gradient-to-t from-brand-600 to-brand-400"
                        style={{ height: `${h}%` }}
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3 border-t border-white/10 pt-5 text-center">
                  <Stat label={t.tripsLabel} value={t.tripsValue} />
                  <Stat
                    label={t.passengersLabel}
                    value={t.passengersValue}
                    icon={<IconCar className="h-3.5 w-3.5" />}
                  />
                  <Stat
                    label={t.ratingLabel}
                    value={t.ratingValue}
                    icon={<IconClipboardCheck className="h-3.5 w-3.5" />}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center justify-center gap-1 text-[11px] font-medium uppercase tracking-wide text-slate-400">
        {icon}
        {label}
      </div>
      <p className="mt-1 text-lg font-bold text-white">{value}</p>
    </div>
  );
}
