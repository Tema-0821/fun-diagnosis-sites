import { describe, expect, it } from "vitest";
import { calculateStress } from "./calculate";
import { QUESTIONS } from "./questions";

function makeAnswers(score: number): Record<string, number> {
  const answers: Record<string, number> = {};
  for (const q of QUESTIONS) answers[q.id] = score;
  return answers;
}

describe("calculateStress", () => {
  it("모든 질문에 0점을 주면 0%가 나온다", () => {
    const result = calculateStress(makeAnswers(0));
    expect(result!.scorePercent).toBe(0);
  });

  it("모든 질문에 3점(최고점)을 주면 100%가 나온다", () => {
    const result = calculateStress(makeAnswers(3));
    expect(result!.scorePercent).toBe(100);
  });

  it("일부 질문에만 답하면 null을 반환한다", () => {
    const partial = { [QUESTIONS[0].id]: 2 };
    expect(calculateStress(partial)).toBeNull();
  });

  it("점수 구간에 맞는 등급 타이틀이 매칭된다", () => {
    const low = calculateStress(makeAnswers(0));
    const high = calculateStress(makeAnswers(3));
    expect(low!.band.title).toContain("프리");
    expect(high!.band.title).toContain("휴식");
  });

  it("같은 답변이면 항상 같은 결과가 나온다", () => {
    const answers = makeAnswers(2);
    const result1 = calculateStress(answers);
    const result2 = calculateStress(answers);
    expect(result1).toEqual(result2);
  });
});
