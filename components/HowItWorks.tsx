import { IconSearch, IconShieldCheck, IconRoute } from "./icons";
import { SectionHeading } from "./PopularDirections";
import { getDictionary } from "@/app/[lang]/dictionaries";
import type { Locale } from "@/app/[lang]/dictionaries-shared";
import type { ComponentType, SVGProps } from "react";

type IconKey = "search" | "shieldCheck" | "route";

const iconMap: Record<IconKey, ComponentType<SVGProps<SVGSVGElement>>> = {
  search: IconSearch,
  shieldCheck: IconShieldCheck,
  route: IconRoute,
};

export async function HowItWorks({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);
  const t = dict.howItWorks;

  return (
    <section id="how" className="scroll-mt-20 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={t.title}
          description={t.description}
        />

        <div className="relative mt-12 grid gap-6 lg:grid-cols-3">
          {/* connecting line */}
          <div className="absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent lg:block" />

          {t.steps.map((s) => {
            const Icon = iconMap[s.icon as IconKey] ?? IconSearch;
            return (
              <div
                key={s.n}
                className="relative rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-brand-200 hover:shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${s.color}`}
                  >
                    <Icon className="h-7 w-7" />
                  </span>
                  <span className="text-4xl font-bold text-slate-100">{s.n}</span>
                </div>
                <h3 className="mt-5 text-xl font-bold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed">{s.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
