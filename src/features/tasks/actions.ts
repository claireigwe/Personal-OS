"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { startOfToday } from "@/lib/utils";
import { recordDailyActivity } from "@/features/streaks/service";
import { taskSchema } from "./validation";

async function requireUserId() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  return session.user.id;
}

export async function resetRecurringTasks(userId: string) {
  const today = startOfToday();
  const recurringTasks = await prisma.task.findMany({
    where: {
      userId,
      dailyRecurring: true,
      activeDate: { lt: today }
    }
  });

  await Promise.all(
    recurringTasks.map((task) =>
      prisma.task.update({
        where: { id: task.id },
        data: { status: "PENDING", completedAt: null, activeDate: today }
      })
    )
  );
}

export async function createTaskAction(formData: FormData) {
  const userId = await requireUserId();
  const parsed = taskSchema.parse({
    title: formData.get("title"),
    description: formData.get("description") || undefined,
    dailyRecurring: formData.get("dailyRecurring") === "on"
  });

  await prisma.task.create({
    data: {
      userId,
      title: parsed.title,
      description: parsed.description,
      dailyRecurring: parsed.dailyRecurring,
      activeDate: startOfToday()
    }
  });

  revalidatePath("/");
  revalidatePath("/tasks");
}

export async function toggleTaskAction(taskId: string, completed: boolean) {
  const userId = await requireUserId();
  const existingTask = await prisma.task.findFirst({
    where: { id: taskId, userId }
  });
  if (!existingTask) throw new Error("Task not found");

  const task = await prisma.task.update({
    where: { id: taskId },
    data: {
      status: completed ? "COMPLETED" : "PENDING",
      completedAt: completed ? new Date() : null
    }
  });

  if (task.status === "COMPLETED") {
    await recordDailyActivity(userId, task.completedAt ?? new Date());
  }

  revalidatePath("/");
  revalidatePath("/tasks");
}

export async function updateTaskAction(taskId: string, formData: FormData) {
  const userId = await requireUserId();
  const existingTask = await prisma.task.findFirst({
    where: { id: taskId, userId }
  });
  if (!existingTask) throw new Error("Task not found");

  const parsed = taskSchema.parse({
    title: formData.get("title"),
    description: formData.get("description") || undefined,
    dailyRecurring: formData.get("dailyRecurring") === "on" || formData.get("dailyRecurring") === "true"
  });

  await prisma.task.update({
    where: { id: taskId },
    data: {
      title: parsed.title,
      description: parsed.description,
      dailyRecurring: parsed.dailyRecurring
    }
  });

  revalidatePath("/");
  revalidatePath("/tasks");
}

export async function deleteTaskAction(taskId: string) {
  const userId = await requireUserId();
  const existingTask = await prisma.task.findFirst({
    where: { id: taskId, userId }
  });
  if (!existingTask) throw new Error("Task not found");

  await prisma.task.delete({
    where: { id: taskId }
  });

  revalidatePath("/");
  revalidatePath("/tasks");
}

