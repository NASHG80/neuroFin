// src/components/Spending.jsx
// ------------------------------------------------------
// "Spends & Budgets" section with 3 feature cards.
// Styled with Tailwind and matches your original layout.

import React from "react";

export default function Spending() {
  return (
    <section id="spending" className="px-4 py-16">
      <div className="mx-auto max-w-6xl">

        {/* ------------------------------------------------------ */}
        {/* SECTION TITLE */}
        {/* ------------------------------------------------------ */}
        <h2 className="text-2xl font-bold mb-6">Spends & Budgets</h2>

        {/* ------------------------------------------------------ */}
        {/* CARDS GRID */}
        {/* ------------------------------------------------------ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Card 1 */}
          <div className="nf-card border border-white/10 bg-black/60 p-6 rounded-2xl">
            <h3 className="text-lg font-semibold mb-2">Auto-categorize</h3>
            <p className="text-neutral-300 text-sm">
              Automatically categorize UPI & card transactions into meaningful,
              intelligent buckets.
            </p>
          </div>

          {/* Card 2 */}
          <div className="nf-card border border-white/10 bg-black/60 p-6 rounded-2xl">
            <h3 className="text-lg font-semibold mb-2">Split bills</h3>
            <p className="text-neutral-300 text-sm">
              Easily split household bills and track shared expenses with
              roommates, partners or family members.
            </p>
          </div>

          {/* Card 3 */}
          <div className="nf-card border border-white/10 bg-black/60 p-6 rounded-2xl">
            <h3 className="text-lg font-semibold mb-2">Smart Alerts</h3>
            <p className="text-neutral-300 text-sm">
              Detect overspending and get proactive notifications before crossing
              your monthly budget.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
