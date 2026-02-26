import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HeroSection from "./components/Hero";
import Cards from "./components/Card";
import CountdownTimer from "./components/CountdownTimer";
import MiniQuiz from "./components/MiniQuiz";
import Leaderboard from "./components/Leaderboard";
import RegisterPage from "./pages/Registerpage";

export default function App() {
  const [theme, setTheme] = useState("dark");
  const dark = theme === "dark";

  const toggleTheme = () => setTheme(t => t === "dark" ? "light" : "dark");

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap";
    document.head.appendChild(link);
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <div
      style={{
        background: dark ? "#000000" : "#f7f3ef",
        color:      dark ? "#f3f4f6" : "#1a1a1a",
        transition: "background 0.4s ease, color 0.4s ease",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <HeroSection dark={dark} />
      <Cards dark={dark} />
      <CountdownTimer dark={dark} />
      <MiniQuiz dark={dark} />
      <Leaderboard dark={dark} />
      <RegisterPage dark={dark} />

      <Footer dark={dark} />

      {/* Light mode global overrides — warm cream palette */}
      {!dark && (
        <style>{`
          /* ── Section backgrounds ── */
          #hero        { background: #1a0000 !important; }
          #games       { background: #f7f3ef !important; }
          #countdown   { background: #f0ebe5 !important; }
          #quiz        { background: #f7f3ef !important; }
          #leaderboard { background: #f0ebe5 !important; }
          #register    { background: #f7f3ef !important; }

          /* ── Section divider lines ── */
          #games .absolute.top-0,
          #countdown .absolute.top-0,
          #quiz .absolute.top-0,
          #leaderboard .absolute.top-0,
          #register .absolute.top-0 {
            background: linear-gradient(90deg, transparent, rgba(180,20,20,0.3), transparent) !important;
          }

          /* ── All body / paragraph text ── */
          #games p, #countdown p, #quiz p, #leaderboard p, #register p { color: #4b3728 !important; }

          /* ── Section headings ── */
          #games h2, #countdown h2, #quiz h2, #leaderboard h2, #register h2 { color: #1a1a1a !important; }

          /* ── Subheadings / labels ── */
          #games h3, #quiz h3 { color: #1a1a1a !important; }

          /* ── Muted text (tracking-widest labels etc) ── */
          #games .text-gray-500,   #countdown .text-gray-500,
          #quiz .text-gray-500,    #leaderboard .text-gray-500,
          #register .text-gray-500 { color: #6b5a4e !important; }

          #games .text-gray-400,   #countdown .text-gray-400,
          #quiz .text-gray-400,    #leaderboard .text-gray-400,
          #register .text-gray-400 { color: #5a4a3e !important; }

          #games .text-gray-600,   #leaderboard .text-gray-600,
          #register .text-gray-600 { color: #7a6558 !important; }

          /* ── White text → near-black ── */
          #games .text-white, #quiz .text-white,
          #leaderboard .text-white, #register .text-white { color: #1a1a1a !important; }

          /* ── Card backgrounds ── */
          #games [style*="rgb(5,5,8)"],
          #games [style*="rgba(5,5,8"],
          #games .bg-gray-950 { background: #ffffff !important; border-color: #d9c9bb !important; }

          /* ── Quiz card ── */
          #quiz [style*="rgba(5,5,8"],
          #quiz [style*="rgb(5,5,8)"] { background: #ffffff !important; border-color: #d9c9bb !important; }

          /* ── Quiz option buttons ── */
          #quiz button[style] { background: #ffffff !important; }

          /* ── Register form ── */
          #register [style*="rgba(5,5,8"],
          #register .bg-gray-950 { background: #ffffff !important; border-color: #d9c9bb !important; }

          /* ── Inputs in light mode ── */
          #register input, #register select {
            background: #faf7f4 !important;
            border-color: #c9b9ab !important;
            color: #1a1a1a !important;
          }
          #register input::placeholder { color: #a08878 !important; }
          #register select option { background: #faf7f4 !important; color: #1a1a1a !important; }

          /* ── Leaderboard rows ── */
          #leaderboard [style*="rgba(255,255,255,0.02)"] { background: #ffffff !important; }
          #leaderboard [style*="rgba(0,0,0,0.2)"]        { background: #ede8e3 !important; }

          /* ── Countdown digit blocks ── */
          #countdown [style*="rgba(10,0,0,0.8)"],
          #countdown [style*="rgb(10,0,0)"] {
            background: #ffffff !important;
            border-color: #c9b9ab !important;
          }
          #countdown [style*="rgba(10,0,0,0.8)"] span { color: #1a1a1a !important; }

          /* ── Progress bar track ── */
          #countdown [style*="rgba(255,255,255,0.05)"] { background: #d9c9bb !important; }

          /* ── Border lines between sections ── */
          #games .border-gray-800, #leaderboard .border-gray-800,
          #register .border-gray-800, #quiz .border-gray-800 { border-color: #d9c9bb !important; }

          /* ── Table header text ── */
          #leaderboard [style*="color: rgb(75, 85, 99)"] { color: #7a6558 !important; }

          /* ── Stat strip in leaderboard ── */
          #leaderboard [style*="rgba(255,255,255,0.02)"] { background: #ffffff !important; border-color: #d9c9bb !important; }

          /* ── Footer ── */
          footer { background: #ede8e3 !important; border-color: #d9c9bb !important; }
          footer span, footer p { color: #7a6558 !important; }
          footer .text-white { color: #1a1a1a !important; }
        `}</style>
      )}
    </div>
  );
}