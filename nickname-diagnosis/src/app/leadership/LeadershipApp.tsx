"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TabNav } from "@/components/TabNav";
import {
  decodeAnswers,
  encodeAnswers,
  generateLeadership,
  type LeadershipResult,
} from "@/lib/leadership/generate";
import { QUESTIONS, type LeadershipTag } from "@/lib/leadership/quiz";

export function LeadershipApp() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [answers, setAnswers] = useState<Record<string, LeadershipTag>>({});
  const [result, setResult] = useState<LeadershipResult | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // 공유된 링크(?a=코드)로 들어왔을 때 URL이라는 외부 상태를 초기 렌더 상태로 동기화하는
    // 것이라 정당한 케이스.
    const code = searchParams.get("a");
    if (code) {
      const decoded = decodeAnswers(code);
      if (decoded) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setAnswers(decoded);
        setResult(generateLeadership(decoded));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const answeredCount = QUESTIONS.filter((q) => Boolean(answers[q.id])).length;
  const allAnswered = answeredCount === QUESTIONS.length;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next = generateLeadership(answers);
    if (!next) return;
    setResult(next);
    setCopied(false);
    router.replace(`/leadership?a=${encodeAnswers(answers)}`);
  }

  function handleReset() {
    setResult(null);
    setAnswers({});
    setCopied(false);
    router.replace("/leadership");
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
        🧭 나의 리더십 스타일
      </h1>
      <p className="mt-2 text-center text-sm text-zinc-400">
        질문 {QUESTIONS.length}개로 알아보는 나만의 리더십 스타일
      </p>

      <TabNav active="leadership" />

      {!result ? (
        <form onSubmit={handleSubmit} className="mt-8 flex w-full flex-col">
          <div className="mb-6 h-1 w-full rounded-full bg-zinc-800">
            <div
              className="h-1 rounded-full bg-cyan-400 transition-all"
              style={{ width: `${(answeredCount / QUESTIONS.length) * 100}%` }}
            />
          </div>

          {QUESTIONS.map((q, index) => (
            <div key={q.id} className="border-t border-zinc-800 py-5 first:border-t-0 first:pt-0">
              <p className="text-sm text-zinc-200">
                <span className="mr-2 text-cyan-400">{index + 1}.</span>
                {q.text}
              </p>
              <div className="mt-3 flex flex-col gap-2">
                {q.options.map((option) => (
                  <label
                    key={option.label}
                    className={`cursor-pointer rounded-lg border px-3 py-2 text-sm transition-colors ${
                      answers[q.id] === option.tag
                        ? "border-cyan-400/70 bg-cyan-500/10 text-cyan-200"
                        : "border-zinc-700 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name={q.id}
                      className="sr-only"
                      checked={answers[q.id] === option.tag}
                      onChange={() => setAnswers((prev) => ({ ...prev, [q.id]: option.tag }))}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>
          ))}

          <button
            type="submit"
            disabled={!allAnswered}
            className="font-heading mt-8 w-full rounded-lg border-2 border-fuchsia-400 bg-fuchsia-500/20 px-4 py-3 text-lg text-fuchsia-200 shadow-[0_0_16px_rgba(217,70,239,0.4)] transition-transform hover:scale-[1.02] hover:bg-fuchsia-500/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:scale-100"
          >
            결과 보기 🧭
          </button>
        </form>
      ) : (
        <div className="animate-pop-in card-neon mt-8 w-full rounded-lg p-6 text-center">
          <p className="text-6xl">{result.info.emoji}</p>
          <p className="font-heading text-neon-pink mt-2 text-2xl">{result.info.name}</p>

          <div className="mt-4 flex flex-col gap-3 text-left text-sm leading-relaxed text-zinc-300">
            <p>{result.info.description}</p>
            <p>💡 {result.info.tip}</p>
          </div>

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
        ※ 재미로 즐기는 콘텐츠이며 과학적 근거가 없습니다. 답변은 서버로 전송되지 않고
        브라우저에서만 계산됩니다.
      </p>
      <Link href="/guide" className="mt-2 text-center text-xs text-cyan-300 hover:text-cyan-200">
        계산 방식 · FAQ 보기 →
      </Link>
    </div>
  );
}
