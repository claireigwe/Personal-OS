export type ExerciseType = "multiple-choice" | "translation" | "listen-choose";

export type MultipleChoiceData = {
  options: string[];
  correctIndex: number;
};

export type TranslationData = {
  correctAnswer: string;
  acceptableAnswers?: string[];
};

export type ListenChooseData = {
  audioText: string;
  options: string[];
  correctIndex: number;
};

export type ExerciseItem = {
  id: string;
  type: ExerciseType;
  question: string;
  data: Record<string, unknown>;
  order: number;
};

export type ExerciseAttemptResult = {
  exerciseId: string;
  correct: boolean;
};
