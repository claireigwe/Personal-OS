"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { recordDailyActivity } from "@/features/streaks/service";

async function requireUserId() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  return session.user.id;
}

export async function markLessonCompleteAction(lessonId: string) {
  const userId = await requireUserId();
  const completedAt = new Date();

  await prisma.lessonProgress.upsert({
    where: { userId_lessonId: { userId, lessonId } },
    update: { completedAt },
    create: { userId, lessonId, completedAt }
  });
  await recordDailyActivity(userId, completedAt);

  revalidatePath("/");
  revalidatePath("/learning");
}

export async function saveLessonNoteAction(lessonId: string, formData: FormData) {
  const userId = await requireUserId();
  const content = String(formData.get("content") ?? "").trim();

  await prisma.lessonNote.upsert({
    where: { userId_lessonId: { userId, lessonId } },
    update: { content },
    create: { userId, lessonId, content }
  });

  revalidatePath(`/learning/lessons/${lessonId}`);
}
