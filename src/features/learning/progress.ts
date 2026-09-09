import type { getDutchLearningPath } from "./services/curriculum-store";

type LearningPath = Awaited<ReturnType<typeof getDutchLearningPath>>;

export function summarizeLearning(path: LearningPath) {
  const lessons = path.modules.flatMap((module) =>
    module.lessons.map((lesson) => ({
      ...lesson,
      moduleTitle: module.title,
      moduleOrder: module.order
    }))
  );
  const completed = lessons.filter((lesson) => lesson.progress.some((progress) => progress.completedAt));
  const current = lessons.find((lesson) => !lesson.progress.some((progress) => progress.completedAt)) ?? lessons[lessons.length - 1];
  const percent = lessons.length ? Math.round((completed.length / lessons.length) * 100) : 0;

  return {
    totalLessons: lessons.length,
    completedLessons: completed.length,
    currentLesson: current,
    percent
  };
}
