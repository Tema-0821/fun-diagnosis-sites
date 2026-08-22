"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { generateCrushRate, type CrushRateResult } from "@/lib/crushRate/generate";

function scoreColor(score: number): string {
  if (score >= 60) return "text-fuchsia-500";
  if (score >= 40) return "text-amber-500";
  return "text-zinc-500";
}

export function CrushRateApp() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [me, setMe] = useState("");
  const [crush, setCrush] = useState("");
  const [result, setResult] = useState<CrushRateResult | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // 공유된 링크(?me=...&crush=...)로 들어왔을 때 URL이라는 외부 상태를 초기 렌더 상태로
    // 동기화하는 것이라 정당한 케이스.
    const meParam = searchParams.get("me");
    const crushParam = searchParams.get("crush");
    if (meParam && crushParam) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMe(meParam);
      setCrush(crushParam);
      setResult(generateCrushRate(meParam, crushParam));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next = generateCrushRate(me, crush);
    if (!next) return;
    setResult(next);
    setCopied(false);
    router.replace(
      `/crush-rate?me=${encodeURIComponent(me.trim())}&crush=${encodeURIComponent(crush.trim())}`,
    );
  }

  function handleReset() {
    setResult(null);
    setMe("");
    setCrush("");
    setCopied(false);
    router.replace("/crush-rate");
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
      <Link href="/" className="text-sm text-fuchsia-400 hover:text-fuchsia-500">
        ← AI궁합
      </Link>
      <h1 className="mt-3 text-center text-3xl font-bold tracking-tight text-fuchsia-500">
        🍀 짝사랑 성공 확률
      </h1>
      <p className="mt-2 text-center text-sm text-zinc-500">
        내 이름과 짝사랑 상대의 이름을 입력해보세요
      </p>

      {!result ? (
        <form onSubmit={handleSubmit} className="mt-8 flex w-full flex-col gap-4">
          <input
            type="text"
            required
            placeholder="내 이름"
            value={me}
            onChange={(e) => setMe(e.target.value)}
            className="w-full rounded-full border-2 border-fuchsia-200 bg-white/80 px-5 py-3 text-center text-base shadow-sm focus:border-fuchsia-400 focus:outline-none"
          />
          <div className="flex justify-center text-2xl">💭</div>
          <input
            type="text"
            required
            placeholder="짝사랑 상대 이름"
            value={crush}
            onChange={(e) => setCrush(e.target.value)}
            className="w-full rounded-full border-2 border-fuchsia-200 bg-white/80 px-5 py-3 text-center text-base shadow-sm focus:border-fuchsia-400 focus:outline-none"
          />
          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-gradient-to-r from-fuchsia-400 to-pink-400 px-4 py-3 text-lg font-bold text-white shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            성공 확률 보기 🍀
          </button>
        </form>
      ) : (
        <div className="animate-pop-in mt-8 w-full rounded-3xl border border-fuchsia-100 bg-white/90 p-6 text-center shadow-lg">
          <p className="text-sm text-zinc-500">
            {result.me} → {result.crush}
          </p>
          <p className={`mt-2 text-5xl font-extrabold ${scoreColor(result.score)}`}>
            {result.score}
            <span className="text-2xl">%</span>
          </p>
          <p className="mt-1 text-lg font-bold text-zinc-800">{result.title}</p>

          <p className="mt-4 text-left text-sm leading-relaxed text-zinc-700">{result.comment}</p>

          <div className="mt-6 flex gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="flex-1 rounded-full border border-fuchsia-200 px-4 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-fuchsia-50"
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
    </div>
  );
}
