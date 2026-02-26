import { useEffect, useState } from "react";

export default function HeroSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(t);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Animated grid */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(220,38,38,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(220,38,38,0.4) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          animation: "gridMove 20s linear infinite",
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(220,38,38,0.13) 0%, transparent 70%)" }}
      />

      {/* Decorative shapes */}
      <div className="absolute top-24 left-6 sm:left-10 w-24 sm:w-32 h-24 sm:h-32 border border-red-800/25 rotate-45 pointer-events-none" style={{ animation: "spin 22s linear infinite" }} />
      <div className="absolute bottom-24 right-8 sm:right-16 w-16 sm:w-20 h-16 sm:h-20 border border-cyan-800/20 rotate-12 pointer-events-none" style={{ animation: "spin 16s linear infinite reverse" }} />
      <div className="absolute top-1/3 right-12 sm:right-20 w-3 h-3 bg-red-500 rotate-45 pointer-events-none" style={{ animation: "pulse 2s infinite" }} />
      <div className="absolute bottom-1/3 left-12 sm:left-20 w-2 h-2 bg-cyan-400 rounded-full pointer-events-none" style={{ animation: "pulse 2.5s infinite" }} />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto w-full pt-28 pb-20">

        {/* Season badge */}
        <div
          className={`inline-flex items-center gap-2 border border-red-700 bg-red-950/40 px-3 sm:px-4 py-1.5 mb-8 sm:mb-10 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
        >
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full" style={{ animation: "pulse 2s infinite" }} />
          <span className="text-red-400 text-xs font-bold uppercase tracking-widest">Season 01 — Now Recruiting</span>
        </div>

        {/* Title */}
        <h1
          className={`font-black uppercase leading-none mb-4 sm:mb-6 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
        >
          <span
            className="block text-6xl sm:text-8xl md:text-[9rem] lg:text-[10rem] text-white tracking-tight"
            style={{ textShadow: "0 0 80px rgba(220,38,38,0.5)" }}
          >
            THE
          </span>
          <span
            className="block text-4xl sm:text-6xl md:text-8xl text-red-500 tracking-[0.15em] sm:tracking-[0.2em]"
            style={{ textShadow: "0 0 40px rgba(220,38,38,0.8)" }}
          >
            GAUNTLET
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className={`text-gray-400 text-sm sm:text-base md:text-lg max-w-xl mx-auto mb-10 sm:mb-12 leading-relaxed transition-all duration-700 delay-300 px-2 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          456 players. Six trials. One survivor. Survive the trials, outsmart your rivals,
          claim the prize.{" "}
          <span className="text-red-400 font-semibold">Only the strongest advance.</span>
        </p>

        {/* CTAs */}
        <div
          className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center transition-all duration-700 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <button
            onClick={() => scrollTo("register")}
            className="bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-widest px-8 sm:px-10 py-4 text-sm transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/50 hover:-translate-y-1"
          >
            ENTER THE GAUNTLET
          </button>
          <button
            onClick={() => scrollTo("games")}
            className="border border-gray-700 hover:border-red-600 text-gray-300 hover:text-white font-black uppercase tracking-widest px-8 sm:px-10 py-4 text-sm transition-all duration-300 hover:-translate-y-1"
          >
            VIEW TRIALS
          </button>
        </div>

        {/* Stats bar */}
        <div
          className={`flex justify-center gap-6 sm:gap-10 md:gap-16 mt-14 sm:mt-16 pt-8 border-t border-gray-900 transition-all duration-700 delay-700 flex-wrap ${visible ? "opacity-100" : "opacity-0"}`}
        >
          {[["456", "Players"], ["₩45.6B", "Prize Pool"], ["6", "Trials"], ["1", "Survivor"]].map(([num, label]) => (
            <div key={label} className="text-center">
              <div className="text-2xl sm:text-3xl font-black text-red-500">{num}</div>
              <div className="text-gray-600 text-xs uppercase tracking-widest mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator — uses custom keyframe so it actually bounces */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        style={{ animation: "scrollBounce 2s ease-in-out infinite" }}
      >
        <span className="text-gray-600 text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-6 bg-gradient-to-b from-red-600 to-transparent" />
      </div>

      <style>{`
        @keyframes gridMove {
          0%   { background-position: 0 0; }
          100% { background-position: 60px 60px; }
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateX(-50%) translateY(0px); opacity: 1; }
          50%       { transform: translateX(-50%) translateY(10px); opacity: 0.5; }
        }
      `}</style>
    </section>
  );
}