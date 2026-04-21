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
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#111827] border border-white/5 rounded-2xl p-10 sm:p-12 grid sm:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-cyan-400">Free Resource</span>
            <h2 className="font-display text-3xl sm:text-4xl mt-4 mb-4">2026 Bali<br />Arrival Checklist</h2>
            <p className="text-slate-400 mb-6 leading-relaxed">Don't miss any of the new rules. Tourist levy, proof of funds, customs app, cultural dos & don'ts — all in one page.</p>
            <button className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 text-gray-900 font-semibold hover:-translate-y-0.5 transition-all shadow-lg shadow-cyan-500/20">
              📋 Get Free Checklist
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {items.map((item, i) => (
              <div key={i} className="bg-[#1e293b] rounded-lg px-4 py-3 text-sm border-l-[3px] border-emerald-400">
                ✅ {item}
              </div>
            ))}
            <div className="bg-[#1e293b] rounded-lg px-4 py-3 text-sm border-l-[3px] border-slate-600 text-slate-500 italic">
              + 8 more items...
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}