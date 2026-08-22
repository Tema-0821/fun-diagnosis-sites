import { describe, expect, it } from "vitest";
import { generateFortune } from "./generate";

describe("generateFortune", () => {
  it("같은 이름과 날짜면 항상 같은 결과가 나온다", () => {
    const a = generateFortune("철수", "2026-08-22");
    const b = generateFortune("철수", "2026-08-22");
    expect(a).toEqual(b);
  });

  it("날짜가 다르면 결과가 달라질 수 있다", () => {
    const a = generateFortune("철수", "2026-08-22");
    const b = generateFortune("철수", "2026-08-23");
    expect(a).not.toEqual(b);
  });

  it("이름이 비어 있으면 null을 반환한다", () => {
    expect(generateFortune("", "2026-08-22")).toBeNull();
    expect(generateFortune("   ", "2026-08-22")).toBeNull();
  });

  it("점수는 0~100 범위 안에 있다", () => {
    const names = ["가", "나다", "라마바사", "테스트", "홍길동"];
    for (const name of names) {
      const result = generateFortune(name, "2026-08-22");
      expect(result?.score).toBeGreaterThanOrEqual(0);
      expect(result?.score).toBeLessThanOrEqual(100);
    }
  });

  it("행운의 숫자는 1~99 범위 안에 있다", () => {
    const result = generateFortune("영희", "2026-08-22");
    expect(result?.luckyNumber).toBeGreaterThanOrEqual(1);
    expect(result?.luckyNumber).toBeLessThanOrEqual(99);
  });
});
