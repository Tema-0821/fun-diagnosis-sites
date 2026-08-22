import { describe, expect, it } from "vitest";
import { generatePastLife, scoreElements } from "./generate";
import { QUIZ_QUESTIONS, type Element } from "./quiz";

function answersOf(...elements: Element[]): Record<string, Element> {
  const answers: Record<string, Element> = {};
  QUIZ_QUESTIONS.forEach((q, i) => (answers[q.id] = elements[i]));
  return answers;
}

describe("generatePastLife", () => {
  it("모든 질문에 답하지 않으면 null을 반환한다", () => {
    expect(generatePastLife({})).toBeNull();
    const partial = answersOf("fire", "fire", "fire");
    expect(generatePastLife(partial)).toBeNull();
  });

  it("같은 답변이면 항상 같은 결과를 반환한다", () => {
    const answers = answersOf("fire", "fire", "water", "wind", "earth", "fire");
    const a = generatePastLife(answers);
    const b = generatePastLife(answers);
    expect(a).toEqual(b);
  });

  it("가장 많이 선택된 원소가 전생, 두 번째로 많은 원소가 환생 결과가 된다", () => {
    const answers = answersOf("fire", "fire", "fire", "water", "water", "wind");
    const result = generatePastLife(answers);
    expect(result?.primaryElement).toBe("fire");
    expect(result?.secondaryElement).toBe("water");
  });

  it("전생과 환생 결과는 서로 다른 원소에서 나온다", () => {
    const answers = answersOf("earth", "earth", "earth", "earth", "wind", "wind");
    const result = generatePastLife(answers);
    expect(result?.primaryElement).not.toBe(result?.secondaryElement);
  });

  it("모든 답이 하나의 원소로 몰려도 primary/secondary가 결정된다", () => {
    const answers = answersOf("wind", "wind", "wind", "wind", "wind", "wind");
    const result = generatePastLife(answers);
    expect(result?.primaryElement).toBe("wind");
    expect(result?.secondaryElement).not.toBe("wind");
  });
});

describe("scoreElements", () => {
  it("4개 원소를 모두 포함한 순위를 반환한다", () => {
    const ranked = scoreElements(answersOf("fire", "water", "wind", "earth", "fire", "water"));
    expect(new Set(ranked)).toEqual(new Set(["fire", "water", "wind", "earth"]));
    expect(ranked).toHaveLength(4);
  });
});
