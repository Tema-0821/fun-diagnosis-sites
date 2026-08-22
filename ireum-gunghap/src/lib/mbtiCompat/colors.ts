import type { MbtiType } from "./types";

export interface MbtiTypeStyle {
  bg: string;
  bgSelected: string;
  ring: string;
  text: string;
  label: string;
  hex: string;
}

// 16Personalities의 4개 그룹 색상 코딩을 참고: 분석가(보라)/외교관(초록)/관리자(파랑)/탐험가(노랑).
const NT: MbtiTypeStyle = {
  bg: "bg-violet-100 text-violet-700",
  bgSelected: "bg-violet-500 text-white",
  ring: "ring-violet-400",
  text: "text-violet-600",
  label: "분석가",
  hex: "#8b5cf6",
};
const NF: MbtiTypeStyle = {
  bg: "bg-emerald-100 text-emerald-700",
  bgSelected: "bg-emerald-500 text-white",
  ring: "ring-emerald-400",
  text: "text-emerald-600",
  label: "외교관",
  hex: "#10b981",
};
const SJ: MbtiTypeStyle = {
  bg: "bg-blue-100 text-blue-700",
  bgSelected: "bg-blue-500 text-white",
  ring: "ring-blue-400",
  text: "text-blue-600",
  label: "관리자",
  hex: "#3b82f6",
};
const SP: MbtiTypeStyle = {
  bg: "bg-amber-100 text-amber-700",
  bgSelected: "bg-amber-500 text-white",
  ring: "ring-amber-400",
  text: "text-amber-600",
  label: "탐험가",
  hex: "#f59e0b",
};

export const MBTI_STYLE: Record<MbtiType, MbtiTypeStyle> = {
  INTJ: NT,
  INTP: NT,
  ENTJ: NT,
  ENTP: NT,
  INFJ: NF,
  INFP: NF,
  ENFJ: NF,
  ENFP: NF,
  ISTJ: SJ,
  ISFJ: SJ,
  ESTJ: SJ,
  ESFJ: SJ,
  ISTP: SP,
  ISFP: SP,
  ESTP: SP,
  ESFP: SP,
};
