import type { HealingTag } from "./quiz";

export interface HealingInfo {
  name: string;
  emoji: string;
  description: string;
  tip: string;
}

export const HEALING_INFO: Record<HealingTag, HealingInfo> = {
  nature: {
    name: "자연 속 힐링형",
    emoji: "🌿",
    description:
      "당신에게 맞는 힐링 방법은 자연 속에서 몸과 마음을 풀어주는 거예요. 복잡한 생각도 탁 트인 풍경 앞에서는 자연스럽게 정리되는 타입이죠.",
    tip: "가까운 공원이나 산책로라도 좋아요. 하루 20분만 자연광 아래를 걸어보세요.",
  },
  hobby: {
    name: "몰입 취미 힐링형",
    emoji: "🎨",
    description:
      "당신에게 맞는 힐링 방법은 좋아하는 취미에 완전히 몰입하는 거예요. 시간 가는 줄 모르게 뭔가에 빠져 있을 때 스트레스가 가장 잘 풀리는 타입이죠.",
    tip: "퇴근 후 30분만이라도 온전히 취미에 쓸 수 있는 시간을 확보해보세요.",
  },
  rest: {
    name: "달콤한 휴식 힐링형",
    emoji: "🛌",
    description:
      "당신에게 맞는 힐링 방법은 아무것도 안 하고 온전히 쉬는 거예요. 무언가를 해야 한다는 압박에서 벗어날 때 진짜 회복이 되는 타입이죠.",
    tip: "죄책감 없이 아무것도 안 하는 시간을 스스로에게 허락해주세요.",
  },
  social: {
    name: "사람들과 함께 힐링형",
    emoji: "🥂",
    description:
      "당신에게 맞는 힐링 방법은 좋아하는 사람들과 어울리는 거예요. 혼자 끙끙 앓기보다 함께 웃고 떠들 때 마음이 훨씬 가벼워지는 타입이죠.",
    tip: "힘들 때일수록 혼자 참지 말고, 편한 사람에게 먼저 연락해보세요.",
  },
  active: {
    name: "땀 흘리는 힐링형",
    emoji: "🏃",
    description:
      "당신에게 맞는 힐링 방법은 몸을 움직이며 에너지를 발산하는 거예요. 가만히 있는 것보다 땀 흘리고 나서야 머리가 맑아지는 타입이죠.",
    tip: "격한 운동이 아니어도 괜찮아요. 짧게라도 몸을 움직이는 루틴을 만들어보세요.",
  },
  solo: {
    name: "혼자만의 시간 힐링형",
    emoji: "📖",
    description:
      "당신에게 맞는 힐링 방법은 온전히 혼자 있는 시간을 갖는 거예요. 누구의 방해도 없이 나만의 속도로 생각을 정리할 때 가장 편안해지는 타입이죠.",
    tip: "하루 중 짧게라도 아무에게도 방해받지 않는 나만의 시간을 확보해보세요.",
  },
};
