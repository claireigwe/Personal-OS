import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { LessonStepper } from "@/features/learning/lesson-stepper";
import type { LessonContentData, LessonExample, ExampleGroup, SoundComparison } from "@/features/learning/lesson-content";
import type { StepData } from "@/features/learning/step-components";

function buildSteps(
  lesson: {
    module: { title: string };
    title: string;
    summary: string;
    content: LessonContentData;
    examples: LessonExample[];
    exercises: Array<{ id: string; type: string; question: string; data: Record<string, unknown> }>;
    id: string;
    notes?: Array<{ content: string }>;
  }
): StepData[] {
  const steps: StepData[] = [];
  const content = lesson.content;
  const exercises = lesson.exercises;

  steps.push({
    type: "intro",
    moduleTitle: lesson.module.title,
    lessonTitle: lesson.title,
    summary: lesson.summary,
    objective: content.objective,
  });

  for (const section of content.sections) {
    steps.push({ type: "section", heading: section.heading, body: section.body });
  }

  if (content.groups && content.groups.length > 0) {
    steps.push({ type: "examples", groups: content.groups as ExampleGroup[] });
  } else if (lesson.examples && lesson.examples.length > 0) {
    steps.push({ type: "examples", flatExamples: lesson.examples as LessonExample[] });
  }

  if (content.comparisons && content.comparisons.length > 0) {
    steps.push({ type: "comparisons", comparisons: content.comparisons as SoundComparison[] });
  }

  if (content.practice && content.practice.length > 0) {
    steps.push({ type: "practice", items: content.practice });
  }

  for (const ex of exercises) {
    steps.push({
      type: "exercise",
      id: ex.id,
      exerciseType: ex.type as "multiple-choice" | "translation" | "listen-choose",
      question: ex.question,
      data: ex.data,
    });
  }

  steps.push({ type: "notes", lessonId: lesson.id, existingNote: lesson.notes?.[0]?.content });

  steps.push({ type: "summary" });

  return steps;
}

export default async function LessonPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params;
  const session = await auth();
  const userId = session!.user.id;

  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: {
      module: { include: { lessons: { select: { id: true, title: true, order: true } } } },
      progress: { where: { userId } },
      notes: { where: { userId } },
      exercises: { orderBy: { order: "asc" } }
    }
  });
  if (!lesson) notFound();

  const completed = lesson.progress.some((p) => p.completedAt);

  const nextLesson = lesson.module.lessons
    .filter((l) => l.order > lesson.order)
    .sort((a, b) => a.order - b.order)[0];

  if (completed) {
    return (
      <div className="flex flex-col min-h-[calc(100vh-theme(spacing.20))] pb-32">
        <header className="flex items-center py-4 mb-2">
          <Link className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-secondary transition-colors -ml-2 text-muted-foreground hover:text-foreground" href="/learning">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </header>
        <div className="flex-1 grid gap-4 text-center place-content-center animate-fade-in">
          <div className="flex justify-center">
            <div className="rounded-full bg-green-500/10 p-4">
              <svg className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h2 className="text-xl font-bold">Lesson complete</h2>
          <p className="text-muted-foreground">You have already completed this lesson.</p>
          <div className="flex gap-3 justify-center mt-4">
            <Link
              href="/learning"
              className="inline-flex h-14 items-center justify-center rounded-full bg-secondary text-secondary-foreground font-bold px-8 hover:bg-secondary/80 transition-colors"
            >
              Back to learning
            </Link>
            {nextLesson && (
              <Link
                href={`/learning/lessons/${nextLesson.id}`}
                className="inline-flex h-14 items-center justify-center rounded-full bg-gradient-to-r from-[hsl(262,83%,58%)] to-[hsl(280,72%,45%)] text-white font-bold px-8 shadow-glow hover:shadow-glow-lg hover:brightness-110 transition-all"
              >
                Next lesson
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  const steps = buildSteps({
    module: lesson.module,
    title: lesson.title,
    summary: lesson.summary,
    content: lesson.content as LessonContentData,
    examples: lesson.examples as LessonExample[],
    exercises: lesson.exercises.map((ex) => ({
      id: ex.id,
      type: ex.type,
      question: ex.question,
      data: ex.data as Record<string, unknown>,
    })),
    id: lesson.id,
    notes: lesson.notes.length > 0 ? [{ content: lesson.notes[0].content }] : [],
  });

  return <LessonStepper steps={steps} lessonId={lesson.id} nextLesson={nextLesson ? { id: nextLesson.id, title: nextLesson.title } : null} />;
}
