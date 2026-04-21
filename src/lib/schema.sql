-- ============================================
-- BaliBuddy Supabase Database Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- ===== BOOKINGS =====
CREATE TABLE bookings (
  id TEXT PRIMARY KEY,
  service TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_whatsapp TEXT NOT NULL,
  customer_email TEXT,
  date DATE NOT NULL,
  pickup_location TEXT,
  dropoff_location TEXT,
  notes TEXT,
  group_size INTEGER DEFAULT 1,
  
  -- Pricing
  price_idr BIGINT,
  price_usd DECIMAL(10,2),
  commission_idr BIGINT,
  commission_usd DECIMAL(10,2),
  
  -- Assignment
  driver_id UUID REFERENCES drivers(id),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','confirmed','assigned','in_progress','completed','cancelled','refunded')),
  
  -- Tracking
  source TEXT DEFAULT 'website' CHECK (source IN ('website','whatsapp','referral','direct')),
  utm_source TEXT,
  utm_campaign TEXT,
  
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ
);

-- ===== DRIVERS / SERVICE PROVIDERS =====
CREATE TABLE drivers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL UNIQUE,
  whatsapp TEXT NOT NULL,
  email TEXT,
  photo_url TEXT,
  
  -- Vehicle
  vehicle_type TEXT CHECK (vehicle_type IN ('car','minivan','bus','motorbike','boat')),
  vehicle_model TEXT,
  vehicle_year INTEGER,
  license_plate TEXT,
  
  -- Capabilities
  languages TEXT[] DEFAULT ARRAY['id','en'],
  services TEXT[] DEFAULT ARRAY['airport-transfer','day-driver'],
  areas TEXT[] DEFAULT ARRAY['seminyak','canggu','ubud'],
  
  -- Ratings
  rating DECIMAL(3,2) DEFAULT 5.00,
  total_reviews INTEGER DEFAULT 0,
  total_trips INTEGER DEFAULT 0,
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  is_verified BOOLEAN DEFAULT false,
  verified_at TIMESTAMPTZ,
  
  -- Documents
  license_expiry DATE,
  insurance_expiry DATE,
  
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ===== REVIEWS =====
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id TEXT REFERENCES bookings(id),
  driver_id UUID REFERENCES drivers(id),
  
  customer_name TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  
  -- Source
  platform TEXT DEFAULT 'balibuddy' CHECK (platform IN ('balibuddy','google','whatsapp')),
  is_published BOOLEAN DEFAULT true,
  
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ===== ITINERARIES (saved/shared) =====
CREATE TABLE itineraries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  share_slug TEXT UNIQUE,
  
  -- Config
  days INTEGER NOT NULL,
  budget TEXT NOT NULL,
  group_type TEXT,
  interests TEXT[],
  arrival_date DATE,
  
  -- Generated content (JSON)
  content JSONB NOT NULL,
  
  -- Tracking
  views INTEGER DEFAULT 0,
  bookings_made INTEGER DEFAULT 0,
  
  customer_whatsapp TEXT,
  customer_email TEXT,
  
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ===== PRICE GUIDE ENTRIES =====
CREATE TABLE prices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL CHECK (category IN ('transport','tours','wellness','food','rentals','essentials')),
  service TEXT NOT NULL,
  
  fair_price_min_idr BIGINT,
  fair_price_max_idr BIGINT,
  scam_price_idr BIGINT,
  save_percentage TEXT,
  
  fair_price_usd TEXT,
  is_bookable BOOLEAN DEFAULT false,
  
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ===== BLOG ARTICLES =====
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT NOT NULL,
  
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  canonical_url TEXT,
  og_image_url TEXT,
  
  -- Categorization
  category TEXT CHECK (category IN ('itinerary','guide','tips','prices','area','activity')),
  tags TEXT[],
  
  -- Status
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft','published','archived')),
  published_at TIMESTAMPTZ,
  
  -- Analytics
  views INTEGER DEFAULT 0,
  
  author TEXT DEFAULT 'BaliBuddy Team',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ===== WAITLIST / NEWSLETTER =====
CREATE TABLE subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE,
  whatsapp TEXT,
  name TEXT,
  source TEXT DEFAULT 'website',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ===== INDEXES =====
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_date ON bookings(date);
CREATE INDEX idx_bookings_driver ON bookings(driver_id);
CREATE INDEX idx_bookings_created ON bookings(created_at DESC);
CREATE INDEX idx_drivers_active ON drivers(is_active, is_verified);
CREATE INDEX idx_drivers_areas ON drivers USING GIN(areas);
CREATE INDEX idx_reviews_driver ON reviews(driver_id);
CREATE INDEX idx_itineraries_slug ON itineraries(share_slug);
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_status ON articles(status, published_at DESC);
CREATE INDEX idx_prices_category ON prices(category, display_order);

-- ===== ROW LEVEL SECURITY =====
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE itineraries ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE prices ENABLE ROW LEVEL SECURITY;

-- Public read access to prices, articles, and published reviews
CREATE POLICY "Public read prices" ON prices FOR SELECT USING (is_active = true);
CREATE POLICY "Public read articles" ON articles FOR SELECT USING (status = 'published');
CREATE POLICY "Public read reviews" ON reviews FOR SELECT USING (is_published = true);

-- ===== TRIGGERS =====
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER drivers_updated_at BEFORE UPDATE ON drivers FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER articles_updated_at BEFORE UPDATE ON articles FOR EACH ROW EXECUTE FUNCTION update_updated_at();