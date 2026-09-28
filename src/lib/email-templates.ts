/**
 * HTML e-mails for the contact form, in the site's brand (paper, ink, red rule,
 * olive footer). Table layout + inline styles so Gmail and Outlook render them.
 * The customer confirmation contains fixed text only: nothing the visitor typed.
 */
import { pagePath, type Locale } from '../i18n/locales';

const C = {
  bg: '#E7E9E6', card: '#FFFFFF', ink: '#15181A', slate: '#586166', rule: '#DCDFDB',
  red: '#D40000', leaf: '#6A8C14', olive: '#22300B', oliveFg: '#EEF2E4', oliveMute: '#A9B98A',
};
const FONT = "Arial, 'Helvetica Neue', Helvetica, sans-serif";

/** Images travel inside the e-mail (Content-ID), so no external image host is needed. */
export const CID = { mark: 'mark@piroliswiss', flag: 'flag@piroliswiss' };
export function inlineImages(publicDir: string) {
  return [
    { filename: 'piroliswiss.png', path: `${publicDir}/email/mark.png`, cid: CID.mark },
    { filename: 'flag.png', path: `${publicDir}/email/flag.png`, cid: CID.flag },
  ];
}

export const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

/** Shared frame: logo header, red rule, white card, olive footer. */
function frame(opts: { lang: string; preheader: string; body: string; footer: string }) {
  const { lang, preheader, body, footer } = opts;
  return `<!doctype html>
<html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>Piroliswiss</title></head>
<body style="margin:0;padding:0;background:${C.bg};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.bg};">
<tr><td align="center" style="padding:32px 12px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:${C.card};border-radius:8px;overflow:hidden;">
  <tr><td style="padding:28px 36px 22px;">
    <table role="presentation" cellpadding="0" cellspacing="0"><tr>
      <td style="vertical-align:middle;padding-right:14px;"><img src="cid:${CID.mark}" width="44" height="45" alt="Piroliswiss" style="display:block;border:0;"></td>
      <td style="vertical-align:middle;font:600 17px/1 ${FONT};letter-spacing:5px;color:${C.ink};white-space:nowrap;">PIROLI<span style="color:${C.leaf};">SWISS</span></td>
      <td style="vertical-align:middle;padding-left:4px;"><img src="cid:${CID.flag}" width="15" height="15" alt="" style="display:block;border:0;"></td>
    </tr></table>
  </td></tr>
  <tr><td style="height:3px;line-height:3px;font-size:0;background:${C.red};">&nbsp;</td></tr>
  <tr><td style="padding:36px 36px 32px;font:15px/1.6 ${FONT};color:${C.ink};">${body}</td></tr>
  <tr><td style="background:${C.olive};padding:24px 36px;font:13px/1.6 ${FONT};color:${C.oliveMute};">${footer}</td></tr>
</table>
</td></tr></table>
</body></html>`;
}

const button = (href: string, label: string, primary = true) =>
  `<a href="${href}" style="display:inline-block;padding:13px 22px;margin:0 8px 8px 0;font:600 14px/1 ${FONT};text-decoration:none;border-radius:4px;${
    primary ? `background:${C.red};color:#ffffff;border:1px solid ${C.red};` : `background:#ffffff;color:${C.ink};border:1px solid ${C.ink};`
  }">${esc(label)}</a>`;

/* ---------------------------------------------------------------- confirmation */

type Copy = {
  subject: string; preheader: string; title: string; intro: string; steps: string; step: [string, string, string];
  reply: string; products: string; sheets: string; place: string; why: string;
};
const COPY: Record<Locale, Copy> = {
  es: {
    subject: 'Hemos recibido su solicitud | Piroliswiss',
    preheader: 'Gracias por contactar con Piroliswiss S.R.L. Le responderemos en breve.',
    title: 'Hemos recibido su solicitud',
    intro: 'Gracias por contactar con Piroliswiss S.R.L. Nuestro equipo comercial revisará su solicitud y le responderá en breve desde {sales}.',
    steps: 'Qué sigue',
    step: ['Revisamos su aplicación y el volumen que necesita.', 'Le enviamos la ficha técnica y una cotización según su Incoterm.', 'Coordinamos formato de entrega, documentación y logística.'],
    reply: 'Si desea añadir algún dato, responda directamente a este correo.',
    products: 'Ver productos', sheets: 'Fichas técnicas',
    place: 'Santa Cruz de la Sierra, Bolivia',
    why: 'Recibe este correo porque envió una solicitud en piroliswiss.com.',
  },
  pt: {
    subject: 'Recebemos a sua solicitação | Piroliswiss',
    preheader: 'Obrigado por entrar em contato com a Piroliswiss S.R.L. Responderemos em breve.',
    title: 'Recebemos a sua solicitação',
    intro: 'Obrigado por entrar em contato com a Piroliswiss S.R.L. A nossa equipe comercial vai analisar a sua solicitação e responderá em breve pelo endereço {sales}.',
    steps: 'Próximos passos',
    step: ['Analisamos a sua aplicação e o volume de que precisa.', 'Enviamos a ficha técnica e uma cotação de acordo com o seu Incoterm.', 'Coordenamos o formato de entrega, a documentação e a logística.'],
    reply: 'Se quiser acrescentar alguma informação, basta responder a este e-mail.',
    products: 'Ver produtos', sheets: 'Fichas técnicas',
    place: 'Santa Cruz de la Sierra, Bolívia',
    why: 'Você recebeu este e-mail porque enviou uma solicitação em piroliswiss.com.',
  },
  en: {
    subject: 'We have received your request | Piroliswiss',
    preheader: 'Thank you for contacting Piroliswiss S.R.L. We will reply shortly.',
    title: 'We have received your request',
    intro: 'Thank you for contacting Piroliswiss S.R.L. Our sales team will review your request and reply shortly from {sales}.',
    steps: 'What happens next',
    step: ['We review your application and the volume you need.', 'We send you the datasheet and a quote for your Incoterm.', 'We coordinate delivery format, documents and logistics.'],
    reply: 'If you would like to add any details, simply reply to this e-mail.',
    products: 'View products', sheets: 'Datasheets',
    place: 'Santa Cruz de la Sierra, Bolivia',
    why: 'You are receiving this e-mail because you sent a request on piroliswiss.com.',
  },
  zh: {
    subject: '我们已收到您的询价 | Piroliswiss',
    preheader: '感谢您联系 Piroliswiss S.R.L.，我们将尽快回复。',
    title: '我们已收到您的询价',
    intro: '感谢您联系 Piroliswiss S.R.L.。我们的销售团队将审阅您的请求，并尽快通过 {sales} 回复您。',
    steps: '后续步骤',
    step: ['了解您的用途和所需数量。', '按您选择的贸易术语发送产品规格书和报价。', '协调交货形式、单证和物流。'],
    reply: '如需补充信息，请直接回复本邮件。',
    products: '查看产品', sheets: '技术资料',
    place: '玻利维亚圣克鲁斯',
    why: '您收到此邮件，是因为您在 piroliswiss.com 提交了询价。',
  },
};

export function confirmationEmail(locale: Locale, site: string, sales: string) {
  const c = COPY[locale];
  const intro = c.intro.replace('{sales}', sales);
  const steps = c.step
    .map((s, i) => `<tr>
      <td style="width:34px;vertical-align:top;padding:10px 0;border-top:1px solid ${C.rule};font:600 15px/1.5 ${FONT};color:${C.red};">0${i + 1}</td>
      <td style="vertical-align:top;padding:10px 0;border-top:1px solid ${C.rule};font:15px/1.5 ${FONT};color:${C.ink};">${esc(s)}</td></tr>`)
    .join('');
  const body = `
    <h1 style="margin:0 0 16px;font:600 28px/1.15 ${FONT};letter-spacing:-0.5px;color:${C.ink};">${esc(c.title)}</h1>
    <p style="margin:0 0 28px;color:${C.ink};">${esc(intro)}</p>
    <p style="margin:0 0 6px;font:12px/1 ${FONT};letter-spacing:1.5px;text-transform:uppercase;color:${C.slate};">${esc(c.steps)}</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 28px;border-bottom:1px solid ${C.rule};">${steps}</table>
    <p style="margin:0 0 24px;color:${C.slate};">${esc(c.reply)}</p>
    ${button(site + pagePath('products', locale), c.products)}${button(site + pagePath('fichas', locale), c.sheets, false)}`;
  const footer = `<b style="color:${C.oliveFg};">Piroliswiss S.R.L.</b><br>${esc(c.place)}<br>
    <a href="mailto:${sales}" style="color:${C.oliveFg};">${sales}</a> / <a href="${site}" style="color:${C.oliveFg};">${site.replace(/^https?:\/\//, '')}</a>
    <br><span style="font-size:11px;">${esc(c.why)}</span>`;
  const text = [c.title, '', intro, '', `${c.steps}:`, ...c.step.map((s, i) => `${i + 1}. ${s}`), '', c.reply, '',
    `${c.products}: ${site}${pagePath('products', locale)}`, '', 'Piroliswiss S.R.L.', c.place, sales, site].join('\n');
  return { subject: c.subject, html: frame({ lang: locale, preheader: c.preheader, body, footer }), text };
}

/* ---------------------------------------------------------------- internal notice */

export function salesEmail(site: string, d: { company: string; email: string; rows: [string, string][]; message: string }) {
  const rows = d.rows
    .map(([k, v]) => `<tr>
      <td style="width:40%;vertical-align:top;padding:11px 16px 11px 0;border-top:1px solid ${C.rule};font:12px/1.5 ${FONT};letter-spacing:1px;text-transform:uppercase;color:${C.slate};">${esc(k)}</td>
      <td style="vertical-align:top;padding:11px 0;border-top:1px solid ${C.rule};font:15px/1.5 ${FONT};color:${C.ink};">${esc(v)}</td></tr>`)
    .join('');
  const replyHref = `mailto:${encodeURIComponent(d.email)}?subject=${encodeURIComponent('Piroliswiss | ' + d.company)}`;
  const body = `
    <p style="margin:0 0 8px;font:12px/1 ${FONT};letter-spacing:1.5px;text-transform:uppercase;color:${C.red};">Nueva solicitud de cotización</p>
    <h1 style="margin:0 0 24px;font:600 28px/1.15 ${FONT};letter-spacing:-0.5px;color:${C.ink};">${esc(d.company)}</h1>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;border-bottom:1px solid ${C.rule};">${rows}</table>
    <p style="margin:0 0 8px;font:12px/1 ${FONT};letter-spacing:1.5px;text-transform:uppercase;color:${C.slate};">Aplicación y requisitos</p>
    <div style="margin:0 0 28px;padding:16px 18px;background:${C.bg};border-radius:6px;font:15px/1.6 ${FONT};color:${C.ink};white-space:pre-wrap;">${esc(d.message || '—')}</div>
    ${button(replyHref, 'Responder al cliente')}
    <p style="margin:8px 0 0;font:13px/1.5 ${FONT};color:${C.slate};">También puede pulsar «Responder»: la respuesta va a ${esc(d.email)}.</p>`;
  const footer = `Enviado desde el formulario de contacto de <a href="${site}" style="color:${C.oliveFg};">${site.replace(/^https?:\/\//, '')}</a>.`;
  const text = `Nueva solicitud de cotización\n\n${d.rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\nAplicación y requisitos:\n${d.message || '—'}\n`;
  return { html: frame({ lang: 'es', preheader: `${d.company} / ${d.email}`, body, footer }), text };
}
