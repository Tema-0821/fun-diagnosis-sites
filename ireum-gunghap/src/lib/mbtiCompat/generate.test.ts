import { describe, expect, it } from "vitest";
import { generateCompatibility } from "./generate";
import { MBTI_TYPES } from "./types";

describe("generateCompatibility", () => {
  it("같은 입력이면 항상 같은 결과가 나온다(결정론성)", () => {
    const result1 = generateCompatibility("INTJ", "ENFP");
    const result2 = generateCompatibility("INTJ", "ENFP");
    expect(result1).toEqual(result2);
  });

  it("입력 순서를 바꿔도 같은 결과가 나온다", () => {
    const result1 = generateCompatibility("INTJ", "ENFP");
    const result2 = generateCompatibility("ENFP", "INTJ");
    expect(result1).toEqual(result2);
  });

  it("모든 유형 조합에서 점수는 0~100 사이다", () => {
    for (const a of MBTI_TYPES) {
      for (const b of MBTI_TYPES) {
        const result = generateCompatibility(a, b);
        expect(result.score).toBeGreaterThanOrEqual(0);
        expect(result.score).toBeLessThanOrEqual(100);
      }
    }
  });

  it("같은 유형끼리도 유효한 결과가 나온다", () => {
    const result = generateCompatibility("ENFP", "ENFP");
    expect(result.typeA).toBe("ENFP");
    expect(result.typeB).toBe("ENFP");
  });

  it("문장에 {a}/{b} 플레이스홀더가 실제 유형 코드로 치환된다", () => {
    const result = generateCompatibility("ISTJ", "ESFP");
    expect(result.opening).not.toContain("{a}");
    expect(result.opening).not.toContain("{b}");
    expect(result.opening).toContain(result.typeA);
  });
});
