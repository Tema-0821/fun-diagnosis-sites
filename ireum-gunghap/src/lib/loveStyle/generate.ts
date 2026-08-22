import { LOVE_TYPE_INFO, type LoveTypeInfo } from "./pools";
import { QUESTIONS, type LoveType } from "./quiz";

const TYPE_ORDER: readonly LoveType[] = ["direct", "pushpull", "tsundere", "devoted", "free", "cautious"];

export interface LoveStyleResult {
  type: LoveType;
  info: LoveTypeInfo;
}

export function generateLoveStyle(answers: Record<string, LoveType>): LoveStyleResult | null {
  const hasAllAnswers = QUESTIONS.every((q) => Boolean(answers[q.id]));
  if (!hasAllAnswers) return null;

  const counts: Record<LoveType, number> = {
    direct: 0,
    pushpull: 0,
    tsundere: 0,
    devoted: 0,
    free: 0,
    cautious: 0,
  };
  for (const q of QUESTIONS) {
    counts[answers[q.id]] += 1;
  }

  const topType = [...TYPE_ORDER].sort((a, b) => counts[b] - counts[a])[0];
  return { type: topType, info: LOVE_TYPE_INFO[topType] };
}

// 답변을 질문 순서대로 이어붙인 코드로 URL에 담는다.
const TYPE_CODE: Record<LoveType, string> = {
  direct: "0",
  pushpull: "1",
  tsundere: "2",
  devoted: "3",
  free: "4",
  cautious: "5",
};
const CODE_TYPE: Record<string, LoveType> = {
  "0": "direct",
  "1": "pushpull",
  "2": "tsundere",
  "3": "devoted",
  "4": "free",
  "5": "cautious",
};

export function encodeAnswers(answers: Record<string, LoveType>): string {
  return QUESTIONS.map((q) => (answers[q.id] ? TYPE_CODE[answers[q.id]] : "")).join("");
}

export function decodeAnswers(code: string): Record<string, LoveType> | null {
  if (code.length !== QUESTIONS.length) return null;
  const answers: Record<string, LoveType> = {};
  for (let i = 0; i < QUESTIONS.length; i++) {
    const type = CODE_TYPE[code[i]];
    if (!type) return null;
    answers[QUESTIONS[i].id] = type;
  }
  return answers;
}
