/**
 * comparison.test.js - Tests for developer comparison feature
 */

import { test } from 'node:test';
import assert from 'node:assert';
import { calculateSimilarity, generateComparison } from '../src/comparison.js';

test('calculateSimilarity - returns high similarity for identical profiles', () => {
  const p1 = {
    stats: { nightOwlRatio: 0.5, rapidCommitRatio: 0.3, avgMessageLength: 50, peakHour: 22, consistencyScore: 60 }
  };
  const p2 = {
    stats: { nightOwlRatio: 0.5, rapidCommitRatio: 0.3, avgMessageLength: 50, peakHour: 22, consistencyScore: 60 }
  };

  const result = calculateSimilarity(p1, p2);
  assert.strictEqual(result, 100);
});

test('calculateSimilarity - returns low similarity for opposite profiles', () => {
  const p1 = {
    stats: { nightOwlRatio: 0.9, rapidCommitRatio: 0.1, avgMessageLength: 90, peakHour: 3, consistencyScore: 30 }
  };
  const p2 = {
    stats: { nightOwlRatio: 0.1, rapidCommitRatio: 0.9, avgMessageLength: 10, peakHour: 15, consistencyScore: 90 }
  };

  const result = calculateSimilarity(p1, p2);
  assert.ok(result < 50);
});

test('generateComparison - returns expected structure', () => {
  const p1 = {
    stats: { author: 'alice', nightOwlRatio: 0.8, rapidCommitRatio: 0.1, avgMessageLength: 30, deletionAdditionRatio: 1.0, peakHour: 2, consistencyScore: 40, messageTypes: { fix: 10, feat: 5 }, totalCommits: 15 },
    archetype: 'THE NOCTURNAL GREMLIN',
    emoji: '🦉',
    vibeScore: '80% Night'
  };
  const p2 = {
    stats: { author: 'bob', nightOwlRatio: 0.1, rapidCommitRatio: 0.8, avgMessageLength: 25, deletionAdditionRatio: 1.0, peakHour: 14, consistencyScore: 90, messageTypes: { fix: 20, feat: 3 }, totalCommits: 23 },
    archetype: 'THE CHAOTIC FIXER',
    emoji: '🔥',
    vibeScore: '80% Chaos'
  };

  const result = generateComparison(p1, p2);

  assert.ok(result.similarity >= 0 && result.similarity <= 100);
  assert.ok(result.relationship);
  assert.ok(Array.isArray(result.diffs));
  assert.strictEqual(result.profileA.author, 'alice');
  assert.strictEqual(result.profileB.author, 'bob');
});

test('generateComparison - identifies key differences', () => {
  const p1 = {
    stats: { author: 'alice', nightOwlRatio: 0.85, rapidCommitRatio: 0.1, avgMessageLength: 30, deletionAdditionRatio: 1.0, peakHour: 2, consistencyScore: 40, messageTypes: {}, totalCommits: 20 },
    archetype: 'THE NOCTURNAL GREMLIN',
    emoji: '🦉',
    vibeScore: '85% Night'
  };
  const p2 = {
    stats: { author: 'bob', nightOwlRatio: 0.1, rapidCommitRatio: 0.9, avgMessageLength: 25, deletionAdditionRatio: 1.0, peakHour: 14, consistencyScore: 90, messageTypes: {}, totalCommits: 25 },
    archetype: 'THE CHAOTIC FIXER',
    emoji: '🔥',
    vibeScore: '90% Chaos'
  };

  const result = generateComparison(p1, p2);

  // Alice is more night owl
  assert.ok(result.diffs.some(d => d.includes('Alice') && d.includes('night')) ||
            result.diffs.some(d => d.includes('night owl')));
});

test('generateComparison - calculates correct relationship label', () => {
  const identicalProfile = {
    stats: { author: 'same', nightOwlRatio: 0.5, rapidCommitRatio: 0.3, avgMessageLength: 40, deletionAdditionRatio: 1.0, peakHour: 12, consistencyScore: 70, messageTypes: {}, totalCommits: 20 },
    archetype: 'THE STABLE HAND',
    emoji: '🐴',
    vibeScore: '50% Stability'
  };

  const result = generateComparison(identicalProfile, identicalProfile);
  assert.ok(result.similarity >= 95);
  assert.ok(result.relationship.includes('Twins'));
});
