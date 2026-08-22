import { ELEMENTS } from "@/lib/pastlife/elements";
import type { Element } from "@/lib/pastlife/quiz";

function ElementGlyph({ element, color }: { element: Element; color: string }) {
  switch (element) {
    case "fire":
      return (
        <path
          d="M50 12 C36 34 27 48 27 64 C27 80 37 90 50 90 C63 90 73 80 73 64 C73 48 64 34 50 12 Z M50 40 C55 50 60 58 60 66 C60 74 55 79 50 79 C45 79 40 74 40 66 C40 58 45 50 50 40 Z"
          fill={color}
          fillRule="evenodd"
        />
      );
    case "water":
      return (
        <g fill="none" stroke={color} strokeWidth="5" strokeLinecap="round">
          <path d="M20 42 Q35 30 50 42 T80 42" />
          <path d="M20 58 Q35 46 50 58 T80 58" />
          <path d="M20 74 Q35 62 50 74 T80 74" />
        </g>
      );
    case "wind":
      return (
        <g fill="none" stroke={color} strokeWidth="5" strokeLinecap="round">
          <path d="M18 38 Q50 18 82 38" />
          <path d="M14 56 Q50 32 86 56" />
          <path d="M20 74 Q50 54 78 74" />
        </g>
      );
    case "earth":
      return (
        <path
          d="M15 78 L36 38 L50 58 L60 42 L85 78 Z"
          fill={color}
          stroke={color}
          strokeWidth="4"
          strokeLinejoin="round"
        />
      );
  }
}

export function ElementIcon({ element, size = 96 }: { element: Element; size?: number }) {
  const info = ELEMENTS[element];
  return (
    <div
      className="mx-auto flex items-center justify-center rounded-full border"
      style={{
        width: size,
        height: size,
        borderColor: `${info.color}66`,
        background: `radial-gradient(circle, ${info.color}22, transparent 70%)`,
        boxShadow: `0 0 24px ${info.color}55`,
      }}
    >
      <svg viewBox="0 0 100 100" width={size * 0.62} height={size * 0.62}>
        <ElementGlyph element={element} color={info.color} />
      </svg>
    </div>
  );
}
