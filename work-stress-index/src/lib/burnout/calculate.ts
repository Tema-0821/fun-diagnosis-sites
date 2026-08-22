import { getBurnoutBand, type BurnoutBand } from "./pools";
import { MAX_SCORE, QUESTIONS } from "./questions";

export interface BurnoutResult {
  scorePercent: number; // 0~100
  band: BurnoutBand;
}

// answers는 질문 id -> 선택한 옵션의 score(0~3) 맵.
export function calculateBurnout(answers: Record<string, number>): BurnoutResult | null {
  const hasAllAnswers = QUESTIONS.every((q) => typeof answers[q.id] === "number");
  if (!hasAllAnswers) return null;

  const rawScore = QUESTIONS.reduce((sum, q) => sum + (answers[q.id] ?? 0), 0);
  const scorePercent = Math.round((rawScore / MAX_SCORE) * 100);
  const band = getBurnoutBand(scorePercent);

  return { scorePercent, band };
}
