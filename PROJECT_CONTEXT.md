# Nexus Start Page - Project Context

## Overview
Nexus Start Page is a high-performance, minimalist, "Cyberpunk-lite" dashboard designed for developers. It serves as a browser start page featuring link management, real-time data widgets, productivity tools, and AI integration.

## Tech Stack
- **Framework:** React 19 + Vite 6
- **Styling:** Tailwind CSS (Utility-first, dark mode centric)
- **Icons:** Lucide React
- **Language:** TypeScript
- **State Management:** React Local State (`useState`, `useEffect`)
- **Persistence:** `localStorage` (for Brain Dump note)
- **AI:** `@google/genai` (Gemini 2.5 Flash)

## Design System & Aesthetics
- **Theme:** Dark Mode / Cyberpunk / Himalayan.
- **Color Palette:**
  - Backgrounds: `zinc-950` with high transparency (80%) for a "Glassmorphism" effect.
  - Text: High contrast `white` for values, `zinc-400` for labels.
  - Accents: Minimal color usage. Green (Live/Success), Red (Market Down), Purple (AI/Selection).
- **Typography:**
  - Headings/Data: `JetBrains Mono` (Monospace) for a terminal/technical feel.
  - UI/Labels: `Inter` (Sans-serif) for readability.
- **Layout:**
  - **Top:** Absolute positioned Weather widget.
  - **Center:** Clock (Greeting + Time), Search Bar, Link Trees (Grid).
  - **Bottom:** Dashboard Widgets (Grid).
  - **Sizing:** Fixed height (`h-96`) for bottom widgets to ensure perfect alignment.
- **Background:**
  - Array of high-quality URLs (Unsplash).
  - Rotates automatically every 3 hours.
  - Heavy overlay (`bg-black/50` to `bg-black/90`) to ensure text legibility.

## Features & Logic

### 1. Clock & Greeting
- **Logic:** Updates every second.
- **Greeting:** Personalized ("Good evening, Bishal"). Time-based logic (<12, <18, else).

### 2. Search Bar (`components/SearchBar.tsx`)
- **Engines:** Google (Default), Gemini (Web), ChatGPT, Claude, Kimi, DuckDuckGo.
- **Quick Ask (Gemini API):**
  - Uses `process.env.API_KEY` (polyfilled in Vite config).
  - Model: `gemini-2.5-flash`.
  - Config: `thinkingBudget: 0` for speed.
  - **UI:** Dropdown selector, glass-morphism input, modal result display.

### 3. Link Trees (`components/LinkTree.tsx`)
- **Structure:** Defined in `constants.tsx`.
- **Visuals:** Tree branch visualization using CSS borders and absolute positioning to mimic a directory structure.

### 4. Premier League Ticker (`components/SportsTicker.tsx`)
- **API:** ESPN Public API (undocumented/unofficial).
- **Logic (`services/sportsService.ts`):**
  - **Priority 1:** Is there a **LIVE** match? Show it.
  - **Priority 2:** If no live match, fetch **Standings** to find the #1 Team. Fetch that team's **Schedule** to find their last **Finished (FT)** game.
  - **Slots:** Always fills 3 slots.
    - Slot 1: Live Match OR Top Team's Last Result.
    - Slot 2 & 3: Next upcoming matches.

### 5. Crypto Market (`components/CryptoTicker.tsx`)
- **API:** CoinGecko (Free public endpoint).
- **Data:** BTC, ETH, SOL.
- **Visuals:** Green/Red coloring based on 24h percentage change.

### 6. Brain Dump (`components/QuickNotes.tsx`)
- **Persistence:** Saves to `localStorage` key `nexus_quick_note` on every keystroke.
- **Design:** Minimalist textarea, mono font, no scrollbars (hidden).

### 7. Focus Timer (`components/PomodoroTimer.tsx`)
- **Duration:** 25 minutes (Standard Pomodoro).
- **Controls:** Play/Pause, Reset.
- **Visual:** Huge font size (`text-8xl`) for visibility at a glance.

## Project Structure
- `index.tsx` & `index.html`: Entry points.
- `constants.tsx`: Configuration for Links, Images, and Icons.
- `types.ts`: TypeScript interfaces for robustness.
- `services/`: API fetching logic separated from UI.

## Deployment Config
- **Vite Config:** Handles `base` path logic (`/nexus-start/` for GitHub Pages vs `/` for localhost).
- **Env:** Polyfills `process.env` to prevent crashes in browser environments.
