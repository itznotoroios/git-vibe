/**
 * index.js - Main controller orchestration for git-vibe.
 * Orchestrates git log parsing, analysis, classification, and rendering.
 */

import { getRawGitLogs } from './git.js';
import { analyzeCommits } from './analyzer.js';
import { classifyVibe } from './classifier.js';
import { renderAsciiCard, renderPlainAsciiCard } from './ascii-renderer.js';
import { renderHtmlCard } from './html-renderer.js';
import { exportProfile } from './output-formatters.js';
import { generateEnhancedRoast, suggestCommitMessages, shouldUseLLM } from './llm-roaster.js';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * Runs the full git-vibe pipeline.
 * @param {object} options
 * @param {boolean} options.mock - Use mock commit data instead of real git logs
 * @param {string} options.outputDir - Directory to write output files to
 * @param {string} options.format - Output format: ascii, html, json, md, svg, table, all
 * @param {boolean} options.enhanced - Use LLM for enhanced roasts
 * @returns {{ profile: object, outputs: object }}
 */
export async function runVibe({ 
  mock = false, 
  outputDir = process.cwd(),
  format = 'all',
  enhanced = false
} = {}) {
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

  // Analyze commits
  const stats = analyzeCommits(commits);
  
  // Classify archetype
  let profile = classifyVibe(stats);
  profile.stats = stats;

  // Generate commit suggestions
  profile.subMetrics.commitSuggestions = suggestCommitMessages(stats, profile.archetype);

  // Enhanced roast with LLM (if enabled and available)
  if (enhanced && shouldUseLLM()) {
    try {
      const enhancedRoast = await generateEnhancedRoast(stats, profile.archetype);
      if (enhancedRoast) {
        profile.enhancedRoast = enhancedRoast;
        profile.roast = enhancedRoast; // Replace with LLM roast
      }
    } catch (error) {
      console.error('[git-vibe] LLM enhancement failed:', error.message);
    }
  }

  // Generate outputs
  const outputs = {};

  // ASCII terminal output
  if (format === 'ascii' || format === 'all') {
    outputs.ascii = renderAsciiCard(profile);
  }

  // HTML card
  if (format === 'html' || format === 'all') {
    outputs.html = renderHtmlCard(profile);
    const htmlPath = resolve(outputDir, 'git-vibe-profile.html');
    writeFileSync(htmlPath, outputs.html, 'utf8');
    outputs.htmlPath = htmlPath;
  }

  // JSON export
  if (format === 'json' || format === 'all') {
    const jsonExport = exportProfile(profile, 'json');
    outputs.json = jsonExport.content;
    const jsonPath = resolve(outputDir, 'git-vibe-profile.json');
    writeFileSync(jsonPath, jsonExport.content, 'utf8');
    outputs.jsonPath = jsonPath;
  }

  // Markdown export
  if (format === 'md' || format === 'all') {
    const mdExport = exportProfile(profile, 'md');
    outputs.md = mdExport.content;
    const mdPath = resolve(outputDir, 'git-vibe-profile.md');
    writeFileSync(mdPath, mdExport.content, 'utf8');
    outputs.mdPath = mdPath;
  }

  // SVG badge
  if (format === 'svg' || format === 'all') {
    const svgExport = exportProfile(profile, 'svg');
    outputs.svg = svgExport.content;
    const svgPath = resolve(outputDir, 'git-vibe-badge.svg');
    writeFileSync(svgPath, svgExport.content, 'utf8');
    outputs.svgPath = svgPath;
  }

  // Terminal table
  if (format === 'table' || format === 'all') {
    outputs.table = exportProfile(profile, 'table').content;
  }

  return { profile, outputs };
}