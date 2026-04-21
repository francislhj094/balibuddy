export default function TrustBar() {
  const items = [
    { icon: '🔒', text: 'Verified Drivers' },
    { icon: '💰', text: 'Fair Fixed Prices' },
    { icon: '🌍', text: '15+ Languages' },
    { icon: '⭐', text: '4.9/5 Rating' },
    { icon: '📱', text: 'WhatsApp Support' },
  ];

  return (
    <section className="py-5 border-b border-white/5 bg-[#111827]/60">
      <div className="max-w-6xl mx-auto px-6 flex justify-center gap-8 sm:gap-12 flex-wrap">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-sm text-slate-400">
            <span>{item.icon}</span>
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}