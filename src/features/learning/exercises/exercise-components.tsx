"use client";

import { useState, useCallback } from "react";
import { CheckCircle, XCircle, Volume2 } from "lucide-react";
import { SpeakButton } from "@/components/speak-button";
import { cn } from "@/lib/utils";
import { playCorrectSound, playIncorrectSound } from "@/lib/sounds";
import type { ExerciseItem, MultipleChoiceData, TranslationData, ListenChooseData } from "./types";

type ResultFeedback = { correct: boolean } | null;

function useExerciseResult(): [ResultFeedback, (correct: boolean) => void] {
  const [result, setResult] = useState<ResultFeedback>(null);
  const showResult = useCallback((correct: boolean) => {
    setResult({ correct });
    setTimeout(() => setResult(null), 1500);
  }, []);
  return [result, showResult];
}

export function MultipleChoiceExercise({
  exercise,
  onAnswer,
}: {
  exercise: ExerciseItem;
  onAnswer: (correct: boolean) => void;
}) {
  const data = exercise.data as MultipleChoiceData;
  const [selected, setSelected] = useState<number | null>(null);
  const [_result, showResult] = useExerciseResult();

  const handleSelect = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    const correct = index === data.correctIndex;
    (correct ? playCorrectSound : playIncorrectSound)();
    showResult(correct);
    setTimeout(() => onAnswer(correct), 1500);
  };

  return (
    <div className="grid gap-3">
      {data.options.map((option, i) => {
        let variant = "border-white/20 dark:border-white/[0.08] bg-white/60 dark:bg-white/[0.04]";
        if (selected !== null) {
          if (i === data.correctIndex) {
            variant = "border-green-500/50 bg-green-500/10";
          } else if (i === selected) {
            variant = "border-red-500/50 bg-red-500/10";
          }
        }
        return (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            disabled={selected !== null}
            className={cn(
              "rounded-2xl border backdrop-blur-xl shadow-xl shadow-black/5 p-4 text-left font-medium transition-all duration-200",
              selected === null && "hover:border-primary/40 hover:bg-primary/5 cursor-pointer",
              variant
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export function TranslationExercise({
  exercise,
  onAnswer,
}: {
  exercise: ExerciseItem;
  onAnswer: (correct: boolean) => void;
}) {
  const data = exercise.data as TranslationData;
  const [value, setValue] = useState("");
  const [result, setResult] = useState<ResultFeedback>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (result) return;
    const trimmed = value.trim().toLowerCase();
    const correct =
      trimmed === data.correctAnswer.toLowerCase() ||
      (data.acceptableAnswers?.some((a) => trimmed === a.toLowerCase()) ?? false);
    (correct ? playCorrectSound : playIncorrectSound)();
    setResult({ correct });
    setTimeout(() => {
      onAnswer(correct);
    }, 1500);
  };

  const feedbackIcon = result ? (
    result.correct ? (
      <CheckCircle className="h-6 w-6 text-green-500" />
    ) : (
      <XCircle className="h-6 w-6 text-red-500" />
    )
  ) : null;

  return (
    <form onSubmit={handleSubmit} className="grid gap-3">
      <div className="flex items-center gap-2">
        <span className="rounded-xl bg-secondary px-3 py-1.5 text-sm font-semibold">
          {exercise.question.includes("→") ? exercise.question.split("→")[1]?.trim() || exercise.question : exercise.question}
        </span>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type your answer..."
        disabled={!!result}
        className={cn(
          "w-full rounded-2xl border bg-white/60 dark:bg-white/[0.04] backdrop-blur-xl shadow-xl shadow-black/5 px-4 py-3 text-base outline-none transition-colors",
          result
            ? result.correct
              ? "border-green-500/50"
              : "border-red-500/50"
            : "border-white/20 dark:border-white/[0.08] focus:border-primary/40",
        )}
      />
      {result && !result.correct && (
        <p className="text-sm text-muted-foreground">
          Correct answer: <span className="font-semibold text-foreground">{data.correctAnswer}</span>
        </p>
      )}
      <div className="flex items-center gap-2">
        {!result && (
          <button
            type="submit"
            disabled={!value.trim()}
            className="h-12 rounded-full bg-gradient-to-r from-[hsl(262,83%,58%)] to-[hsl(280,72%,45%)] text-white font-bold px-8 shadow-glow hover:shadow-glow-lg hover:brightness-110 transition-all disabled:opacity-50"
          >
            Check
          </button>
        )}
        {feedbackIcon}
      </div>
    </form>
  );
}

export function ListenChooseExercise({
  exercise,
  onAnswer,
}: {
  exercise: ExerciseItem;
  onAnswer: (correct: boolean) => void;
}) {
  const data = exercise.data as ListenChooseData;
  const [selected, setSelected] = useState<number | null>(null);
  const [_result, showResult] = useExerciseResult();

  const handleSelect = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    const correct = index === data.correctIndex;
    (correct ? playCorrectSound : playIncorrectSound)();
    showResult(correct);
    setTimeout(() => onAnswer(correct), 1500);
  };

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-3 rounded-2xl border border-white/20 dark:border-white/[0.08] bg-white/60 dark:bg-white/[0.04] backdrop-blur-xl shadow-xl shadow-black/5 px-6 py-4">
          <Volume2 className="h-5 w-5 text-primary" />
          <span className="font-medium">Listen and choose the correct option</span>
          <SpeakButton text={data.audioText} />
        </div>
      </div>
      <div className="grid gap-3">
        {data.options.map((option, i) => {
          let variant = "border-white/20 dark:border-white/[0.08] bg-white/60 dark:bg-white/[0.04]";
          if (selected !== null) {
            if (i === data.correctIndex) {
              variant = "border-green-500/50 bg-green-500/10";
            } else if (i === selected) {
              variant = "border-red-500/50 bg-red-500/10";
            }
          }
          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={selected !== null}
              className={cn(
                "rounded-2xl border backdrop-blur-xl shadow-xl shadow-black/5 p-4 text-left font-medium transition-all duration-200",
                selected === null && "hover:border-primary/40 hover:bg-primary/5 cursor-pointer",
                variant
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
