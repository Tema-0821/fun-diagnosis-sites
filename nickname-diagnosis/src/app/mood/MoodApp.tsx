"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { generateMood, todayKST, type MoodResult } from "@/lib/mood/generate";
import { TabNav } from "@/components/TabNav";

export function MoodApp() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [name, setName] = useState("");
  const [result, setResult] = useState<MoodResult | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // 공유된 링크(?n=이름&d=날짜)로 들어왔을 때 URL이라는 외부 상태를 초기 렌더 상태로
    // 동기화하는 것이라 정당한 케이스.
    const n = searchParams.get("n");
    const d = searchParams.get("d");
    if (n && d) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setName(n);
      setResult(generateMood(n, d));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const today = todayKST();
    const next = generateMood(name, today);
    if (!next) return;
    setResult(next);
    setCopied(false);
    router.replace(`/mood?n=${encodeURIComponent(name.trim())}&d=${today}`);
  }

  function handleReset() {
    setResult(null);
    setName("");
    setCopied(false);
    router.replace("/mood");
  }

  async function handleShare() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // 클립보드 접근이 막힌 환경이면 조용히 무시한다.
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center px-6 py-12">
      <h1 className="font-heading text-neon-cyan text-center text-3xl tracking-tight">
        🌈 오늘의 기분
      </h1>
      <p className="mt-2 text-center text-sm text-zinc-400">
        이름 하나만 입력하면 오늘 하루의 기분 모드를 알려드려요
      </p>

      <TabNav active="mood" />

      {!result ? (
        <form onSubmit={handleSubmit} className="mt-8 flex w-full flex-col gap-4">
          <input
            type="text"
            required
            placeholder="이름을 입력하세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border-2 border-cyan-500/40 bg-zinc-900 px-4 py-3 text-center text-base text-zinc-100 placeholder-zinc-500 shadow-sm focus:border-cyan-400 focus:outline-none"
          />
          <button
            type="submit"
            className="font-heading mt-2 w-full rounded-lg border-2 border-fuchsia-400 bg-fuchsia-500/20 px-4 py-3 text-lg text-fuchsia-200 shadow-[0_0_16px_rgba(217,70,239,0.4)] transition-transform hover:scale-[1.02] hover:bg-fuchsia-500/30 active:scale-[0.98]"
          >
            오늘의 기분 보기 🌈
          </button>
        </form>
      ) : (
        <div className="animate-pop-in card-neon mt-8 w-full rounded-lg p-6 text-center">
          <p className="text-6xl">{result.mood.emoji}</p>
          <p className="mt-3 text-sm text-zinc-400">{result.name}님의 오늘 기분은</p>
          <p className="font-heading text-neon-pink mt-2 text-2xl">{result.mood.name}</p>

          <p className="mt-4 text-sm leading-relaxed text-zinc-300">{result.mood.comment}</p>

          <div className="mt-6 flex gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="flex-1 rounded-lg border border-zinc-600 px-4 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800"
            >
              {copied ? "링크 복사됨! ✅" : "결과 공유하기 🔗"}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 rounded-lg border-2 border-fuchsia-400 bg-fuchsia-500/20 px-4 py-2.5 text-sm font-medium text-fuchsia-200 transition-colors hover:bg-fuchsia-500/30"
            >
              다시 하기
            </button>
          </div>
        </div>
      )}

      <p className="mt-10 text-center text-xs text-zinc-500">
        ※ 재미로 즐기는 콘텐츠이며 과학적 근거가 없습니다. 기분은 매일 자정(한국 시간) 기준으로
        새로 계산되고, 입력한 이름은 서버로 전송되지 않고 브라우저에서만 계산됩니다.
      </p>
      <Link href="/guide" className="mt-2 text-center text-xs text-cyan-300 hover:text-cyan-200">
        계산 방식 · FAQ 보기 →
      </Link>
    </div>
  );
}
