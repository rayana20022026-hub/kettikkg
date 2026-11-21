import { IconCar, IconClock, IconMapPin, IconStar, IconUsers } from "./icons";
import { SectionHeading } from "./PopularDirections";

type Trip = {
  from: string;
  to: string;
  time: string;
  date: string;
  driver: string;
  initials: string;
  rating: number;
  trips: number;
  car: string;
  seats: number;
  price: number;
  verified: boolean;
};

const trips: Trip[] = [
  {
    from: "Бишкек",
    to: "Каракол",
    time: "08:00",
    date: "25 ноября",
    driver: "Азамат",
    initials: "А",
    rating: 4.9,
    trips: 218,
    car: "Toyota Prius",
    seats: 3,
    price: 700,
    verified: true,
  },
  {
    from: "Бишкек",
    to: "Чолпон-Ата",
    time: "09:30",
    date: "25 ноября",
    driver: "Эрлан",
    initials: "Э",
    rating: 4.8,
    trips: 96,
    car: "Hyundai Sonata",
    seats: 2,
    price: 600,
    verified: true,
  },
  {
    from: "Бишкек",
    to: "Ош",
    time: "06:00",
    date: "26 ноября",
    driver: "Нурлан",
    initials: "Н",
    rating: 5.0,
    trips: 142,
    car: "Mitsubishi Delica",
    seats: 4,
    price: 1200,
    verified: true,
  },
  {
    from: "Бишкек",
    to: "Балыкчы",
    time: "14:00",
    date: "25 ноября",
    driver: "Жылдыз",
    initials: "Ж",
    rating: 4.7,
    trips: 54,
    car: "Toyota Camry",
    seats: 3,
    price: 400,
    verified: true,
  },
];

export function RecentTrips() {
  return (
    <section className="bg-slate-50/70 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow="Свежие объявления"
            title="Недавно опубликованные поездки"
            description="Актуальные предложения от проверенных водителей — бронируйте, пока есть свободные места."
          />
          <a
            href="#search"
            className="hidden shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 sm:inline-flex"
          >
            Все поездки
            <IconMapPin className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trips.map((t, i) => (
            <TripCard key={i} trip={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TripCard({ trip }: { trip: Trip }) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl">
      {/* Route */}
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-600">
          <IconMapPin className="h-[18px] w-[18px]" />
        </div>
        <div className="flex flex-1 items-center gap-2 font-bold text-slate-900">
          <span>{trip.from}</span>
          <svg viewBox="0 0 24 8" className="h-2 flex-1" fill="none">
            <path d="M0 4h20" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="2 3" />
            <path d="M18 4l-3-2M18 4l-3 2" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>{trip.to}</span>
        </div>
      </div>

      {/* Time */}
      <div className="mt-4 flex items-center gap-3 text-sm text-slate-600">
        <span className="flex items-center gap-1.5">
          <IconClock className="h-4 w-4 text-slate-400" />
          <span className="font-semibold text-slate-900">{trip.time}</span>
        </span>
        <span className="h-1 w-1 rounded-full bg-slate-300" />
        <span>{trip.date}</span>
      </div>

      {/* Driver */}
      <div className="mt-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-bold text-white">
          {trip.initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <p className="truncate text-sm font-bold text-slate-900">{trip.driver}</p>
            {trip.verified && (
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <IconStar className="h-3 w-3 text-accent-500" />
            <span className="font-semibold text-slate-700">{trip.rating}</span>
            <span>· {trip.trips} поездок</span>
          </div>
        </div>
      </div>

      {/* Car */}
      <div className="mt-4 flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5 text-sm text-slate-600">
        <IconCar className="h-4 w-4 text-slate-400" />
        <span className="font-medium text-slate-800">{trip.car}</span>
      </div>

      {/* Footer */}
      <div className="mt-auto flex items-end justify-between border-t border-slate-100 pt-4">
        <div>
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <IconUsers className="h-3.5 w-3.5" />
            <span className="font-semibold text-slate-700">{trip.seats}</span> мест
          </div>
          <p className="mt-0.5 text-xl font-bold text-slate-900">
            {trip.price} <span className="text-sm font-medium text-slate-500">сом</span>
          </p>
        </div>
        <button
          type="button"
          className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
        >
          Забронировать
        </button>
      </div>
    </article>
  );
}
