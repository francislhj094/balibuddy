'use client';

export default function TrustBar() {
  const items = [
    { icon: '🔒', text: 'Verified Drivers' },
    { icon: '💰', text: 'Fair Fixed Prices' },
    { icon: '🌍', text: '15+ Languages' },
    { icon: '⭐', text: '4.9/5 Rating' },
    { icon: '📱', text: 'WhatsApp Support' },
    { icon: '🛡️', text: 'Insured Trips' },
  ];

  // Double the items for seamless marquee loop
  const doubled = [...items, ...items];

  return (
    <section className="relative py-4 border-b border-white/5 bg-[#111827]/60 overflow-hidden">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-[#0a0f1a] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-[#0a0f1a] to-transparent pointer-events-none" />

      <div className="animate-marquee flex gap-12 whitespace-nowrap w-max">
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-2.5 text-sm text-slate-400">
            <span className="text-base">{item.icon}</span>
            <span className="font-medium">{item.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}