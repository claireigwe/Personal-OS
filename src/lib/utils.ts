import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function startOfToday() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export function startOfDate(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function isSameDay(a: Date, b: Date) {
  return startOfDate(a).getTime() === startOfDate(b).getTime();
}

export function isYesterday(date: Date, reference = new Date()) {
  const yesterday = startOfDate(reference);
  yesterday.setDate(yesterday.getDate() - 1);
  return startOfDate(date).getTime() === yesterday.getTime();
}
