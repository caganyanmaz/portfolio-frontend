import 'server-only';
import { NextResponse, NextRequest } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

/** ---------- simple in-memory rate limit (per IP) ---------- */
const WINDOW_MS = 60_000;           // 1 min
const MAX_REQS = 5;                 // 5 req/min per IP
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimit(ip: string) {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now > rec.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (rec.count >= MAX_REQS) return false;
  rec.count += 1;
  return true;
}

/** ---------- validation ---------- */
const schema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(200),
  subject: z.string().min(1).max(150),
  message: z.string().min(1).max(10_000),
  website: z.string().optional().default(''), // honeypot
});

const resend = new Resend(process.env.RESEND_API_KEY!);
const TO = process.env.CONTACT_TO!;
const FROM = process.env.CONTACT_FROM!;

// helper to get IP from headers
function getIp(req: NextRequest): string {
  // Vercel / proxies usually put it here
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]?.trim();

  // Cloudflare
  const cf = req.headers.get("cf-connecting-ip");
  if (cf) return cf;

  // fallback
  return "unknown";
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.RESEND_API_KEY || !TO || !FROM) {
      return NextResponse.json({ error: 'Server not configured' }, { status: 500 });
    }

    // basic IP rate limit
    const ip = getIp(req);
    if (!rateLimit(ip)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    // parse & validate
    const data = await req.json();
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
    }
    const { name, email, subject, message, website } = parsed.data;

    // honeypot
    if (website) {
      return NextResponse.json({ ok: true }); // silently accept bots
    }

    // tiny size guard
    const approxBytes = new TextEncoder().encode(message).length;
    if (approxBytes > 200_000) {
      return NextResponse.json({ error: 'Message too large' }, { status: 413 });
    }

    // send email
    const html = `
      <h2>New contact message</h2>
      <p><b>Name:</b> ${escapeHtml(name)}</p>
      <p><b>Email:</b> ${escapeHtml(email)}</p>
      <p><b>Subject:</b> ${escapeHtml(subject)}</p>
      <p><b>IP:</b> ${escapeHtml(ip)}</p>
      <hr/>
      <pre style="white-space:pre-wrap;font:inherit">${escapeHtml(message)}</pre>
    `;

    const { error } = await resend.emails.send({
      from: FROM,
      to: [TO],
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html,
    });

    if (error) {
      console.error('[contact] Resend error:', error);
      return NextResponse.json({ error: 'Email failed' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] unexpected error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

function escapeHtml(s: string) {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}