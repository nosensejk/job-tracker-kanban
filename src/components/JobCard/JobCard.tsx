import type { Job, JobStatus } from "../../types/job";
import { useJobsStore } from "../../store/jobsStore";
import { useDraggable } from "@dnd-kit/core";
import { useState } from "react";

interface JobCardProps {
  job: Job;
}

export const JobCard = ({ job }: JobCardProps) => {
  const deleteJob = useJobsStore((state) => state.deleteJob);
  const moveJob = useJobsStore((state) => state.moveJob);
  const updatejob = useJobsStore((state) => state.updateJob);

  const [isEditing, setIsEditing] = useState(false);

  const [company, setCompany] = useState(job.company);
  const [position, setPosition] = useState(job.position);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: job.id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  if (isEditing) {
    return (
      <div className="bg-white rounded-xl p-4 mb-3 shadow border border-slate-200">
        <label className="block text-sm font-medium text-slate-600 mb-1">
          Компания
        </label>
        <input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label className="block text-sm font-medium text-slate-600 mb-1">
          Должность
        </label>
        <input
          value={position}
          className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setPosition(e.target.value)}
        />

        <div className="flex gap-2 mt-2">
          <button
            className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            onClick={() => {
              updatejob({ ...job, company, position });
              setIsEditing(false);
            }}
          >
            Сохранить
          </button>
          <button
            className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            onClick={() => {
              setCompany(job.company);
              setPosition(job.position);
              setIsEditing(false);
            }}
          >
            Отмена
          </button>
        </div>
      </div>
    );
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white p-4 mb-3 rounded-xl shadow border border-slate-200 hover:shadow-md"
    >
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-lg">{job.position}</h3>
        <div
          {...listeners}
          {...attributes}
          className="cursor-grab select-none text-gray-400 mb-3 w-fit"
        >
          ⠿
        </div>
      </div>

      <p className="text-slate-600 mt-1">{job.company}</p>
      {job.salary && <p>{job.salary}</p>}

      <div className="flex gap-2 mt-4 flex-wrap">
        <select
          className="border rounded-md px-2 py-1"
          value={job.status}
          onChange={(e) => moveJob(job.id, e.target.value as JobStatus)}
        >
          <option value="found">Найдены</option>
          <option value="applied">Откликнулся</option>
          <option value="interview">Интервью</option>
        </select>

        <button
          className="px-3 py-1 rounded-md border hover:bg-slate-100 transition cursor-pointer"
          onClick={() => setIsEditing(true)}
        >
          Редактировать
        </button>
        <button
          className="px-3 py-1 rounded-md border text-red-600 hover:bg-red-50 transition cursor-pointer"
          onClick={() => deleteJob(job.id)}
        >
          Удалить
        </button>
      </div>
    </div>
  );
};
