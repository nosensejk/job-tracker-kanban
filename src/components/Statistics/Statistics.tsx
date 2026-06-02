import { useJobsStore } from "../../store/jobsStore";

export const Statistics = () => {
  const jobs = useJobsStore((state) => state.jobs);

  const stats = jobs.reduce(
   (acc, job) => {
      acc[job.status]++;
      return acc;
   },
   {
      found: 0,
      applied: 0,
      interview: 0,
      test: 0,
      offer: 0,
      rejected: 0,
   }
  );

  const cards = [
   {
      title: "Всего",
      value: jobs.length,
   },
   {
      title: "Найдены",
      value: stats.found,
   },
   {
      title: "Отклики",
      value: stats.applied,
   },
   {
      title: "Интервью",
      value: stats.interview,
   },
   {
      title: "Тестовое",
      value: stats.test,
   },
   {
      title: "Оффер",
      value: stats.offer,
   },
   {
      title: "Отказ",
      value: stats.rejected,
   },
  ]

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-4">
         {cards.map((card) =>(
            <div key={card.title} className="bg-white rounded-xl shadow px-6 py-4 min-w-[130px] border border-slate-200 transition hover:shadow-md hover:-translate">
               <p className="text-slate-500 text-bold">{card.title}</p>
               <p className="text-slate-500 text-sm">{card.value}</p>
            </div>
         ))}
      </div>
    </div>
  );
};
