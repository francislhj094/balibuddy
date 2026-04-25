'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { priceData } from '@/lib/priceData';

const tabs = [
  { key: 'transport', label: '🚗 Transport' },
  { key: 'tours', label: '🗺️ Tours' },
  { key: 'wellness', label: '💆 Wellness' },
  { key: 'food', label: '🍜 Food & Drink' },
  { key: 'rentals', label: '🏍️ Rentals' },
  { key: 'essentials', label: '📋 Essentials' },
];

export default function PriceGuide() {
  const [active, setActive] = useState('transport');
  const rows = priceData[active] || [];

  return (
    <section id="prices" className="relative py-24 lg:py-28 px-6 section-glow">
      <div className="max-w-4xl mx-auto text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block text-xs font-semibold uppercase tracking-[0.15em] text-cyan-400"
        >
          Fair Price Guide
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] mt-4 mb-3"
        >
          What Things <span className="gradient-text">Actually Cost</span> in Bali
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="text-slate-400 mb-10"
        >
          Screenshot this. Share it with your friends. Never overpay again.
        </motion.p>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-2 flex-wrap mb-8"
        >
          {tabs.map(t => (
            <button key={t.key} onClick={() => setActive(t.key)}
              className={`relative px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-300 ${
                active === t.key
                  ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400 shadow-sm shadow-cyan-500/10'
                  : 'bg-[#1e293b] border-white/5 text-slate-400 hover:border-white/15 hover:text-slate-300'
              }`}>
              {t.label}
            </button>
          ))}
        </motion.div>

        {/* Table — desktop */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="glass rounded-2xl overflow-hidden"
          >
            {/* Desktop table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#1e293b]/80 border-b border-white/5">
                    <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">Service</th>
                    <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-emerald-500">Fair Price</th>
                    <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-red-400">Tourist Price</th>
                    <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-amber-400">You Save</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b border-white/[0.03] last:border-0 hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="px-5 py-4 text-sm text-slate-300">
                        {row.service}
                        {row.bookable && (
                          <span className="ml-2 inline-block text-[10px] font-bold uppercase tracking-wide bg-cyan-500/15 text-cyan-400 px-2 py-0.5 rounded-full">Book</span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-sm font-semibold text-emerald-400">{row.fair}</td>
                      <td className="px-5 py-4 text-sm font-semibold text-red-400/60 line-through">{row.scam}</td>
                      <td className="px-5 py-4 text-sm font-semibold text-amber-400">
                        {row.save ? (
                          <span className="inline-block px-2 py-0.5 rounded-full bg-amber-500/10 group-hover:bg-amber-500/20 transition-colors">
                            Save {row.save}
                          </span>
                        ) : '—'}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="sm:hidden divide-y divide-white/5">
              {rows.map((row, i) => (
                <div key={i} className="p-4 hover:bg-white/[0.02] transition-colors">
                  <div className="font-medium text-sm text-slate-200 mb-2">
                    {row.service}
                    {row.bookable && (
                      <span className="ml-2 text-[10px] font-bold uppercase bg-cyan-500/15 text-cyan-400 px-2 py-0.5 rounded-full">Book</span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-emerald-400 font-semibold">{row.fair}</span>
                    <span className="text-red-400/50 line-through text-xs">{row.scam}</span>
                    {row.save && (
                      <span className="ml-auto text-xs font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
                        Save {row.save}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Tip */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-6 mx-auto max-w-xl bg-amber-500/[0.06] border border-amber-500/15 rounded-xl px-6 py-4 text-sm text-slate-400"
        >
          💡 <strong className="text-slate-300">Pro tip:</strong> Show this page to your driver or vendor on your phone. Fair vendors will respect these prices — scammers will walk away. Either way, you win.
        </motion.div>
      </div>
    </section>
  );
}