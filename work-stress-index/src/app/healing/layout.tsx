import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "힐링 방법 추천",
  description: "질문 6개로 알아보는 나에게 맞는 힐링 방법.",
};

export default function HealingLayout({ children }: LayoutProps<"/healing">) {
  return children;
}
