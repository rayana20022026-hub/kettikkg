"use client";

import { useState } from "react";
import { IconChevronDown } from "./icons";
import { SectionHeading } from "./PopularDirections";

const faqs = [
  {
    q: "Как забронировать место в поездке?",
    a: "Укажите маршрут, дату и количество пассажиров в поиске, выберите подходящую поездку, посмотрите профиль водителя и автомобиль, затем нажмите «Забронировать». Заявка отправляется водителю — после подтверждения вы получите детали посадки.",
  },
  {
    q: "Нужно ли платить при бронировании?",
    a: "Стоимость поездки рассчитывается автоматически: цена одного места умножается на количество мест. Поддерживаются наличная оплата водителю и онлайн-оплата через подключённые платёжные системы Кыргызстана.",
  },
  {
    q: "Можно ли быть и водителем, и пассажиром?",
    a: "Да. Один аккаунт позволяет переключаться между режимами водителя и пассажира. Для публикации поездок необходимо пройти проверку личности и добавить автомобиль.",
  },
  {
    q: "Как проверяются водители?",
    a: "Водитель проходит верификацию: подтверждение телефона, проверка личности и водительских документов, проверка автомобиля. Статус проверки отображается в профиле и на карточке поездки.",
  },
  {
    q: "Что делать, если поездка отменена?",
    a: "При отмене поездки водителем все подтверждённые пассажиры получают уведомление. Правила отмены и возврата настроены в платформе — условия всегда видны до бронирования.",
  },
  {
    q: "Доступно ли приложение для телефона?",
    a: "GETTIK.KG работает как Progressive Web App: сайт можно установить на главный экран смартфона, получать push-уведомления и пользоваться офлайн-страницей без приложения из магазинов.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-20 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Вопросы и ответы"
          title="Часто задаваемые вопросы"
          description="Кратко о том, как устроена платформа и бронирование поездок."
        />

        <div className="mt-10 space-y-3">
          {faqs.map((item, i) => {
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
                      isOpen ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-500"
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
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
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
