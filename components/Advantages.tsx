import {
  IconBell,
  IconChat,
  IconCreditCard,
  IconHeadset,
  IconShieldCheck,
  IconUserCheck,
} from "./icons";
import { SectionHeading } from "./PopularDirections";
import { getDictionary } from "@/app/[lang]/dictionaries";
import type { Locale } from "@/app/[lang]/dictionaries-shared";
import type { ComponentType, SVGProps } from "react";

type IconKey = "shieldCheck" | "userCheck" | "creditCard" | "chat" | "bell" | "headset";

const iconMap: Record<IconKey, ComponentType<SVGProps<SVGSVGElement>>> = {
  shieldCheck: IconShieldCheck,
  userCheck: IconUserCheck,
  creditCard: IconCreditCard,
  chat: IconChat,
  bell: IconBell,
  headset: IconHeadset,
};

export async function Advantages({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);
  const t = dict.advantages;

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={t.title}
          description={t.description}
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.features.map((f) => {
            const Icon = iconMap[f.icon as IconKey] ?? IconShieldCheck;
            return (
              <div
                key={f.title}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-brand-200 hover:shadow-lg"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  {f.title}
                </h3>
                <p className="mt-2 text-slate-600 leading-relaxed">{f.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
