"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CompatibilityVenn } from "@/components/CompatibilityVenn";
import { generateCompatibility, type CompatibilityResult } from "@/lib/mbtiCompat/generate";
import { MBTI_STYLE } from "@/lib/mbtiCompat/colors";
import { MBTI_TYPES, type MbtiType } from "@/lib/mbtiCompat/types";

function isMbtiType(value: string | null): value is MbtiType {
  return value !== null && (MBTI_TYPES as readonly string[]).includes(value);
}

function scoreColor(score: number): string {
  if (score >= 70) return "text-sky-500";
  if (score >= 40) return "text-amber-500";
  return "text-violet-500";
}

function TypePicker({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: MbtiType | "";
  onSelect: (type: MbtiType) => void;
}) {
  return (
    <div>
      <p className="font-heading-mbti text-sm text-zinc-500">{label}</p>
      <div className="mt-2 grid grid-cols-4 gap-2">
        {MBTI_TYPES.map((type) => {
          const style = MBTI_STYLE[type];
          const isSelected = selected === type;
          return (
            <button
              key={type}
              type="button"
              onClick={() => onSelect(type)}
              className={`font-heading-mbti rounded-xl px-2 py-3 text-sm transition-all ${
                isSelected ? `${style.bgSelected} ring-4 ${style.ring} scale-105` : style.bg
              }`}
            >
              {type}
            </button>
          );
        })}
      </div>
    </div>
  );
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
    router.replace(`/mbti?a=${typeA}&b=${typeB}`);
  }

  function handleReset() {
    setResult(null);
    setTypeA("");
    setTypeB("");
    setCopied(false);
    router.replace("/mbti");
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
      <Link href="/" className="text-sm text-violet-500 hover:text-violet-600">
        ← AI궁합
      </Link>
      <h1 className="font-heading-mbti mt-3 text-center text-3xl tracking-tight text-zinc-900">
        🧠 MBTI 궁합
      </h1>
      <p className="mt-2 text-center text-sm text-zinc-500">
        MBTI 유형 두 개만 고르면 바로 궁합을 볼 수 있어요
      </p>

      {!result ? (
        <form onSubmit={handleSubmit} className="mt-8 flex w-full flex-col gap-6">
          <TypePicker label="첫 번째 MBTI" selected={typeA} onSelect={setTypeA} />
          <div className="flex justify-center text-2xl">🧩</div>
          <TypePicker label="두 번째 MBTI" selected={typeB} onSelect={setTypeB} />
          <button
            type="submit"
            disabled={!typeA || !typeB}
            className="font-heading-mbti mt-2 w-full rounded-xl bg-zinc-900 px-4 py-3 text-lg text-white shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:scale-100"
          >
            궁합 보기 ✨
          </button>
        </form>
      ) : (
        <div className="animate-pop-in mt-8 w-full overflow-hidden rounded-2xl border-2 border-zinc-900 bg-white shadow-[6px_6px_0_0_#18181b]">
          <div className="flex">
            <div className={`flex-1 py-4 text-center ${MBTI_STYLE[result.typeA].bgSelected}`}>
              <p className="font-heading-mbti text-2xl">{result.typeA}</p>
              <p className="text-xs opacity-80">{MBTI_STYLE[result.typeA].label}</p>
            </div>
            <div className={`flex-1 py-4 text-center ${MBTI_STYLE[result.typeB].bgSelected}`}>
              <p className="font-heading-mbti text-2xl">{result.typeB}</p>
              <p className="text-xs opacity-80">{MBTI_STYLE[result.typeB].label}</p>
            </div>
          </div>

          <div className="p-6 text-center">
            <CompatibilityVenn
              score={result.score}
              colorA={MBTI_STYLE[result.typeA].hex}
              colorB={MBTI_STYLE[result.typeB].hex}
            />
            <p className={`text-5xl font-extrabold ${scoreColor(result.score)}`}>
              {result.score}
              <span className="text-2xl">점</span>
            </p>
            <p className="font-heading-mbti mt-1 text-lg text-zinc-800">{result.gradeTitle}</p>

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
                className="flex-1 rounded-xl border-2 border-zinc-900 px-4 py-2.5 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100"
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
        </div>
      )}

      <p className="mt-10 text-center text-xs text-zinc-400">
        ※ 재미로 즐기는 콘텐츠이며 과학적 근거가 없습니다. 입력한 정보는 서버로 전송되지 않고
        브라우저에서만 계산됩니다.
      </p>
      <Link href="/mbti/guide" className="mt-2 text-center text-xs text-violet-500 hover:text-violet-600">
        계산 방식 · 유형표 · FAQ 보기 →
      </Link>
    </div>
  );
}
