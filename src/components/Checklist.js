'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Checklist() {
  const items = [
    'Pay Tourist Levy (IDR 150K) online before arrival',
    'Download "All Indonesia" arrivals app',
    'Prepare proof of funds (~$2,000 USD)',
    'Get eSIM before boarding',
    'Book airport transfer in advance',
    'Pack sarong for temple visits',
    'Get International Driving Permit (if riding scooter)',
  ];

  return (
    <section className="relative py-24 lg:py-28 px-6 section-glow">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-10 sm:p-12 grid sm:grid-cols-2 gap-12 items-center gradient-border"
        >
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-cyan-400">Free Resource</span>
            <h2 className="font-display text-3xl sm:text-4xl mt-4 mb-4">2026 Bali<br />Arrival Checklist</h2>
            <p className="text-slate-400 mb-6 leading-relaxed">Don&apos;t miss any of the new rules. Tourist levy, proof of funds, customs app, cultural dos &amp; don&apos;ts — all in one page.</p>
            <Link
              href="/checklist"
              className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 text-gray-900 font-semibold hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-cyan-500/20"
            >
              📋 View Full Checklist
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-[#1e293b]/70 rounded-lg px-4 py-3 text-sm border-l-[3px] border-emerald-400 hover:bg-[#1e293b] transition-colors"
              >
                ✅ {item}
              </motion.div>
            ))}
            <div className="bg-[#1e293b]/40 rounded-lg px-4 py-3 text-sm border-l-[3px] border-slate-600 text-slate-500 italic">
              + 8 more items...
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}