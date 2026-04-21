export default function Testimonials() {
  const reviews = [
    { stars: 5, text: "Saved me from getting scammed at the airport on my first day. The fair price guide is literally a lifesaver. Showed it to every driver and vendor.", name: 'Sarah M.', loc: 'Melbourne, Australia', flag: '🇦🇺' },
    { stars: 5, text: "The AI itinerary was spot-on. It knew exactly which areas matched my vibe. And the private driver was the best decision of my trip — worth every rupiah.", name: 'James T.', loc: 'London, UK', flag: '🇬🇧' },
    { stars: 5, text: "My friends and I used to spend WEEKS planning Bali trips. This time it took 5 minutes. The WhatsApp support answered every question instantly, even at 2am.", name: 'Priya K.', loc: 'Mumbai, India', flag: '🇮🇳' },
  ];
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-cyan-400">Loved by Travelers</span>
        <h2 className="font-display text-3xl sm:text-4xl mt-4 mb-14">Real Stories from <span className="gradient-text">Real Travelers</span></h2>
        <div className="grid sm:grid-cols-3 gap-6 text-left">
          {reviews.map((r, i) => (
            <div key={i} className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 card-hover shadow-xl shadow-black/20">
              <div className="mb-4">{'⭐'.repeat(r.stars)}</div>
              <p className="text-slate-400 text-sm leading-relaxed italic mb-5">"{r.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#1e293b] flex items-center justify-center text-xl">{r.flag}</div>
                <div>
                  <div className="font-semibold text-sm">{r.name}</div>
                  <div className="text-xs text-slate-500">{r.loc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}