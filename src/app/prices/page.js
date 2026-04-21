// src/app/prices/page.js
// Standalone Fair Price Guide — SEO target: "bali fair prices", "how much things cost in bali"

import Link from 'next/link';
import StructuredData, { faqSchema } from '@/components/StructuredData';

export const metadata = {
  title: 'Bali Fair Price Guide 2026 — What Things Actually Cost',
  description: 'The honest guide to Bali prices in 2026. Know exactly what to pay for taxis, tours, food, massages, and more. Tourist price vs fair price comparison.',
  keywords: ['bali prices', 'bali fair prices', 'how much things cost in bali', 'bali taxi prices', 'bali scam prices'],
};

const priceCategories = [
  {
    title: '🚗 Transport',
    items: [
      { service: 'Airport → Seminyak/Canggu', tourist: '400K–500K IDR', fair: '150K–250K IDR', usd: '$9–15', tip: 'Pre-book with BaliBuddy or use Grab' },
      { service: 'Airport → Ubud', tourist: '500K–700K IDR', fair: '300K–400K IDR', usd: '$19–25', tip: 'Longer drive; negotiate before you leave' },
      { service: 'Private driver (full day, 10hrs)', tourist: '800K–1M IDR', fair: '500K–650K IDR', usd: '$31–40', tip: 'Fuel and parking should be included' },
      { service: 'Scooter rental (per day)', tourist: '100K–150K IDR', fair: '50K–75K IDR', usd: '$3–5', tip: 'Check brakes and get insurance' },
      { service: 'Grab/Gojek (per km avg)', tourist: 'N/A', fair: '5K–8K IDR', usd: '$0.30–0.50', tip: 'Use the app — don\'t accept "offline" rides' },
    ],
  },
  {
    title: '🍜 Food & Drink',
    items: [
      { service: 'Nasi Goreng (local warung)', tourist: '40K–60K IDR', fair: '15K–25K IDR', usd: '$1–1.50', tip: 'Eat where the locals eat' },
      { service: 'Nasi Goreng (restaurant)', tourist: '80K–120K IDR', fair: '45K–70K IDR', usd: '$3–4.50', tip: 'Tourist areas charge 2–3x markup' },
      { service: 'Bintang beer (large)', tourist: '50K–70K IDR', fair: '25K–35K IDR', usd: '$1.50–2', tip: 'Happy hour deals common in Canggu' },
      { service: 'Fresh coconut', tourist: '30K–50K IDR', fair: '10K–15K IDR', usd: '$0.60–1', tip: 'Beach vendors charge more' },
      { service: 'Smoothie bowl (café)', tourist: '80K–120K IDR', fair: '45K–65K IDR', usd: '$3–4', tip: 'Standard at Canggu cafés' },
      { service: 'Fine dining (per person)', tourist: '500K+ IDR', fair: '250K–400K IDR', usd: '$15–25', tip: 'Book ahead for popular spots' },
    ],
  },
  {
    title: '💆 Spa & Wellness',
    items: [
      { service: 'Balinese massage (1hr)', tourist: '200K–300K IDR', fair: '80K–120K IDR', usd: '$5–7.50', tip: 'Walk-in to local spas, not hotel ones' },
      { service: 'Flower bath + massage (2hr)', tourist: '400K–600K IDR', fair: '200K–350K IDR', usd: '$12–22', tip: 'Ask to see hygiene before booking' },
      { service: 'Yoga class (drop-in)', tourist: '200K–250K IDR', fair: '100K–150K IDR', usd: '$6–9', tip: 'Multi-class packages are cheaper' },
      { service: 'Full-day wellness retreat', tourist: '1.5M–2M IDR', fair: '800K–1.2M IDR', usd: '$50–75', tip: 'Includes meals and ceremonies typically' },
    ],
  },
  {
    title: '🏄 Activities & Tours',
    items: [
      { service: 'Nusa Penida day trip (all-in)', tourist: '1.2M–1.5M IDR', fair: '600K–800K IDR', usd: '$37–50', tip: 'Includes boat + driver + lunch' },
      { service: 'Ubud day tour (Tegallalang, Monkey Forest)', tourist: '800K–1M IDR', fair: '400K–550K IDR', usd: '$25–34', tip: 'Skip the swing (overpriced)' },
      { service: 'Mount Batur sunrise trek', tourist: '600K–800K IDR', fair: '350K–500K IDR', usd: '$22–31', tip: 'Includes guide, flashlight, breakfast' },
      { service: 'Surf lesson (2hrs)', tourist: '500K–600K IDR', fair: '250K–350K IDR', usd: '$15–22', tip: 'Kuta/Canggu for beginners' },
      { service: 'White water rafting', tourist: '600K–800K IDR', fair: '350K–450K IDR', usd: '$22–28', tip: 'Ayung River is the calmest option' },
      { service: 'Snorkeling trip (gear included)', tourist: '400K–500K IDR', fair: '200K–300K IDR', usd: '$12–19', tip: 'Amed or Nusa Lembongan best for visibility' },
    ],
  },
  {
    title: '🏠 Accommodation (per night)',
    items: [
      { service: 'Hostel dorm bed', tourist: '200K+ IDR', fair: '80K–150K IDR', usd: '$5–9', tip: 'Book ahead in peak season' },
      { service: 'Guesthouse / homestay', tourist: '400K–600K IDR', fair: '200K–350K IDR', usd: '$12–22', tip: 'Includes breakfast at most' },
      { service: 'Mid-range villa (private pool)', tourist: '1.5M–2M IDR', fair: '700K–1.2M IDR', usd: '$44–75', tip: 'Book monthly for 40%+ discount' },
      { service: 'Luxury resort', tourist: '3M+ IDR', fair: '1.5M–2.5M IDR', usd: '$93–155', tip: 'Use booking.com genius discounts' },
    ],
  },
  {
    title: '📱 Essentials',
    items: [
      { service: 'eSIM (30 days, unlimited)', tourist: '$15–25', fair: '$5–10', usd: '$5–10', tip: 'Buy before arrival — way easier' },
      { service: 'Laundry (per kg)', tourist: '20K–30K IDR', fair: '7K–12K IDR', usd: '$0.45–0.75', tip: 'Ask at your homestay — always cheapest' },
      { service: 'ATM withdrawal fee', tourist: '50K+ IDR', fair: '0–30K IDR', usd: '$0–2', tip: 'Use BCA or Bank Mandiri ATMs' },
      { service: 'Temple entrance fee', tourist: '50K–100K IDR', fair: '30K–50K IDR', usd: '$2–3', tip: 'Sarong usually included with ticket' },
    ],
  },
];

const priceFaqs = [
  { question: 'How much does a Bali trip cost per day?', answer: 'Budget travelers can get by on $30–50/day. Mid-range travelers typically spend $75–120/day. Luxury seekers should budget $200+/day. These include accommodation, food, transport, and activities.' },
  { question: 'Is Bali expensive for tourists?', answer: 'Bali is generally affordable compared to Western destinations. However, tourist-targeted areas like Seminyak can charge 2–3x local prices. Using our Fair Price Guide helps you avoid overpaying.' },
  { question: 'How much should I tip in Bali?', answer: 'Tipping is not mandatory but appreciated. 10–15% at restaurants without a service charge, 20K–50K IDR for drivers/guides per day, and rounding up for small services is standard.' },
  { question: 'Should I use IDR or USD in Bali?', answer: 'Always use Indonesian Rupiah (IDR). You\'ll get better rates and avoid confusion. Use authorized money changers or ATMs (BCA, Bank Mandiri) for the best exchange rates.' },
  { question: 'What is the biggest rip-off in Bali?', answer: 'Airport taxis and unlicensed money changers are the most common tourist traps. Pre-booking airport transfers and using only authorized glass-fronted money changers eliminates these risks entirely.' },
];

export default function PricesPage() {
  return (
    <>
      <StructuredData data={faqSchema(priceFaqs)} />
      <main className="pt-28 pb-20 px-6 min-h-screen">
        <div className="max-w-5xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-cyan-400">Fair Price Guide</span>
            <h1 className="font-display text-4xl sm:text-5xl mt-4 mb-4">
              What Things <span className="gradient-text">Actually Cost</span> in Bali
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Tourist price vs fair price — side by side. Stop overpaying. Updated for 2026.
            </p>
          </div>

          {/* Alert */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-5 mb-12 flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">💡</span>
            <div>
              <p className="text-amber-300 font-semibold text-sm mb-1">How to use this guide</p>
              <p className="text-slate-400 text-sm leading-relaxed">
                The &quot;Tourist Price&quot; is what you&apos;ll be quoted if you walk up without research. The &quot;Fair Price&quot; is what locals and savvy travelers pay. 
                Book through BaliBuddy to automatically get fair prices with vetted providers.
              </p>
            </div>
          </div>

          {/* Price Categories */}
          <div className="space-y-12">
            {priceCategories.map((cat, ci) => (
              <section key={ci} className="bg-[#111827] border border-white/5 rounded-2xl overflow-hidden">
                <div className="px-6 py-5 border-b border-white/5">
                  <h2 className="font-display text-xl">{cat.title}</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-xs uppercase tracking-wider text-slate-500 border-b border-white/5">
                        <th className="px-6 py-3 font-semibold">Service</th>
                        <th className="px-6 py-3 font-semibold text-red-400">Tourist Price</th>
                        <th className="px-6 py-3 font-semibold text-emerald-400">Fair Price</th>
                        <th className="px-6 py-3 font-semibold text-cyan-400">USD</th>
                        <th className="px-6 py-3 font-semibold hidden lg:table-cell">Pro Tip</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cat.items.map((item, ii) => (
                        <tr key={ii} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-4 text-slate-200 font-medium whitespace-nowrap">{item.service}</td>
                          <td className="px-6 py-4 text-red-400 line-through opacity-70">{item.tourist}</td>
                          <td className="px-6 py-4 text-emerald-400 font-semibold">{item.fair}</td>
                          <td className="px-6 py-4 text-cyan-400">{item.usd}</td>
                          <td className="px-6 py-4 text-slate-500 text-xs hidden lg:table-cell max-w-[200px]">{item.tip}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            ))}
          </div>

          {/* FAQ Section */}
          <section className="mt-16">
            <h2 className="font-display text-2xl text-center mb-8">Frequently Asked <span className="gradient-text">Questions</span></h2>
            <div className="space-y-4 max-w-3xl mx-auto">
              {priceFaqs.map((faq, i) => (
                <details key={i} className="group bg-[#111827] border border-white/5 rounded-xl overflow-hidden">
                  <summary className="px-6 py-4 cursor-pointer text-slate-200 font-medium flex items-center justify-between hover:text-white transition-colors">
                    {faq.question}
                    <span className="text-cyan-400 text-lg ml-4 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-6 pb-5 text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="mt-16 text-center bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 border border-cyan-500/20 rounded-2xl p-10">
            <h3 className="font-display text-2xl mb-3">Skip the Haggling</h3>
            <p className="text-slate-400 mb-6 max-w-lg mx-auto">
              Book through BaliBuddy and get fair prices automatically with vetted, English-speaking drivers and guides.
            </p>
            <Link href="/#services" className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 text-gray-900 font-semibold text-sm shadow-md hover:shadow-cyan-500/25 transition-all hover:-translate-y-0.5">
              Browse Services & Book
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
