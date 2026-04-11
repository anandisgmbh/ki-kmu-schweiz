import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { contactSchema } from '../../lib/contact-schema';

export const prerender = false;

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

export const POST: APIRoute = async ({ request }) => {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'invalid_json' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: 'validation_failed',
        issues: parsed.error.issues.map((i) => ({
          path: i.path.join('.'),
          message: i.message,
        })),
      }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const { name, company, email, message, website } = parsed.data;

  // Honeypot check — bots typically fill every visible field including hidden ones
  if (website && website.length > 0) {
    // Silently accept to avoid telling the bot it was caught
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
  const to = import.meta.env.CONTACT_FORM_TO;
  const from = import.meta.env.RESEND_FROM || 'KI-KMU-Schweiz <noreply@anandis.ch>';

  if (!apiKey || !to) {
    console.error('Contact form: missing RESEND_API_KEY or CONTACT_FORM_TO env');
    return new Response(JSON.stringify({ ok: false, error: 'server_not_configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `Neue Anfrage via ki-kmu-schweiz.ch: ${company}`,
      html: `
        <h2>Neue Anfrage via ki-kmu-schweiz.ch</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Firma:</strong> ${escapeHtml(company)}</p>
        <p><strong>E-Mail:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
        <hr />
        <p><strong>Nachricht:</strong></p>
        <p style="white-space: pre-wrap">${escapeHtml(message)}</p>
      `,
    });
  } catch (e) {
    console.error('Resend send failed:', e);
    return new Response(JSON.stringify({ ok: false, error: 'send_failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
