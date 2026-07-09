import { Column } from "../components/Column/Column.tsx";
import { useJobsStore } from "../store/jobsStore";
import { AddJobForm } from "../components/AddJobForm/AddJobForm.tsx";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import type { JobStatus } from "../types/job.ts";
import { Statistics } from "../components/Statistics/Statistics.tsx";
import { STATUSES } from "../constants/statuses.ts";
import { useState } from "react";
// 1. ИМПОРТ: Добавляем иконку Search
import { Search } from "lucide-react";

export const Home = () => {
  const jobs = useJobsStore((state) => state.jobs);
  const moveJob = useJobsStore((state) => state.moveJob);
  const [search, setSearch] = useState("");

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    moveJob(active.id as string, over.id as JobStatus);
  };

  const filterdJobs = jobs.filter((job) => {
    const query = search.trim().toLowerCase();
    return (
      job.company.toLowerCase().includes(query) ||
      job.position.toLowerCase().includes(query)
    );
  });

  // ... (все импорты и логика остаются прежними)

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 antialiased selection:bg-blue-500/10">
      {/* Паддинги уменьшаются на мобилках (px-3 py-4) и увеличиваются на десктопе */}
      <div className="max-w-[1600px] mx-auto px-3 py-4 md:px-8 md:py-8">
        {/* Шапка: на мобилках всё в столбик (flex-col), центрируется. На десктопе — в линию */}
        <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-200 pb-5">
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
              Мой трекер вакансий
            </h1>
            <p className="text-xs md:text-sm text-slate-500 mt-1">
              Отслеживайте отклики и управляйте этапами в одном месте.
            </p>
          </div>

          {/* Поиск и форма: на мобилках занимают 100% ширины (w-full) */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch w-full md:w-auto">
            <div className="relative w-full sm:w-72 md:w-80">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search size={16} strokeWidth={2} />
              </div>
              <input
                type="text"
                placeholder="Поиск вакансий..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl shadow-sm text-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
              />
            </div>
            <AddJobForm />
          </div>
        </header>

        {/* Блок статистики (уже адаптирован под свайп в предыдущем шаге) */}
        <section className="mb-6">
          <Statistics />
        </section>

        {/* Канбан-доска */}
        <main className="bg-transparent border-0 md:bg-white/50 md:backdrop-blur-sm md:border md:border-slate-200/80 md:rounded-2xl p-0 md:p-6 md:shadow-sm">
          <DndContext onDragEnd={handleDragEnd}>
            {/* ЗАМЕНА: Вместо flex и overflow-x-auto используем сетку CSS Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-start min-h-[65vh]">
              {STATUSES.map((status) => (
                /* ЗАМЕНА: Убрали фиксированную ширину w-[320px], теперь колонка адаптируется под размер ячейки сетки */
                <div key={status.id} className="w-full">
                  <Column
                    title={status.title}
                    status={status.id}
                    jobs={filterdJobs.filter((job) => job.status === status.id)}
                  />
                </div>
              ))}
            </div>
          </DndContext>
        </main>
      </div>
    </div>
  );
};
