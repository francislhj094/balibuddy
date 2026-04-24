import TripPlanner from '@/components/TripPlanner';

export const metadata = {
  title: 'AI Bali Trip Planner | Free Custom Itinerary Generator',
  description: 'Generate a personalized day-by-day Bali itinerary in 60 seconds with our free AI trip planner. Tailored to your dates, budget, and interests.',
  alternates: { canonical: 'https://balibuddy.online/planner' },
};

export default function PlannerPage() {
  return (
    <main className="pt-24 pb-12">
      <TripPlanner />
    </main>
  );
}
