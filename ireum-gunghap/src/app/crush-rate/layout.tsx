import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "짝사랑 성공 확률",
  description: "이름 두 개로 재미로 알아보는 짝사랑 성공 확률.",
};

export default function CrushRateLayout({ children }: LayoutProps<"/crush-rate">) {
  return (
    <div className="flex flex-1 flex-col bg-gradient-to-b from-fuchsia-50 via-white to-pink-50">
      {children}
    </div>
  );
}
