import { QUESTIONS } from "./questions";

// 답변을 질문 순서대로 이어붙인 숫자 문자열(예: "0123210")로 인코딩해서 URL에 담는다.
export function encodeAnswers(answers: Record<string, number>): string {
  return QUESTIONS.map((q) => answers[q.id] ?? "").join("");
}

export function decodeAnswers(code: string): Record<string, number> | null {
  if (code.length !== QUESTIONS.length) return null;
  const answers: Record<string, number> = {};
  for (let i = 0; i < QUESTIONS.length; i++) {
    const digit = Number(code[i]);
    if (!Number.isInteger(digit) || digit < 0 || digit > 3) return null;
    answers[QUESTIONS[i].id] = digit;
  }
  return answers;
}
