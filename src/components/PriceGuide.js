'use client';
import { useState } from 'react';
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
    <section id="prices" className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-cyan-400">Fair Price Guide</span>
        <h2 className="font-display text-3xl sm:text-4xl mt-4 mb-3">What Things <span className="gradient-text">Actually Cost</span> in Bali</h2>
        <p className="text-slate-400 mb-10">Screenshot this. Share it with your friends. Never overpay again.</p>

        {/* Tabs */}
        <div className="flex justify-center gap-2 flex-wrap mb-8">
          {tabs.map(t => (
            <button key={t.key} onClick={() => setActive(t.key)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-all ${
                active === t.key
                  ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400'
                  : 'bg-[#1e293b] border-white/5 text-slate-400 hover:border-white/15'
              }`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-[#111827] border border-white/5 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#1e293b] border-b border-white/5">
                  <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">Service</th>
                  <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-emerald-500">Fair Price</th>
                  <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-red-400">Tourist Price</th>
                  <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-amber-400">You Save</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className="border-b border-white/3 last:border-0 hover:bg-white/[0.02] transition">
                    <td className="px-5 py-4 text-sm text-slate-300">
                      {row.service}
                      {row.bookable && (
                        <span className="ml-2 inline-block text-[10px] font-bold uppercase tracking-wide bg-cyan-500/15 text-cyan-400 px-2 py-0.5 rounded-full">Book</span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold text-emerald-400">{row.fair}</td>
                    <td className="px-5 py-4 text-sm font-semibold text-red-400/60 line-through">{row.scam}</td>
                    <td className="px-5 py-4 text-sm font-semibold text-amber-400">{row.save ? `Save ${row.save}` : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tip */}
        <div className="mt-6 mx-auto max-w-xl bg-amber-500/5 border border-amber-500/15 rounded-xl px-6 py-4 text-sm text-slate-400">
          💡 <strong className="text-slate-300">Pro tip:</strong> Show this page to your driver or vendor on your phone. Fair vendors will respect these prices — scammers will walk away. Either way, you win.
        </div>
      </div>
    </section>
  );
}