import type { LeadershipTag } from "./quiz";

export interface LeadershipInfo {
  name: string;
  emoji: string;
  description: string;
  tip: string;
}

export const LEADERSHIP_INFO: Record<LeadershipTag, LeadershipInfo> = {
  charismatic: {
    name: "카리스마 리더형",
    emoji: "👑",
    description:
      "당신의 리더십 스타일은 확신 있는 태도로 팀을 이끄는 카리스마형이에요. 망설이는 팀 앞에서 먼저 방향을 제시하고 앞장서는 타입이죠.",
    tip: "강한 추진력은 큰 무기지만, 가끔은 팀원들의 속도에 맞춰 한 박자 쉬어가는 것도 좋아요.",
  },
  communicator: {
    name: "소통형 리더",
    emoji: "💬",
    description:
      "당신의 리더십 스타일은 팀원들의 목소리에 귀 기울이는 소통형이에요. 일방적인 지시보다 대화를 통해 함께 답을 찾아가는 타입이죠.",
    tip: "의견을 모으는 데 강하니, 중요한 순간에는 조금 더 명확하게 방향을 정리해주는 것도 필요해요.",
  },
  coach: {
    name: "코칭형 리더",
    emoji: "🌱",
    description:
      "당신의 리더십 스타일은 팀원 개개인의 성장을 돕는 코칭형이에요. 답을 바로 주기보다 스스로 찾아가도록 옆에서 이끌어주는 타입이죠.",
    tip: "성장을 기다려주는 인내심이 강점이니, 급한 순간엔 직접 나서는 것도 필요해요.",
  },
  servant: {
    name: "서번트 리더",
    emoji: "🤲",
    description:
      "당신의 리더십 스타일은 팀원들이 일하기 편한 환경을 만드는 서번트형이에요. 나서기보다 뒤에서 든든하게 팀을 지지하는 타입이죠.",
    tip: "묵묵한 지원이 강점이지만, 때로는 당신의 공로도 스스로 드러내 보세요.",
  },
  visionary: {
    name: "비전 제시형 리더",
    emoji: "🧭",
    description:
      "당신의 리더십 스타일은 큰 그림을 그리는 비전 제시형이에요. 눈앞의 일보다 앞으로 나아갈 방향을 먼저 고민하는 타입이죠.",
    tip: "멀리 보는 시야가 강점이니, 가끔은 팀원들과 눈앞의 디테일도 함께 챙겨보세요.",
  },
  perfectionist: {
    name: "완벽주의 리더",
    emoji: "🎯",
    description:
      "당신의 리더십 스타일은 높은 완성도로 본보기를 보이는 완벽주의형이에요. 스스로 기준을 높게 잡고 결과로 팀을 이끄는 타입이죠.",
    tip: "꼼꼼함은 신뢰를 만들지만, 모든 걸 완벽하게 하려다 팀원에게 부담을 주지 않도록 조절해보세요.",
  },
};
