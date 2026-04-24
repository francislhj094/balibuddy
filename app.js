// ===== BaliBuddy App - Core JavaScript =====

// ===== MOBILE MENU =====
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('active');
}

// ===== INTEREST TAGS =====
function toggleTag(el) {
  el.classList.toggle('active');
}

// ===== PRICE DATA =====
const priceData = {
  transport: [
    { service: 'Airport → Seminyak/Kuta', fair: '150-250K IDR', scam: '500K+ IDR', save: '50-70%' },
    { service: 'Airport → Ubud', fair: '300-400K IDR', scam: '800K+ IDR', save: '50-60%' },
    { service: 'Airport → Canggu', fair: '200-300K IDR', scam: '600K+ IDR', save: '50-65%' },
    { service: 'Airport → Uluwatu', fair: '200-350K IDR', scam: '700K+ IDR', save: '50-70%' },
    { service: 'Full-day private driver (10hr)', fair: '600-800K IDR', scam: '1.5M+ IDR', save: '50-60%' },
    { service: 'Grab/Gojek short ride (5km)', fair: '15-30K IDR', scam: '100K+ IDR', save: '70-85%' },
    { service: 'Bluebird taxi (metered, per km)', fair: '~7K IDR/km', scam: 'No meter = 5x', save: '80%' },
  ],
  tours: [
    { service: 'Ubud full day (rice terrace + monkey forest + waterfall)', fair: '400-600K IDR', scam: '1.2M+ IDR', save: '50-65%' },
    { service: 'Nusa Penida day tour (boat + driver)', fair: '650-900K IDR', scam: '1.8M+ IDR', save: '50-65%' },
    { service: 'Mt Batur sunrise trek', fair: '350-500K IDR', scam: '1M+ IDR', save: '50-65%' },
    { service: 'Uluwatu temple sunset + Kecak dance', fair: '200-350K IDR', scam: '800K+ IDR', save: '55-75%' },
    { service: 'Ubud cooking class (half day)', fair: '300-450K IDR', scam: '900K+ IDR', save: '50-65%' },
    { service: 'Snorkeling trip (Amed/Menjangan)', fair: '400-700K IDR', scam: '1.5M+ IDR', save: '55-70%' },
  ],
  wellness: [
    { service: '1-hour Balinese massage', fair: '80-150K IDR', scam: '350K+ IDR', save: '55-75%' },
    { service: '2-hour spa package (massage + scrub + bath)', fair: '250-450K IDR', scam: '1M+ IDR', save: '55-75%' },
    { service: 'Yoga class (drop-in)', fair: '100-150K IDR', scam: '300K+ IDR', save: '50-65%' },
    { service: 'Sound healing session', fair: '150-250K IDR', scam: '500K+ IDR', save: '50-65%' },
    { service: 'Balinese healer visit (Balian)', fair: '200-500K IDR', scam: '1M+ IDR', save: '50-60%' },
    { service: 'Ice bath + sauna circuit', fair: '150-250K IDR', scam: '500K+ IDR', save: '50-60%' },
  ],
  food: [
    { service: 'Nasi Goreng (local warung)', fair: '15-30K IDR', scam: '80K+ IDR', save: '60-80%' },
    { service: 'Smoothie bowl (tourist café)', fair: '45-65K IDR', scam: '120K+ IDR', save: '45-60%' },
    { service: 'Bintang beer (bottle)', fair: '25-35K IDR', scam: '80K+ IDR', save: '55-70%' },
    { service: 'Coffee (local café)', fair: '20-35K IDR', scam: '70K+ IDR', save: '50-70%' },
    { service: 'Mid-range dinner for 2', fair: '200-400K IDR', scam: '800K+ IDR', save: '50-75%' },
    { service: 'Private chef (dinner for 2-4)', fair: '500K-1M IDR', scam: '2M+ IDR', save: '50-60%' },
  ],
  rentals: [
    { service: 'Scooter rental (per day)', fair: '70-100K IDR', scam: '200K+ IDR', save: '50-65%' },
    { service: 'Scooter rental (per month)', fair: '800K-1.2M IDR', scam: '2.5M+ IDR', save: '50-65%' },
    { service: 'Surfboard rental (per day)', fair: '50-100K IDR', scam: '250K+ IDR', save: '60-80%' },
    { service: 'Surf lesson (2 hours)', fair: '300-500K IDR', scam: '1M+ IDR', save: '50-70%' },
    { service: 'Snorkel gear rental (per day)', fair: '30-50K IDR', scam: '150K+ IDR', save: '65-80%' },
    { service: 'Bicycle rental (per day)', fair: '50-80K IDR', scam: '200K+ IDR', save: '60-75%' },
  ]
};

// ===== RENDER PRICE TABLE =====
function showPriceCategory(category, btn) {
  // Update active tab
  document.querySelectorAll('.price-tab').forEach(t => t.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const tbody = document.getElementById('priceTableBody');
  const data = priceData[category];
  
  tbody.innerHTML = data.map(row => `
    <tr>
      <td>${row.service}</td>
      <td class="fair">${row.fair}</td>
      <td class="scam">${row.scam}</td>
      <td class="save">Save ${row.save}</td>
    </tr>
  `).join('');
}

// Initialize price table
document.addEventListener('DOMContentLoaded', () => {
  showPriceCategory('transport', document.querySelector('.price-tab'));
});

// ===== ITINERARY GENERATOR =====
const itineraryTemplates = {
  activities: {
    surfing: [
      { time: '6:00 AM', name: '🏄 Sunrise surf session at Batu Bolong', price: 'Free / 100K board' },
      { time: '7:00 AM', name: '🏄 Surf lesson at Kuta Beach', price: '350K IDR' },
      { time: '3:00 PM', name: '🏄 Afternoon surf at Uluwatu (advanced)', price: 'Free' },
    ],
    wellness: [
      { time: '7:00 AM', name: '🧘 Morning yoga at The Yoga Barn, Ubud', price: '130K IDR' },
      { time: '10:00 AM', name: '💆 2-hour spa package with flower bath', price: '400K IDR' },
      { time: '2:00 PM', name: '🧘 Sound healing & meditation session', price: '200K IDR' },
    ],
    temples: [
      { time: '9:00 AM', name: '🏛️ Tirta Empul holy water temple', price: '50K IDR' },
      { time: '5:00 PM', name: '🏛️ Uluwatu Temple sunset + Kecak dance', price: '100K IDR' },
      { time: '8:00 AM', name: '🏛️ Besakih Mother Temple (with guide)', price: '200K IDR' },
    ],
    beaches: [
      { time: '9:00 AM', name: '🌊 Beach day at Padang Padang', price: 'Free' },
      { time: '10:00 AM', name: '🌊 Explore Nyang Nyang secret beach', price: 'Free' },
      { time: '4:00 PM', name: '🌊 Sunset drinks at Finns Beach Club', price: '200K+ IDR' },
    ],
    nature: [
      { time: '5:00 AM', name: '🌿 Mt Batur sunrise trek + breakfast', price: '450K IDR' },
      { time: '9:00 AM', name: '🌿 Tegallalang Rice Terraces walk', price: '20K IDR' },
      { time: '10:00 AM', name: '🌿 Sekumpul Waterfall hike', price: '200K IDR' },
    ],
    food: [
      { time: '8:00 AM', name: '🍜 Breakfast at local warung (Nasi Campur)', price: '25K IDR' },
      { time: '12:00 PM', name: '🍜 Babi Guling feast at Ibu Oka, Ubud', price: '80K IDR' },
      { time: '7:00 PM', name: '🍜 Sunset dinner at La Brisa, Canggu', price: '300K IDR pp' },
    ],
    nightlife: [
      { time: '7:00 PM', name: '🎉 Sunset cocktails at Potato Head Beach Club', price: '150K+ IDR' },
      { time: '9:00 PM', name: '🎉 Night out at Old Man\'s, Canggu', price: '100K+ IDR' },
      { time: '10:00 PM', name: '🎉 Live music at The Lawn, Canggu', price: '100K+ IDR' },
    ],
    snorkeling: [
      { time: '8:00 AM', name: '🤿 Snorkeling at Blue Lagoon, Padangbai', price: '400K IDR' },
      { time: '7:00 AM', name: '🤿 Manta ray snorkeling at Nusa Penida', price: '750K IDR' },
      { time: '9:00 AM', name: '🤿 USAT Liberty shipwreck snorkel, Amed', price: '300K IDR' },
    ],
    photography: [
      { time: '6:00 AM', name: '📸 Sunrise at Handara Gate', price: '50K IDR' },
      { time: '8:00 AM', name: '📸 Lempuyang Temple "Gates of Heaven"', price: '100K IDR' },
      { time: '4:00 PM', name: '📸 Golden hour at Campuhan Ridge Walk', price: 'Free' },
    ],
    adventure: [
      { time: '8:00 AM', name: '🏍️ ATV ride through jungle & rice paddies', price: '500K IDR' },
      { time: '9:00 AM', name: '🏍️ White water rafting on Ayung River', price: '400K IDR' },
      { time: '10:00 AM', name: '🏍️ Bali Swing + zipline experience', price: '300K IDR' },
    ],
    spa: [
      { time: '10:00 AM', name: '💆 Balinese traditional massage (1hr)', price: '120K IDR' },
      { time: '2:00 PM', name: '💆 Coconut oil hair treatment + head massage', price: '150K IDR' },
      { time: '4:00 PM', name: '💆 Hot stone therapy & aromatherapy', price: '250K IDR' },
    ],
    art: [
      { time: '9:00 AM', name: '🎨 Silver jewelry making class', price: '350K IDR' },
      { time: '10:00 AM', name: '🎨 Batik painting workshop', price: '200K IDR' },
      { time: '2:00 PM', name: '🎨 Visit ARMA Museum + art galleries', price: '80K IDR' },
    ],
  },
  
  dayTemplates: [
    { title: 'Arrival & South Bali', area: 'Seminyak / Kuta' },
    { title: 'Ubud Cultural Immersion', area: 'Ubud' },
    { title: 'Adventure Day', area: 'North / East Bali' },
    { title: 'Beach & Chill', area: 'Uluwatu / Bukit' },
    { title: 'Nusa Penida Island Trip', area: 'Nusa Penida' },
    { title: 'Wellness & Spa Day', area: 'Ubud / Canggu' },
    { title: 'Canggu Explorer', area: 'Canggu' },
    { title: 'Waterfall & Nature', area: 'Central / North Bali' },
    { title: 'East Bali Gems', area: 'Amed / Sidemen' },
    { title: 'Free Day & Shopping', area: 'Seminyak' },
    { title: 'Sunset & Nightlife', area: 'Canggu / Seminyak' },
    { title: 'Temple Circuit', area: 'Island-wide' },
    { title: 'Volcano Sunrise', area: 'Kintamani' },
    { title: 'Departure Day', area: 'Near Airport' },
  ]
};

function generateItinerary() {
  const days = parseInt(document.getElementById('tripDays').value);
  const budget = document.getElementById('tripBudget').value;
  const group = document.getElementById('tripGroup').value;
  
  // Get selected interests
  const selectedTags = Array.from(document.querySelectorAll('.tag.active'))
    .map(t => t.textContent.trim().split(' ').slice(1).join(' ').toLowerCase());
  
  const interestMap = {
    'surfing': 'surfing', 'wellness & yoga': 'wellness', 'temples & culture': 'temples',
    'beaches': 'beaches', 'nature & hiking': 'nature', 'food & dining': 'food',
    'nightlife': 'nightlife', 'photography': 'photography', 'snorkeling & diving': 'snorkeling',
    'adventure': 'adventure', 'spa & massage': 'spa', 'art & crafts': 'art'
  };
  
  const interests = selectedTags.map(t => interestMap[t]).filter(Boolean);
  if (interests.length === 0) interests.push('temples', 'food', 'beaches');
  
  // Generate days
  const itineraryDays = document.getElementById('itineraryDays');
  let totalMin = 0, totalMax = 0;
  let html = '';
  
  for (let i = 0; i < days; i++) {
    const template = itineraryTemplates.dayTemplates[i % itineraryTemplates.dayTemplates.length];
    
    // Pick 4-5 activities mixing interests
    let dayActivities = [];
    
    // Always start with a morning activity
    dayActivities.push({ time: '8:00 AM', name: '☕ Breakfast at your villa / local café', price: '30-60K IDR' });
    
    // Add 3-4 activities from interests
    const shuffled = [...interests].sort(() => Math.random() - 0.5);
    for (let j = 0; j < Math.min(3, shuffled.length); j++) {
      const acts = itineraryTemplates.activities[shuffled[j]];
      if (acts) {
        const act = acts[Math.floor(Math.random() * acts.length)];
        dayActivities.push(act);
      }
    }
    
    // Add evening activity
    if (i < days - 1) {
      const eveningOptions = [
        { time: '7:00 PM', name: '🌅 Sunset dinner at beachfront restaurant', price: '200-400K IDR' },
        { time: '6:30 PM', name: '🍜 Local warung dinner + fresh juice', price: '50-100K IDR' },
        { time: '7:00 PM', name: '🌙 Night market street food exploration', price: '50-80K IDR' },
      ];
      dayActivities.push(eveningOptions[Math.floor(Math.random() * eveningOptions.length)]);
    }
    
    // Sort by time
    dayActivities.sort((a, b) => {
      const timeA = a.time.includes('PM') && !a.time.includes('12') ? parseInt(a.time) + 12 : parseInt(a.time);
      const timeB = b.time.includes('PM') && !b.time.includes('12') ? parseInt(b.time) + 12 : parseInt(b.time);
      return timeA - timeB;
    });
    
    // Calculate day cost
    let dayCostMin = budget === 'budget' ? 300000 : budget === 'luxury' ? 1500000 : 700000;
    let dayCostMax = budget === 'budget' ? 600000 : budget === 'luxury' ? 3000000 : 1500000;
    totalMin += dayCostMin;
    totalMax += dayCostMax;
    
    html += `
      <div class="day-card">
        <h4>Day ${i + 1}: ${template.title} — ${template.area}</h4>
        ${dayActivities.map(a => `
          <div class="day-activity">
            <span class="activity-time">${a.time}</span>
            <span class="activity-name">${a.name}</span>
            <span class="activity-price">${a.price}</span>
          </div>
        `).join('')}
      </div>
    `;
  }
  
  itineraryDays.innerHTML = html;
  
  // Set meta info
  document.getElementById('itineraryMeta').textContent = 
    `${days} days · ${capitalize(budget)} budget · ${capitalize(group)} · ${selectedTags.join(', ')}`;
  
  // Set total estimate
  const minUSD = Math.round(totalMin / 16000);
  const maxUSD = Math.round(totalMax / 16000);
  document.getElementById('totalEstimate').innerHTML = `
    <span>Estimated total for ${days} days (activities + food + transport):</span>
    <strong>$${minUSD} — $${maxUSD} USD</strong>
  `;
  
  // Show result, hide form
  document.getElementById('plannerForm').style.display = 'none';
  document.getElementById('itineraryResult').style.display = 'block';
  
  // Confetti effect
  throwConfetti();
  
  // Scroll to result
  document.getElementById('itineraryResult').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function resetPlanner() {
  document.getElementById('plannerForm').style.display = 'block';
  document.getElementById('itineraryResult').style.display = 'none';
}

function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

// ===== BOOKING MODAL =====
const serviceNames = {
  'airport-transfer': '✈️ Airport Transfer',
  'day-driver': '🚗 Private Day Driver',
  'ubud-tour': '🌋 Ubud Day Tour',
  'nusa-penida': '🤿 Nusa Penida Tour',
  'spa': '💆 Spa & Wellness Package',
  'esim': '📱 Bali eSIM'
};

function bookService(serviceId) {
  const modal = document.getElementById('bookingModal');
  document.getElementById('modalTitle').textContent = `Book: ${serviceNames[serviceId] || serviceId}`;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('bookingModal').classList.remove('active');
  document.body.style.overflow = '';
}

function submitBooking() {
  const title = document.getElementById('modalTitle').textContent;
  const wa = `https://wa.me/6282341834263?text=${encodeURIComponent(`Hi BaliBuddy! I'd like to book: ${title}`)}`;
  window.open(wa, '_blank');
  closeModal();
}

// Close modal on overlay click
document.getElementById('bookingModal').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

// ===== SHARE ITINERARY =====
function shareItinerary() {
  if (navigator.share) {
    navigator.share({
      title: 'My Bali Itinerary — BaliBuddy',
      text: 'Check out my personalized Bali trip plan!',
      url: window.location.href
    });
  } else {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  }
}

function sendToWhatsApp() {
  const days = document.getElementById('tripDays').value;
  const budget = document.getElementById('tripBudget').value;
  const msg = `Hi BaliBuddy! I just created a ${days}-day ${budget} itinerary on your website and I'd love to book the services. Can you help?`;
  window.open(`https://wa.me/6282341834263?text=${encodeURIComponent(msg)}`, '_blank');
}

function bookServices() {
  document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
}

function downloadChecklist() {
  alert('📋 Checklist will be sent to your email! (Feature coming soon — in the meantime, screenshot the checklist on this page!)');
}

// ===== NAV & PARALLAX SCROLL EFFECT =====
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  const heroBg = document.querySelector('.hero-bg');
  const scroll = window.scrollY;
  
  // Nav background
  if (scroll > 100) {
    nav.style.background = 'rgba(10,15,26,0.95)';
  } else {
    nav.style.background = 'rgba(10,15,26,0.85)';
  }
  
  // Parallax
  if (heroBg && scroll < window.innerHeight) {
    heroBg.style.transform = `translateY(${scroll * 0.4}px)`;
  }
  
  lastScroll = scroll;
});

// ===== TYPING ANIMATION =====
function typeWriter(element, text, speed) {
  let i = 0;
  element.innerHTML = '';
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// ===== CONFETTI ANIMATION =====
function throwConfetti() {
  const colors = ['#06b6d4', '#34d399', '#f87171', '#fbbf24', '#8b5cf6'];
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '-10px';
    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    confetti.style.zIndex = '9999';
    confetti.style.pointerEvents = 'none';
    confetti.style.transition = 'transform 2s cubic-bezier(0.25, 0.46, 0.45, 0.94), top 2s ease-in, opacity 2s ease-in';
    document.body.appendChild(confetti);
    
    setTimeout(() => {
      confetti.style.top = '100vh';
      confetti.style.transform = `rotate(${Math.random() * 360}deg) translateX(${Math.random() * 100 - 50}px)`;
      confetti.style.opacity = '0';
    }, 10);
    
    setTimeout(() => confetti.remove(), 2000);
  }
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.problem-card, .service-card, .step, .testimonial').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
  
  const headingSpan = document.querySelector('.hero h1 .gradient-text');
  if (headingSpan) {
    const text = headingSpan.textContent;
    typeWriter(headingSpan, text, 80);
  }
});