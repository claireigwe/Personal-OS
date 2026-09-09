"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { startOfToday } from "@/lib/utils";

export async function saveReflectionAction(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const content = String(formData.get("content") ?? "").trim();
  if (!content) return;

  await prisma.reflection.upsert({
    where: {
      userId_entryDate: {
        userId: session.user.id,
        entryDate: startOfToday()
      }
    },
    update: { content },
    create: {
      userId: session.user.id,
      entryDate: startOfToday(),
      content
    }
  });

  revalidatePath("/");
}
