import type { Element } from "./quiz";

export interface ElementInfo {
  key: Element;
  name: string;
  color: string;
  pastLife: {
    role: string;
    description: string;
  };
  rebirth: {
    title: string;
    description: string;
  };
}

export const ELEMENTS: Record<Element, ElementInfo> = {
  fire: {
    key: "fire",
    name: "불",
    color: "#f87171",
    pastLife: {
      role: "전장을 호령하던 불꽃의 전사",
      description:
        "당신의 전생은 망설임 없이 앞장서던 전사였습니다. 위기의 순간마다 가장 먼저 검을 들었고, 그 뜨거운 기세로 동료들의 사기를 끌어올렸죠. 두려움보다 책임감이 늘 한발 빨랐던 삶이었습니다.",
    },
    rebirth: {
      title: "뜨거운 몰입으로 무언가를 이뤄낼 운명",
      description:
        "이번 생에서는 한번 꽂히면 끝까지 파고드는 열정이 큰 무기가 될 거예요. 남들이 주저할 때 먼저 도전하는 쪽이 당신에게는 더 편안한 길입니다. 그 추진력이 결국 큰 변화를 만들어낼 거예요.",
    },
  },
  water: {
    key: "water",
    name: "물",
    color: "#60a5fa",
    pastLife: {
      role: "달빛 아래 노래하던 물의 음유시인",
      description:
        "당신의 전생은 사람들의 마음을 어루만지던 음유시인이었습니다. 전투보다 이야기와 노래로 사람들을 위로했고, 누구보다 먼저 타인의 슬픔을 알아채는 섬세한 감각을 지녔죠. 깊은 공감이 곧 힘이었던 삶이었습니다.",
    },
    rebirth: {
      title: "깊은 공감으로 누군가를 치유할 운명",
      description:
        "이번 생에서는 당신의 섬세함이 누군가에게 큰 위로가 될 거예요. 말하지 않아도 상대의 마음을 알아채는 능력이 관계를 깊게 만들어줄 겁니다. 그 공감이 결국 당신 주변 사람들을 지키는 힘이 될 거예요.",
    },
  },
  wind: {
    key: "wind",
    name: "바람",
    color: "#fbbf24",
    pastLife: {
      role: "바람을 타고 세상을 누비던 방랑 상인",
      description:
        "당신의 전생은 한곳에 머무르지 않던 자유로운 방랑자였습니다. 낯선 길을 두려워하지 않았고, 새로운 사람과 이야기 앞에서 늘 눈을 반짝였죠. 정해진 틀보다 스스로 찾은 길을 믿었던 삶이었습니다.",
    },
    rebirth: {
      title: "자유로운 발걸음으로 새 길을 개척할 운명",
      description:
        "이번 생에서는 남들이 가지 않는 길에서 오히려 기회를 발견하게 될 거예요. 변화를 두려워하지 않는 유연함이 당신을 새로운 곳으로 데려다줄 겁니다. 그 호기심이 결국 인생의 방향을 스스로 그리게 해줄 거예요.",
    },
  },
  earth: {
    key: "earth",
    name: "대지",
    color: "#4ade80",
    pastLife: {
      role: "숲과 대지를 지키던 고목의 수호자",
      description:
        "당신의 전생은 묵묵히 자리를 지키던 수호자였습니다. 화려하진 않았지만 누구보다 믿음직했고, 약속과 원칙을 소중히 여기며 곁을 지켰죠. 흔들리지 않는 신뢰가 곧 힘이었던 삶이었습니다.",
    },
    rebirth: {
      title: "흔들림 없는 믿음으로 곁을 지킬 운명",
      description:
        "이번 생에서는 당신의 꾸준함이 누군가에게 가장 든든한 버팀목이 될 거예요. 화려한 순간보다 오래가는 신뢰를 만드는 쪽에 재능이 있습니다. 그 인내가 결국 가장 단단한 결실로 돌아올 거예요.",
    },
  },
};
