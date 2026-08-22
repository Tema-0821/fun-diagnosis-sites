import { describe, expect, it } from "vitest";
import { decodeAnswers, encodeAnswers, generateLoveStyle } from "./generate";
import { QUESTIONS, type LoveType } from "./quiz";

function answersOf(...types: LoveType[]): Record<string, LoveType> {
  const answers: Record<string, LoveType> = {};
  QUESTIONS.forEach((q, i) => (answers[q.id] = types[i]));
  return answers;
}

describe("generateLoveStyle", () => {
  it("모든 질문에 답하지 않으면 null을 반환한다", () => {
    expect(generateLoveStyle({})).toBeNull();
  });

  it("가장 많이 선택된 유형이 결과가 된다", () => {
    const answers = answersOf("direct", "direct", "direct", "pushpull", "pushpull", "tsundere");
    const result = generateLoveStyle(answers);
    expect(result?.type).toBe("direct");
  });

  it("같은 답변이면 항상 같은 결과가 나온다", () => {
    const answers = answersOf("devoted", "devoted", "free", "free", "cautious", "cautious");
    const a = generateLoveStyle(answers);
    const b = generateLoveStyle(answers);
    expect(a).toEqual(b);
  });
});

describe("encodeAnswers / decodeAnswers", () => {
  it("인코딩 후 디코딩하면 원래 답변으로 돌아온다", () => {
    const answers = answersOf("direct", "pushpull", "tsundere", "devoted", "free", "cautious");
    const encoded = encodeAnswers(answers);
    const decoded = decodeAnswers(encoded);
    expect(decoded).toEqual(answers);
  });

  it("길이가 다른 코드는 null을 반환한다", () => {
    expect(decodeAnswers("123")).toBeNull();
  });
});
