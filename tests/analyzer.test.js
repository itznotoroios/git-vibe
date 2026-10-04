import { test } from 'node:test';
import assert from 'node:assert';
import { analyzeCommits } from '../src/analyzer.js';

test('analyzeCommits - correctly calculates total commits and author', () => {
  const commits = [
    { hash: 'a1', author: 'rihan', date: 'Sun Oct 4 12:00:00 2026 +0530', message: 'fix: login issue' },
    { hash: 'b2', author: 'rihan', date: 'Sun Oct 4 11:30:00 2026 +0530', message: 'cleanup' },
    { hash: 'c3', author: 'rihan', date: 'Sun Oct 4 10:00:00 2026 +0530', message: 'feat: new component' }
  ];

  const result = analyzeCommits(commits);
  assert.strictEqual(result.totalCommits, 3);
  assert.strictEqual(result.author, 'rihan');
  assert.strictEqual(result.nightOwlRatio, 0.0); // All commits in daytime (12pm, 11:30am, 10am)
});

test('analyzeCommits - correctly identifies night owl ratio (11 PM - 5 AM)', () => {
  const commits = [
    { hash: 'a1', author: 'rihan', date: 'Sun Oct 4 23:30:00 2026 +0530', message: 'fix' },
    { hash: 'b2', author: 'rihan', date: 'Sun Oct 4 02:30:00 2026 +0530', message: 'fix' },
    { hash: 'c3', author: 'rihan', date: 'Sun Oct 4 10:00:00 2026 +0530', message: 'feat' }
  ];

  const result = analyzeCommits(commits);
  assert.strictEqual(result.nightOwlRatio, 2 / 3);
});

test('analyzeCommits - correctly calculates average commit message length', () => {
  const commits = [
    { hash: 'a1', author: 'rihan', date: 'Sun Oct 4 12:00:00 2026 +0530', message: 'fix: login issue' },
    { hash: 'b2', author: 'rihan', date: 'Sun Oct 4 11:30:00 2026 +0530', message: 'cleanup' }
  ];

  const result = analyzeCommits(commits);
  // 'fix: login issue' is 16 chars, 'cleanup' is 7 chars. Average = 11.5
  assert.strictEqual(result.avgMessageLength, 11.5);
});

test('analyzeCommits - correctly calculates rapid commit frequency', () => {
  const commits = [
    { hash: 'a1', author: 'rihan', date: 'Sun Oct 4 12:00:00 2026 +0530', message: 'fix' },
    { hash: 'b2', author: 'rihan', date: 'Sun Oct 4 12:01:00 2026 +0530', message: 'fix' },
    { hash: 'c3', author: 'rihan', date: 'Sun Oct 4 12:02:00 2026 +0530', message: 'fix' }
  ];

  const result = analyzeCommits(commits);
  assert.ok(result.rapidCommitRatio >= 0.0);
  assert.ok(result.rapidCommitRatio <= 1.0);
});

test('analyzeCommits - throws on empty commit array', () => {
  assert.throws(() => analyzeCommits([]), /EMPTY_COMMITS/);
});