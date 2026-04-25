'use client';
import { motion } from 'framer-motion';

export default function HowItWorks() {
  const steps = [
    { num: '01', title: 'Plan for Free', desc: 'Use our AI trip planner to create a personalized itinerary based on your style, budget, and interests.', icon: '✨' },
    { num: '02', title: 'Book Trusted Services', desc: 'Book vetted drivers, tours, and experiences at transparent, fixed prices. No haggling, no scams.', icon: '🤝' },
    { num: '03', title: 'Enjoy Bali', desc: 'Your driver is waiting at the airport. Your itinerary is on your phone. Just relax and explore.', icon: '🌴' },
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
          How It Works
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] mt-4 mb-16"
        >
          From Planning to Paradise <span className="gradient-text">in 3 Steps</span>
        </motion.h2>

        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center gap-6 sm:gap-4">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center sm:flex-col gap-4 sm:gap-0 w-full sm:w-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.5 }}
                className="flex-1 sm:max-w-[300px] glass rounded-2xl p-8 sm:p-9 text-left sm:text-center group gradient-border"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{s.icon}</div>
                <div className="font-display text-4xl text-cyan-400/20 mb-3">{s.num}</div>
                <h3 className="font-display text-lg mb-3">{s.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>

              {/* Arrow connector */}
              {i < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 + 0.3 }}
                  className="hidden sm:flex items-center justify-center w-10 mt-16"
                >
                  <div className="flex items-center gap-1">
                    <div className="w-6 h-px bg-gradient-to-r from-cyan-500/40 to-cyan-500/10" />
                    <svg className="w-3 h-3 text-cyan-500/40" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}