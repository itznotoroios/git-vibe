const ANSI = {
  RESET: '\x1b[0m',
  BOLD: '\x1b[1m',
  RED: '\x1b[31m',
  GREEN: '\x1b[32m',
  YELLOW: '\x1b[33m',
  CYAN: '\x1b[36m',
  WHITE: '\x1b[37m',
  BG_BLACK: '\x1b[40m',
  BG_RED: '\x1b[41m',
  BG_GREEN: '\x1b[42m',
  BG_YELLOW: '\x1b[43m'
};

function heatBar(value, color) {
  const filled = Math.round(value / 5);
  const empty = 20 - filled;
  return color + '█'.repeat(filled) + ANSI.RESET + '░'.repeat(empty);
}

export function renderAsciiCard(profile) {
  const { archetype, roast, vibeScore, stats, subMetrics } = profile;
  const { totalCommits, nightOwlRatio, author, peakHour, messageTypes } = stats;

  const border = '═';
  const corner = '╔';
  const cornerEnd = '╗';
  const bottomCorner = '╚';
  const bottomCornerEnd = '╝';
  const midBorder = '├' + '─'.repeat(42) + '┤';

  const width = 48;
  const horizontalBorder = corner + border.repeat(width - 2) + cornerEnd;
  const bottomBorder = bottomCorner + border.repeat(width - 2) + bottomCornerEnd;

  const lines = [];

  lines.push(`${ANSI.BOLD}${ANSI.BG_RED}${ANSI.WHITE}  GIT-VIBE CARD: @${author} ${profile.emoji || '📊'}  ${ANSI.RESET}`);
  lines.push(horizontalBorder);

  lines.push(`${ANSI.BOLD}${ANSI.RED}  ARCHETYPE:${ANSI.RESET} ${ANSI.BOLD}${archetype}${ANSI.RESET}`);
  lines.push('');

  lines.push(`${ANSI.YELLOW}  VIBE SCORE: ${ANSI.RESET}${vibeScore}`);
  lines.push(midBorder);

  const nightPct = Math.round(nightOwlRatio * 100);
  const consistencyPct = Math.round(subMetrics?.consistencyScore || 50);

  lines.push(`${ANSI.CYAN}  ${ANSI.RESET} Total Commits:   ${ANSI.BOLD}${totalCommits}${ANSI.RESET}`);
  lines.push(`${ANSI.CYAN}  ${ANSI.RESET} Night Owl:       ${heatBar(nightPct, ANSI.RED)} ${nightPct}%`);
  lines.push(`${ANSI.CYAN}  ${ANSI.RESET} Peak Hour:       ${ANSI.BOLD}${peakHour}:00${ANSI.RESET}`);
  lines.push(`${ANSI.CYAN}  ${ANSI.RESET} Consistency:     ${heatBar(consistencyPct, ANSI.GREEN)} ${consistencyPct}%`);
  lines.push('');

  if (messageTypes) {
    lines.push(`${ANSI.YELLOW}  MESSAGE TYPES:${ANSI.RESET}`);
    Object.entries(messageTypes).forEach(([type, count]) => {
      if (count > 0) {
        const pct = Math.round((count / totalCommits) * 100);
        const color = type === 'fix' ? ANSI.RED :
                      type === 'feat' ? ANSI.GREEN :
                      type === 'refactor' ? ANSI.YELLOW : ANSI.WHITE;
        lines.push(`${color}    ${type.padEnd(10)}${ANSI.RESET} ${heatBar(pct, color)} ${pct}%`);
      }
    });
    lines.push('');
  }

  lines.push(`${ANSI.GREEN}  "${roast}"${ANSI.RESET}`);
  lines.push('');

  if (subMetrics?.commitSuggestions?.length) {
    lines.push(`${ANSI.CYAN}  SUGGESTED COMMITS:${ANSI.RESET}`);
    subMetrics.commitSuggestions.slice(0, 3).forEach((msg, i) => {
      lines.push(`${ANSI.WHITE}    ${i + 1}. ${msg}${ANSI.RESET}`);
    });
    lines.push('');
  }

  lines.push(bottomBorder);
  lines.push(`${ANSI.YELLOW}  Share your Vibe: https://git-vibe.dev/share${ANSI.RESET}`);

  return lines.join('\n');
}

export function renderPlainAsciiCard(profile) {
  const { archetype, roast, vibeScore, stats } = profile;
  const { totalCommits, nightOwlRatio, author, peakHour } = stats;

  const border = '═';
  const corner = '╔';
  const cornerEnd = '╗';
  const bottomCorner = '╚';
  const bottomCornerEnd = '╝';

  const width = 48;
  const horizontalBorder = corner + border.repeat(width - 2) + cornerEnd;
  const bottomBorder = bottomCorner + border.repeat(width - 2) + bottomCornerEnd;

  const lines = [];

  lines.push(`  GIT-VIBE CARD: @${author} ${profile.emoji || '📊'}`);
  lines.push(horizontalBorder);
  lines.push(`  ARCHETYPE: ${archetype}`);
  lines.push('');
  lines.push(`  VIBE SCORE: ${vibeScore}`);
  lines.push('─'.repeat(46));
  lines.push(`  Total Commits: ${totalCommits}`);
  lines.push(`  Night Owl: ${Math.round(nightOwlRatio * 100)}%`);
  lines.push(`  Peak Hour: ${peakHour}:00`);
  lines.push('');
  lines.push(`  "${roast}"`);
  lines.push('');
  lines.push(bottomBorder);
  lines.push('  Share your Vibe: https://git-vibe.dev/share');

  return lines.join('\n');
}
