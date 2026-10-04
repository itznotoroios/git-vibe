/**
 * analyzer.js - Metric gathering and statistical profiling for git-vibe.
 * Analyzes parsed commit history to extract developer patterns.
 */

/**
 * Analyzes parsed git commits and extracts statistical metrics.
 * @param {{ hash: string, author: string, date: string, message: string }[]} commits
 * @returns {{ totalCommits: number, author: string, nightOwlRatio: number, avgMessageLength: number, rapidCommitRatio: number, deletionAdditionRatio: number }}
 */
export function analyzeCommits(commits) {
  if (!Array.isArray(commits) || commits.length === 0) {
    throw new Error('EMPTY_COMMITS: No commits provided to analyzer');
  }

  const totalCommits = commits.length;
  const author = commits[0].author;

  // Night owl ratio: commits between 11 PM and 5 AM
  let nightCommits = 0;
  commits.forEach((commit) => {
    const date = new Date(commit.date);
    const hour = date.getHours();
    if (hour >= 23 || hour < 5) {
      nightCommits++;
    }
  });
  const nightOwlRatio = nightCommits / totalCommits;

  // Average commit message length (excluding merge commits)
  const totalMessageLength = commits.reduce((sum, commit) => sum + commit.message.length, 0);
  const avgMessageLength = totalMessageLength / totalCommits;

  // Rapid commit ratio: commits made within 5 minutes of the previous one
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

  // Deletion-addition ratio: estimated from commit messages and patterns
  // In a real system, this would be parsed from `git diff --stat`
  // For heuristic purposes, we estimate based on message keywords
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

  return {
    totalCommits,
    author,
    nightOwlRatio,
    avgMessageLength,
    rapidCommitRatio,
    deletionAdditionRatio
  };
}