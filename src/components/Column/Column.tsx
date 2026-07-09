import type { Job, JobStatus } from "../../types/job";
import { JobCard } from "../JobCard/JobCard";
import { useDroppable } from "@dnd-kit/core";

interface Props {
  title: string;
  status: JobStatus;
  jobs: Job[];
}

export const Column = ({ title, status, jobs }: Props) => {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div
      ref={setNodeRef}
      className={`w-full bg-slate-50/80 border border-slate-200/60 rounded-2xl p-4 min-h-[300px] md:min-h-[400px] shadow-sm flex flex-col transition-colors duration-200 ${
        isOver ? "bg-blue-50/40 border-blue-300" : ""
      }`}
    >
      {/* Шапка колонки со счетчиком задач */}
      <div className="flex justify-between items-center mb-4 px-1">
        <h2 className="font-semibold text-slate-800 tracking-tight">{title}</h2>
        <span className="bg-slate-200/70 text-slate-600 text-xs font-bold px-2 py-0.5 rounded-full shadow-inner">
          {jobs.length}
        </span>
      </div>

      {/* Контейнер для карточек */}
      <div className="flex-1 flex flex-col gap-3">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};
