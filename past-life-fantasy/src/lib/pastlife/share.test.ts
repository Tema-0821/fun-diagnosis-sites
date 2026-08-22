import { describe, expect, it } from "vitest";
import { decodeAnswers, encodeAnswers } from "./share";
import { QUIZ_QUESTIONS, type Element } from "./quiz";

describe("encodeAnswers / decodeAnswers", () => {
  it("인코딩 후 디코딩하면 원래 답변으로 돌아온다", () => {
    const elements: Element[] = ["fire", "water", "wind", "earth", "fire", "water"];
    const answers: Record<string, Element> = {};
    QUIZ_QUESTIONS.forEach((q, i) => (answers[q.id] = elements[i]));

    const encoded = encodeAnswers(answers);
    const decoded = decodeAnswers(encoded);
    expect(decoded).toEqual(answers);
  });

  it("길이가 다른 코드는 null을 반환한다", () => {
    expect(decodeAnswers("123")).toBeNull();
  });

  it("잘못된 코드가 있으면 null을 반환한다", () => {
    expect(decodeAnswers("x".repeat(QUIZ_QUESTIONS.length))).toBeNull();
    expect(decodeAnswers("9".repeat(QUIZ_QUESTIONS.length))).toBeNull();
  });
});
