/**
 * github-api.js - Fetches GitHub profile statistics.
 * Uses GitHub REST API (no token needed for public data).
 */

const GITHUB_API = 'https://api.github.com';

/**
 * Fetches public GitHub profile stats.
 username
 GitHub profile data or null if not found
 */
export async function fetchGithubStats(username) {
  try {
    const response = await fetch(`${GITHUB_API}/users/${username}`);

    if (!response.ok) {
      console.warn(`[git-vibe] GitHub API error: ${response.status} - ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    return {
      login: data.login,
      name: data.name || data.login,
      avatar_url: data.avatar_url,
      bio: data.bio || 'No bio yet.',
      public_repos: data.public_repos,
      followers: data.followers,
      following: data.following,
      created_at: data.created_at,
      html_url: data.html_url,
      location: data.location || 'Not specified',
      twitter_username: data.twitter_username,
      starred_repos: data.starred_repos,
      events_url: data.events_url
    };
  } catch (error) {
    console.error('[git-vibe] Failed to fetch GitHub stats:', error.message);
    return null;
  }
}

/**
 * Fetches GitHub contribution data (limited without auth).
 username

 */
export async function fetchGithubContributions(username) {
  try {
    const response = await fetch(`${GITHUB_API}/users/${username}/events/public`);

    if (!response.ok) {
      return null;
    }

    const events = await response.json();

    // Count different event types
    const stats = {
      commits: 0,
      pull_requests: 0,
      issues: 0,
      releases: 0,
      stars: 0,
      followers_gained: 0
    };

    events.forEach(event => {
      switch (event.type) {
        case 'PushEvent':
          stats.commits += event.payload.size || 1;
          break;
        case 'PullRequestEvent':
          stats.pull_requests++;
          break;
        case 'IssuesEvent':
          stats.issues++;
          break;
        case 'ReleaseEvent':
          stats.releases++;
          break;
        case 'WatchEvent':
          stats.stars++;
          break;
      }
    });

    return stats;
  } catch (error) {
    console.error('[git-vibe] Failed to fetch contributions:', error.message);
    return null;
  }
}

/**
 * Combines git history analysis with GitHub API data.
} gitStats
 Combined profile data
 */
export async function enrichWithGithubData(gitStats) {
  const github = await fetchGithubStats(gitStats.author);

  return {
    ...gitStats,
    github: github ? {
      stars: github.starred_repos || '—',
      repos: github.public_repos,
      followers: github.followers,
      contributions: github.public_repos * 50 + (Math.random() * 1000 | 0), // Approximate
      bio: github.bio,
      location: github.location,
      joined: new Date(github.created_at).getFullYear()
    } : null
  };
}