// test-api-live.js — Test the live API endpoint
const url = 'https://balibuddy.online/api/generate-itinerary';

async function test() {
  console.log('Testing:', url);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        days: 3,
        budget: 'mid',
        group: 'couple',
        interests: ['beaches', 'food'],
      }),
    });
    console.log('Status:', res.status, res.statusText);
    const data = await res.json();
    console.log('Response:', JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error:', err.message);
  }
}

test();
