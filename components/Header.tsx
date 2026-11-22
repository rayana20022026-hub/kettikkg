"use client";

import { useEffect, useState } from "react";
import {
  IconClose,
  IconGlobe,
  IconMenu,
  IconSearch,
} from "./icons";
import { Logo } from "./Logo";
import { useTranslations, useLocale } from "./LocaleProvider";
import type { Locale } from "@/app/[lang]/dictionaries-shared";

/** Ordered list of locale switcher options. */
const localeSwitcher: { locale: Locale; label: string }[] = [
  { locale: "ru", label: "РУС" },
  { locale: "kg", label: "КЫР" },
  { locale: "en", label: "ENG" },
];

const COOKIE_NAME = "NEXT_LOCALE";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function switchLocale(next: Locale) {
  document.cookie = `${COOKIE_NAME}=${next}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
  window.location.href = `/${next}`;
}

export function Header() {
  const dict = useTranslations();
  const locale = useLocale();
  const t = dict.header;

  const nav = [
    { label: t.search, href: "#search" },
    { label: t.howItWorks, href: "#how" },
    { label: t.directions, href: "#directions" },
    { label: t.forDrivers, href: "#drivers" },
    { label: t.help, href: "#faq" },
  ];

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close lang dropdown when clicking outside.
  useEffect(() => {
    if (!langOpen) return;
    const handler = () => setLangOpen(false);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [langOpen]);

  const currentLabel =
    localeSwitcher.find((l) => l.locale === locale)?.label ?? "РУС";

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-md shadow-[0_1px_0_0_rgba(15,23,42,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-2.5">
          <Logo className="h-9 w-9" />
          <span className="text-lg font-bold tracking-tight text-slate-900">
            GETTIK<span className="text-brand-600">.KG</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {/* Language switcher dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLangOpen((v) => !v);
              }}
              className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
              aria-label={t.changeLanguage}
              aria-expanded={langOpen}
            >
              <IconGlobe className="h-4 w-4" />
              {currentLabel}
            </button>

            {langOpen && (
              <div className="absolute right-0 top-full mt-1 w-28 overflow-hidden rounded-xl border border-slate-100 bg-white py-1 shadow-lg">
                {localeSwitcher.map(({ locale: l, label }) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => { setLangOpen(false); switchLocale(l); }}
                    className={`block w-full px-4 py-2 text-left text-sm font-medium transition-colors hover:bg-slate-50 ${
                      l === locale
                        ? "text-brand-600 font-semibold"
                        : "text-slate-700"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <a
            href="#search"
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 transition-colors hover:border-slate-300 hover:bg-slate-50"
          >
            {t.login}
          </a>
          <a
            href="#search"
            className="flex items-center gap-1.5 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
          >
            <IconSearch className="h-4 w-4" />
            {t.findRide}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-slate-800 transition-colors hover:bg-slate-100 lg:hidden"
          aria-label={t.menu}
          aria-expanded={open}
        >
          {open ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`fixed inset-0 top-16 bg-slate-900/20 backdrop-blur-sm transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        <nav
          className={`mx-3 mb-3 overflow-hidden rounded-2xl border border-slate-100 bg-white p-2 shadow-xl transition-all duration-300 ${
            open
              ? "translate-y-0 opacity-100"
              : "-translate-y-3 opacity-0"
          }`}
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              {item.label}
            </a>
          ))}

          {/* Mobile locale switcher */}
          <div className="mt-2 flex items-center justify-center gap-1 border-t border-slate-100 pt-3">
            {localeSwitcher.map(({ locale: l, label }) => (
              <button
                key={l}
                type="button"
                onClick={() => { setOpen(false); switchLocale(l); }}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                  l === locale
                    ? "bg-brand-600 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="mt-2 flex items-center gap-2 border-t border-slate-100 pt-3">
            <a
              href="#search"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-center text-sm font-semibold text-slate-800"
            >
              {t.login}
            </a>
            <a
              href="#search"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-xl bg-brand-600 px-4 py-2.5 text-center text-sm font-semibold text-white"
            >
              {t.findRide}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
