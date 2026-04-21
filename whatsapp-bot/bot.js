// whatsapp-bot/bot.js
// BaliBuddy WhatsApp AI Concierge Bot
// Uses Twilio WhatsApp API + Claude AI

const express = require('express');
const Anthropic = require('@anthropic-ai/sdk');
const twilio = require('twilio');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ===== CONFIG =====
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const TWILIO_WHATSAPP = process.env.TWILIO_WHATSAPP_NUMBER; // whatsapp:+14155238886

// Simple in-memory conversation store (use Redis/DB in production)
const conversations = new Map();
const CONVERSATION_TTL = 24 * 60 * 60 * 1000; // 24 hours

// ===== SYSTEM PROMPT =====
const SYSTEM_PROMPT = `You are BaliBuddy, a friendly and knowledgeable AI travel assistant for Bali, Indonesia. You help tourists plan trips, answer questions, and book services.

YOUR PERSONALITY:
- Warm, helpful, and casual (like a well-traveled friend)
- Use emojis sparingly but naturally (1-2 per message max)
- Keep responses concise (under 300 words for WhatsApp readability)
- Be direct — tourists want answers, not essays

YOUR KNOWLEDGE:
- Up-to-date Bali travel info for 2026
- Fair prices for all services (transport, tours, food, wellness, rentals)
- Cultural etiquette and temple rules
- New regulations (tourist levy, proof of funds, customs app)
- Best areas for different travel styles
- Scam awareness and how to avoid common tourist traps

KEY PRICES TO KNOW:
- Airport → Seminyak: 150-250K IDR ($9-15)
- Airport → Ubud: 300-400K IDR ($19-25)
- Full-day private driver: 600-800K IDR ($37-50)
- Nasi Goreng at warung: 15-30K IDR ($1-2)
- 1hr Balinese massage: 80-150K IDR ($5-9)
- Scooter rental/day: 70-100K IDR ($4-6)
- Tourist Levy: 150K IDR ($9) — mandatory

BOOKING CAPABILITY:
When someone wants to book a service, collect:
1. Service type (airport transfer, driver, tour, etc.)
2. Date needed
3. Pickup location / hotel name
4. Number of people
5. Any special requests

Then respond with: "I'll connect you with a vetted driver/guide now. You'll get a confirmation with their name, photo, and car details within 5 minutes."

IMPORTANT RULES:
- Never recommend unlicensed services
- Always mention the tourist levy if someone is arriving
- If asked about drugs: "Indonesia has zero tolerance. Even small amounts can lead to life imprisonment."
- If unsure about something, say so honestly
- Always convert IDR to USD for international tourists
- Don't give medical or legal advice — suggest they see a professional`;

// ===== MESSAGE HANDLER =====
async function handleMessage(from, body) {
  // Get or create conversation history
  let convo = conversations.get(from) || { messages: [], lastActive: Date.now() };
  
  // Add user message
  convo.messages.push({ role: 'user', content: body });
  
  // Keep only last 20 messages for context
  if (convo.messages.length > 20) {
    convo.messages = convo.messages.slice(-20);
  }

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 500,
      system: SYSTEM_PROMPT,
      messages: convo.messages,
    });

    const reply = response.content
      .filter(b => b.type === 'text')
      .map(b => b.text)
      .join('');

    // Add assistant response to history
    convo.messages.push({ role: 'assistant', content: reply });
    convo.lastActive = Date.now();
    conversations.set(from, convo);

    return reply;

  } catch (error) {
    console.error('AI error:', error);
    return "Sorry, I'm having a quick technical issue! 🔧 Try again in a moment, or message us directly and a human will help you out.";
  }
}

// ===== TWILIO WEBHOOK =====
app.post('/webhook', async (req, res) => {
  const from = req.body.From; // whatsapp:+61xxxxxxxxxx
  const body = req.body.Body?.trim();

  if (!body) {
    res.sendStatus(200);
    return;
  }

  console.log(`📩 Message from ${from}: ${body}`);

  // Generate AI response
  const reply = await handleMessage(from, body);

  // Send via Twilio
  try {
    await twilioClient.messages.create({
      from: TWILIO_WHATSAPP,
      to: from,
      body: reply,
    });
    console.log(`✅ Reply sent to ${from}`);
  } catch (err) {
    console.error('Twilio send error:', err);
  }

  res.sendStatus(200);
});

// ===== HEALTH CHECK =====
app.get('/', (req, res) => {
  res.json({
    service: 'BaliBuddy WhatsApp Bot',
    status: 'active',
    conversations: conversations.size,
    uptime: process.uptime(),
  });
});

// ===== CLEANUP OLD CONVERSATIONS =====
setInterval(() => {
  const now = Date.now();
  for (const [key, convo] of conversations) {
    if (now - convo.lastActive > CONVERSATION_TTL) {
      conversations.delete(key);
    }
  }
}, 60 * 60 * 1000); // Every hour

// ===== START SERVER =====
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🌴 BaliBuddy WhatsApp Bot running on port ${PORT}`);
  console.log(`📱 Webhook URL: https://your-domain.com/webhook`);
  console.log(`   Set this in Twilio Console → Messaging → WhatsApp Sandbox`);
});