"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { generateFortune, todayKST, type FortuneResult } from "@/lib/fortune/generate";

function scoreColor(score: number): string {
  if (score >= 70) return "text-amber-500";
  if (score >= 40) return "text-orange-500";
  return "text-zinc-500";
}

export function FortuneApp() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [name, setName] = useState("");
  const [result, setResult] = useState<FortuneResult | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // 공유된 링크(?n=이름&d=날짜)로 들어왔을 때 URL이라는 외부 상태를 초기 렌더 상태로
    // 동기화하는 것이라 정당한 케이스.
    const n = searchParams.get("n");
    const d = searchParams.get("d");
    if (n && d) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setName(n);
      setResult(generateFortune(n, d));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const today = todayKST();
    const next = generateFortune(name, today);
    if (!next) return;
    setResult(next);
    setCopied(false);
    router.replace(`/fortune?n=${encodeURIComponent(name.trim())}&d=${today}`);
  }

  function handleReset() {
    setResult(null);
    setName("");
    setCopied(false);
    router.replace("/fortune");
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
      <Link href="/" className="text-sm text-amber-500 hover:text-amber-600">
        ← AI궁합
      </Link>
      <h1 className="mt-3 text-center text-3xl font-bold tracking-tight text-amber-600">
        🔆 오늘의 운세
      </h1>
      <p className="mt-2 text-center text-sm text-zinc-500">
        이름 하나만 입력하면 오늘 하루의 운세를 확인할 수 있어요
      </p>

      {!result ? (
        <form onSubmit={handleSubmit} className="mt-8 flex w-full flex-col gap-4">
          <input
            type="text"
            required
            placeholder="이름을 입력하세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-full border-2 border-amber-200 bg-white/80 px-5 py-3 text-center text-base shadow-sm focus:border-amber-400 focus:outline-none"
          />
          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-gradient-to-r from-amber-400 to-orange-400 px-4 py-3 text-lg font-bold text-white shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            오늘의 운세 보기 🔆
          </button>
        </form>
      ) : (
        <div className="animate-pop-in mt-8 w-full rounded-3xl border border-amber-100 bg-white/90 p-6 text-center shadow-lg">
          <p className="text-sm text-zinc-500">{result.name}님의 오늘 운세</p>
          <p className={`mt-2 text-5xl font-extrabold ${scoreColor(result.score)}`}>
            {result.score}
            <span className="text-2xl">점</span>
          </p>

          <p className="mt-4 text-sm leading-relaxed text-zinc-700">{result.message}</p>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
              🎨 행운의 색 {result.luckyColor}
            </span>
            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
              🧿 행운의 아이템 {result.luckyItem}
            </span>
            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
              🔢 행운의 숫자 {result.luckyNumber}
            </span>
          </div>

          <div className="mt-6 flex gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="flex-1 rounded-full border border-amber-200 px-4 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-amber-50"
            >
              {copied ? "링크 복사됨! ✅" : "결과 공유하기 🔗"}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 rounded-full bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
            >
              다시 하기
            </button>
          </div>
        </div>
      )}

      <p className="mt-10 text-center text-xs text-zinc-400">
        ※ 재미로 즐기는 콘텐츠이며 과학적 근거가 없습니다. 운세는 매일 자정(한국 시간) 기준으로
        새로 계산되고, 입력한 이름은 서버로 전송되지 않고 브라우저에서만 계산됩니다.
      </p>
    </div>
  );
}
