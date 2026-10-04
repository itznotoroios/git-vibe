/**
 * comparison.js - Developer comparison engine.
 * Compare your git vibe against others.
 */

/**
 * Calculate similarity score between two profiles.
 * @param {object} profileA
 * @param {object} profileB
 * @returns {number} Similarity percentage
 */
export function calculateSimilarity(profileA, profileB) {
  const scoreA = {
    nightOwl: profileA.stats.nightOwlRatio,
    rapidCommit: profileA.stats.rapidCommitRatio,
    messageLength: Math.min(profileA.stats.avgMessageLength / 100, 1),
    peakHour: profileA.stats.peakHour / 23,
    consistency: profileA.stats.consistencyScore / 100
  };

  const scoreB = {
    nightOwl: profileB.stats.nightOwlRatio,
    rapidCommit: profileB.stats.rapidCommitRatio,
    messageLength: Math.min(profileB.stats.avgMessageLength / 100, 1),
    peakHour: profileB.stats.peakHour / 23,
    consistency: profileB.stats.consistencyScore / 100
  };

  // Calculate Euclidean distance
  const distance = Math.sqrt(
    Math.pow(scoreA.nightOwl - scoreB.nightOwl, 2) +
    Math.pow(scoreA.rapidCommit - scoreB.rapidCommit, 2) +
    Math.pow(scoreA.messageLength - scoreB.messageLength, 2) +
    Math.pow(scoreA.peakHour - scoreB.peakHour, 2) +
    Math.pow(scoreA.consistency - scoreB.consistency, 2)
  );

  // Convert to similarity (0-100)
  const maxDistance = Math.sqrt(5); // Maximum possible distance
  return Math.round((1 - distance / maxDistance) * 100);
}

/**
 * Generate comparison report.
 * @param {object} profileA
 * @param {object} profileB
 * @returns {object} Comparison data
 */
export function generateComparison(profileA, profileB) {
  const similarity = calculateSimilarity(profileA, profileB);
  
  // Determine relationship
  let relationship;
  if (similarity >= 80) {
    relationship = 'Code Twins 👯';
  } else if (similarity >= 60) {
    relationship = 'Similar Vibes 🤝';
  } else if (similarity >= 40) {
    relationship = 'Different Worlds 🌍';
  } else {
    relationship = 'Opposites Attract 💔';
  }

  // Find differences
  const diffs = [];
  if (profileA.stats.nightOwlRatio > profileB.stats.nightOwlRatio + 0.2) {
    diffs.push(`${profileA.stats.author} is more of a night owl`);
  } else if (profileB.stats.nightOwlRatio > profileA.stats.nightOwlRatio + 0.2) {
    diffs.push(`${profileB.stats.author} is more of a night owl`);
  }

  if (profileA.stats.peakHour < profileB.stats.peakHour - 3) {
    diffs.push(`${profileA.stats.author} codes earlier`);
  } else if (profileB.stats.peakHour < profileA.stats.peakHour - 3) {
    diffs.push(`${profileB.stats.author} codes earlier`);
  }

  return {
    similarity,
    relationship,
    diffs,
    profileA: {
      author: profileA.stats.author,
      archetype: profileA.archetype,
      emoji: profileA.emoji,
      vibeScore: profileA.vibeScore
    },
    profileB: {
      author: profileB.stats.author,
      archetype: profileB.archetype,
      emoji: profileB.emoji,
      vibeScore: profileB.vibeScore
    }
  };
}

/**
 * Render comparison as HTML.
 * @param {object} comparison
 * @returns {string} HTML string
 */
export function renderComparisonHtml(comparison) {
  const { similarity, relationship, diffs, profileA, profileB } = comparison;

  return `
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Git Vibe Comparison</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Anton&family=JetBrains+Mono:wght@400;700&display=swap');
  
  :root {
    --bg: #0A0A0A;
    --ink: #EAEAEA;
    --red: #E61919;
    --green: #4AF626;
    --yellow: #FFD700;
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
  }

  .container {
    max-width: 700px;
    width: 100%;
    border: 3px solid var(--ink);
    padding: 32px;
    position: relative;
  }

  .container::before {
    content: '';
    position: absolute;
    top: -3px;
    left: 0;
    right: 0;
    height: 16px;
    background: var(--red);
  }

  h1 {
    font-family: 'Anton', sans-serif;
    font-size: 36px;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 24px;
    text-align: center;
  }

  .vs-badge {
    text-align: center;
    font-family: 'Anton', sans-serif;
    font-size: 48px;
    color: var(--red);
    margin: 20px 0;
  }

  .profiles {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 20px;
    align-items: center;
    margin-bottom: 32px;
  }

  .profile-card {
    border: 2px solid var(--ink);
    padding: 20px;
    text-align: center;
  }

  .profile-card .emoji {
    font-size: 48px;
    margin-bottom: 12px;
  }

  .profile-card .name {
    font-family: 'Anton', sans-serif;
    font-size: 24px;
    text-transform: uppercase;
  }

  .profile-card .archetype {
    font-size: 12px;
    opacity: 0.7;
    margin-top: 8px;
  }

  .similarity-meter {
    text-align: center;
    margin: 32px 0;
  }

  .similarity-meter .label {
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 12px;
  }

  .similarity-meter .value {
    font-family: 'Anton', sans-serif;
    font-size: 72px;
    color: var(--yellow);
  }

  .relationship {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: var(--green);
    margin-bottom: 24px;
  }

  .diffs {
    border-top: 2px solid var(--ink);
    padding-top: 20px;
  }

  .diffs h3 {
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 12px;
  }

  .diffs ul {
    list-style: none;
  }

  .diffs li {
    padding: 8px 0;
    border-bottom: 1px solid rgba(234, 234, 234, 0.1);
    font-size: 13px;
  }

  .diffs li:last-child {
    border-bottom: none;
  }

  @media (max-width: 600px) {
    .profiles {
      grid-template-columns: 1fr;
    }
    .vs-badge {
      transform: rotate(90deg);
    }
  }
</style>
</head>
<body>
  <div class="container">
    <h1>Git Vibe Comparison</h1>
    
    <div class="profiles">
      <div class="profile-card">
        <div class="emoji">${profileA.emoji}</div>
        <div class="name">@${profileA.author}</div>
        <div class="archetype">${profileA.archetype}</div>
      </div>
      
      <div class="vs-badge">VS</div>
      
      <div class="profile-card">
        <div class="emoji">${profileB.emoji}</div>
        <div class="name">@${profileB.author}</div>
        <div class="archetype">${profileB.archetype}</div>
      </div>
    </div>

    <div class="similarity-meter">
      <div class="label">Similarity Score</div>
      <div class="value">${similarity}%</div>
    </div>

    <div class="relationship">${relationship}</div>

    ${diffs.length > 0 ? `
    <div class="diffs">
      <h3>Key Differences</h3>
      <ul>
        ${diffs.map(d => `<li>• ${d}</li>`).join('')}
      </ul>
    </div>
    ` : ''}
  </div>
</body>
</html>`;
}