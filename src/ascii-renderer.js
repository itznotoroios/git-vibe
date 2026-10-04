/**
 * ascii-renderer.js - Terminal ASCII art card formatter.
 * Renders a high-contrast, brutalist ASCII card using ANSI escape codes.
 */

// ANSI escape codes for high-contrast terminal output
const ANSI = {
  RESET: '\x1b[0m',
  BOLD: '\x1b[1m',
  RED: '\x1b[31m',
  GREEN: '\x1b[32m',
  YELLOW: '\x1b[33m',
  CYAN: '\x1b[36m',
  WHITE: '\x1b[37m',
  BG_BLACK: '\x1b[40m',
  BG_RED: '\x1b[41m'
};

/**
 * Renders a brutalist ASCII card in the terminal.
 * @param {{ archetype: string, roast: string, vibeScore: string, stats: object }} profile
 * @returns {string}
 */
export function renderAsciiCard(profile) {
  const { archetype, roast, vibeScore, stats } = profile;
  const { totalCommits, nightOwlRatio, author } = stats;

  const border = '═';
  const corner = '╔';
  const cornerEnd = '╗';
  const bottomCorner = '╚';
  const bottomCornerEnd = '╝';

  const width = 48;
  const horizontalBorder = corner + border.repeat(width - 2) + cornerEnd;
  const bottomBorder = bottomCorner + border.repeat(width - 2) + bottomCornerEnd;

  const lines = [];

  // Header
  lines.push(`${ANSI.BOLD}${ANSI.BG_RED}${ANSI.WHITE}  GIT-VIBE CARD: @${author}  ${ANSI.RESET}`);
  lines.push(horizontalBorder);

  // Archetype
  lines.push(`${ANSI.BOLD}${ANSI.RED}  ARCHETYPE: ${ANSI.RESET}${ANSI.BOLD}${archetype}${ANSI.RESET}`);
  lines.push('');

  // Vibe Score
  lines.push(`${ANSI.YELLOW}  VIBE SCORE: ${ANSI.RESET}${vibeScore}`);
  lines.push('');

  // Stats
  const nightPct = Math.round(nightOwlRatio * 100);
  lines.push(`${ANSI.CYAN}  - Total Commits: ${ANSI.RESET}${totalCommits}`);
  lines.push(`${ANSI.CYAN}  - Night Owl Ratio: ${ANSI.RESET}${nightPct}%`);
  lines.push(`${ANSI.CYAN}  - Most Used File: ${ANSI.RESET}index.js (Danger!)`);
  lines.push('');

  // Roast
  lines.push(`${ANSI.GREEN}  "${roast}"${ANSI.RESET}`);
  lines.push('');

  // Footer
  lines.push(bottomBorder);
  lines.push(`${ANSI.YELLOW}  Share your Vibe: https://git-vibe.dev/share${ANSI.RESET}`);

  return lines.join('\n');
}

/**
 * Returns raw ASCII card without ANSI codes (for file output).
 * @param {{ archetype: string, roast: string, vibeScore: string, stats: object }} profile
 * @returns {string}
 */
export function renderPlainAsciiCard(profile) {
  const { archetype, roast, vibeScore, stats } = profile;
  const { totalCommits, nightOwlRatio, author } = stats;

  const border = '═';
  const corner = '╔';
  const cornerEnd = '╗';
  const bottomCorner = '╚';
  const bottomCornerEnd = '╝';

  const width = 48;
  const horizontalBorder = corner + border.repeat(width - 2) + cornerEnd;
  const bottomBorder = bottomCorner + border.repeat(width - 2) + bottomCornerEnd;

  const lines = [];

  lines.push(`  GIT-VIBE CARD: @${author}`);
  lines.push(horizontalBorder);
  lines.push(`  ARCHETYPE: ${archetype}`);
  lines.push('');
  lines.push(`  VIBE SCORE: ${vibeScore}`);
  lines.push('');
  lines.push(`  - Total Commits: ${totalCommits}`);
  lines.push(`  - Night Owl Ratio: ${Math.round(nightOwlRatio * 100)}%`);
  lines.push(`  - Most Used File: index.js (Danger!)`);
  lines.push('');
  lines.push(`  "${roast}"`);
  lines.push('');
  lines.push(bottomBorder);
  lines.push('  Share your Vibe: https://git-vibe.dev/share');

  return lines.join('\n');
}