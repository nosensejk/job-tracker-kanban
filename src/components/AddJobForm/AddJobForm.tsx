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
      className="flex gap-2 p-4"
    >
      <input
        type="text"
        placeholder="Компания"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <input
        type="text"
        placeholder="Должность"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
      />

      <button type="submit">Добавить</button>
    </form>
  );
};
