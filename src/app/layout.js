// src/app/layout.js
import './globals.css';
import Script from 'next/script';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  metadataBase: new URL('https://balibuddy.online'),
  title: {
    default: 'BaliBuddy — AI Bali Trip Planner & Trusted Booking',
    template: '%s | BaliBuddy',
  },
  description: 'Plan your perfect Bali trip in 60 seconds with AI. Get personalized itineraries, fair prices, and book vetted drivers & tours. Never get scammed again.',
  keywords: ['bali trip planner', 'bali itinerary', 'bali fair prices', 'bali airport transfer', 'bali scams', 'bali travel guide 2026', 'bali driver booking'],
  authors: [{ name: 'BaliBuddy' }],
  verification: {
    google: 'BMqK5hLlOoM7ftQUnfeiQoklyJmVI_9Bzje_a379SGI',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'BaliBuddy',
    title: 'BaliBuddy — Plan Your Perfect Bali Trip in 60 Seconds',
    description: 'AI-powered itineraries. Transparent pricing. Vetted local services. Never overpay or get scammed in Bali again.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'BaliBuddy — Bali Trip Planner' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BaliBuddy — AI Bali Trip Planner',
    description: 'Plan your perfect Bali trip in 60 seconds. Fair prices, vetted services, zero scams.',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://balibuddy.online' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
        {process.env.NEXT_PUBLIC_POSTHOG_KEY && (
          <Script id="posthog-analytics" strategy="afterInteractive">
            {`
              !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
              posthog.init('${process.env.NEXT_PUBLIC_POSTHOG_KEY}',{api_host:'https://app.posthog.com'})
            `}
          </Script>
        )}
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}