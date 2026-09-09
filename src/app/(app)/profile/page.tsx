import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { logoutAction } from "@/features/auth/actions";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResetProgressButton } from "@/features/profile/reset-progress-button";
import { ReflectionsHistory } from "@/features/reflections/reflections-history";
import { ActivityHeatmap } from "@/features/profile/activity-heatmap";
import { AchievementBadges } from "@/features/profile/achievement-badges";

export default async function ProfilePage() {
  const session = await auth();
  const userId = session!.user.id;

  const [
    streak,
    completedLessonsCount,
    totalLessons,
    reflections,
    completedTasks,
    completedLessonRecords
  ] = await Promise.all([
    prisma.streak.upsert({ where: { userId }, update: {}, create: { userId } }),
    prisma.lessonProgress.count({ where: { userId, completedAt: { not: null } } }),
    prisma.lesson.count(),
    prisma.reflection.findMany({
      where: { userId },
      orderBy: { entryDate: "desc" }
    }),
    prisma.task.findMany({
      where: { userId, status: "COMPLETED" },
      select: { completedAt: true, activeDate: true }
    }),
    prisma.lessonProgress.findMany({
      where: { userId, completedAt: { not: null } },
      select: { completedAt: true }
    })
  ]);

  // Aggregate daily activity counts for heatmap
  const activityMap = new Map<string, { count: number; tasks: number; reflections: number; lessons: number }>();

  const recordAct = (dateObj: Date | null | undefined, type: "tasks" | "reflections" | "lessons") => {
    if (!dateObj) return;
    const d = new Date(dateObj);
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    const curr = activityMap.get(dateStr) ?? { count: 0, tasks: 0, reflections: 0, lessons: 0 };
    curr.count++;
    curr[type]++;
    activityMap.set(dateStr, curr);
  };

  for (const t of completedTasks) recordAct(t.completedAt ?? t.activeDate, "tasks");
  for (const r of reflections) recordAct(r.entryDate, "reflections");
  for (const l of completedLessonRecords) recordAct(l.completedAt, "lessons");

  const activities = Array.from(activityMap.entries()).map(([date, d]) => {
    const parts: string[] = [];
    if (d.tasks > 0) parts.push(`${d.tasks} ${d.tasks === 1 ? "task" : "tasks"}`);
    if (d.reflections > 0) parts.push(`${d.reflections} ${d.reflections === 1 ? "reflection" : "reflections"}`);
    if (d.lessons > 0) parts.push(`${d.lessons} ${d.lessons === 1 ? "lesson" : "lessons"}`);
    return { date, count: d.count, details: parts.join(", ") };
  });

  const initials = (session?.user.name ?? "?")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="grid gap-6">
      {/* Profile header */}
      <section className="flex flex-col items-center text-center animate-slide-up">
        <div className="flex h-20 w-20 items-center justify-center rounded-full gradient-primary text-2xl font-bold text-white shadow-glow-lg">
          {initials}
        </div>
        <h1 className="mt-4 text-2xl font-bold tracking-tight">{session?.user.name}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{session?.user.email}</p>
      </section>

      {/* Stats & Activity Heatmap */}
      <Card className="animate-slide-up" style={{ animationDelay: "0.05s" }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>🏆</span> Accountability
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-900/20 dark:to-orange-800/10 p-4 text-center">
              <p className="text-3xl font-bold">🔥 {streak.count}</p>
              <p className="text-xs font-semibold text-muted-foreground mt-1">current streak</p>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-800/10 p-4 text-center">
              <p className="text-3xl font-bold">⚡ {streak.longestCount}</p>
              <p className="text-xs font-semibold text-muted-foreground mt-1">longest streak</p>
            </div>
            <div className="col-span-2 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-900/20 dark:to-emerald-800/10 p-4 text-center">
              <p className="text-3xl font-bold">📚 {completedLessonsCount}/{totalLessons}</p>
              <p className="text-xs font-semibold text-muted-foreground mt-1">Dutch lessons complete</p>
            </div>
          </div>

          <div className="pt-2 border-t border-border/50">
            <ActivityHeatmap activities={activities} />
          </div>
        </CardContent>
      </Card>

      {/* Milestones & Badges */}
      <Card className="animate-slide-up" style={{ animationDelay: "0.07s" }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>🏅</span> Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AchievementBadges
            streak={streak.count}
            longestStreak={streak.longestCount}
            completedTasks={completedTasks.length}
            completedLessons={completedLessonsCount}
            reflectionsCount={reflections.length}
          />
        </CardContent>
      </Card>

      {/* My Reflections */}
      <Card className="animate-slide-up" style={{ animationDelay: "0.09s" }}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <span>✨</span> My Reflections
            </CardTitle>
            {reflections.length > 0 && (
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
                {reflections.length} {reflections.length === 1 ? "entry" : "entries"}
              </span>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <ReflectionsHistory reflections={reflections} />
        </CardContent>
      </Card>

      {/* Appearance toggle */}
      <div className="flex items-center justify-between rounded-2xl border border-white/30 dark:border-white/[0.08] bg-white/70 dark:bg-white/[0.05] backdrop-blur-xl shadow-card p-5 animate-slide-up" style={{ animationDelay: "0.11s" }}>
        <div>
          <p className="font-bold">🎨 Appearance</p>
          <p className="text-sm text-muted-foreground">Switch between light and dark</p>
        </div>
        <ThemeToggle />
      </div>

      {/* Danger Zone */}
      <Card className="animate-slide-up border-destructive/20" style={{ animationDelay: "0.13s" }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <span>⚠️</span> Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Resetting your progress will wipe your learning journey and streak. This cannot be undone.
          </p>
          <ResetProgressButton />
        </CardContent>
      </Card>

      {/* Logout */}
      <form action={logoutAction} className="animate-slide-up" style={{ animationDelay: "0.15s" }}>
        <Button className="w-full" variant="outline">Log out</Button>
      </form>
    </div>
  );
}
