export default function HowItWorks() {
  const steps = [
    { num: '01', title: 'Plan for Free', desc: 'Use our AI trip planner to create a personalized itinerary based on your style, budget, and interests.' },
    { num: '02', title: 'Book Trusted Services', desc: 'Book vetted drivers, tours, and experiences at transparent, fixed prices. No haggling, no scams.' },
    { num: '03', title: 'Enjoy Bali', desc: 'Your driver is waiting at the airport. Your itinerary is on your phone. Just relax and explore.' },
  ];
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-cyan-400">How It Works</span>
        <h2 className="font-display text-3xl sm:text-4xl mt-4 mb-14">From Planning to Paradise <span className="gradient-text">in 3 Steps</span></h2>
        <div className="flex flex-col sm:flex-row items-start justify-center gap-6">
          {steps.map((s, i) => (
            <div key={i} className="flex-1 max-w-xs bg-[#111827] border border-white/5 rounded-2xl p-9">
              <div className="font-display text-4xl text-cyan-400/30 mb-4">{s.num}</div>
              <h3 className="font-display text-lg mb-3">{s.title}</h3>
              <p className="text-slate-400 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}