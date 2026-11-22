"use client";

import { useState } from "react";
import {
  IconArrowRight,
  IconArrowSwap,
  IconCalendar,
  IconMapPin,
  IconMinus,
  IconPlus,
  IconSearch,
  IconUsers,
} from "./icons";
import { useTranslations } from "./LocaleProvider";

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="group flex flex-1 items-center gap-3 px-4 py-3.5">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-100">
        {icon}
      </span>
      <span className="flex w-full flex-col">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          {label}
        </span>
        {children}
      </span>
    </label>
  );
}

export function SearchForm() {
  const dict = useTranslations();
  const t = dict.searchForm;
  const cities = dict.cities;

  const [from, setFrom] = useState(cities[0] ?? "");
  const [to, setTo] = useState(cities[1] ?? "");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState(1);

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  const passengerLabel = `${passengers} ${plural(
    passengers,
    dict.plural.passenger as [string, string, string],
  )}`;

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="w-full rounded-3xl border border-slate-200/80 bg-white p-2 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.35)] ring-1 ring-black/[0.02]"
    >
      <div className="flex flex-col gap-1 lg:flex-row lg:items-stretch">
        {/* From */}
        <Field label={t.from} icon={<IconMapPin className="h-[18px] w-[18px]" />}>
          <input
            list="cities"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder={t.fromPlaceholder}
            className="w-full bg-transparent text-[15px] font-semibold text-slate-900 outline-none placeholder:font-medium placeholder:text-slate-400"
          />
        </Field>

        {/* Swap */}
        <div className="flex items-center justify-center lg:px-1">
          <button
            type="button"
            onClick={swap}
            aria-label={t.swap}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600 lg:rotate-0"
          >
            <IconArrowSwap className="h-4 w-4" />
          </button>
        </div>

        {/* To */}
        <Field label={t.to} icon={<IconMapPin className="h-[18px] w-[18px]" />}>
          <input
            list="cities"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder={t.toPlaceholder}
            className="w-full bg-transparent text-[15px] font-semibold text-slate-900 outline-none placeholder:font-medium placeholder:text-slate-400"
          />
        </Field>

        {/* Date */}
        <Field label={t.date} icon={<IconCalendar className="h-[18px] w-[18px]" />}>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-transparent text-[15px] font-semibold text-slate-900 outline-none placeholder:font-medium placeholder:text-slate-400"
          />
        </Field>

        {/* Passengers */}
        <Field
          label={t.passengers}
          icon={<IconUsers className="h-[18px] w-[18px]" />}
        >
          <div className="flex items-center justify-between">
            <span className="text-[15px] font-semibold text-slate-900">
              {passengerLabel}
            </span>
            <div className="flex items-center gap-1">
              <Stepper
                onClick={() => setPassengers((p) => Math.max(1, p - 1))}
                disabled={passengers <= 1}
                aria-label={t.decrease}
              >
                <IconMinus className="h-3.5 w-3.5" />
              </Stepper>
              <Stepper
                onClick={() => setPassengers((p) => Math.min(8, p + 1))}
                disabled={passengers >= 8}
                aria-label={t.increase}
              >
                <IconPlus className="h-3.5 w-3.5" />
              </Stepper>
            </div>
          </div>
        </Field>

        {/* Submit */}
        <button
          type="submit"
          className="m-1 flex items-center justify-center gap-2 rounded-2xl bg-brand-600 px-6 py-4 text-base font-semibold text-white shadow-sm transition-colors hover:bg-brand-700 active:bg-brand-800"
        >
          <IconSearch className="h-5 w-5" />
          <span>{t.submit}</span>
          <IconArrowRight className="h-4 w-4 opacity-70" />
        </button>
      </div>

      <datalist id="cities">
        {cities.map((c) => (
          <option key={c} value={c} />
        ))}
      </datalist>
    </form>
  );
}

function Stepper({
  children,
  onClick,
  disabled,
  "aria-label": label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  "aria-label": string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:bg-transparent disabled:hover:text-slate-600"
    >
      {children}
    </button>
  );
}

function plural(n: number, forms: [string, string, string]) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1];
  return forms[2];
}
