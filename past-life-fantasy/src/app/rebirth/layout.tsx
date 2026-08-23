import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "나의 환생은?",
  description: "질문 8개로 알아보는 판타지 세계관 속 다음 생의 나.",
};

export default function RebirthLayout({ children }: LayoutProps<"/rebirth">) {
  return children;
}
