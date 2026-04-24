export const metadata = {
  title: 'Privacy Policy | BaliBuddy',
  description: 'How BaliBuddy collects and uses your data.',
  alternates: { canonical: 'https://balibuddy.online/privacy' },
};

export default function PrivacyPage() {
  return (
    <main className="pt-28 pb-20 px-6 min-h-screen">
      <div className="max-w-3xl mx-auto prose prose-invert prose-cyan max-w-none 
          prose-headings:font-display prose-headings:text-slate-100 prose-headings:font-normal
          prose-p:text-slate-300 prose-p:leading-loose">
        
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-cyan-400">Legal</span>
          <h1 className="font-display text-4xl sm:text-5xl mt-4 mb-4">Privacy Policy</h1>
          <p className="text-slate-400">Last Updated: April 2026</p>
        </div>

        <h2>1. Information We Collect</h2>
        <p>
          We collect information that you voluntarily provide to us when you use our services, including:
        </p>
        <ul>
          <li><strong>Personal Details:</strong> Name, WhatsApp phone number, and basic demographic data provided during the booking process.</li>
          <li><strong>Trip Details:</strong> Travel dates, preferred budget, hotel locations, and itinerary preferences submitted into our AI Trip Planner.</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>
          The information collected is used solely to facilitate your travel experience in Bali:
        </p>
        <ul>
          <li>Generating personalized itineraries via generative AI (your specific personal identifiers are NOT trained into the AI model).</li>
          <li>Transmitting your pickup/booking data securely via WhatsApp to our vetted local drivers so they can fulfill your service.</li>
          <li>Improving the accuracy of our platform and price estimates.</li>
        </ul>

        <h2>3. Data Sharing with Third Parties</h2>
        <p>
          We do not sell or rent your personal data to advertisers. We only share necessary booking details (Name, WhatsApp number, Hotel location) with the specific local driver or tour operator assigned to your booking. Our AI integrations (e.g., Anthropic Claude) securely process travel preferences without retaining them for generalized training.
        </p>

        <h2>4. Communication</h2>
        <p>
          By submitting a booking request or interacting with our WhatsApp bot, you consent to receive direct WhatsApp messages from BaliBuddy and your assigned driver regarding your trip. You can opt out at any time by replying "STOP."
        </p>
      </div>
    </main>
  );
}
