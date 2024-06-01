import { Patient } from "../types";

export const formatDate = (date: Patient["date"]): string => {
  const newDate = new Date(date);

  return Intl.DateTimeFormat("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(newDate);
};
