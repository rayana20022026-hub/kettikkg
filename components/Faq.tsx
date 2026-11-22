"use client";

import { useState } from "react";
import { IconChevronDown } from "./icons";
import { SectionHeading } from "./PopularDirections";
import { useTranslations } from "./LocaleProvider";

export function Faq() {
  const dict = useTranslations();
  const t = dict.faq;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-20 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={t.title}
          description={t.description}
        />

        <div className="mt-10 space-y-3">
          {t.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`overflow-hidden rounded-2xl border bg-white transition-colors ${
                  isOpen ? "border-brand-200 shadow-sm" : "border-slate-200"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-[15px] font-semibold text-slate-900">
                    {item.q}
                  </span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all ${
                      isOpen
                        ? "bg-brand-600 text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <IconChevronDown
                      className={`h-4 w-4 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-slate-600 leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
