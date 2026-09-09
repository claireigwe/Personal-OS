"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type ActivityData = {
  date: string; // "YYYY-MM-DD" in local time
  count: number;
  details?: string;
};

type ActivityHeatmapProps = {
  activities: ActivityData[];
  days?: number; // default 91 days (13 weeks)
};

// Formats a Date object to "YYYY-MM-DD" using local calendar time (never UTC)
function toLocalDateKey(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Parses "YYYY-MM-DD" safely into local Date without timezone shift
function formatDisplayDate(dateStr: string): string {
  const parts = dateStr.split("-").map(Number);
  if (parts.length !== 3) return dateStr;
  const d = new Date(parts[0], parts[1] - 1, parts[2]);
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric"
  });
}

export function ActivityHeatmap({ activities, days = 91 }: ActivityHeatmapProps) {
  const [hoveredDay, setHoveredDay] = useState<ActivityData | null>(null);

  // Map of "YYYY-MM-DD" -> ActivityData
  const activityMap = useMemo(() => {
    const map = new Map<string, ActivityData>();
    for (const act of activities) {
      map.set(act.date, act);
    }
    return map;
  }, [activities]);

  // Generate date grid for the past `days`
  const { weeks, totalActivities, activeDaysCount } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayKey = toLocalDateKey(today);

    const weekList: Array<Array<{ dateStr: string; dateObj: Date; count: number; details?: string }>> = [];
    let currentWeek: Array<{ dateStr: string; dateObj: Date; count: number; details?: string }> = [];

    // Align start to start of the week (Sunday)
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - (days - 1));
    const dayOfWeek = startDate.getDay();
    startDate.setDate(startDate.getDate() - dayOfWeek);

    let total = 0;
    let activeDays = 0;

    const cursor = new Date(startDate);
    while (cursor <= today || cursor.getDay() !== 0) {
      const dateStr = toLocalDateKey(cursor);
      const isFuture = cursor > today;
      const data = activityMap.get(dateStr);
      const count = isFuture ? -1 : data?.count ?? 0;
      const details = data?.details;

      if (!isFuture && count > 0) {
        total += count;
        activeDays++;
      }

      currentWeek.push({
        dateStr,
        dateObj: new Date(cursor),
        count,
        details
      });

      if (currentWeek.length === 7) {
        weekList.push(currentWeek);
        currentWeek = [];
      }

      cursor.setDate(cursor.getDate() + 1);
    }

    if (currentWeek.length > 0) {
      weekList.push(currentWeek);
    }

    return { weeks: weekList, totalActivities: total, activeDaysCount: activeDays };
  }, [activityMap, days]);

  const getIntensityColor = (count: number) => {
    if (count < 0) return "opacity-0 pointer-events-none"; // future filler in trailing week
    if (count === 0) return "bg-muted/50 dark:bg-white/[0.06] border border-transparent";
    if (count === 1) return "bg-emerald-200 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-800";
    if (count === 2) return "bg-emerald-300 dark:bg-emerald-800 border border-emerald-400 dark:border-emerald-700";
    if (count === 3) return "bg-emerald-400 dark:bg-emerald-600 border border-emerald-500 dark:border-emerald-500";
    return "bg-emerald-500 dark:bg-emerald-400 border border-emerald-600 dark:border-emerald-300 shadow-sm";
  };

  return (
    <div className="grid gap-3">
      <div className="flex items-center justify-between text-xs">
        <span className="font-bold text-muted-foreground uppercase tracking-wider">
          Consistency Heatmap
        </span>
        <span className="font-semibold text-primary">
          {activeDaysCount} active {activeDaysCount === 1 ? "day" : "days"} · {totalActivities} actions
        </span>
      </div>

      {/* Heatmap grid */}
      <div className="overflow-x-auto pb-1 pt-1 -mx-2 px-2">
        <div className="inline-flex gap-1.5 min-w-full justify-start sm:justify-center">
          {weeks.map((week, wIdx) => (
            <div key={wIdx} className="grid grid-rows-7 gap-1.5">
              {week.map((day) => {
                const isHovered = hoveredDay?.date === day.dateStr;
                return (
                  <button
                    key={day.dateStr}
                    type="button"
                    onMouseEnter={() =>
                      day.count >= 0 &&
                      setHoveredDay({
                        date: day.dateStr,
                        count: day.count,
                        details: day.details
                      })
                    }
                    onMouseLeave={() => setHoveredDay(null)}
                    onClick={() =>
                      day.count >= 0 &&
                      setHoveredDay({
                        date: day.dateStr,
                        count: day.count,
                        details: day.details
                      })
                    }
                    className={cn(
                      "h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-[4px] transition-all",
                      getIntensityColor(day.count),
                      isHovered && "ring-2 ring-primary scale-125 z-10"
                    )}
                    aria-label={`${day.dateStr}: ${day.count} activities`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Hover Tooltip / Status Display */}
      <div className="min-h-[22px] text-center text-xs text-muted-foreground transition-all">
        {hoveredDay ? (
          <p className="font-medium animate-fade-in text-foreground">
            <span className="font-bold text-primary">
              {formatDisplayDate(hoveredDay.date)}
            </span>
            : {hoveredDay.count === 0 ? "No activity logged" : `${hoveredDay.count} activities ${hoveredDay.details ? `(${hoveredDay.details})` : ""}`}
          </p>
        ) : (
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground/70">
            <span>Less</span>
            <span className="h-2.5 w-2.5 rounded-[3px] bg-muted/50 dark:bg-white/[0.06]" />
            <span className="h-2.5 w-2.5 rounded-[3px] bg-emerald-200 dark:bg-emerald-950" />
            <span className="h-2.5 w-2.5 rounded-[3px] bg-emerald-300 dark:bg-emerald-800" />
            <span className="h-2.5 w-2.5 rounded-[3px] bg-emerald-400 dark:bg-emerald-600" />
            <span className="h-2.5 w-2.5 rounded-[3px] bg-emerald-500 dark:bg-emerald-400" />
            <span>More</span>
          </div>
        )}
      </div>
    </div>
  );
}
