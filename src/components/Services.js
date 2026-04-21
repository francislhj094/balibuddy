'use client';

const services = [
  { id: 'airport-transfer', emoji: '✈️', title: 'Airport Transfer', desc: 'AC car, meet & greet at arrivals, help with bags. No meter tricks, no surprises.', price: 'IDR 200K', usd: '~$12 USD', badge: 'Most Popular', img: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=600&q=80' },
  { id: 'day-driver', emoji: '🚗', title: 'Private Day Driver', desc: 'English-speaking driver for 10 hours. Go wherever you want. Fuel and parking included.', price: 'IDR 600K', usd: '~$37 USD', img: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80' },
  { id: 'ubud-tour', emoji: '🌋', title: 'Ubud Day Tour', desc: 'Rice terraces, monkey forest, waterfall, coffee plantation, temple. Lunch included.', price: 'IDR 500K', usd: '~$31 USD', img: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=600&q=80' },
  { id: 'nusa-penida', emoji: '🤿', title: 'Nusa Penida Tour', desc: 'Kelingking Beach, Angel\'s Billabong, Broken Beach, Crystal Bay. Boat + driver included.', price: 'IDR 750K', usd: '~$46 USD', img: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=600&q=80' },
  { id: 'spa', emoji: '💆', title: 'Spa & Wellness Package', desc: '2-hour Balinese massage + flower bath + body scrub at a vetted premium spa.', price: 'IDR 350K', usd: '~$22 USD', img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80' },
  { id: 'esim', emoji: '📱', title: 'Bali eSIM + Setup', desc: '30-day unlimited data eSIM. Pre-activated before you land. No SIM card hassle.', price: '$8 USD', usd: '', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80' },
];

export default function Services() {
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6282341834263';

  return (
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
                <a 
                  href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Hi BaliBuddy! I'd like to book: ${s.title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 text-gray-900 font-semibold text-sm text-center hover:-translate-y-0.5 transition-all shadow-md shadow-cyan-500/15"
                >
                  Book {s.title.split(' ')[0]}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}