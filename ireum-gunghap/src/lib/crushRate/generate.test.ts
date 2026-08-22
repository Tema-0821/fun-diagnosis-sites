import { describe, expect, it } from "vitest";
import { generateCrushRate } from "./generate";

describe("generateCrushRate", () => {
  it("같은 이름 조합이면 항상 같은 결과가 나온다", () => {
    const a = generateCrushRate("철수", "영희");
    const b = generateCrushRate("철수", "영희");
    expect(a).toEqual(b);
  });

  it("me/crush 필드는 입력 순서를 그대로 반영한다(방향성 있는 관계)", () => {
    const a = generateCrushRate("철수", "영희");
    const b = generateCrushRate("영희", "철수");
    expect(a?.me).toBe("철수");
    expect(a?.crush).toBe("영희");
    expect(b?.me).toBe("영희");
    expect(b?.crush).toBe("철수");
  });

  it("이름이 비어 있으면 null을 반환한다", () => {
    expect(generateCrushRate("", "영희")).toBeNull();
    expect(generateCrushRate("철수", "")).toBeNull();
  });

  it("점수는 0~100 범위 안에 있다", () => {
    const pairs: [string, string][] = [
      ["가", "나"],
      ["다라", "마바"],
      ["테스트", "이름"],
    ];
    for (const [me, crush] of pairs) {
      const result = generateCrushRate(me, crush);
      expect(result?.score).toBeGreaterThanOrEqual(0);
      expect(result?.score).toBeLessThanOrEqual(100);
    }
  });
});
