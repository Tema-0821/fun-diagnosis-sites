import { describe, expect, it } from "vitest";
import { decodeAnswers, encodeAnswers, generateJob } from "./generate";
import { QUESTIONS, type JobTag } from "./quiz";

function answersOf(...tags: JobTag[]): Record<string, JobTag> {
  const answers: Record<string, JobTag> = {};
  QUESTIONS.forEach((q, i) => (answers[q.id] = tags[i]));
  return answers;
}

describe("generateJob", () => {
  it("모든 질문에 답하지 않으면 null을 반환한다", () => {
    expect(generateJob({})).toBeNull();
  });

  it("가장 많이 선택된 태그가 결과가 된다", () => {
    const answers = answersOf("mage", "mage", "mage", "warrior", "warrior", "bard");
    const result = generateJob(answers);
    expect(result?.tag).toBe("mage");
  });

  it("같은 답변이면 항상 같은 결과가 나온다", () => {
    const answers = answersOf("rogue", "rogue", "paladin", "paladin", "ranger", "ranger");
    const a = generateJob(answers);
    const b = generateJob(answers);
    expect(a).toEqual(b);
  });
});

describe("encodeAnswers / decodeAnswers", () => {
  it("인코딩 후 디코딩하면 원래 답변으로 돌아온다", () => {
    const answers = answersOf("warrior", "mage", "ranger", "rogue", "paladin", "bard");
    const encoded = encodeAnswers(answers);
    const decoded = decodeAnswers(encoded);
    expect(decoded).toEqual(answers);
  });

  it("길이가 다른 코드는 null을 반환한다", () => {
    expect(decodeAnswers("12")).toBeNull();
  });
});
