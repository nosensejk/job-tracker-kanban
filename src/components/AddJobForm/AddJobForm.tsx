import { useState } from "react";
import { useJobsStore } from "../../store/jobsStore";
import type { Job } from "../../types/job";

export const AddJobForm = () => {
  const addJob = useJobsStore((state) => state.addJob);

  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!company || !position) {
      return;
    }

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
      className="flex gap-3 p-4 mb-4 bg-white rounded-xl shadow"
    >
      <input
        type="text"
        placeholder="Компания"
        value={company}
        className="border rounded-md px-3 py-2 w-64"
        onChange={(e) => setCompany(e.target.value)}
      />

      <input
        type="text"
        placeholder="Должность"
        value={position}
        className="border rounded-md px-3 py-2 w-64"
        onChange={(e) => setPosition(e.target.value)}
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">Добавить</button>
    </form>
  );
};
