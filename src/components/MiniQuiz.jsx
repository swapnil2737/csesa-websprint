import { useState, useRef, useEffect } from "react";

const QUESTIONS = [
  {
    id: 1,
    question: "In Reflex Rush, what determines the final score?",
    options: [
      "The fastest single reaction time",
      "The average reaction time across three rounds",
      "Number of correct button presses",
      "Time taken to complete the game",
    ],
    correct: 1,
    explanation: "Reflex Rush averages your reaction time over three rounds — consistency is key.",
  },
  {
    id: 2,
    question: "In Collapse Arena, what three factors determine your score?",
    options: [
      "Speed, accuracy, and combo streaks",
      "Survival time, secured tiles, and decision efficiency",
      "Number of clicks, tile color, and rounds survived",
      "Reaction time, grid size, and bonus multipliers",
    ],
    correct: 1,
    explanation: "Collapse Arena rewards you for surviving longer, protecting more tiles, and making smart decisions quickly.",
  },
  {
    id: 3,
    question: "How many false statements must you identify in Deception Detector?",
    options: ["Three out of five", "All five", "Some of the five — number varies", "Exactly two"],
    correct: 2,
    explanation: "The number of false statements is not fixed — you must judge each statement individually within 10 seconds.",
  },
];

const GRADE = (score, total) => {
  const pct = (score / total) * 100;
  if (pct === 100) return { label: "PERFECT", color: "#facc15", sub: "You're ready for the Gauntlet." };
  if (pct >= 66)  return { label: "QUALIFIED", color: "#4ade80", sub: "Solid instincts. Proceed with caution." };
  return { label: "ELIMINATED", color: "#f87171", sub: "Study the trials. Try again." };
};

export default function MiniQuiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const q = QUESTIONS[current];
  const score = answers.filter(Boolean).length;
  const grade = GRADE(score, QUESTIONS.length);

  const handleSelect = (idx) => {
    if (confirmed) return;
    setSelected(idx);
  };

  const handleConfirm = () => {
    if (selected === null) return;
    setConfirmed(true);
    const correct = selected === q.correct;
    setTimeout(() => {
      setAnswers(prev => [...prev, correct]);
      if (current + 1 < QUESTIONS.length) {
        setCurrent(c => c + 1);
        setSelected(null);
        setConfirmed(false);
      } else {
        setFinished(true);
      }
    }, 1200);
  };

  const reset = () => {
    setCurrent(0); setSelected(null); setConfirmed(false);
    setAnswers([]); setFinished(false);
  };

  const optionStyle = (idx) => {
    if (!confirmed) {
      return {
        background: selected === idx ? "rgba(220,38,38,0.15)" : "rgba(255,255,255,0.02)",
        borderColor: selected === idx ? "#dc2626" : "#1f2937",
        color: selected === idx ? "#f3f4f6" : "#9ca3af",
        transform: selected === idx ? "translateX(6px)" : "translateX(0)",
        cursor: "pointer",
      };
    }
    if (idx === q.correct) return { background: "rgba(74,222,128,0.12)", borderColor: "#166534", color: "#4ade80", transform: "translateX(0)" };
    if (idx === selected && selected !== q.correct) return { background: "rgba(248,113,113,0.12)", borderColor: "#7f1d1d", color: "#f87171", transform: "translateX(0)" };
    return { background: "rgba(255,255,255,0.01)", borderColor: "#111827", color: "#4b5563", transform: "translateX(0)" };
  };

  return (
    <section
      id="quiz"
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-6 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #030303 0%, #060606 100%)" }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #dc2626, transparent)" }} />

      <div className="max-w-2xl mx-auto relative z-10">

        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-8 sm:w-12" style={{ background: "linear-gradient(90deg, transparent, #dc2626)" }} />
            <span className="text-red-500 text-xs font-black uppercase tracking-[0.4em]">Intelligence Test</span>
            <div className="h-px w-8 sm:w-12" style={{ background: "linear-gradient(90deg, #dc2626, transparent)" }} />
          </div>
          <h2
            className="text-5xl sm:text-6xl md:text-7xl font-black uppercase text-white mb-3"
            style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", letterSpacing: "0.06em", textShadow: "0 0 60px rgba(220,38,38,0.3)" }}
          >
            MIND TRIAL
          </h2>
          <p className="text-gray-400 text-sm">Prove you know the rules before entering the arena.</p>
        </div>

        {/* Quiz card */}
        {!finished ? (
          <div
            className={`border border-gray-800 p-6 sm:p-8 transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ background: "rgba(5,5,8,0.95)" }}
          >
            {/* Progress */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-2">
                {QUESTIONS.map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-1"
                    style={{
                      background: i < answers.length
                        ? answers[i] ? "#4ade80" : "#f87171"
                        : i === current ? "#dc2626" : "#1f2937",
                      transition: "background 0.4s ease",
                    }}
                  />
                ))}
              </div>
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#6b7280" }}>
                {current + 1} / {QUESTIONS.length}
              </span>
            </div>

            {/* Question */}
            <h3 className="text-white font-bold text-base sm:text-lg leading-snug mb-6">
              <span style={{ color: "#dc2626", fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: "1.3rem", letterSpacing: "0.08em" }}>
                Q{current + 1}.{" "}
              </span>
              {q.question}
            </h3>

            {/* Options */}
            <div className="flex flex-col gap-3 mb-6">
              {q.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className="w-full text-left px-4 py-3 border text-sm font-medium leading-snug"
                  style={{
                    ...optionStyle(idx),
                    transition: "all 0.2s ease",
                  }}
                >
                  <span
                    className="font-black mr-3 text-xs"
                    style={{
                      fontFamily: "'Bebas Neue', Impact, sans-serif",
                      letterSpacing: "0.1em",
                      color: selected === idx && !confirmed ? "#dc2626" : "inherit",
                    }}
                  >
                    {["A", "B", "C", "D"][idx]}.
                  </span>
                  {opt}
                </button>
              ))}
            </div>

            {/* Explanation (shown after confirm) */}
            {confirmed && (
              <div
                className="px-4 py-3 border mb-6 text-xs leading-relaxed"
                style={{
                  background: "rgba(220,38,38,0.06)",
                  borderColor: "#7f1d1d",
                  color: "#d1d5db",
                }}
              >
                <span className="font-black uppercase tracking-widest text-red-500 mr-2">Note:</span>
                {q.explanation}
              </div>
            )}

            {/* Confirm button */}
            <button
              onClick={handleConfirm}
              disabled={selected === null || confirmed}
              className="w-full py-3 font-black uppercase tracking-widest text-sm transition-all duration-200"
              style={{
                background: selected !== null && !confirmed ? "#dc2626" : "#1f2937",
                color: selected !== null && !confirmed ? "#fff" : "#4b5563",
                cursor: selected !== null && !confirmed ? "pointer" : "not-allowed",
              }}
            >
              {confirmed ? "PROCESSING…" : "CONFIRM ANSWER"}
            </button>
          </div>
        ) : (
          /* Results screen */
          <div
            className={`border p-8 sm:p-10 text-center transition-all duration-700 delay-200 ${inView ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            style={{ borderColor: grade.color + "55", background: `${grade.color}08` }}
          >
            <div
              className="text-6xl sm:text-7xl font-black mb-2"
              style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", color: grade.color, textShadow: `0 0 40px ${grade.color}80`, letterSpacing: "0.1em" }}
            >
              {grade.label}
            </div>
            <p className="text-gray-400 text-sm mb-6">{grade.sub}</p>

            <div className="flex justify-center gap-6 mb-8">
              <div>
                <div className="text-4xl font-black" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", color: grade.color }}>
                  {score}/{QUESTIONS.length}
                </div>
                <div className="text-xs uppercase tracking-widest mt-1" style={{ color: "#6b7280" }}>Correct</div>
              </div>
              <div className="w-px bg-gray-800" />
              <div>
                <div className="text-4xl font-black" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", color: "#f3f4f6" }}>
                  {Math.round((score / QUESTIONS.length) * 100)}%
                </div>
                <div className="text-xs uppercase tracking-widest mt-1" style={{ color: "#6b7280" }}>Accuracy</div>
              </div>
            </div>

            {/* Per-question result */}
            <div className="flex justify-center gap-3 mb-8">
              {answers.map((correct, i) => (
                <div
                  key={i}
                  className="w-10 h-10 flex items-center justify-center border font-black text-sm"
                  style={{
                    fontFamily: "'Bebas Neue', Impact, sans-serif",
                    background: correct ? "rgba(74,222,128,0.1)" : "rgba(248,113,113,0.1)",
                    borderColor: correct ? "#166534" : "#7f1d1d",
                    color: correct ? "#4ade80" : "#f87171",
                  }}
                >
                  {correct ? "✓" : "✗"}
                </div>
              ))}
            </div>

            <button
              onClick={reset}
              className="border px-8 py-3 text-xs font-black uppercase tracking-widest transition-all duration-300 hover:-translate-y-0.5"
              style={{ borderColor: "#374151", color: "#9ca3af" }}
              onMouseEnter={e => { e.target.style.borderColor = "#dc2626"; e.target.style.color = "#f87171"; }}
              onMouseLeave={e => { e.target.style.borderColor = "#374151"; e.target.style.color = "#9ca3af"; }}
            >
              Retry Trial
            </button>
          </div>
        )}
      </div>
    </section>
  );
}