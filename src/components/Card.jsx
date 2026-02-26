import { useState, useRef, useEffect } from "react";

const GAMES = [
  {
    id: "01",
    name: "REFLEX RUSH",
    category: "Response Time",
    description:
      "A random signal appears after an unpredictable delay. Click as fast as possible — three rounds, average reaction time calculated. The fastest reflexes earn the highest scores.",
    players: "456",
    eliminated: "280",
    difficulty: "HIGH",
    icon: "⚡",
    accent: "red",
    tag: "Speed",
  },
  {
    id: "02",
    name: "TARGET CLICK",
    category: "Accuracy & Control",
    description:
      "Small moving targets appear randomly for 15 seconds. Click as many as possible. Missed clicks reduce points — consecutive hits grant bonus multipliers.",
    players: "176",
    eliminated: "110",
    difficulty: "EXTREME",
    icon: "🎯",
    accent: "cyan",
    tag: "Precision",
  },
  {
    id: "03",
    name: "AVOID THE TRAP",
    category: "Focus & Steadiness",
    description:
      "Keep your cursor inside a moving safe zone while dodging random danger areas. Survive 10 seconds without touching any hazard — one slip and you're eliminated.",
    players: "66",
    eliminated: "38",
    difficulty: "EXTREME",
    icon: "🔺",
    accent: "yellow",
    tag: "Control",
  },
  {
    id: "04",
    name: "LOGIC BURST",
    category: "Logical Thinking",
    description:
      "Five rapid reasoning questions inside a 20-second timer. Number patterns, quick math, odd-one-out problems. Score is determined by accuracy combined with speed.",
    players: "28",
    eliminated: "14",
    difficulty: "HIGH",
    icon: "🧠",
    accent: "purple",
    tag: "Logic",
  },
  {
    id: "05",
    name: "DECEPTION DETECTOR",
    category: "Judgment & Analysis",
    description:
      "Five statements appear — some true, some false. Identify the lies within 10 seconds. Points awarded for correct calls; wrong selections are penalised.",
    players: "14",
    eliminated: "8",
    difficulty: "MEDIUM",
    icon: "👁",
    accent: "amber",
    tag: "Analysis",
  },
  {
    id: "06",
    name: "COLLAPSE ARENA",
    category: "Strategy & Survival",
    description:
      "A 5×5 grid of tiles collapses randomly every second. Use limited protection clicks to secure tiles before they vanish. Scored on survival time, secured tiles, and decision efficiency.",
    players: "6",
    eliminated: "5",
    difficulty: "ULTIMATE",
    icon: "♟",
    accent: "red",
    tag: "Strategy",
  },
];

const accentMap = {
  red:    { border: "#991b1b", hoverBorder: "#dc2626", text: "#f87171", bg: "rgba(220,38,38,0.12)", bar: "#ef4444", glow: "rgba(220,38,38,0.28)", badgeBg: "rgba(153,27,27,0.35)", badgeText: "#fca5a5", badgeBorder: "#7f1d1d" },
  cyan:   { border: "#155e75", hoverBorder: "#0891b2", text: "#22d3ee", bg: "rgba(6,182,212,0.08)", bar: "#06b6d4", glow: "rgba(6,182,212,0.22)", badgeBg: "rgba(21,94,117,0.35)", badgeText: "#67e8f9", badgeBorder: "#164e63" },
  yellow: { border: "#854d0e", hoverBorder: "#ca8a04", text: "#facc15", bg: "rgba(234,179,8,0.08)", bar: "#eab308", glow: "rgba(234,179,8,0.2)",  badgeBg: "rgba(133,77,14,0.35)",  badgeText: "#fde047", badgeBorder: "#713f12" },
  amber:  { border: "#92400e", hoverBorder: "#d97706", text: "#fb923c", bg: "rgba(245,158,11,0.08)", bar: "#f59e0b", glow: "rgba(245,158,11,0.2)", badgeBg: "rgba(146,64,14,0.35)",  badgeText: "#fdba74", badgeBorder: "#78350f" },
  purple: { border: "#581c87", hoverBorder: "#9333ea", text: "#c084fc", bg: "rgba(168,85,247,0.08)", bar: "#a855f7", glow: "rgba(168,85,247,0.22)", badgeBg: "rgba(88,28,135,0.35)", badgeText: "#e879f9", badgeBorder: "#4a044e" },
};

const difficultyColor = {
  EXTREME: { color: "#f87171", border: "#991b1b" },
  HIGH:    { color: "#facc15", border: "#854d0e" },
  MEDIUM:  { color: "#4ade80", border: "#166534" },
  ULTIMATE:{ color: "#ffffff", border: "#6b7280" },
};

function GameCard({ game, index }) {
  const a = accentMap[game.accent] || accentMap.red;
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);
  const [inView, setInView] = useState(false);

  const eliminationPct = Math.round((parseInt(game.eliminated) / parseInt(game.players)) * 100);
  const survivalPct = 100 - eliminationPct;
  const diff = difficultyColor[game.difficulty];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.12 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative cursor-pointer"
      style={{
        border: `1px solid ${hovered ? a.hoverBorder : a.border}`,
        background: hovered ? `rgba(10,10,10,0.98)` : "rgb(5,5,8)",
        padding: "1.5rem",
        opacity: inView ? 1 : 0,
        transform: hovered
          ? "translateY(-5px)"
          : inView ? "translateY(0)" : "translateY(28px)",
        boxShadow: hovered ? `0 16px 48px ${a.glow}` : "none",
        transition: `transform 250ms ease, box-shadow 250ms ease, border-color 250ms ease, opacity 600ms ease ${index * 80}ms`,
      }}
    >
      {/* Game number watermark */}
      <div
        className="absolute top-3 right-4 font-black select-none pointer-events-none"
        style={{
          fontFamily: "'Bebas Neue', Impact, sans-serif",
          fontSize: "4rem",
          lineHeight: 1,
          color: a.text,
          opacity: 0.18,
        }}
      >
        {game.id}
      </div>

      {/* Icon + title */}
      <div className="flex items-start gap-4 mb-4">
        <div
          className="w-11 h-11 flex-shrink-0 flex items-center justify-center text-xl"
          style={{
            background: a.bg,
            border: `1px solid ${hovered ? a.hoverBorder : a.border}`,
            transform: hovered ? "scale(1.08)" : "scale(1)",
            transition: "transform 250ms ease, border-color 250ms ease",
          }}
        >
          {game.icon}
        </div>
        <div>
          <span className="text-xs font-bold uppercase tracking-widest block mb-1" style={{ color: a.text }}>
            {game.category}
          </span>
          <h3
            className="text-white font-black uppercase leading-tight"
            style={{
              fontFamily: "'Bebas Neue', Impact, sans-serif",
              fontSize: "1.3rem",
              letterSpacing: "0.12em",
            }}
          >
            {game.name}
          </h3>
        </div>
      </div>

      {/* Description */}
      <p
        className="text-xs leading-relaxed mb-5"
        style={{
          color: hovered ? "#9ca3af" : "#6b7280",
          transition: "color 250ms ease",
          minHeight: "4.5rem",
        }}
      >
        {game.description}
      </p>

      {/* Stats */}
      <div className="flex items-center gap-3 mb-4 text-xs flex-wrap">
        <div>
          <span className="block uppercase tracking-wider text-[10px] mb-0.5" style={{ color: "#4b5563" }}>Players</span>
          <span className="text-white font-bold">{game.players}</span>
        </div>
        <div className="w-px h-7 bg-gray-800" />
        <div>
          <span className="block uppercase tracking-wider text-[10px] mb-0.5" style={{ color: "#4b5563" }}>Eliminated</span>
          <span className="font-bold" style={{ color: "#ef4444" }}>{game.eliminated}</span>
        </div>
        <div className="w-px h-7 bg-gray-800" />
        <div
          className="text-[10px] px-2 py-0.5 font-black uppercase tracking-wider border"
          style={{ color: diff.color, borderColor: diff.border }}
        >
          {game.difficulty}
        </div>
        <div
          className="ml-auto text-[10px] px-2 py-0.5 font-bold uppercase tracking-wider border"
          style={{ background: a.badgeBg, color: a.badgeText, borderColor: a.badgeBorder }}
        >
          {game.tag}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ width: "100%", height: "3px", background: "rgba(255,255,255,0.05)", borderRadius: 0 }}>
        <div
          style={{
            height: "100%",
            background: a.bar,
            width: hovered ? `${eliminationPct}%` : "0%",
            transition: "width 450ms ease",
          }}
        />
      </div>
      <div className="flex justify-between mt-1.5" style={{ fontSize: "10px", color: "#374151" }}>
        <span className="uppercase tracking-wider">Elimination rate</span>
        <span style={{ color: hovered ? a.text : "#374151", transition: "color 150ms ease" }}>
          {eliminationPct}%
        </span>
      </div>
    </div>
  );
}

export default function Cards() {
  return (
    <section id="games" className="bg-black py-24 px-4 sm:px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, rgba(220,38,38,0.8) 0px, rgba(220,38,38,0.8) 1px, transparent 1px, transparent 50px)`,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-8 sm:w-12 h-px bg-red-700" />
            <span className="text-red-500 text-xs font-black uppercase tracking-[0.3em] sm:tracking-[0.4em]">Season 01 Trials</span>
            <div className="w-8 sm:w-12 h-px bg-red-700" />
          </div>
          <h2
            className="text-5xl sm:text-6xl md:text-7xl font-black uppercase text-white mb-4"
            style={{
              fontFamily: "'Bebas Neue', Impact, sans-serif",
              textShadow: "0 0 60px rgba(220,38,38,0.3)",
              letterSpacing: "0.06em",
            }}
          >
            THE TRIALS
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed px-4">
            Six games engineered to test your mind, reflexes, and will. Each round brings fewer survivors and higher stakes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {GAMES.map((game, i) => (
            <GameCard key={game.id} game={game} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}