import { QUIZ_QUESTIONS, type Element } from "./quiz";

const ELEMENT_CODE: Record<Element, string> = { fire: "0", water: "1", wind: "2", earth: "3" };
const CODE_ELEMENT: Record<string, Element> = { "0": "fire", "1": "water", "2": "wind", "3": "earth" };

// 답변을 질문 순서대로 이어붙인 숫자 문자열(예: "012301")로 인코딩해서 URL에 담는다.
export function encodeAnswers(answers: Record<string, Element>): string {
  return QUIZ_QUESTIONS.map((q) => (answers[q.id] ? ELEMENT_CODE[answers[q.id]] : "")).join("");
}

export function decodeAnswers(code: string): Record<string, Element> | null {
  if (code.length !== QUIZ_QUESTIONS.length) return null;
  const answers: Record<string, Element> = {};
  for (let i = 0; i < QUIZ_QUESTIONS.length; i++) {
    const element = CODE_ELEMENT[code[i]];
    if (!element) return null;
    answers[QUIZ_QUESTIONS[i].id] = element;
  }
  return answers;
}
