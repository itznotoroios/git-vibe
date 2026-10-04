<div align="center">

# git-vibe

### Your Developer Horoscope — Powered by Your Git History

**What's your coding vibe?** Analyze your commit patterns, discover your developer archetype, and get brutally roasted. Zero dependencies. Zero tracking. 100% local.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Node.js >= 18](https://img.shields.io/badge/Node.js-%3E%3D18.0.0-brightgreen.svg?style=flat-square)](https://nodejs.org)
[![Tests](https://img.shields.io/badge/tests-18_passing-brightgreen.svg?style=flat-square)](#)
[![Dependencies](https://img.shields.io/badge/dependencies-0-zero.svg?style=flat-square)](#)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](#contributing)

**[View Demo](#-demo)** · **[Features](#-features)** · **[Installation](#-installation)** · **[Contributing](#-contributing)**

</div>

---

## 👀 Demo

<div align="center">

```
╔══════════════════════════════════════════════╗
║  GIT-VIBE CARD: @rihan 🦉                   ║
╠══════════════════════════════════════════════╣
║  ARCHETYPE: THE NOCTURNAL GREMLIN            ║
║                                              ║
║  VIBE SCORE: 50% Night / 50% Day             ║
├──────────────────────────────────────────────┤
║   Total Commits:   10                        ║
║   Night Owl:       ██████████░░░░░░░░░░ 50%  ║
║   Peak Hour:       23:00                     ║
║   Consistency:     █████████████████░░░ 84%  ║
║                                              ║
║  MESSAGE TYPES:                              ║
║    fix        ████████░░░░░░░░░░░░ 40%       ║
║    feat       ████░░░░░░░░░░░░░░░░ 20%       ║
║    refactor   ██████░░░░░░░░░░░░░░ 30%       ║
║                                              ║
║  "Bro, 50% of your commits happen between    ║
║   11 PM and 5 AM. Your circadian rhythm is   ║
║   a suggestion, not a rule."                 ║
║                                              ║
║  SUGGESTED COMMITS:                          ║
║    1. fix: sleep schedule (still broken)     ║
║    2. feat: midnight snack dispenser         ║
║    3. refactor: circadian rhythm removal     ║
╚══════════════════════════════════════════════╝
```

</div>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🦉 **10+ Archetypes** | Nocturnal Gremlin, Chaotic Fixer, Git-Philosopher, Refactoring Assassin & more |
| 📊 **Activity Heatmap** | Visual 24-hour breakdown showing your peak coding hours |
| 📝 **Message Analytics** | Color-coded breakdown: fix (red), feat (green), refactor (yellow) |
| 💡 **Smart Suggestions** | Context-aware commit message ideas based on your archetype |
| 🤖 **LLM Roasts** | Optional AI-powered savage burns via free LLM API |
| 🌙 **Theme Toggle** | Dark/light mode with CRT scanline effects |
| 📱 **Shareable Profiles** | Base64-encoded URLs for cross-device sharing |
| 🐦 **One-Click Tweet** | Share your vibe directly to Twitter/X |
| 📦 **Multi-Format Export** | JSON, Markdown, SVG badges, terminal tables |
| ⚡ **Zero Dependencies** | Pure Node.js — installs in <2 seconds via `npx` |
| 🔒 **Privacy First** | No OAuth, no cloud databases, no server-side compute |
| 🧪 **18 Tests** | TDD workflow, all tests passing |

---

## 🚀 Installation

### Quick Start (Recommended)

```bash
# Run directly with npx — no install needed
npx git-vibe

# Or analyze a specific repo
cd ~/your-project && npx git-vibe
```

### Global Install

```bash
# Install globally
npm install -g git-vibe

# Run anywhere
git-vibe
```

### Requirements

- **Node.js** >= 18.0.0
- A **git repository** with at least 5 commits
- **No external dependencies** — works offline

---

## 📖 Usage

### Basic Commands

```bash
# Analyze current repository
git-vibe

# Use mock data (great for testing)
git-vibe --mock

# Show help
git-vibe --help
```

### Output Formats

```bash
# All formats (default)
git-vibe --format all

# Specific formats
git-vibe --format ascii   # Terminal ASCII card
git-vibe --format html    # Standalone HTML profile
git-vibe --format json    # JSON data export
git-vibe --format md      # Markdown for READMEs
git-vibe --format svg     # SVG badge for embeds
git-vibe --format table   # Formatted terminal table
```

### Enhanced Mode (LLM)

```bash
# Enable AI-powered roasts
GIT_VIBE_USE_LLM=true git-vibe --enhanced

# Custom API endpoint
GIT_VIBE_USE_LLM=true LLM_API_URL=https://api.example.com/v1 LLM_API_KEY=your-key git-vibe --enhanced
```

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `GIT_VIBE_USE_LLM` | `false` | Enable LLM-enhanced roasts |
| `LLM_API_KEY` | — | Your LLM API key (required for --enhanced) |
| `LLM_API_URL` | — | OpenAI-compatible API endpoint |
| `LLM_MODEL` | `auto` | Model to use |

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

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Node.js** >= 18 | Runtime environment |
| **JavaScript (ESM)** | Primary language |
| **node:test** | Built-in test framework |
| **node:assert** | Assertion library |
| **node:child_process** | Git command execution |
| **node:fs** | File system operations |
| **node:path** | Path utilities |
| **CSS3** | Industrial Brutalist styling |
| **SVG** | Badge/card generation |
| **Git** | Commit history parsing |

---

## 📁 Project Structure

```
git-vibe/
├── bin/
│   └── index.js              # CLI entry point
├── src/
│   ├── git.js                # Git log parser
│   ├── analyzer.js           # Metrics engine (10+ stats)
│   ├── classifier.js         # Archetype classification
│   ├── ascii-renderer.js     # Terminal ASCII output
│   ├── html-renderer.js      # Animated HTML cards
│   ├── svg-renderer.js       # SVG badge generator
│   ├── heatmap-renderer.js   # Contribution heatmap
│   ├── comparison.js         # Developer comparison engine
│   ├── llm-roaster.js        # AI-powered roasts
│   ├── output-formatters.js  # Multi-format exports
│   └── github-api.js         # GitHub stats fetcher
├── tests/
│   ├── git.test.js           # Parser tests
│   ├── analyzer.test.js      # Analysis tests
│   ├── classifier.test.js    # Classification tests
│   └── comparison.test.js    # Comparison tests
├── docs/
│   └── superpowers/
│       └── specs/
│           └── 2026-10-04-git-vibe-design.md
├── index.html                # Landing page
├── package.json              # Project metadata
├── README.md                 # This file
└── LICENSE                   # MIT License
```

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Run in watch mode
npm test -- --watch

# Test specific file
node --test tests/classifier.test.js
```

**Test Coverage:** 18 tests, 18 passing, 0 failing

---

## 🎨 Design System

Built with **Industrial Brutalist / Tactical Telemetry** aesthetics:

```css
/* Color Palette */
--bg: #F4F4F0          /* Unbleached paper */
--ink: #050505         /* Carbon black */
--red: #E61919         /* Hazard red */
--green: #4AF626       /* Terminal green */
--yellow: #FFD700      /* Warning yellow */

/* Typography */
Font: Anton (headers) + JetBrains Mono (body)

/* Style Rules */
- Zero border-radius (rigid grids)
- Uppercase labels
- Visible borders (2px solid)
- Extreme type scale contrast
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create your branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'feat: add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Setup

```bash
# Clone the repo
git clone https://github.com/itznotoroios/git-vibe.git
cd git-vibe

# Run tests
npm test

# Run in dev mode
npm run dev
```

### Code Style

- Use ES Modules (`import/export`)
- Follow existing naming conventions
- Add tests for new features
- Keep zero dependencies

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

Built with ⚡ and zero dependencies.

---

<div align="center">

### Found this useful? ⭐ Star the repo!

**Share your vibe:** Run `npx git-vibe` and post your results on Twitter/X with `@gitvibedev`

</div>
