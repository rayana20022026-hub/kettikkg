import { IconQuote, IconStar } from "./icons";
import { SectionHeading } from "./PopularDirections";

const reviews = [
  {
    name: "Айгуль М.",
    role: "Пассажир, Бишкек → Чолпон-Ата",
    initials: "А",
    rating: 5,
    text: "Бронировала место за день до поездки. Водитель подтвердил за минуты, подсказал точку посадки. Доехали комфортно и вовремя.",
    color: "from-brand-500 to-brand-700",
  },
  {
    name: "Бакыт Т.",
    role: "Водитель, Бишкек → Ош",
    initials: "Б",
    rating: 5,
    text: "Публикую поездки на выходные и быстро набираю пассажиров. Кабинет удобный, видно доход и рейтинг. Намного удобнее, чем искать в мессенджерах.",
    color: "from-sky-500 to-brand-700",
  },
  {
    name: "Динара К.",
    role: "Пассажир, Бишкек → Каракол",
    initials: "Д",
    rating: 5,
    text: "Понравилось, что видно рейтинг водителя и автомобиль до поездки. Чат внутри платформы — номер не нужно никому давать.",
    color: "from-violet-500 to-brand-700",
  },
];

export function Reviews() {
  return (
    <section className="bg-slate-50/70 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Отзывы"
          title="Что говорят пользователи"
          description="Реальный опыт пассажиров и водителей платформы GETTIK.KG."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {reviews.map((r) => (
            <figure
              key={r.name}
              className="relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <IconQuote className="h-9 w-9 text-brand-100" />
              <blockquote className="mt-3 flex-1 text-slate-700 leading-relaxed">
                {r.text}
              </blockquote>
              <div className="mt-5 flex items-center gap-1 text-accent-500">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <IconStar key={i} className="h-4 w-4" />
                ))}
              </div>
              <figcaption className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-4">
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${r.color} text-sm font-bold text-white`}
                >
                  {r.initials}
                </span>
                <div>
                  <p className="text-sm font-bold text-slate-900">{r.name}</p>
                  <p className="text-xs text-slate-500">{r.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
