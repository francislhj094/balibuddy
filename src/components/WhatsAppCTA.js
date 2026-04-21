export default function WhatsAppCTA() {
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '';
  return (
    <section id="whatsapp" className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center py-16 px-8 rounded-2xl bg-gradient-to-br from-green-500/8 to-cyan-500/8 border border-green-500/15">
          <div className="text-5xl mb-4">💬</div>
          <h2 className="font-display text-3xl mb-3">Got Questions? Ask Our AI on WhatsApp</h2>
          <p className="text-slate-400 max-w-lg mx-auto mb-8">Message us anytime in any language. Get instant answers about Bali — prices, safety, itineraries, bookings, and more.</p>
          <a href={`https://wa.me/${waNumber}?text=Hi%20BaliBuddy!%20I'm%20planning%20a%20trip%20to%20Bali`}
            target="_blank" rel="noopener noreferrer"
            className="inline-block px-10 py-4 rounded-full bg-[#25D366] text-white font-semibold text-lg shadow-lg shadow-green-500/25 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-green-500/30 transition-all">
            Chat on WhatsApp →
          </a>
          <span className="block mt-4 text-xs text-slate-500">Average response time: under 30 seconds</span>
        </div>
      </div>
    </section>
  );
}