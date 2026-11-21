const numbers = [
  { value: "12 000+", label: "Зарегистрированных пользователей" },
  { value: "1 200+", label: "Активных проверенных водителей" },
  { value: "7", label: "Регионов Кыргызстана охвачено" },
  { value: "48 000+", label: "Завершённых поездок за всё время" },
];

export function Stats() {
  return (
    <section className="border-y border-slate-100 bg-brand-700 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {numbers.map((n) => (
            <div key={n.label} className="text-center">
              <p className="text-3xl font-bold text-white sm:text-4xl">{n.value}</p>
              <p className="mt-2 text-sm text-brand-200">{n.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
