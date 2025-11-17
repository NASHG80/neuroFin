import { useEffect, useRef } from 'react';
import Typed from 'typed.js';

export default function Hero() {
  const heroRef = useRef(null);
  const typedRef = useRef(null);

  useEffect(() => {
    // Typed.js animated text
    if (typedRef.current) {
      new Typed(typedRef.current, {
        strings: ['{"salary":100000,"rent":20000,"savings":15000}'],
        typeSpeed: 40,
        backSpeed: 30,
        showCursor: false,
        loop: true
      });
    }

    // Intersection animations for hero elements
    if (heroRef.current) {
      const elems = heroRef.current.querySelectorAll('.nf-hero-animate');
      elems.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(18px)';
      });

      const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          elems.forEach((el, idx) => {
            setTimeout(() => {
              el.style.transition = 'opacity 0.45s ease-out, transform 0.45s ease-out';
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
            }, idx * 100);
          });
          obs.unobserve(entry.target);
        });
      }, { threshold: 0.3 });
      io.observe(heroRef.current);
    }
  }, []);

  return (
    <section id="nf-hero" className="relative overflow-hidden" ref={heroRef}>
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        {/* Left side */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/15 bg-emerald-400/5 px-3 py-1.5 text-xs font-medium tracking-wide text-emerald-100/90 shadow-[0_0_30px_rgba(16,185,129,0.25)] nf-hero-animate">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="iconify text-emerald-300"><path fill="currentColor" d="M3.845 3.845a2.883 2.883 0 0 0 0 4.077L5.432 9.51c.012-.014.555.503.568.49l4-4c.013-.013-.504-.556-.49-.568L7.922 3.845a2.883 2.883 0 0 0-4.077 0m1.288 11.462a.483.483 0 0 1 .9 0l.157.4a.48.48 0 0 0 .272.273l.398.157a.486.486 0 0 1 0 .903l-.398.158a.48.48 0 0 0-.272.273l-.157.4a.483.483 0 0 1-.9 0l-.157-.4a.48.48 0 0 0-.272-.273l-.398-.158a.486.486 0 0 1 0-.903l.398-.157a.48.48 0 0 0 .272-.274z" opacity=".5"></path><path fill="currentColor" d="M19.967 9.13a.483.483 0 0 1 .9 0l.156.399c.05.125.148.224.273.273l.398.158a.486.486 0 0 1 0 .902l-.398.158a.5.5 0 0 0-.273.273l-.156.4a.483.483 0 0 1-.9 0l-.157-.4a.5.5 0 0 0-.272-.273l-.398-.158a.486.486 0 0 1 0-.902l.398-.158a.5.5 0 0 0 .272-.273z" opacity=".2"></path><path fill="currentColor" d="M16.1 2.307a.483.483 0 0 1 .9 0l.43 1.095a.48.48 0 0 0 .272.274l1.091.432a.486.486 0 0 1 0 .903l-1.09.432a.5.5 0 0 0-.273.273L17 6.81a.483.483 0 0 1-.9 0l-.43-1.095a.5.5 0 0 0-.273-.273l-1.09-.432a.486.486 0 0 1 0-.903l1.09-.432a.5.5 0 0 0 .273-.274z" opacity=".7"></path><path fill="currentColor" d="M10.568 6.49c-.012.014-.555-.503-.568-.49l-4 4c-.013.013.504.556.49.568l9.588 9.587a2.883 2.883 0 1 0 4.078-4.077z"></path></svg>
            <span>Founding India cohort – first year at ₹899</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-tight nf-hero-animate">
            <span className="text-white/90"><em className="not-italic">Compose</em> your Indian money story.</span>
          </h1>
          <p className="text-lg lg:text-xl text-neutral-300 max-w-xl nf-hero-animate">
            Take control of salary, cards, investments and UPI — all in one place. Simple &amp; powerful, built for India.
          </p>
          <div className="flex flex-wrap items-center gap-3 nf-hero-animate">
            <a href="#signup" className="inline-flex items-center gap-2 rounded-full bg-white text-sm font-medium text-black px-5 py-3 shadow-[0_0_40px_rgba(250,250,250,0.35)] hover:bg-neutral-100 transition">
              <span>Join waitlist</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="iconify iconify--solar"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m9 5l6 7l-6 7"></path></svg>
            </a>
            <a href="#download" className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-400/10 text-sm font-medium text-indigo-100/90 px-5 py-3 hover:bg-indigo-400/15 transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="iconify iconify--solar"><path fill="currentColor" d="M3.845 3.845a2.883 2.883 0 0 0 0 4.077L5.432 9.51c.012-.014.555.503.568.49l4-4c.013-.013-.504-.556-.49-.568L7.922 3.845a2.883 2.883 0 0 0-4.077 0m1.288 11.462a.483.483 0 0 1 .9 0l.157.4a.48.48 0 0 0 .272.273l.398.157a.486.486 0 0 1 0 .903l-.398.158a.48.48 0 0 0-.272.273l-.157.4a.483.483 0 0 1-.9 0l-.157-.4a.48.48 0 0 0-.272-.273l-.398-.158a.486.486 0 0 1 0-.903l.398-.157a.48.48 0 0 0 .272-.274z" opacity=".5"></path><path fill="currentColor" d="M19.967 9.13a.483.483 0 0 1 .9 0l.156.399c.05.125.148.224.273.273l.398.158a.486.486 0 0 1 0 .902l-.398.158a.5.5 0 0 0-.273.273l-.156.4a.483.483 0 0 1-.9 0l-.157-.4a.5.5 0 0 0-.272-.273l-.398-.158a.486.486 0 0 1 0-.902l.398-.158a.5.5 0 0 0 .272-.273z" opacity=".2"></path><path fill="currentColor" d="M16.1 2.307a.483.483 0 0 1 .9 0l.43 1.095a.48.48 0 0 0 .272.274l1.091.432a.486.486 0 0 1 0 .903l-1.09.432a.5.5 0 0 0-.273.273L17 6.81a.483.483 0 0 1-.9 0l-.43-1.095a.5.5 0 0 0-.273-.273l-1.09-.432a.486.486 0 0 1 0-.903l1.09-.432a.5.5 0 0 0 .273-.274z" opacity=".7"></path><path fill="currentColor" d="M10.568 6.49c-.012.014-.555-.503-.568-.49l-4 4c-.013.013.504.556.49.568l9.588 9.587a2.883 2.883 0 1 0 4.078-4.077z"></path></svg>
              <span>₨899 only (Founding)</span>
            </a>
          </div>
        </div>

        {/* Right side mockup */}
        <div className="relative">
          <div className="relative rounded-3xl overflow-hidden">
            <img src="https://images.pexels.com/photos/6927447/pexels-photo-6927447.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="NueroFin dashboard" className="h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
