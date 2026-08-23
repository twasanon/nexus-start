# Atrium Theme System Prompt

Use this prompt to plan and implement a robust **Theme System** for Atrium. We currently have a single hardcoded dark theme, and we need to expand this to support **6 distinct themes** (3 Dark, 3 Light) selectable via the Settings Panel.

---

## 1. Feature Summary
- **Goal:** Implement a dynamic theme switching system that updates colors, fonts, and background styles across the entire application in real-time.
- **Motivation:** Users want to personalize their dashboard to match their aesthetic or system preference (Light/Dark mode).
- **Relevant Components:** `App.tsx`, `SettingsPanel.tsx`, `CommandPalette.tsx`, and all widgets (`Clock`, `SearchBar`, `WeatherWidget`, `SpotifyWidget`, etc.).

## 2. References & Must-Read Files
- `PROJECT_CONTEXT.md` – Design system and architecture.
- `FEATURES.md` – Specific theme names and definitions (Phase 2).
- `services/settingsService.ts` – Where theme preference will be stored.
- `components/` – All UI components need to be checked for hardcoded colors.

## 3. Theme Requirements (from FEATURES.md)

**Dark Themes:**
1. **Atrium Dark** (Default) – *High contrast, zinc/neutral grays, purple accents.*
2. **Tokyo Night** – *Deep blue/purple background, soft cyan/magenta accents.*
3. **Dracula** – *Classic dark background, vibrant pink/green/purple accents.*

**Light Themes:**
1. **Atrium Light** – *Clean white/gray background, high legibility, blue accents.*
2. **Solarized Light** – *Warm beige background, soft teal/orange accents.*
3. **Nord Light** – *Cold white/bluish-gray background, frost blue accents.*

## 4. Aesthetics & Design Philosophy

<frontend_aesthetics>
You tend to converge toward generic, "on distribution" outputs. In frontend design,this creates what users call the "AI slop" aesthetic. Avoid this: make creative,distinctive frontends that surprise and delight. 

Focus on:
- **Typography:** Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics.
- **Color & Theme:** Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes. Draw from IDE themes and cultural aesthetics for inspiration.
- **Motion:** Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions. Keep in mind Motion is not required and only use when relevant. We don't want something flashy as this is a start page and distracting is the last thing we want.

Avoid generic AI-generated aesthetics:
- Overused font families (Inter, Roboto, Arial, system fonts)
- Clichéd color schemes (particularly purple gradients on white backgrounds)
- Predictable layouts and component patterns
- Cookie-cutter design that lacks context-specific character

Interpret creatively and make unexpected choices that feel genuinely designed for the context. Vary between light and dark themes, different fonts, different aesthetics. You still tend to converge on common choices (Space Grotesk, for example) across generations. Avoid this: it is critical that you think outside the box!
</frontend_aesthetics>

## 5. Plan Mode (Required)

**Before writing code**, produce a detailed plan covering:

1.  **Theme Structure:** Define the TypeScript interface for a Theme object (colors, fonts, backgrounds).
2.  **CSS Strategy:** How will we inject dynamic variables? (e.g., CSS Variables in `:root`, Tailwind plugin, or React Context).
    *   *Goal:* Switch themes instantly without reload.
3.  **Component Updates:** List specific components that need refactoring to remove hardcoded colors (e.g., `bg-zinc-950` → `bg-[var(--bg-primary)]`).
4.  **Settings UI:** Design the theme selector in `SettingsPanel.tsx` (Grid of previews? Dropdown?).
5.  **Persistence:** Ensure theme selection saves to `localStorage` via `settingsService.ts`.

## 6. Execution Checklist
1.  Create the theme definitions and utility functions.
2.  Refactor `App.tsx` to apply the selected theme class/variables.
3.  Update `SettingsPanel.tsx` to include the theme selector.
4.  Systematically update widgets to use semantic color names (primary, secondary, accent) instead of hardcoded hex/Tailwind shades.
5.  Verify all 6 themes look distinct and legible.
