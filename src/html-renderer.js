/**
 * html-renderer.js - Standalone Industrial Brutalist HTML card exporter.
 * Generates a high-contrast, brutalist standalone HTML profile card.
 * Uses Swiss Industrial Print aesthetic (light substrate, hazard red accents).
 */

/**
 * Generates a standalone HTML card with brutalist styling.
 * @param {{ archetype: string, roast: string, vibeScore: string, stats: object }} profile
 * @returns {string}
 */
export function renderHtmlCard(profile) {
  const { archetype, roast, vibeScore, stats } = profile;
  const { totalCommits, nightOwlRatio, author } = stats;
  const nightPct = Math.round(nightOwlRatio * 100);

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>git-vibe profile</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Anton&family=JetBrains+Mono:wght@400;700&display=swap');

  :root {
    --bg: #F4F4F0;
    --ink: #050505;
    --red: #E61919;
    --line: #050505;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background-color: var(--bg);
    color: var(--ink);
    font-family: 'JetBrains Mono', monospace;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }

  .card {
    width: 100%;
    max-width: 560px;
    border: 3px solid var(--ink);
    background-color: var(--bg);
    padding: 32px;
    position: relative;
  }

  .card::before {
    content: '';
    position: absolute;
    top: -3px;
    left: 0;
    right: 0;
    height: 12px;
    background-color: var(--red);
  }

  .header {
    font-family: 'Anton', sans-serif;
    font-size: 14px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--bg);
    background-color: var(--ink);
    display: inline-block;
    padding: 8px 16px;
    margin-bottom: 24px;
  }

  .archetype {
    font-family: 'Anton', sans-serif;
    font-size: 48px;
    line-height: 0.9;
    text-transform: uppercase;
    letter-spacing: -1px;
    color: var(--ink);
    margin-bottom: 16px;
  }

  .archetype .red {
    color: var(--red);
  }

  .vibe-score {
    font-size: 18px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 24px;
    padding: 8px 0;
    border-top: 2px solid var(--ink);
    border-bottom: 2px solid var(--ink);
  }

  .stats {
    font-size: 14px;
    line-height: 1.6;
    margin-bottom: 24px;
  }

  .stats div {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--ink);
    padding: 4px 0;
  }

  .stats span:first-child {
    text-transform: uppercase;
    font-weight: 700;
  }

  .roast {
    background-color: var(--ink);
    color: var(--bg);
    padding: 20px;
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 24px;
    border-left: 8px solid var(--red);
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 700;
  }

  .share {
    background-color: var(--red);
    color: var(--bg);
    padding: 8px 16px;
    text-decoration: none;
  }

  hr {
    border: none;
    border-top: 2px solid var(--ink);
    margin: 24px 0;
  }
</style>
</head>
<body>
  <div class="card">
    <div class="header">GIT-VIBE PROFILE // @${author}</div>
    <div class="archetype">${archetype.replace(' ', '<span class="red"> </span>')}</div>
    <div class="vibe-score">VIBE SCORE: ${vibeScore}</div>

    <hr />

    <div class="stats">
      <div><span>Total Commits</span><span>${totalCommits}</span></div>
      <div><span>Night Owl Ratio</span><span>${nightPct}%</span></div>
      <div><span>Most Used File</span><span>index.js (Danger!)</span></div>
    </div>

    <div class="roast">
      "${roast}"
    </div>

    <div class="footer">
      <span>© 2026 GIT-VIBE // TACTICAL TELEMETRY</span>
      <a class="share" href="https://twitter.com/intent/tweet?text=Check%20out%20my%20git-vibe%20profile!">Share</a>
    </div>
  </div>
</body>
</html>`;
}