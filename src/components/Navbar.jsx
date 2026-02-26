import { useState, useEffect } from "react";

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dark = theme === "dark";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const bgScrolled  = dark ? "rgba(0,0,0,0.88)"  : "rgba(245,245,245,0.92)";
  const bgTop       = dark ? "rgba(0,0,0,0.22)"  : "rgba(255,255,255,0.15)";
  const borderColor = dark ? "rgba(153,27,27,0.45)" : "rgba(220,38,38,0.25)";
  const linkColor   = dark ? "#9ca3af" : "#6b7280";
  const hamColor    = "#ef4444";

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out"
      style={{
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        background: scrolled ? bgScrolled : bgTop,
        borderBottom: `1px solid ${scrolled ? borderColor : "rgba(255,255,255,0.04)"}`,
        boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.5)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group flex-shrink-0"
          onClick={() => scrollTo("hero")}
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 border-2 border-red-500 rotate-45 flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:shadow-red-500/40">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rotate-45" />
          </div>
          <span className={`font-black text-base sm:text-xl tracking-widest uppercase whitespace-nowrap transition-colors duration-300 ${dark ? "text-white" : "text-gray-900"}`}>
            THE<span className="text-red-500 ml-1 sm:ml-2">GAUNTLET</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-5 lg:gap-7">
          {["games", "countdown", "quiz", "leaderboard", "register"].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="uppercase tracking-widest text-xs font-bold transition-all duration-300 relative group"
              style={{ color: linkColor }}
              onMouseEnter={e => e.target.style.color = "#f87171"}
              onMouseLeave={e => e.target.style.color = linkColor}
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-red-500 group-hover:w-full transition-all duration-300" />
            </button>
          ))}

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="relative w-12 h-6 rounded-full border transition-all duration-300 flex-shrink-0"
            style={{
              background: dark ? "rgba(220,38,38,0.2)" : "rgba(220,38,38,0.1)",
              borderColor: dark ? "#7f1d1d" : "#fca5a5",
            }}
            title="Toggle theme"
          >
            <div
              className="absolute top-0.5 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 text-xs"
              style={{
                left: dark ? "calc(100% - 1.375rem)" : "0.125rem",
                background: dark ? "#dc2626" : "#fff",
                boxShadow: dark ? "0 0 8px rgba(220,38,38,0.6)" : "0 1px 4px rgba(0,0,0,0.2)",
              }}
            >
              {dark ? "🌙" : "☀️"}
            </div>
          </button>

          <button
            onClick={() => scrollTo("register")}
            className="bg-red-600 hover:bg-red-500 text-white text-xs font-black uppercase tracking-widest px-4 py-2 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/40 hover:-translate-y-0.5"
          >
            JOIN NOW
          </button>
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="w-8 h-8 flex items-center justify-center border rounded-full transition-all duration-300"
            style={{ borderColor: "#7f1d1d", background: dark ? "rgba(220,38,38,0.1)" : "rgba(255,255,255,0.8)" }}
          >
            <span className="text-sm">{dark ? "🌙" : "☀️"}</span>
          </button>
          <button
            className="flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-2" : ""}`} style={{ background: hamColor }} />
            <span className={`block w-5 h-0.5 transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} style={{ background: hamColor }} />
            <span className={`block w-5 h-0.5 transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} style={{ background: hamColor }} />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ease-in-out ${menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}
        style={{
          background: dark ? "rgba(0,0,0,0.97)" : "rgba(248,248,248,0.97)",
          borderTop: menuOpen ? `1px solid ${borderColor}` : "none",
        }}
      >
        <div className="px-6 py-6 flex flex-col gap-4">
          {[["games","Trials"],["countdown","Countdown"],["quiz","Mind Trial"],["leaderboard","Leaderboard"],["register","Register"]].map(([id, label], i) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-sm font-bold text-left transition-all duration-300 flex items-center gap-3 uppercase tracking-widest"
              style={{ color: dark ? "#d1d5db" : "#374151" }}
            >
              <span className="text-xs" style={{ color: "#7f1d1d" }}>0{i + 1}</span>
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}