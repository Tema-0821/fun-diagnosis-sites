export type LeadershipTag =
  | "charismatic"
  | "communicator"
  | "coach"
  | "servant"
  | "visionary"
  | "perfectionist";

export interface QuizOption {
  label: string;
  tag: LeadershipTag;
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: readonly QuizOption[];
}

export const QUESTIONS: readonly QuizQuestion[] = [
  {
    id: "decision",
    text: "중요한 결정을 내려야 할 때 나는?",
    options: [
      { label: "확신을 갖고 빠르게 방향을 정한다", tag: "charismatic" },
      { label: "팀원들의 의견을 먼저 들어본다", tag: "communicator" },
      { label: "각자 생각할 시간을 주고 스스로 답을 찾게 한다", tag: "coach" },
      { label: "팀에 가장 도움이 되는 방향을 우선한다", tag: "servant" },
    ],
  },
  {
    id: "team_role",
    text: "팀에서 나의 역할은?",
    options: [
      { label: "목표를 제시하고 팀을 이끈다", tag: "charismatic" },
      { label: "팀원들 사이를 조율하고 소통을 돕는다", tag: "communicator" },
      { label: "팀원들이 일하기 편한 환경을 만든다", tag: "servant" },
      { label: "앞으로의 방향과 큰 그림을 그린다", tag: "visionary" },
    ],
  },
  {
    id: "motivation",
    text: "팀원의 사기를 끌어올리는 나만의 방법은?",
    options: [
      { label: "자주 대화하며 마음을 다독인다", tag: "communicator" },
      { label: "잘한 점을 짚어주며 성장 방향을 알려준다", tag: "coach" },
      { label: "큰 그림과 비전을 보여준다", tag: "visionary" },
      { label: "스스로 완성도 높은 결과로 본보기를 보인다", tag: "perfectionist" },
    ],
  },
  {
    id: "crisis",
    text: "프로젝트에 문제가 생겼을 때 나는?",
    options: [
      { label: "즉시 나서서 상황을 정리한다", tag: "charismatic" },
      { label: "원인을 짚어주며 팀원이 스스로 해결하게 돕는다", tag: "coach" },
      { label: "장기적인 관점에서 대안을 제시한다", tag: "visionary" },
      { label: "원인을 꼼꼼히 분석해 재발을 막는다", tag: "perfectionist" },
    ],
  },
  {
    id: "strength",
    text: "동료들이 인정하는 나의 강점은?",
    options: [
      { label: "강한 추진력과 자신감", tag: "charismatic" },
      { label: "뛰어난 공감 능력과 소통", tag: "communicator" },
      { label: "사람을 키우는 능력", tag: "coach" },
      { label: "꼼꼼함과 높은 완성도", tag: "perfectionist" },
    ],
  },
  {
    id: "ideal_team",
    text: "내가 꿈꾸는 이상적인 팀의 모습은?",
    options: [
      { label: "서로 편하게 이야기하는 팀", tag: "communicator" },
      { label: "각자 성장하며 발전하는 팀", tag: "coach" },
      { label: "서로를 세심하게 챙기는 팀", tag: "servant" },
      { label: "디테일까지 완벽한 결과물을 만드는 팀", tag: "perfectionist" },
    ],
  },
] as const;
