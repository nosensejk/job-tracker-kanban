import type { Job, JobStatus } from "../../types/job";
import { JobCard } from "../JobCard/JobCard";
import { useDroppable } from "@dnd-kit/core";

interface Props {
   title: string;
   status: JobStatus;
   jobs: Job[];
}

export const Column =({
   title,
   status,
   jobs,
}: Props) => {
   const {setNodeRef} = useDroppable({id: status,});
   return (
      <div ref={setNodeRef} className="w-80 bg-slate-100 rounded-xl p-4 min-h-[500px] shadow-sm">
         <h2 className="font-semibold text-lg mb-4"> {title}</h2>
         {jobs.map((job) => (
            <JobCard key={job.id} job={job}/>
         ))}
      </div>
   );
};