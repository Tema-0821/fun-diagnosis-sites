import { describe, expect, it } from "vitest";
import { generateNickname } from "./generate";

describe("generateNickname", () => {
  it("같은 이름이면 항상 같은 결과가 나온다(결정론성)", () => {
    const result1 = generateNickname("철수");
    const result2 = generateNickname("철수");
    expect(result1).toEqual(result2);
  });

  it("이름이 비어 있으면 null을 반환한다", () => {
    expect(generateNickname("")).toBeNull();
    expect(generateNickname("   ")).toBeNull();
  });

  it("앞뒤 공백을 정리한다", () => {
    const result1 = generateNickname(" 철수 ");
    const result2 = generateNickname("철수");
    expect(result1).toEqual(result2);
  });

  it("트레이트 3개는 서로 중복되지 않는다", () => {
    const names = ["철수", "영희", "민수", "지은", "가나다"];
    for (const name of names) {
      const result = generateNickname(name);
      const uniqueTraits = new Set(result!.traits);
      expect(uniqueTraits.size).toBe(3);
    }
  });

  it("닉네임에 형용사와 명사가 공백으로 구분되어 들어간다", () => {
    const result = generateNickname("테스트이름");
    expect(result!.nickname).toContain(" ");
  });
});
