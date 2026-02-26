import { useState, useEffect, useRef } from "react";

const FIELDS = [
  { id: "name", label: "Full Name", type: "text", placeholder: "Enter your full name" },
  { id: "email", label: "Email Address", type: "email", placeholder: "your@email.com" },
  { id: "phone", label: "Phone Number", type: "tel", placeholder: "+91 XXXXX XXXXX" },
  { id: "age", label: "Age", type: "number", placeholder: "18 – 60" },
];

const validate = (form) => {
  const errors = {};
  if (!form.name.trim()) errors.name = "Name is required";
  else if (form.name.trim().length < 2) errors.name = "Must be at least 2 characters";

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.email.trim()) errors.email = "Email is required";
  else if (!emailRe.test(form.email)) errors.email = "Enter a valid email address";

  const phoneRe = /^[+\d\s\-()]{7,15}$/;
  if (!form.phone.trim()) errors.phone = "Phone number is required";
  else if (!phoneRe.test(form.phone)) errors.phone = "Enter a valid phone number";

  const age = parseInt(form.age);
  if (!form.age) errors.age = "Age is required";
  else if (isNaN(age) || age < 18 || age > 60) errors.age = "Age must be between 18 and 60";

  if (!form.game) errors.game = "Select a trial to enter";
  if (!form.agree) errors.agree = "You must accept the terms to proceed";

  return errors;
};

const TRIALS = [
  { value: "01", label: "01 — Reflex Rush" },
  { value: "02", label: "02 — Target Click" },
  { value: "03", label: "03 — Avoid the Trap" },
  { value: "04", label: "04 — Logic Burst" },
  { value: "05", label: "05 — Deception Detector" },
  { value: "06", label: "06 — Collapse Arena" },
];

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", age: "", game: "", agree: false });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [playerNumber, setPlayerNumber] = useState(null);
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    const num = Math.floor(Math.random() * 455) + 1;
    setPlayerNumber(String(num).padStart(3, "0"));
    setSubmitted(true);
  };

  // Input class helper
  const inputClass = (id) =>
    `w-full border px-4 py-3 text-sm text-white placeholder-gray-700 outline-none transition-all duration-300
    focus:border-red-600 focus:bg-gray-900/60
    ${errors[id] ? "border-red-600 bg-red-950/10" : "border-gray-800 bg-black"}`;

  return (
    <section
      id="register"
      ref={sectionRef}
      className="bg-black py-24 px-4 sm:px-6 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-700 to-transparent" />

      {/* Huge background watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
        <span
          className="text-white font-black"
          style={{
            fontFamily: "'Bebas Neue', Impact, sans-serif",
            fontSize: "clamp(8rem, 35vw, 28rem)",
            opacity: 0.018,
            letterSpacing: "0.05em",
          }}
        >
          456
        </span>
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-8 sm:w-12 h-px bg-red-700" />
            <span className="text-red-500 text-xs font-black uppercase tracking-[0.4em]">Player Registration</span>
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
            ENTER THE GAME
          </h2>
          <p className="text-gray-500 text-sm">Complete your registration to receive your player number</p>
        </div>

        {/* Success */}
        {submitted ? (
          <div
            className={`border border-red-700 bg-red-950/10 p-10 sm:p-12 text-center transition-all duration-700 ${inView ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          >
            <div className="w-16 h-16 border-4 border-red-500 rotate-45 mx-auto mb-8 flex items-center justify-center">
              <span className="text-xl -rotate-45 text-green-400">✓</span>
            </div>
            <p className="text-red-400 text-xs uppercase tracking-[0.4em] mb-4">Registration Confirmed</p>
            <div
              className="text-8xl sm:text-9xl font-black text-white mb-4"
              style={{
                fontFamily: "'Bebas Neue', Impact, sans-serif",
                textShadow: "0 0 60px rgba(220,38,38,0.7)",
                letterSpacing: "0.1em",
              }}
            >
              {playerNumber}
            </div>
            <p className="text-gray-400 text-sm mb-1">
              Welcome, <span className="text-white font-bold">{form.name}</span>
            </p>
            <p className="text-gray-600 text-xs mb-8">
              Confirmation sent to <span className="text-gray-400">{form.email}</span>
            </p>
            <p className="text-red-500 text-xs uppercase tracking-widest font-bold" style={{ animation: "pulse 2s infinite" }}>
              ⚠ Arrival is mandatory. No exceptions.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setForm({ name: "", email: "", phone: "", age: "", game: "", agree: false });
                setErrors({});
              }}
              className="mt-8 border border-gray-700 text-gray-400 hover:border-red-600 hover:text-white text-xs font-bold uppercase tracking-widest px-6 py-2 transition-all duration-300"
            >
              Register Another Player
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className={`border border-gray-800 bg-gray-950/50 p-6 sm:p-10 space-y-6 transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            {/* Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {FIELDS.slice(0, 2).map((f) => (
                <div key={f.id}>
                  <label className="block text-gray-400 text-xs uppercase tracking-widest font-bold mb-2">
                    {f.label} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type={f.type}
                    name={f.id}
                    value={form[f.id]}
                    onChange={handleChange}
                    placeholder={f.placeholder}
                    className={inputClass(f.id)}
                  />
                  {errors[f.id] && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                      <span>⚠</span> {errors[f.id]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Phone + Age */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {FIELDS.slice(2, 4).map((f) => (
                <div key={f.id}>
                  <label className="block text-gray-400 text-xs uppercase tracking-widest font-bold mb-2">
                    {f.label} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type={f.type}
                    name={f.id}
                    value={form[f.id]}
                    onChange={handleChange}
                    placeholder={f.placeholder}
                    className={inputClass(f.id)}
                  />
                  {errors[f.id] && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                      <span>⚠</span> {errors[f.id]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Trial Selection — fully dark, custom styled */}
            <div>
              <label className="block text-gray-400 text-xs uppercase tracking-widest font-bold mb-2">
                Select Your First Trial <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="game"
                  value={form.game}
                  onChange={handleChange}
                  className={`w-full appearance-none px-4 py-3 text-sm outline-none transition-all duration-300 cursor-pointer
                    focus:border-red-600
                    ${form.game ? "text-white" : "text-gray-600"}
                    ${errors.game ? "border-red-600 bg-red-950/10 border" : "border border-gray-800 bg-black hover:border-gray-600"}
                  `}
                  style={{ colorScheme: "dark" }}
                >
                  <option value="" style={{ background: "#0a0a0a", color: "#4b5563" }}>
                    -- Choose a Trial --
                  </option>
                  {TRIALS.map((t) => (
                    <option
                      key={t.value}
                      value={t.value}
                      style={{ background: "#0a0a0a", color: "#f3f4f6" }}
                    >
                      {t.label}
                    </option>
                  ))}
                </select>
                {/* Custom arrow */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                    <path d="M1 1L6 7L11 1" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              {errors.game && (
                <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                  <span>⚠</span> {errors.game}
                </p>
              )}
            </div>

            {/* Terms */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex-shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    name="agree"
                    checked={form.agree}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 border-2 transition-all duration-200 flex items-center justify-center
                    ${form.agree ? "bg-red-600 border-red-600" : "border-gray-600 group-hover:border-red-700"}`}
                  >
                    {form.agree && <span className="text-white text-xs font-black">✓</span>}
                  </div>
                </div>
                <span className="text-gray-500 text-xs leading-relaxed">
                  I understand that participation is{" "}
                  <span className="text-red-400 font-bold">voluntary</span>, all outcomes are
                  final, and the organizers hold no liability for any events during the trials.
                </span>
              </label>
              {errors.agree && (
                <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                  <span>⚠</span> {errors.agree}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-widest py-4 text-sm transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/40 hover:-translate-y-0.5 mt-2"
            >
              CONFIRM REGISTRATION
            </button>

            <p className="text-center text-gray-700 text-xs uppercase tracking-widest">
              Once submitted, your number is permanent.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}