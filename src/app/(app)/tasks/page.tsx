import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { startOfToday } from "@/lib/utils";
import { resetRecurringTasks } from "@/features/tasks/actions";
import { TaskForm } from "@/features/tasks/task-form";
import { TaskList } from "@/features/tasks/task-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function TasksPage() {
  const session = await auth();
  const userId = session!.user.id;
  await resetRecurringTasks(userId);

  const tasks = await prisma.task.findMany({
    where: { userId, activeDate: startOfToday() },
    orderBy: [{ status: "asc" }, { createdAt: "desc" }]
  });
  const pending = tasks.filter((task) => task.status === "PENDING");
  const completed = tasks.filter((task) => task.status === "COMPLETED");

  return (
    <div className="grid gap-6">
      <section className="animate-slide-up">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Tasks</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">Daily focus ⚡</h1>
      </section>

      <Card className="animate-slide-up" style={{ animationDelay: "0.05s" }}>
        <CardHeader>
          <CardTitle className="text-sm font-bold uppercase tracking-wider">✍️ Create Task</CardTitle>
        </CardHeader>
        <CardContent>
          <TaskForm />
        </CardContent>
      </Card>

      <section className="grid gap-3 animate-slide-up" style={{ animationDelay: "0.1s" }}>
        <h2 className="text-lg font-bold flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs">📌</span>
          Pending
          {pending.length > 0 && (
            <span className="ml-auto inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
              {pending.length}
            </span>
          )}
        </h2>
        <TaskList tasks={pending} />
      </section>

      <section className="grid gap-3 animate-slide-up" style={{ animationDelay: "0.15s" }}>
        <h2 className="text-lg font-bold flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-xs">✅</span>
          Completed
          {completed.length > 0 && (
            <span className="ml-auto inline-flex items-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 px-2.5 py-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
              {completed.length}
            </span>
          )}
        </h2>
        <TaskList tasks={completed} />
      </section>
    </div>
  );
}
