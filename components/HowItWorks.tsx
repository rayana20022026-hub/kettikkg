import { IconSearch, IconShieldCheck, IconRoute } from "./icons";
import { SectionHeading } from "./PopularDirections";

const steps = [
  {
    n: "01",
    icon: IconSearch,
    title: "Найдите поездку",
    text: "Укажите город отправления, назначения, дату и количество пассажиров — система покажет актуальные предложения.",
    color: "bg-brand-50 text-brand-600",
  },
  {
    n: "02",
    icon: IconShieldCheck,
    title: "Забронируйте место",
    text: "Выберите поездку, посмотрите профиль водителя и автомобиль, отправьте заявку и дождитесь подтверждения.",
    color: "bg-accent-50 text-accent-600",
  },
  {
    n: "03",
    icon: IconRoute,
    title: "Отправляйтесь в путь",
    text: "Свяжитесь с водителем через чат, узнайте точку посадки и путешествуйте. После поездки оставьте отзыв.",
    color: "bg-emerald-50 text-emerald-600",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-20 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Как это работает"
          title="Три простых шага до поездки"
          description="От поиска маршрута до прибытия в пункт назначения — всё в едином интерфейсе GETTIK.KG."
        />

        <div className="relative mt-12 grid gap-6 lg:grid-cols-3">
          {/* connecting line */}
          <div className="absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent lg:block" />

          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.n}
                className="relative rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-brand-200 hover:shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${s.color}`}>
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
