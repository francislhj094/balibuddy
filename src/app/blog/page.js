// src/app/blog/page.js
// Blog listing page — SEO powerhouse

export const metadata = {
  title: 'Bali Travel Blog — Tips, Guides & Itineraries for 2026',
  description: 'Your ultimate Bali travel resource. Itineraries, fair prices, scam guides, area guides, and insider tips updated for 2026.',
  alternates: { canonical: 'https://balibuddy.online/blog' },
};

// These would come from Supabase in production
const articles = [
  {
    slug: 'bali-itinerary-7-days-2026',
    title: 'The Perfect 7-Day Bali Itinerary for 2026 (Day by Day)',
    description: 'A complete day-by-day Bali itinerary for 7 days covering Ubud, Canggu, Uluwatu, and Nusa Penida. Includes fair prices, transport tips, and booking links.',
    category: 'itinerary',
    readTime: '12 min',
    date: '2026-04-15',
  },
  {
    slug: 'bali-scams-avoid-2026',
    title: '22 Common Bali Scams in 2026 & How to Avoid Every Single One',
    description: 'From airport taxi tricks to fake Gojek drivers and money changer cons. Everything tourists need to know to stay safe.',
    category: 'tips',
    readTime: '15 min',
    date: '2026-04-10',
  },
  {
    slug: 'how-much-bali-trip-cost-2026',
    title: 'How Much Does a Bali Trip Actually Cost in 2026? (Honest Breakdown)',
    description: 'Real costs for budget, mid-range, and luxury travelers. Includes accommodation, food, transport, activities, and hidden fees.',
    category: 'prices',
    readTime: '10 min',
    date: '2026-04-08',
  },
  {
    slug: 'canggu-vs-seminyak-vs-ubud',
    title: 'Canggu vs Seminyak vs Ubud: Where Should You Stay in Bali?',
    description: 'A detailed comparison of Bali\'s 3 most popular areas. Which one matches your vibe, budget, and travel style?',
    category: 'area',
    readTime: '8 min',
    date: '2026-04-05',
  },
  {
    slug: 'bali-airport-transfer-guide',
    title: 'Bali Airport Transfer Guide 2026: Don\'t Get Scammed on Day 1',
    description: 'How to get from Bali airport to your hotel safely and cheaply. Fair prices, vetted drivers, and what to avoid.',
    category: 'guide',
    readTime: '6 min',
    date: '2026-04-01',
  },
  {
    slug: 'nusa-penida-day-trip-guide',
    title: 'Nusa Penida Day Trip from Bali: Complete 2026 Guide',
    description: 'How to plan the perfect Nusa Penida day trip. Boats, costs, best spots, and what most guides won\'t tell you.',
    category: 'guide',
    readTime: '9 min',
    date: '2026-03-28',
  },
  {
    slug: 'bali-budget-travel-2026',
    title: 'Bali on $30/Day: The Ultimate Budget Travel Guide for 2026',
    description: 'How to experience Bali on a tight budget without missing the best parts. Real costs, free activities, and money-saving hacks.',
    category: 'tips',
    readTime: '11 min',
    date: '2026-03-25',
  },
  {
    slug: 'best-time-visit-bali-2026',
    title: 'Best Time to Visit Bali in 2026 (Month-by-Month Breakdown)',
    description: 'Weather, crowds, prices, and festivals for every month. When to go and when to avoid based on your priorities.',
    category: 'guide',
    readTime: '7 min',
    date: '2026-03-20',
  },
  {
    slug: 'bali-first-time-tips',
    title: '25 Things I Wish I Knew Before My First Trip to Bali',
    description: 'Honest advice for first-time Bali visitors. Rules, etiquette, packing tips, and the stuff nobody tells you.',
    category: 'tips',
    readTime: '10 min',
    date: '2026-03-15',
  },
  {
    slug: 'bali-wellness-retreat-guide',
    title: 'The Complete Guide to Wellness Retreats in Bali (2026)',
    description: 'Yoga, meditation, spa, healing ceremonies. How to find legit retreats and avoid overpriced tourist traps.',
    category: 'activity',
    readTime: '9 min',
    date: '2026-03-10',
  },
];

const categoryColors = {
  itinerary: 'bg-cyan-500/15 text-cyan-400',
  tips: 'bg-amber-500/15 text-amber-400',
  prices: 'bg-emerald-500/15 text-emerald-400',
  area: 'bg-violet-500/15 text-violet-400',
  guide: 'bg-sky-500/15 text-sky-400',
  activity: 'bg-pink-500/15 text-pink-400',
};

export default function BlogPage() {
  return (
    <main className="pt-28 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-cyan-400">Bali Travel Blog</span>
          <h1 className="font-display text-4xl sm:text-5xl mt-4 mb-4">
            Your Bali <span className="gradient-text">Knowledge Base</span>
          </h1>
          <p className="text-slate-400 text-lg">Honest guides, fair prices, and insider tips — updated weekly for 2026.</p>
        </div>

        <div className="space-y-4">
          {articles.map((article, i) => (
            <a key={i} href={`/blog/${article.slug}`}
              className="block bg-[#111827] border border-white/5 rounded-2xl p-6 sm:p-8 card-hover">
              <div className="flex items-start gap-4 flex-wrap">
                <div className="flex-1 min-w-[250px]">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${categoryColors[article.category] || 'bg-slate-500/15 text-slate-400'}`}>
                      {article.category}
                    </span>
                    <span className="text-xs text-slate-600">{article.readTime} read</span>
                  </div>
                  <h2 className="font-display text-xl mb-2 text-white hover:text-cyan-400 transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed">{article.description}</p>
                </div>
                <span className="text-xs text-slate-600 whitespace-nowrap">{article.date}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}