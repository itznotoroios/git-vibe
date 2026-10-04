import { test } from 'node:test';
import assert from 'node:assert';
import { classifyVibe } from '../src/classifier.js';

test('classifyVibe - classifies NOCTURNAL GREMLIN archetype correctly', () => {
  const stats = {
    totalCommits: 100,
    nightOwlRatio: 0.65, // 65% of commits at night
    avgMessageLength: 25,
    rapidCommitRatio: 0.1,
    deletionAdditionRatio: 1.0
  };

  const result = classifyVibe(stats);
  assert.strictEqual(result.archetype, 'THE NOCTURNAL GREMLIN');
  assert.ok(result.roast.length > 0);
});

test('classifyVibe - classifies CHAOTIC FIXER archetype correctly', () => {
  const stats = {
    totalCommits: 100,
    nightOwlRatio: 0.1,
    avgMessageLength: 15,
    rapidCommitRatio: 0.55, // 55% rapid commits
    deletionAdditionRatio: 1.0
  };

  const result = classifyVibe(stats);
  assert.strictEqual(result.archetype, 'THE CHAOTIC FIXER');
});

test('classifyVibe - classifies GIT-PHILOSOPHY MAJOR archetype correctly', () => {
  const stats = {
    totalCommits: 100,
    nightOwlRatio: 0.1,
    avgMessageLength: 95, // Long messages
    rapidCommitRatio: 0.1,
    deletionAdditionRatio: 1.0
  };

  const result = classifyVibe(stats);
  assert.strictEqual(result.archetype, 'THE GIT-PHILOSOPHY MAJOR');
});

test('classifyVibe - classifies REFACTORING ASSASSIN archetype correctly', () => {
  const stats = {
    totalCommits: 100,
    nightOwlRatio: 0.1,
    avgMessageLength: 30,
    rapidCommitRatio: 0.1,
    deletionAdditionRatio: 2.5 // High deletion ratio
  };

  const result = classifyVibe(stats);
  assert.strictEqual(result.archetype, 'THE REFACTORING ASSASSIN');
});

test('classifyVibe - classifies APPRENTICE BOOTCAMPER archetype correctly', () => {
  const stats = {
    totalCommits: 10,
    nightOwlRatio: 0.1,
    avgMessageLength: 20,
    rapidCommitRatio: 0.05,
    deletionAdditionRatio: 0.5
  };

  const result = classifyVibe(stats);
  assert.strictEqual(result.archetype, 'THE APPRENTICE BOOTCAMPER');
});

test('classifyVibe - returns a valid vibe object with required fields', () => {
  const stats = {
    totalCommits: 100,
    nightOwlRatio: 0.2,
    avgMessageLength: 40,
    rapidCommitRatio: 0.2,
    deletionAdditionRatio: 1.2
  };

  const result = classifyVibe(stats);
  assert.ok(result.archetype);
  assert.ok(result.roast);
  assert.ok(result.vibeScore);
});