# Nexus Start Page

A high-performance, minimalist, cyberpunk-inspired browser start page for developers. Features link management, real-time data widgets, productivity tools, and AI integration.

## Features

- **Clock & Greeting** — Personalized time-based greeting
- **Multi-Engine Search** — Google, Gemini, ChatGPT, Claude, Kimi, DuckDuckGo
- **Quick Ask** — Instant Gemini AI responses
- **Link Trees** — Organized quick-access links
- **Spotify Now Playing** — Shows current track (only when playing)
- **Premier League Ticker** — Live scores & upcoming matches
- **Crypto Market** — BTC, ETH, SOL prices
- **Brain Dump** — Persistent scratchpad notes
- **Focus Timer** — 25-minute Pomodoro timer

## Tech Stack

React 19 • Vite 6 • TypeScript • Tailwind CSS • Lucide Icons

## Run Locally

**Prerequisites:** Node.js, pnpm

```bash
pnpm install
pnpm dev
```

## Optional Integrations

### Gemini Quick Ask

When you select "Quick Ask" search, you'll be prompted to enter your API key. It's stored locally in your browser (never sent to any server except Google's API).

**Get your free key:** [Google AI Studio](https://aistudio.google.com/apikey)

### Spotify Now Playing

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Click **Create App**
3. Set Redirect URI to your site URL (e.g., `https://yourname.github.io/nexus-start/`)
4. Copy the **Client ID**
5. Create `.env.local`:
   ```
   VITE_SPOTIFY_CLIENT_ID=your_client_id_here
   ```
6. Rebuild and deploy — click "connect spotify" on the page

> **Note:** Spotify Client ID is safe to include in public builds (it's a public identifier, not a secret).

## Deploy

Configured for GitHub Pages. Builds to `/nexus-start/` base path.

```bash
pnpm build
```