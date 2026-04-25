'use client';
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackItineraryGenerated, trackWhatsAppClick } from '@/lib/analytics';

const interestOptions = [
  { id: 'surfing', label: '🏄 Surfing' },
  { id: 'wellness', label: '🧘 Wellness & Yoga' },
  { id: 'temples', label: '🏛️ Temples & Culture' },
  { id: 'beaches', label: '🌊 Beaches' },
  { id: 'nature', label: '🌿 Nature & Hiking' },
  { id: 'food', label: '🍜 Food & Dining' },
  { id: 'nightlife', label: '🎉 Nightlife' },
  { id: 'photography', label: '📸 Photography' },
  { id: 'snorkeling', label: '🤿 Snorkeling & Diving' },
  { id: 'adventure', label: '🏍️ Adventure' },
  { id: 'spa', label: '💆 Spa & Massage' },
  { id: 'art', label: '🎨 Art & Crafts' },
];

function ShimmerSkeleton() {
  return (
    <div className="space-y-4">
      {[1,2,3].map(i => (
        <div key={i} className="bg-[#1e293b] rounded-xl p-6 border-l-[3px] border-cyan-500/30">
          <div className="shimmer h-5 w-48 mb-4" />
          {[1,2,3,4].map(j => (
            <div key={j} className="flex gap-3 py-2">
              <div className="shimmer h-4 w-16" />
              <div className="shimmer h-4 flex-1" />
              <div className="shimmer h-4 w-20" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function TripPlanner() {
  const [interests, setInterests] = useState(['temples', 'food', 'beaches']);
  const [days, setDays] = useState('7');
  const [budget, setBudget] = useState('mid');
  const [group, setGroup] = useState('couple');
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState(null);
  const [error, setError] = useState(null);

  const toggleInterest = (id) => {
    setInterests(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const throwConfetti = useCallback(() => {
    const colors = ['#06b6d4', '#34d399', '#f87171', '#fbbf24', '#8b5cf6', '#ec4899'];
    for (let i = 0; i < 60; i++) {
      const confetti = document.createElement('div');
      const size = Math.random() * 8 + 4;
      Object.assign(confetti.style, {
        position: 'fixed', width: size + 'px', height: size + 'px',
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        left: Math.random() * 100 + 'vw', top: '-10px',
        borderRadius: Math.random() > 0.5 ? '50%' : Math.random() > 0.5 ? '2px' : '0',
        zIndex: '9999', pointerEvents: 'none', opacity: '1',
        transform: `rotate(${Math.random() * 360}deg)`,
        transition: `top ${1.5 + Math.random()}s cubic-bezier(0.25,0.46,0.45,0.94), opacity ${1.5 + Math.random()}s ease-in, transform ${1.5 + Math.random()}s ease-in`,
      });
      document.body.appendChild(confetti);
      requestAnimationFrame(() => {
        confetti.style.top = '105vh';
        confetti.style.transform = `rotate(${Math.random() * 720}deg) translateX(${Math.random() * 200 - 100}px)`;
        confetti.style.opacity = '0';
      });
      setTimeout(() => confetti.remove(), 3000);
    }
  }, []);

  const generate = async () => {
    if (interests.length === 0) { setError('Pick at least one interest!'); return; }
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/generate-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ days: parseInt(days), budget, group, interests }),
      });
      if (!res.ok) throw new Error('Failed to generate');
      const data = await res.json();
      setItinerary(data.itinerary);
      trackItineraryGenerated({ days: parseInt(days), budget, group, interests: interests.join(', ') });
      throwConfetti();
    } catch {
      setItinerary(generateFallback(parseInt(days), budget, group, interests));
      trackItineraryGenerated({ days: parseInt(days), budget, group, interests: interests.join(', '), fallback: true });
      throwConfetti();
    } finally {
      setLoading(false);
    }
  };

  const reset = () => { setItinerary(null); setError(null); };

  const inputClass = "w-full bg-[#1e293b] border border-white/5 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all duration-300";

  return (
    <section id="planner" className="relative py-24 lg:py-28 px-6 section-glow">
      <div className="max-w-3xl mx-auto text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block text-xs font-semibold uppercase tracking-[0.15em] text-cyan-400"
        >
          AI Trip Planner
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] mt-4 mb-3"
        >
          Your Perfect Bali Itinerary <span className="gradient-text">in 60 Seconds</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="text-slate-400 mb-12 max-w-lg mx-auto"
        >
          Tell us about your trip and our AI builds a personalized day-by-day plan with fair price estimates.
        </motion.p>

        <AnimatePresence mode="wait">
          {!itinerary && !loading ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="glass rounded-2xl p-8 sm:p-10 text-left"
            >
              {/* Form Grid */}
              <div className="grid sm:grid-cols-2 gap-5 mb-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-2">How many days?</label>
                  <select value={days} onChange={e => setDays(e.target.value)} className={inputClass}>
                    {[3,5,7,10,14].map(d => <option key={d} value={d}>{d} Days</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-2">Travel style?</label>
                  <select value={budget} onChange={e => setBudget(e.target.value)} className={inputClass}>
                    <option value="budget">Budget (&lt; $50/day)</option>
                    <option value="mid">Mid-Range ($50-150/day)</option>
                    <option value="luxury">Luxury ($150+/day)</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-400 mb-2">Group size?</label>
                  <select value={group} onChange={e => setGroup(e.target.value)} className={inputClass}>
                    <option value="solo">Solo</option>
                    <option value="couple">Couple</option>
                    <option value="friends">Friends (3-6)</option>
                    <option value="family">Family with kids</option>
                    <option value="large">Large group (7+)</option>
                  </select>
                </div>
              </div>

              {/* Interest Tags */}
              <div className="mb-8">
                <label className="block text-xs font-semibold text-slate-400 mb-3">What are you into?</label>
                <div className="flex flex-wrap gap-2.5">
                  {interestOptions.map(opt => (
                    <button key={opt.id} onClick={() => toggleInterest(opt.id)}
                      className={`px-4 py-2.5 rounded-full text-sm font-medium border transition-all duration-300 ${
                        interests.includes(opt.id)
                          ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400 shadow-sm shadow-cyan-500/10'
                          : 'bg-[#1e293b] border-white/5 text-slate-400 hover:border-white/15 hover:text-slate-300'
                      }`}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-red-400 text-sm mb-4 flex items-center gap-2"
                >
                  <span>⚠️</span> {error}
                </motion.p>
              )}

              <button onClick={generate}
                className="w-full py-4 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 text-gray-900 font-semibold text-base shadow-lg shadow-cyan-500/20 hover:shadow-xl hover:shadow-cyan-500/30 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
                ✨ Generate My Free Itinerary
              </button>
            </motion.div>
          ) : loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass rounded-2xl p-8 text-left"
            >
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-3 text-cyan-400 text-sm font-medium">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                  Crafting your perfect itinerary...
                </div>
              </div>
              <ShimmerSkeleton />
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="glass rounded-2xl p-8 text-left"
            >
              <div className="flex justify-between items-start flex-wrap gap-4 mb-6">
                <div>
                  <h3 className="font-display text-2xl">{itinerary.title || 'Your Bali Itinerary'}</h3>
                  <p className="text-slate-400 text-sm mt-1">{days} days · {budget} · {group} · {interests.join(', ')}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { if(navigator.share) navigator.share({title:'My Bali Itinerary',url:location.href}); else { navigator.clipboard.writeText(location.href); alert('Link copied!'); } }}
                    className="px-4 py-2 text-sm bg-[#1e293b] rounded-xl text-slate-300 hover:bg-[#263245] transition-colors">📤 Share</button>
                  <button onClick={reset} className="px-4 py-2 text-sm bg-[#1e293b] rounded-xl text-slate-300 hover:bg-[#263245] transition-colors">✏️ Edit</button>
                </div>
              </div>

              {/* Days with timeline */}
              <div className="space-y-4 mb-6">
                {(itinerary.days || []).map((day, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="relative bg-[#1e293b]/80 rounded-xl p-6 border-l-[3px] border-cyan-500"
                  >
                    {/* Timeline dot */}
                    <div className="absolute -left-[7px] top-6 w-3 h-3 rounded-full bg-cyan-500 border-2 border-[#0a0f1a]" />
                    <h4 className="font-display text-lg text-cyan-400 mb-3">Day {day.day || i+1}: {day.title} — {day.area}</h4>
                    {(day.activities || []).map((act, j) => (
                      <div key={j} className="flex gap-3 py-2 border-b border-white/[0.03] last:border-0 text-sm">
                        <span className="text-slate-500 font-medium min-w-[65px] text-xs">{act.time}</span>
                        <span className="flex-1 text-slate-300">{act.title || act.name}</span>
                        <span className="text-emerald-400 font-semibold text-xs whitespace-nowrap">{act.price_idr || act.price}</span>
                      </div>
                    ))}
                  </motion.div>
                ))}
              </div>

              {/* Total */}
              <div className="bg-cyan-500/[0.06] border border-cyan-500/15 rounded-xl p-5 flex flex-col sm:flex-row justify-between items-center gap-3 mb-4">
                <span className="text-sm text-slate-300">Estimated total for {days} days:</span>
                <span className="font-display text-xl text-cyan-400">
                  ${itinerary.total_estimate_min_usd || '—'} — ${itinerary.total_estimate_max_usd || '—'} USD
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <a href="/services" className="block text-center py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 text-gray-900 font-semibold text-sm hover:-translate-y-0.5 transition-all duration-300">
                  📋 Book These Services
                </a>
                <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6282341834263'}?text=${encodeURIComponent(
                  `🌴 *My BaliBuddy Itinerary*\n\n` +
                  `📅 ${days} days · ${budget} budget · ${group}\n` +
                  `🎯 Interests: ${interests.join(', ')}\n` +
                  `💰 Est: $${itinerary.total_estimate_min_usd || '—'} – $${itinerary.total_estimate_max_usd || '—'} USD\n\n` +
                  (itinerary.days || []).map(d => `*Day ${d.day || ''}:* ${d.title} (${d.area})`).join('\n') +
                  `\n\nI'd love to book services for this trip! Can you help? 🙏`
                )}`}
                  target="_blank" rel="noopener noreferrer"
                  className="block text-center py-3.5 rounded-full bg-[#25D366] text-white font-semibold text-sm hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-900/30 transition-all duration-300">
                  💬 Send to WhatsApp
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// Client-side fallback generator
function generateFallback(numDays, budget, group, interests) {
  const templates = [
    { title: 'Arrival & South Bali', area: 'Seminyak/Petitenget' },
    { title: 'Ubud Cultural Day', area: 'Ubud Center' },
    { title: 'Adventure Day', area: 'North & Central Bali' },
    { title: 'Beach & Chill', area: 'Uluwatu / Bingin' },
    { title: 'Nusa Penida Trip', area: 'Nusa Penida' },
    { title: 'Wellness & Spa', area: 'Ubud' },
    { title: 'Canggu Explorer', area: 'Canggu / Batu Bolong' },
    { title: 'Waterfalls & Nature', area: 'Munduk / Bedugul' },
    { title: 'East Bali Gems', area: 'Amed / Sidemen' },
    { title: 'Free Day & Shopping', area: 'Seminyak' },
    { title: 'Sunset & Nightlife', area: 'Canggu' },
    { title: 'Temple Circuit', area: 'Besakih / Lempuyang' },
    { title: 'Volcano Sunrise', area: 'Kintamani / Mount Batur' },
    { title: 'Departure Day', area: 'Jimbaran / Near Airport' },
  ];
  const breakfasts = [
    { name: '☕ Breakfast at Crate Cafe (Canggu)', price: '80K IDR' },
    { name: '🥞 Smoothie bowls at Nalu Bowls', price: '75K IDR' },
    { name: '🥐 Coffee & pastries at Baked.', price: '90K IDR' },
    { name: '🍳 Morning feast at Sisterfields Cafe', price: '120K IDR' },
    { name: '🥑 Avo toast at Milk & Madu', price: '95K IDR' },
    { name: '☕ River-view breakfast at Pison Ubud', price: '85K IDR' },
  ];
  const lunches = [
    { name: '🍜 Authentic Nasi Campur at Warung Wardani', price: '45K IDR' },
    { name: '🍛 Famous Babi Guling at Pak Malen', price: '60K IDR' },
    { name: '🥗 Organic lunch at Alchemy Bali', price: '110K IDR' },
    { name: '🍗 Nasi Ayam Kedewatan Bu Mangku', price: '35K IDR' },
    { name: '🌮 Tacos & Margaritas at Motel Mexicola', price: '150K IDR' },
  ];
  const dinners = [
    { name: '🌅 Seafood BBQ at Jimbaran Bay', price: '250K IDR' },
    { name: '🍹 Sunset dinner at La Lucciola', price: '350K IDR' },
    { name: '🥩 Premium cuts at Boy\'N\'Cow', price: '500K IDR' },
    { name: '🌴 Oceanfront dinner at La Brisa', price: '300K IDR' },
    { name: '✨ Tasting menu at Locavore NXT', price: '1.2M IDR' },
  ];
  const activities = {
    surfing: { name: '🏄 Surf session at Batu Bolong beach', price: '150K IDR' },
    wellness: { name: '🧘 Vinyasa Yoga class at The Yoga Barn', price: '140K IDR' },
    temples: { name: '🏛️ Blessing at Tirta Empul temple', price: '50K IDR' },
    beaches: { name: '🌊 Beach club day at Sundays Beach Club', price: '450K IDR' },
    nature: { name: '🌿 Walk through Campuhan Ridge & Tegallalang', price: '25K IDR' },
    food: { name: '🌶️ Balinese Cooking Class in Ubud', price: '350K IDR' },
    nightlife: { name: '🎉 Sunset drinks at Savaya Dayclub', price: '300K IDR' },
    photography: { name: '📸 Handara Gate & Ulun Danu sunrise', price: '75K IDR' },
    snorkeling: { name: '🤿 Manta Ray snorkeling at Nusa Penida', price: '450K IDR' },
    adventure: { name: '🏍️ Jungle ATV ride in Payangan', price: '500K IDR' },
    spa: { name: '💆 90-min Balinese massage at Bodyworks', price: '250K IDR' },
    art: { name: '🎨 Silver jewelry making class in Celuk', price: '400K IDR' },
  };

  const days = [];
  const costPerDay = budget === 'budget' ? [20,40] : budget === 'luxury' ? [150,300] : [60,120];

  for (let i = 0; i < numDays; i++) {
    const t = templates[i % templates.length];
    const breakfast = breakfasts[Math.floor(Math.random() * breakfasts.length)];
    const lunch = lunches[Math.floor(Math.random() * lunches.length)];
    const dinner = dinners[Math.floor(Math.random() * dinners.length)];

    const dayActivities = [
      { time: '8:30 AM', name: breakfast.name, price: breakfast.price },
    ];
    interests.slice(0, 3).forEach(int => {
      if (activities[int]) dayActivities.push({ time: `${10 + dayActivities.length}:00 AM`, ...activities[int] });
    });
    dayActivities.push({ time: '1:30 PM', name: lunch.name, price: lunch.price });
    if (!interests.includes('spa')) dayActivities.push({ time: '4:00 PM', name: '🌴 Relax by the pool / explore local boutiques', price: 'Free' });
    dayActivities.push({ time: '7:30 PM', name: dinner.name, price: dinner.price });
    days.push({ day: i + 1, title: t.title, area: t.area, activities: dayActivities });
  }

  return {
    title: `Your Perfect ${numDays}-Day Bali Itinerary`,
    total_estimate_min_usd: costPerDay[0] * numDays,
    total_estimate_max_usd: costPerDay[1] * numDays,
    days,
  };
}