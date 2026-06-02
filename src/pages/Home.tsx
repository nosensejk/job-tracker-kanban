import { Column } from "../components/Column/Column.tsx";
import { useJobsStore } from "../store/jobsStore";
import { AddJobForm } from "../components/AddJobForm/AddJobForm.tsx";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import type { JobStatus } from "../types/job.ts";

export const Home = () => {
  const jobs = useJobsStore((state) => state.jobs);
  const moveJob = useJobsStore((state) => state.moveJob);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      return;
    }
    moveJob(active.id as string, over.id as JobStatus);
  };
  return (
    <>
      <AddJobForm />
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4 p-4 overfolw-x-auto">
          <Column
            title="Найдены"
            status="found"
            jobs={jobs.filter((j) => j.status === "found")}
          />
          <Column
            title="Откликнулся"
            status="applied"
            jobs={jobs.filter((j) => j.status === "applied")}
          />
          <Column
            title="Интервью"
            status="interview"
            jobs={jobs.filter((j) => j.status === "interview")}
          />
        </div>
      </DndContext>
    </>
  );
};
