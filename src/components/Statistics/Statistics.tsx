import { useJobsStore } from "../../store/jobsStore";

export const Statistics = () => {
  const jobs = useJobsStore((state) => state.jobs);

  // Исправлен баг: инициализируем все поля нулями, чтобы не поймать NaN
  const stats = jobs.reduce(
    (acc, job) => {
      if (acc[job.status] !== undefined) {
        acc[job.status]++;
      }
      return acc;
    },
    {
      found: 0,
      applied: 0,
      interview: 0,
      test: 0,
      offer: 0,
      rejected: 0,
    } as Record<string, number>
  );

  const cards = [
    { title: "Всего", value: jobs.length, color: "border-l-slate-400 text-slate-700 bg-slate-50/50" },
    { title: "Найдены", value: stats.found, color: "border-l-blue-400 text-blue-700 bg-blue-50/30" },
    { title: "Отклики", value: stats.applied, color: "border-l-amber-400 text-amber-700 bg-amber-50/30" },
    { title: "Интервью", value: stats.interview, color: "border-l-purple-400 text-purple-700 bg-purple-50/30" },
    { title: "Тестовое", value: stats.test, color: "border-l-indigo-400 text-indigo-700 bg-indigo-50/30" },
    { title: "Оффер", value: stats.offer, color: "border-l-emerald-500 text-emerald-700 bg-emerald-50/40 font-bold" },
    { title: "Отказ", value: stats.rejected, color: "border-l-rose-400 text-rose-600 bg-rose-50/30" },
  ];

  return (
    <div className="mb-6 overflow-x-auto pb-2 scrollbar-none">
      <div className="flex flex-wrap gap-4">
        {cards.map((card) => (
          <div 
            key={card.title} 
            className={`border-l-4 ${card.color} border-y border-r border-slate-200/60 rounded-2xl px-5 py-3.5 min-w-[140px] flex-1 bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5`}
          >
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              {card.title}
            </p>
            <p className="text-2xl font-bold tracking-tight text-slate-800">
              {card.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};