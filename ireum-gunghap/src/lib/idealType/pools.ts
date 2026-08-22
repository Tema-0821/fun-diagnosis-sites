import type { IdealType } from "./quiz";

export interface IdealTypeInfo {
  name: string;
  emoji: string;
  description: string;
  tip: string;
}

export const IDEAL_TYPE_INFO: Record<IdealType, IdealTypeInfo> = {
  leader: {
    name: "든든한 리더형",
    emoji: "👑",
    description:
      "당신에게 잘 맞는 이상형은 확신 있는 태도로 상황을 이끌어주는 리더형이에요. 우유부단함보다 명확한 방향성에 끌리는 타입이죠.",
    tip: "카리스마 있는 사람에게 먼저 다가가 보세요. 대화를 리드하는 사람 곁에서 편안함을 느낄 거예요.",
  },
  artist: {
    name: "감성적인 예술가형",
    emoji: "🎨",
    description:
      "당신에게 잘 맞는 이상형은 자기만의 세계가 뚜렷한 감성적인 사람이에요. 평범함보다 독특한 시선에 끌리는 타입이죠.",
    tip: "전시회, 공연 같은 문화생활을 함께 즐길 수 있는 사람을 만나면 유독 잘 통할 거예요.",
  },
  supporter: {
    name: "다정한 조력자형",
    emoji: "🤲",
    description:
      "당신에게 잘 맞는 이상형은 묵묵히 곁을 챙겨주는 다정한 사람이에요. 화려함보다 편안함에 마음이 가는 타입이죠.",
    tip: "작은 배려를 알아채고 표현해주는 사람과 함께라면 관계가 오래 안정적으로 이어질 거예요.",
  },
  tsundere: {
    name: "반전 매력 츤데레형",
    emoji: "😏",
    description:
      "당신에게 잘 맞는 이상형은 겉으론 무심해 보여도 속은 다정한 반전 매력의 소유자예요. 뻔한 다정함보다 은근한 진심에 끌리는 타입이죠.",
    tip: "처음엔 무뚝뚝해 보여도 조금씩 마음을 여는 사람에게 좀 더 기회를 줘보세요.",
  },
  healer: {
    name: "잔잔한 힐러형",
    emoji: "🌿",
    description:
      "당신에게 잘 맞는 이상형은 말하지 않아도 마음을 알아채는 편안한 사람이에요. 자극적인 관계보다 안정감을 주는 사이를 원하는 타입이죠.",
    tip: "함께 있을 때 특별한 걸 안 해도 편안한 사람이라면 그 인연을 소중히 여겨보세요.",
  },
  wildcard: {
    name: "예측불가 매력형",
    emoji: "🎲",
    description:
      "당신에게 잘 맞는 이상형은 늘 예상 밖의 재미를 주는 사람이에요. 뻔한 관계보다 설렘이 계속되는 사이를 원하는 타입이죠.",
    tip: "안정보다 새로움을 주는 사람에게 끌린다면, 그 감정을 억누르지 말고 즐겨보세요.",
  },
};
