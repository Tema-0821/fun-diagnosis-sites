import Link from "next/link";

const TABS = [
  { href: "/", label: "🕰️ 전생 진단" },
  { href: "/rebirth", label: "✨ 환생 진단" },
  { href: "/companion", label: "🐉 반려 몬스터" },
  { href: "/job", label: "⚔️ 직업 적성" },
] as const;

export function SiteNav({ active }: { active: "/" | "/rebirth" | "/companion" | "/job" }) {
  return (
    <div className="mt-6 grid w-full grid-cols-2 gap-1 rounded-lg border border-purple-500/20 bg-white/5 p-1 sm:grid-cols-4">
      {TABS.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={`rounded-md py-2 text-center text-xs font-medium transition-colors sm:text-sm ${
            active === tab.href
              ? "bg-yellow-500/20 text-yellow-200"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
