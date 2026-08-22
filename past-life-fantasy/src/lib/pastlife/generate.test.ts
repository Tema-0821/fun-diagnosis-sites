import { describe, expect, it } from "vitest";
import { generatePastLife } from "./generate";

describe("generatePastLife", () => {
  it("같은 이름이면 항상 같은 결과를 반환한다", () => {
    const a = generatePastLife("홍길동");
    const b = generatePastLife("홍길동");
    expect(a).toEqual(b);
  });

  it("빈 문자열이나 공백만 있으면 null을 반환한다", () => {
    expect(generatePastLife("")).toBeNull();
    expect(generatePastLife("   ")).toBeNull();
  });

  it("이름 앞뒤 공백과 내부 공백을 정리한다", () => {
    const result = generatePastLife("  홍 길동  ");
    expect(result?.name).toBe("홍길동");
  });

  it("전설 지수는 항상 0~100 범위 안에 있다", () => {
    const names = ["가", "나다", "라마바사", "abcdefg", "1234", "테스트이름", "ㄱㄴㄷ"];
    for (const name of names) {
      const result = generatePastLife(name);
      expect(result?.legendScore).toBeGreaterThanOrEqual(0);
      expect(result?.legendScore).toBeLessThanOrEqual(100);
    }
  });

  it("특수 능력 3개는 서로 중복되지 않는다", () => {
    const result = generatePastLife("영희");
    const abilities = result?.abilities ?? [];
    expect(new Set(abilities).size).toBe(3);
  });

  it("이름이 다르면 대체로 다른 결과가 나온다", () => {
    const names = ["철수", "영희", "민수", "지영", "현우", "수빈", "동현", "은지"];
    const results = names.map((n) => generatePastLife(n));
    const uniqueRoles = new Set(results.map((r) => r?.role));
    expect(uniqueRoles.size).toBeGreaterThan(1);
  });

  it("설명과 환생 문구에 이름이 그대로 삽입된다", () => {
    const result = generatePastLife("다은");
    expect(result?.description).toContain("다은");
    expect(result?.rebirth).toContain("다은");
  });
});
