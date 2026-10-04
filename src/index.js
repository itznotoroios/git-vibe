/**
 * index.js - Main controller orchestration for git-vibe.
 * Orchestrates git log parsing, analysis, classification, and rendering.
 */

import { getRawGitLogs } from './git.js';
import { analyzeCommits } from './analyzer.js';
import { classifyVibe } from './classifier.js';
import { renderAsciiCard, renderPlainAsciiCard } from './ascii-renderer.js';
import { renderHtmlCard } from './html-renderer.js';
import { writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Runs the full git-vibe pipeline.
 * @param {object} options
 * @param {boolean} options.mock - Use mock commit data instead of real git logs
 * @param {string} options.outputDir - Directory to write the HTML card to
 * @returns {{ profile: object, ascii: string, html: string }}
 */
export async function runVibe({ mock = false, outputDir = process.cwd() } = {}) {
  let commits;

  if (mock) {
    // Mock data for testing without a real git repo
    commits = [
      { hash: 'a1', author: 'rihan', date: 'Sun Oct 4 23:30:00 2026 +0530', message: 'fix: login issue' },
      { hash: 'b2', author: 'rihan', date: 'Mon Oct 5 02:30:00 2026 +0530', message: 'fix' },
      { hash: 'c3', author: 'rihan', date: 'Mon Oct 5 10:00:00 2026 +0530', message: 'feat: new component' },
      { hash: 'd4', author: 'rihan', date: 'Mon Oct 5 12:00:00 2026 +0530', message: 'refactor: simplify auth module' },
      { hash: 'e5', author: 'rihan', date: 'Mon Oct 5 14:00:00 2026 +0530', message: 'cleanup' },
      { hash: 'f6', author: 'rihan', date: 'Tue Oct 6 23:45:00 2026 +0530', message: 'fix: please work' },
      { hash: 'g7', author: 'rihan', date: 'Wed Oct 7 01:15:00 2026 +0530', message: 'fml' },
      { hash: 'h8', author: 'rihan', date: 'Wed Oct 7 09:00:00 2026 +0530', message: 'feat: dashboard v2' },
      { hash: 'i9', author: 'rihan', date: 'Wed Oct 7 11:00:00 2026 +0530', message: 'refactor: cleanup imports' },
      { hash: 'j10', author: 'rihan', date: 'Thu Oct 8 23:00:00 2026 +0530', message: 'fix: bug' }
    ];
  } else {
    commits = getRawGitLogs();
  }

  if (commits.length < 5) {
    throw new Error(`INSUFFICIENT_COMMITS: Only found ${commits.length} commits. Need at least 5 to analyze a vibe.`);
  }

  const stats = analyzeCommits(commits);
  const profile = classifyVibe(stats);
  profile.stats = stats;

  const ascii = renderAsciiCard(profile);
  const html = renderHtmlCard(profile);

  // Write standalone HTML card
  const htmlPath = resolve(outputDir, 'git-vibe-profile.html');
  writeFileSync(htmlPath, html, 'utf8');

  return { profile, ascii, html, htmlPath };
}