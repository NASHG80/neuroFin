// src/components/Forecasting.jsx
// ------------------------------------------------------
// "Future Planner" forecasting section. Includes a text
// block explaining simulations, and an illustration card.
// Fully Tailwind-styled and matches original HTML layout.

import React from "react";

export default function Forecasting() {
  return (
    <section id="forecasting" className="px-4 py-16">
      <div className="mx-auto max-w-6xl">

        {/* ------------------------------------------------------ */}
        {/* SECTION TITLE */}
        {/* ------------------------------------------------------ */}
        <h2 className="text-2xl font-bold mb-6">Future Planner</h2>

        {/* ------------------------------------------------------ */}
        {/* TWO-COLUMN GRID */}
        {/* ------------------------------------------------------ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">

          {/* --------------------------- LEFT CONTENT --------------------------- */}
          <div className="space-y-4">
            <p className="text-neutral-300 leading-relaxed">
              Simulate short-term and long-term financial goals with real
              variables — income, rent, UPI spends, SIPs, savings and EMIs.
            </p>

            <p className="text-neutral-300 leading-relaxed">
              Our forecasting engine projects realistic timelines for your
              objectives such as travel plans, emergency funds, gadgets, home
              appliances, education budgets and more — tailored to your past
              spending patterns.
            </p>

            <p className="text-neutral-300 leading-relaxed">
              Your forecasts run on-device using optimized models, ensuring your
              financial data never leaves your phone.
            </p>
          </div>

          {/* --------------------------- RIGHT IMAGE CARD --------------------------- */}
          <div className="nf-forecast-img border border-white/10 bg-black/60 p-6 rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1517244683847-6d2b56b7d6f6?w=800&q=80"
              alt="forecast visualization"
              className="rounded-lg shadow-xl"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
