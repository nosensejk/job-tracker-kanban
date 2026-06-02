import type { Job, JobStatus } from "../../types/job";
import { useJobsStore } from "../../store/jobsStore";
import { useDraggable } from "@dnd-kit/core";

interface JobCardProps {
  job: Job;
}

export const JobCard = ({ job }: JobCardProps) => {
  const deleteJob = useJobsStore((state) => state.deleteJob);
  const moveJob = useJobsStore((state) => state.moveJob);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: job.id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white p-3 mt-2 rounded shadow"
    >
      <div
        {...listeners}
        {...attributes}
        className="cursor-grab
    select-none
    text-gray-400
    mb-2 w-fit" 
      >
        ⠿
      </div>
      <h3>{job.position}</h3>
      <p>{job.company}</p>
      {job.salary && <p>{job.salary}</p>}

      <select
        className="border rounded"
        value={job.status}
        onChange={(e) => moveJob(job.id, e.target.value as JobStatus)}
      >
        <option value="found">Найдены</option>

        <option value="applied">Откликнулся</option>

        <option value="interview">Интервью</option>

        <option value="test">Тестовое</option>

        <option value="offer">Оффер</option>

        <option value="rejected">Отказ</option>
      </select>

      <button
        className="mt-3 px-3 py-1 rounded border cursor-pointer"
        onClick={() => deleteJob(job.id)}
      >
        Удалить
      </button>
    </div>
  );
};
