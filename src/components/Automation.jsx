// src/components/Automation.jsx
// ------------------------------------------------------
// "UPI & Bills Automation" section with two feature cards.
// Matches original design and structure from your HTML.

import React from "react";

export default function Automation() {
  return (
    <section id="automation" className="px-4 py-16">
      <div className="mx-auto max-w-6xl">

        {/* ------------------------------------------------------ */}
        {/* SECTION TITLE */}
        {/* ------------------------------------------------------ */}
        <h2 className="text-2xl font-bold mb-6">
          UPI & Bills Automation
        </h2>

        {/* ------------------------------------------------------ */}
        {/* TWO-COLUMN GRID */}
        {/* ------------------------------------------------------ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Card 1 */}
          <div className="border border-white/10 bg-black/60 p-6 rounded-2xl">
            <h3 className="text-lg font-semibold mb-2">Auto-pay</h3>
            <p className="text-neutral-300 text-sm">
              Set up autopay for recurring bills and essential payments.
              Your household never misses dues again.
            </p>
          </div>

          {/* Card 2 */}
          <div className="border border-white/10 bg-black/60 p-6 rounded-2xl">
            <h3 className="text-lg font-semibold mb-2">UPI Analytics</h3>
            <p className="text-neutral-300 text-sm">
              Understand your UPI spending patterns, monthly summaries,
              merchant insights, and smart recommendations.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
