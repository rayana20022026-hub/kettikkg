import { getDictionary } from "@/app/[lang]/dictionaries";
import type { Locale, Dictionary } from "@/app/[lang]/dictionaries-shared";
import { SearchForm } from "./SearchForm";
import { IconMapPin, IconShieldCheck, IconStar, IconUsers } from "./icons";

export async function Hero({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);
  const t = dict.hero;
  const common = dict.common;
  const monthName = common.months[t.departureMonth - 1] ?? String(t.departureMonth);

  return (
    <section id="top" className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50 via-white to-white" />
      <div className="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_60%_55%_at_50%_0%,#000_60%,transparent_100%)]" />
      <div className="absolute -left-24 top-10 -z-10 h-72 w-72 rounded-full bg-brand-300/30 blur-3xl" />
      <div className="absolute -right-24 top-24 -z-10 h-72 w-72 rounded-full bg-accent-400/20 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 pb-10 pt-10 sm:px-6 lg:px-8 lg:pb-20 lg:pt-16">
        {/* Hero copy + preview */}
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/70 px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-sm backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-600" />
              </span>
              {t.badge}
            </span>

            <h1 className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              {t.titleLine1}{" "}
              <span className="bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
                {t.titleHighlight}
              </span>{" "}
              {t.titleLine2}
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              {t.description}
            </p>

            <dl className="mt-8 grid max-w-md grid-cols-3 gap-4">
              {t.stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-slate-100 bg-white/70 px-3 py-3 shadow-sm backdrop-blur"
                >
                  <dt className="text-xl font-bold text-slate-900">{s.value}</dt>
                  <dd className="text-xs text-slate-500">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <HeroPreview
            t={t}
            common={common}
            monthName={monthName}
            pluralTrips={dict.plural.trip as [string, string, string]}
          />
        </div>

        {/* Search */}
        <div id="search" className="relative mt-12 scroll-mt-24">
          <SearchForm />

          {/* Popular directions chips */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-slate-500">
              {t.popularLabel}
            </span>
            {t.popularRoutes.map((route) => (
              <a
                key={route}
                href="#directions"
                className="rounded-full border border-slate-200 bg-white/70 px-3.5 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
              >
                {route}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type HeroT = Dictionary["hero"];
type CommonT = Dictionary["common"];

function HeroPreview({
  t,
  common,
  monthName,
  pluralTrips,
}: {
  t: HeroT;
  common: CommonT;
  monthName: string;
  pluralTrips: [string, string, string];
}) {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      {/* Map-ish backdrop card */}
      <div className="absolute -right-4 -top-6 hidden h-full w-full rounded-[2rem] border border-brand-100 bg-gradient-to-br from-brand-50 to-white lg:block" />

      <div className="relative rounded-[2rem] border border-slate-100 bg-white p-5 shadow-[0_30px_70px_-30px_rgba(15,23,42,0.45)] ring-1 ring-black/[0.02]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-50 text-brand-600">
              <IconMapPin className="h-4 w-4" />
            </span>
            {t.offerOfDay}
          </div>
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
            {t.verified}
          </span>
        </div>

        {/* Route line */}
        <div className="relative mt-5 rounded-2xl bg-slate-50 p-5">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-medium text-slate-400">
                {t.departure}
              </span>
              <span className="text-base font-bold text-slate-900">
                {t.departureCity}
              </span>
              <span className="text-xs text-slate-500">
                {t.departureTime} · {t.departureDay} {monthName}
              </span>
            </div>
            <div className="mx-3 flex-1">
              <svg viewBox="0 0 120 24" className="h-6 w-full" fill="none">
                <path
                  d="M4 12h100"
                  stroke="#cbd5e1"
                  strokeWidth="2"
                  strokeDasharray="2 5"
                />
                <path
                  d="M104 12l-6-4M104 12l-6 4"
                  stroke="#cbd5e1"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-xs font-medium text-slate-400">
                {t.arrival}
              </span>
              <span className="text-base font-bold text-slate-900">
                {t.arrivalCity}
              </span>
              <span className="text-xs text-slate-500">{t.arrivalTime}</span>
            </div>
          </div>
        </div>

        {/* Driver */}
        <div className="mt-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-base font-bold text-white">
            {t.driverInitials}
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-slate-900">{t.driverName}</p>
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <IconStar className="h-3.5 w-3.5 text-accent-500" />
              <span className="font-semibold text-slate-700">{t.driverRating}</span>
              <span>· {t.driverTrips} {pluralTrips[2]}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
              {t.pricePerSeat}
            </p>
            <p className="text-lg font-bold text-slate-900">
              {t.price} {common.currency}
            </p>
          </div>
        </div>

        {/* Meta */}
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <Meta label={t.carLabel} value={t.carValue} />
          <Meta
            label={t.seatsLabel}
            value={`${t.seatsValue}`}
            icon={<IconUsers className="h-3.5 w-3.5" />}
          />
          <Meta
            label={t.luggageLabel}
            value={t.luggageValue}
            icon={<IconShieldCheck className="h-3.5 w-3.5" />}
          />
        </div>

        <button
          type="button"
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-600 px-4 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
        >
          {t.bookSeat}
        </button>
      </div>

      {/* Floating badge */}
      <div className="absolute -bottom-5 -left-5 hidden items-center gap-2 rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-lg sm:flex">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-50 text-accent-600">
          <IconShieldCheck className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm font-bold text-slate-900">{t.safePayment}</p>
          <p className="text-xs text-slate-500">{t.bookingProtection}</p>
        </div>
      </div>
    </div>
  );
}

function Meta({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-slate-50 px-2 py-2.5">
      <div className="flex items-center justify-center gap-1 text-[11px] font-medium uppercase tracking-wide text-slate-400">
        {icon}
        {label}
      </div>
      <p className="mt-0.5 text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
}
