import Link from "next/link";
import { BookOpen, Flame, ListChecks, Sparkles, ArrowRight } from "lucide-react";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { startOfToday } from "@/lib/utils";
import { resetRecurringTasks } from "@/features/tasks/actions";
import { TaskList } from "@/features/tasks/task-list";
import { ReflectionForm } from "@/features/reflections/reflection-form";
import { getDutchLearningPath } from "@/features/learning/services/curriculum-store";
import { summarizeLearning } from "@/features/learning/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { MascotBubble } from "@/features/mascot/mascot-bubble";
import { FlashcardReview, type FlashcardItem } from "@/features/learning/flashcard-review";

type PathData = {
  modules?: Array<{
    title?: string;
    lessons?: Array<{
      examples?: unknown;
      content?: unknown;
    }>;
  }>;
} | null;

function extractFlashcards(path: PathData): FlashcardItem[] {
  if (!path?.modules) return [];
  const cards: FlashcardItem[] = [];

  for (const mod of path.modules) {
    if (!mod?.lessons) continue;
    for (const lesson of mod.lessons) {
      if (Array.isArray(lesson.examples)) {
        for (const item of lesson.examples) {
          const ex = item as { dutch?: string; meaning?: string; guide?: string };
          if (ex?.dutch && ex?.meaning) {
            cards.push({
              id: `fc-${cards.length + 1}`,
              dutch: ex.dutch,
              meaning: ex.meaning,
              guide: ex.guide,
              category: mod.title
            });
          }
        }
      }
      const lessonContent = lesson.content as { groups?: Array<{ label?: string; items?: unknown[] }> } | null;
      if (lessonContent?.groups && Array.isArray(lessonContent.groups)) {
        for (const g of lessonContent.groups) {
          if (Array.isArray(g.items)) {
            for (const item of g.items) {
              const ex = item as { dutch?: string; meaning?: string; guide?: string };
              if (ex?.dutch && ex?.meaning) {
                cards.push({
                  id: `fc-${cards.length + 1}`,
                  dutch: ex.dutch,
                  meaning: ex.meaning,
                  guide: ex.guide,
                  category: g.label || mod.title
                });
              }
            }
          }
        }
      }
      if (cards.length >= 24) break;
    }
    if (cards.length >= 24) break;
  }
  return cards;
}

export default async function HomePage() {
  const session = await auth();
  const userId = session!.user.id;
  await resetRecurringTasks(userId);

  const today = startOfToday();
  const [tasks, reflection, streak, path] = await Promise.all([
    prisma.task.findMany({ where: { userId, activeDate: today }, orderBy: [{ status: "asc" }, { createdAt: "desc" }] }),
    prisma.reflection.findUnique({ where: { userId_entryDate: { userId, entryDate: today } } }),
    prisma.streak.upsert({ where: { userId }, update: {}, create: { userId } }),
    getDutchLearningPath(userId)
  ]);

  const completedTasks = tasks.filter((task) => task.status === "COMPLETED").length;
  const remainingTasks = tasks.length - completedTasks;
  const learning = summarizeLearning(path);
  const flashcards = extractFlashcards(path);

  return (
    <div className="grid gap-5">
      {/* Hero greeting with Mascot & Interactive Dialogue */}
      <MascotBubble
        userName={session?.user.name}
        streakCount={streak.count}
        remainingTasks={remainingTasks}
        currentLessonTitle={learning.currentLesson?.title}
      />

      {/* Gamified stat badges */}
      <section className="grid grid-cols-3 gap-3 animate-slide-up" style={{ animationDelay: "0.05s" }}>
        <Card className="group">
          <CardContent className="flex flex-col items-center p-4">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 dark:bg-orange-900/30 transition-transform group-hover:scale-110">
              <Flame className="h-5 w-5 text-orange-500" />
            </div>
            <p className="text-2xl font-bold">{streak.count}</p>
            <p className="text-xs font-medium text-muted-foreground">streak</p>
          </CardContent>
        </Card>
        <Card className="group">
          <CardContent className="flex flex-col items-center p-4">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900/30 transition-transform group-hover:scale-110">
              <ListChecks className="h-5 w-5 text-emerald-500" />
            </div>
            <p className="text-2xl font-bold">{completedTasks}</p>
            <p className="text-xs font-medium text-muted-foreground">done</p>
          </CardContent>
        </Card>
        <Card className="group">
          <CardContent className="flex flex-col items-center p-4">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-900/30 transition-transform group-hover:scale-110">
              <BookOpen className="h-5 w-5 text-purple-500" />
            </div>
            <p className="text-2xl font-bold">{remainingTasks}</p>
            <p className="text-xs font-medium text-muted-foreground">left</p>
          </CardContent>
        </Card>
      </section>

      {/* Learning Progress — gradient card with Flashcard Review */}
      <Card variant="gradient" className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-white/80" />
            <CardTitle className="text-white/90 text-sm font-semibold uppercase tracking-wider">Learning Progress</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div>
            <p className="text-lg font-bold text-white">{learning.currentLesson?.moduleTitle}</p>
            <p className="text-sm text-white/75">{learning.currentLesson?.title}</p>
          </div>
          <Progress value={learning.percent} className="bg-white/20" />
          <div className="flex items-center justify-between text-sm text-white/80">
            <span>{learning.completedLessons} of {learning.totalLessons} lessons</span>
            <span className="font-bold text-white">{learning.percent}%</span>
          </div>
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            {learning.currentLesson ? (
              <Button asChild variant="outline" className="border-2 border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white flex-1 font-bold">
                <Link href={`/learning/lessons/${learning.currentLesson.id}`}>
                  Continue lesson
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Link>
              </Button>
            ) : null}
            <FlashcardReview cards={flashcards} />
          </div>
        </CardContent>
      </Card>

      {/* Today's Tasks */}
      <Card className="animate-slide-up" style={{ animationDelay: "0.15s" }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>📋</span> Today&apos;s Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TaskList compact tasks={tasks.slice(0, 5)} />
        </CardContent>
      </Card>

      {/* Daily Reflection */}
      <Card className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>✨</span> Daily Reflection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ReflectionForm content={reflection?.content} />
        </CardContent>
      </Card>
    </div>
  );
}
