#!/usr/bin/env node
/**
 * Tiny zero-dependency preview server for the short.
 *
 *   node scripts/serve.mjs [port]
 *
 * Why not `python3 -m http.server`? It does not answer HTTP Range requests,
 * so the browser cannot seek inside si-kecil.mp4 and often refuses to start
 * playback at all. This server implements 206 Partial Content properly.
 *
 * Binds 0.0.0.0 and accepts any Host/Origin header so the sandbox preview
 * proxy can reach it.
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = Number(process.argv[2] || process.env.PORT || 8000);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.mp4': 'video/mp4',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.wav': 'audio/wav',
  '.md': 'text/plain; charset=utf-8',
};

function send(res, code, body, headers = {}) {
  res.writeHead(code, { 'Content-Type': 'text/plain; charset=utf-8', ...headers });
  res.end(body);
}

const server = http.createServer((req, res) => {
  let urlPath;
  try {
    urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  } catch {
    return send(res, 400, 'bad request');
  }
  if (urlPath === '/' || urlPath === '') urlPath = '/site/index.html';

  const file = path.join(ROOT, urlPath);
  if (!file.startsWith(ROOT)) return send(res, 403, 'forbidden'); // no escaping the example dir

  fs.stat(file, (err, st) => {
    if (err || !st.isFile()) return send(res, 404, `not found: ${urlPath}`);
    const type = MIME[path.extname(file).toLowerCase()] || 'application/octet-stream';
    const range = req.headers.range;

    if (range) {
      const m = /^bytes=(\d*)-(\d*)$/.exec(range.trim());
      if (!m) return send(res, 400, 'bad range');
      let start = m[1] === '' ? st.size - Number(m[2]) : Number(m[1]);
      let end = m[1] === '' || m[2] === '' ? st.size - 1 : Number(m[2]);
      if (Number.isNaN(start) || Number.isNaN(end) || start > end || start >= st.size) {
        return send(res, 416, 'range not satisfiable', { 'Content-Range': `bytes */${st.size}` });
      }
      end = Math.min(end, st.size - 1);
      res.writeHead(206, {
        'Content-Type': type,
        'Content-Length': end - start + 1,
        'Content-Range': `bytes ${start}-${end}/${st.size}`,
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'no-store',
      });
      if (req.method === 'HEAD') return res.end();
      return fs.createReadStream(file, { start, end }).pipe(res);
    }

    res.writeHead(200, {
      'Content-Type': type,
      'Content-Length': st.size,
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'no-store',
    });
    if (req.method === 'HEAD') return res.end();
    fs.createReadStream(file).pipe(res);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Si Kecil preview  ->  http://localhost:${PORT}/`);
  console.log(`serving            ->  ${ROOT}`);
});
