/**
 * html-renderer.js - Premium Brutalist HTML Card Exporter v2.0
 * Industrial Brutalist aesthetic with high-end motion choreography
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

export function renderHtmlCard(profile, options = {}) {
  const { theme = 'auto' } = options;
  const { archetype, roast, vibeScore, emoji, stats } = profile;
  const { totalCommits, nightOwlRatio, author, peakHour, consistencyScore, messageTypes } = stats;

  const shareUrl = `https://git-vibe.dev/share#${encodeProfile(profile)}`;
  const isDark = theme === 'dark' || (typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches);

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const maxCommits = Math.max(...hours.map(h => stats.hourDistribution?.[h] || 0), 1);

  return `<!doctype html>
<html lang="en" data-theme="${isDark ? 'dark' : 'light'}">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>git-vibe // ${escapeHtml(archetype)}</title>
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
    --shell-bg: #E8E8E3;
    --inner-highlight: rgba(255,255,255,0.5);
    --noise-opacity: 0.03;
  }

  [data-theme="dark"] {
    --bg: #0A0A0A;
    --ink: #EAEAEA;
    --red: #FF2A2A;
    --green: #4AF626;
    --yellow: #FFD700;
    --border: #EAEAEA;
    --card-bg: #121212;
    --shell-bg: #1A1A1A;
    --inner-highlight: rgba(255,255,255,0.08);
    --noise-opacity: 0.05;
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
    padding: 40px 20px;
    position: relative;
    overflow-x: hidden;
  }

  /* Noise texture overlay */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    opacity: var(--noise-opacity);
    pointer-events: none;
    z-index: 100;
  }

  /* Main card with double-bezel architecture */
  .card-shell {
    width: 100%;
    max-width: 720px;
    background: var(--shell-bg);
    padding: 3px;
    position: relative;
  }

  .card {
    width: 100%;
    border: 3px solid var(--border);
    background: var(--card-bg);
    position: relative;
    overflow: hidden;
  }

  /* Top hazard bar */
  .card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 12px;
    background: repeating-linear-gradient(
      45deg,
      var(--red),
      var(--red) 10px,
      var(--ink) 10px,
      var(--ink) 20px
    );
    z-index: 10;
  }

  /* CRT scanlines */
  .card::after {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0, 0, 0, 0.04) 2px,
      rgba(0, 0, 0, 0.04) 4px
    );
    pointer-events: none;
    z-index: 5;
  }

  [data-theme="dark"] .card::after {
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(255, 255, 255, 0.02) 2px,
      rgba(255, 255, 255, 0.02) 4px
    );
  }

  /* Header with registration marks */
  .header {
    padding: 32px 32px 24px;
    border-bottom: 2px solid var(--border);
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;
  }

  .header-meta {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .registration-mark {
    font-size: 10px;
    letter-spacing: 3px;
    text-transform: uppercase;
    opacity: 0.5;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .registration-mark::before {
    content: '';
    width: 8px;
    height: 8px;
    border: 1px solid var(--ink);
    display: inline-block;
  }

  .tag {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: 700;
    color: var(--red);
  }

  .version {
    font-size: 10px;
    opacity: 0.5;
    letter-spacing: 1px;
  }

  /* Theme toggle - industrial style */
  .theme-toggle {
    background: none;
    border: 2px solid var(--border);
    color: var(--ink);
    padding: 10px 16px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 2px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
  }

  .theme-toggle:hover {
    background: var(--ink);
    color: var(--bg);
    transform: translate(-2px, -2px);
    box-shadow: 4px 4px 0 var(--border);
  }

  /* Content area */
  .content {
    padding: 40px 32px;
  }

  /* Author badge - brutalist container */
  .author-badge {
    display: inline-flex;
    align-items: center;
    gap: 16px;
    background: var(--ink);
    color: var(--bg);
    padding: 16px 24px;
    margin-bottom: 32px;
    position: relative;
    border: 2px solid var(--border);
  }

  .author-badge::before {
    content: '';
    position: absolute;
    top: -6px;
    left: -6px;
    right: 6px;
    bottom: 6px;
    border: 1px solid var(--border);
    pointer-events: none;
  }

  .author-badge .emoji {
    font-size: 32px;
    line-height: 1;
  }

  .author-badge .name {
    font-family: 'Anton', sans-serif;
    font-size: 24px;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  .author-badge .meta {
    font-size: 10px;
    opacity: 0.6;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-top: 4px;
  }

  /* Archetype title - massive scale */
  .archetype-title {
    font-family: 'Anton', sans-serif;
    font-size: clamp(48px, 12vw, 96px);
    line-height: 0.85;
    text-transform: uppercase;
    letter-spacing: -3px;
    margin-bottom: 32px;
    color: var(--ink);
    position: relative;
    padding-left: 8px;
  }

  .archetype-title::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 6px;
    background: var(--red);
  }

  .archetype-title .red {
    color: var(--red);
  }

  /* Vibe score - tactical display */
  .vibe-score {
    font-size: 18px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
    padding: 20px 0;
    border-top: 3px solid var(--border);
    border-bottom: 3px solid var(--border);
    margin-bottom: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .vibe-score .label {
    font-size: 12px;
    opacity: 0.5;
    letter-spacing: 3px;
  }

  /* Stats grid - bento layout */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2px;
    background: var(--border);
    margin-bottom: 32px;
    border: 2px solid var(--border);
  }

  .stat-item {
    background: var(--card-bg);
    padding: 24px 16px;
    text-align: center;
    position: relative;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .stat-item:hover {
    background: var(--shell-bg);
  }

  .stat-item::after {
    content: '';
    position: absolute;
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: var(--red);
    transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .stat-item:hover::after {
    width: 40px;
  }

  .stat-item .value {
    font-family: 'Anton', sans-serif;
    font-size: 48px;
    color: var(--red);
    line-height: 1;
    margin-bottom: 8px;
  }

  .stat-item .label {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 2px;
    opacity: 0.6;
  }

  /* Heatmap - tactical display */
  .heatmap {
    margin-bottom: 32px;
  }

  .heatmap-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  .heatmap-title {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 3px;
    opacity: 0.7;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .heatmap-title::before {
    content: '';
    width: 12px;
    height: 12px;
    background: var(--red);
    display: inline-block;
  }

  .heatmap-value {
    font-size: 24px;
    font-family: 'Anton', sans-serif;
    color: var(--red);
  }

  .heatmap-bars {
    display: flex;
    gap: 3px;
    height: 80px;
    align-items: flex-end;
    padding: 12px 0;
    border-top: 2px solid var(--border);
    border-bottom: 2px solid var(--border);
  }

  .heatmap-bar {
    flex: 1;
    background: var(--ink);
    min-height: 4px;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
    cursor: pointer;
  }

  .heatmap-bar:hover {
    background: var(--red);
    transform: scaleY(1.1);
  }

  .heatmap-bar:hover::after {
    content: attr(data-count);
    position: absolute;
    top: -28px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 10px;
    font-family: 'JetBrains Mono', monospace;
    white-space: nowrap;
    background: var(--ink);
    color: var(--bg);
    padding: 4px 8px;
  }

  .heatmap-labels {
    display: flex;
    justify-content: space-between;
    font-size: 9px;
    margin-top: 8px;
    opacity: 0.4;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  /* Message type breakdown - badge system */
  .type-breakdown {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 32px;
  }

  .type-badge {
    border: 2px solid var(--border);
    padding: 8px 16px;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: 700;
    position: relative;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .type-badge:hover {
    transform: translate(-2px, -2px);
    box-shadow: 4px 4px 0 var(--border);
  }

  .type-badge.fix { background: var(--red); color: var(--bg); border-color: var(--red); }
  .type-badge.feat { background: var(--green); color: var(--ink); border-color: var(--green); }
  .type-badge.refactor { background: var(--yellow); color: var(--ink); border-color: var(--yellow); }
  .type-badge.chore { background: var(--ink); color: var(--bg); }
  .type-badge.docs { background: #888; color: var(--bg); border-color: #888; }

  /* Roast - tactical readout */
  .roast {
    background: var(--ink);
    color: var(--bg);
    padding: 32px;
    font-size: 16px;
    line-height: 1.6;
    margin-bottom: 32px;
    border-left: 8px solid var(--red);
    position: relative;
    overflow: hidden;
  }

  .roast::before {
    content: '>>';
    position: absolute;
    top: 16px;
    right: 24px;
    font-size: 12px;
    opacity: 0.3;
    letter-spacing: 4px;
  }

  .roast::after {
    content: '"';
    position: absolute;
    top: -30px;
    left: 20px;
    font-family: 'Anton', sans-serif;
    font-size: 160px;
    opacity: 0.08;
    line-height: 1;
  }

  /* Typing animation */
  .roast-text {
    display: inline;
    border-right: 3px solid var(--red);
    animation: blink 0.8s step-end infinite;
    font-weight: 700;
  }

  @keyframes blink {
    50% { border-color: transparent; }
  }

  /* Actions - industrial buttons */
  .actions {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 16px 28px;
    font-family: 'Anton', sans-serif;
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 2px;
    text-decoration: none;
    border: 3px solid var(--border);
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
    overflow: hidden;
  }

  .btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: var(--ink);
    transition: left 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    z-index: 0;
  }

  .btn:hover::before {
    left: 0;
  }

  .btn span {
    position: relative;
    z-index: 1;
  }

  .btn.primary {
    background: var(--red);
    color: var(--bg);
    border-color: var(--red);
  }

  .btn.primary:hover {
    color: var(--bg);
    border-color: var(--ink);
  }

  .btn.primary::before {
    background: var(--ink);
  }

  .btn.secondary {
    background: transparent;
    color: var(--ink);
  }

  .btn.secondary:hover {
    color: var(--bg);
    border-color: var(--ink);
  }

  /* Footer - classified document style */
  .footer {
    padding: 20px 32px;
    border-top: 2px solid var(--border);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 2px;
    opacity: 0.5;
    background: var(--shell-bg);
  }

  .footer::before {
    content: 'CLASSIFIED // GIT-VIBE // v1.2';
    font-size: 9px;
    letter-spacing: 3px;
  }

  /* Registration corners */
  .corner {
    position: absolute;
    width: 20px;
    height: 20px;
    border: 2px solid var(--border);
    pointer-events: none;
  }

  .corner-tl { top: 12px; left: 12px; border-right: none; border-bottom: none; }
  .corner-tr { top: 12px; right: 12px; border-left: none; border-bottom: none; }
  .corner-bl { bottom: 12px; left: 12px; border-right: none; border-top: none; }
  .corner-br { bottom: 12px; right: 12px; border-left: none; border-top: none; }

  /* Pulse animation for stats */
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.08); }
  }

  .stat-item:hover .value {
    animation: pulse 0.4s ease;
  }

  /* Scroll reveal animation */
  @keyframes reveal {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .reveal {
    animation: reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    opacity: 0;
  }

  .reveal-delay-1 { animation-delay: 0.1s; }
  .reveal-delay-2 { animation-delay: 0.2s; }
  .reveal-delay-3 { animation-delay: 0.3s; }
  .reveal-delay-4 { animation-delay: 0.4s; }

  /* Mobile responsive */
  @media (max-width: 640px) {
    .content { padding: 24px 16px; }
    .header { padding: 24px 16px; }
    .footer { padding: 16px; }
    
    .stats-grid {
      grid-template-columns: 1fr;
    }
    
    .archetype-title {
      font-size: clamp(40px, 15vw, 64px);
      letter-spacing: -1px;
    }
    
    .actions {
      flex-direction: column;
    }
    
    .btn {
      width: 100%;
      justify-content: center;
    }
  }
</style>
</head>
<body>
  <div class="card-shell">
    <div class="card">
      <!-- Registration corners -->
      <div class="corner corner-tl"></div>
      <div class="corner corner-tr"></div>
      <div class="corner corner-bl"></div>
      <div class="corner corner-br"></div>

      <!-- Header -->
      <div class="header reveal">
        <div class="header-meta">
          <div class="registration-mark">Tactical Telemetry System</div>
          <div class="tag">GIT-VIBE // PROFILE ANALYSIS</div>
          <div class="version">BUILD 1.2.0 // LOCAL PROCESSING</div>
        </div>
        <button class="theme-toggle" id="theme-toggle">Toggle Mode</button>
      </div>

      <!-- Content -->
      <div class="content">
        <!-- Author Badge -->
        <div class="author-badge reveal reveal-delay-1">
          <span class="emoji">${escapeHtml(emoji)}</span>
          <div>
            <div class="name">@${escapeHtml(author)}</div>
            <div class="meta">Developer Profile // ${escapeHtml(archetype.split(' ')[1] || 'ANALYZED')}</div>
          </div>
        </div>

        <!-- Archetype Title -->
        <div class="archetype-title reveal reveal-delay-2">
          ${escapeHtml(archetype).replace(/[-\s]+/g, '<span class="red"> </span>')}
        </div>

        <!-- Vibe Score -->
        <div class="vibe-score reveal reveal-delay-2">
          <span>VIBE SCORE: ${escapeHtml(vibeScore)}</span>
          <span class="label">TACTICAL ASSESSMENT</span>
        </div>

        <!-- Stats Grid -->
        <div class="stats-grid reveal reveal-delay-3">
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

        <!-- Heatmap -->
        <div class="heatmap reveal reveal-delay-3">
          <div class="heatmap-header">
            <div class="heatmap-title">Activity Distribution // Peak: ${peakHour}:00</div>
            <div class="heatmap-value">${peakHour}:00</div>
          </div>
          <div class="heatmap-bars">
            ${hours.map(h => {
              const count = stats.hourDistribution?.[h] || 0;
              const opacity = count / maxCommits;
              return `<div class="heatmap-bar" style="opacity: ${opacity}; height: ${Math.max(20, opacity * 100)}%" data-hour="${h}:00" data-count="${count}" title="${h}:00 - ${count} commits"></div>`;
            }).join('')}
          </div>
          <div class="heatmap-labels">
            <span>00h</span>
            <span>06h</span>
            <span>12h</span>
            <span>18h</span>
            <span>24h</span>
          </div>
        </div>

        <!-- Message Types -->
        <div class="type-breakdown reveal reveal-delay-4">
          ${Object.entries(messageTypes || {}).map(([type, count]) =>
            count > 0 ? `<span class="type-badge ${type}">${type}: ${count}</span>` : ''
          ).filter(Boolean).join('')}
        </div>

        <!-- Roast -->
        <div class="roast reveal reveal-delay-4">
          <span class="roast-text" id="roast-text"></span>
        </div>

        <!-- Actions -->
        <div class="actions reveal reveal-delay-4">
          <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(`Just ran npx git-vibe and got: ${escapeHtml(archetype)} ${emoji}\\n\\n${escapeHtml(vibeScore)}\\n\\n${shareUrl}`)}" target="_blank" class="btn primary">
            <span>Tweet Profile</span>
          </a>
          <button class="btn secondary" id="copy-btn">
            <span>Copy Link</span>
          </button>
          <a href="./git-vibe-profile.html" download class="btn secondary">
            <span>Download</span>
          </a>
        </div>
      </div>

      <!-- Footer -->
      <div class="footer">
        <span>2026 GIT-VIBE // ZERO DEPENDENCIES</span>
        <span>BUILT WITH ⚡ AND ZERO BLOAT</span>
      </div>
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
        setTimeout(typeRoast, 25);
      } else {
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
    const toggleBtn = document.getElementById('theme-toggle');
    toggleBtn.addEventListener('click', () => {
      const html = document.documentElement;
      const current = html.getAttribute('data-theme');
      html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
      localStorage.setItem('git-vibe-theme', current === 'dark' ? 'light' : 'dark');
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('git-vibe-theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }

    // Copy share link
    document.getElementById('copy-btn').addEventListener('click', () => {
      navigator.clipboard.writeText('${shareUrl}').then(() => {
        const btn = document.getElementById('copy-btn');
        const original = btn.innerHTML;
        btn.innerHTML = '<span>COPIED!</span>';
        setTimeout(() => { btn.innerHTML = original; }, 2000);
      });
    });

    // Scroll reveal animation
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
      el.style.animationPlayState = 'paused';
      revealObserver.observe(el);
    });

    // Check for shared profile in URL
    const hash = window.location.hash;
    if (hash.startsWith('#')) {
      try {
        const encoded = hash.slice(1);
        const decoded = JSON.parse(decodeURIComponent(escape(atob(encoded))));
        console.log('Shared profile:', decoded);
      } catch (e) {
        console.error('Invalid share URL');
      }
    }
  </script>
</body>
</html>`;
}
