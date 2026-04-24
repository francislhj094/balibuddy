import Services from '@/components/Services';

export const metadata = {
  title: 'Book Bali Services | Airport Transfers & Private Drivers',
  description: 'Book trusted, vetted, and fair-priced services in Bali. From airport transfers to day tours and spa packages, all bookable instantly via WhatsApp.',
  alternates: { canonical: 'https://balibuddy.online/services' },
};

export default function ServicesPage() {
  return (
    <main className="pt-24 pb-12">
      <Services />
    </main>
  );
}
