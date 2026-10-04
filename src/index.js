/**
 * index.js - Main controller orchestration for git-vibe v1.2.
 * Orchestrates git log parsing, analysis, classification, and rendering.
 */

import { getRawGitLogs } from './git.js';
import { analyzeCommits } from './analyzer.js';
import { classifyVibe } from './classifier.js';
import { renderAsciiCard, renderPlainAsciiCard } from './ascii-renderer.js';
import { renderHtmlCard } from './html-renderer.js';
import { renderSvgCard, renderSvgBadge } from './svg-renderer.js';
import { renderHeatmap, renderSvgHeatmap, renderBarHeatmap } from './heatmap-renderer.js';
import { generateEnhancedRoast, suggestCommitMessages, shouldUseLLM } from './llm-roaster.js';
import { calculateSimilarity, generateComparison, renderComparisonHtml } from './comparison.js';
import { exportProfile } from './output-formatters.js';
import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Runs the full git-vibe pipeline.
 options
 options.mock - Use mock commit data instead of real git logs
 options.outputDir - Directory to write output files to
 options.format - Output format: ascii, html, json, md, svg, table, all
 options.enhanced - Use LLM for enhanced roasts
 options.comparison - Generate comparison with sample profiles
}
 */
export async function runVibe({ 
  mock = false, 
  outputDir = process.cwd(),
  format = 'all',
  enhanced = false,
  comparison = false
} = {}) {
  let commits;

  if (mock) {
    // Mock data for testing
    commits = generateMockCommits();
  } else {
    commits = getRawGitLogs();
  }

  if (commits.length < 5) {
    throw new Error(`INSUFFICIENT_COMMITS: Only found ${commits.length} commits. Need at least 5.`);
  }

  // Analyze commits
  const stats = analyzeCommits(commits);
  
  // Classify archetype
  let profile = classifyVibe(stats);
  profile.stats = stats;

  // Generate commit suggestions
  profile.subMetrics.commitSuggestions = suggestCommitMessages(stats, profile.archetype);

  // Enhanced roast with LLM (if enabled)
  if (enhanced && shouldUseLLM()) {
    try {
      const enhancedRoast = await generateEnhancedRoast(stats, profile.archetype);
      if (enhancedRoast) {
        profile.enhancedRoast = enhancedRoast;
        profile.roast = enhancedRoast;
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

  // HTML card with heatmap
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
    const svgBadge = renderSvgBadge(profile.stats, 'brutal');
    outputs.svg = svgBadge;
    const svgPath = resolve(outputDir, 'git-vibe-badge.svg');
    writeFileSync(svgPath, svgBadge, 'utf8');
    outputs.svgPath = svgPath;

    // Full SVG card
    const svgCard = renderSvgCard(profile, { theme: 'brutal', width: 560, height: 280 });
    const svgCardPath = resolve(outputDir, 'git-vibe-card.svg');
    writeFileSync(svgCardPath, svgCard, 'utf8');
    outputs.svgCardPath = svgCardPath;
  }

  // Heatmap visualization
  if (format === 'heatmap' || format === 'all') {
    const heatmapSvg = renderSvgHeatmap(profile.stats, { theme: 'dark' });
    outputs.heatmapSvg = heatmapSvg;
    const heatmapPath = resolve(outputDir, 'git-vibe-heatmap.svg');
    writeFileSync(heatmapPath, heatmapSvg, 'utf8');
    outputs.heatmapPath = heatmapPath;
  }

  // Terminal table
  if (format === 'table' || format === 'all') {
    outputs.table = exportProfile(profile, 'table').content;
  }

  // Comparison mode
  if (comparison) {
    const sampleProfiles = generateSampleProfiles(stats);
    const comparisons = sampleProfiles.map(sample => ({
      comparison: generateComparison(profile, sample),
      sample
    }));
    outputs.comparisons = comparisons;
    outputs.comparisonHtml = renderComparisonHtml(comparisons[0]?.comparison);
  }

  return { profile, outputs };
}

/**
 * Generate mock commits for testing.

 */
function generateMockCommits() {
  return [
    { hash: 'a1', author: 'rihan', date: '2026-10-04T23:30:00+05:30', message: 'fix: login issue' },
    { hash: 'b2', author: 'rihan', date: '2026-10-05T02:30:00+05:30', message: 'fix' },
    { hash: 'c3', author: 'rihan', date: '2026-10-05T10:00:00+05:30', message: 'feat: new component' },
    { hash: 'd4', author: 'rihan', date: '2026-10-05T12:00:00+05:30', message: 'refactor: simplify auth module' },
    { hash: 'e5', author: 'rihan', date: '2026-10-05T14:00:00+05:30', message: 'cleanup' },
    { hash: 'f6', author: 'rihan', date: '2026-10-06T23:45:00+05:30', message: 'fix: please work' },
    { hash: 'g7', author: 'rihan', date: '2026-10-07T01:15:00+05:30', message: 'fml' },
    { hash: 'h8', author: 'rihan', date: '2026-10-07T09:00:00+05:30', message: 'feat: dashboard v2' },
    { hash: 'i9', author: 'rihan', date: '2026-10-07T11:00:00+05:30', message: 'refactor: cleanup imports' },
    { hash: 'j10', author: 'rihan', date: '2026-10-08T23:00:00+05:30', message: 'fix: bug' }
  ];
}

/**
 * Generate sample profiles for comparison.
 stats

 */
function generateSampleProfiles(stats) {
  return [
    {
      stats: { ...stats, author: 'alex', nightOwlRatio: 0.1, peakHour: 10, consistencyScore: 85 },
      archetype: 'THE MORNING LARK',
      emoji: '🌅',
      vibeScore: '10% Night / 90% Day'
    },
    {
      stats: { ...stats, author: 'sam', nightOwlRatio: 0.8, peakHour: 2, consistencyScore: 30 },
      archetype: 'THE NOCTURNAL GREMLIN',
      emoji: '🦉',
      vibeScore: '80% Night / 20% Day'
    },
    {
      stats: { ...stats, author: 'jordan', nightOwlRatio: 0.3, peakHour: 15, consistencyScore: 95 },
      archetype: 'THE STABLE HAND',
      emoji: '🐴',
      vibeScore: '50% Stability / 50% Predictable'
    }
  ];
}

export default runVibe;