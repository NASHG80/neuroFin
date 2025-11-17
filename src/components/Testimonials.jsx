import { useEffect, useRef } from 'react';

export default function Testimonials() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll('.nf-quote-card');
    cards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(22px)';
    });

    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        cards.forEach((card, idx) => {
          setTimeout(() => {
            card.style.transition = 'opacity 0.35s ease-out, transform 0.35s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, idx * 80);
        });
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.3 });
    io.observe(sectionRef.current);
  }, []);

  const testimonials = [
    {
      img: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4734259a-bad7-422f-981e-ce01e79184f2_1600w.jpg',
      text: "“NueroFin is the first app where my salary, UPI and credit cards actually talk to each other. I finally know my real monthly burn.”",
      name: 'DEVESH R.',
      meta: 'Joined Jan 2027 • Bengaluru'
    },
    {
      img: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/c543a9e1-f226-4ced-80b0-feb8445a75b9_1600w.jpg',
      text: "“My partner and I share goals like home and travel, but still keep our personal spends private. NueroFin gets Indian families.”",
      name: 'PRIYANKA S.',
      meta: 'Joined Mar 2027 • Mumbai'
    },
    {
      img: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      text: "“The AI suggestions feel like a planner who already knows my rent, EMIs and parents’ medical spends in detail.”",
      name: 'KABIR L.',
      meta: 'Joined May 2027 • Delhi NCR'
    },
    {
      img: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/5bab247f-35d9-400d-a82b-fd87cfe913d2_1600w.webp',
      text: "“I found and cancelled 9 unused subscriptions in one evening. The savings alone pay for NueroFin every month.”",
      name: 'ALISHA V.',
      meta: 'Joined Aug 2027 • Hyderabad'
    }
  ];

  // Duplicate for looping effect (simplified)
  const windows = [testimonials, testimonials];

  return (
    <section id="nf-testimonials" className="relative" ref={sectionRef}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20">
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-light tracking-tight">
            <span className="not-italic"><em>Hear</em> from the first NueroFin cohorts.</span>
          </h2>
        </div>
        <div className="mt-7 overflow-x-auto">
          <div className="flex gap-4 pb-4">
            {windows.map((group, gi) => (
              <div key={gi} className="flex gap-4">
                {group.map((t, idx) => (
                  <article key={gi*4+idx} className="nf-quote-card min-w-[18rem] max-w-xs rounded-2xl border border-white/12 bg-white/5 p-4 shadow-[0_20px_70px_rgba(15,23,42,0.85)] flex flex-col justify-between">
                    <div className="flex items-center justify-between gap-2">
                      <img src={t.img} alt="rating" className="h-8 w-8 rounded-full object-cover" loading="lazy" />
                      <span className="text-[0.68rem] text-neutral-400">{t.meta}</span>
                    </div>
                    <p className="mt-3 text-[0.8rem] text-neutral-100">{t.text}</p>
                    <div className="mt-4 text-[0.7rem] font-medium text-neutral-300">{t.name}</div>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
