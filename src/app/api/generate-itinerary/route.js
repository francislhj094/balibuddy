// src/app/api/generate-itinerary/route.js
// AI-Powered Bali Itinerary Generator using Claude API

import Anthropic from '@anthropic-ai/sdk';
import { rateLimit } from '@/lib/rateLimit';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are BaliBuddy, an expert Bali travel planner. You create personalized, day-by-day itineraries for tourists visiting Bali.

RULES:
- Always respond with valid JSON only (no markdown, no backticks, no extra text)
- Keep responses concise to stay within token limits
- Include realistic, specific venue/location names
- Include fair prices in IDR for every activity
- Match activities to the user's interests, budget, and group type
- Include practical tips (what to wear, what to bring, best time to arrive)
- Factor in travel time between locations
- Always include meal suggestions with real restaurant names
- Mark activities that can be booked through BaliBuddy with "bookable": true
- Limit each day to 5-6 activities maximum to keep the response compact

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
  "title": "Your Perfect X-Day Bali Adventure",
  "summary": "Brief overview",
  "total_estimate_min_usd": 450,
  "total_estimate_max_usd": 800,
  "days": [
    {
      "day": 1,
      "title": "Arrival & South Bali",
      "area": "Seminyak",
      "activities": [
        {
          "time": "2:00 PM",
          "title": "Airport pickup",
          "description": "Vetted driver meets you at arrivals.",
          "price_idr": "200,000",
          "price_usd": 12,
          "bookable": true
        }
      ]
    }
  ]
}`;

export async function POST(request) {
  // Rate limiting — 5 requests per minute per IP
  const limit = rateLimit(request);
  if (!limit.allowed) {
    return Response.json(
      { error: 'Too many requests. Please wait a moment and try again.', code: 'RATE_LIMITED' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } }
    );
  }

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

    // Cap days to manage token usage
    const cappedDays = Math.min(parseInt(days), 14);

    const userPrompt = `Create a ${cappedDays}-day Bali itinerary for a ${group || 'couple'} traveling on a ${budget} budget.

Their interests: ${interests.join(', ')}
${arrivalDate ? `Arrival date: ${arrivalDate}` : ''}

Create a detailed day-by-day plan with specific venues, accurate prices, and practical tips. Make it personal and exciting. Include must-see highlights and hidden gems.

IMPORTANT: Respond with ONLY valid JSON. No markdown. No backticks. Keep each day to 5 activities max.`;

    // Scale max_tokens based on trip length
    const maxTokens = Math.min(1500 + (cappedDays * 500), 8000);

    const message = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: maxTokens,
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

    // Check if response was truncated
    const wasTruncated = message.stop_reason === 'max_tokens';

    // Clean and parse JSON
    let cleanJson = responseText.replace(/```json\n?|```\n?/g, '').trim();

    // If truncated, try to repair the JSON by closing open brackets
    if (wasTruncated) {
      cleanJson = repairTruncatedJson(cleanJson);
    }

    let itinerary;
    try {
      itinerary = JSON.parse(cleanJson);
    } catch (parseError) {
      // Attempt JSON repair
      const repaired = repairTruncatedJson(cleanJson);
      try {
        itinerary = JSON.parse(repaired);
      } catch {
        console.error('JSON parse failed. Raw response:', cleanJson.substring(0, 500));
        return Response.json(
          { error: 'AI returned invalid data. Please try again.', code: 'PARSE_ERROR' },
          { status: 500 }
        );
      }
    }

    return Response.json({
      success: true,
      itinerary,
      usage: {
        input_tokens: message.usage.input_tokens,
        output_tokens: message.usage.output_tokens,
        truncated: wasTruncated,
      }
    });

  } catch (error) {
    console.error('Itinerary generation error:', error);
    
    if (error.status === 401 || error.message?.includes('auth')) {
      return Response.json(
        { error: 'AI service authentication failed. Check API key.', code: 'AUTH_ERROR' },
        { status: 503 }
      );
    }

    if (error.status === 429) {
      return Response.json(
        { error: 'AI service rate limited. Please try again in a moment.', code: 'AI_RATE_LIMITED' },
        { status: 503 }
      );
    }

    return Response.json(
      { error: 'Failed to generate itinerary', details: error.message },
      { status: 500 }
    );
  }
}

/**
 * Attempt to repair truncated JSON by closing any open brackets/braces
 */
function repairTruncatedJson(json) {
  // Remove any trailing incomplete key-value pairs
  let repaired = json.replace(/,\s*"[^"]*"?\s*:?\s*$/, '');
  repaired = repaired.replace(/,\s*$/, '');

  // Count open vs close brackets
  const opens = { '{': 0, '[': 0 };
  const closes = { '}': '{', ']': '[' };

  for (const char of repaired) {
    if (char in opens) opens[char]++;
    if (char in closes) opens[closes[char]]--;
  }

  // Close any remaining open brackets in reverse order
  const stack = [];
  for (const char of repaired) {
    if (char === '{' || char === '[') stack.push(char);
    if (char === '}' || char === ']') stack.pop();
  }

  while (stack.length > 0) {
    const open = stack.pop();
    repaired += open === '{' ? '}' : ']';
  }

  return repaired;
}

export async function GET() {
  return Response.json({
    service: 'BaliBuddy Itinerary Generator',
    status: process.env.ANTHROPIC_API_KEY ? 'active' : 'missing_api_key',
    model: 'claude-haiku-4-5-20251001',
    version: '2.1.0',
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