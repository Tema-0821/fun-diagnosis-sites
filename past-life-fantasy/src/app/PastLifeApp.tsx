"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { generatePastLife, type PastLifeResult } from "@/lib/pastlife/generate";

export function PastLifeApp() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [name, setName] = useState("");
  const [result, setResult] = useState<PastLifeResult | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // 공유된 링크(?n=...)로 들어왔을 때 URL이라는 외부 상태를 초기 렌더 상태로 동기화하는
    // 것이라 정당한 케이스.
    const n = searchParams.get("n");
    if (n) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setName(n);
      setResult(generatePastLife(n));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next = generatePastLife(name);
    if (!next) return;
    setResult(next);
    setCopied(false);
    router.replace(`/?n=${encodeURIComponent(name.trim())}`);
  }

  function handleReset() {
    setResult(null);
    setName("");
    setCopied(false);
    router.replace("/");
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
      <h1 className="font-heading text-gold text-center text-3xl tracking-wide">
        🔮 전생 환생 진단
      </h1>
      <p className="mt-2 text-center text-sm text-zinc-400">
        이름 하나만 입력하면 판타지 세계관 속 나의 전생을 알려드려요
      </p>

      {!result ? (
        <form onSubmit={handleSubmit} className="mt-8 flex w-full flex-col gap-4">
          <input
            type="text"
            required
            placeholder="이름을 입력하세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-purple-400/40 bg-white/5 px-4 py-3 text-center text-base text-zinc-100 placeholder-zinc-500 focus:border-yellow-400/60 focus:outline-none"
          />
          <button
            type="submit"
            className="font-heading mt-2 w-full rounded-lg border border-yellow-400/60 bg-gradient-to-r from-purple-900/60 to-indigo-900/60 px-4 py-3 text-lg text-yellow-200 shadow-[0_0_20px_rgba(139,92,246,0.35)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            전생 확인하기 🔮
          </button>
        </form>
      ) : (
        <div className="card-tarot animate-card-reveal mt-8 w-full rounded-xl p-6 text-center">
          <p className="text-xs tracking-[0.2em] text-purple-300 uppercase">Legend Score</p>
          <p className="text-gold mt-1 text-5xl font-bold">
            {result.legendScore}
            <span className="text-2xl">%</span>
          </p>
          <p className="font-heading mt-2 text-base text-purple-200">{result.gradeTitle}</p>

          <div className="my-4 border-t border-purple-500/20" />

          <p className="text-sm text-zinc-400">{result.name}님은 전생에...</p>
          <p className="font-heading text-gold mt-1 text-lg">{result.role}</p>

          <div className="mt-4 flex flex-col gap-3 text-left text-sm leading-relaxed text-zinc-300">
            <p>{result.description}</p>
            <p>✨ {result.rebirth}</p>
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {result.abilities.map((ability) => (
              <span
                key={ability}
                className="rounded-full border border-purple-400/40 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-200"
              >
                {ability}
              </span>
            ))}
          </div>

          <div className="mt-6 flex gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="flex-1 rounded-lg border border-purple-400/40 px-4 py-2.5 text-sm font-medium text-purple-200 transition-colors hover:bg-purple-500/10"
            >
              {copied ? "링크 복사됨! ✅" : "결과 공유하기 🔗"}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 rounded-lg border border-yellow-400/60 bg-yellow-500/10 px-4 py-2.5 text-sm font-medium text-yellow-200 transition-colors hover:bg-yellow-500/20"
            >
              다시 하기
            </button>
          </div>
        </div>
      )}

      <p className="mt-10 text-center text-xs text-zinc-500">
        ※ 재미로 즐기는 콘텐츠이며 과학적 근거가 없습니다. 입력한 이름은 서버로 전송되지 않고
        브라우저에서만 계산됩니다.
      </p>
    </div>
  );
}
