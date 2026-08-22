import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "오늘의 운세",
  description: "이름 하나로 오늘 하루의 운세와 행운의 색·아이템·숫자를 확인해보세요.",
};

export default function FortuneLayout({ children }: LayoutProps<"/fortune">) {
  return (
    <div className="flex flex-1 flex-col bg-gradient-to-b from-amber-50 via-white to-orange-50">
      {children}
    </div>
  );
}
