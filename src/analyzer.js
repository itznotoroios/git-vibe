/**
 * analyzer.js - Metric gathering and statistical profiling for git-vibe.
 * Analyzes parsed commit history to extract developer patterns.
 */

/**
 * Analyzes parsed git commits and extracts statistical metrics.
 * @param {{ hash: string, author: string, date: string, message: string }[]} commits
 * @returns {{ totalCommits: number, author: string, nightOwlRatio: number, avgMessageLength: number, rapidCommitRatio: number, deletionAdditionRatio: number, peakHour: number, mostCommonType: string, weekendRatio: number, consistencyScore: number, messageTypes: object }}
 */
export function analyzeCommits(commits) {
  if (!Array.isArray(commits) || commits.length === 0) {
    throw new Error('EMPTY_COMMITS: No commits provided to analyzer');
  }

  const totalCommits = commits.length;
  const author = commits[0].author;

  // Night owl ratio: commits between 11 PM and 5 AM
  let nightCommits = 0;
  let dayCommits = 0;
  const hourDistribution = {};

  commits.forEach((commit) => {
    const date = new Date(commit.date);
    const hour = date.getHours();
    const day = date.getDay();

    // Track hour distribution
    hourDistribution[hour] = (hourDistribution[hour] || 0) + 1;

    if (hour >= 23 || hour < 5) {
      nightCommits++;
    } else {
      dayCommits++;
    }

    // Track weekend commits (Saturday=6, Sunday=0)
    if (day === 0 || day === 6) {
      dayCommits; // Will be used for weekend ratio
    }
  });

  const nightOwlRatio = nightCommits / totalCommits;

  // Peak hour (most active hour)
  let peakHour = 0;
  let maxCommitsInHour = 0;
  Object.entries(hourDistribution).forEach(([hour, count]) => {
    if (count > maxCommitsInHour) {
      maxCommitsInHour = count;
      peakHour = parseInt(hour, 10);
    }
  });

  // Most common commit type
  const messageTypes = { fix: 0, feat: 0, refactor: 0, chore: 0, docs: 0, other: 0 };
  commits.forEach((commit) => {
    const msg = commit.message.toLowerCase();
    if (msg.startsWith('fix') || msg.includes('bug')) messageTypes.fix++;
    else if (msg.startsWith('feat') || msg.includes('feature')) messageTypes.feat++;
    else if (msg.startsWith('refactor') || msg.includes('cleanup')) messageTypes.refactor++;
    else if (msg.startsWith('chore') || msg.includes('config')) messageTypes.chore++;
    else if (msg.startsWith('docs') || msg.includes('readme')) messageTypes.docs++;
    else messageTypes.other++;
  });

  const mostCommonType = Object.entries(messageTypes).reduce((a, b) =>
    b[1] > a[1] ? b : a
  )[0];

  // Average commit message length
  const totalMessageLength = commits.reduce((sum, commit) => sum + commit.message.length, 0);
  const avgMessageLength = totalMessageLength / totalCommits;

  // Rapid commit ratio
  let rapidCommits = 0;
  const sortedCommits = [...commits].sort((a, b) => new Date(a.date) - new Date(b.date));
  for (let i = 1; i < sortedCommits.length; i++) {
    const prevTime = new Date(sortedCommits[i - 1].date).getTime();
    const currTime = new Date(sortedCommits[i].date).getTime();
    const diffMinutes = (currTime - prevTime) / (1000 * 60);
    if (diffMinutes <= 5) {
      rapidCommits++;
    }
  }
  const rapidCommitRatio = rapidCommits / Math.max(1, totalCommits - 1);

  // Deletion-addition ratio
  let deletionAdditionRatio = 1.0;
  commits.forEach((commit) => {
    const msg = commit.message.toLowerCase();
    if (msg.includes('refactor') || msg.includes('cleanup') || msg.includes('simplify')) {
      deletionAdditionRatio += 0.3;
    }
    if (msg.includes('initial') || msg.includes('setup') || msg.includes('first')) {
      deletionAdditionRatio -= 0.2;
    }
  });
  deletionAdditionRatio = Math.max(0.1, Math.min(3.0, deletionAdditionRatio));

  // Weekend ratio
  let weekendCommits = 0;
  commits.forEach((commit) => {
    const date = new Date(commit.date);
    const day = date.getDay();
    if (day === 0 || day === 6) {
      weekendCommits++;
    }
  });
  const weekendRatio = weekendCommits / totalCommits;

  // Consistency score (based on standard deviation of commits per day)
  const dailyCounts = {};
  commits.forEach((commit) => {
    const date = new Date(commit.date);
    const dayKey = date.toISOString().split('T')[0];
    dailyCounts[dayKey] = (dailyCounts[dayKey] || 0) + 1;
  });

  const counts = Object.values(dailyCounts);
  const mean = counts.reduce((a, b) => a + b, 0) / counts.length;
  const variance = counts.reduce((sum, count) => sum + Math.pow(count - mean, 2), 0) / counts.length;
  const stdDev = Math.sqrt(variance);
  const consistencyScore = Math.max(0, Math.min(100, 100 - (stdDev / mean) * 50));

  return {
    totalCommits,
    author,
    nightOwlRatio,
    avgMessageLength,
    rapidCommitRatio,
    deletionAdditionRatio,
    peakHour,
    mostCommonType,
    weekendRatio,
    consistencyScore,
    messageTypes,
    hourDistribution,
    generatedAt: new Date().toISOString()
  };
}