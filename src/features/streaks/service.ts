import { prisma } from "@/lib/prisma";
import { isSameDay, isYesterday } from "@/lib/utils";

export async function recordDailyActivity(userId: string, activityAt = new Date()) {
  const streak = await prisma.streak.upsert({
    where: { userId },
    create: { userId, count: 1, longestCount: 1, lastActivityAt: activityAt },
    update: {}
  });

  if (streak.lastActivityAt && isSameDay(streak.lastActivityAt, activityAt)) {
    return streak;
  }

  const nextCount = streak.lastActivityAt && isYesterday(streak.lastActivityAt, activityAt) ? streak.count + 1 : 1;
  return prisma.streak.update({
    where: { userId },
    data: {
      count: nextCount,
      longestCount: Math.max(streak.longestCount, nextCount),
      lastActivityAt: activityAt
    }
  });
}
