import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out"
      style={{
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        background: scrolled
          ? "rgba(0,0,0,0.85)"
          : "rgba(0,0,0,0.2)",
        borderBottom: scrolled
          ? "1px solid rgba(153,27,27,0.45)"
          : "1px solid rgba(255,255,255,0.04)",
        boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.6)" : "none",
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
          <span className="text-white font-black text-base sm:text-xl tracking-widest uppercase whitespace-nowrap">
            THE<span className="text-red-500 ml-1 sm:ml-2">GAUNTLET</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {["games", "leaderboard", "register"].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="text-gray-400 hover:text-red-400 uppercase tracking-widest text-xs font-bold transition-all duration-300 relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-red-500 group-hover:w-full transition-all duration-300" />
            </button>
          ))}
          <button
            onClick={() => scrollTo("register")}
            className="bg-red-600 hover:bg-red-500 text-white text-xs font-black uppercase tracking-widest px-4 lg:px-5 py-2 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/40 hover:-translate-y-0.5"
          >
            JOIN NOW
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 flex-shrink-0"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-red-500 transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-red-500 transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-red-500 transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ease-in-out ${menuOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"}`}
        style={{
          background: "rgba(0,0,0,0.92)",
          borderTop: menuOpen ? "1px solid rgba(153,27,27,0.4)" : "none",
        }}
      >
        <div className="px-6 py-6 flex flex-col gap-5">
          {[["games", "Trials"], ["leaderboard", "Leaderboard"], ["register", "Register"]].map(([id, label], i) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-gray-300 hover:text-red-400 uppercase tracking-widest text-sm font-bold text-left transition-all duration-300 flex items-center gap-3"
            >
              <span className="text-red-800 text-xs">0{i + 1}</span>
              {label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("register")}
            className="bg-red-600 hover:bg-red-500 text-white text-xs font-black uppercase tracking-widest px-5 py-3 transition-all duration-300 mt-1"
          >
            JOIN NOW →
          </button>
        </div>
      </div>
    </nav>
  );
}