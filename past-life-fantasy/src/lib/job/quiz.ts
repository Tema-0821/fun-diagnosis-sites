export type JobTag = "warrior" | "mage" | "ranger" | "rogue" | "paladin" | "bard";

export interface QuizOption {
  label: string;
  tag: JobTag;
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: readonly QuizOption[];
}

export const QUESTIONS: readonly QuizQuestion[] = [
  {
    id: "battle",
    text: "전투가 벌어지면 나는?",
    options: [
      { label: "가장 먼저 적진으로 뛰어든다", tag: "warrior" },
      { label: "마법으로 전황을 뒤집는다", tag: "mage" },
      { label: "멀리서 정확하게 적을 노린다", tag: "ranger" },
      { label: "그림자 속에서 은밀히 움직인다", tag: "rogue" },
    ],
  },
  {
    id: "role",
    text: "파티에서 내가 자주 맡는 역할은?",
    options: [
      { label: "몸을 던져 동료를 지킨다", tag: "paladin" },
      { label: "분위기를 띄우고 사기를 북돋운다", tag: "bard" },
      { label: "위험을 먼저 감지하고 알린다", tag: "rogue" },
      { label: "냉정하게 상황을 분석한다", tag: "mage" },
    ],
  },
  {
    id: "weapon",
    text: "가장 끌리는 무기는?",
    options: [
      { label: "커다란 대검이나 전투 도끼", tag: "warrior" },
      { label: "고대의 마법서와 지팡이", tag: "mage" },
      { label: "정교하게 만들어진 장궁", tag: "ranger" },
      { label: "성스러운 문양이 새겨진 방패와 검", tag: "paladin" },
    ],
  },
  {
    id: "training",
    text: "수련할 때 나는 어떤 스타일인가요?",
    options: [
      { label: "몸을 단련하며 강해지는 것을 즐긴다", tag: "warrior" },
      { label: "새로운 마법 이론을 파고든다", tag: "mage" },
      { label: "은신과 기습 기술을 연마한다", tag: "rogue" },
      { label: "악기 연주와 화술을 갈고닦는다", tag: "bard" },
    ],
  },
  {
    id: "crisis",
    text: "동료가 위기에 처하면 나는?",
    options: [
      { label: "몸으로 막아서며 지켜낸다", tag: "paladin" },
      { label: "정확한 원호 사격으로 돕는다", tag: "ranger" },
      { label: "적의 시선을 다른 곳으로 돌려 틈을 만든다", tag: "rogue" },
      { label: "응원과 노래로 힘을 북돋운다", tag: "bard" },
    ],
  },
  {
    id: "reward",
    text: "임무가 끝난 뒤 가장 뿌듯한 순간은?",
    options: [
      { label: "온몸으로 싸워 승리를 지켜냈을 때", tag: "warrior" },
      { label: "마법으로 결정적인 순간을 만들었을 때", tag: "mage" },
      { label: "아무도 눈치채지 못하게 임무를 완수했을 때", tag: "rogue" },
      { label: "사람들 앞에서 무용담을 들려줄 때", tag: "bard" },
    ],
  },
] as const;
