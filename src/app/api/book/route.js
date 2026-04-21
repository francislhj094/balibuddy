// src/app/api/book/route.js
// Booking API — stores bookings and sends WhatsApp notification

export async function POST(request) {
  try {
    const body = await request.json();
    const { service, name, whatsapp, date, location, notes, groupSize } = body;

    // Validate
    if (!service || !name || !whatsapp || !date) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Generate booking ID
    const bookingId = `BB-${Date.now().toString(36).toUpperCase()}`;

    // TODO: Store in Supabase
    // const { data, error } = await supabase.from('bookings').insert({
    //   id: bookingId,
    //   service,
    //   customer_name: name,
    //   customer_whatsapp: whatsapp,
    //   date,
    //   pickup_location: location,
    //   notes,
    //   group_size: groupSize || 1,
    //   status: 'pending',
    //   created_at: new Date().toISOString(),
    // });

    // TODO: Send WhatsApp notification to operations team
    // await sendWhatsAppNotification(bookingId, service, name, date, location);

    // TODO: Send confirmation to customer
    // await sendWhatsAppConfirmation(whatsapp, bookingId, service, date);

    console.log(`📦 New booking: ${bookingId} — ${service} for ${name} on ${date}`);

    return Response.json({
      success: true,
      bookingId,
      message: `Booking ${bookingId} received! You'll get a WhatsApp confirmation shortly.`,
      estimatedConfirmation: '5 minutes',
    });

  } catch (error) {
    console.error('Booking error:', error);
    return Response.json({ error: 'Booking failed' }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({
    service: 'BaliBuddy Booking API',
    status: 'active',
    availableServices: [
      'airport-transfer',
      'day-driver',
      'half-day-driver',
      'ubud-tour',
      'nusa-penida-tour',
      'mt-batur-trek',
      'uluwatu-sunset',
      'cooking-class',
      'spa-package',
      'snorkeling-trip',
      'surf-lesson',
      'esim',
    ],
  });
}