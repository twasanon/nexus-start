# Nexus Start Page

A high-performance, minimalist, cyberpunk-inspired browser start page for developers. Features link management, real-time data widgets, productivity tools, and AI integration.

## Features

- **Clock & Greeting** — Personalized time-based greeting
- **Multi-Engine Search** — Google, Gemini, ChatGPT, Claude, Kimi, DuckDuckGo
- **Quick Ask** — Instant Gemini AI responses
- **Link Trees** — Organized quick-access links
- **Premier League Ticker** — Live scores & upcoming matches
- **Crypto Market** — BTC, ETH, SOL prices
- **Brain Dump** — Persistent scratchpad notes
- **Focus Timer** — 25-minute Pomodoro timer

## Tech Stack

React 19 • Vite 6 • TypeScript • Tailwind CSS • Lucide Icons

## Run Locally

**Prerequisites:** Node.js, pnpm

```bash
# Install dependencies
pnpm install

# Set your Gemini API key in .env.local
echo "API_KEY=your_gemini_api_key" > .env.local

# Start dev server
pnpm dev
```

## Deploy

Configured for GitHub Pages with auto-deploy. Builds to `/nexus-start/` base path.

```bash
pnpm build
```