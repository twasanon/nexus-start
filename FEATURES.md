# Nexus Start - Feature Roadmap

## Product Vision

**Nexus Start** is a premium, customizable browser start page and desktop dashboard for power users and developers. Available as a native Mac app with plans for Windows and Linux.

**Price Point:** $10 one-time purchase (or $3/month subscription for cloud sync)

---

## Phase 1: Native Mac App (MVP)

### 1.1 Desktop Application
- [ ] Package as native Mac app using **Tauri** (Rust-based, lightweight)
- [ ] Menu bar icon with quick actions
- [ ] "Open at Login" toggle in preferences
- [ ] System tray presence
- [ ] Auto-updater (Sparkle or built-in)
- [ ] DMG installer with drag-to-Applications
- [ ] Code signing & notarization for macOS Gatekeeper
- [ ] Set as default new tab page in browsers (instructions/automation)

### 1.2 App Preferences Window
- [ ] Native macOS preferences window (SwiftUI or Tauri)
- [ ] General: Open at login, check for updates
- [ ] Appearance: Theme selection, light/dark mode
- [ ] Shortcuts: Global hotkey to open dashboard
- [ ] About: Version, license, support links

### 1.3 Licensing System
- [ ] License key validation (Gumroad, LemonSqueezy, or Paddle)
- [ ] Trial mode (7 days full access)
- [ ] Graceful degradation for expired licenses
- [ ] Offline license caching

---

## Phase 2: Themes & Appearance

### 2.1 Color Themes (Pre-built)
- [ ] **Dark Themes:**
  - Nexus Dark (current default)
  - Tokyo Night
  - Dracula
  - Nord
  - One Dark Pro
  - Catppuccin Mocha
  - Gruvbox Dark
  - Synthwave '84
  
- [ ] **Light Themes:**
  - Nexus Light
  - GitHub Light
  - Solarized Light
  - Nord Light
  - Catppuccin Latte
  - Paper

### 2.2 Theme Customization
- [ ] Light/Dark mode toggle (respect system preference option)
- [ ] Accent color picker (affects highlights, buttons)
- [ ] Background opacity slider
- [ ] Blur intensity slider
- [ ] Font selection (Mono: JetBrains, Fira Code, SF Mono; Sans: Inter, SF Pro, Geist)
- [ ] Font size scaling (80% - 120%)
- [ ] Border radius preference (sharp, rounded, pill)

### 2.3 Advanced Appearance
- [ ] Custom CSS injection (power users)
- [ ] Theme import/export (JSON format)
- [ ] Community theme gallery (future)

---

## Phase 3: Widget Expansion

### 3.1 Productivity Widgets
- [ ] **Calendar** - Google Calendar / Apple Calendar integration
- [ ] **Todo List** - Persistent tasks with due dates, priorities
- [ ] **Habit Tracker** - Daily/weekly streaks visualization
- [ ] **Countdown Timer** - Multiple named countdowns (events, deadlines)
- [ ] **World Clocks** - Multiple timezones with labels
- [ ] **Meeting Countdown** - Next meeting from calendar with join button

### 3.2 Developer Widgets
- [ ] **GitHub Activity** - Contribution graph, recent commits
- [ ] **GitHub Notifications** - Unread count, quick links
- [ ] **CI/CD Status** - GitHub Actions, Vercel, Netlify build status
- [ ] **NPM Stats** - Package download counts
- [ ] **Server Status** - Ping multiple endpoints (uptime monitoring)
- [ ] **Docker Containers** - Local container status (requires Docker)

### 3.3 Finance Widgets
- [ ] **Stock Ticker** - Customizable watchlist (AAPL, NVDA, etc.)
- [ ] **Forex Rates** - Currency pairs
- [ ] **Crypto Extended** - More coins, portfolio tracking
- [ ] **Net Worth Tracker** - Manual entry, trend graph

### 3.4 Media & Entertainment
- [ ] **Now Playing Extended** - Apple Music, YouTube Music support
- [ ] **Podcast Queue** - Current/next episodes
- [ ] **YouTube Subscriptions** - Latest from subscribed channels
- [ ] **Twitch Live** - Followed streamers currently live
- [ ] **Movie/TV Tracker** - Upcoming releases, watchlist

### 3.5 Information Widgets
- [ ] **News Headlines** - Customizable sources (RSS/API)
- [ ] **Hacker News Extended** - Top stories, comments preview
- [ ] **Reddit Feed** - Subreddit posts
- [ ] **RSS Reader** - Custom feeds
- [ ] **Wikipedia Daily** - Featured article, on this day

### 3.6 System Widgets
- [ ] **System Stats** - CPU, RAM, Disk usage (native only)
- [ ] **Battery Status** - Detailed battery info (native only)
- [ ] **Network Speed** - Current up/down speed
- [ ] **Storage** - Disk space visualization
- [ ] **Recently Opened** - Quick access to recent files/apps

### 3.7 Communication Widgets
- [ ] **Email Unread** - Gmail, Outlook count
- [ ] **Slack Status** - Unread messages, DMs
- [ ] **Discord Presence** - Server activity
- [ ] **Messages Preview** - iMessage integration (native only)

### 3.8 Utility Widgets
- [ ] **Clipboard History** - Recent copies with one-click paste
- [ ] **Quick Notes Extended** - Multiple notes, markdown support
- [ ] **Bookmarks** - Visual bookmark grid
- [ ] **Quick Actions** - Custom URL/app launchers
- [ ] **QR Code Generator** - Generate QR from clipboard

### 3.9 AI Widgets
- [ ] **AI Chat** - Persistent conversation with Gemini/GPT
- [ ] **AI Daily Summary** - AI-generated summary of your day
- [ ] **Smart Suggestions** - Context-aware quick actions

---

## Phase 4: Layout & Customization

### 4.1 Widget Management
- [ ] Drag-and-drop widget positioning
- [ ] Widget sizing (small, medium, large, full-width)
- [ ] Widget grouping/stacking
- [ ] Multiple pages/tabs (swipe or keyboard nav)
- [ ] Grid snap with customizable columns (4, 6, 8, 12)

### 4.2 Layout Presets
- [ ] Minimal (clock + search only)
- [ ] Developer (GitHub, CI, terminal-style)
- [ ] Productivity (calendar, todos, notes)
- [ ] Finance (stocks, crypto, news)
- [ ] Custom (user-defined)

### 4.3 Responsive Behavior
- [ ] Tablet layout (iPad browser)
- [ ] Mobile layout (phone browser)
- [ ] TV/large screen layout
- [ ] Compact mode for small windows

---

## Phase 5: Data & Sync

### 5.1 Cloud Sync (Premium)
- [ ] Account system (email/password or OAuth)
- [ ] Settings sync across devices
- [ ] Notes/todos sync
- [ ] End-to-end encryption option

### 5.2 Import/Export
- [ ] Export all settings as JSON
- [ ] Import settings from file
- [ ] Backup to iCloud/Google Drive
- [ ] Migration from other start pages

### 5.3 Data Portability
- [ ] Export notes as Markdown
- [ ] Export todos as CSV/JSON
- [ ] API for external integrations

---

## Phase 6: Platform Expansion

### 6.1 Windows App
- [ ] Tauri Windows build
- [ ] Windows installer (MSI/EXE)
- [ ] Windows startup integration
- [ ] Windows system tray

### 6.2 Linux App
- [ ] AppImage, Flatpak, Snap packages
- [ ] Linux autostart integration
- [ ] GTK/Qt theme detection

### 6.3 Browser Extension
- [ ] Chrome extension (new tab override)
- [ ] Firefox extension
- [ ] Safari extension
- [ ] Edge extension

### 6.4 Mobile Apps (Future)
- [ ] iOS app (React Native or SwiftUI)
- [ ] Android app
- [ ] Widget for home screen

---

## Phase 7: Monetization & Business

### 7.1 Pricing Tiers

**Free Tier:**
- Basic widgets (clock, search, weather, notes)
- 1 theme (dark)
- Local storage only
- Community support

**Pro ($10 one-time):**
- All widgets
- All themes
- Custom themes
- No watermark
- Email support

**Pro+ ($3/month or $24/year):**
- Everything in Pro
- Cloud sync
- Multiple devices
- Priority support
- Early access to new features

### 7.2 Payment Integration
- [ ] Gumroad integration
- [ ] LemonSqueezy integration
- [ ] Paddle integration (for tax compliance)
- [ ] License key system

### 7.3 Marketing
- [ ] Landing page (nexusstart.app)
- [ ] Product Hunt launch
- [ ] Hacker News Show HN
- [ ] Twitter/X presence
- [ ] YouTube demo video
- [ ] Comparison pages (vs Momentum, vs Start.me)

---

## Technical Architecture

### Current Stack
- React 19 + TypeScript
- Vite 6
- Tailwind CSS
- Lucide Icons
- LocalStorage persistence

### Proposed Stack Additions
- **Desktop:** Tauri (Rust + WebView)
- **State:** Zustand or Jotai (replace useState)
- **Sync:** Supabase or Firebase
- **Payments:** LemonSqueezy SDK
- **Analytics:** PostHog or Plausible
- **Error Tracking:** Sentry

### File Structure (Proposed)
```
nexus-start/
├── src/
│   ├── components/
│   │   ├── widgets/        # All widget components
│   │   ├── layout/         # Layout components
│   │   ├── settings/       # Settings panels
│   │   └── common/         # Shared components
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API services
│   ├── stores/             # State management
│   ├── themes/             # Theme definitions
│   ├── types/              # TypeScript types
│   └── utils/              # Utility functions
├── src-tauri/              # Tauri native code
├── public/
└── docs/
```

---

## Priority Order

1. **Immediate (Week 1-2):**
   - Themes (light/dark + 3 pre-built)
   - More widgets (todo, calendar placeholder, GitHub)
   - Layout improvements

2. **Short-term (Week 3-4):**
   - Tauri Mac app packaging
   - Basic preferences window
   - Run on login

3. **Medium-term (Month 2):**
   - License system
   - Landing page
   - Payment integration
   - Launch on Gumroad

4. **Long-term (Month 3+):**
   - Cloud sync
   - Windows/Linux
   - Browser extensions
   - Mobile apps

---

## Success Metrics

- 1,000 downloads in first month
- 100 paid users in first month ($1,000 revenue)
- 4.5+ star rating
- <2% refund rate
- 50% trial-to-paid conversion

---

*Last updated: December 2024*

