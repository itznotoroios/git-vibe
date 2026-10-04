# git-vibe

**Your developer horoscope & personality profile based on your real git history.**

> *What's your coding vibe?*

`git-vibe` is a **zero-dependency, local-first** Node.js CLI tool that parses your local git commit history and classifies your developer archetype. It outputs a brutalist ASCII card in your terminal and generates a standalone HTML profile card you can share instantly.

**No OAuth. No cloud databases. No server-side compute.** Everything runs 100% locally on your machine.

---

## ✨ Features

- 🦉 **5+ Developer Archetypes** — Nocturnal Gremlin, Chaotic Fixer, Git-Philosophy Major, Refactoring Assassin, Apprentice Bootcamper
- 📝 **Hilarious Roasts** — Custom-generated based on your actual commit patterns
- 🎨 **Brutalist ASCII Card** — Terminal output with ANSI colors and Industrial Brutalist design
- 🌐 **Standalone HTML Profile** — Beautiful, shareable card with your stats
- 📊 **SVG Card Generator** — Export embeddable SVG for your README
- 🔗 **GitHub Integration** — Optional fetch of public GitHub stats (stars, repos, followers)
- ⚡ **Zero Dependencies** — Pure Node.js, installs in <2 seconds via `npx`
- 🧪 **13 Unit Tests** — TDD workflow, all tests passing

---

## 🚀 Installation

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
# Analyze the current git repository
git-vibe

# Use mock commit data (great for testing)
git-vibe --mock

# Show help
git-vibe --help
```

### Output

When you run `git-vibe`, you get:

1. **A brutalist ASCII card** printed directly to your terminal
2. **A standalone HTML profile card** saved as `./git-vibe-profile.html`
3. **An SVG card** saved as `./git-vibe-profile.svg`

Open the HTML file in any browser to get a high-contrast, Swiss Industrial Print-style card you can screenshot and share.

---

## 🎯 Developer Archetypes

| Archetype | Emoji | Trigger | Vibe |
|-----------|-------|---------|------|
| **THE NOCTURNAL GREMLIN** | 🦉 | >40% commits between 11 PM – 5 AM | Over-caffeinated, chaotic productivity |
| **THE CHAOTIC FIXER** | 🔥 | >35% rapid commits (<5 min apart) with "fix"/"fml" | Pure trial-and-error panic |
| **THE GIT-PHILOSOPHY MAJOR** | 📝 | Avg message length >70 chars | Treats git commits like high literature |
| **THE REFACTORING ASSASSIN** | ✂️ | Deletion ratio >1.8x | Lethal cleanups, pure minimalism |
| **THE APPRENTICE BOOTCAMPER** | 🌱 | <20 commits | Squeaky clean, slightly naive |

---

## 🎨 Design System

Built with **Industrial Brutalist / Tactical Telemetry** aesthetics:

- **Font:** Anton (headers) + JetBrains Mono (body)
- **Colors:** 
  - Background: `#F4F4F0` (unbleached paper)
  - Ink: `#050505` (carbon)
  - Accent: `#E61919` (hazard red)
- **Style:** Rigid grids, zero border-radius, uppercase labels, visible borders

---

## 📦 Project Structure

```
git-vibe/
├── bin/index.js          # CLI entry point
├── src/
│   ├── git.js            # Native git log parsing
│   ├── analyzer.js       # Metrics calculation
│   ├── classifier.js     # Archetype classification + roasts
│   ├── ascii-renderer.js # Terminal ASCII card
│   ├── html-renderer.js  # Standalone HTML card
│   └── svg-renderer.js   # SVG export for READMEs
├── tests/                # Unit tests (TDD)
├── index.html            # Landing page
└── package.json          # Zero dependencies
```

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch
```

---

## 🔗 Share Your Vibe

1. Run `git-vibe` in your repo
2. Open `git-vibe-profile.html` in your browser
3. Screenshot the brutalist card
4. Post it on Twitter/X with `@gitvibedev`

Example tweet:
> Just ran `npx git-vibe` and got roasted as THE NOCTURNAL GREMLIN 🦉 Check out my git vibe: [screenshot]

---

## 🛠️ Built With

- **Runtime:** Node.js >= 18.0.0
- **Testing:** Node.js native `node:test` + `node:assert`
- **Dependencies:** 0 (zero external packages)
- **Design:** Industrial Brutalist UI

---

## 📄 License

MIT — built by a developer, for developers.

---

*Generated with ❤️ and zero dependencies*