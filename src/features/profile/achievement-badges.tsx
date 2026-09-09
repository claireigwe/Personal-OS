"use client";

import { Lock, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type BadgeDefinition = {
  id: string;
  emoji: string;
  title: string;
  description: string;
  isUnlocked: boolean;
  progressText?: string;
};

type AchievementBadgesProps = {
  streak: number;
  longestStreak: number;
  completedTasks: number;
  completedLessons: number;
  reflectionsCount: number;
};

export function AchievementBadges({
  streak,
  longestStreak,
  completedTasks,
  completedLessons,
  reflectionsCount
}: AchievementBadgesProps) {
  const badges: BadgeDefinition[] = [
    {
      id: "first-task",
      emoji: "🌱",
      title: "First Step",
      description: "Complete your first task",
      isUnlocked: completedTasks >= 1,
      progressText: completedTasks >= 1 ? undefined : "0/1"
    },
    {
      id: "first-lesson",
      emoji: "🇳🇱",
      title: "Dutch Explorer",
      description: "Complete your first Dutch lesson",
      isUnlocked: completedLessons >= 1,
      progressText: completedLessons >= 1 ? undefined : "0/1"
    },
    {
      id: "first-reflection",
      emoji: "📖",
      title: "Reflective Mind",
      description: "Write your first daily reflection",
      isUnlocked: reflectionsCount >= 1,
      progressText: reflectionsCount >= 1 ? undefined : "0/1"
    },
    {
      id: "streak-3",
      emoji: "🔥",
      title: "Flame Keeper",
      description: "Achieve a 3-day streak",
      isUnlocked: longestStreak >= 3 || streak >= 3,
      progressText: `${Math.min(streak, 3)}/3 days`
    },
    {
      id: "task-master-5",
      emoji: "⚡",
      title: "Task Master",
      description: "Complete 5 tasks",
      isUnlocked: completedTasks >= 5,
      progressText: `${Math.min(completedTasks, 5)}/5`
    },
    {
      id: "dutch-scholar-5",
      emoji: "🎓",
      title: "Dutch Scholar",
      description: "Complete 5 Dutch lessons",
      isUnlocked: completedLessons >= 5,
      progressText: `${Math.min(completedLessons, 5)}/5`
    },
    {
      id: "streak-7",
      emoji: "🌟",
      title: "Unstoppable",
      description: "Achieve a 7-day streak",
      isUnlocked: longestStreak >= 7 || streak >= 7,
      progressText: `${Math.min(streak, 7)}/7 days`
    },
    {
      id: "journalist-5",
      emoji: "✍️",
      title: "Journalist",
      description: "Write 5 daily reflections",
      isUnlocked: reflectionsCount >= 5,
      progressText: `${Math.min(reflectionsCount, 5)}/5`
    }
  ];

  const unlockedCount = badges.filter((b) => b.isUnlocked).length;

  return (
    <div className="grid gap-3.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
          Milestones & Badges
        </span>
        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
          {unlockedCount} / {badges.length} unlocked
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {badges.map((b) => (
          <div
            key={b.id}
            className={cn(
              "relative flex flex-col items-center text-center p-3 rounded-2xl border-2 transition-all",
              b.isUnlocked
                ? "border-primary/25 bg-gradient-to-b from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 shadow-sm hover-lift"
                : "border-border/40 bg-muted/20 opacity-60 grayscale hover:grayscale-0 hover:opacity-90"
            )}
          >
            <div
              className={cn(
                "mb-2 flex h-11 w-11 items-center justify-center rounded-xl text-xl shadow-sm transition-transform",
                b.isUnlocked
                  ? "bg-white dark:bg-white/10 scale-105"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {b.emoji}
            </div>

            <p className="text-xs font-bold text-foreground leading-tight">{b.title}</p>
            <p className="mt-1 text-[11px] text-muted-foreground line-clamp-2 leading-tight">
              {b.description}
            </p>

            {b.isUnlocked ? (
              <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-primary">
                <Check className="h-3 w-3" /> Unlocked
              </span>
            ) : (
              <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-medium text-muted-foreground">
                <Lock className="h-2.5 w-2.5" /> {b.progressText}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
