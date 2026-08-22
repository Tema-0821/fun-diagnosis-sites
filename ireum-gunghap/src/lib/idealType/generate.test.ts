import { describe, expect, it } from "vitest";
import { decodeAnswers, encodeAnswers, generateIdealType } from "./generate";
import { QUESTIONS, type IdealType } from "./quiz";

function answersOf(...types: IdealType[]): Record<string, IdealType> {
  const answers: Record<string, IdealType> = {};
  QUESTIONS.forEach((q, i) => (answers[q.id] = types[i]));
  return answers;
}

describe("generateIdealType", () => {
  it("모든 질문에 답하지 않으면 null을 반환한다", () => {
    expect(generateIdealType({})).toBeNull();
  });

  it("가장 많이 선택된 유형이 결과가 된다", () => {
    const answers = answersOf("leader", "leader", "leader", "artist", "artist", "healer");
    const result = generateIdealType(answers);
    expect(result?.type).toBe("leader");
  });

  it("같은 답변이면 항상 같은 결과가 나온다", () => {
    const answers = answersOf(
      "supporter",
      "supporter",
      "tsundere",
      "tsundere",
      "wildcard",
      "wildcard",
    );
    const a = generateIdealType(answers);
    const b = generateIdealType(answers);
    expect(a).toEqual(b);
  });
});

describe("encodeAnswers / decodeAnswers", () => {
  it("인코딩 후 디코딩하면 원래 답변으로 돌아온다", () => {
    const answers = answersOf("leader", "artist", "supporter", "tsundere", "healer", "wildcard");
    const encoded = encodeAnswers(answers);
    const decoded = decodeAnswers(encoded);
    expect(decoded).toEqual(answers);
  });

  it("길이가 다른 코드는 null을 반환한다", () => {
    expect(decodeAnswers("12")).toBeNull();
  });
});
