// src/components/StructuredData.js
// Reusable JSON-LD structured data component for SEO rich results

export default function StructuredData({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Pre-built schema generators
export function faqSchema(questions) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(q => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };
}

export function articleSchema({ title, description, slug, date, readTime }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    author: { '@type': 'Organization', name: 'BaliBuddy' },
    publisher: {
      '@type': 'Organization',
      name: 'BaliBuddy',
      logo: { '@type': 'ImageObject', url: 'https://balibuddy.com/logo.png' },
    },
    datePublished: date,
    dateModified: date,
    url: `https://balibuddy.com/blog/${slug}`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://balibuddy.com/blog/${slug}` },
    wordCount: parseInt(readTime) * 250, // rough estimate
  };
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'BaliBuddy',
    description: 'AI-powered Bali trip planner & trusted local booking service. Fair prices, vetted drivers & guides.',
    url: 'https://balibuddy.com',
    areaServed: {
      '@type': 'Place',
      name: 'Bali, Indonesia',
    },
    priceRange: '$$',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['English', 'Indonesian'],
    },
  };
}

export function howToSchema({ name, description, steps }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}
