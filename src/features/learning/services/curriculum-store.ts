import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { generateCurriculum } from "./curriculum";

export async function ensureDutchCurriculum() {
  const curriculum = await generateCurriculum("Dutch", {
    level: "Complete Beginner to Fluency",
    learningStyle:
      "Pronunciation first. 11-phase structured journey from sounds to fluency."
  });

  const existing = await prisma.learningPath.findUnique({
    where: { slug: curriculum.slug }
  });
  if (existing) return existing;

  const oldPath = await prisma.learningPath.findUnique({
    where: { slug: "dutch-pronunciation-first" }
  });

  if (oldPath) {
    const oldModules = await prisma.learningModule.findMany({
      where: { learningPathId: oldPath.id },
      include: { lessons: { select: { id: true } } }
    });
    const oldLessonIds = oldModules.flatMap((m) => m.lessons.map((l) => l.id));

    await prisma.lessonProgress.deleteMany({ where: { lessonId: { in: oldLessonIds } } });
    await prisma.lessonNote.deleteMany({ where: { lessonId: { in: oldLessonIds } } });
    await prisma.lesson.deleteMany({ where: { moduleId: { in: oldModules.map((m) => m.id) } } });
    await prisma.learningModule.deleteMany({ where: { learningPathId: oldPath.id } });
    await prisma.learningPath.delete({ where: { id: oldPath.id } });
  }

  const created = await prisma.learningPath.create({
    data: {
      slug: curriculum.slug,
      title: curriculum.title,
      description: curriculum.description,
      language: curriculum.language,
      level: curriculum.level,
      learningStyle: curriculum.learningStyle,
      modules: {
        create: curriculum.modules.map((module, moduleIndex) => ({
          title: module.title,
          description: module.description,
          order: moduleIndex + 1,
          lessons: {
            create: module.lessons.map((lesson, lessonIndex) => ({
              title: lesson.title,
              summary: lesson.summary,
              content: lesson.content,
              examples: lesson.examples ?? [],
              order: lessonIndex + 1
            }))
          }
        }))
      }
    },
    include: {
      modules: {
        include: { lessons: true }
      }
    }
  });

  const exerciseData: Array<{
    lessonId: string;
    type: string;
    question: string;
    data: Prisma.InputJsonValue;
    order: number;
  }> = [];

  for (const mod of curriculum.modules) {
    const createdModule = created.modules.find((m) => m.order === curriculum.modules.indexOf(mod) + 1);
    if (!createdModule) continue;
    for (const lesson of mod.lessons) {
      if (!lesson.exercises?.length) continue;
      const createdLesson = createdModule.lessons.find((l) => l.order === mod.lessons.indexOf(lesson) + 1);
      if (!createdLesson) continue;
      lesson.exercises.forEach((ex, i) => {
        exerciseData.push({
          lessonId: createdLesson.id,
          type: ex.type,
          question: ex.question,
          data: ex.data as Prisma.InputJsonValue,
          order: i + 1,
        });
      });
    }
  }

  if (exerciseData.length > 0) {
    await prisma.exercise.createMany({ data: exerciseData });
  }

  return created;
}

export async function getDutchLearningPath(userId: string) {
  await ensureDutchCurriculum();
  return prisma.learningPath.findUniqueOrThrow({
    where: { slug: "dutch-complete-beginner-to-fluency" },
    include: {
      modules: {
        orderBy: { order: "asc" },
        include: {
          lessons: {
            orderBy: { order: "asc" },
            include: {
              progress: { where: { userId } },
              notes: { where: { userId } }
            }
          }
        }
      }
    }
  });
}
