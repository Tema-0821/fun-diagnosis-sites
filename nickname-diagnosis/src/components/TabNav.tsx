import Link from "next/link";

export function TabNav({ active }: { active: "nickname" | "mood" }) {
  return (
    <div className="mt-6 flex w-full gap-2 rounded-lg border border-cyan-500/20 bg-white/5 p-1">
      <Link
        href="/"
        className={`flex-1 rounded-md py-2 text-center text-sm font-medium transition-colors ${
          active === "nickname"
            ? "bg-fuchsia-500/20 text-fuchsia-200"
            : "text-zinc-400 hover:text-zinc-200"
        }`}
      >
        🏷️ 별명 진단
      </Link>
      <Link
        href="/mood"
        className={`flex-1 rounded-md py-2 text-center text-sm font-medium transition-colors ${
          active === "mood" ? "bg-fuchsia-500/20 text-fuchsia-200" : "text-zinc-400 hover:text-zinc-200"
        }`}
      >
        🌈 오늘의 기분
      </Link>
    </div>
  );
}
