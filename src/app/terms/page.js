export const metadata = {
  title: 'Terms of Service | BaliBuddy',
  description: 'Terms of service and user agreement for BaliBuddy.',
  alternates: { canonical: 'https://balibuddy.online/terms' },
};

export default function TermsPage() {
  return (
    <main className="pt-28 pb-20 px-6 min-h-screen">
      <div className="max-w-3xl mx-auto prose prose-invert prose-cyan max-w-none 
          prose-headings:font-display prose-headings:text-slate-100 prose-headings:font-normal
          prose-p:text-slate-300 prose-p:leading-loose">
        
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-cyan-400">Legal</span>
          <h1 className="font-display text-4xl sm:text-5xl mt-4 mb-4">Terms of Service</h1>
          <p className="text-slate-400">Last Updated: April 2026</p>
        </div>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using BaliBuddy ("the Platform"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
        </p>

        <h2>2. Description of Services</h2>
        <p>
          BaliBuddy provides an AI-powered travel planning interface and acts as a directory/intermediary connecting tourists with independent, third-party local guides, drivers, and service providers in Bali, Indonesia. We do not directly operate these transport or tour services.
        </p>

        <h2>3. Third-Party Services and Liability</h2>
        <p>
          While we make reasonable efforts to vet the third-party service providers connected through our WhatsApp concierge, you acknowledge that BaliBuddy is solely a match-making technology. We are not liable for any personal injury, property damage, delays, or disputes that arise between you and the third-party providers. By booking a service, you accept the inherent risks of travel.
        </p>

        <h2>4. Pricing and Payments</h2>
        <p>
          Prices listed on our Fair Price Guide are estimates based on local market rates and subject to change based on seasonality, fuel prices, or specific requests. Payments are generally handled through our secure payment gateway or directly with the driver in IDR, depending on the service booked.
        </p>

        <h2>5. Information Accuracy</h2>
        <p>
          The AI-generated itineraries are provided "as-is." While we strive to ensure that recommendations (e.g., restaurant openings, temple rules, prices) are accurate, the fast-paced nature of Bali's tourism sector means details may change. We strongly advise independently verifying critical information before travel.
        </p>
      </div>
    </main>
  );
}
