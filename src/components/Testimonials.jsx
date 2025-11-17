// src/components/Testimonials.jsx

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Testimonials() {
  const trackRef = useRef(null);

  const testimonials = [
    {
      avatar: "/avatars/1.jpg",
      date: "Joined Jan 2027 • Bengaluru",
      text: "“NueroFin is the first app where my salary, UPI and credit cards actually talk to each other. I finally know my real monthly burn.”",
      name: "DEVESH R.",
    },
    {
      avatar: "/avatars/2.jpg",
      date: "Joined Mar 2027 • Mumbai",
      text: "“My partner and I share goals like home and travel, but still keep our personal spends private. NueroFin gets Indian families.”",
      name: "PRIYANKA S.",
    },
    {
      avatar: "/avatars/3.jpg",
      date: "Joined May 2027 • Delhi NCR",
      text: "“The AI suggestions feel like a planner who already knows my rent, EMIs and parents’ medical spends in detail.”",
      name: "KABIR L.",
    },
    {
      avatar: "/avatars/4.jpg",
      date: "Joined Aug 2027 • Kolkata",
      text: "“I found and cancelled 9 unnecessary subscriptions in one evening. Those alone pay for NueroFin every year.”",
      name: "ALISHA V.",
    },
  ];

  const items = [...testimonials, ...testimonials];

  useEffect(() => {
    const track = trackRef.current;
    const width = track.scrollWidth / 2;

    gsap.to(track, {
      x: `-${width}px`,
      duration: 28,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: (value) => {
          const x = parseFloat(value);
          return x <= -width ? "0px" : `${x}px`;
        },
      },
    });
  }, []);

  return (
    <section className="w-full py-24">
      {/* Heading */}
      <div className="max-w-6xl mx-auto px-6 mb-16">
        <h2 className="text-4xl sm:text-5xl font-light text-white">
          <span className="italic opacity-80">Hear</span> from the first NueroFin cohorts.
        </h2>
      </div>

      {/* OUTER MASK — must have overflow-hidden, no padding */}
      <div className="w-full overflow-hidden relative">

        {/* MOVING TRACK (no padding here) */}
        <div
          ref={trackRef}
          className="flex gap-8 will-change-transform"
          style={{ width: "max-content" }}
        >
          {items.map((t, i) => (
            <div
              key={i}
              className="w-[430px] flex-shrink-0 bg-white/5 backdrop-blur-xl border border-white/10
                         rounded-3xl p-8 shadow-[0_0_35px_rgba(255,255,255,0.04)]"
            >
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={t.avatar}
                  className="h-12 w-12 rounded-full object-cover flex-shrink-0"
                />
                <span className="text-sm text-neutral-300">{t.date}</span>
              </div>

              <p className="text-neutral-200 mb-6 leading-relaxed">{t.text}</p>

              <p className="text-neutral-400 font-semibold text-sm">{t.name}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
