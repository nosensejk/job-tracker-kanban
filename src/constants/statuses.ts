import type { JobStatus } from "../types/job";

export const STATUSES: {
   id: JobStatus;
   title: string;
}[] = [
   {
    id: "found",
    title: "Найдены",
  },
  {
    id: "applied",
    title: "Откликнулся",
  },
  {
    id: "interview",
    title: "Интервью",
  },
  {
    id: "test",
    title: "Тестовое",
  },
  {
    id: "offer",
    title: "Оффер",
  },
  {
    id: "rejected",
    title: "Отказ",
  },
]