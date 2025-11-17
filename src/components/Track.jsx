// src/components/Track.jsx
// ------------------------------------------------------
// "Track" section — displays 3 metric cards.
// You can later replace placeholder metrics with your real data UI.

import React from "react";

export default function Track() {
  return (
    <section id="track" className="px-4 py-16">
      <div className="mx-auto max-w-6xl">

        {/* ------------------------------------------------------ */}
        {/* SECTION TITLE */}
        {/* ------------------------------------------------------ */}
        <h2 className="text-2xl font-bold mb-6">Track</h2>

        {/* ------------------------------------------------------ */}
        {/* THREE-COLUMN GRID OF METRICS */}
        {/* ------------------------------------------------------ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Metric Card 1 */}
          <div className="nf-card border border-white/10 bg-black/60 p-6 rounded-2xl">
            <h3 className="text-lg font-semibold mb-2">Daily Insights</h3>
            <p className="text-neutral-300 text-sm">
              Stay updated on your spending trends with real-time summaries.
            </p>
          </div>

          {/* Metric Card 2 */}
          <div className="nf-card border border-white/10 bg-black/60 p-6 rounded-2xl">
            <h3 className="text-lg font-semibold mb-2">Weekly Reports</h3>
            <p className="text-neutral-300 text-sm">
              Get automatic weekly breakdowns to help you stay financially aware.
            </p>
          </div>

          {/* Metric Card 3 */}
          <div className="nf-card border border-white/10 bg-black/60 p-6 rounded-2xl">
            <h3 className="text-lg font-semibold mb-2">Category Trends</h3>
            <p className="text-neutral-300 text-sm">
              Visualize how your habits change across food, travel, shopping & more.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
