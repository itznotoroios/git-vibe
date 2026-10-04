/**
 * html-renderer.js - Standalone Brutalist HTML card exporter.
 * Features: animated roast, heatmap, shareable URLs, dark/light mode.
 */

function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Encodes profile data as base64 for URL sharing.
 profile

 */
function encodeProfile(profile) {
  try {
    const data = JSON.stringify({
      archetype: profile.archetype,
      roast: profile.roast,
      vibeScore: profile.vibeScore,
      emoji: profile.emoji,
      totalCommits: profile.stats.totalCommits,
      nightOwlRatio: profile.stats.nightOwlRatio,
      peakHour: profile.stats.peakHour
    });
    return btoa(unescape(encodeURIComponent(data)));
  } catch (e) {
    return '';
  }
}

/**
 * Generates an HTML card with animations and share features.
 profile
 options

 */
export function renderHtmlCard(profile, options = {}) {
  const { theme = 'auto' } = options;
  const { archetype, roast, vibeScore, emoji, stats } = profile;
  const { totalCommits, nightOwlRatio, author, peakHour, consistencyScore, messageTypes } = stats;

  const shareUrl = `https://git-vibe.dev/share#${encodeProfile(profile)}`;
  const isDark = theme === 'dark' || (typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches);

  // Generate hour heatmap data
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const maxCommits = Math.max(...hours.map(h => stats.hourDistribution?.[h] || 0), 1);

  return `<!doctype html>
<html lang="en" data-theme="${isDark ? 'dark' : 'light'}">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>git-vibe // ${archetype}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Anton&family=JetBrains+Mono:wght@400;700&display=swap');

  :root {
    --bg: #F4F4F0;
    --ink: #050505;
    --red: #E61919;
    --green: #4AF626;
    --yellow: #FFD700;
    --border: #050505;
    --card-bg: #F4F4F0;
  }

  [data-theme="dark"] {
    --bg: #0A0A0A;
    --ink: #EAEAEA;
    --red: #FF2A2A;
    --green: #4AF626;
    --yellow: #FFD700;
    --border: #EAEAEA;
    --card-bg: #121212;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: var(--bg);
    color: var(--ink);
    font-family: 'JetBrains Mono', monospace;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    transition: background 0.3s, color 0.3s;
  }

  .container {
    width: 100%;
    max-width: 640px;
    border: 3px solid var(--border);
    background: var(--card-bg);
    position: relative;
  }

  /* Top accent bar */
  .container::before {
    content: '';
    position: absolute;
    top: -3px;
    left: 0;
    right: 0;
    height: 16px;
    background: var(--red);
  }

  /* Header */
  .header {
    padding: 24px;
    border-bottom: 2px solid var(--border);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .tag {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 2px;
    opacity: 0.6;
  }

  .theme-toggle {
    background: none;
    border: 2px solid var(--border);
    color: var(--ink);
    padding: 8px 12px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s;
  }

  .theme-toggle:hover {
    background: var(--ink);
    color: var(--bg);
  }

  /* Main content */
  .content {
    padding: 32px;
  }

  /* Author badge */
  .author-badge {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    background: var(--ink);
    color: var(--bg);
    padding: 12px 20px;
    margin-bottom: 24px;
  }

  .author-badge .emoji {
    font-size: 28px;
  }

  .author-badge .name {
    font-family: 'Anton', sans-serif;
    font-size: 20px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  /* Archetype title */
  .archetype-title {
    font-family: 'Anton', sans-serif;
    font-size: clamp(36px, 8vw, 64px);
    line-height: 0.9;
    text-transform: uppercase;
    letter-spacing: -2px;
    margin-bottom: 24px;
    color: var(--ink);
  }

  .archetype-title .red {
    color: var(--red);
  }

  /* Vibe score */
  .vibe-score {
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 16px 0;
    border-top: 2px solid var(--border);
    border-bottom: 2px solid var(--border);
    margin-bottom: 24px;
  }

  /* Stats grid */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-bottom: 24px;
  }

  .stat-item {
    border: 2px solid var(--border);
    padding: 16px;
    text-align: center;
  }

  .stat-item .value {
    font-family: 'Anton', sans-serif;
    font-size: 32px;
    color: var(--red);
    line-height: 1;
  }

  .stat-item .label {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-top: 8px;
    opacity: 0.7;
  }

  /* Hour heatmap */
  .heatmap {
    margin-bottom: 24px;
  }

  .heatmap-title {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 12px;
    opacity: 0.7;
  }

  .heatmap-bars {
    display: flex;
    gap: 2px;
    height: 60px;
    align-items: flex-end;
  }

  .heatmap-bar {
    flex: 1;
    background: var(--ink);
    opacity: ${(stats.hourDistribution || {})[0] || 0}%;
    min-height: 2px;
    transition: opacity 0.3s;
  }

  .heatmap-bar:hover {
    opacity: 1;
  }

  .heatmap-labels {
    display: flex;
    justify-content: space-between;
    font-size: 9px;
    margin-top: 4px;
    opacity: 0.5;
    text-transform: uppercase;
  }

  /* Roast */
  .roast {
    background: var(--ink);
    color: var(--bg);
    padding: 24px;
    font-size: 14px;
    line-height: 1.6;
    margin-bottom: 24px;
    border-left: 6px solid var(--red);
    position: relative;
    overflow: hidden;
  }

  .roast::before {
    content: '"';
    position: absolute;
    top: -20px;
    left: 10px;
    font-family: 'Anton', sans-serif;
    font-size: 120px;
    opacity: 0.1;
    line-height: 1;
  }

  /* Typing animation */
  .roast-text {
    display: inline;
    border-right: 2px solid var(--red);
    animation: blink 0.7s step-end infinite;
  }

  @keyframes blink {
    50% { border-color: transparent; }
  }

  /* Message type breakdown */
  .type-breakdown {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 24px;
  }

  .type-badge {
    border: 1px solid var(--border);
    padding: 6px 12px;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .type-badge.fix { background: var(--red); color: var(--bg); }
  .type-badge.feat { background: var(--green); color: var(--ink); }
  .type-badge.refactor { background: var(--yellow); color: var(--ink); }
  .type-badge.chore { background: var(--ink); color: var(--bg); }
  .type-badge.docs { background: #888; color: var(--bg); }

  /* Action buttons */
  .actions {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 20px;
    font-family: 'Anton', sans-serif;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-decoration: none;
    border: 2px solid var(--border);
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn.primary {
    background: var(--red);
    color: var(--bg);
    border-color: var(--red);
  }

  .btn.primary:hover {
    background: var(--ink);
    border-color: var(--ink);
  }

  .btn.secondary {
    background: transparent;
    color: var(--ink);
  }

  .btn.secondary:hover {
    background: var(--ink);
    color: var(--bg);
  }

  /* Footer */
  .footer {
    padding: 16px 24px;
    border-top: 2px solid var(--border);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
    opacity: 0.6;
  }

  /* Scanline effect */
  .container::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0, 0, 0, 0.03) 2px,
      rgba(0, 0, 0, 0.03) 4px
    );
    pointer-events: none;
  }

  /* Pulse animation for stats */
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }

  .stat-item:hover .value {
    animation: pulse 0.5s ease;
  }

  @media (max-width: 480px) {
    .stats-grid { grid-template-columns: 1fr; }
    .actions { flex-direction: column; }
    .btn { width: 100%; justify-content: center; }
  }
</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="tag">// TACTICAL TELEMETRY // v1.1</div>
      <button class="theme-toggle" onclick="toggleTheme()">🌓 Toggle Theme</button>
    </div>

    <div class="content">
      <div class="author-badge">
        <span class="emoji">${escapeHtml(emoji)}</span>
        <span class="name">@${escapeHtml(author)} // GIT-VIBE</span>
      </div>

      <div class="archetype-title">
        ${escapeHtml(archetype).replace(/[-\s]+/g, '<span class="red"> </span>')}
      </div>

      <div class="vibe-score">
        VIBE SCORE: ${escapeHtml(vibeScore)}
      </div>

      <div class="stats-grid">
        <div class="stat-item">
          <div class="value">${totalCommits}</div>
          <div class="label">Total Commits</div>
        </div>
        <div class="stat-item">
          <div class="value">${Math.round(nightOwlRatio * 100)}%</div>
          <div class="label">Night Owl</div>
        </div>
        <div class="stat-item">
          <div class="value">${Math.round(consistencyScore)}%</div>
          <div class="label">Consistency</div>
        </div>
      </div>

      <div class="heatmap">
        <div class="heatmap-title">📊 Peak Activity Hour: ${peakHour}:00</div>
        <div class="heatmap-bars">
          ${hours.map(h => `<div class="heatmap-bar" style="opacity: ${((stats.hourDistribution || {})[h] || 0) / maxCommits}" title="${h}:00 - ${(stats.hourDistribution || {})[h] || 0} commits"></div>`).join('')}
        </div>
        <div class="heatmap-labels">
          <span>0h</span>
          <span>6h</span>
          <span>12h</span>
          <span>18h</span>
          <span>24h</span>
        </div>
      </div>

      <div class="type-breakdown">
        ${Object.entries(messageTypes || {}).map(([type, count]) =>
          count > 0 ? `<span class="type-badge ${type}">${type}: ${count}</span>` : ''
        ).filter(Boolean).join('')}
      </div>

      <div class="roast">
        <span class="roast-text" id="roast-text"></span>
      </div>

      <div class="actions">
        <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(`Just ran npx git-vibe and got: ${archetype} ${emoji}\\n\\n${vibeScore}\\n\\n${shareUrl}`)}" target="_blank" class="btn primary">
          🐦 Tweet My Vibe
        </a>
        <button class="btn secondary" id="copy-btn">
          📋 Copy Link
        </button>
        <a href="./git-vibe-profile.html" download class="btn secondary">
          ⬇️ Download Card
        </a>
      </div>
    </div>

    <div class="footer">
      <span>© 2026 GIT-VIBE // ZERO DEPENDENCIES</span>
      <span>BUILT WITH ⚡ AND HATRED FOR BLOAT</span>
    </div>
  </div>

  <script>
    // Typing animation for roast
    const roastText = document.getElementById('roast-text');
    const roastMessage = ${JSON.stringify(roast)};
    let charIndex = 0;

    function typeRoast() {
      if (charIndex < roastMessage.length) {
        roastText.textContent += roastMessage[charIndex];
        charIndex++;
        setTimeout(typeRoast, 30);
      } else {
        // Remove blinking cursor after typing
        roastText.style.borderRight = 'none';
      }
    }

    // Start typing when visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          typeRoast();
          observer.disconnect();
        }
      });
    });
    observer.observe(document.querySelector('.roast'));

    // Theme toggle
    function toggleTheme() {
      const html = document.documentElement;
      const current = html.getAttribute('data-theme');
      html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
      localStorage.setItem('git-vibe-theme', current === 'dark' ? 'light' : 'dark');
    }

    // Load saved theme
    const savedTheme = localStorage.getItem('git-vibe-theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }

    // Copy share link
    document.getElementById('copy-btn').addEventListener('click', () => {
      navigator.clipboard.writeText('${shareUrl}').then(() => {
        alert('Link copied to clipboard!');
      });
    });

    // Check for shared profile in URL
    const hash = window.location.hash;
    if (hash.startsWith('#')) {
      try {
        const encoded = hash.slice(1);
        const decoded = JSON.parse(decodeURIComponent(escape(atob(encoded))));
        // Could redirect or show shared profile here
        console.log('Shared profile:', decoded);
      } catch (e) {
        console.error('Invalid share URL');
      }
    }
  </script>
</body>
</html>`;
}