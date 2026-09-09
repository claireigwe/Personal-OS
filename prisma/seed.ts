import { PrismaClient } from "@prisma/client";
import { generateCurriculum } from "../src/features/learning/services/curriculum";

const prisma = new PrismaClient();

async function main() {
  const curriculum = await generateCurriculum("Dutch", {
    level: "Complete Beginner to Fluency",
    learningStyle:
      "Pronunciation first. 11-phase structured journey from sounds to fluency."
  });

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
    console.log("Removed old curriculum and associated data.");
  }

  // Safe Upsert to prevent wiping LessonProgress and LessonNote
  const path = await prisma.learningPath.upsert({
    where: { slug: curriculum.slug },
    update: {
      title: curriculum.title,
      description: curriculum.description,
      language: curriculum.language,
      level: curriculum.level,
      learningStyle: curriculum.learningStyle,
    },
    create: {
      slug: curriculum.slug,
      title: curriculum.title,
      description: curriculum.description,
      language: curriculum.language,
      level: curriculum.level,
      learningStyle: curriculum.learningStyle,
    }
  });

  for (let moduleIndex = 0; moduleIndex < curriculum.modules.length; moduleIndex++) {
    const mod = curriculum.modules[moduleIndex];
    const order = moduleIndex + 1;
    
    const dbModule = await prisma.learningModule.upsert({
      where: {
        learningPathId_order: {
          learningPathId: path.id,
          order: order
        }
      },
      update: {
        title: mod.title,
        description: mod.description,
      },
      create: {
        learningPathId: path.id,
        title: mod.title,
        description: mod.description,
        order: order
      }
    });

    for (let lessonIndex = 0; lessonIndex < mod.lessons.length; lessonIndex++) {
      const lesson = mod.lessons[lessonIndex];
      const lessonOrder = lessonIndex + 1;

      const dbLesson = await prisma.lesson.upsert({
        where: {
          moduleId_order: {
            moduleId: dbModule.id,
            order: lessonOrder
          }
        },
        update: {
          title: lesson.title,
          summary: lesson.summary,
          content: lesson.content,
          examples: lesson.examples ?? [],
        },
        create: {
          moduleId: dbModule.id,
          title: lesson.title,
          summary: lesson.summary,
          content: lesson.content,
          examples: lesson.examples ?? [],
          order: lessonOrder
        }
      });

      if (lesson.exercises?.length) {
        const existingCount = await prisma.exercise.count({ where: { lessonId: dbLesson.id } });
        if (existingCount === 0) {
          await prisma.exercise.createMany({
            data: lesson.exercises.map((ex, i) => ({
              lessonId: dbLesson.id,
              type: ex.type,
              question: ex.question,
              data: ex.data as any,
              order: i + 1,
            })),
          });
        }
      }
    }
  }

  // Cleanup old modules/lessons if the new curriculum is shorter
  const activeModules = await prisma.learningModule.findMany({ where: { learningPathId: path.id } });
  for (const activeMod of activeModules) {
    if (activeMod.order > curriculum.modules.length) {
      await prisma.learningModule.delete({ where: { id: activeMod.id } });
    } else {
      const modCurriculum = curriculum.modules[activeMod.order - 1];
      const activeLessons = await prisma.lesson.findMany({ where: { moduleId: activeMod.id } });
      for (const activeLesson of activeLessons) {
        if (activeLesson.order > modCurriculum.lessons.length) {
          await prisma.lesson.delete({ where: { id: activeLesson.id } });
        }
      }
    }
  }

  console.log(`Safely seeded curriculum: ${curriculum.title} (${curriculum.modules.length} modules)`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
