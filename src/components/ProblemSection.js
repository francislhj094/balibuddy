'use client';
import { motion } from 'framer-motion';

export default function ProblemSection() {
  const problems = [
    { emoji: '😤', title: 'Overcharged Everywhere', desc: 'Airport taxi quotes 500K IDR for a ride that should cost 175K. Tour operators charge 3x the fair price. You never know what\'s real.', color: 'from-red-500/10 to-transparent' },
    { emoji: '😰', title: 'Hours of Research', desc: 'Reddit threads, TikTok videos, Facebook groups, outdated blogs — you spend more time planning than actually enjoying Bali.', color: 'from-amber-500/10 to-transparent' },
    { emoji: '🤷', title: 'Who Do You Trust?', desc: 'Random WhatsApp drivers, unreviewed tour operators, fake Gojek jackets — it\'s impossible to know who\'s legit as a first-timer.', color: 'from-purple-500/10 to-transparent' },
  ];

  return (
    <section className="relative py-24 lg:py-28 px-6 section-glow">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-semibold uppercase tracking-[0.15em] text-cyan-400"
          >
            The Problem
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] mt-4"
          >
            Bali Is Amazing. <span className="gradient-text">Planning It Shouldn&apos;t Be Painful.</span>
          </motion.h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {problems.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="relative group glass rounded-2xl p-9 card-hover gradient-border shadow-xl shadow-black/20 overflow-hidden"
            >
              {/* Subtle gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />
              <div className="relative z-10">
                <div className="text-4xl mb-5 group-hover:scale-110 transition-transform duration-300">{p.emoji}</div>
                <h3 className="font-display text-xl mb-3">{p.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}