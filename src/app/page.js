// src/app/page.js
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import ProblemSection from '@/components/ProblemSection';
import PriceGuide from '@/components/PriceGuide';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import Checklist from '@/components/Checklist';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import StructuredData, { faqSchema, localBusinessSchema, howToSchema } from '@/components/StructuredData';

const homeFaqs = [
  {
    question: 'Is BaliBuddy free to use?',
    answer: 'Yes! The AI trip planner and price guide are completely free. We only charge for booking services like airport transfers and tours, and our prices are transparent and fair.',
  },
  {
    question: 'How does the AI trip planner work?',
    answer: 'Tell us your travel dates, budget, and interests, and our AI generates a personalized day-by-day Bali itinerary in under 60 seconds. It includes restaurants, activities, transport, and fair price estimates.',
  },
  {
    question: 'Are the drivers and guides vetted?',
    answer: 'Yes. Every driver and guide on BaliBuddy is personally vetted, licensed, insured, and reviewed by previous travelers. We only work with providers who maintain a 4.5+ star rating.',
  },
  {
    question: 'What is the Fair Price Guide?',
    answer: 'Our Fair Price Guide shows you what things actually cost in Bali — from taxi rides to massages — so you never overpay. We compare tourist prices vs fair local prices for every common service.',
  },
  {
    question: 'How do I book services through BaliBuddy?',
    answer: 'Click "Book" on any service, fill in your details, and you\'ll be connected with your vetted provider via WhatsApp. You\'ll receive confirmation within 5 minutes with your driver\'s name, photo, and car details.',
  },
];

const howToSteps = [
  { name: 'Tell us your preferences', text: 'Enter your travel dates, budget level, and interests into our AI trip planner.' },
  { name: 'Get your personalized itinerary', text: 'Our AI generates a complete day-by-day Bali itinerary in under 60 seconds.' },
  { name: 'Book trusted services', text: 'Book airport transfers, drivers, tours, and spa packages at fair prices with vetted providers.' },
  { name: 'Travel with confidence', text: 'Get WhatsApp support throughout your trip with driver details, live updates, and 24/7 concierge.' },
];

export default function Home() {
  return (
    <main>
      <StructuredData data={localBusinessSchema()} />
      <StructuredData data={faqSchema(homeFaqs)} />
      <StructuredData data={howToSchema({
        name: 'How to Plan Your Bali Trip with BaliBuddy',
        description: 'Plan your perfect Bali trip in 4 simple steps using our AI-powered platform.',
        steps: howToSteps,
      })} />
      <Hero />
      <TrustBar />
      <ProblemSection />
      <PriceGuide />
      <HowItWorks />
      <Testimonials />
      <Checklist />
      <WhatsAppCTA />
    </main>
  );
}