import { describe, expect, it } from "vitest";
import { decodeAnswers, encodeAnswers, generateHealing } from "./generate";
import { QUESTIONS, type HealingTag } from "./quiz";

function answersOf(...tags: HealingTag[]): Record<string, HealingTag> {
  const answers: Record<string, HealingTag> = {};
  QUESTIONS.forEach((q, i) => (answers[q.id] = tags[i]));
  return answers;
}

describe("generateHealing", () => {
  it("모든 질문에 답하지 않으면 null을 반환한다", () => {
    expect(generateHealing({})).toBeNull();
  });

  it("가장 많이 선택된 태그가 결과가 된다", () => {
    const answers = answersOf("nature", "nature", "nature", "rest", "rest", "social");
    const result = generateHealing(answers);
    expect(result?.tag).toBe("nature");
  });

  it("같은 답변이면 항상 같은 결과가 나온다", () => {
    const answers = answersOf("solo", "solo", "hobby", "hobby", "active", "active");
    const a = generateHealing(answers);
    const b = generateHealing(answers);
    expect(a).toEqual(b);
  });
});

describe("encodeAnswers / decodeAnswers", () => {
  it("인코딩 후 디코딩하면 원래 답변으로 돌아온다", () => {
    const answers = answersOf("nature", "hobby", "rest", "social", "active", "solo");
    const encoded = encodeAnswers(answers);
    const decoded = decodeAnswers(encoded);
    expect(decoded).toEqual(answers);
  });

  it("길이가 다른 코드는 null을 반환한다", () => {
    expect(decodeAnswers("12")).toBeNull();
  });
});
