'use client';
import { useState } from 'react';

const services = [
  { id: 'airport-transfer', emoji: '✈️', title: 'Airport Transfer', desc: 'AC car, meet & greet at arrivals, help with bags. No meter tricks, no surprises.', price: 'IDR 200K', usd: '~$12 USD', badge: 'Most Popular', img: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=600&q=80' },
  { id: 'day-driver', emoji: '🚗', title: 'Private Day Driver', desc: 'English-speaking driver for 10 hours. Go wherever you want. Fuel and parking included.', price: 'IDR 600K', usd: '~$37 USD', img: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80' },
  { id: 'ubud-tour', emoji: '🌋', title: 'Ubud Day Tour', desc: 'Rice terraces, monkey forest, waterfall, coffee plantation, temple. Lunch included.', price: 'IDR 500K', usd: '~$31 USD', img: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=600&q=80' },
  { id: 'nusa-penida', emoji: '🤿', title: 'Nusa Penida Tour', desc: 'Kelingking Beach, Angel\'s Billabong, Broken Beach, Crystal Bay. Boat + driver included.', price: 'IDR 750K', usd: '~$46 USD', img: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=600&q=80' },
  { id: 'spa', emoji: '💆', title: 'Spa & Wellness Package', desc: '2-hour Balinese massage + flower bath + body scrub at a vetted premium spa.', price: 'IDR 350K', usd: '~$22 USD', img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80' },
  { id: 'esim', emoji: '📱', title: 'Bali eSIM + Setup', desc: '30-day unlimited data eSIM. Pre-activated before you land. No SIM card hassle.', price: '$8 USD', usd: '', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80' },
];

export default function Services() {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ name: '', whatsapp: '', date: '', location: '', notes: '' });

  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '628XXXXXXXXXX';

  const submit = () => {
    const msg = `Hi BaliBuddy! I'd like to book: ${modal}\n\nName: ${form.name}\nDate: ${form.date}\nPickup: ${form.location}\nNotes: ${form.notes}`;
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`, '_blank');
    setModal(null);
    setForm({ name: '', whatsapp: '', date: '', location: '', notes: '' });
  };

  return (
    <section id="services" className="py-24 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-cyan-400">Trusted Services</span>
        <h2 className="font-display text-3xl sm:text-4xl mt-4 mb-3">Book With <span className="gradient-text">Confidence</span></h2>
        <p className="text-slate-400 mb-14 max-w-xl mx-auto">Every driver and guide is personally vetted, reviewed, and insured. Fixed prices. No surprises.</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {services.map(s => (
            <div key={s.id} className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden card-hover relative shadow-xl shadow-black/20">
              <div 
                className="h-40 bg-cover bg-center relative flex items-center justify-center"
                style={{ backgroundImage: `url('${s.img}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent" />
                <span className="text-5xl filter grayscale relative z-10 opacity-90">{s.emoji}</span>
              </div>
              <div className="p-6">
                {s.badge && <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">{s.badge}</span>}
                <h3 className="font-display text-lg mt-1 mb-2">{s.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{s.desc}</p>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-xs text-slate-500">From</span>
                  <span className="font-display text-xl text-cyan-400">{s.price}</span>
                  {s.usd && <span className="text-xs text-slate-500">{s.usd}</span>}
                </div>
                <button onClick={() => setModal(s.title)}
                  className="w-full py-3 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 text-gray-900 font-semibold text-sm hover:-translate-y-0.5 transition-all shadow-md shadow-cyan-500/15">
                  Book {s.title.split(' ')[0]}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {modal && (
        <div className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-center justify-center p-6" onClick={() => setModal(null)}>
          <div className="bg-[#111827] border border-white/5 rounded-2xl p-8 max-w-md w-full relative max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <button onClick={() => setModal(null)} className="absolute top-4 right-4 text-slate-500 hover:text-white text-lg">✕</button>
            <h3 className="font-display text-xl mb-6">Book: {modal}</h3>
            <div className="space-y-4">
              {[
                { key: 'name', label: 'Your Name', type: 'text', placeholder: 'e.g. Sarah Miller' },
                { key: 'whatsapp', label: 'WhatsApp Number', type: 'tel', placeholder: 'e.g. +61 4XX XXX XXX' },
                { key: 'date', label: 'Date Needed', type: 'date' },
                { key: 'location', label: 'Pickup Location / Hotel', type: 'text', placeholder: 'e.g. Alila Seminyak' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder || ''} value={form[f.key]}
                    onChange={e => setForm({...form, [f.key]: e.target.value})}
                    className="w-full bg-[#1e293b] border border-white/5 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-cyan-500/50 transition" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Notes (optional)</label>
                <textarea rows={3} placeholder="e.g. 2 large suitcases, arriving at 10pm" value={form.notes}
                  onChange={e => setForm({...form, notes: e.target.value})}
                  className="w-full bg-[#1e293b] border border-white/5 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-cyan-500/50 transition resize-none" />
              </div>
              <button onClick={submit}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 text-gray-900 font-semibold text-sm">
                Confirm Booking via WhatsApp
              </button>
              <p className="text-center text-xs text-slate-500 mt-2">
                You'll receive a WhatsApp confirmation within 5 minutes with your driver's name, photo, and car details.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}