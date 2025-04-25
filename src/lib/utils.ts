import { clsx, type ClassValue } from "clsx";
import { DateObject } from "react-multi-date-picker";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFormattedDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  return `${year}-${month}-${day}`;
};

export function dateConvert(app_date: string) {
  const date = new Date(app_date);
  const jalali_date = date.toLocaleDateString("fa-IR");
  return jalali_date;
}

export function convertBaseDate(date: DateObject): string {
  return date
    .toDate()
    .toISOString()
    .slice(0, 19)
    .replace("T", " ")
    .slice(0, 10);
}
