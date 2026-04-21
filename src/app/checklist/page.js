// src/app/checklist/page.js
// Interactive Bali Arrival Checklist — SEO target: "bali packing list", "bali travel checklist 2026"
'use client';

import { useState } from 'react';
import Link from 'next/link';

const checklistSections = [
  {
    title: '📄 Before You Fly',
    emoji: '✈️',
    items: [
      'Valid passport (6+ months validity from arrival date)',
      'Visa on Arrival fee ready ($35 USD cash or card)',
      'Travel insurance purchased (medical + COVID coverage)',
      'Hotel booking confirmation printed/saved',
      'Return/onward flight ticket booked',
      'Custom declaration form (fill online at customs.go.id)',
      'Download Grab & Gojek apps',
      'Download Google Maps offline map for Bali',
      'Notify your bank about international travel',
      'Book airport transfer (avoid the taxi mafia on day 1)',
    ],
  },
  {
    title: '💰 Money & Payments',
    emoji: '🏦',
    items: [
      'Bring $100–200 USD in clean, new bills for exchange',
      'Get a travel-friendly debit card (no foreign ATM fees)',
      'Download Wise app for best exchange rates',
      'Know ATM locations: BCA and Bank Mandiri are best',
      'Carry small IDR notes (10K–20K) for tips and temples',
      'Set up mobile payment (GoPay via Gojek for convenience)',
    ],
  },
  {
    title: '📱 Connectivity',
    emoji: '📡',
    items: [
      'Buy eSIM before landing (Airalo or Holafly)',
      'Or: Buy physical SIM at airport (Telkomsel recommended)',
      'Save accommodation address and phone in offline notes',
      'Download WhatsApp (essential in Bali — everyone uses it)',
      'Save emergency numbers: Police 110, Ambulance 118, Tourist Police +62 361 224111',
    ],
  },
  {
    title: '👕 Packing Essentials',
    emoji: '🧳',
    items: [
      'Lightweight, breathable clothing (it\'s 30°C+ daily)',
      'Sarong/scarf for temple visits (or buy one there for 30K IDR)',
      'Reef-safe sunscreen SPF 50+ (coral protection)',
      'Insect repellent with DEET',
      'Universal power adapter (Type C/F, 230V)',
      'Waterproof phone pouch for water activities',
      'Comfortable walking sandals + one pair of closed shoes',
      'Rain jacket or lightweight poncho (especially Nov–Mar)',
      'Reusable water bottle (Bali has refill stations)',
      'Basic first-aid kit (Imodium, Paracetamol, plasters)',
    ],
  },
  {
    title: '🏥 Health & Safety',
    emoji: '⚕️',
    items: [
      'Check CDC/WHO vaccine recommendations (Hep A, Typhoid)',
      'Pack prescription medications with doctor\'s letter',
      'Know nearest international hospital (BIMC Kuta or Siloam)',
      'Drink only bottled/filtered water (never tap)',
      'Bring anti-diarrhea medication (Bali belly is common)',
      'Pack oral rehydration salts (ORS)',
      'Register with your embassy for travel advisories',
    ],
  },
  {
    title: '🙏 Cultural Must-Knows',
    emoji: '🕉️',
    items: [
      'Cover shoulders and knees at temples',
      'Don\'t touch anyone\'s head (considered sacred)',
      'Use right hand to give/receive items',
      'Don\'t step on offerings (canang sari) on the sidewalk',
      'Ask permission before photographing ceremonies',
      'Learn basic Bahasa: "Terima kasih" (thank you), "Permisi" (excuse me)',
      'Know Nyepi Day — island-wide silence day, no travel allowed',
    ],
  },
  {
    title: '🛬 At the Airport (Arrival)',
    emoji: '🛬',
    items: [
      'Proceed to Visa on Arrival counter FIRST (before immigration)',
      'Pay $35 VOA fee (Visa-free nationals may skip this)',
      'Go through immigration (have hotel address ready)',
      'Collect luggage and pass customs',
      'Exit and find your pre-booked driver (DO NOT follow random touts)',
      'If no pre-booked driver: use official airport taxi counter or Grab pickup zone',
      'Exchange only a small amount at the airport (rates are bad)',
    ],
  },
];

export default function ChecklistPage() {
  const [checked, setChecked] = useState({});

  const toggle = (sectionIdx, itemIdx) => {
    const key = `${sectionIdx}-${itemIdx}`;
    setChecked(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const totalItems = checklistSections.reduce((sum, s) => sum + s.items.length, 0);
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const progress = totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0;

  return (
    <main className="pt-28 pb-20 px-6 min-h-screen">
      <div className="max-w-3xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-cyan-400">Travel Checklist</span>
          <h1 className="font-display text-4xl sm:text-5xl mt-4 mb-4">
            2026 Bali <span className="gradient-text">Arrival Checklist</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Everything you need to prepare before your Bali trip. Check items off as you go — your progress is saved in this session.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="bg-[#111827] border border-white/5 rounded-xl p-5 mb-10 sticky top-[72px] z-40 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-slate-300">
              {checkedCount} of {totalItems} items checked
            </span>
            <span className={`text-sm font-bold ${progress === 100 ? 'text-emerald-400' : 'text-cyan-400'}`}>
              {progress}%
            </span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ease-out ${progress === 100 ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' : 'bg-gradient-to-r from-cyan-500 to-cyan-400'}`}
              style={{ width: `${progress}%` }}
            />
          </div>
          {progress === 100 && (
            <p className="text-emerald-400 text-xs mt-2 text-center animate-fade-in">🎉 You&apos;re fully prepared for Bali! Have an amazing trip!</p>
          )}
        </div>

        {/* Checklist Sections */}
        <div className="space-y-8">
          {checklistSections.map((section, si) => {
            const sectionChecked = section.items.filter((_, ii) => checked[`${si}-${ii}`]).length;
            const sectionComplete = sectionChecked === section.items.length;

            return (
              <section key={si} className={`bg-[#111827] border rounded-2xl overflow-hidden transition-colors ${sectionComplete ? 'border-emerald-500/30' : 'border-white/5'}`}>
                <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between">
                  <h2 className="font-display text-lg flex items-center gap-2">
                    {section.title}
                  </h2>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${sectionComplete ? 'bg-emerald-500/15 text-emerald-400' : 'bg-slate-500/15 text-slate-400'}`}>
                    {sectionChecked}/{section.items.length}
                  </span>
                </div>
                <div className="divide-y divide-white/5">
                  {section.items.map((item, ii) => {
                    const isChecked = checked[`${si}-${ii}`];
                    return (
                      <label
                        key={ii}
                        className={`flex items-start gap-4 px-6 py-4 cursor-pointer transition-colors hover:bg-white/[0.02] ${isChecked ? 'opacity-60' : ''}`}
                      >
                        <div className="mt-0.5 flex-shrink-0">
                          <div
                            onClick={() => toggle(si, ii)}
                            className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all cursor-pointer ${
                              isChecked
                                ? 'bg-cyan-500 border-cyan-500'
                                : 'border-slate-600 hover:border-cyan-500/50'
                            }`}
                          >
                            {isChecked && (
                              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                        </div>
                        <span className={`text-sm leading-relaxed ${isChecked ? 'line-through text-slate-500' : 'text-slate-300'}`}>
                          {item}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 border border-cyan-500/20 rounded-2xl p-10">
          <h3 className="font-display text-2xl mb-3">Need an Airport Transfer?</h3>
          <p className="text-slate-400 mb-6 max-w-lg mx-auto">
            Don&apos;t stress about day 1. Pre-book a vetted driver who&apos;ll meet you at arrivals with your name on a sign.
          </p>
          <Link href="/services" className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 text-gray-900 font-semibold text-sm shadow-md hover:shadow-cyan-500/25 transition-all hover:-translate-y-0.5">
            Book Airport Transfer — IDR 200K
          </Link>
        </div>
      </div>
    </main>
  );
}
