import { describe, expect, it } from "vitest";
import { decodeAnswers, encodeAnswers } from "./share";
import { QUESTIONS } from "./questions";

describe("encodeAnswers / decodeAnswers", () => {
  it("인코딩 후 디코딩하면 원래 답변으로 돌아온다", () => {
    const answers: Record<string, number> = {};
    QUESTIONS.forEach((q, i) => (answers[q.id] = i % 4));

    const encoded = encodeAnswers(answers);
    const decoded = decodeAnswers(encoded);
    expect(decoded).toEqual(answers);
  });

  it("길이가 다른 코드는 null을 반환한다", () => {
    expect(decodeAnswers("123")).toBeNull();
  });

  it("숫자가 아니거나 범위를 벗어나면 null을 반환한다", () => {
    const invalidLength = QUESTIONS.length;
    expect(decodeAnswers("x".repeat(invalidLength))).toBeNull();
    expect(decodeAnswers("9".repeat(invalidLength))).toBeNull();
  });
});
