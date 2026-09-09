"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { markLessonCompleteAction } from "@/features/learning/actions";
import { submitExerciseAttempts } from "@/features/learning/exercises/actions";
import { Confetti } from "@/components/confetti";
import {
  IntroStep,
  SectionStep,
  ExamplesStep,
  ComparisonsStep,
  PracticeStep,
  ExerciseStep,
  NotesStep,
  SummaryStep,
  BackConfirmModal,
} from "@/features/learning/step-components";
import type { StepData } from "@/features/learning/step-components";

export function LessonStepper({
  steps,
  lessonId,
  nextLesson,
}: {
  steps: StepData[];
  lessonId: string;
  nextLesson?: { id: string; title: string } | null;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exerciseResults, setExerciseResults] = useState<Record<string, boolean>>({});
  const [showBackConfirm, setShowBackConfirm] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [done, setDone] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const confettiFired = useRef(false);

  const total = steps.length;
  const currentStep = steps[currentIndex];
  const isExerciseStep = currentStep?.type === "exercise";

  const totalExercises = steps.filter((s) => s.type === "exercise").length;
  const correctCount = steps
    .filter((s): s is Extract<StepData, { type: "exercise" }> => s.type === "exercise")
    .filter((s) => exerciseResults[s.id]).length;

  const goNext = useCallback(() => {
    if (currentIndex < total - 1) {
      setCurrentIndex((i) => i + 1);
    }
  }, [currentIndex, total]);

  const goBack = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  }, [currentIndex]);

  const handleBack = useCallback(() => {
    if (isExerciseStep && !(currentStep.id in exerciseResults)) {
      setShowBackConfirm(true);
    } else {
      goBack();
    }
  }, [isExerciseStep, currentStep, exerciseResults, goBack]);

  const handleExerciseAnswer = useCallback(
    (correct: boolean) => {
      const step = steps[currentIndex];
      if (step.type !== "exercise") return;

      setExerciseResults((prev) => ({
        ...prev,
        [step.id]: correct,
      }));

      setTimeout(() => {
        goNext();
      }, 750);
    },
    [currentIndex, steps, goNext]
  );

  const handleComplete = useCallback(async () => {
    if (isCompleting) return;
    setIsCompleting(true);

    const attempts = steps
      .filter((s): s is Extract<StepData, { type: "exercise" }> => s.type === "exercise")
      .filter((s) => exerciseResults[s.id] !== undefined)
      .map((s) => ({ exerciseId: s.id, correct: exerciseResults[s.id] }));

    if (attempts.length > 0) {
      await submitExerciseAttempts(attempts).catch(() => {});
    }
    await markLessonCompleteAction(lessonId);
    setDone(true);
    setIsCompleting(false);
  }, [isCompleting, steps, exerciseResults, lessonId]);

  const renderStep = () => {
    switch (currentStep.type) {
      case "intro":
        return <IntroStep step={currentStep} />;
      case "section":
        return <SectionStep step={currentStep} />;
      case "examples":
        return <ExamplesStep step={currentStep} />;
      case "comparisons":
        return <ComparisonsStep step={currentStep} />;
      case "practice":
        return <PracticeStep step={currentStep} />;
      case "exercise":
        return (
          <div className="grid gap-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-1">
              <Sparkles className="h-3 w-3" />
              <span>
                {currentStep.exerciseType === "multiple-choice"
                  ? "Choose the correct answer"
                  : currentStep.exerciseType === "translation"
                    ? "Translate"
                    : "Listen & choose"}
              </span>
            </div>
            <p className="text-lg font-semibold">{currentStep.question}</p>
            <ExerciseStep step={currentStep} onAnswer={handleExerciseAnswer} />
          </div>
        );
      case "notes":
        return <NotesStep step={currentStep} />;
      case "summary":
        return <SummaryStep correctCount={correctCount} totalExercises={totalExercises} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (currentStep.type === "summary" && !confettiFired.current) {
      confettiFired.current = true;
      setShowConfetti(true);
    }
  }, [currentStep]);

  const isSummary = currentStep.type === "summary";
  const showContinue = !isExerciseStep && !isSummary && currentStep.type !== "intro";
  const showStart = currentStep.type === "intro";

  return (
    <div className="flex flex-col min-h-[calc(100vh-theme(spacing.20))] pb-32">
      {/* Top bar */}
      <div className="flex items-center gap-3 py-4 mb-2">
        <div className="flex-1 h-3 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[hsl(30,95%,55%)] via-[hsl(350,80%,55%)] to-[hsl(262,83%,58%)] transition-all duration-500"
            style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
          />
        </div>
        <span className="text-sm font-bold text-muted-foreground whitespace-nowrap">
          {currentIndex + 1}/{total}
        </span>
      </div>

      {/* Step content */}
      <div className="flex-1 animate-slide-up" key={`${currentIndex}-${currentStep.type}`}>
        {renderStep()}
      </div>

      {/* Bottom navigation */}
      <div
        className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-xl border-t border-white/20 dark:border-white/[0.1] z-30"
      >
        <div className="mx-auto max-w-3xl flex gap-3 items-center">
          {!isSummary && (
            currentIndex === 0 ? (
              <Link
                href="/learning"
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
            ) : (
              <button
                onClick={handleBack}
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )
          )}
          <div className="flex-1">
            {showStart && (
              <button
                onClick={goNext}
                className="w-full h-14 rounded-full text-lg font-bold bg-gradient-to-r from-[hsl(262,83%,58%)] to-[hsl(280,72%,45%)] text-white shadow-glow hover:shadow-glow-lg hover:brightness-110 transition-all"
              >
                Start
              </button>
            )}
            {showContinue && (
              <button
                onClick={goNext}
                className="w-full h-14 rounded-full text-lg font-bold bg-gradient-to-r from-[hsl(262,83%,58%)] to-[hsl(280,72%,45%)] text-white shadow-glow hover:shadow-glow-lg hover:brightness-110 transition-all"
              >
                Continue
              </button>
            )}
            {isSummary && !done && (
              <button
                onClick={handleComplete}
                disabled={isCompleting}
                className="w-full h-14 rounded-full text-lg font-bold bg-gradient-to-r from-[hsl(262,83%,58%)] to-[hsl(280,72%,45%)] text-white shadow-glow hover:shadow-glow-lg hover:brightness-110 transition-all disabled:opacity-50"
              >
                {isCompleting ? "Completing..." : "Mark complete"}
              </button>
            )}
            {isSummary && done && (
              <div className="flex gap-3 w-full">
                <Link
                  href="/learning"
                  className="flex-1 flex items-center justify-center h-14 rounded-full bg-secondary text-secondary-foreground font-bold hover:bg-secondary/80 transition-colors"
                >
                  Back to learning
                </Link>
                {nextLesson && (
                  <Link
                    href={`/learning/lessons/${nextLesson.id}`}
                    className="flex-1 flex items-center justify-center h-14 rounded-full bg-gradient-to-r from-[hsl(262,83%,58%)] to-[hsl(280,72%,45%)] text-white font-bold shadow-glow hover:shadow-glow-lg hover:brightness-110 transition-all"
                  >
                    Next lesson
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confetti */}
      {showConfetti && <Confetti />}

      {/* Back confirmation modal */}
      {showBackConfirm && (
        <BackConfirmModal
          onConfirm={() => {
            setShowBackConfirm(false);
            goBack();
          }}
          onDismiss={() => setShowBackConfirm(false)}
        />
      )}
    </div>
  );
}
