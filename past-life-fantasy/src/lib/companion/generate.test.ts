import { describe, expect, it } from "vitest";
import { decodeAnswers, encodeAnswers, generateCompanion } from "./generate";
import { QUESTIONS, type CompanionTag } from "./quiz";

function answersOf(...tags: CompanionTag[]): Record<string, CompanionTag> {
  const answers: Record<string, CompanionTag> = {};
  QUESTIONS.forEach((q, i) => (answers[q.id] = tags[i]));
  return answers;
}

describe("generateCompanion", () => {
  it("모든 질문에 답하지 않으면 null을 반환한다", () => {
    expect(generateCompanion({})).toBeNull();
  });

  it("가장 많이 선택된 태그가 결과가 된다", () => {
    const answers = answersOf("wisdom", "wisdom", "wisdom", "power", "power", "charm");
    const result = generateCompanion(answers);
    expect(result?.tag).toBe("wisdom");
  });

  it("같은 답변이면 항상 같은 결과가 나온다", () => {
    const answers = answersOf("cunning", "cunning", "charm", "charm", "power", "power");
    const a = generateCompanion(answers);
    const b = generateCompanion(answers);
    expect(a).toEqual(b);
  });
});

describe("encodeAnswers / decodeAnswers", () => {
  it("인코딩 후 디코딩하면 원래 답변으로 돌아온다", () => {
    const answers = answersOf("power", "wisdom", "cunning", "charm", "power", "wisdom");
    const encoded = encodeAnswers(answers);
    const decoded = decodeAnswers(encoded);
    expect(decoded).toEqual(answers);
  });

  it("길이가 다른 코드는 null을 반환한다", () => {
    expect(decodeAnswers("12")).toBeNull();
  });
});
