"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { generateCompatibility, type CompatibilityResult } from "@/lib/compatibility/generate";
import { MBTI_TYPES, type MbtiType } from "@/lib/compatibility/types";

function isMbtiType(value: string | null): value is MbtiType {
  return value !== null && (MBTI_TYPES as readonly string[]).includes(value);
}

function scoreColor(score: number): string {
  if (score >= 70) return "text-sky-500";
  if (score >= 40) return "text-amber-500";
  return "text-violet-500";
}

export function MbtiApp() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [typeA, setTypeA] = useState<MbtiType | "">("");
  const [typeB, setTypeB] = useState<MbtiType | "">("");
  const [result, setResult] = useState<CompatibilityResult | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // 공유된 링크(?a=...&b=...)로 들어왔을 때 URL이라는 외부 상태를 초기 렌더 상태로
    // 동기화하는 것이라 정당한 케이스.
    const a = searchParams.get("a");
    const b = searchParams.get("b");
    if (isMbtiType(a) && isMbtiType(b)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTypeA(a);
      setTypeB(b);
      setResult(generateCompatibility(a, b));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!typeA || !typeB) return;
    const next = generateCompatibility(typeA, typeB);
    setResult(next);
    setCopied(false);
    router.replace(`/?a=${typeA}&b=${typeB}`);
  }

  function handleReset() {
    setResult(null);
    setTypeA("");
    setTypeB("");
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
        🧠 MBTI 궁합
      </h1>
      <p className="mt-2 text-center text-sm text-zinc-500">
        MBTI 유형 두 개만 고르면 바로 궁합을 볼 수 있어요
      </p>

      {!result ? (
        <form onSubmit={handleSubmit} className="mt-8 flex w-full flex-col gap-4">
          <select
            required
            value={typeA}
            onChange={(e) => setTypeA(e.target.value as MbtiType)}
            className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-center text-base shadow-sm focus:border-sky-300 focus:outline-none"
          >
            <option value="">첫 번째 MBTI</option>
            {MBTI_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <div className="flex justify-center text-xl">🧩</div>
          <select
            required
            value={typeB}
            onChange={(e) => setTypeB(e.target.value as MbtiType)}
            className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-center text-base shadow-sm focus:border-sky-300 focus:outline-none"
          >
            <option value="">두 번째 MBTI</option>
            {MBTI_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="mt-2 w-full rounded-2xl bg-gradient-to-r from-sky-400 to-amber-400 px-4 py-3 text-base font-semibold text-white shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            궁합 보기 ✨
          </button>
        </form>
      ) : (
        <div className="animate-pop-in mt-8 w-full rounded-3xl border border-zinc-100 bg-white p-6 text-center shadow-lg">
          <p className="text-sm text-zinc-500">
            {result.typeA} × {result.typeB}
          </p>
          <p className={`mt-2 text-5xl font-extrabold ${scoreColor(result.score)}`}>
            {result.score}
            <span className="text-2xl">점</span>
          </p>
          <p className="mt-1 text-lg font-bold text-zinc-800">{result.gradeTitle}</p>

          <div className="mt-6 flex flex-col gap-3 text-left text-sm leading-relaxed text-zinc-700">
            <p>{result.opening}</p>
            <p>💪 {result.strength}</p>
            <p>⚠️ {result.caution}</p>
            <p>💡 {result.advice}</p>
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
        ※ 재미로 즐기는 콘텐츠이며 과학적 근거가 없습니다. 입력한 정보는 서버로 전송되지 않고
        브라우저에서만 계산됩니다.
      </p>
    </div>
  );
}
