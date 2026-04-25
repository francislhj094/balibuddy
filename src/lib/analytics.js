// src/lib/analytics.js
// Unified analytics — fires GA4 + Meta Pixel events from one call

/**
 * Track a custom event across all analytics platforms
 * @param {string} eventName - Event name (used for GA4)
 * @param {Object} params - Event parameters
 * @param {string} [fbEvent] - Optional Meta Pixel event name (defaults to eventName)
 */
export function trackEvent(eventName, params = {}, fbEvent) {
  // Google Analytics 4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }

  // Meta Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    const pixelEvent = fbEvent || eventName;
    // Use trackCustom for non-standard events, track for standard events
    const standardEvents = [
      'AddPaymentInfo', 'AddToCart', 'AddToWishlist', 'CompleteRegistration',
      'Contact', 'CustomizeProduct', 'Donate', 'FindLocation', 'InitiateCheckout',
      'Lead', 'Purchase', 'Schedule', 'Search', 'StartTrial', 'SubmitApplication',
      'Subscribe', 'ViewContent',
    ];
    if (standardEvents.includes(pixelEvent)) {
      window.fbq('track', pixelEvent, params);
    } else {
      window.fbq('trackCustom', pixelEvent, params);
    }
  }
}

// ===== Pre-defined conversion events =====

/** User generates an AI itinerary */
export function trackItineraryGenerated(params = {}) {
  trackEvent('generate_itinerary', {
    content_category: 'trip_planner',
    ...params,
  }, 'Lead');
}

/** User clicks "Book" on a service card */
export function trackBookingStarted(service, price) {
  trackEvent('begin_booking', {
    content_category: 'booking',
    service_name: service,
    value: price,
    currency: 'USD',
  }, 'InitiateCheckout');
}

/** User confirms booking via WhatsApp */
export function trackBookingConfirmed(service, price) {
  trackEvent('confirm_booking', {
    content_category: 'booking',
    service_name: service,
    value: price,
    currency: 'USD',
  }, 'Purchase');
}

/** User clicks WhatsApp CTA (floating or section) */
export function trackWhatsAppClick(source) {
  trackEvent('whatsapp_click', {
    content_category: 'contact',
    source, // 'floating', 'cta_section', 'navbar', 'booking_modal'
  }, 'Contact');
}

/** User views the price guide */
export function trackPriceGuideView(category) {
  trackEvent('view_price_guide', {
    content_category: 'prices',
    price_category: category,
  }, 'ViewContent');
}

/** User clicks a blog article */
export function trackBlogView(slug, title) {
  trackEvent('view_blog', {
    content_category: 'blog',
    article_slug: slug,
    article_title: title,
  }, 'ViewContent');
}
