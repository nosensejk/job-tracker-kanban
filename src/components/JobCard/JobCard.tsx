import type { Job, JobStatus } from "../../types/job";
import { useJobsStore } from "../../store/jobsStore";
import { useDraggable } from "@dnd-kit/core";
import { useState } from "react";
import { Pencil, Trash2, GripVertical, X, Check } from "lucide-react";

interface JobCardProps {
  job: Job;
}

export const JobCard = ({ job }: JobCardProps) => {
  const deleteJob = useJobsStore((state) => state.deleteJob);
  const updatejob = useJobsStore((state) => state.updateJob);
  const moveJob = useJobsStore((state) => state.moveJob);

  const [isEditing, setIsEditing] = useState(false);
  const [company, setCompany] = useState(job.company);
  const [position, setPosition] = useState(job.position);

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: job.id,
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition: isDragging ? "none" : "transform 200ms ease",
        zIndex: isDragging ? 50 : 1,
      }
    : undefined;

  if (isEditing) {
    return (
      <div className="bg-white rounded-2xl p-3 shadow-md border border-blue-400 animate-fadeIn flex flex-col gap-2.5 w-full box-border">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
            Компания
          </label>
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-slate-50 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
            Должность
          </label>
          <input
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="w-full text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-slate-50 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
          />
        </div>

        <div className="flex flex-col xl:flex-row flex-wrap gap-1.5 mt-1">
          <button
            className="w-full bg-blue-600 text-white text-xs font-semibold py-2 rounded-xl hover:bg-blue-700 active:scale-[0.98] transition cursor-pointer shadow-sm shadow-blue-500/10 flex items-center justify-center gap-1 flex-shrink-0"
            onClick={() => {
              updatejob({ ...job, company, position });
              setIsEditing(false);
            }}
          >
            <Check size={14} className="flex-shrink-0" />
            <span className="truncate">Сохранить</span>
          </button>
          <button
            className="w-full bg-slate-100 text-slate-600 text-xs font-medium py-2 rounded-xl hover:bg-slate-200 active:scale-[0.98] transition cursor-pointer flex items-center justify-center gap-1 flex-shrink-0"
            onClick={() => {
              setCompany(job.company);
              setPosition(job.position);
              setIsEditing(false);
            }}
          >
            <X size={14} className="flex-shrink-0" />
            <span className="truncate">Отмена</span>
          </button>
        </div>
      </div>
    );
  }

  

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white p-3 md:p-4 rounded-2xl border border-slate-150 shadow-sm transition-all duration-200 group relative ${
        isDragging
          ? "opacity-50 shadow-2xl ring-2 ring-blue-500/20 rotate-2 cursor-grabbing"
          : "hover:shadow-md hover:border-slate-300/80"
      }`}
    >
     
      <div className="flex justify-between items-start gap-2">
        <div className="flex flex-col gap-0.5 min-w-0">
          {" "}
        
          <h3 className="font-bold text-slate-800 text-[14px] md:text-[15px] leading-snug truncate group-hover:text-blue-600 transition-colors">
            {job.position}
          </h3>
          <p className="text-xs md:text-sm font-medium text-slate-500 truncate">
            {job.company}
          </p>
        </div>

        <div
          {...listeners}
          {...attributes}
          className="cursor-grab active:cursor-grabbing select-none text-slate-300 hover:text-slate-500 p-1 rounded transition-colors flex-shrink-0"
          title="Перетащить"
        >
          <GripVertical size={18} strokeWidth={1.5} />
        </div>
      </div>

     
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-3 pt-2.5 border-t border-slate-100">
        <select
          className="w-full sm:w-auto text-[11px] md:text-xs bg-slate-50 border border-slate-200 text-slate-600 rounded-lg px-2 py-1 focus:outline-none focus:border-blue-500 cursor-pointer font-medium"
          value={job.status}
          onChange={(e) => moveJob(job.id, e.target.value as JobStatus)}
        >
          <option value="found">Поиск</option>
          <option value="applied">Отклик</option>
          <option value="interview">Интервью</option>
        </select>

      
        <div className="flex items-center justify-end gap-1 flex-shrink-0 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer flex-shrink-0"
            onClick={() => setIsEditing(true)}
            title="Редактировать"
          >
            <Pencil size={14} />
          </button>
          <button
            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer flex-shrink-0"
            onClick={() => deleteJob(job.id)}
            title="Удалить"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
