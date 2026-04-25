'use client';
import { motion } from 'framer-motion';

export default function Testimonials() {
  const reviews = [
    { stars: 5, text: "Saved me from getting scammed at the airport on my first day. The fair price guide is literally a lifesaver. Showed it to every driver and vendor.", name: 'Sarah M.', loc: 'Melbourne, Australia', flag: '🇦🇺' },
    { stars: 5, text: "The AI itinerary was spot-on. It knew exactly which areas matched my vibe. And the private driver was the best decision of my trip — worth every rupiah.", name: 'James T.', loc: 'London, UK', flag: '🇬🇧' },
    { stars: 5, text: "My friends and I used to spend WEEKS planning Bali trips. This time it took 5 minutes. The WhatsApp support answered every question instantly, even at 2am.", name: 'Priya K.', loc: 'Mumbai, India', flag: '🇮🇳' },
  ];

  return (
    <section className="relative py-24 lg:py-28 px-6 section-glow">
      <div className="max-w-6xl mx-auto text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block text-xs font-semibold uppercase tracking-[0.15em] text-cyan-400"
        >
          Loved by Travelers
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] mt-4 mb-14"
        >
          Real Stories from <span className="gradient-text">Real Travelers</span>
        </motion.h2>

        <div className="grid sm:grid-cols-3 gap-6 text-left">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="relative glass rounded-2xl p-8 card-hover gradient-border shadow-xl shadow-black/20 group"
            >
              {/* Quote decoration */}
              <div className="absolute top-4 right-6 text-6xl font-serif text-cyan-500/[0.06] leading-none select-none pointer-events-none">&ldquo;</div>

              <div className="relative z-10">
                <div className="mb-4 flex gap-0.5">
                  {Array.from({ length: r.stars }).map((_, j) => (
                    <span key={j} className="text-amber-400 text-sm">★</span>
                  ))}
                </div>
                <p className="text-slate-400 text-sm leading-relaxed italic mb-6">&ldquo;{r.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#1e293b] flex items-center justify-center text-xl border border-white/5 group-hover:border-cyan-500/20 transition-colors">
                    {r.flag}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{r.name}</div>
                    <div className="text-xs text-slate-500">{r.loc}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}