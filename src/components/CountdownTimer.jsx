import { useState, useEffect, useRef } from "react";

// Set your target end time here — 2 hours from now by default
const DURATION_SECONDS = 2 * 60 * 60; // 2 hours

export default function CountdownTimer() {
  const [total, setTotal] = useState(DURATION_SECONDS);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [inView, setInView] = useState(false);
  const intervalRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-start on mount
  useEffect(() => {
    setStarted(true);
  }, []);

  useEffect(() => {
    if (!started) return;
    if (total <= 0) { setFinished(true); return; }
    intervalRef.current = setInterval(() => {
      setTotal(prev => {
        if (prev <= 1) { clearInterval(intervalRef.current); setFinished(true); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [started]);

  const hours   = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;

  const pad = (n) => String(n).padStart(2, "0");

  const urgency = total < 300; // last 5 minutes
  const critical = total < 60; // last 1 minute

  return (
    <section
      id="countdown"
      ref={sectionRef}
      className="relative py-20 px-4 sm:px-6 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #080808 0%, #0d0000 50%, #080808 100%)" }}
    >
      {/* Top line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #dc2626, transparent)" }} />

      {/* Background glow — intensifies when urgent */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000"
        style={{
          background: critical
            ? "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(220,38,38,0.18) 0%, transparent 70%)"
            : urgency
            ? "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(220,38,38,0.10) 0%, transparent 70%)"
            : "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(220,38,38,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">

        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-8 sm:w-12" style={{ background: "linear-gradient(90deg, transparent, #dc2626)" }} />
            <span className="text-red-500 text-xs font-black uppercase tracking-[0.4em]">Season 01</span>
            <div className="h-px w-8 sm:w-12" style={{ background: "linear-gradient(90deg, #dc2626, transparent)" }} />
          </div>
          <h2
            className="text-5xl sm:text-6xl md:text-7xl font-black uppercase text-white"
            style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", letterSpacing: "0.06em", textShadow: "0 0 60px rgba(220,38,38,0.35)" }}
          >
            {finished ? "TIME'S UP" : "TRIALS BEGIN IN"}
          </h2>
        </div>

        {/* Timer display */}
        {!finished ? (
          <div className={`flex items-center justify-center gap-2 sm:gap-4 md:gap-6 transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {[
              { label: "Hours",   val: hours },
              { label: "Minutes", val: minutes },
              { label: "Seconds", val: seconds },
            ].map(({ label, val }, i) => (
              <div key={label} className="flex items-center gap-2 sm:gap-4 md:gap-6">
                {/* Digit block */}
                <div className="flex flex-col items-center">
                  <div
                    className="relative flex items-center justify-center overflow-hidden"
                    style={{
                      width: "clamp(4.5rem, 16vw, 7rem)",
                      height: "clamp(4.5rem, 16vw, 7rem)",
                      border: `2px solid ${critical ? "#dc2626" : urgency ? "#991b1b" : "#2d0000"}`,
                      background: critical
                        ? "rgba(220,38,38,0.12)"
                        : "rgba(10,0,0,0.8)",
                      boxShadow: critical
                        ? "0 0 30px rgba(220,38,38,0.5), inset 0 0 20px rgba(220,38,38,0.1)"
                        : urgency
                        ? "0 0 20px rgba(220,38,38,0.25)"
                        : "none",
                      transition: "all 0.5s ease",
                      animation: critical && val % 2 === 0 ? "criticalPulse 1s ease infinite" : "none",
                    }}
                  >
                    <span
                      className="tabular-nums font-black"
                      style={{
                        fontFamily: "'Bebas Neue', Impact, sans-serif",
                        fontSize: "clamp(2rem, 9vw, 3.5rem)",
                        color: critical ? "#fca5a5" : urgency ? "#f87171" : "#f3f4f6",
                        letterSpacing: "0.05em",
                        textShadow: critical ? "0 0 20px rgba(220,38,38,0.8)" : "none",
                        transition: "color 0.5s ease",
                      }}
                    >
                      {pad(val)}
                    </span>
                  </div>
                  <span
                    className="text-xs uppercase tracking-widest mt-2 font-bold"
                    style={{ color: critical ? "#f87171" : urgency ? "#ef4444" : "#6b7280" }}
                  >
                    {label}
                  </span>
                </div>

                {/* Separator colon — hidden after last block */}
                {i < 2 && (
                  <div
                    className="flex flex-col gap-2 mb-5"
                    style={{ animation: "colonBlink 1s step-end infinite" }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: urgency ? "#ef4444" : "#4b5563" }} />
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: urgency ? "#ef4444" : "#4b5563" }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          /* Finished state */
          <div className="text-center">
            <div
              className="text-8xl sm:text-9xl font-black text-red-500 mb-4"
              style={{
                fontFamily: "'Bebas Neue', Impact, sans-serif",
                letterSpacing: "0.1em",
                textShadow: "0 0 80px rgba(220,38,38,0.8)",
                animation: "criticalPulse 0.8s ease infinite",
              }}
            >
              00:00:00
            </div>
            <p className="text-red-400 text-sm font-bold uppercase tracking-widest">The Gauntlet has begun</p>
          </div>
        )}

        {/* Progress bar */}
        {!finished && (
          <div
            className={`mt-10 max-w-xl mx-auto transition-all duration-700 delay-300 ${inView ? "opacity-100" : "opacity-0"}`}
          >
            <div className="w-full h-1 bg-gray-900 overflow-hidden">
              <div
                style={{
                  height: "100%",
                  width: `${((DURATION_SECONDS - total) / DURATION_SECONDS) * 100}%`,
                  background: critical
                    ? "linear-gradient(90deg, #dc2626, #f87171)"
                    : urgency
                    ? "#dc2626"
                    : "linear-gradient(90deg, #7f1d1d, #dc2626)",
                  transition: "width 1s linear, background 1s ease",
                }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs uppercase tracking-widest" style={{ color: "#4b5563" }}>Start</span>
              <span className="text-xs uppercase tracking-widest" style={{ color: urgency ? "#f87171" : "#4b5563" }}>
                {urgency ? (critical ? "⚠ CRITICAL" : "⚠ FINAL MINUTES") : `${Math.round(((DURATION_SECONDS - total) / DURATION_SECONDS) * 100)}% elapsed`}
              </span>
              <span className="text-xs uppercase tracking-widest" style={{ color: "#4b5563" }}>End</span>
            </div>
          </div>
        )}

        {/* Reset button (dev/demo convenience) */}
        <div className="text-center mt-8">
          <button
            onClick={() => { setTotal(DURATION_SECONDS); setFinished(false); setStarted(true); }}
            className="text-xs uppercase tracking-widest font-bold px-4 py-2 border transition-all duration-300 hover:border-red-600 hover:text-red-400"
            style={{ color: "#4b5563", borderColor: "#1f2937" }}
          >
            Reset Timer
          </button>
        </div>
      </div>

      <style>{`
        @keyframes colonBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.2; }
        }
        @keyframes criticalPulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.6; }
        }
      `}</style>
    </section>
  );
}