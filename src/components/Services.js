'use client';
import { useState } from 'react';

const services = [
  { id: 'airport-transfer', emoji: '✈️', title: 'Airport Transfer', desc: 'AC car, meet & greet at arrivals, help with bags. No meter tricks, no surprises.', price: 'IDR 200K', usd: '~$12 USD', badge: 'Most Popular', img: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=600&q=80' },
  { id: 'day-driver', emoji: '🚗', title: 'Private Day Driver', desc: 'English-speaking driver for 10 hours. Go wherever you want. Fuel and parking included.', price: 'IDR 600K', usd: '~$37 USD', img: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80' },
  { id: 'ubud-tour', emoji: '🌋', title: 'Ubud Day Tour', desc: 'Rice terraces, monkey forest, waterfall, coffee plantation, temple. Lunch included.', price: 'IDR 500K', usd: '~$31 USD', img: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=600&q=80' },
  { id: 'nusa-penida', emoji: '🤿', title: 'Nusa Penida Tour', desc: 'Kelingking Beach, Angel\'s Billabong, Broken Beach, Crystal Bay. Boat + driver included.', price: 'IDR 750K', usd: '~$46 USD', img: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=600&q=80' },
  { id: 'spa', emoji: '💆', title: 'Spa & Wellness Package', desc: '2-hour Balinese massage + flower bath + body scrub at a vetted premium spa.', price: 'IDR 350K', usd: '~$22 USD', img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80' },
  { id: 'esim', emoji: '📱', title: 'Bali eSIM + Setup', desc: '30-day unlimited data eSIM. Pre-activated before you land. No SIM card hassle.', price: '$4.50 USD', usd: '', badge: 'Recommended', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80', affiliate: true, affiliateUrl: 'https://www.airalo.com/indonesia?ref=balibuddy' },
];

export default function Services() {
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6282341834263';
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ name: '', date: '', hotel: '', people: '2', notes: '' });

  const openBooking = (service) => {
    setModal(service);
    setForm({ name: '', date: '', hotel: '', people: '2', notes: '' });
  };

  const sendBooking = () => {
    const s = modal;
    const lines = [
      `🌴 *BaliBuddy Booking Request*`,
      ``,
      `📋 *Service:* ${s.emoji} ${s.title}`,
      `💰 *Price:* ${s.price} ${s.usd ? `(${s.usd})` : ''}`,
      ``,
      form.name ? `👤 *Name:* ${form.name}` : null,
      form.date ? `📅 *Date:* ${form.date}` : null,
      form.hotel ? `🏨 *Hotel/Location:* ${form.hotel}` : null,
      form.people ? `👥 *People:* ${form.people}` : null,
      form.notes ? `📝 *Notes:* ${form.notes}` : null,
      ``,
      `Please confirm availability and send driver details. Thank you! 🙏`,
    ].filter(Boolean).join('\n');

    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(lines)}`, '_blank');
    setModal(null);
  };

  return (
    <>
      <section id="services" className="py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-cyan-400">Trusted Services</span>
          <h2 className="font-display text-3xl sm:text-4xl mt-4 mb-3">Book With <span className="gradient-text">Confidence</span></h2>
          <p className="text-slate-400 mb-14 max-w-xl mx-auto">Every driver and guide is personally vetted, reviewed, and insured. Fixed prices. No surprises.</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {services.map(s => (
              <div key={s.id} className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden card-hover relative shadow-xl shadow-black/20 flex flex-col">
                <div 
                  className="h-40 bg-cover bg-center relative flex items-center justify-center"
                  style={{ backgroundImage: `url('${s.img}')` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent" />
                  <span className="text-5xl filter grayscale relative z-10 opacity-90">{s.emoji}</span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  {s.badge && <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">{s.badge}</span>}
                  <h3 className="font-display text-lg mt-1 mb-2">{s.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">{s.desc}</p>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-xs text-slate-500">From</span>
                    <span className="font-display text-xl text-cyan-400">{s.price}</span>
                    {s.usd && <span className="text-xs text-slate-500">{s.usd}</span>}
                  </div>
                  {s.affiliate ? (
                    <a
                      href={s.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-3 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 text-gray-900 font-semibold text-sm text-center hover:-translate-y-0.5 transition-all shadow-md shadow-cyan-500/15"
                    >
                      Get eSIM →
                    </a>
                  ) : (
                    <button 
                      onClick={() => openBooking(s)}
                      className="block w-full py-3 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 text-gray-900 font-semibold text-sm text-center hover:-translate-y-0.5 transition-all shadow-md shadow-cyan-500/15 cursor-pointer"
                    >
                      Book {s.title.split(' ')[0]}
                    </button>
                  )}
                  {s.affiliate && <p className="text-[10px] text-slate-600 text-center mt-2">Affiliate link — we may earn a commission</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {modal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
          onClick={(e) => { if (e.target === e.currentTarget) setModal(null); }}
        >
          <div className="bg-[#111827] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl animate-fade-in-up overflow-hidden">
            {/* Header */}
            <div className="px-6 pt-6 pb-4 border-b border-white/5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-cyan-400 font-semibold uppercase tracking-wider mb-1">Book via WhatsApp</p>
                  <h3 className="font-display text-xl">{modal.emoji} {modal.title}</h3>
                </div>
                <button onClick={() => setModal(null)} className="text-slate-500 hover:text-white text-2xl leading-none transition-colors">✕</button>
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-xs text-slate-500">From</span>
                <span className="font-display text-lg text-cyan-400">{modal.price}</span>
                {modal.usd && <span className="text-xs text-slate-500">{modal.usd}</span>}
              </div>
            </div>

            {/* Form */}
            <div className="px-6 py-5 space-y-4">
              <p className="text-xs text-slate-400">Fill in your details and we'll send a pre-filled message to WhatsApp. You'll get confirmation within 5 minutes.</p>
              
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Your Name</label>
                <input 
                  type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                  placeholder="e.g. Sarah Miller" 
                  className="w-full bg-[#1e293b] border border-white/5 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-cyan-500/50 transition placeholder:text-slate-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Date Needed</label>
                  <input 
                    type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})}
                    className="w-full bg-[#1e293b] border border-white/5 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-cyan-500/50 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Number of People</label>
                  <select 
                    value={form.people} onChange={e => setForm({...form, people: e.target.value})}
                    className="w-full bg-[#1e293b] border border-white/5 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-cyan-500/50 transition"
                  >
                    {[1,2,3,4,5,6,'7+'].map(n => <option key={n} value={n}>{n} {n === 1 ? 'person' : 'people'}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Pickup Location / Hotel</label>
                <input 
                  type="text" value={form.hotel} onChange={e => setForm({...form, hotel: e.target.value})}
                  placeholder="e.g. Alila Seminyak / Ngurah Rai Airport" 
                  className="w-full bg-[#1e293b] border border-white/5 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-cyan-500/50 transition placeholder:text-slate-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Notes (optional)</label>
                <textarea 
                  value={form.notes} onChange={e => setForm({...form, notes: e.target.value})}
                  rows={2} placeholder="e.g. 2 large suitcases, arriving at 10pm"
                  className="w-full bg-[#1e293b] border border-white/5 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-cyan-500/50 transition resize-none placeholder:text-slate-600"
                />
              </div>
            </div>

            {/* CTA */}
            <div className="px-6 pb-6">
              <button 
                onClick={sendBooking}
                className="w-full py-3.5 rounded-full bg-[#25D366] text-white font-semibold text-sm flex items-center justify-center gap-2 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-900/30 transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Confirm Booking via WhatsApp
              </button>
              <p className="text-center text-[11px] text-slate-500 mt-3">
                You'll receive a WhatsApp confirmation within 5 minutes with your driver's name, photo, and car details.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}