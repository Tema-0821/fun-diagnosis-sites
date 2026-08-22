import type { CompanionTag } from "./quiz";

export interface CompanionInfo {
  name: string;
  emoji: string;
  description: string;
}

export const COMPANION_INFO: Record<CompanionTag, CompanionInfo> = {
  power: {
    name: "새끼 드래곤, 벤",
    emoji: "🐉",
    description:
      "작지만 뜨거운 불꽃을 품은 새끼 드래곤이 당신의 반려로 어울려요. 아직은 작고 서툴지만, 위기의 순간 누구보다 든든하게 앞장서 줄 거예요. 함께 자라며 점점 강해지는 걸 지켜보는 재미가 있는 동료예요.",
  },
  wisdom: {
    name: "부엉이 정령, 오울",
    emoji: "🦉",
    description:
      "고요한 밤하늘의 기운을 담은 부엉이 정령이 당신의 반려로 어울려요. 말은 많지 않지만, 결정적인 순간마다 지혜로운 조언을 건네줄 거예요. 곁에 있는 것만으로도 마음이 차분해지는 신비로운 동료예요.",
  },
  cunning: {
    name: "그림자 여우, 섀도",
    emoji: "🦊",
    description:
      "그림자 속을 자유롭게 넘나드는 여우가 당신의 반려로 어울려요. 장난기 많고 재빠르지만, 위험을 가장 먼저 알아채는 예민한 감각의 소유자예요. 함께 있으면 지루할 틈이 없는 동료예요.",
  },
  charm: {
    name: "빛의 나비, 루미",
    emoji: "🦋",
    description:
      "은은한 빛을 내뿜는 작은 나비가 당신의 반려로 어울려요. 전투보다는 위로에 능한 존재로, 지친 마음을 알아채고 곁을 지켜줄 거예요. 함께 있는 것만으로도 마음이 따뜻해지는 동료예요.",
  },
};
