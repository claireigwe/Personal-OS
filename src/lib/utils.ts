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

export function formatDateInputValue(date: Date | string): string {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatTaskDate(date: Date | string): string {
  const d = new Date(date);
  const today = startOfToday();
  const target = startOfDate(d);
  const diffTime = target.getTime() - today.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === -1) return "Yesterday";
  if (diffDays === 1) return "Tomorrow";
  if (diffDays < -1) return `${Math.abs(diffDays)}d ago`;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
