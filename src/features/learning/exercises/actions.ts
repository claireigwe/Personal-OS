"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function submitExerciseAttempts(
  attempts: { exerciseId: string; correct: boolean }[]
) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const userId = session.user.id;

  await prisma.exerciseAttempt.createMany({
    data: attempts.map((a) => ({
      userId,
      exerciseId: a.exerciseId,
      correct: a.correct,
    })),
  });
}
