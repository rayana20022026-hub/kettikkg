"use client";

import { createContext, useContext } from "react";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries-shared";

type LocaleContextValue = {
  dict: Dictionary;
  locale: Locale;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  dict,
  locale,
  children,
}: {
  dict: Dictionary;
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <LocaleContext.Provider value={{ dict, locale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useTranslations() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useTranslations must be used within a LocaleProvider");
  }
  return ctx.dict;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return ctx.locale;
}
