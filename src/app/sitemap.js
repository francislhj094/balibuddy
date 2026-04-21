export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://balibuddy.com';
  
  // Since we don't have a live DB yet, we map the hardcoded articles from earlier
  const staticArticles = [
    'bali-itinerary-7-days-2026',
    'bali-scams-avoid-2026',
    'how-much-bali-trip-cost-2026',
    'canggu-vs-seminyak-vs-ubud',
    'bali-airport-transfer-guide',
    'nusa-penida-day-trip-guide',
    'bali-budget-travel-2026',
    'best-time-visit-bali-2026',
    'bali-first-time-tips',
    'bali-wellness-retreat-guide'
  ];

  const blogUrls = staticArticles.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const globalUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/prices`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/checklist`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  return [...globalUrls, ...blogUrls];
}
