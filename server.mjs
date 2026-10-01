// Production server (npm start). Wraps Astro's standalone Node handler so that
// www.piroliswiss.com answers with a permanent redirect to piroliswiss.com:
// one canonical host for visitors and search engines (2026-10-01).
import http from 'node:http';

process.env.ASTRO_NODE_AUTOSTART = 'disabled';
const { handler, options } = await import('./dist/server/entry.mjs');

const port = Number(process.env.PORT ?? options.port ?? 8080);
const host = process.env.HOST ?? (options.host === true ? '0.0.0.0' : options.host || 'localhost');

http
  .createServer((req, res) => {
    // Railway's proxy passes the public host in X-Forwarded-Host.
    const reqHost = String(req.headers['x-forwarded-host'] ?? req.headers.host ?? '').split(',')[0].trim().toLowerCase();
    if (reqHost.startsWith('www.')) {
      res.writeHead(301, { location: `https://${reqHost.slice(4)}${req.url ?? '/'}`, 'cache-control': 'public, max-age=86400' });
      res.end();
      return;
    }
    handler(req, res);
  })
  .listen(port, host, () => console.log(`Server listening on http://${host}:${port}`));
