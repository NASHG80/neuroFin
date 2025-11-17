// src/components/Hero.jsx
// ------------------------------------------------------
// Hero section with animated text (Typed.js), intersection
// fade-in effects, and floating glowing accents behind
// the phone mockup.

import React, { useEffect } from "react";
import { loadScript } from "./util";

export default function Hero() {
  //
  // Load Iconify + Typed.js dynamically and initialize typing effect
  //
  useEffect(() => {
    (async () => {
      try {
        // Load icon library
        await loadScript(
          "https://code.iconify.design/3/3.1.0/iconify.min.js",
          "iconify-script"
        );

        // Load Typed.js
        await loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.0.12/typed.min.js",
          "typed-script"
        );

        // Initialize Typed.js if available
        if (window.Typed) {
          new window.Typed("#nf-typed-query", {
            strings: [
              "“Mera rent, SIP aur UPI spends ek saath kaise plan karun?”",
              "“If I save ₹30k/month, 18 lakh ka goal kab tak achieve hoga?”",
              "“Parents ke medical fund ke saath Goa trip bhi fit ho sakta hai?”",
            ],
            typeSpeed: 70,
            backSpeed: 45,
            backDelay: 900,
            startDelay: 400,
            loop: true,
            showCursor: false,
          });
        }
      } catch (err) {
        console.warn("Failed loading Iconify/Typed.js", err);
      }
    })();
  }, []);

  return (
    <section
      id="nf-hero"
      className="relative isolate overflow-hidden px-4 pt-20 pb-20"
    >
      <div className="mx-auto max-w-6xl">

        {/* --------------------------- GRID: Left + Right -------------------------- */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">

          {/* ---------------------------------------------------------------------- */}
          {/* LEFT SIDE — Text content */}
          {/* ---------------------------------------------------------------------- */}
          <div className="nf-hero-animate space-y-6">
            <p className="rounded-full bg-white/5 py-1 px-3 text-sm font-medium tracking-wide text-neutral-200">
              Alpha • invite only
            </p>

            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight">
              Automated family budgets, UPI insights & future planning — all in
              one place
            </h1>

            <p className="max-w-xl text-neutral-300">
              Nuerofin helps families and young professionals understand
              spending, automate savings, and forecast big goals with
              on-device AI models.
            </p>

            {/* Buttons */}
            <div className="flex gap-3">
              <button className="rounded-xl bg-white/5 px-4 py-2 text-sm font-semibold">
                Get Invite
              </button>
              <button className="text-sm">See demo</button>
            </div>

            {/* ------------------- Typing Box ------------------- */}
            <div className="mt-6 max-w-md rounded-2xl border border-white/10 bg-black/60 p-4 text-sm text-neutral-300">
              <div className="flex items-center gap-3">
                <img
                  className="h-9 w-9 rounded-lg object-cover"
                  src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=200&q=80"
                  alt="avatar"
                />
                <div>
                  <div id="nf-typed-query" className="font-medium" />
                  <div className="text-xs text-neutral-400">
                    Search sample queries
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------------------------- */}
          {/* RIGHT SIDE — Phone with glowing orbs */}
          {/* ---------------------------------------------------------------------- */}
          <div className="nf-phone-img relative flex items-center justify-center">
            <div className="relative isolate w-[320px] sm:w-[380px] lg:w-[420px]">

              {/* Phone image */}
              <img
                src="https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=600"
                className="rounded-3xl shadow-2xl"
                alt="phone interface preview"
              />

              {/* Decorative blurred glows */}
              <div className="absolute -left-8 -top-8 h-24 w-24 rounded-full bg-sky-400/20 blur-3xl"></div>
              <div className="absolute -right-8 -bottom-8 h-28 w-28 rounded-full bg-pink-400/20 blur-3xl"></div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
