import { describe, expect, it } from "vitest";
import { generateMood } from "./generate";

describe("generateMood", () => {
  it("같은 이름과 날짜면 항상 같은 결과가 나온다", () => {
    const a = generateMood("철수", "2026-08-22");
    const b = generateMood("철수", "2026-08-22");
    expect(a).toEqual(b);
  });

  it("날짜가 다르면 결과가 달라질 수 있다", () => {
    const a = generateMood("철수", "2026-08-22");
    const b = generateMood("철수", "2026-08-23");
    expect(a).not.toEqual(b);
  });

  it("이름이 비어 있으면 null을 반환한다", () => {
    expect(generateMood("", "2026-08-22")).toBeNull();
  });
});
