/**
 * heatmap-renderer.js - Contribution heatmap generation.
 * Creates GitHub-style contribution graphs and visualizations.
 */

/**
 * Generate a contribution heatmap grid.
 stats
 HTML/CSS heatmap
 */
export function renderHeatmap(stats) {
  const { hourDistribution, totalCommits } = stats;
  const maxCommits = Math.max(...Object.values(hourDistribution || {}), 1);

  // Generate 7 days x 24 hours grid
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let html = '<div class="heatmap-container">';
  html += '<div class="heatmap-labels">';
  
  // Day labels
  days.forEach((day, i) => {
    html += `<div class="day-label">${day}</div>`;
  });
  html += '</div>';

  // Hour rows (24 hours)
  for (let hour = 23; hour >= 0; hour--) {
    html += '<div class="heatmap-row">';
    html += `<div class="hour-label">${hour}:00</div>`;
    
    for (let day = 0; day < 7; day++) {
      const key = `${day}-${hour}`;
      const count = stats.dailyHours?.[key] || 0;
      const intensity = count / maxCommits;
      const opacity = Math.max(0.1, intensity);
      
      html += `<div class="heatmap-cell" 
        style="opacity: ${opacity}" 
        title="${days[day]} ${hour}:00 - ${count} commits"
      ></div>`;
    }
    html += '</div>';
  }
  
  html += '</div>';
  return html;
}

/**
 * Generate SVG contribution graph.
 stats
 options
 SVG markup
 */
export function renderSvgHeatmap(stats, options = {}) {
  const { totalCommits, hourDistribution } = stats;
  const { width = 420, height = 140, theme = 'dark' } = options;
  
  const maxCommits = Math.max(...Object.values(hourDistribution || {}), 1);
  const cellWidth = width / 24;
  const cellHeight = height / 7;

  // Color scales
  const colors = {
    dark: ['#0D0D0D', '#1A3A1A', '#2D5A2D', '#4A8A4A', '#6ABF6A'],
    light: ['#F4F4F0', '#D4E4D4', '#B4D4B4', '#94C494', '#74B474'],
    neon: ['#0D0D0D', '#0A2A0A', '#0F4F0F', '#1AFF1A', '#4AFF4A']
  };

  const palette = colors[theme] || colors.dark;

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`;
  svg += `<defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&amp;display=swap');
      .label { font-family: 'JetBrains Mono', monospace; font-size: 9px; fill: ${palette[4]}; }
    </style>
  </defs>`;

  // Background
  svg += `<rect width="${width}" height="${height}" fill="${palette[0]}" />`;

  // Generate cells
  for (let hour = 0; hour < 24; hour++) {
    for (let day = 0; day < 7; day++) {
      const key = `${day}-${hour}`;
      const count = stats.dailyHours?.[key] || 0;
      const intensity = count / maxCommits;
      const colorIndex = Math.min(4, Math.floor(intensity * 5));
      const x = hour * cellWidth;
      const y = day * cellHeight;

      svg += `<rect x="${x + 1}" y="${y + 1}" 
        width="${cellWidth - 2}" 
        height="${cellHeight - 2}" 
        fill="${palette[colorIndex]}" 
        rx="2" />`;
    }
  }

  // Labels
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  days.forEach((day, i) => {
    svg += `<text x="${i * cellWidth + cellWidth/2}" y="${height - 2}" 
      text-anchor="middle" class="label">${day}</text>`;
  });

  for (let hour = 0; hour < 24; hour += 6) {
    svg += `<text x="2" y="${hour * cellHeight + cellHeight/2 + 4}" 
      class="label">${hour}:00</text>`;
  }

  // Legend
  svg += `<rect x="${width - 80}" y="4" width="12" height="12" fill="${palette[0]}" />`;
  svg += `<rect x="${width - 64}" y="4" width="12" height="12" fill="${palette[1]}" />`;
  svg += `<rect x="${width - 48}" y="4" width="12" height="12" fill="${palette[2]}" />`;
  svg += `<rect x="${width - 32}" y="4" width="12" height="12" fill="${palette[3]}" />`;
  svg += `<rect x="${width - 16}" y="4" width="12" height="12" fill="${palette[4]}" />`;
  svg += `<text x="${width - 8}" y="32" text-anchor="middle" class="label">More</text>`;

  svg += '</svg>';
  return svg;
}

/**
 * Generate CSS-only heatmap bars.
 stats
 HTML
 */
export function renderBarHeatmap(stats) {
  const { hourDistribution } = stats;
  const maxCommits = Math.max(...Object.values(hourDistribution || {}), 1);
  const hours = Array.from({ length: 24 }, (_, i) => i);

  let html = '<div class="bar-heatmap">';
  
  hours.forEach(hour => {
    const count = hourDistribution[hour] || 0;
    const percentage = (count / maxCommits) * 100;
    const isPeak = hour === stats.peakHour;
    
    html += `
      <div class="bar-hour ${isPeak ? 'peak' : ''}">
        <span class="bar-label">${hour}:00</span>
        <div class="bar-track">
          <div class="bar-fill" style="height: ${percentage}%"></div>
        </div>
        <span class="bar-count">${count}</span>
      </div>`;
  });

  html += '</div>';
  return html;
}