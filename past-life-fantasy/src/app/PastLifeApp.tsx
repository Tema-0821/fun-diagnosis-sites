"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  buildArchetype,
  decodeAnswers,
  encodeAnswers,
  type CombinedArchetype,
  type QuizQuestion,
  type Tag,
} from "@/lib/pastlife/archetype";
import { PAST_QUESTIONS, PAST_TEMPLATES } from "@/lib/pastlife/pastQuiz";
import { REBIRTH_QUESTIONS, REBIRTH_TEMPLATES } from "@/lib/pastlife/rebirthQuiz";

type TabKey = "past" | "rebirth";

const TAB_CONFIG = {
  past: {
    label: "🕰️ 전생 진단",
    title: "전생 진단",
    subtitle: `질문 ${PAST_QUESTIONS.length}개로 알아보는 나의 전생`,
    questions: PAST_QUESTIONS,
    templates: PAST_TEMPLATES,
    submitLabel: "전생 확인하기 🔮",
    resultLabel: "나의 전생은...",
  },
  rebirth: {
    label: "✨ 환생 진단",
    title: "환생 진단",
    subtitle: `질문 ${REBIRTH_QUESTIONS.length}개로 알아보는 다음 생의 나`,
    questions: REBIRTH_QUESTIONS,
    templates: REBIRTH_TEMPLATES,
    submitLabel: "다음 생 확인하기 🔮",
    resultLabel: "다음 생의 나는...",
  },
} as const;

function useQuizState(questions: readonly QuizQuestion[]) {
  const [answers, setAnswers] = useState<Record<string, Tag>>({});
  const answeredCount = questions.filter((q) => Boolean(answers[q.id])).length;
  const allAnswered = answeredCount === questions.length;
  return { answers, setAnswers, answeredCount, allAnswered };
}

export function PastLifeApp() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [tab, setTab] = useState<TabKey>("past");
  const pastQuiz = useQuizState(PAST_QUESTIONS);
  const rebirthQuiz = useQuizState(REBIRTH_QUESTIONS);
  const [pastResult, setPastResult] = useState<CombinedArchetype | null>(null);
  const [rebirthResult, setRebirthResult] = useState<CombinedArchetype | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // 공유된 링크(?tab=past|rebirth&a=코드)로 들어왔을 때 URL이라는 외부 상태를 초기 렌더
    // 상태로 동기화하는 것이라 정당한 케이스.
    const tabParam = searchParams.get("tab");
    const code = searchParams.get("a");
    if (code && (tabParam === "past" || tabParam === "rebirth")) {
      const questions = tabParam === "past" ? PAST_QUESTIONS : REBIRTH_QUESTIONS;
      const decoded = decodeAnswers(questions, code);
      if (decoded) {
        const templates = tabParam === "past" ? PAST_TEMPLATES : REBIRTH_TEMPLATES;
        const result = buildArchetype(questions, decoded, templates);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTab(tabParam);
        if (tabParam === "past") {
          pastQuiz.setAnswers(decoded);
          setPastResult(result);
        } else {
          rebirthQuiz.setAnswers(decoded);
          setRebirthResult(result);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const config = TAB_CONFIG[tab];
  const quiz = tab === "past" ? pastQuiz : rebirthQuiz;
  const result = tab === "past" ? pastResult : rebirthResult;
  const setResult = tab === "past" ? setPastResult : setRebirthResult;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next = buildArchetype(config.questions, quiz.answers, config.templates);
    if (!next) return;
    setResult(next);
    setCopied(false);
    router.replace(`/?tab=${tab}&a=${encodeAnswers(config.questions, quiz.answers)}`);
  }

  function handleReset() {
    setResult(null);
    quiz.setAnswers({});
    setCopied(false);
    router.replace("/");
  }

  function handleTabChange(next: TabKey) {
    setTab(next);
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
        판타지 세계관 속 나의 전생과 다음 생의 모습을 알아보세요
      </p>

      <div className="mt-6 flex w-full gap-2 rounded-lg border border-purple-500/20 bg-white/5 p-1">
        {(Object.keys(TAB_CONFIG) as TabKey[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => handleTabChange(key)}
            className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
              tab === key
                ? "bg-yellow-500/20 text-yellow-200"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {TAB_CONFIG[key].label}
          </button>
        ))}
      </div>

      <p className="mt-4 text-center text-sm text-zinc-400">{config.subtitle}</p>

      {!result ? (
        <form onSubmit={handleSubmit} className="mt-6 flex w-full flex-col">
          <div className="mb-6 h-1 w-full rounded-full bg-white/10">
            <div
              className="h-1 rounded-full bg-gradient-to-r from-purple-400 to-yellow-400 transition-all"
              style={{ width: `${(quiz.answeredCount / config.questions.length) * 100}%` }}
            />
          </div>

          {config.questions.map((q, index) => (
            <div key={q.id} className="border-t border-purple-500/20 py-5 first:border-t-0 first:pt-0">
              <p className="text-sm text-zinc-200">
                <span className="text-gold mr-2">{index + 1}.</span>
                {q.text}
              </p>
              <div className="mt-3 flex flex-col gap-2">
                {q.options.map((option) => (
                  <label
                    key={option.label}
                    className={`cursor-pointer rounded-lg border px-3 py-2 text-sm transition-colors ${
                      quiz.answers[q.id] === option.tag
                        ? "border-yellow-400/70 bg-yellow-500/10 text-yellow-200"
                        : "border-white/10 text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`${tab}-${q.id}`}
                      className="sr-only"
                      checked={quiz.answers[q.id] === option.tag}
                      onChange={() =>
                        quiz.setAnswers((prev) => ({ ...prev, [q.id]: option.tag }))
                      }
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>
          ))}

          <button
            type="submit"
            disabled={!quiz.allAnswered}
            className="font-heading mt-8 w-full rounded-lg border border-yellow-400/60 bg-gradient-to-r from-purple-900/60 to-indigo-900/60 px-4 py-3 text-lg text-yellow-200 shadow-[0_0_20px_rgba(139,92,246,0.35)] transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:scale-100"
          >
            {config.submitLabel}
          </button>
        </form>
      ) : (
        <div className="card-tarot animate-card-reveal mt-6 w-full rounded-xl p-6 text-center">
          <p className="text-xs tracking-[0.2em] text-purple-300 uppercase">{config.title}</p>

          <p className="mt-3 text-sm text-zinc-400">{config.resultLabel}</p>
          <p className="font-heading text-gold mt-1 text-xl">{result.name}</p>
          <p className="mt-3 text-left text-sm leading-relaxed text-zinc-300">
            {result.description}
          </p>

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
        ※ 재미로 즐기는 콘텐츠이며 과학적 근거가 없습니다. 답변은 서버로 전송되지 않고
        브라우저에서만 계산됩니다.
      </p>
    </div>
  );
}
