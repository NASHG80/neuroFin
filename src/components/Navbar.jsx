// src/components/Navbar.jsx
// ------------------------------------------------------
// Navigation bar with dropdown, mobile menu, and email 
// join form. Includes DOM-based behavior for toggling 
// mobile nav, matching your original HTML logic.

import React, { useEffect } from "react";

export default function Navbar() {

  // Mobile menu toggle logic
  useEffect(() => {
    const btn = document.getElementById("nf-mobile-menu-btn");
    const menu = document.getElementById("nf-mobile-menu");

    if (!btn || !menu) return;

    const toggle = () => menu.classList.toggle("hidden");
    btn.addEventListener("click", toggle);

    return () => btn.removeEventListener("click", toggle);
  }, []);

  return (
    <header
      id="nf-nav"
      className="sticky top-0 z-40 border-b border-white/5 bg-black/70 backdrop-blur-xl"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-6">

          {/* ------------------------------------------------------ */}
          {/* LOGO */}
          {/* ------------------------------------------------------ */}
          <div className="flex items-center gap-3">
            <div className="flex w-9 h-9 bg-[url(https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/2fd5a08b-56a4-47b8-95f4-1f531433a320_800w.jpg)] bg-contain rounded-xl shadow-[0_0_40px_rgba(56,189,248,0.45)] items-center justify-center">
              <span className="text-xs font-semibold tracking-[0.22em] text-black">
                NF
              </span>
            </div>
            <span className="hidden text-xs font-medium tracking-[0.28em] text-neutral-100/90 sm:inline-block">
              NUEROFIN
            </span>
          </div>

          {/* ------------------------------------------------------ */}
          {/* DESKTOP NAVIGATION */}
          {/* ------------------------------------------------------ */}
          <nav className="hidden items-center gap-6 text-sm font-medium text-neutral-300/80 md:flex">

            {/* Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1.5 text-sm font-medium text-neutral-200 hover:text-white transition-colors">
                <span>Service</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="m19 9l-7 6l-7-6"
                  />
                </svg>
              </button>

              {/* Dropdown menu */}
              <div className="pointer-events-none absolute left-0 top-full mt-3 w-52 rounded-2xl border border-white/8 bg-black/80 opacity-0 shadow-2xl backdrop-blur-2xl transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
                <div className="flex flex-col py-2 text-xs text-neutral-200">
                  <a href="#spending" className="px-3 py-2 hover:bg-white/5">
                    Spends & Budgets
                  </a>
                  <a href="#automation" className="px-3 py-2 hover:bg-white/5">
                    UPI & Bills
                  </a>
                  <a href="#forecasting" className="px-3 py-2 hover:bg-white/5">
                    Future Planner
                  </a>
                  <a href="#families" className="px-3 py-2 hover:bg-white/5">
                    Family Accounts
                  </a>
                </div>
              </div>
            </div>

            <a href="#track" className="hover:text-white transition-colors">
              Track
            </a>
            <a href="#pricing" className="hover:text-white transition-colors">
              Pricing
            </a>
            <a href="#faq" className="hover:text-white transition-colors">
              FAQ
            </a>
          </nav>

          {/* ------------------------------------------------------ */}
          {/* RIGHT SIDE (EMAIL JOIN + MOBILE BUTTON) */}
          {/* ------------------------------------------------------ */}
          <div className="flex items-center gap-3">

            {/* Email join form (desktop only) */}
            <form id="login" className="hidden items-center gap-2 md:flex">
              <input
                id="nf-email"
                className="w-[260px] rounded-xl bg-white/5 px-3 py-2 text-sm placeholder:text-neutral-400"
                placeholder="you@company.com"
              />
              <button
                type="submit"
                className="rounded-xl bg-white/5 px-3 py-2 text-sm"
              >
                Join
              </button>
            </form>

            {/* Mobile menu button */}
            <button
              id="nf-mobile-menu-btn"
              className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-sm md:hidden"
            >
              Menu
            </button>

          </div>
        </div>
      </div>

      {/* ------------------------------------------------------ */}
      {/* MOBILE MENU */}
      {/* ------------------------------------------------------ */}
      <div
        id="nf-mobile-menu"
        className="md:hidden hidden border-t border-white/5 bg-black/60"
      >
        <div className="mx-auto max-w-6xl px-4 py-3">
          <a href="#spending" className="block py-2">
            Spends & Budgets
          </a>
          <a href="#automation" className="block py-2">
            UPI & Bills
          </a>
          <a href="#forecasting" className="block py-2">
            Future Planner
          </a>
        </div>
      </div>
    </header>
  );
}
