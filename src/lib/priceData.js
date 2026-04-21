// src/lib/priceData.js
// Comprehensive Bali fair price database — update monthly

export const priceData = {
  transport: [
    { service: 'Airport → Seminyak/Kuta', fair: '150-250K IDR', fairUsd: '$9-15', scam: '500K+ IDR', save: '50-70%', bookable: true },
    { service: 'Airport → Ubud', fair: '300-400K IDR', fairUsd: '$19-25', scam: '800K+ IDR', save: '50-60%', bookable: true },
    { service: 'Airport → Canggu', fair: '200-300K IDR', fairUsd: '$12-19', scam: '600K+ IDR', save: '50-65%', bookable: true },
    { service: 'Airport → Uluwatu', fair: '200-350K IDR', fairUsd: '$12-22', scam: '700K+ IDR', save: '50-70%', bookable: true },
    { service: 'Airport → Nusa Dua', fair: '100-200K IDR', fairUsd: '$6-12', scam: '400K+ IDR', save: '50-75%', bookable: true },
    { service: 'Full-day private driver (10hr)', fair: '600-800K IDR', fairUsd: '$37-50', scam: '1.5M+ IDR', save: '50-60%', bookable: true },
    { service: 'Half-day driver (5hr)', fair: '350-500K IDR', fairUsd: '$22-31', scam: '900K+ IDR', save: '45-60%', bookable: true },
    { service: 'Grab/Gojek short ride (5km)', fair: '15-30K IDR', fairUsd: '$1-2', scam: '100K+ IDR', save: '70-85%' },
    { service: 'Bluebird taxi (metered, per km)', fair: '~7K IDR/km', fairUsd: '$0.45/km', scam: 'No meter = 5x' },
    { service: 'Fast boat Bali → Gili Islands', fair: '350-500K IDR', fairUsd: '$22-31', scam: '800K+ IDR', save: '50-55%' },
    { service: 'Fast boat Bali → Nusa Penida', fair: '150-250K IDR', fairUsd: '$9-15', scam: '500K+ IDR', save: '50-70%', bookable: true },
  ],
  tours: [
    { service: 'Ubud full day (terraces + monkey forest + waterfall)', fair: '400-600K IDR', fairUsd: '$25-37', scam: '1.2M+ IDR', save: '50-65%', bookable: true },
    { service: 'Nusa Penida day tour (boat + driver + lunch)', fair: '650-900K IDR', fairUsd: '$40-56', scam: '1.8M+ IDR', save: '50-65%', bookable: true },
    { service: 'Mt Batur sunrise trek + breakfast', fair: '350-500K IDR', fairUsd: '$22-31', scam: '1M+ IDR', save: '50-65%', bookable: true },
    { service: 'Uluwatu sunset + Kecak dance', fair: '200-350K IDR', fairUsd: '$12-22', scam: '800K+ IDR', save: '55-75%', bookable: true },
    { service: 'Ubud cooking class (half day)', fair: '300-450K IDR', fairUsd: '$19-28', scam: '900K+ IDR', save: '50-65%', bookable: true },
    { service: 'Snorkeling trip Amed/Menjangan', fair: '400-700K IDR', fairUsd: '$25-44', scam: '1.5M+ IDR', save: '55-70%', bookable: true },
    { service: 'East Bali full day (Tirta Gangga + Taman Ujung + Lempuyang)', fair: '500-700K IDR', fairUsd: '$31-44', scam: '1.5M+ IDR', save: '55-65%', bookable: true },
    { service: 'North Bali waterfalls tour (Sekumpul + Banyumala)', fair: '500-700K IDR', fairUsd: '$31-44', scam: '1.3M+ IDR', save: '45-60%', bookable: true },
    { service: 'Instagram tour (Gates of Heaven + swing + waterfall)', fair: '400-600K IDR', fairUsd: '$25-37', scam: '1.2M+ IDR', save: '50-65%', bookable: true },
  ],
  wellness: [
    { service: '1-hour Balinese massage', fair: '80-150K IDR', fairUsd: '$5-9', scam: '350K+ IDR', save: '55-75%' },
    { service: '2-hour spa package (massage + scrub + bath)', fair: '250-450K IDR', fairUsd: '$15-28', scam: '1M+ IDR', save: '55-75%', bookable: true },
    { service: 'Yoga class (drop-in)', fair: '100-150K IDR', fairUsd: '$6-9', scam: '300K+ IDR', save: '50-65%' },
    { service: 'Sound healing session', fair: '150-250K IDR', fairUsd: '$9-15', scam: '500K+ IDR', save: '50-65%' },
    { service: 'Balinese healer visit (Balian)', fair: '200-500K IDR', fairUsd: '$12-31', scam: '1M+ IDR', save: '50-60%' },
    { service: 'Ice bath + sauna circuit', fair: '150-250K IDR', fairUsd: '$9-15', scam: '500K+ IDR', save: '50-60%' },
    { service: 'Cacao ceremony', fair: '200-350K IDR', fairUsd: '$12-22', scam: '600K+ IDR', save: '40-55%' },
    { service: 'Ecstatic dance session', fair: '150-250K IDR', fairUsd: '$9-15', scam: '400K+ IDR', save: '40-60%' },
  ],
  food: [
    { service: 'Nasi Goreng / Nasi Campur (local warung)', fair: '15-30K IDR', fairUsd: '$1-2', scam: '80K+ IDR', save: '60-80%' },
    { service: 'Smoothie bowl (tourist café)', fair: '45-65K IDR', fairUsd: '$3-4', scam: '120K+ IDR', save: '45-60%' },
    { service: 'Bintang beer (bottle)', fair: '25-35K IDR', fairUsd: '$1.50-2', scam: '80K+ IDR', save: '55-70%' },
    { service: 'Coffee (local café)', fair: '20-35K IDR', fairUsd: '$1.25-2', scam: '70K+ IDR', save: '50-70%' },
    { service: 'Fresh coconut (beach)', fair: '15-25K IDR', fairUsd: '$1-1.50', scam: '60K+ IDR', save: '60-75%' },
    { service: 'Mid-range dinner for 2', fair: '200-400K IDR', fairUsd: '$12-25', scam: '800K+ IDR', save: '50-75%' },
    { service: 'Fine dining dinner for 2', fair: '800K-1.5M IDR', fairUsd: '$50-94', scam: '2.5M+ IDR', save: '40-60%' },
    { service: 'Private chef (dinner for 2-4)', fair: '500K-1M IDR', fairUsd: '$31-62', scam: '2M+ IDR', save: '50-60%', bookable: true },
  ],
  rentals: [
    { service: 'Scooter rental (per day)', fair: '70-100K IDR', fairUsd: '$4-6', scam: '200K+ IDR', save: '50-65%' },
    { service: 'Scooter rental (per month)', fair: '800K-1.2M IDR', fairUsd: '$50-75', scam: '2.5M+ IDR', save: '50-65%' },
    { service: 'Surfboard rental (per day)', fair: '50-100K IDR', fairUsd: '$3-6', scam: '250K+ IDR', save: '60-80%' },
    { service: 'Surf lesson (2 hours, beginner)', fair: '300-500K IDR', fairUsd: '$19-31', scam: '1M+ IDR', save: '50-70%', bookable: true },
    { service: 'Snorkel gear rental (per day)', fair: '30-50K IDR', fairUsd: '$2-3', scam: '150K+ IDR', save: '65-80%' },
    { service: 'Bicycle rental (per day)', fair: '50-80K IDR', fairUsd: '$3-5', scam: '200K+ IDR', save: '60-75%' },
    { service: 'GoPro rental (per day)', fair: '100-150K IDR', fairUsd: '$6-9', scam: '350K+ IDR', save: '55-70%' },
  ],
  essentials: [
    { service: 'Tourist Levy (mandatory)', fair: '150K IDR', fairUsd: '$9', scam: 'N/A — fixed fee', save: 'Pay online to avoid scams' },
    { service: 'eSIM (30 days unlimited)', fair: '$6-12 USD', fairUsd: '$6-12', scam: '$25+ airport SIM', save: '50-75%', bookable: true },
    { service: 'Travel insurance (7 days)', fair: '$15-40 USD', fairUsd: '$15-40', scam: 'N/A', save: 'Essential — don\'t skip' },
    { service: 'Visa on Arrival (30 days)', fair: '500K IDR', fairUsd: '$31', scam: 'N/A — fixed fee', save: 'Pay at immigration only' },
    { service: 'ATM withdrawal fee', fair: '~30-50K IDR', fairUsd: '$2-3', scam: 'Beware skimmers', save: 'Use bank-attached ATMs' },
    { service: 'Laundry (per kg)', fair: '10-15K IDR', fairUsd: '$0.60-1', scam: '40K+ IDR', save: '60-75%' },
  ],
};

// Exchange rate helper (update regularly)
export const EXCHANGE_RATE = {
  usdToIdr: 16000,
  lastUpdated: '2026-04-20',
};

export function idrToUsd(idr) {
  return (idr / EXCHANGE_RATE.usdToIdr).toFixed(2);
}

export function usdToIdr(usd) {
  return Math.round(usd * EXCHANGE_RATE.usdToIdr);
}