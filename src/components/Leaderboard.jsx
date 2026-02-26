import { useState, useEffect, useRef } from "react";

const INITIAL_PLAYERS = [
  { number: "067", name: "Sae-byeok K.", score: 9850, status: "ALIVE", wins: 5, badge: "👑", trend: "up" },
  { number: "218", name: "Sang-woo C.",  score: 9200, status: "ALIVE", wins: 5, badge: "🔥", trend: "up" },
  { number: "456", name: "Gi-hun S.",    score: 8750, status: "ALIVE", wins: 5, badge: "⚡", trend: "up" },
  { number: "101", name: "Jang-ho P.",   score: 7600, status: "ALIVE", wins: 4, badge: "",   trend: "stable" },
  { number: "199", name: "Ali A.",        score: 6900, status: "ALIVE", wins: 4, badge: "",   trend: "down" },
  { number: "212", name: "Mi-nyeo O.",   score: 5400, status: "ELIMINATED", wins: 3, badge: "", trend: "stable" },
  { number: "001", name: "Il-nam O.",    score: 4800, status: "ELIMINATED", wins: 3, badge: "", trend: "stable" },
  { number: "240", name: "Ji-young B.",  score: 3200, status: "ELIMINATED", wins: 2, badge: "", trend: "stable" },
];

function assignRanks(list) {
  return [...list]
    .sort((a, b) => b.score - a.score)
    .map((p, i) => ({ ...p, rank: i + 1 }));
}

const RANK_STYLES = {
  1: { color: "#facc15", bg: "rgba(250,204,21,0.1)",  border: "rgba(250,204,21,0.35)", label: "CHAMPION" },
  2: { color: "#e2e8f0", bg: "rgba(226,232,240,0.07)", border: "rgba(226,232,240,0.2)", label: "2ND" },
  3: { color: "#fb923c", bg: "rgba(251,146,60,0.1)",  border: "rgba(251,146,60,0.3)",  label: "3RD" },
};

function TrendIcon({ trend }) {
  if (trend === "up")     return <span style={{ color: "#4ade80", fontSize: 11 }}>▲</span>;
  if (trend === "down")   return <span style={{ color: "#f87171", fontSize: 11 }}>▼</span>;
  return <span style={{ color: "#4b5563", fontSize: 11 }}>—</span>;
}

function ScoreBar({ score, max, color }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth((score / max) * 100), 200);
    return () => clearTimeout(t);
  }, [score, max]);
  return (
    <div style={{ height: 3, background: "rgba(255,255,255,0.05)", width: "100%", borderRadius: 0 }}>
      <div style={{ height: "100%", width: `${width}%`, background: color, transition: "width 0.8s ease", borderRadius: 0 }} />
    </div>
  );
}

export default function Leaderboard() {
  const [players, setPlayers] = useState(assignRanks(INITIAL_PLAYERS));
  const [filter, setFilter] = useState("ALL");
  const [tick, setTick] = useState(0);
  const [inView, setInView] = useState(false);
  const [updatedNums, setUpdatedNums] = useState(new Set());
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlayers((prev) => {
        const updated = prev.map((p) => {
          if (p.status !== "ALIVE") return p;
          const delta = Math.floor(Math.random() * 350 - 60);
          return { ...p, score: Math.max(0, p.score + delta), trend: delta > 0 ? "up" : delta < 0 ? "down" : "stable" };
        });
        const ranked = assignRanks(updated);
        setUpdatedNums(new Set(updated.filter((p, i) => p.score !== prev[i]?.score).map(p => p.number)));
        setTimeout(() => setUpdatedNums(new Set()), 800);
        return ranked;
      });
      setTick(t => t + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const filtered = players.filter(p => filter === "ALL" || p.status === filter);
  const maxScore = Math.max(...players.map(p => p.score));
  const aliveCount = players.filter(p => p.status === "ALIVE").length;

  return (
    <section
      id="leaderboard"
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-6 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #030303 0%, #080808 50%, #030303 100%)" }}
    >
      {/* Top/bottom separator lines */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #dc2626, transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #7f1d1d, transparent)" }} />

      {/* Subtle radial glow behind section */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(220,38,38,0.05) 0%, transparent 70%)" }} />

      {/* Animated scan line */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          height: "1px",
          background: "linear-gradient(90deg, transparent 0%, rgba(220,38,38,0.6) 50%, transparent 100%)",
          animation: "scanline 6s linear infinite",
          top: 0,
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">

        {/* ── Header ── */}
        <div className={`text-center mb-12 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-8 sm:w-12" style={{ background: "linear-gradient(90deg, transparent, #dc2626)" }} />
            <span className="text-red-500 text-xs font-black uppercase tracking-[0.4em]">Live Rankings</span>
            <div className="h-px w-8 sm:w-12" style={{ background: "linear-gradient(90deg, #dc2626, transparent)" }} />
          </div>
          <h2
            className="text-5xl sm:text-6xl md:text-7xl font-black uppercase text-white mb-3"
            style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", textShadow: "0 0 60px rgba(220,38,38,0.35)", letterSpacing: "0.06em" }}
          >
            LEADERBOARD
          </h2>
          <p className="text-gray-400 text-sm">Rankings refresh automatically after each trial</p>
        </div>

        {/* ── Stats strip ── */}
        <div
          className={`grid grid-cols-3 gap-3 mb-8 transition-all duration-700 delay-150 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          {[
            { label: "Active Players", value: aliveCount, color: "#4ade80" },
            { label: "Eliminated",     value: players.length - aliveCount, color: "#f87171" },
            { label: "Rounds Done",    value: "5 / 6",    color: "#facc15" },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              className="text-center py-4 px-2 border border-gray-800"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <div className="font-black text-2xl sm:text-3xl mb-0.5" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", color }}>{value}</div>
              <div className="text-xs uppercase tracking-widest" style={{ color: "#9ca3af" }}>{label}</div>
            </div>
          ))}
        </div>

        {/* ── Controls ── */}
        <div
          className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full" style={{ animation: "pulse 2s infinite" }} />
            <span className="text-red-400 text-xs font-bold uppercase tracking-widest">Live · Updates every 4s</span>
          </div>
          <div className="flex gap-2">
            {["ALL", "ALIVE", "ELIMINATED"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="text-xs font-bold uppercase tracking-widest px-3 sm:px-4 py-1.5 border transition-all duration-200"
                style={{
                  background: filter === f ? "#dc2626" : "transparent",
                  borderColor: filter === f ? "#dc2626" : "#374151",
                  color: filter === f ? "#fff" : "#9ca3af",
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* ── Table header ── */}
        <div
          className={`grid grid-cols-12 gap-2 px-4 py-2 mb-3 border-b transition-all duration-700 delay-300 ${inView ? "opacity-100" : "opacity-0"}`}
          style={{ borderColor: "#1f2937" }}
        >
          {["Rank", "#", "Player", "", "Wins", "Score", "Status"].map((h, i) => (
            <div
              key={i}
              className={`text-xs font-black uppercase tracking-widest
                ${i === 0 ? "col-span-1" : ""}
                ${i === 1 ? "col-span-1 hidden sm:block" : ""}
                ${i === 2 ? "col-span-4 sm:col-span-3" : ""}
                ${i === 3 ? "col-span-0 hidden sm:block sm:col-span-1" : ""}
                ${i === 4 ? "col-span-2 hidden sm:block text-center" : ""}
                ${i === 5 ? "col-span-4 sm:col-span-2 text-right" : ""}
                ${i === 6 ? "col-span-3 sm:col-span-2 text-right" : ""}
              `}
              style={{ color: "#4b5563" }}
            >
              {h}
            </div>
          ))}
        </div>

        {/* ── Rows ── */}
        <div className="flex flex-col gap-2">
          {filtered.map((player, i) => {
            const rs = RANK_STYLES[player.rank];
            const isTop3 = player.rank <= 3 && player.status === "ALIVE";
            const isUpdated = updatedNums.has(player.number);
            const isAlive = player.status === "ALIVE";

            return (
              <div
                key={player.number}
                className="grid grid-cols-12 gap-2 items-center px-4 py-3 border group relative overflow-hidden"
                style={{
                  background: isTop3
                    ? rs.bg
                    : isAlive ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.2)",
                  borderColor: isUpdated
                    ? "rgba(220,38,38,0.6)"
                    : isTop3 ? rs.border : isAlive ? "#1f2937" : "#111827",
                  opacity: isAlive ? 1 : 0.45,
                  transform: inView ? "translateX(0)" : "translateX(-20px)",
                  transition: `transform 0.5s ease ${i * 55}ms, opacity 0.5s ease ${i * 55}ms, border-color 0.3s ease, background 0.3s ease`,
                  boxShadow: isUpdated ? "0 0 20px rgba(220,38,38,0.2)" : isTop3 ? `0 0 30px ${rs.bg}` : "none",
                }}
              >
                {/* Rank glow strip for top 3 */}
                {isTop3 && (
                  <div className="absolute left-0 top-0 bottom-0 w-0.5" style={{ background: rs.color }} />
                )}

                {/* Flash overlay on score update */}
                {isUpdated && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "rgba(220,38,38,0.06)", animation: "flashFade 0.8s ease forwards" }}
                  />
                )}

                {/* Rank */}
                <div className="col-span-1 flex items-center gap-1">
                  <span
                    className="font-black text-xl leading-none"
                    style={{
                      fontFamily: "'Bebas Neue', Impact, sans-serif",
                      color: isTop3 ? rs.color : "#4b5563",
                      textShadow: isTop3 ? `0 0 12px ${rs.color}60` : "none",
                    }}
                  >
                    {player.rank}
                  </span>
                </div>

                {/* Player # */}
                <div className="col-span-1 hidden sm:block">
                  <span className="text-xs font-mono" style={{ color: "#6b7280" }}>{player.number}</span>
                </div>

                {/* Name */}
                <div className="col-span-4 sm:col-span-3 flex items-center gap-2 min-w-0">
                  <div
                    className="w-7 h-7 flex-shrink-0 flex items-center justify-center text-xs font-black border"
                    style={{
                      background: isTop3 ? rs.bg : "rgba(255,255,255,0.04)",
                      borderColor: isTop3 ? rs.border : "#1f2937",
                      color: isTop3 ? rs.color : "#9ca3af",
                    }}
                  >
                    {player.number.slice(-1)}
                  </div>
                  <div className="min-w-0">
                    <span className="text-white text-sm font-bold block truncate">{player.name}</span>
                    {player.badge && <span className="text-sm leading-none">{player.badge}</span>}
                  </div>
                </div>

                {/* Trend */}
                <div className="hidden sm:flex col-span-1 justify-center">
                  <TrendIcon trend={player.trend} />
                </div>

                {/* Wins */}
                <div className="col-span-2 hidden sm:flex justify-center gap-0.5 items-center">
                  {Array.from({ length: 6 }).map((_, j) => (
                    <div
                      key={j}
                      className="w-2 h-2 rotate-45"
                      style={{ background: j < player.wins ? (isTop3 ? rs.color : "#dc2626") : "#1f2937" }}
                    />
                  ))}
                </div>

                {/* Score */}
                <div className="col-span-4 sm:col-span-2 text-right">
                  <span
                    className="font-black text-sm sm:text-base tabular-nums block"
                    style={{
                      color: isUpdated ? "#fca5a5" : isAlive ? "#f3f4f6" : "#6b7280",
                      transition: "color 0.3s ease",
                      fontFamily: "'Bebas Neue', Impact, sans-serif",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {player.score.toLocaleString()}
                  </span>
                  {isAlive && (
                    <ScoreBar
                      score={player.score}
                      max={maxScore}
                      color={isTop3 ? rs.color : "#dc2626"}
                    />
                  )}
                </div>

                {/* Status */}
                <div className="col-span-3 sm:col-span-2 text-right">
                  <span
                    className="text-xs font-black uppercase tracking-wider px-2 py-1 border whitespace-nowrap"
                    style={
                      isAlive
                        ? { background: "rgba(74,222,128,0.1)", color: "#4ade80", borderColor: "#166534" }
                        : { background: "rgba(248,113,113,0.08)", color: "#ef4444", borderColor: "#7f1d1d" }
                    }
                  >
                    {isAlive ? "ALIVE" : "OUT"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Footer note ── */}
        <p
          className={`text-center text-xs uppercase tracking-widest mt-8 transition-all duration-700 delay-500 ${inView ? "opacity-100" : "opacity-0"}`}
          style={{ color: "#6b7280" }}
        >
          Scores refresh every 4 seconds · Last updated:{" "}
          <span style={{ color: "#9ca3af" }}>Round {tick % 6 + 1}</span>
        </p>
      </div>

      <style>{`
        @keyframes scanline {
          0%   { top: 0%; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes flashFade {
          0%   { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}