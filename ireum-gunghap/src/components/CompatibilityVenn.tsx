// 점수가 높을수록 두 원이 더 많이 겹치는 벤 다이어그램 형태의 결과 이미지.
export function CompatibilityVenn({
  score,
  colorA,
  colorB,
}: {
  score: number;
  colorA: string;
  colorB: string;
}) {
  const offset = 46 - (score / 100) * 34;
  const cx1 = 80 - offset;
  const cx2 = 80 + offset;

  return (
    <svg viewBox="0 0 160 110" className="mx-auto w-40">
      <circle cx={cx1} cy="55" r="42" fill={colorA} fillOpacity="0.55" />
      <circle cx={cx2} cy="55" r="42" fill={colorB} fillOpacity="0.55" />
      <text
        x="80"
        y="61"
        textAnchor="middle"
        fontSize="20"
        style={{ filter: score >= 50 ? "none" : "grayscale(1) opacity(0.6)" }}
      >
        {score >= 70 ? "💖" : score >= 40 ? "✨" : "🌱"}
      </text>
    </svg>
  );
}
