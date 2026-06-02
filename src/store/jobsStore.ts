import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Job, JobStatus } from "../types/job";

interface JobsStore {
  jobs: Job[];
  addJob: (job: Job) => void;
  moveJob: (jobId: string, status: JobStatus) => void;
  deleteJob: (jobId: string) => void;
  updateJob: (job: Job) => void;
}

export const useJobsStore = create<JobsStore>()(
  persist(
    (set) => ({
      jobs: [],
      addJob: (job) =>
        set((state) => ({
          jobs: [...state.jobs, job],
        })),
      moveJob: (jobId, status) =>
        set((state) => ({
          jobs: state.jobs.map((job) =>
            job.id === jobId ? { ...job, status } : job,
          ),
        })),
      deleteJob: (jobId) =>
        set((state) => ({
          jobs: state.jobs.filter((job) => job.id !== jobId),
        })),
      updateJob: (updatedJob) => set((state) => ({
        jobs: state.jobs.map((job) => 
        job.id === updatedJob.id ? updatedJob : job),
      }))
    }),
    {
      name: "jobs-storage",
    },
  ),
);
