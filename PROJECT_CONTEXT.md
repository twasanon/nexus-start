# Nexus Start - Project Context

## Product Overview

**Nexus Start** is a premium browser start page and desktop dashboard application targeting developers, power users, and productivity enthusiasts. It combines beautiful design with powerful customization to create the ultimate "home" for your browser.

### Target Market
- Developers and engineers
- Power users and productivity enthusiasts
- Remote workers
- Anyone who wants a better browser start page

### Value Proposition
- Replace boring browser home pages with a personalized dashboard
- Centralize quick links, widgets, and tools in one place
- Beautiful, customizable themes that look professional
- Native desktop app experience (not just a website)

### Pricing
- **Free:** Basic features, single theme
- **Pro ($10):** All widgets, all themes, custom styling
- **Pro+ ($3/mo):** Cloud sync, multi-device, priority support

---

## Technical Architecture

### Current Stack
| Layer | Technology |
|-------|------------|
| Framework | React 19 |
| Build Tool | Vite 6 |
| Language | TypeScript |
| Styling | Tailwind CSS (utility-first) |
| Icons | Lucide React |
| State | React hooks + localStorage |
| Desktop | Tauri (planned) |

### Project Structure
```
nexus-start/
├── components/           # React components
│   ├── Clock.tsx         # Time and greeting
│   ├── SearchBar.tsx     # Multi-engine search + Quick Ask
│   ├── LinkTree.tsx      # Link group display
│   ├── CommandPalette.tsx # ⌘K command interface
│   ├── SettingsPanel.tsx # Tabbed settings UI
│   ├── WeatherWidget.tsx
│   ├── SpotifyWidget.tsx
│   ├── SportsTicker.tsx
│   ├── CryptoTicker.tsx
│   ├── QuickNotes.tsx
│   └── PomodoroTimer.tsx
├── services/             # Business logic & APIs
│   ├── settingsService.ts # Settings persistence
│   ├── geminiService.ts   # AI integration
│   ├── spotifyService.ts  # Spotify OAuth + API
│   ├── weatherService.ts
│   ├── cryptoService.ts
│   └── sportsService.ts
├── constants.tsx         # Default configs
├── types.ts              # TypeScript interfaces
├── App.tsx               # Root component
└── index.tsx             # Entry point
```

---

## Design System

### Theme: Cyberpunk / Himalayan Dark

**Philosophy:** Dark-first, high contrast, glassmorphism effects, minimal color accents.

### Color Palette (Default Dark)
| Token | Value | Usage |
|-------|-------|-------|
| `bg-primary` | `zinc-950` | Main background |
| `bg-glass` | `zinc-950/80` | Card backgrounds |
| `border` | `white/10` | Borders, dividers |
| `text-primary` | `white` | Values, headings |
| `text-secondary` | `zinc-400` | Labels, hints |
| `accent-purple` | `purple-500` | AI, selection |
| `accent-green` | `green-500` | Success, live |
| `accent-red` | `red-500` | Error, down |

### Typography
| Usage | Font | Weight |
|-------|------|--------|
| Headings, Data | JetBrains Mono | 700 |
| UI Labels | Inter | 400-600 |
| Code | JetBrains Mono | 400 |

### Spacing & Layout
- **Padding:** `p-4` (mobile), `p-6` (tablet), `p-8` (desktop)
- **Gap:** `gap-4` to `gap-8`
- **Border Radius:** `rounded-xl` (16px), `rounded-2xl` (24px)
- **Max Width:** `1600px` for content

### Effects
- **Blur:** `backdrop-blur-sm` to `backdrop-blur-xl`
- **Shadows:** `shadow-lg`, `shadow-2xl`
- **Transitions:** `transition-all duration-200`

---

## Features Deep Dive

### 1. Command Palette (⌘K)
- Raycast/Spotlight-inspired interface
- Quick access to search and settings
- Keyboard-first navigation
- Extensible action system

### 2. Settings System
- Tabbed interface (General, APIs, Links, Widgets, Wallpaper)
- Real-time save with visual feedback
- Settings stored in localStorage as JSON
- Event-based updates across components

### 3. Widget Architecture
Each widget:
- Self-contained component
- Own service for data fetching
- Responds to settings changes
- Can be toggled on/off
- Fixed height for consistent layout

### 4. Theming (Planned)
- CSS custom properties for colors
- Theme object structure
- Light/dark mode detection
- Theme switching without reload

---

## API Integrations

| Service | API | Auth | Rate Limits |
|---------|-----|------|-------------|
| Weather | wttr.in | None | Generous |
| Crypto | CoinGecko | None | 50/min |
| Sports | ESPN | None | Undocumented |
| Gemini | Google AI | API Key | 60/min |
| Spotify | Web API | OAuth | 100/day |

---

## Deployment

### Web (Current)
- GitHub Pages at `/nexus-start/`
- Auto-deploy via GitHub Actions
- Vite build with base path handling

### Desktop (Planned)
- Tauri for native wrapper
- DMG for macOS
- MSI/EXE for Windows
- AppImage for Linux

---

## Development Workflow

### Local Development
```bash
pnpm install
pnpm dev          # Start dev server at :5173
pnpm build        # Production build
pnpm preview      # Preview production build
```

### Code Standards
- TypeScript strict mode
- Functional components with hooks
- Services for business logic
- Components for UI only
- Props interfaces for all components

---

## Roadmap Summary

### Phase 1: Polish (Current)
- [x] Core widgets
- [x] Settings system
- [x] Command palette
- [x] Wallpaper customization
- [ ] Theme system
- [ ] More widgets

### Phase 2: Desktop App
- [ ] Tauri integration
- [ ] Menu bar presence
- [ ] Run on login
- [ ] Native preferences

### Phase 3: Monetization
- [ ] License system
- [ ] Payment integration
- [ ] Landing page
- [ ] Launch

### Phase 4: Growth
- [ ] Cloud sync
- [ ] More platforms
- [ ] Community themes
- [ ] Widget marketplace

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `App.tsx` | Root layout, settings state, keyboard handlers |
| `settingsService.ts` | All user preferences |
| `CommandPalette.tsx` | ⌘K interface |
| `SettingsPanel.tsx` | Settings UI with tabs |
| `constants.tsx` | Default links, wallpapers |
| `FEATURES.md` | Full feature roadmap |

---

*Last updated: December 2024*
