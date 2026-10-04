# git-vibe

**Your developer horoscope & personality profile based on your real git history.**

> *What's your coding vibe?*

`git-vibe` is a **zero-dependency, local-first** Node.js CLI tool that parses your local git commit history and classifies your developer archetype. It outputs brutalist ASCII cards in your terminal and generates shareable HTML profiles.

**No OAuth. No cloud databases. No server-side compute.** Everything runs 100% locally.

---

## ✨ v1.1 Features

- 🦉 **10+ Developer Archetypes** — Nocturnal Gremlin, Chaotic Fixer, Git-Philosophy Major, Refactoring Assassin, Weekend Warrior, Morning Lark, Feature Factory, Bug Hunter, and more
- 📊 **24-Hour Activity Heatmap** — Visual bar chart showing your peak coding hours
- 📝 **Contextual Roasts** — Smart, personalized burns based on your actual commit patterns
- 🎨 **Multi-Format Exports** — JSON, Markdown, SVG badges, terminal tables
- 🤖 **LLM Enhancement** — Optional AI-powered roasts via free LLM API
- 💡 **Commit Suggestions** — Get funny commit message ideas based on your archetype
- 🌙 **Dark/Light Theme Toggle** — Beautiful HTML cards with CRT scanline effects
- 📱 **Shareable URLs** — Base64-encoded profiles for cross-device sharing
- ⌨️ **Typing Animation** — Roast text appears letter-by-letter
- 🔗 **One-Click Tweet** — Share your vibe directly to Twitter/X

---

## 🚀 Quick Start

```bash
# Run directly with npx (recommended)
npx git-vibe

# Or install globally
npm install -g git-vibe
git-vibe
```

---

## 📖 Usage

```bash
# Analyze current repository
git-vibe

# Use mock data for testing
git-vibe --mock

# Export as JSON only
git-vibe --format json

# Export all formats
git-vibe --format all

# Use LLM for enhanced roasts
git-vibe --enhanced

# Show help
git-vibe --help
```

### Output Formats

| Flag | Description |
|------|-------------|
| `--format all` | ASCII + HTML + JSON + Markdown + SVG (default) |
| `--format ascii` | Terminal ASCII card only |
| `--format html` | Standalone HTML profile |
| `--format json` | JSON data export |
| `--format md` | Markdown for READMEs |
| `--format svg` | SVG badge for embeds |
| `--format table` | Formatted terminal table |

---

## 🎯 Developer Archetypes

| Archetype | Emoji | Trigger | Vibe |
|-----------|-------|---------|------|
| **THE NOCTURNAL GREMLIN** | 🦉 | >40% commits between 11 PM – 5 AM | Over-caffeinated, chaotic productivity |
| **THE CHAOTIC FIXER** | 🔥 | >35% rapid commits (<5 min apart) | Pure trial-and-error panic |
| **THE GIT-PHILOSOPHY MAJOR** | 📝 | Avg message length >70 chars | Treats git commits like high literature |
| **THE REFACTORING ASSASSIN** | ✂️ | Deletion ratio >1.8x | Lethal cleanups, pure minimalism |
| **THE WEEKEND WARRIOR** | 🎯 | >40% weekend commits | Work-life balance? Never heard of her |
| **THE MORNING LARK** | 🌅 | Peak hour 6 AM – 11 AM | Early bird gets the bug |
| **THE FEATURE FACTORY** | 🏭 | Most commits are "feat:" | Shipping like it's 2016 |
| **THE BUG HUNTER** | 🐛 | Most commits are "fix:" | Running a pest control service |
| **THE APPRENTICE BOOTCAMPER** | 🌱 | <20 commits | Learning the ropes |
| **THE STABLE HAND** | 🐴 | Default | Reliable, consistent, slightly boring |

---

## 🎨 Terminal Output Example

```
╔══════════════════════════════════════════════╗
  GIT-VIBE CARD: @rihan 🦉
  ARCHETYPE: THE NOCTURNAL GREMLIN

  VIBE SCORE: 50% Night / 50% Day
├──────────────────────────────────────────┤
   Total Commits:   10
   Night Owl:       ██████████░░░░░░░░░░ 50%
   Peak Hour:       23:00
   Consistency:     █████████████████░░░ 84%

  MESSAGE TYPES:
    fix        ████████░░░░░░░░░░░░ 40%
    feat       ████░░░░░░░░░░░░░░░░ 20%
    refactor   ██████░░░░░░░░░░░░░░ 30%

  "Bro, 50% of your commits happen between 11 PM and 5 AM."

  SUGGESTED COMMITS:
    1. fix: sleep schedule (still broken)
    2. feat: midnight snack dispenser
    3. refactor: circadian rhythm removal
╚══════════════════════════════════════════════╝
```

---

## 📦 Project Structure

```
git-vibe/
├── bin/index.js              # CLI entry point
├── src/
│   ├── git.js                # Git log parser
│   ├── analyzer.js           # Metrics engine
│   ├── classifier.js         # Archetype classification
│   ├── ascii-renderer.js     # Terminal ASCII output
│   ├── html-renderer.js      # Animated HTML cards
│   ├── svg-renderer.js       # SVG badge generator
│   ├── llm-roaster.js        # AI-powered roasts
│   ├── output-formatters.js  # Multi-format exports
│   └── github-api.js         # GitHub stats fetcher
├── tests/                    # 13 unit tests (TDD)
├── index.html                # Landing page
└── README.md                 # This file
```

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Run in watch mode
npm test -- --watch
```

**Result:** 13 tests, 13 pass, 0 fail

---

## 🔧 Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `GIT_VIBE_USE_LLM` | `false` | Enable LLM-enhanced roasts |
| `JARVIS_API_KEY` | - | Your free LLM API key |
| `JARVIS_API_URL` | `http://127.0.0.1:31415/v1` | API endpoint |
| `JARVIS_MODEL` | `auto` | Model to use |

---

## 🎨 Design System

Built with **Industrial Brutalist / Tactical Telemetry** aesthetics:

- **Fonts:** Anton (headers) + JetBrains Mono (body)
- **Colors:**
  - Background: `#F4F4F0` (unbleached paper)
  - Ink: `#050505` (carbon)
  - Accent: `#E61919` (hazard red)
- **Style:** Rigid grids, zero border-radius, uppercase labels, visible borders

---

## 📄 License

MIT — built by a developer, for developers.

---

*Generated with ⚡ and zero dependencies*