import type { APIRoute } from 'astro';
import Anthropic from '@anthropic-ai/sdk';
import { SYSTEM_PROMPT } from '../../lib/bedarfsanalyse-prompt';

export const prerender = false;

const MAX_MESSAGES = 30;
const MODEL = 'claude-haiku-4-5-20251001';

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return new Response(
      JSON.stringify({ ok: false, error: 'not_configured', text: 'Der Chat wird gerade eingerichtet. Bitte versuchen Sie es später oder kontaktieren Sie uns direkt unter hello@ki-kmu-schweiz.ch.' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    );
  }

  let body: { messages?: Array<{ role: string; content: string }> };
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ ok: false, error: 'invalid_json' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const messages = (body.messages ?? []).slice(-MAX_MESSAGES);

  if (messages.length === 0) {
    // First call — no user message yet, Claude starts the conversation
    // We send a synthetic user message to trigger the greeting
    messages.push({ role: 'user', content: 'Hallo' });
  }

  const client = new Anthropic({ apiKey });

  try {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages.map((m) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
    });

    const text =
      response.content[0]?.type === 'text'
        ? response.content[0].text
        : 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.';

    return new Response(
      JSON.stringify({ ok: true, text }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (e) {
    console.error('Claude API error:', e);
    return new Response(
      JSON.stringify({
        ok: false,
        error: 'api_error',
        text: 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder kontaktieren Sie uns unter hello@ki-kmu-schweiz.ch.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
