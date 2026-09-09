"use client";

import { SpeakButton } from "@/components/speak-button";
import { Portal } from "@/components/ui/portal";
import { LessonNoteForm } from "@/features/learning/lesson-note-form";
import {
  MultipleChoiceExercise,
  TranslationExercise,
  ListenChooseExercise,
} from "@/features/learning/exercises/exercise-components";
import type { ExerciseItem } from "@/features/learning/exercises/types";
import type { LessonExample, ExampleGroup, SoundComparison } from "@/features/learning/lesson-content";

export type StepData =
  | { type: "intro"; moduleTitle: string; lessonTitle: string; summary: string; objective: string }
  | { type: "section"; heading: string; body: string }
  | { type: "examples"; groups?: ExampleGroup[]; flatExamples?: LessonExample[] }
  | { type: "comparisons"; comparisons: SoundComparison[] }
  | { type: "practice"; items: string[] }
  | { type: "exercise"; id: string; exerciseType: "multiple-choice" | "translation" | "listen-choose"; question: string; data: Record<string, unknown> }
  | { type: "notes"; lessonId: string; existingNote?: string }
  | { type: "summary" };

export function IntroStep({ step }: { step: Extract<StepData, { type: "intro" }> }) {
  return (
    <div className="grid gap-5 text-center py-8">
      <p className="text-[11px] font-bold uppercase tracking-widest text-blue-500">{step.moduleTitle}</p>
      <h1 className="text-3xl font-bold tracking-tight">{step.lessonTitle}</h1>
      <p className="text-muted-foreground">{step.summary}</p>
      <div className="rounded-2xl border border-white/20 dark:border-white/[0.08] bg-white/60 dark:bg-white/[0.04] backdrop-blur-xl shadow-xl shadow-black/5 p-4 mt-4">
        <p className="text-sm font-medium text-primary">Objective</p>
        <p className="mt-1 text-sm text-muted-foreground">{step.objective}</p>
      </div>
    </div>
  );
}

export function SectionStep({ step }: { step: Extract<StepData, { type: "section" }> }) {
  return (
    <section>
      <h2 className="text-lg font-semibold">{step.heading}</h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.body}</p>
    </section>
  );
}

export function ExamplesStep({ step }: { step: Extract<StepData, { type: "examples" }> }) {
  const groups = step.groups;
  const examples = step.flatExamples;

  if (groups && groups.length > 0) {
    return (
      <div className="grid gap-5">
        {groups.map((group) => (
          <div key={group.label}>
            <h3 className="mb-2 font-medium text-primary">{group.label}</h3>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {group.items.map((example, i) => (
                <ExampleCard key={`${example.dutch}-${i}`} example={example} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (examples && examples.length > 0) {
    return (
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {examples.map((example) => (
          <ExampleCard key={`${example.dutch}-${example.meaning}`} example={example} />
        ))}
      </div>
    );
  }

  return null;
}

function ExampleCard({ example }: { example: LessonExample }) {
  return (
    <div className="rounded-2xl border border-white/20 dark:border-white/[0.08] bg-white/60 dark:bg-white/[0.04] backdrop-blur-xl shadow-xl shadow-black/5 p-3">
      <div className="flex items-center gap-1">
        <p className="font-semibold">{example.dutch}</p>
        <SpeakButton text={example.dutch} />
      </div>
      <p className="text-sm text-muted-foreground">{example.guide}</p>
      <p className="text-sm">{example.meaning}</p>
    </div>
  );
}

export function ComparisonsStep({ step }: { step: Extract<StepData, { type: "comparisons" }> }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {step.comparisons.map((comp, i) => (
        <div key={i} className="rounded-2xl border border-white/20 dark:border-white/[0.08] bg-white/60 dark:bg-white/[0.04] backdrop-blur-xl shadow-xl shadow-black/5 p-3">
          <p className="text-xs font-medium text-muted-foreground">English</p>
          <p className="font-semibold">{comp.english}</p>
          <div className="mt-3 border-t border-border pt-2">
            <p className="text-xs font-medium text-muted-foreground">Dutch</p>
            <div className="flex items-center gap-1">
              <p className="font-semibold text-primary">{comp.dutch}</p>
              <SpeakButton text={comp.dutch} />
            </div>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{comp.pronunciation}</p>
          {comp.note ? <p className="mt-1 text-xs">{comp.note}</p> : null}
        </div>
      ))}
    </div>
  );
}

export function PracticeStep({ step }: { step: Extract<StepData, { type: "practice" }> }) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Practice Speaking</h2>
      <ul className="grid gap-2">
        {step.items.map((item) => (
          <li key={item} className="flex items-center justify-between gap-3 rounded-2xl border border-white/20 dark:border-white/[0.08] bg-white/60 dark:bg-white/[0.04] backdrop-blur-xl shadow-xl shadow-black/5 px-4 py-3 text-sm">
            <span className="font-medium text-foreground">{item}</span>
            <SpeakButton text={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ExerciseStep({
  step,
  onAnswer,
}: {
  step: Extract<StepData, { type: "exercise" }>;
  onAnswer: (correct: boolean) => void;
}) {
  const exerciseItem: ExerciseItem = {
    id: step.id,
    type: step.exerciseType,
    question: step.question,
    data: step.data,
    order: 0,
  };

  switch (step.exerciseType) {
    case "multiple-choice":
      return <MultipleChoiceExercise exercise={exerciseItem} onAnswer={onAnswer} />;
    case "translation":
      return <TranslationExercise exercise={exerciseItem} onAnswer={onAnswer} />;
    case "listen-choose":
      return <ListenChooseExercise exercise={exerciseItem} onAnswer={onAnswer} />;
    default:
      return <p className="text-muted-foreground">Unknown exercise type.</p>;
  }
}

export function NotesStep({ step }: { step: Extract<StepData, { type: "notes" }> }) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Notes</h2>
      <LessonNoteForm lessonId={step.lessonId} content={step.existingNote} />
    </div>
  );
}

export function SummaryStep({
  correctCount,
  totalExercises,
}: {
  correctCount: number;
  totalExercises: number;
}) {
  const percentage = totalExercises > 0 ? Math.round((correctCount / totalExercises) * 100) : 100;

  return (
    <div className="grid gap-4 text-center py-8 animate-fade-in">
      <div className="flex justify-center">
        <div className="rounded-full bg-green-500/10 p-4">
          <svg className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
      <h3 className="text-xl font-bold">
        {totalExercises > 0 ? "Exercises Complete!" : "Lesson Complete!"}
      </h3>
      {totalExercises > 0 && (
        <>
          <p className="text-muted-foreground">
            You got <span className="font-bold text-foreground">{correctCount}</span> of{" "}
            <span className="font-bold text-foreground">{totalExercises}</span> correct ({percentage}%)
          </p>
          <div className="mx-auto h-2 w-48 rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-700"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </>
      )}
    </div>
  );
}

export function BackConfirmModal({
  onConfirm,
  onDismiss,
}: {
  onConfirm: () => void;
  onDismiss: () => void;
}) {
  return (
    <Portal>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md animate-fade-in p-4">
        <div className="mx-auto w-full max-w-sm rounded-3xl border-2 border-white/20 dark:border-white/[0.08] bg-card backdrop-blur-xl shadow-2xl p-6 grid gap-4 animate-scale-up">
          <h3 className="text-lg font-bold">Go back?</h3>
          <p className="text-sm text-muted-foreground">
            Try answering the question first — you might get it right!
          </p>
          <div className="flex gap-3 pt-2">
            <button
              onClick={onConfirm}
              className="flex-1 h-12 rounded-xl bg-secondary text-secondary-foreground font-bold hover:bg-secondary/80 transition-colors"
            >
              Go back
            </button>
            <button
              onClick={onDismiss}
              className="flex-1 h-12 rounded-xl bg-gradient-to-r from-[hsl(262,83%,58%)] to-[hsl(280,72%,45%)] text-white font-bold shadow-glow hover:shadow-glow-lg hover:brightness-110 transition-all"
            >
              Stay
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
}
