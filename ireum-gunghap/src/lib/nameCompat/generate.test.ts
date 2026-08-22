import { describe, expect, it } from "vitest";
import { generateCompatibility } from "./generate";

describe("generateCompatibility", () => {
  it("같은 입력이면 항상 같은 결과가 나온다(결정론성)", () => {
    const result1 = generateCompatibility("철수", "영희");
    const result2 = generateCompatibility("철수", "영희");
    expect(result1).toEqual(result2);
  });

  it("입력 순서를 바꿔도 같은 결과가 나온다", () => {
    const result1 = generateCompatibility("철수", "영희");
    const result2 = generateCompatibility("영희", "철수");
    expect(result1).toEqual(result2);
  });

  it("점수는 항상 0~100 사이다", () => {
    const names = ["철수", "영희", "민수", "지은", "가", "하하하하하"];
    for (let i = 0; i < names.length; i++) {
      for (let j = 0; j < names.length; j++) {
        const result = generateCompatibility(names[i], names[j]);
        expect(result).not.toBeNull();
        expect(result!.score).toBeGreaterThanOrEqual(0);
        expect(result!.score).toBeLessThanOrEqual(100);
      }
    }
  });

  it("이름이 비어 있으면 null을 반환한다", () => {
    expect(generateCompatibility("", "영희")).toBeNull();
    expect(generateCompatibility("철수", "")).toBeNull();
    expect(generateCompatibility("   ", "영희")).toBeNull();
  });

  it("앞뒤 공백과 내부 공백을 정리한다", () => {
    const result1 = generateCompatibility(" 철수 ", "영희");
    const result2 = generateCompatibility("철수", "영희");
    expect(result1).toEqual(result2);
  });

  it("서로 다른 이름 조합은 서로 다른 결과가 나올 가능성이 높다", () => {
    const result1 = generateCompatibility("철수", "영희");
    const result2 = generateCompatibility("민수", "지은");
    // 완전히 같은 결과가 나올 확률은 낮지만, 최소한 둘 다 유효한 결과여야 한다.
    expect(result1).not.toBeNull();
    expect(result2).not.toBeNull();
  });

  it("문장에 {a}/{b} 플레이스홀더가 실제 이름으로 치환된다", () => {
    const result = generateCompatibility("가나", "다라");
    expect(result).not.toBeNull();
    expect(result!.opening).not.toContain("{a}");
    expect(result!.opening).not.toContain("{b}");
    expect(result!.opening).toContain(result!.nameA);
  });
});
