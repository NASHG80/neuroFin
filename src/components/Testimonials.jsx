// src/components/Testimonials.jsx
// ------------------------------------------------------
// Smooth infinite horizontal auto-scroll testimonial section.
// Uses DOM-based cloning and continuous transform animation,
// exactly like your original HTML's custom JS behavior.

import React, { useEffect } from "react";

export default function Testimonials() {

  useEffect(() => {
    const section = document.getElementById("nf-testimonials");
    if (!section) return;

    const track = section.querySelector("#nf-testimonial-track");
    const card = section.querySelector(".nf-testimonial-window");

    if (!track || !card) return;

    //
    // Clone one testimonial card to create infinite loop
    //
    const clone = card.cloneNode(true);
    track.appendChild(clone);

    //
    // Smooth scroll animation using requestAnimationFrame
    //
    let pos = 0;
    const speed = 0.5; // You can adjust this to speed up or slow down

    const animate = () => {
      pos += speed;

      if (pos >= card.scrollWidth) {
        pos = 0; // Reset when 1 card has fully scrolled
      }

      track.style.transform = `translateX(-${pos}px)`;

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <section id="nf-testimonials" className="px-4 py-16">
      <div className="mx-auto max-w-6xl">

        {/* ------------------------------------------------------ */}
        {/* Section Title */}
        {/* ------------------------------------------------------ */}
        <h2 className="text-2xl font-bold mb-6">What customers say</h2>

        {/* ------------------------------------------------------ */}
        {/* Testimonials Track */}
        {/* ------------------------------------------------------ */}
        <div className="relative overflow-hidden">

          <div
            id="nf-testimonial-track"
            className="flex gap-6 will-change-transform"
          >

            {/* ------------------ Testimonial 1 ------------------ */}
            <div className="nf-testimonial-window nf-quote-card min-w-[320px] border border-white/10 bg-black/60 p-6 rounded-2xl">
              <p className="text-neutral-300 mb-4">
                “Saved time and conflict during bill splits — love it.”
              </p>
              <div className="text-neutral-400 text-sm">— Asha, Bangalore</div>
            </div>

            {/* ------------------ Testimonial 2 ------------------ */}
            <div className="nf-quote-card min-w-[320px] border border-white/10 bg-black/60 p-6 rounded-2xl">
              <p className="text-neutral-300 mb-4">
                “Forecasting helped me reach my emergency fund 6 months earlier.”
              </p>
              <div className="text-neutral-400 text-sm">— Rohit, Pune</div>
            </div>

            {/* ------------------ Testimonial 3 ------------------ */}
            <div className="nf-quote-card min-w-[320px] border border-white/10 bg-black/60 p-6 rounded-2xl">
              <p className="text-neutral-300 mb-4">
                “UPI analytics showed a subscription I forgot about.”
              </p>
              <div className="text-neutral-400 text-sm">— Meera, Hyderabad</div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
