// @ts-ignore
import { describe, expect, it } from 'bun:test';
import { POST } from '@/app/api/contact/route';

describe('Contact API Route (/api/contact)', () => {
  it('rejects incomplete payloads with 400', async () => {
    const req = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'A' }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.ok).toBe(false);
  });

  it('rejects messages shorter than 20 characters', async () => {
    const req = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Alex Tester',
        email: 'alex@example.com',
        topic: 'wrong-height',
        message: 'Short message',
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.ok).toBe(false);
  });

  it('silently accepts honeypot bot submissions with 200', async () => {
    const req = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Spam Bot',
        email: 'bot@spam.com',
        topic: 'other',
        message: 'This is a spam message that should be caught by honeypot.',
        website: 'http://spam.com',
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.ok).toBe(true);
  });

  it('accepts valid contact submission with 200', async () => {
    const req = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Alex Morgan',
        email: 'alex.morgan@example.com',
        topic: 'wrong-height',
        link: 'https://heightcomparisoncalculator.com/?id=sample',
        message: 'The height for this anime character is listed as 165 cm in the official databook vol 4.',
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.ok).toBe(true);
  });
});

