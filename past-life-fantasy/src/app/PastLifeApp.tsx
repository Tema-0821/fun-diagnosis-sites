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
      <h1 className="text-center text-2xl font-bold tracking-tight text-zinc-900">
        🔮 전생 환생 진단
      </h1>
      <p className="mt-2 text-center text-sm text-zinc-500">
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
            className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-center text-base shadow-sm focus:border-indigo-300 focus:outline-none"
          />
          <button
            type="submit"
            className="mt-2 w-full rounded-2xl bg-gradient-to-r from-indigo-400 to-purple-400 px-4 py-3 text-base font-semibold text-white shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            전생 확인하기 🔮
          </button>
        </form>
      ) : (
        <div className="animate-pop-in mt-8 w-full rounded-3xl border border-zinc-100 bg-white p-6 text-center shadow-lg">
          <p className="text-sm text-zinc-500">전설 지수</p>
          <p className="mt-1 text-5xl font-extrabold text-indigo-600">
            {result.legendScore}
            <span className="text-2xl">%</span>
          </p>
          <p className="mt-2 text-base font-bold text-purple-700">{result.gradeTitle}</p>

          <p className="mt-4 text-sm font-semibold text-zinc-800">
            {result.name}님은 전생에...
          </p>
          <p className="mt-1 text-lg font-extrabold text-indigo-600">{result.role}</p>

          <div className="mt-4 flex flex-col gap-3 text-left text-sm leading-relaxed text-zinc-700">
            <p>{result.description}</p>
            <p>✨ {result.rebirth}</p>
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {result.abilities.map((ability) => (
              <span
                key={ability}
                className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700"
              >
                {ability}
              </span>
            ))}
          </div>

          <div className="mt-6 flex gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="flex-1 rounded-xl border border-zinc-200 px-4 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
            >
              {copied ? "링크 복사됨! ✅" : "결과 공유하기 🔗"}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
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
