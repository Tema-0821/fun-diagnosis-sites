import type { LoveType } from "./quiz";

export interface LoveTypeInfo {
  name: string;
  emoji: string;
  description: string;
  strength: string;
  caution: string;
}

export const LOVE_TYPE_INFO: Record<LoveType, LoveTypeInfo> = {
  direct: {
    name: "직진형",
    emoji: "🎯",
    description:
      "마음이 생기면 돌려 말하지 않고 솔직하게 표현하는 타입이에요. 눈치싸움보다는 확실한 소통을 선호하죠.",
    strength: "오해가 쌓일 틈이 없고, 상대도 마음을 편하게 놓을 수 있어요.",
    caution: "때로는 상대에게 생각할 시간을 주는 것도 필요해요.",
  },
  pushpull: {
    name: "밀당형",
    emoji: "🎣",
    description:
      "적당한 긴장감과 설렘을 즐기는 타입이에요. 너무 쉽게 마음을 다 보여주지 않는 편이죠.",
    strength: "관계에 활력과 설렘을 오래 유지시켜줘요.",
    caution: "밀당이 길어지면 상대가 지칠 수 있으니 진심을 놓치지 마세요.",
  },
  tsundere: {
    name: "츤데레형",
    emoji: "😤",
    description:
      "속마음과 다르게 무심한 척, 퉁명스러운 척하는 타입이에요. 표현이 서툴지만 마음은 진심이죠.",
    strength: "은근한 매력과 반전 있는 다정함이 오래 기억에 남아요.",
    caution: "가끔은 솔직한 표현도 필요해요, 상대가 헷갈릴 수 있거든요.",
  },
  devoted: {
    name: "헌신형",
    emoji: "🤝",
    description:
      "한번 마음을 주면 끝까지 진심을 다하는 타입이에요. 신뢰와 안정감을 무엇보다 중요하게 여기죠.",
    strength: "관계에 깊은 안정감과 믿음을 만들어줘요.",
    caution: "너무 맞춰주기만 하다 보면 스스로를 잃을 수 있으니 주의하세요.",
  },
  free: {
    name: "자유로운 영혼형",
    emoji: "🕊️",
    description:
      "각자의 공간과 시간을 존중하는 걸 중요하게 여기는 타입이에요. 얽매이는 관계를 부담스러워하죠.",
    strength: "서로에게 숨 쉴 틈을 주는 편안한 관계를 만들어요.",
    caution: "상대는 그 여유를 무심함으로 오해할 수 있으니 표현도 잊지 마세요.",
  },
  cautious: {
    name: "신중형",
    emoji: "🌱",
    description:
      "마음을 여는 데 시간이 걸리지만, 한번 믿으면 깊게 신뢰하는 타입이에요. 성급한 관계보다 확신을 원하죠.",
    strength: "천천히 쌓은 관계는 쉽게 흔들리지 않아요.",
    caution: "너무 신중하다 보면 좋은 기회를 놓칠 수 있으니 가끔은 용기를 내보세요.",
  },
};
