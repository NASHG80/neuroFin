import { useState, useEffect, useRef } from 'react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Parallax effect
  const bgRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      if (!bgRef.current) return;
      const y = window.scrollY || window.pageYOffset;
      const offset = y * 0.12;
      bgRef.current.style.transform = `translate3d(0, ${-offset}px, 0)`;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header id="nf-nav" className="sticky top-0 z-40 border-b border-white/5 bg-black/70 backdrop-blur-xl">
      {/* Parallax background */}
      <div
        ref={bgRef}
        id="nf-parallax-bg"
        className="pointer-events-none fixed inset-0 -z-10 opacity-40"
      >
        <div className="absolute -top-1/4 -left-1/3 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(96,165,250,0.18),_transparent_60%)] blur-3xl"></div>
        <div className="absolute -bottom-1/3 right-[-20%] h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(244,114,182,0.16),_transparent_60%)] blur-3xl"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(148,163,184,0.14),_transparent_55%)]"></div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex w-9 h-9 bg-[url('https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/2fd5a08b-56a4-47b8-95f4-1f531433a320_800w.jpg')] bg-contain rounded-xl shadow-[0_0_40px_rgba(56,189,248,0.45)] items-center justify-center">
              <span className="text-xs font-semibold tracking-[0.22em] text-black">NF</span>
            </div>
            <span className="hidden text-xs font-medium tracking-[0.28em] text-neutral-100/90 sm:inline-block">
              NUEROFIN
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-6 text-sm font-medium text-neutral-300/80 md:flex">
            <div className="relative group">
              <button className="flex items-center gap-1.5 text-sm font-medium text-neutral-200 hover:text-white transition-colors">
                <span>Service</span>
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="16" height="16" viewBox="0 0 24 24" className="iconify iconify--solar"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m19 9l-7 6l-7-6"></path></svg>
              </button>
              <div className="pointer-events-none absolute left-0 top-full mt-3 w-52 rounded-2xl border border-white/8 bg-black/80 opacity-0 shadow-2xl shadow-sky-500/10 backdrop-blur-2xl transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
                <div className="flex flex-col py-2 text-xs text-neutral-200">
                  <a href="#spending" className="flex items-center gap-2 px-3 py-2 hover:bg-white/5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="iconify text-sky-400"><path fill="none" fillRule="evenodd" d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path><path fill="currentColor" d="M5 6.5a.5.5 0 0 1 .5-.5H16a1 1 0 1 0 0-2H5.5A2.5 2.5 0 0 0 3 6.5V18a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H5.5a.5.5 0 0 1-.5-.5M15.5 15a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3"></path></svg>
                    <span>Spends &amp; Budgets</span>
                  </a>
                  <a href="#automation" className="flex items-center gap-2 px-3 py-2 hover:bg-white/5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="iconify text-emerald-400"><path fill="none" d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path><path fill="currentColor" d="M22 10v7a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-7zm-4 4h-3a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2m1-10a3 3 0 0 1 3 3v1H2V7a3 3 0 0 1 3-3z"></path></svg>
                    <span>UPI &amp; Bills</span>
                  </a>
                  <a href="#forecasting" className="flex items-center gap-2 px-3 py-2 hover:bg-white/5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="iconify text-indigo-400"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m9 5l6 7l-6 7"></path></svg>
                    <span>Future Planner</span>
                  </a>
                </div>
              </div>
            </div>
            <a href="#families" className="rounded-lg px-3 py-2 hover:bg-white/5">Family Spaces</a>
            <a href="#employers" className="rounded-lg px-3 py-2 hover:bg-white/5">For Companies</a>
            <a href="#resources" className="rounded-lg px-3 py-2 hover:bg-white/5">Launch Notes</a>
            <a href="#login" className="rounded-lg px-3 py-2 hover:bg-white/5">Log in</a>
            <a href="#signup" className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-medium text-black shadow-[0_0_40px_rgba(250,250,250,0.4)] hover:bg-neutral-100">
              <span>Join early access</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="iconify iconify--solar"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m9 5l6 7l-6 7"></path></svg>
            </a>
          </nav>

          {/* Mobile menu button */}
          <button id="nf-mobile-menu-btn" className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <nav id="nf-mobile-menu" className={`${mobileMenuOpen ? '' : 'hidden'} md:hidden border-t border-white/10 bg-black/70 backdrop-blur-xl`}>
        <div className="px-4 py-2 space-y-2">
          <a href="#spending" className="block px-3 py-2 rounded-lg hover:bg-white/5">Spends &amp; Budgets</a>
          <a href="#automation" className="block px-3 py-2 rounded-lg hover:bg-white/5">UPI &amp; Bills</a>
          <a href="#forecasting" className="block px-3 py-2 rounded-lg hover:bg-white/5">Future Planner</a>
          <a href="#families" className="block px-3 py-2 rounded-lg hover:bg-white/5">Family Spaces</a>
          <a href="#employers" className="block px-3 py-2 rounded-lg hover:bg-white/5">For Companies</a>
          <a href="#resources" className="block px-3 py-2 rounded-lg hover:bg-white/5">Launch Notes</a>
          <a href="#login" className="block px-3 py-2 rounded-lg hover:bg-white/5">Log in</a>
          <a href="#signup" className="block px-3 py-2 rounded-lg bg-white text-black">Join early access</a>
        </div>
      </nav>
    </header>
  );
}
