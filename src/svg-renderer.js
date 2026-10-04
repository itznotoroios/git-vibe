/**
 * svg-renderer.js - SVG card generator for git-vibe.
 * Generates beautiful, embeddable SVG cards for READMEs and social sharing.
 * Uses Industrial Brutalist aesthetic with dynamic theming.
 */

/**
 * Generates an SVG card string for a developer profile.
 * @param {{ archetype: string, roast: string, vibeScore: string, stats: object, github?: object }} profile
 * @param {object} options
 * @param {string} options.theme - Theme name (dark, light, neon, brutal)
 * @param {string} options.width - Card width in pixels
 * @param {string} options.height - Card height in pixels
 * @returns {string} SVG markup
 */
export function renderSvgCard(profile, options = {}) {
  const {
    theme = 'brutal',
    width = 560,
    height = 280
  } = options;

  const { archetype, roast, vibeScore, stats, github } = profile;
  const { totalCommits, nightOwlRatio, author } = stats;
  const ghStats = github || {};

  // Theme definitions
  const themes = {
    brutal: {
      bg: '#F4F4F0',
      fg: '#050505',
      accent: '#E61919',
      border: '#050505',
      font: 'Anton, sans-serif',
      mono: 'JetBrains Mono, monospace'
    },
    dark: {
      bg: '#0A0A0A',
      fg: '#EAEAEA',
      accent: '#E61919',
      border: '#EAEAEA',
      font: 'Anton, sans-serif',
      mono: 'JetBrains Mono, monospace'
    },
    neon: {
      bg: '#0D0D0D',
      fg: '#00FF41',
      accent: '#FF00FF',
      border: '#00FF41',
      font: 'VT323, monospace',
      mono: 'VT323, monospace'
    },
    light: {
      bg: '#FFFFFF',
      fg: '#1A1A1A',
      accent: '#FF3B30',
      border: '#1A1A1A',
      font: 'Inter, sans-serif',
      mono: 'SF Mono, monospace'
    }
  };

  const t = themes[theme] || themes.brutal;
  const nightPct = Math.round(nightOwlRatio * 100);

  // GitHub stats if available
  const stars = ghStats.stars || '—';
  const repos = ghStats.repos || '—';
  const followers = ghStats.followers || '—';
  const contributions = ghStats.contributions || totalCommits;

  // SVG content
  const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Anton&family=JetBrains+Mono:wght@400;700&display=swap');
      .bg { fill: ${t.bg}; }
      .fg { fill: ${t.fg}; }
      .accent { fill: ${t.accent}; }
      .border { stroke: ${t.border}; stroke-width: 3; fill: none; }
      .header { font-family: ${t.font}; font-size: 14px; fill: ${t.bg}; fill-opacity: 1; }
      .title { font-family: ${t.font}; font-size: 42px; font-weight: bold; fill: ${t.fg}; letter-spacing: -1px; }
      .subtitle { font-family: ${t.mono}; font-size: 12px; fill: ${t.fg}; letter-spacing: 2px; text-transform: uppercase; }
      .stat-value { font-family: ${t.font}; font-size: 28px; font-weight: bold; fill: ${t.accent}; }
      .stat-label { font-family: ${t.mono}; font-size: 11px; fill: ${t.fg}; letter-spacing: 1px; }
      .roast { font-family: ${t.mono}; font-size: 11px; fill: ${t.fg}; }
    </style>
    <filter id="glow">
      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Background -->
  <rect class="bg" width="${width}" height="${height}" />

  <!-- Top accent bar -->
  <rect class="accent" width="${width}" height="12" />

  <!-- Border -->
  <rect class="border" x="1.5" y="1.5" width="${width - 3}" height="${height - 3}" rx="0" />

  <!-- Header badge -->
  <rect x="20" y="24" width="120" height="24" fill="${t.fg}" />
  <text x="80" y="40" text-anchor="middle" class="header">GIT-VIBE // v1.0</text>

  <!-- Author name -->
  <text x="20" y="72" class="subtitle">@${author}</text>

  <!-- Archetype (main title) -->
  <text x="20" y="120" class="title">${archetype.replace(/ /g, '\n').split('\n').map((word, i) => `<tspan x="20" dy="${i === 0 ? 0 : 45}">${word}</tspan>`).join('')}</text>

  <!-- Stats row -->
  <g transform="translate(20, ${height - 80})">
    <!-- Commits -->
    <text x="0" y="0" class="stat-value">${totalCommits}</text>
    <text x="0" y="16" class="stat-label">COMMITS</text>

    <!-- Night Owl -->
    <text x="100" y="0" class="stat-value">${nightPct}%</text>
    <text x="100" y="16" class="stat-label">NIGHT OWL</text>

    ${ghStats.stars ? `
    <!-- GitHub Stars -->
    <text x="220" y="0" class="stat-value">${stars}</text>
    <text x="220" y="16" class="stat-label">⭐ STARS</text>
    ` : ''}

    ${ghStats.followers ? `
    <!-- Followers -->
    <text x="340" y="0" class="stat-value">${followers}</text>
    <text x="340" y="16" class="stat-label">👥 FOLLOWERS</text>
    ` : ''}
  </g>

  <!-- Roast -->
  <g transform="translate(20, ${height - 50})">
    <text x="0" y="0" class="roast">"${roast.substring(0, 80)}${roast.length > 80 ? '...' : ''}"</text>
  </g>

  <!-- Theme indicator -->
  <text x="${width - 20}" y="${height - 20}" text-anchor="end" class="subtitle" fill-opacity="0.5">${theme.toUpperCase()} // TACTICAL TELEMETRY</text>
</svg>`;

  return svgContent.trim();
}

/**
 * Generates a mini SVG badge for inline embedding.
 * @param {object} stats
 * @param {string} theme
 * @returns {string} SVG markup
 */
export function renderSvgBadge(stats, theme = 'brutal') {
  const { author, totalCommits, nightOwlRatio, archetype } = stats;
  const nightPct = Math.round(nightOwlRatio * 100);

  const themes = {
    brutal: { bg: '#F4F4F0', fg: '#050505', accent: '#E61919' },
    dark: { bg: '#0A0A0A', fg: '#EAEAEA', accent: '#E61919' },
    neon: { bg: '#0D0D0D', fg: '#00FF41', accent: '#FF00FF' },
    light: { bg: '#FFFFFF', fg: '#1A1A1A', accent: '#FF3B30' }
  };

  const t = themes[theme] || themes.brutal;
  const width = 200;
  const height = 40;

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="${t.bg}" />
  <rect x="0" y="0" width="4" height="${height}" fill="${t.accent}" />
  <text x="16" y="26" font-family="JetBrains Mono, monospace" font-size="12" font-weight="bold" fill="${t.fg}">@${author} // ${archetype.split(' ').slice(0, 2).join(' ')}</text>
  <text x="${width - 70}" y="26" font-family="JetBrains Mono, monospace" font-size="11" fill="${t.fg}">${nightPct}% 🦉</text>
</svg>`;
}

/**
 * Generates markdown embed code for a profile card.
 * @param {object} profile
 * @param {object} options
 * @returns {string} Markdown code
 */
export function generateEmbedCode(profile, options = {}) {
  const { theme = 'brutal', svgUrl = null } = options;

  const svg = renderSvgCard(profile, { ...options, theme });
  const svgBlob = new Blob([svg], { type: 'image/svg+xml' });
  const url = svgUrl || URL.createObjectURL(svgBlob);

  return `![Git Vibe Profile](${url}?theme=${theme})`;
}

/**
 * Generates a full README section for a user's profile.
 * @param {object} profile
 * @param {object} options
 * @returns {string} Markdown content
 */
export function generateReadmeSection(profile, options = {}) {
  const { archetype, roast, vibeScore, stats } = profile;
  const { totalCommits, author } = stats;

  return `## 🎯 My Git Vibe

| Metric | Value |
|--------|-------|
| **Archetype** | ${archetype} |
| **Total Commits** | ${totalCommits} |
| **Vibe Score** | ${vibeScore} |

> ${roast}

---

*Profile generated by [git-vibe](https://github.com/itznotoroios/git-vibe)*`;
}