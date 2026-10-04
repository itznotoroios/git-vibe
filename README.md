# git-vibe

**Your developer horoscope & personality profile based on your real git history.**

> *What's your coding vibe?*

`git-vibe` is a **zero-dependency, local-first** Node.js CLI tool that parses your local git commit history and classifies your developer archetype. It outputs a brutalist ASCII card in your terminal and generates a standalone, high-contrast HTML profile card you can share instantly.

**No OAuth. No cloud databases. No server-side compute.** Everything runs 100% locally on your machine.

---

## Why git-vibe exists

Every developer has a unique coding personality. Your git history tells the real story — when you code, how fast you commit, how you write messages. `git-vibe` translates that raw data into a hilarious, shareable profile card.

- 🦉 **The Nocturnal Gremlin** — commits at 3 AM like a caffeinated raccoon
- 🔧 **The Chaotic Fixer** — commits every 3 minutes with messages like "fix" and "fml"
- 📝 **The Git-Philosophy Major** — writes 100-word commit messages like a novelist
- ✂️ **The Refactoring Assassin** — deletes more code than they write
- 🌱 **The Apprentice Bootcamper** — just starting out, learning the ropes

---

## Installation

```bash
# Run directly with npx (no install required)
npx git-vibe

# Or install globally
npm install -g git-vibe
git-vibe
```

**Zero dependencies.** The entire tool is a single, lightweight Node.js script. No install overhead, no bloat.

---

## Usage

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
2. **A standalone HTML profile card** saved as `./git-vibe-profile.html` in your current directory

Open the HTML file in any browser to get a high-contrast, Swiss Industrial Print-style card you can screenshot and share on Twitter/X, Reddit, or LinkedIn.

---

## How it works

`git-vibe` is built on a simple, transparent pipeline:

1. **Parse** — reads your local `git log` using native git commands
2. **Analyze** — extracts metrics: night owl ratio, commit frequency, message length, deletion patterns
3. **Classify** — maps your stats to one of 5 developer archetypes using heuristic rules
4. **Render** — outputs a brutalist ASCII card and a standalone HTML profile

```text
git log → parseGitLogLine() → analyzeCommits() → classifyVibe() → renderAsciiCard() / renderHtmlCard()
```

---

## Archetypes

| Archetype | Trigger | Vibe |
|-----------|---------|------|
| **THE NOCTURNAL GREMLIN** | >40% commits between 11 PM – 5 AM | Over-caffeinated, chaotic productivity |
| **THE CHAOTIC FIXER** | >35% rapid commits (<5 min apart) with "fix"/"fml" | Pure trial-and-error panic |
| **THE GIT-PHILOSOPHY MAJOR** | Avg message length >70 chars | Treats git commits like high literature |
| **THE REFACTORING ASSASSIN** | Deletion ratio >1.8x | Lethal cleanups, pure minimalism |
| **THE APPRENTICE BOOTCAMPER** | <20 commits | Squeaky clean, slightly naive |

---

## Requirements

- **Node.js >= 18.0.0**
- A git repository with at least 5 commits

---

## License

MIT — built by a developer, for developers.

---

## Share Your Vibe

> [!IMPORTANT]
> Run `git-vibe` in your repo, screenshot the ASCII card, and share it on Twitter/X with `@gitvibedev`. The best roasts get featured on our website!