# Ward Intel — 48th Ward Intelligence Platform

AI-powered tools for Chicago's 48th Ward office (Alderwoman Leni Manaa-Hoppenworth).

## What This Does

| Tool | Description |
|------|-------------|
| **Feedback Analyzer** | Paste constituent comments → get organized themes, sentiment, conflicts, suggested messaging |
| **Content Generator** | Input one event → get newsletter, Instagram, Facebook, Twitter, SMS content instantly |
| **Ward Assistant** | AI chatbot trained on 48th Ward services, permits, resources, and office info |

## Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Copy the env template and add your OpenAI API key
cp .env.example .env
# Edit .env and set OPENAI_API_KEY=sk-your-key-here

# 3. Start both the API server and frontend
npm run dev:all

# Frontend: http://localhost:5173
# API: http://localhost:3001
```

## Deploy to Vercel

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy
vercel

# 3. Set your API key in Vercel dashboard:
#    Project Settings → Environment Variables → OPENAI_API_KEY
```

## Transfer to the Ward Office

### Option A: Transfer Vercel Project
1. Go to Vercel Dashboard → Project Settings → General
2. Under "Transfer Project", enter the ward's Vercel team/account
3. They get the full project with one click

### Option B: GitHub Repository Transfer
1. Push this code to a GitHub repo
2. Go to repo Settings → Danger Zone → Transfer Ownership
3. Transfer to the ward's GitHub org
4. They connect it to their own Vercel account

### Option C: Fork & Deploy
1. Push to GitHub
2. They fork the repo
3. They click "Deploy" on Vercel and connect their fork
4. Set `OPENAI_API_KEY` in their Vercel environment variables

### What They Need
- A **Vercel account** (free tier works fine)
- An **OpenAI API key** (set as environment variable, never in code)
- That's it. No database, no complex infrastructure.

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | Yes | OpenAI API key for AI features |
| `OPENAI_MODEL` | No | Model to use (default: `gpt-4o-mini`) |

## Architecture

```
ward-intel/
├── api/
│   └── ai.js              ← Vercel serverless function (keeps API key server-side)
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx
│   │   ├── FeedbackAnalyzer.jsx
│   │   ├── ContentGenerator.jsx
│   │   ├── WardAssistant.jsx
│   │   └── Sidebar.jsx
│   ├── data/
│   │   ├── emanuelFeedback.js   ← Pre-loaded demo data
│   │   └── wardKnowledge.js     ← Knowledge base from the48thward.org
│   ├── utils/
│   │   ├── ai.js                ← API client
│   │   └── prompts.js           ← System prompts
│   ├── App.jsx
│   ├── App.css
│   ├── index.css                ← Design system
│   └── main.jsx
├── vercel.json
├── .env.example
└── dev-server.js           ← Local API server for development
```

## Security Notes
- API key is **never exposed to the client** — all AI calls go through the serverless function
- No user data is stored — everything is processed in-session
- No authentication required for demo; add Vercel password protection for internal use

## License
Built for the 48th Ward, City of Chicago.
