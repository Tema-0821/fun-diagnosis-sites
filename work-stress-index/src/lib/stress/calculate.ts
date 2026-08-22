import { getStressBand, type StressBand } from "./pools";
import { MAX_SCORE, QUESTIONS } from "./questions";

export interface StressResult {
  scorePercent: number; // 0~100
  band: StressBand;
}

// answers는 질문 id -> 선택한 옵션의 score(0~3) 맵.
export function calculateStress(answers: Record<string, number>): StressResult | null {
  const hasAllAnswers = QUESTIONS.every((q) => typeof answers[q.id] === "number");
  if (!hasAllAnswers) return null;

  const rawScore = QUESTIONS.reduce((sum, q) => sum + (answers[q.id] ?? 0), 0);
  const scorePercent = Math.round((rawScore / MAX_SCORE) * 100);
  const band = getStressBand(scorePercent);

  return { scorePercent, band };
}
