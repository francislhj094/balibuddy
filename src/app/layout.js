// src/app/layout.js
import './globals.css';
import Script from 'next/script';
import { Plus_Jakarta_Sans, DM_Serif_Display } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
});

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
});

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
  other: {
    'theme-color': '#0a0f1a',
    'color-scheme': 'dark',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
  },
};

export const viewport = {
  themeColor: '#0a0f1a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`scroll-smooth ${jakarta.variable} ${dmSerif.variable}`}>
      <head>
        {/* Preconnect to critical third-party origins */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
      </head>
      <body className="antialiased font-body">
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
        {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
          <>
            <Script id="meta-pixel" strategy="lazyOnload">
              {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
                fbq('track', 'PageView');
              `}
            </Script>
            <noscript>
              <img height="1" width="1" style={{display:'none'}}
                src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_META_PIXEL_ID}&ev=PageView&noscript=1`}
              />
            </noscript>
          </>
        )}
        {process.env.NEXT_PUBLIC_POSTHOG_KEY && (
          <Script id="posthog-analytics" strategy="lazyOnload">
            {`
              !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
              posthog.init('${process.env.NEXT_PUBLIC_POSTHOG_KEY}',{api_host:'https://app.posthog.com'})
            `}
          </Script>
        )}
        <Navbar />
        {children}
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}