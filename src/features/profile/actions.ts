"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function resetProgressAction() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;

  // Delete all learning progress and exercise attempts
  await prisma.lessonProgress.deleteMany({ where: { userId } });
  await prisma.exerciseAttempt.deleteMany({ where: { userId } });

  // Reset the streak (use upsert in case the user has no streak record yet)
  await prisma.streak.upsert({
    where: { userId },
    update: { count: 0, longestCount: 0 },
    create: { userId, count: 0, longestCount: 0 },
  });

  revalidatePath("/profile");
  revalidatePath("/learning");
}
