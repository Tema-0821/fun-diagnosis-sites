import { describe, expect, it } from "vitest";
import { decodeAnswers, encodeAnswers, generateLeadership } from "./generate";
import { QUESTIONS, type LeadershipTag } from "./quiz";

function answersOf(...tags: LeadershipTag[]): Record<string, LeadershipTag> {
  const answers: Record<string, LeadershipTag> = {};
  QUESTIONS.forEach((q, i) => (answers[q.id] = tags[i]));
  return answers;
}

describe("generateLeadership", () => {
  it("모든 질문에 답하지 않으면 null을 반환한다", () => {
    expect(generateLeadership({})).toBeNull();
  });

  it("가장 많이 선택된 태그가 결과가 된다", () => {
    const answers = answersOf(
      "communicator",
      "communicator",
      "communicator",
      "charismatic",
      "charismatic",
      "coach",
    );
    const result = generateLeadership(answers);
    expect(result?.tag).toBe("communicator");
  });

  it("같은 답변이면 항상 같은 결과가 나온다", () => {
    const answers = answersOf(
      "servant",
      "servant",
      "visionary",
      "visionary",
      "perfectionist",
      "perfectionist",
    );
    const a = generateLeadership(answers);
    const b = generateLeadership(answers);
    expect(a).toEqual(b);
  });
});

describe("encodeAnswers / decodeAnswers", () => {
  it("인코딩 후 디코딩하면 원래 답변으로 돌아온다", () => {
    const answers = answersOf(
      "charismatic",
      "communicator",
      "coach",
      "servant",
      "visionary",
      "perfectionist",
    );
    const encoded = encodeAnswers(answers);
    const decoded = decodeAnswers(encoded);
    expect(decoded).toEqual(answers);
  });

  it("길이가 다른 코드는 null을 반환한다", () => {
    expect(decodeAnswers("12")).toBeNull();
  });
});
