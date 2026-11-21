import {
  IconBell,
  IconChat,
  IconCreditCard,
  IconHeadset,
  IconShieldCheck,
  IconUserCheck,
} from "./icons";
import { SectionHeading } from "./PopularDirections";

const features = [
  {
    icon: IconShieldCheck,
    title: "Проверенные водители",
    text: "Каждый водитель проходит проверку личности и документов перед публикацией поездок.",
  },
  {
    icon: IconUserCheck,
    title: "Система рейтингов",
    text: "Реальные отзывы после подтверждённых поездок формируют репутацию водителей и пассажиров.",
  },
  {
    icon: IconCreditCard,
    title: "Прозрачные цены",
    text: "Стоимость фиксируется на момент бронирования. Никаких скрытых платежей и накруток.",
  },
  {
    icon: IconChat,
    title: "Встроенный чат",
    text: "Общайтесь с водителем прямо в платформе — без раскрытия личных контактов без согласия.",
  },
  {
    icon: IconBell,
    title: "Мгновенные уведомления",
    text: "Статус заявки, изменения времени и напоминания о поездке приходят вовремя.",
  },
  {
    icon: IconHeadset,
    title: "Поддержка 24/7",
    text: "Спорные ситуации и обращения обрабатываются администраторами и AI-помощником.",
  },
];

export function Advantages() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Почему GETTIK.KG"
          title="Безопасно, удобно и прозрачно"
          description="Платформа построена как единая экосистема: поиск, бронирование, коммуникация и оплата автоматизированы и защищены."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-brand-200 hover:shadow-lg"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-slate-900">{f.title}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed">{f.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
