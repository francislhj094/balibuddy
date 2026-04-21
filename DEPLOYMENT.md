# 🚀 BaliBuddy Deployment Guide

## Quick Start (Local Development)

### 1. Website (Next.js)
```bash
cd Bali2
npm install
cp .env.example .env.local
# Fill in your API keys in .env.local
npm run dev
# → Open http://localhost:3000
```

### 2. WhatsApp Bot
```bash
cd whatsapp-bot
npm install
# Set environment variables:
export ANTHROPIC_API_KEY=sk-ant-xxxxx
export TWILIO_ACCOUNT_SID=ACxxxxx
export TWILIO_AUTH_TOKEN=xxxxx
export TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
npm run dev
# → Bot running on http://localhost:3001
```

---

## Production Deployment

### Step 1: Deploy Website to Vercel (Free)

1. Push code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit - BaliBuddy MVP"
git remote add origin https://github.com/yourusername/balibuddy.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com) → Import Project → Select your repo

3. Add environment variables in Vercel dashboard:
   - `ANTHROPIC_API_KEY`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`
   - `NEXT_PUBLIC_APP_URL`

4. Deploy → Your site is live at `balibuddy.vercel.app`

5. Add custom domain: `balibuddy.com` (buy on Namecheap/GoDaddy ~$10/year)

### Step 2: Deploy WhatsApp Bot to Railway (Free tier)

1. Go to [railway.app](https://railway.app)
2. New Project → Deploy from GitHub repo
3. Set root directory to `whatsapp-bot`
4. Add environment variables
5. Get your public URL: `balibuddy-bot.up.railway.app`

### Step 3: Connect Twilio WhatsApp

1. Create account at [twilio.com](https://www.twilio.com)
2. Go to: Messaging → Try it out → Send a WhatsApp message
3. Follow sandbox setup (for testing)
4. For production: Apply for WhatsApp Business API access
5. Set webhook URL: `https://balibuddy-bot.up.railway.app/webhook`

### Step 4: Set Up Payments (Xendit)

1. Register at [xendit.co](https://www.xendit.co)
2. Complete business verification (Indonesian entity or international)
3. Get API keys from dashboard
4. Add to `.env.local`:
   ```
   XENDIT_SECRET_KEY=xnd_production_xxxxx
   XENDIT_PUBLIC_KEY=xnd_public_production_xxxxx
   ```
5. Supports: bank transfer, e-wallets (GoPay, OVO, DANA), credit cards

---

## Cost Breakdown (Monthly)

| Service | Cost | Notes |
|---------|------|-------|
| Vercel (hosting) | $0 | Free tier covers 100K requests/month |
| Railway (WhatsApp bot) | $0-5 | Free tier, then $5/mo |
| Anthropic Claude API | $10-50 | ~$0.003 per itinerary, ~$0.001 per WhatsApp message |
| Twilio WhatsApp | $15-50 | $0.005/message sent + $0.005/message received |
| Domain name | $1/mo | ~$10-12/year |
| **Total** | **$26-106/mo** | Scales with usage |

**Break-even**: ~5-20 bookings per month at $5-10 commission each

---

## SEO Setup (Critical for organic traffic)

### Essential Pages to Create
1. `/` — Landing page (done)
2. `/plan` — AI Trip Planner tool
3. `/prices` — Fair Price Guide (SEO goldmine)
4. `/blog` — Travel articles
5. `/book/airport-transfer` — Booking pages for each service
6. `/checklist` — 2026 Bali Arrival Checklist

### Priority Blog Articles (Target Keywords)
Write these first — they have the highest search volume:

| Article | Target Keyword | Monthly Searches |
|---------|---------------|-----------------|
| "7 Day Bali Itinerary 2026" | bali itinerary 7 days | 40,000+ |
| "Things to Do in Bali 2026" | things to do in bali | 100,000+ |
| "Bali on a Budget 2026" | bali budget travel | 25,000+ |
| "Bali Scams to Avoid" | bali scams | 15,000+ |
| "How Much Does Bali Cost?" | bali trip cost | 20,000+ |
| "Canggu vs Seminyak vs Ubud" | where to stay bali | 30,000+ |
| "Bali Airport Transfer Guide" | bali airport to seminyak | 10,000+ |
| "Best Time to Visit Bali 2026" | best time visit bali | 35,000+ |
| "Bali for First Timers" | first time bali tips | 15,000+ |
| "Nusa Penida Day Trip Guide" | nusa penida day trip | 20,000+ |

### SEO Technical Setup
- Add `<meta>` tags to every page (title, description, og:image)
- Create `sitemap.xml` (Next.js can auto-generate)
- Submit to Google Search Console
- Add structured data (FAQ schema, How-to schema)
- Ensure Core Web Vitals pass (Vercel handles this well)

---

## Social Media Launch Plan

### TikTok/Instagram Reels (Week 1-4)

Post 3-5 times per week. Format ideas that go viral in the Bali travel niche:

1. **"What things ACTUALLY cost in Bali"** — Show fair price vs tourist price side by side
2. **"POV: Your first day in Bali"** — Show the chaos, then how BaliBuddy fixes it
3. **"I asked AI to plan my Bali trip"** — Screen record using the trip planner
4. **"Bali scam I fell for so you don't have to"** — Story format, end with BaliBuddy plug
5. **"$50/day in Bali — what you actually get"** — Budget breakdown
6. **"Don't make this mistake in Bali temples"** — Cultural tips
7. **"How much my 7-day Bali trip cost (honest breakdown)"** — Relatable, shareable

### Reddit / Facebook Groups (Ongoing)
- Answer questions in r/bali, r/travel, r/digitalnomad
- Share the Fair Price Guide as a helpful resource (not spammy)
- Join "Bali Expats", "Bali Travel Forum" Facebook groups
- Provide genuine value first, link to BaliBuddy naturally

---

## Checklist Before Launch

- [ ] Website deployed to Vercel with custom domain
- [ ] WhatsApp bot deployed and connected to Twilio
- [ ] Anthropic API key set up with spending limits
- [ ] At least 10 vetted drivers/guides onboarded
- [ ] Fair Price Guide reviewed and accurate
- [ ] 5 blog articles published (SEO)
- [ ] TikTok/Instagram account created with 3 videos posted
- [ ] Google Search Console submitted
- [ ] Google Analytics / PostHog tracking added
- [ ] Terms of Service and Privacy Policy pages added
- [ ] Booking confirmation flow tested end-to-end
- [ ] Mobile responsiveness tested on iPhone and Android

---

**Questions? Join the Bali Startup & Tech Community:** https://www.balistartupandtech.com/
