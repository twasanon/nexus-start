# Nexus Start

> A premium, customizable browser start page and desktop dashboard for power users and developers.

![Nexus Start](https://img.shields.io/badge/version-1.0.0-purple) ![License](https://img.shields.io/badge/license-Proprietary-blue) ![Platform](https://img.shields.io/badge/platform-macOS%20%7C%20Web-lightgrey)

---

## ✨ Features

### Core
- **Smart Clock** — Personalized time-based greeting
- **Universal Search** — Google, Gemini, ChatGPT, Claude, Kimi, DuckDuckGo
- **Quick Ask AI** — Instant answers powered by Gemini
- **Link Trees** — Organized quick-access bookmarks
- **Command Palette** — ⌘K for everything

### Widgets
- **Spotify Now Playing** — Live track display
- **Sports Ticker** — Premier League scores
- **Crypto Market** — BTC, ETH, SOL prices
- **Brain Dump** — Persistent scratchpad
- **Focus Timer** — Customizable Pomodoro

### Customization
- **Themes** — Light/Dark mode, multiple color schemes
- **Custom Wallpapers** — Your own backgrounds
- **Widget Toggle** — Show/hide any widget
- **Custom Links** — Edit all link groups
- **Settings Sync** — All preferences stored locally

---

## 🚀 Getting Started

### Web Version

```bash
pnpm install
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173)

### Mac App (Coming Soon)

Download the `.dmg` from [Releases](https://github.com/yourname/nexus-start/releases) and drag to Applications.

---

## ⚙️ Configuration

Press **⌘K** → **Settings** to configure:

| Tab | Settings |
|-----|----------|
| **General** | Your name |
| **API Keys** | Gemini API Key, Spotify Client ID |
| **Links** | Customize all link groups |
| **Widgets** | Toggle visibility, timer duration |
| **Wallpaper** | Custom images, grayscale, rotation |

### API Setup

| Service | Get Key From | Required For |
|---------|--------------|--------------|
| Gemini | [Google AI Studio](https://aistudio.google.com/apikey) | Quick Ask AI |
| Spotify | [Developer Dashboard](https://developer.spotify.com/dashboard) | Now Playing |

All settings stored locally — your data never leaves your device.

---

## 🎨 Themes

| Theme | Style |
|-------|-------|
| Nexus Dark | Default cyberpunk dark |
| Tokyo Night | Purple-accented dark |
| Nord | Cool blue minimalist |
| Dracula | Classic dark with pink accents |
| Nexus Light | Clean light mode |
| *More coming...* | |

---

## 📦 Tech Stack

- **Framework:** React 19 + TypeScript
- **Build:** Vite 6
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Desktop:** Tauri (coming)

---

## 🗺️ Roadmap

See [FEATURES.md](./FEATURES.md) for the full roadmap including:

- [ ] Native Mac app with menu bar
- [ ] More themes (10+ planned)
- [ ] Calendar, GitHub, Todo widgets
- [ ] Windows & Linux apps
- [ ] Cloud sync (Pro)

---

## 💰 Pricing (Coming Soon)

| Tier | Price | Includes |
|------|-------|----------|
| **Free** | $0 | Basic widgets, 1 theme |
| **Pro** | $10 once | All widgets, all themes, custom CSS |
| **Pro+** | $3/mo | Pro + cloud sync, priority support |

---

## 📄 License

Proprietary. See [LICENSE](./LICENSE) for details.

---

## 🤝 Support

- [Documentation](./docs)
- [Issues](https://github.com/yourname/nexus-start/issues)
- Email: support@nexusstart.app

---

*Built with ♥ for people who live in their browser.*
