import { useState } from "react";
import { useJobsStore } from "../../store/jobsStore";
import type { Job } from "../../types/job";
// Импортируем иконку PlusCircle
import { PlusCircle } from "lucide-react";

export const AddJobForm = () => {
  const addJob = useJobsStore((state) => state.addJob);

  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!company || !position) return;

    const newJob: Job = {
      id: crypto.randomUUID(),
      company,
      position,
      status: "found",
      createdAt: new Date().toISOString(),
    };

    addJob(newJob);
    setCompany("");
    setPosition("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 p-2 bg-slate-100/80 rounded-2xl border border-slate-200/50 sm:bg-transparent sm:p-0 sm:border-0"
    >
      <input
        type="text"
        placeholder="Компания..."
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className="w-full sm:w-48 text-sm border border-slate-200 rounded-xl px-4 py-2.5 bg-white shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
      />

      <input
        type="text"
        placeholder="Должность..."
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        className="w-full sm:w-56 text-sm border border-slate-200 rounded-xl px-4 py-2.5 bg-white shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
      />
      
      <button 
        type="submit" 
        className="bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-sm shadow-blue-500/10 flex items-center justify-center gap-2"
      >
        <span>Добавить</span>
     
        <PlusCircle size={18} strokeWidth={2.5} />
      </button>
    </form>
  );
};