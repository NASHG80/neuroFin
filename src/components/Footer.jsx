// src/components/Footer.jsx
// ------------------------------------------------------
// Footer with dynamic year injection and simple branding.

import React, { useEffect } from "react";

export default function Footer() {

  // Insert current year into the footer span
  useEffect(() => {
    const y = document.getElementById("nf-year");
    if (y) y.textContent = new Date().getFullYear();
  }, []);

  return (
    <footer className="px-4 py-16 text-neutral-400">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row justify-between items-center gap-4">

        {/* Branding */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 bg-white/5 rounded-lg" />
          <span className="font-medium tracking-wide">NUEROFIN</span>
        </div>

        {/* Year */}
        <div className="text-sm">
          © <span id="nf-year"></span> Nuerofin — All rights reserved
        </div>

      </div>
    </footer>
  );
}
