import type { GeneratedCurriculum } from "./curriculum";

export type DeepSeekCurriculumInput = {
  language: string;
  level: string;
  learningStyle: string;
};

export async function generateCurriculumWithDeepSeek(
  input: DeepSeekCurriculumInput
): Promise<GeneratedCurriculum> {
  void input;
  throw new Error(
    "DeepSeek curriculum generation is intentionally prepared but not enabled in Version 1."
  );
}
