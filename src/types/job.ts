export type JobStatus =
  | "found"
  | "applied"
  | "interview"
  | "test"
  | "offer"
  | "rejected";

export interface Job {
   id: string;
   company: string;
   position: string;
   salary?: string;
   notes?: string;
   status: JobStatus;
   createdAt: string;
}
