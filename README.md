# AppFlow — Job Application Orchestrator

A full-stack job application workflow tool. Paste a JD, get strategic fit assessment, tailored resume summary, ATS gap analysis, and application Q&A — then log to Notion in one click.

## Deploy to Vercel (5 minutes)

### Step 1 — Get your Anthropic API key
1. Go to **console.anthropic.com** → API Keys → Create Key
2. Copy it — you'll need it in Step 3

### Step 2 — Push to GitHub
1. Create a new repo at github.com (name it `appflow` or anything you like)
2. In your terminal, from this folder:
```bash
git init
git add .
git commit -m "Initial AppFlow deploy"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 3 — Deploy on Vercel
1. Go to **vercel.com** → New Project → Import your GitHub repo
2. Click **Environment Variables** and add:
   - `ANTHROPIC_API_KEY` = your key from Step 1
   - *(optional)* `NOTION_TOKEN` = your Notion integration token (or enter it in the app UI)
3. Click **Deploy**

That's it — Vercel gives you a live URL like `https://appflow-xyz.vercel.app`

## Notion Setup (to enable tracking)

1. Go to **notion.so/my-integrations** → New Integration
2. Give it a name (e.g. "AppFlow"), select your workspace
3. Copy the **Internal Integration Token** (starts with `secret_` or `ntn_`)
4. In your Notion database, click **⋯** → **Add connections** → select your integration
5. Paste the token in the app sidebar OR set it as `NOTION_TOKEN` in Vercel env vars

## Project structure

```
appflow/
├── api/
│   ├── claude.js     ← Anthropic API proxy (serverless function)
│   └── notion.js     ← Notion API proxy (serverless function)
├── public/
│   └── index.html    ← The full app UI
├── vercel.json       ← Routing config
└── package.json
```

## Why a proxy?

Browsers block direct calls to `api.anthropic.com` and `api.notion.com` from web pages (CORS policy). The Vercel serverless functions act as a same-origin proxy — your browser calls `/api/claude` (your own domain), and the server calls Anthropic. No CORS, no exposed API keys in the browser.
