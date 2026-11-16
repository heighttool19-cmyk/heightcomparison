import { NextResponse } from 'next/server';

const TOPICS = {
  'wrong-height': 'Wrong height',
  bug: 'Bug',
  privacy: 'Privacy request',
  partnership: 'Partnership or press',
  other: 'Other',
} as const;

// In-memory sliding window rate limiter per IP: max 5 hits per 10 minutes
const hits = new Map<string, number[]>();

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const now = Date.now();
    const windowMs = 10 * 60 * 1000; // 10 minutes

    const recent = (hits.get(ip) ?? []).filter((timestamp) => now - timestamp < windowMs);
    if (recent.length >= 5) {
      return NextResponse.json({ ok: false, error: 'Too many requests. Please try again later.' }, { status: 429 });
    }
    hits.set(ip, [...recent, now]);

    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ ok: false, error: 'Invalid JSON request payload.' }, { status: 400 });
    }

    // Honeypot check: bot filled out hidden field
    if (body.website) {
      return NextResponse.json({ ok: true });
    }

    const name = String(body.name ?? '').trim().slice(0, 80);
    const email = String(body.email ?? '').trim().slice(0, 120);
    const topic = String(body.topic ?? '').trim() as keyof typeof TOPICS;
    const link = String(body.link ?? '').trim().slice(0, 500);
    const message = String(body.message ?? '').trim().slice(0, 2000);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const linkRegex = /^https?:\/\/\S+\.\S+/;

    const isValid =
      name.length >= 2 &&
      emailRegex.test(email) &&
      topic in TOPICS &&
      message.length >= 20 &&
      (!link || linkRegex.test(link));

    if (!isValid) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Please fill in all required fields accurately (valid email, topic, name, and message of at least 20 characters).',
        },
        { status: 400 }
      );
    }

    // In production, dispatch email or log to monitoring service
    console.log(
      `[Contact Submission] Topic: "${TOPICS[topic]}" | From: "${name}" <${email}> | Link: "${link || 'None'}"\nMessage: ${message}`
    );

    return NextResponse.json({ ok: true, message: 'Message received successfully.' });
  } catch (error) {
    console.error('Error handling /api/contact:', error);
    return NextResponse.json({ ok: false, error: 'Internal server error processing contact form.' }, { status: 500 });
  }
}

