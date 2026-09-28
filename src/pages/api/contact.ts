/**
 * Contact / quote form endpoint. The only on-demand route of the site;
 * everything else stays prerendered.
 *
 * Sends the request by SMTP to MAIL_TO (sales@) with Reply-To set to the
 * customer. Configuration (Railway → Variables):
 *   SMTP_HOST, SMTP_PORT (465 or 587), SMTP_USER, SMTP_PASS
 *   SMTP_SECURE   "true" for port 465 (default: true when port is 465)
 *   MAIL_FROM     sender, default SMTP_USER
 *   MAIL_TO       recipient, default sales@piroliswiss.com
 *   MAIL_CONFIRM  "false" to stop the confirmation e-mail to the customer
 *   MAIL_TRANSPORT=json  development only: log the e-mail instead of sending
 */
import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const prerender = false;

const env = (k: string) => process.env[k]?.trim() || undefined;

const LIMITS = { company: 200, country: 100, email: 200, product: 60, volume: 60, incoterm: 60, message: 5000, locale: 5 };
type Field = keyof typeof LIMITS;

// Simple per-IP rate limit (in memory; resets when the server restarts).
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();
function limited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

function transport() {
  if (env('MAIL_TRANSPORT') === 'json') return nodemailer.createTransport({ jsonTransport: true });
  const host = env('SMTP_HOST');
  if (!host) return null;
  const port = Number(env('SMTP_PORT') ?? 465);
  const secure = env('SMTP_SECURE') ? env('SMTP_SECURE') === 'true' : port === 465;
  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: env('SMTP_USER') ? { user: env('SMTP_USER')!, pass: env('SMTP_PASS') ?? '' } : undefined,
  });
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json(400, { ok: false, error: 'invalid' });
  }

  // Honeypot: real visitors never see or fill this field.
  if (String(form.get('website') ?? '').trim()) return json(200, { ok: true });

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || clientAddress || 'unknown';
  if (limited(ip)) return json(429, { ok: false, error: 'rate' });

  const data = Object.fromEntries(
    (Object.keys(LIMITS) as Field[]).map((k) => [k, String(form.get(k) ?? '').trim().slice(0, LIMITS[k])]),
  ) as Record<Field, string>;

  if (!data.company || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return json(422, { ok: false, error: 'invalid' });
  }

  const tx = transport();
  if (!tx) {
    console.error('[contact] SMTP is not configured (SMTP_HOST missing); request not sent:', data.email);
    return json(503, { ok: false, error: 'not_configured' });
  }

  const rows: [string, string][] = [
    ['Empresa', data.company],
    ['País', data.country || '—'],
    ['Correo', data.email],
    ['Producto', data.product || '—'],
    ['Volumen mensual', data.volume || '—'],
    ['Incoterm', data.incoterm || '—'],
    ['Idioma de la web', data.locale || '—'],
  ];
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\nAplicación y requisitos:\n${data.message || '—'}\n`;
  const html = `<table cellpadding="6" style="border-collapse:collapse;font:14px/1.5 Arial,sans-serif">${rows
    .map(([k, v]) => `<tr><td style="color:#586166;border-bottom:1px solid #ddd">${esc(k)}</td><td style="border-bottom:1px solid #ddd">${esc(v)}</td></tr>`)
    .join('')}</table><p style="font:14px/1.5 Arial,sans-serif;white-space:pre-wrap"><b>Aplicación y requisitos</b><br>${esc(data.message || '—')}</p>`;

  const fromAddress = env('MAIL_FROM') ?? env('SMTP_USER') ?? 'no-reply@piroliswiss.com';
  const salesAddress = env('MAIL_TO') ?? 'sales@piroliswiss.com';
  const company = displayName(data.company);

  try {
    const info = await tx.sendMail({
      // Sent from our mailbox (a website cannot send as the customer), but the inbox shows who wrote.
      from: `"${company} vía web" <${fromAddress}>`,
      to: salesAddress,
      replyTo: `"${company}" <${data.email}>`,
      subject: `Solicitud de cotización · ${data.company}${data.product ? ` · ${data.product}` : ''}`,
      text,
      html,
    });
    if (env('MAIL_TRANSPORT') === 'json') console.log('[contact] (json transport)', info.message);
  } catch (err) {
    console.error('[contact] send failed:', err);
    return json(502, { ok: false, error: 'send' });
  }

  // Confirmation to the customer. Fixed text only (nothing the visitor typed is echoed),
  // so the form cannot be used to send arbitrary content to third parties.
  // A failure here does not fail the request: sales already has it.
  if (env('MAIL_CONFIRM') !== 'false') {
    const c = CONFIRM[(data.locale as Lang) in CONFIRM ? (data.locale as Lang) : 'es'];
    const site = env('SITE_URL') ?? 'https://piroliswiss.com';
    const paras = c.body.map((p) => p.replace('{sales}', salesAddress));
    const body = [...paras, '', 'Piroliswiss S.R.L.', c.place, salesAddress, site];
    try {
      const info = await tx.sendMail({
        from: `"Piroliswiss" <${fromAddress}>`,
        to: data.email,
        replyTo: salesAddress,
        subject: c.subject,
        headers: { 'Auto-Submitted': 'auto-replied' },
        text: `${body.join('\n')}\n`,
        html: `<div style="font:15px/1.6 Arial,sans-serif;color:#15181A">${paras.map((p) => `<p>${esc(p)}</p>`).join('')}<p style="color:#586166;font-size:13px">Piroliswiss S.R.L.<br>${esc(c.place)}<br><a href="mailto:${salesAddress}">${salesAddress}</a><br><a href="${site}">${site.replace(/^https?:\/\//, '')}</a></p></div>`,
      });
      if (env('MAIL_TRANSPORT') === 'json') console.log('[contact] (json transport, confirmation)', info.message);
    } catch (err) {
      console.error('[contact] confirmation failed:', err);
    }
  }

  return json(200, { ok: true });
};

type Lang = 'es' | 'pt' | 'en' | 'zh';

/** Company name safe for a mail display name: one line, no quotes, max 60 chars. */
function displayName(s: string): string {
  return s.replace(/[\r\n"<>]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 60);
}

const CONFIRM: Record<Lang, { subject: string; body: string[]; place: string }> = {
  es: {
    subject: 'Hemos recibido su solicitud · Piroliswiss',
    body: [
      'Hola:',
      'Gracias por contactar con Piroliswiss. Hemos recibido su solicitud de cotización y nuestro equipo le responderá en breve desde {sales}.',
      'Si desea añadir algún dato, puede responder directamente a este mensaje.',
    ],
    place: 'Santa Cruz de la Sierra, Bolivia',
  },
  pt: {
    subject: 'Recebemos a sua solicitação · Piroliswiss',
    body: [
      'Olá,',
      'Obrigado por entrar em contato com a Piroliswiss. Recebemos a sua solicitação de cotação e a nossa equipe responderá em breve pelo endereço {sales}.',
      'Se quiser acrescentar alguma informação, basta responder a esta mensagem.',
    ],
    place: 'Santa Cruz de la Sierra, Bolívia',
  },
  en: {
    subject: 'We have received your request · Piroliswiss',
    body: [
      'Hello,',
      'Thank you for contacting Piroliswiss. We have received your quote request and our team will reply shortly from {sales}.',
      'If you would like to add any details, simply reply to this message.',
    ],
    place: 'Santa Cruz de la Sierra, Bolivia',
  },
  zh: {
    subject: '我们已收到您的询价 · Piroliswiss',
    body: [
      '您好：',
      '感谢您联系 Piroliswiss。我们已收到您的询价请求，团队将尽快通过 {sales} 回复您。',
      '如需补充信息，请直接回复本邮件。',
    ],
    place: '玻利维亚圣克鲁斯',
  },
};
