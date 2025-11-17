import { useRef, useEffect } from 'react';

export default function SpendingSection() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const leftBadgeRef = useRef(null);
  const rightBadgeRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const img = imgRef.current;
    const left = leftBadgeRef.current;
    const right = rightBadgeRef.current;
    [img, left, right].forEach(el => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(26px) scale(0.98)';
    });

    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        [img, left, right].forEach((el, idx) => {
          if (!el) return;
          setTimeout(() => {
            el.style.transition = 'opacity 0.45s ease-out, transform 0.45s ease-out';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0) scale(1)';
          }, idx * 90);
        });
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.3 });
    io.observe(sectionRef.current);
  }, []);

  return (
    <section id="spending" className="relative" ref={sectionRef}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-center">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border-emerald-200/15 bg-emerald-400/5 px-3 py-1.5 text-xs font-medium tracking-wide text-emerald-100/90 shadow-[0_0_30px_rgba(16,185,129,0.25)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className="iconify text-emerald-300"><path fill="currentColor" d="M3.845 3.845a2.883 2.883 0 0 0 0 4.077L5.432 9.51c.012-.014.555.503.568.49l4-4c.013-.013-.504-.556-.49-.568L7.922 3.845a2.883 2.883 0 0 0-4.077 0m1.288 11.462a.483.483 0 0 1 .9 0l.157.4a.48.48 0 0 0 .272.273l.398.157a.486.486 0 0 1 0 .903l-.398.158a.48.48 0 0 0-.272.273l-.157.4a.483.483 0 0 1-.9 0l-.157-.4a.48.48 0 0 0-.272-.273l-.398-.158a.486.486 0 0 1 0-.903l.398-.157a.48.48 0 0 0 .272-.274z" opacity=".5"></path><path fill="currentColor" d="M19.967 9.13a.483.483 0 0 1 .9 0l.156.399c.05.125.148.224.273.273l.398.158a.486.486 0 0 1 0 .902l-.398.158a.5.5 0 0 0-.273.273l-.156.4a.483.483 0 0 1-.9 0l-.157-.4a.5.5 0 0 0-.272-.273l-.398-.158a.486.486 0 0 1 0-.902l.398-.158a.5.5 0 0 0 .272-.273z" opacity=".2"></path><path fill="currentColor" d="M16.1 2.307a.483.483 0 0 1 .9 0l.43 1.095a.48.48 0 0 0 .272.274l1.091.432a.486.486 0 0 1 0 .903l-1.09.432a.5.5 0 0 0-.273.273L17 6.81a.483.483 0 0 1-.9 0l-.43-1.095a.5.5 0 0 0-.273-.273l-1.09-.432a.486.486 0 0 1 0-.903l1.09-.432a.5.5 0 0 0 .273-.274z" opacity=".7"></path><path fill="currentColor" d="M10.568 6.49c-.012.014-.555-.503-.568-.49l-4 4c-.013.013.504.556.49.568l9.588 9.587a2.883 2.883 0 1 0 4.078-4.077z"></path></svg>
              <span>Direct bank sync (190+ institutions)</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight">
              <em className="not-italic">Simplify</em> every rupee in motion.
            </h2>
            <p className="text-base sm:text-lg text-neutral-300">
              Link Indian bank accounts, salary, cards and wallets in minutes. NueroFin keeps them clean, auto‑categorised and de‑duplicated.
            </p>
          </div>

          <div className="relative w-full max-w-3xl">
            <div className="pointer-events-none absolute -top-6 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.25),_transparent_60%)] blur-2xl"></div>
            <div className="relative mx-auto max-w-md nf-phone-wrapper">
              <div className="rounded-[1.75rem] border border-white/15 bg-gradient-to-br from-neutral-900/95 via-black to-neutral-950 shadow-[0_30px_120px_rgba(15,23,42,0.85)] overflow-hidden">
                <img
                  ref={imgRef}
                  src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/44cd4dc8-e179-4757-ab22-93db367d24e3_1600w.jpg"
                  alt="Phone view NueroFin"
                  className="select-none nf-phone-img w-full h-auto object-cover bg-center"
                  loading="lazy"
                />
              </div>
              <div ref={leftBadgeRef} className="absolute -left-10 top-1/2 hidden -translate-y-1/2 rounded-2xl bg-black/70 px-3 py-2 text-xs text-neutral-200 shadow-xl border border-white/10 sm:flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className="iconify text-sky-400"><path fill="currentColor" d="m22 12.818l-.409-.409a2.25 2.25 0 0 0-3.182 0l-.801.801a2.251 2.251 0 0 0-4.358.79v1.764a2.25 2.25 0 0 0-1.341 3.827l.409.409H10c-3.771 0-5.657 0-6.828-1.172S2 15.771 2 12c0-.442.002-1.608.004-2H22c.002.392 0 1.558 0 2z" opacity=".5"></path><path fill="currentColor" d="M5.25 16a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75M9.995 4h4.01c3.781 0 5.672 0 6.846 1.116c.846.803 1.083 1.96 1.149 3.884v1H2V9c.066-1.925.303-3.08 1.149-3.884C4.323 4 6.214 4 9.995 4m9.475 9.47a.75.75 0 0 1 1.06 0l2 2a.75.75 0 1 1-1.06 1.06l-.72-.72V20a.75.75 0 0 1-1.5 0v-4.19l-.72.72a.75.75 0 1 1-1.06-1.06z" fillRule="evenodd"></path></svg>
                <span>Connects with 380+ Indian banks &amp; card issuers</span>
              </div>
              <div ref={rightBadgeRef} className="absolute -right-10 top-[60%] hidden translate-y-[-50%] rounded-2xl bg-black/70 px-3 py-2 text-xs text-neutral-200 shadow-xl border border-white/10 sm:flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className="iconify text-emerald-400"><path fill="currentColor" d="M3.378 5.082C3 5.62 3 7.22 3 10.417v1.574c0 5.638 4.239 8.375 6.899 9.536c.721.315 1.082.473 2.101.473c1.02 0 1.38-.158 2.101-.473C16.761 20.365 21 17.63 21 11.991v-1.574c0-3.198 0-4.797-.378-5.335c-.377-.537-1.88-1.052-4.887-2.081l-.573-.196C13.595 2.268 12.812 2 12 2s-1.595.268-3.162.805L8.265 3c-3.007 1.03-4.51 1.545-4.887 2.082" opacity=".5"></path><path fill="currentColor" d="M15.06 10.5a.75.75 0 0 0-1.12-1l-3.011 3.374l-.87-.974a.75.75 0 0 0-1.118 1l1.428 1.6a.75.75 0 0 0 1.119 0z"></path></svg>
                <span>Read‑only access with RBI‑grade encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
