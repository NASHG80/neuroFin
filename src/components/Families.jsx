// src/components/Families.jsx
// ------------------------------------------------------
// "Families" section — includes shared accounts, permissions,
// and a family illustration. Uses a 3-column grid.

import React from "react";

export default function Families() {
  return (
    <section id="families" className="px-4 py-16">
      <div className="mx-auto max-w-6xl">

        {/* ------------------------------------------------------ */}
        {/* SECTION TITLE */}
        {/* ------------------------------------------------------ */}
        <h2 className="text-2xl font-bold mb-6">Families</h2>

        {/* ------------------------------------------------------ */}
        {/* THREE-COLUMN GRID */}
        {/* ------------------------------------------------------ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* ------------------------------------------------------ */}
          {/* Card 1 — Shared Accounts */}
          {/* ------------------------------------------------------ */}
          <div className="nf-family-main border border-white/10 bg-black/60 p-6 rounded-2xl">
            <h3 className="text-lg font-semibold mb-2">Shared Accounts</h3>
            <p className="text-neutral-300 text-sm">
              Create shared financial spaces for rent, groceries, utilities,
              travel budgets or savings goals—all with contribution tracking.
            </p>
          </div>

          {/* ------------------------------------------------------ */}
          {/* Card 2 — Illustration */}
          {/* ------------------------------------------------------ */}
          <div className="nf-family-illustration border border-white/10 bg-black/60 p-6 rounded-2xl flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80"
              className="rounded-lg shadow-xl"
              alt="family illustration"
            />
          </div>

          {/* ------------------------------------------------------ */}
          {/* Card 3 — Permissions */}
          {/* ------------------------------------------------------ */}
          <div className="border border-white/10 bg-black/60 p-6 rounded-2xl">
            <h3 className="text-lg font-semibold mb-2">Permissions</h3>
            <p className="text-neutral-300 text-sm">
              Assign approval roles for spends, set limits for kids, and maintain
              transparency and control across the family.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
