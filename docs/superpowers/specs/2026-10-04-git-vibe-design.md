# Spec: git-vibe

## Objective
`git-vibe` is a zero-dependency, local-first Node CLI tool that checks your developer "vibe" based on your local git commit history. It parses local git logs in seconds, classifies your developer archetype, and outputs a stunning ASCII art profile in the terminal, along with a beautifully styled, high-contrast standalone HTML card using **Industrial Brutalist / Tactical Telemetry** aesthetics.

### Key Goals:
- **Zero Cost & Offline-First:** 100% free to run. Purely local static analysis of git history. No cloud databases, no OAuth, no server-side compute.
- **Witty Heuristic Engine:** Includes a robust, funny, rule-based classification engine to roasted archetypes. If a user has `freellmapi` configured, it can optionally enhance the roast with custom LLM humor.
- **High Virality:** The generated profile card is visually spectacular (ASCII and HTML) and designed for instant sharing on Twitter/X, Reddit, and LinkedIn. It encodes state in a compressed URL hash so that a static landing page can render and decode sharing links without a database.

---

## Tech Stack
- **Runtime:** Node.js (>= 18.0.0)
- **Dependencies:** **Zero external dependencies** in production (`dependencies: {}`). This guarantees extremely fast download times for `npx git-vibe` (under 2 seconds) and avoids dependency bloat.
- **Language:** ES Modules / Vanilla Node.js (compatible with plain modern JS or TS via standard typing).
- **Test Framework:** Node.js Native Test Runner (`node --test`) with the built-in `node:assert` library. No Jest, Vitest, or Babel.

---

## Commands
- **Run local CLI:** `node bin/index.js`
- **Run CLI with mock data (for testing):** `node bin/index.js --mock`
- **Run tests:** `node --test` or `npm test`
- **Lint code:** `npm run lint`

---

## Project Structure
```
git-vibe/
├── bin/
│   └── index.js            # CLI entry point (handles args, boots app)
├── src/
│   ├── index.js            # Main controller orchestration
│   ├── git.js              # Native git log parsing utilities
│   ├── analyzer.js         # Heuristic profiling / metric gathering
│   ├── classifier.js       # Archetype classification & roaster logic
│   ├── ascii-renderer.js   # Terminal ASCII art card formatter
│   └── html-renderer.js    # Standalone Industrial Brutalist HTML card exporter
├── tests/
│   ├── git.test.js         # Unit tests for git parser
│   ├── analyzer.test.js    # Unit tests for metric collection
│   └── classifier.test.js  # Unit tests for classifications
├── docs/
│   └── superpowers/
│       └── specs/
│           └── 2026-10-04-git-vibe-design.md
├── package.json            # Configuration, scripts, metadata (Zero deps!)
└── README.md               # User documentation & installation guides
```

---

## Code Style
We use modern ES Modules (ESM) and clean, flat functional patterns. Here's a brief example showing our code standard:

```javascript
import { execSync } from 'node:child_process';

/**
 * Extracts raw git commits from the local repository.
 * @param {string} format
 * @returns {string[]}
 */
export function getRawGitLogs(format = '%h|%an|%ad|%s') {
  try {
    const stdout = execSync(`git log --pretty=format:"${format}" --no-merges -n 500`, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore']
    });
    return stdout.trim().split('\n').filter(Boolean);
  } catch (error) {
    throw new Error('FAILED_TO_READ_GIT_LOG: Verify you are inside a git repository.', { cause: error });
  }
}
```

---

## Testing Strategy
- **Framework:** Node.js native `node:test` + `node:assert`.
- **Methodology:** Test-Driven Development (TDD). We will write failing unit tests for the parser, analyzer, and classifier before implementing them.
- **Mocking:** Since running git calls in test environments is flaky, we will write a mock-history provider that injects pre-defined git logs to test the parser and classifier deterministically.

---

## Boundaries
- **Always do:**
  - Enforce zero dependencies in `package.json` production keys.
  - Fail gracefully if the user is not in a git repository or has fewer than 5 commits.
  - Wrap HTML/CSS output in standard modern semantics and absolute 90-degree industrial grid tables (no fancy rounded borders).
  - Clean up output - no trailing console logs or unhandled rejections.
- **Ask first:**
  - Adding any external CLI dependency (like `picocolors` or `yargs`). We should attempt to do it using native Node `util.parseArgs` and basic ANSI escape sequences first to keep the bundle size tiny.
- **Never do:**
  - Write files outside the project root except the generated `vibe-profile.html` in the target directory where the user ran the command.
  - Upload code, git logs, names, or emails to any remote API. Everything stays 100% private and offline on the user's local machine.

---

## Success Criteria

### 1. Functional Metrics:
- Executing `npx git-vibe` runs instantly (under 2.5 seconds total runtime).
- Correctly parses commit times, messages, file count changes, and intervals.
- Generates a valid, standalone HTML file `git-vibe-profile.html` in the run directory.
- Exits cleanly with status code `0` on success.

### 2. Archetypes & Scoring Heuristics:
The system profiles commits and maps the user to one of 5 distinct developer archetypes:
1. **THE NOCTURNAL GREMLIN**
   - *Trigger:* >40% of commits made between 11:00 PM and 5:00 AM.
   - *Vibe:* Over-caffeinated, chaotic productivity.
2. **THE CHAOTIC FIXER**
   - *Trigger:* High frequency of rapid commits (<5 mins apart) with messages containing "fix", "please", "working", "bug", "fml", "test".
   - *Vibe:* Pure trial-and-error panic.
3. **THE GIT-PHILOSOPHY MAJOR**
   - *Trigger:* Long, descriptive commit messages (average character length > 80 chars per message).
   - *Vibe:* Treats git commits like high literature.
4. **THE REFACTORING ASSASSIN**
   - *Trigger:* Large ratio of line deletions vs additions (deletions > additions * 1.5).
   - *Vibe:* Lethal cleanups, pure elegant minimalism.
5. **THE APPRENTICE BOOTCAMPER**
   - *Trigger:* Consistent "initial commit", "added code", "first draft", repetitive file structures.
   - *Vibe:* Squeaky clean, slightly naive boilerplate.

---

## Open Questions & Risk Analysis
- **What if there are too few commits?** If the local branch has < 10 commits, the parser fails gracefully with a humorous roast: `"Not enough commits to evaluate a vibe. You code like a ghost. Commit some real code first."`
- **Shareability Solution:** When writing the HTML profile card, we can encode the summary metrics into a URL query parameter using base64 compression. This URL points to a static landing page `https://git-vibe.dev/?v=<base64_data>`. When someone visits that link, the static page reads the parameter, decodes it client-side, and renders their beautiful badge/card for sharing on Twitter/X with zero hosting costs.

---
*Created on 2026-10-04 | Impeccable Design Standards Met*
