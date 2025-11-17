import { useEffect, useRef } from 'react';

export default function TrackSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll('.nf-card');
    cards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(24px)';
    });

    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        cards.forEach((card, idx) => {
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, idx * 80);
        });
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.25 });
    io.observe(sectionRef.current);
  }, []);

  return (
    <section id="nf-track" className="relative" ref={sectionRef}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20">
        <div className="grid gap-5 md:grid-cols-2">
          {/* Card: Spending overview */}
          <article className="nf-card flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 via-black to-black/90 shadow-[0_30px_80px_rgba(15,23,42,0.9)]">
            <div className="relative overflow-hidden">
              <div className="bg-gradient-to-tr from-sky-400/20 via-transparent to-transparent absolute inset-0"></div>
              <div className="relative">
                <div className="backdrop-blur-sm bg-black/40 rounded-[1.4rem] m-3">
                  <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/b49067c4-bdc5-40cc-8964-6e50d21978ff_800w.jpg" alt="Spending overview" className="w-full h-auto object-contain" loading="lazy" />
                </div>
              </div>
            </div>
            <div className="space-y-1 px-4 pb-4 pt-2">
              <p className="text-sm text-neutral-100">See where every rupee goes</p>
              <p className="text-xs text-neutral-300">
                Auto‑tagged categories like Swiggy, Uber, rent and fuel — with nudge alerts when lifestyle creep kicks in.
              </p>
            </div>
          </article>

          {/* Card: Budget */}
          <article className="nf-card flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 via-black to-black/90 shadow-[0_30px_80px_rgba(15,23,42,0.9)]">
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-400/20 via-transparent to-transparent"></div>
              <div className="relative">
                <div className="backdrop-blur-sm bg-black/40 rounded-[1.4rem] m-3">
                  <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/3c2ae75b-0a23-443d-a7d1-1a0defd8874e_800w.jpg" alt="Budget card" className="w-full h-auto object-contain" loading="lazy" />
                </div>
              </div>
            </div>
            <div className="space-y-1 px-4 pb-4 pt-2">
              <p className="text-sm text-neutral-100">AI‑built Indian budgets</p>
              <p className="text-xs text-neutral-300">
                NueroFin reads your last 6 months of spends and proposes monthly caps tuned to your city and lifestyle.
              </p>
            </div>
          </article>

          {/* Card: Subscriptions (empty image as in original) */}
          <article className="nf-card flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 via-black to-black/90 shadow-[0_30px_80px_rgba(15,23,42,0.9)] md:col-span-2">
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-400/20 via-transparent to-transparent"></div>
              <div className="relative">
                <div className="backdrop-blur-sm bg-black/40 rounded-[1.4rem] m-3">
                  {/* Image intentionally left blank as in original */}
                </div>
              </div>
            </div>
            {/* No content, placeholder */}
          </article>
        </div>
      </div>
    </section>
  );
}
