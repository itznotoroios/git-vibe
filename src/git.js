/**
 * git.js - Native Git log parsing utilities for git-vibe.
 * Zero dependencies. Uses Node.js built-in child_process.
 */

import { execSync } from 'node:child_process';

/**
 * Parses a single formatted git log line.
 * Expected format: hash|author|date|message
 * @param {string} line
 * @returns {{ hash: string, author: string, date: string, message: string }}
 */
export function parseGitLogLine(line) {
  if (typeof line !== 'string' || line.trim() === '') {
    throw new Error('INVALID_LOG_LINE: Expected non-empty string');
  }

  const parts = line.split('|');
  if (parts.length < 4) {
    throw new Error('INVALID_LOG_LINE: Expected hash|author|date|message format');
  }

  const [hash, author, date, ...messageParts] = parts;
  return {
    hash: hash.trim(),
    author: author.trim(),
    date: date.trim(),
    message: messageParts.join('|').trim()
  };
}

/**
 * Processes raw git log lines, filtering out empty lines and parsing them.
 * @param {string[]} lines
 * @returns {{ hash: string, author: string, date: string, message: string }[]}
 */
export function processLogs(lines) {
  if (!Array.isArray(lines)) {
    throw new Error('INVALID_INPUT: Expected array of lines');
  }

  return lines
    .filter((line) => typeof line === 'string' && line.trim() !== '')
    .map((line) => parseGitLogLine(line));
}

/**
 * Extracts raw git commits from the local repository.
 * @param {string} format - The format string passed to `git log --pretty=format:`
 * @param {number} maxCount - Maximum number of commits to retrieve
 * @returns {{ hash: string, author: string, date: string, message: string }[]}
 */
export function getRawGitLogs(format = '%h|%an|%ad|%s', maxCount = 500) {
  const stdout = execSync(
    `git log --pretty=format:"${format}" --no-merges -n ${maxCount}`,
    { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
  );

  const lines = stdout.trim().split('\n').filter(Boolean);
  return processLogs(lines);
}