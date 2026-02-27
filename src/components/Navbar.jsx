"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";

export default function Navbar() {
  const navRef = useRef(null);
  const spotlightRef = useRef(null);
  const linksRef = useRef([]);

  const [lastScroll, setLastScroll] = useState(0);
  const [hidden, setHidden] = useState(false);
  const navigate = useNavigate();

  /* ────────────────────────────────────────────────
      Hide / Reveal Navbar on scroll
  ──────────────────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      setHidden(current > lastScroll && current > 60);
      setLastScroll(current);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScroll]);

  /* ────────────────────────────────────────────────
      Magnetic Hover + Premium Button Animations
  ──────────────────────────────────────────────── */
  useEffect(() => {
    /* Magnetic Hover for all links */
    linksRef.current.forEach((el) => {
      if (!el) return;
      const xTo = gsap.quickTo(el, "x", { duration: 0.3, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.3, ease: "power3.out" });

      el.addEventListener("mousemove", (e) => {
        const rect = el.getBoundingClientRect();
        xTo((e.clientX - (rect.left + rect.width / 2)) * 0.25);
        yTo((e.clientY - (rect.top + rect.height / 2)) * 0.25);
      });

      el.addEventListener("mouseleave", () => {
        xTo(0);
        yTo(0);
      });
    });
  }, []);

  /* ────────────────────────────────────────────────
      Spotlight Cursor Glow
  ──────────────────────────────────────────────── */
  useEffect(() => {
    const spotlight = spotlightRef.current;
    if (!spotlight) return;

    window.addEventListener("mousemove", (e) => {
      spotlight.style.left = `${e.clientX}px`;
      spotlight.style.top = `${e.clientY}px`;
    });
  }, []);


  /* ────────────────────────────────────────────────
      JSX
  ──────────────────────────────────────────────── */
  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${hidden ? "-translate-y-full" : "translate-y-0"}
        bg-black/40 backdrop-blur-2xl border-b border-white/10
      `}
    >
      {/* Spotlight following cursor */}
      <div
        ref={spotlightRef}
        className="pointer-events-none fixed w-[400px] h-[400px]
        -translate-x-1/2 -translate-y-1/2 
        bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)]
        blur-3xl opacity-60"
      />

      {/* Ambient floating glows */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute left-[20%] top-[-20%] w-[30rem] h-[30rem] bg-sky-500/10 blur-[150px] rounded-full"></div>
        <div className="absolute right-[10%] bottom-[-20%] w-[30rem] h-[30rem] bg-purple-500/10 blur-[150px] rounded-full"></div>
      </div>

      {/* NAVBAR MAIN */}
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center">

        {/* LEFT — LOGO */}
        <div className="flex items-center gap-3 flex-none"
          onClick={() => navigate("/")}>
          <div className="w-9 h-9 bg-white/10 rounded-xl border border-white/20 
                          flex items-center justify-center backdrop-blur-xl 
                          shadow-[0_0_25px_rgba(255,255,255,0.1)]">
            <img src="src/assets/logo.png" alt="logo" className="w-full h-full object-contain" />
          </div>

          <span className="text-sm tracking-[0.22em] font-medium text-white/90"
            onClick={() => navigate("/")}>
            NEUROFIN
          </span>
        </div>

        {/* RIGHT — Try AI + SIGN UP */}
        <div className="flex items-center gap-4 flex-none ml-auto">

          {/* TRY AI BUTTON */}
          <button
            ref={(el) => (linksRef.current[0] = el)}
            onClick={() => navigate("/assistant")}
            className="relative group flex items-center gap-2 px-5 py-2 font-medium text-white tracking-wide
                       rounded-full transition-all duration-300
                       border border-[#3BF7FF]/30 bg-[#3BF7FF]/8 backdrop-blur-md
                       hover:bg-[#3BF7FF]/15 hover:border-[#3BF7FF]/60
                       hover:shadow-[0_0_25px_rgba(59,247,255,0.25)]
                       active:scale-[0.97]"
          >
            <Sparkles className="w-4 h-4 text-[#3BF7FF]" />
            <span className="relative z-10 text-sm">Try AI</span>
          </button>

          {/* SIGN UP */}
          <button
            id="signup-ultra"
            ref={(el) => (linksRef.current[1] = el)}
            onClick={() => navigate("/signup")}
            className="relative group px-6 py-2 font-semibold rounded-full
                       bg-white text-black
                       shadow-[0_0_35px_rgba(255,255,255,0.45)]
                       transition-all duration-300 
                       hover:shadow-[0_0_60px_rgba(255,255,255,0.7)]
                       hover:scale-[1.03] active:scale-[0.98]
                       flex items-center gap-2"
          >
            <span className="relative z-10">Sign Up</span>

            <svg
              width="18"
              height="18"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M6 4l6 5-6 5" />
            </svg>

            <span className="absolute inset-0 rounded-full bg-white/40 blur-xl opacity-0 
                             group-hover:opacity-100 transition"></span>

            <span className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
              <span className="shine"></span>
            </span>
          </button>

        </div>
      </div>

    </header>
  );
}
