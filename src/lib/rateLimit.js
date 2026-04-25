// src/lib/rateLimit.js
// Simple in-memory rate limiter for serverless functions
// Resets on cold starts — sufficient for abuse prevention

const rateMap = new Map();

const WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_REQUESTS = 5; // 5 requests per minute per IP

export function rateLimit(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';
  const now = Date.now();

  // Clean old entries periodically
  if (rateMap.size > 10000) {
    for (const [key, entry] of rateMap) {
      if (now - entry.windowStart > WINDOW_MS * 2) {
        rateMap.delete(key);
      }
    }
  }

  const entry = rateMap.get(ip);

  if (!entry || now - entry.windowStart > WINDOW_MS) {
    // New window
    rateMap.set(ip, { windowStart: now, count: 1 });
    return { allowed: true, remaining: MAX_REQUESTS - 1 };
  }

  if (entry.count >= MAX_REQUESTS) {
    const retryAfter = Math.ceil((entry.windowStart + WINDOW_MS - now) / 1000);
    return { allowed: false, remaining: 0, retryAfter };
  }

  entry.count++;
  return { allowed: true, remaining: MAX_REQUESTS - entry.count };
}
