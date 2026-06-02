import { Column } from "../components/Column/Column.tsx";
import { useJobsStore } from "../store/jobsStore";
import { AddJobForm } from "../components/AddJobForm/AddJobForm.tsx";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import type { JobStatus } from "../types/job.ts";
import { Statistics } from "../components/Statistics/Statistics.tsx";
import { STATUSES } from "../constants/statuses.ts";
import { useState } from "react";

export const Home = () => {
  const jobs = useJobsStore((state) => state.jobs);
  const moveJob = useJobsStore((state) => state.moveJob);

  const [search, setSearch] = useState("");

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      return;
    }
    moveJob(active.id as string, over.id as JobStatus);
  };

  const filterdJobs = jobs.filter((jobs) => {
    const query = search.trim().toLowerCase();

    return (
      jobs.company.toLowerCase().includes(query) ||
      jobs.position.toLowerCase().includes(query)
    );
  })
  return (
    <div className="max-w-14/15 mx-auto">
      <AddJobForm />
      <Statistics/>
      <div className="px-4 mb-4">
        <input type="text" placeholder="Поиск вакансий..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full max-w-md border border-slate-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
      </div>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4 p-4 overfolw-x-auto">
          {STATUSES.map((status) => (
            <Column
              key={status.id}
              title={status.title}
              status={status.id}
              jobs={filterdJobs.filter((job) => job.status === status.id)}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
};
