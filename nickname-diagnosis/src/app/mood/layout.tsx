import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "오늘의 기분",
  description: "이름 하나로 오늘 하루의 기분 모드를 확인해보세요.",
};

export default function MoodLayout({ children }: LayoutProps<"/mood">) {
  return children;
}
