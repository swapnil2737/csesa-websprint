export default function Footer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="bg-black border-t border-gray-900 py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => scrollTo("hero")}
        >
          <div className="w-6 h-6 border-2 border-red-500 rotate-45 flex items-center justify-center transition-all duration-300 group-hover:shadow-md group-hover:shadow-red-500/30">
            <div className="w-2 h-2 bg-red-500 rotate-45" />
          </div>
          <span className="text-white font-black tracking-widest uppercase text-sm">
            THE<span className="text-red-500 ml-1">GAUNTLET</span>
          </span>
        </div>

        <p className="text-gray-700 text-xs text-center">
          © 2026 · Built by Swapnil
        </p>

        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full" style={{ animation: "pulse 2s infinite" }} />
          <span className="text-gray-700 text-xs uppercase tracking-widest">Season 01 Live</span>
        </div>
      </div>
    </footer>
  );
}