import { execSync } from 'node:child_process';

export function parseGitLogLine(line) {
  if (typeof line !== 'string' || line.trim() === '') {
    throw new Error('INVALID_LOG_LINE');
  }

  const parts = line.split('|');
  if (parts.length < 4) {
    throw new Error('INVALID_LOG_LINE');
  }

  const [hash, author, date, ...messageParts] = parts;
  return {
    hash: hash.trim(),
    author: author.trim(),
    date: date.trim(),
    message: messageParts.join('|').trim()
  };
}

export function processLogs(lines) {
  if (!Array.isArray(lines)) {
    throw new Error('INVALID_INPUT');
  }

  return lines
    .filter((line) => typeof line === 'string' && line.trim() !== '')
    .map((line) => parseGitLogLine(line));
}

export function getRawGitLogs(format = '%h|%an|%ad|%s', maxCount = 500) {
  const stdout = execSync(
    `git log --pretty=format:"${format}" --no-merges -n ${maxCount}`,
    { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
  );

  const lines = stdout.trim().split('\n').filter(Boolean);
  return processLogs(lines);
}
