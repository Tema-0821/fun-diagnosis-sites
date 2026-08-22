"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { generateCompatibility, type CompatibilityResult } from "@/lib/nameCompat/generate";

function scoreColor(score: number): string {
  if (score >= 70) return "text-rose-500";
  if (score >= 40) return "text-amber-500";
  return "text-violet-500";
}

function scoreRingColor(score: number): string {
  if (score >= 70) return "#f43f5e";
  if (score >= 40) return "#f59e0b";
  return "#a78bfa";
}

export function CompatibilityApp() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [nameA, setNameA] = useState("");
  const [nameB, setNameB] = useState("");
  const [result, setResult] = useState<CompatibilityResult | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // 공유된 링크(?a=...&b=...)로 들어왔을 때 URL이라는 외부 상태를 초기 렌더 상태로
    // 동기화하는 것이라 정당한 케이스.
    const a = searchParams.get("a");
    const b = searchParams.get("b");
    if (a && b) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setNameA(a);
      setNameB(b);
      setResult(generateCompatibility(a, b));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next = generateCompatibility(nameA, nameB);
    if (!next) return;
    setResult(next);
    setCopied(false);
    router.replace(
      `/name?a=${encodeURIComponent(nameA.trim())}&b=${encodeURIComponent(nameB.trim())}`,
    );
  }

  function handleReset() {
    setResult(null);
    setNameA("");
    setNameB("");
    setCopied(false);
    router.replace("/name");
  }

  async function handleShare() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // 클립보드 접근이 막힌 환경(권한 없음 등)이면 조용히 무시한다.
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center px-6 py-12">
      <Link href="/" className="text-sm text-rose-400 hover:text-rose-500">
        ← AI궁합
      </Link>
      <h1 className="font-heading-name mt-3 text-center text-4xl font-bold tracking-tight text-rose-500">
        💕 이름궁합
      </h1>
      <p className="mt-2 text-center text-sm text-zinc-500">
        이름 두 개만 입력하면 바로 궁합을 볼 수 있어요
      </p>

      {!result ? (
        <form onSubmit={handleSubmit} className="mt-8 flex w-full flex-col gap-4">
          <input
            type="text"
            required
            placeholder="첫 번째 이름"
            value={nameA}
            onChange={(e) => setNameA(e.target.value)}
            className="w-full rounded-full border-2 border-rose-200 bg-white/80 px-5 py-3 text-center text-base shadow-sm focus:border-rose-400 focus:outline-none"
          />
          <div className="flex justify-center text-2xl">💗</div>
          <input
            type="text"
            required
            placeholder="두 번째 이름"
            value={nameB}
            onChange={(e) => setNameB(e.target.value)}
            className="w-full rounded-full border-2 border-rose-200 bg-white/80 px-5 py-3 text-center text-base shadow-sm focus:border-rose-400 focus:outline-none"
          />
          <button
            type="submit"
            className="font-heading-name mt-2 w-full rounded-full bg-gradient-to-r from-rose-400 to-violet-400 px-4 py-3 text-lg font-bold text-white shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            궁합 보기 ✨
          </button>
        </form>
      ) : (
        <div className="animate-pop-in mt-8 w-full rounded-3xl border border-rose-100 bg-white/90 shadow-lg">
          <div className="px-6 pt-6 pb-4 text-center">
            <p className="font-heading-name text-lg text-zinc-600">
              {result.nameA} <span className="text-rose-400">×</span> {result.nameB}
            </p>

            <div
              className="relative mx-auto mt-4 flex h-36 w-36 items-center justify-center rounded-full"
              style={{
                background: `conic-gradient(${scoreRingColor(result.score)} ${result.score * 3.6}deg, #fce7f3 0deg)`,
              }}
            >
              <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white">
                <p className={`text-4xl font-extrabold ${scoreColor(result.score)}`}>
                  {result.score}
                </p>
                <p className="text-xs text-zinc-400">궁합 점수</p>
              </div>
            </div>

            <p className="font-heading-name mt-3 text-xl font-bold text-zinc-800">
              {result.gradeTitle}
            </p>
          </div>

          <div className="ticket-notch relative border-t-2 border-dashed border-rose-200" />

          <div className="flex flex-col gap-3 px-6 py-6 text-left text-sm leading-relaxed text-zinc-700">
            <p>{result.opening}</p>
            <p>💪 {result.strength}</p>
            <p>⚠️ {result.caution}</p>
            <p>💡 {result.advice}</p>
          </div>

          <div className="flex gap-2 px-6 pb-6">
            <button
              type="button"
              onClick={handleShare}
              className="flex-1 rounded-full border border-rose-200 px-4 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-rose-50"
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
        ※ 재미로 즐기는 콘텐츠이며 과학적 근거가 없습니다. 입력한 이름은 서버로 전송되지 않고
        브라우저에서만 계산됩니다.
      </p>
      <Link href="/name/guide" className="mt-2 text-center text-xs text-rose-400 hover:text-rose-500">
        계산 방식 · 등급표 · FAQ 보기 →
      </Link>
    </div>
  );
}
