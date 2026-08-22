import type { Tag } from "./archetype";

export interface RaceInfo {
  name: string;
  skin: string; // 피부/모피 톤
  feature: "pointedEars" | "horns" | "tusks" | "beard" | "animalEars" | "roundEars" | "scales";
  imageKey: string; // public/portraits/{imageKey}_{gender}.webp
}

export interface ClassInfo {
  name: string;
  outfit: string; // 갑옷/로브 색
  weapon: "sword" | "staff" | "dagger" | "holy" | "axe" | "bow" | "orb" | "lute";
}

// 종족은 2차 태그(secondary)로, 직업은 1차 태그(primary)로 결정된다.
export const RACE_BY_TAG: Record<Tag, readonly RaceInfo[]> = {
  power: [
    { name: "인간", skin: "#f0c9a0", feature: "roundEars", imageKey: "human" },
    { name: "오크", skin: "#7fa86b", feature: "tusks", imageKey: "orc" },
    { name: "드워프", skin: "#e0ab7c", feature: "beard", imageKey: "dwarf" },
  ],
  wisdom: [
    { name: "엘프", skin: "#f3d9b8", feature: "pointedEars", imageKey: "elf" },
    { name: "하이엘프", skin: "#f7e6d0", feature: "pointedEars", imageKey: "highelf" },
    { name: "마족", skin: "#c98bd6", feature: "horns", imageKey: "demonkin" },
    { name: "정령족", skin: "#9fd8e0", feature: "pointedEars", imageKey: "spirit" },
  ],
  cunning: [
    { name: "고블린", skin: "#8fb56a", feature: "tusks", imageKey: "goblin" },
    { name: "하플링", skin: "#e8bd8f", feature: "roundEars", imageKey: "halfling" },
    { name: "다크엘프", skin: "#9a7bc9", feature: "pointedEars", imageKey: "darkelf" },
    { name: "수인", skin: "#c8956a", feature: "animalEars", imageKey: "beastkin" },
  ],
  charm: [
    { name: "하프엘프", skin: "#f2d3ae", feature: "pointedEars", imageKey: "halfelf" },
    { name: "요정", skin: "#f7cbe0", feature: "pointedEars", imageKey: "fairy" },
    { name: "천사족", skin: "#fdf0d5", feature: "roundEars", imageKey: "angel" },
    { name: "용족", skin: "#e3a35c", feature: "scales", imageKey: "dragon" },
  ],
};

export const CLASS_BY_TAG: Record<Tag, readonly ClassInfo[]> = {
  power: [
    { name: "기사", outfit: "#94a3b8", weapon: "sword" },
    { name: "전사", outfit: "#b45309", weapon: "axe" },
    { name: "광전사", outfit: "#991b1b", weapon: "axe" },
    { name: "검투사", outfit: "#78716c", weapon: "sword" },
  ],
  wisdom: [
    { name: "마법사", outfit: "#4338ca", weapon: "staff" },
    { name: "흑마법사", outfit: "#3730a3", weapon: "orb" },
    { name: "현자", outfit: "#0e7490", weapon: "orb" },
    { name: "예언자", outfit: "#7e22ce", weapon: "staff" },
  ],
  cunning: [
    { name: "도적", outfit: "#166534", weapon: "dagger" },
    { name: "궁수", outfit: "#15803d", weapon: "bow" },
    { name: "암살자", outfit: "#1f2937", weapon: "dagger" },
    { name: "정찰병", outfit: "#4d7c0f", weapon: "bow" },
  ],
  charm: [
    { name: "성직자", outfit: "#d4af37", weapon: "holy" },
    { name: "음유시인", outfit: "#be185d", weapon: "lute" },
    { name: "치유사", outfit: "#f59e0b", weapon: "holy" },
    { name: "상인", outfit: "#a16207", weapon: "orb" },
  ],
};

export const TAG_COLOR: Record<Tag, string> = {
  power: "#f87171",
  wisdom: "#60a5fa",
  cunning: "#4ade80",
  charm: "#fbbf24",
};
