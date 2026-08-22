import type { ClassInfo, RaceInfo } from "@/lib/pastlife/pools";

function RaceFeature({ race }: { race: RaceInfo }) {
  const darker = "color-mix(in srgb, " + race.skin + " 70%, black)";
  switch (race.feature) {
    case "pointedEars":
      return (
        <g fill={race.skin} stroke="#00000022" strokeWidth="1">
          <path d="M28 50 L14 40 L26 62 Z" />
          <path d="M92 50 L106 40 L94 62 Z" />
        </g>
      );
    case "animalEars":
      return (
        <g fill={darker}>
          <path d="M30 32 L18 10 L38 30 Z" />
          <path d="M90 32 L102 10 L82 30 Z" />
        </g>
      );
    case "horns":
      return (
        <g fill="#e5e7eb" stroke="#a1a1aa" strokeWidth="1">
          <path d="M40 30 Q32 10 20 8 Q34 18 36 32 Z" />
          <path d="M80 30 Q88 10 100 8 Q86 18 84 32 Z" />
        </g>
      );
    case "tusks":
      return (
        <g fill="#fafaf9">
          <path d="M46 74 L42 86 L50 76 Z" />
          <path d="M74 74 L78 86 L70 76 Z" />
        </g>
      );
    case "beard":
      return <path d="M38 68 Q60 106 82 68 Q78 92 60 96 Q42 92 38 68 Z" fill="#9ca3af" />;
    case "scales":
      return (
        <g fill={darker} opacity="0.6">
          <circle cx="36" cy="60" r="3" />
          <circle cx="42" cy="68" r="3" />
          <circle cx="84" cy="60" r="3" />
          <circle cx="78" cy="68" r="3" />
        </g>
      );
    case "roundEars":
    default:
      return null;
  }
}

function WeaponBadge({ classInfo }: { classInfo: ClassInfo }) {
  const stroke = "#fef3c7";
  const common = { stroke, strokeWidth: 3, strokeLinecap: "round" as const, fill: "none" };
  switch (classInfo.weapon) {
    case "sword":
      return (
        <g {...common}>
          <line x1="0" y1="10" x2="0" y2="-10" />
          <line x1="-5" y1="4" x2="5" y2="4" />
        </g>
      );
    case "axe":
      return (
        <g {...common}>
          <line x1="0" y1="10" x2="0" y2="-8" />
          <path d="M0 -8 L8 -12 L8 0 Z" fill={stroke} stroke="none" />
        </g>
      );
    case "staff":
      return (
        <g {...common}>
          <line x1="0" y1="10" x2="0" y2="-8" />
          <circle cx="0" cy="-11" r="3.5" fill={stroke} stroke="none" />
        </g>
      );
    case "orb":
      return <circle cx="0" cy="0" r="6" fill={stroke} />;
    case "dagger":
      return (
        <g {...common}>
          <line x1="0" y1="7" x2="0" y2="-7" />
          <line x1="-4" y1="3" x2="4" y2="3" />
        </g>
      );
    case "bow":
      return <path d="M-6 -10 Q4 0 -6 10" {...common} />;
    case "holy":
      return (
        <g {...common}>
          <line x1="0" y1="-10" x2="0" y2="10" />
          <line x1="-6" y1="-3" x2="6" y2="-3" />
        </g>
      );
    case "lute":
      return (
        <g {...common}>
          <circle cx="0" cy="4" r="6" />
          <line x1="0" y1="-2" x2="0" y2="-11" />
        </g>
      );
  }
}

export function CharacterPortrait({
  race,
  classInfo,
  size = 140,
}: {
  race: RaceInfo;
  classInfo: ClassInfo;
  size?: number;
}) {
  return (
    <div
      className="mx-auto flex items-center justify-center rounded-full border"
      style={{
        width: size,
        height: size,
        borderColor: `${classInfo.outfit}66`,
        background: `radial-gradient(circle, ${classInfo.outfit}22, transparent 70%)`,
        boxShadow: `0 0 26px ${classInfo.outfit}55`,
      }}
    >
      <svg viewBox="0 0 120 140" width={size * 0.72} height={size * 0.72}>
        <path d="M20 140 L35 92 L85 92 L100 140 Z" fill={classInfo.outfit} />
        <circle cx="60" cy="58" r="30" fill={race.skin} />
        <path d="M30 52 Q30 24 60 24 Q90 24 90 52 Q78 40 60 40 Q42 40 30 52 Z" fill="#4b3621" />
        <RaceFeature race={race} />
        <circle cx="49" cy="60" r="2.5" fill="#292524" />
        <circle cx="71" cy="60" r="2.5" fill="#292524" />
        <g transform="translate(60 110)">
          <WeaponBadge classInfo={classInfo} />
        </g>
      </svg>
    </div>
  );
}
