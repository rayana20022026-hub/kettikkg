import { IconArrowRight } from "./icons";

const directions = [
  {
    from: "Бишкек",
    to: "Каракол",
    distance: "400 км",
    duration: "около 4 ч",
    fromPrice: 700,
    trips: 48,
    gradient: "from-brand-500 to-brand-700",
  },
  {
    from: "Бишкек",
    to: "Ош",
    distance: "610 км",
    duration: "около 9 ч",
    fromPrice: 1200,
    trips: 32,
    gradient: "from-sky-500 to-brand-700",
  },
  {
    from: "Бишкек",
    to: "Чолпон-Ата",
    distance: "260 км",
    duration: "около 3.5 ч",
    fromPrice: 600,
    trips: 65,
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    from: "Бишкек",
    to: "Нарын",
    distance: "340 км",
    duration: "около 5 ч",
    fromPrice: 800,
    trips: 19,
    gradient: "from-indigo-500 to-brand-700",
  },
  {
    from: "Бишкек",
    to: "Талас",
    distance: "330 км",
    duration: "около 5 ч",
    fromPrice: 750,
    trips: 14,
    gradient: "from-violet-500 to-brand-700",
  },
  {
    from: "Бишкек",
    to: "Балыкчы",
    distance: "180 км",
    duration: "около 2.5 ч",
    fromPrice: 400,
    trips: 41,
    gradient: "from-blue-500 to-cyan-600",
  },
];

export function PopularDirections() {
  return (
    <section id="directions" className="scroll-mt-20 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Популярные направления"
          title="Маршруты, которые выбирают чаще всего"
          description="Актуальные предложения по самым востребованным междугородним маршрутам Кыргызстана."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {directions.map((d) => (
            <a
              key={`${d.from}-${d.to}`}
              href="#search"
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl"
            >
              <div
                className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${d.gradient}`}
              />
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 text-slate-900">
                  <span className="text-lg font-bold">{d.from}</span>
                  <IconArrowRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-600" />
                  <span className="text-lg font-bold">{d.to}</span>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
                <span>{d.distance}</span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <span>{d.duration}</span>
              </div>
              <div className="mt-5 flex items-end justify-between border-t border-slate-100 pt-4">
                <div>
                  <p className="text-xs text-slate-400">от</p>
                  <p className="text-xl font-bold text-slate-900">
                    {d.fromPrice}{" "}
                    <span className="text-sm font-medium text-slate-500">сом</span>
                  </p>
                </div>
                <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                  {d.trips} поездок
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl text-left"}>
      <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">
        {eyebrow}
      </span>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg leading-relaxed text-slate-600">{description}</p>
      )}
    </div>
  );
}
