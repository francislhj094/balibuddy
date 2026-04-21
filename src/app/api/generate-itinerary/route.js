// src/app/api/generate-itinerary/route.js
// AI-Powered Bali Itinerary Generator using Claude API

import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are BaliBuddy, an expert Bali travel planner. You create personalized, day-by-day itineraries for tourists visiting Bali.

RULES:
- Always respond with valid JSON only (no markdown, no backticks)
- Include realistic, specific venue/location names
- Include fair prices in IDR for every activity
- Match activities to the user's interests, budget, and group type
- Include practical tips (what to wear, what to bring, best time to arrive)
- Factor in travel time between locations
- Always include meal suggestions with real restaurant names
- Mark activities that can be booked through BaliBuddy with "bookable": true

BUDGET TIERS:
- Budget: Local warungs, Gojek transport, public beaches, free temples. ~300K-600K IDR/day
- Mid-range: Nice cafés, private driver, paid experiences, beach clubs. ~700K-1.5M IDR/day  
- Luxury: Fine dining, private tours, premium spas, sunset cocktails. ~1.5M-4M IDR/day

AREAS TO CONSIDER:
- Canggu: Surf, cafés, nightlife, digital nomads
- Seminyak: Shopping, beach clubs, upscale dining
- Ubud: Culture, rice terraces, yoga, art
- Uluwatu: Cliffs, surf (advanced), temples, beach clubs
- Nusa Penida: Day trip, snorkeling, dramatic cliffs
- North Bali: Waterfalls, quiet, dolphins, diving
- East Bali: Amed, Sidemen, volcano, authentic culture

RESPONSE FORMAT (JSON):
{
  "title": "Your Perfect 7-Day Bali Adventure",
  "summary": "Brief 1-2 sentence overview",
  "total_estimate_min_usd": 450,
  "total_estimate_max_usd": 800,
  "pre_arrival_checklist": [
    "Pay tourist levy (IDR 150K) at lovebali.baliprov.go.id",
    "Download All Indonesia arrivals app",
    "Get eSIM before boarding",
    "Book airport transfer in advance"
  ],
  "days": [
    {
      "day": 1,
      "title": "Arrival & South Bali Vibes",
      "area": "Seminyak",
      "activities": [
        {
          "time": "2:00 PM",
          "title": "Airport pickup & drive to hotel",
          "description": "Your vetted driver meets you at arrivals with a sign. AC car, cold water, WiFi.",
          "price_idr": "200,000",
          "price_usd": 12,
          "tip": "Don't accept any ride offers inside the terminal",
          "bookable": true
        }
      ],
      "day_total_min_idr": 500000,
      "day_total_max_idr": 900000
    }
  ],
  "packing_tips": ["Sarong for temples", "Reef-safe sunscreen", "Mosquito repellent"],
  "important_notes": ["Nyepi day shuts everything down", "ATMs: use bank-attached machines only"]
}`;

export async function POST(request) {
  try {
    const body = await request.json();
    const { days, budget, group, interests, arrivalDate } = body;

    // Validate input
    if (!days || !budget || !interests) {
      return Response.json(
        { error: 'Missing required fields: days, budget, interests' },
        { status: 400 }
      );
    }

    const userPrompt = `Create a ${days}-day Bali itinerary for a ${group || 'couple'} traveling on a ${budget} budget.

Their interests: ${interests.join(', ')}
${arrivalDate ? `Arrival date: ${arrivalDate}` : ''}

Create a detailed day-by-day plan with specific venues, accurate prices, and practical tips. Make it feel personal and exciting, not generic. Include a mix of must-see highlights and hidden gems that most tourists miss.

Respond with JSON only.`;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      system: SYSTEM_PROMPT,
      messages: [
        { role: 'user', content: userPrompt }
      ],
    });

    // Extract text content
    const responseText = message.content
      .filter(block => block.type === 'text')
      .map(block => block.text)
      .join('');

    // Parse JSON (handle potential markdown wrapping)
    const cleanJson = responseText.replace(/```json\n?|```\n?/g, '').trim();
    const itinerary = JSON.parse(cleanJson);

    return Response.json({
      success: true,
      itinerary,
      usage: {
        input_tokens: message.usage.input_tokens,
        output_tokens: message.usage.output_tokens,
      }
    });

  } catch (error) {
    console.error('Itinerary generation error:', error);
    
    // Return a fallback itinerary if AI fails
    if (error.message?.includes('API')) {
      return Response.json(
        { error: 'AI service temporarily unavailable. Please try again.', code: 'AI_ERROR' },
        { status: 503 }
      );
    }

    return Response.json(
      { error: 'Failed to generate itinerary', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return Response.json({
    service: 'BaliBuddy Itinerary Generator',
    status: 'active',
    version: '1.0.0',
    endpoints: {
      POST: {
        description: 'Generate a personalized Bali itinerary',
        body: {
          days: 'number (3-14)',
          budget: 'string (budget | mid | luxury)',
          group: 'string (solo | couple | friends | family | large)',
          interests: 'string[] (surfing, wellness, temples, beaches, nature, food, nightlife, photography, snorkeling, adventure, spa, art)',
          arrivalDate: 'string (optional, ISO date)'
        }
      }
    }
  });
}