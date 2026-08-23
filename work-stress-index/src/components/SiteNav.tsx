import Link from "next/link";

const TABS = [
  { href: "/", label: "😮‍💨 스트레스 지수" },
  { href: "/burnout", label: "🕯️ 나의 번아웃 상태는?" },
  { href: "/healing", label: "🌿 힐링 방법 추천" },
] as const;

export function SiteNav({ active }: { active: "/" | "/burnout" | "/healing" }) {
  return (
    <div className="mt-6 flex w-full gap-1 border border-[#e7ddc9] bg-white/60 p-1">
      {TABS.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={`flex-1 py-2 text-center text-xs font-medium transition-colors sm:text-sm ${
            active === tab.href
              ? "bg-orange-400/15 text-orange-600"
              : "text-zinc-500 hover:text-zinc-800"
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
