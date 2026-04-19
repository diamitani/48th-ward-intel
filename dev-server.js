// Local development API server
// Simulates Vercel serverless function locally
import http from 'http';
import handler from './api/ai.js';
import { config } from 'dotenv';

config(); // Load .env file

const server = http.createServer(async (req, res) => {
  // Parse URL
  const url = new URL(req.url, `http://localhost:3001`);
  
  if (url.pathname === '/api/ai') {
    // Parse body
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        req.body = JSON.parse(body);
      } catch {
        req.body = {};
      }
      
      // Mock res.setHeader and res.status().json()
      const headers = {};
      const mockRes = {
        setHeader: (k, v) => { headers[k] = v; },
        status: (code) => ({
          json: (data) => {
            Object.entries(headers).forEach(([k, v]) => res.setHeader(k, v));
            res.writeHead(code, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data));
          },
          end: () => { res.writeHead(code); res.end(); },
        }),
      };
      
      await handler(req, mockRes);
    });
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`\n🏛️  Ward Intel API server running at http://localhost:${PORT}`);
  console.log(`   Proxying AI requests for local development\n`);
});
