// src/app/opengraph-image.js
// Auto-generated OG image for social sharing using Next.js ImageResponse
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'BaliBuddy — AI Bali Trip Planner';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #0a0f1a 0%, #111827 50%, #0f172a 100%)',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background decoration */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(34,211,238,0.15) 0%, transparent 70%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-80px',
            left: '-80px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(52,211,153,0.1) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '24px',
          }}
        >
          <span style={{ fontSize: '48px' }}>🌴</span>
          <span
            style={{
              fontSize: '36px',
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '-0.02em',
            }}
          >
            BaliBuddy
          </span>
        </div>

        {/* Main headline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span
            style={{
              fontSize: '56px',
              fontWeight: 700,
              color: '#ffffff',
              textAlign: 'center',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
            }}
          >
            Plan Your Perfect
          </span>
          <span
            style={{
              fontSize: '56px',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #06b6d4, #22d3ee, #67e8f9)',
              backgroundClip: 'text',
              color: 'transparent',
              textAlign: 'center',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
            }}
          >
            Bali Trip in 60 Seconds
          </span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginTop: '28px',
            color: '#94a3b8',
            fontSize: '22px',
            letterSpacing: '0.02em',
          }}
        >
          <span>AI Itineraries</span>
          <span style={{ color: '#22d3ee' }}>•</span>
          <span>Fair Prices</span>
          <span style={{ color: '#22d3ee' }}>•</span>
          <span>Vetted Drivers</span>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            height: '4px',
            background: 'linear-gradient(90deg, #06b6d4, #22d3ee, #34d399)',
            display: 'flex',
          }}
        />
      </div>
    ),
    { ...size }
  );
}
