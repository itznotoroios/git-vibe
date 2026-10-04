import { test } from 'node:test';
import assert from 'node:assert';
import { parseGitLogLine, processLogs } from '../src/git.js';

test('parseGitLogLine - correctly parses a formatted git log line', () => {
  const line = 'e3fdd3b|rihan|Sun Oct 4 12:00:00 2026 +0530|fix: login issue';
  const expected = {
    hash: 'e3fdd3b',
    author: 'rihan',
    date: 'Sun Oct 4 12:00:00 2026 +0530',
    message: 'fix: login issue'
  };

  const result = parseGitLogLine(line);
  assert.deepStrictEqual(result, expected);
});

test('processLogs - filters out empty lines and maps correctly', () => {
  const lines = [
    'e3fdd3b|rihan|Sun Oct 4 12:00:00 2026 +0530|fix: login issue',
    '',
    '90c84da|alex|Sun Oct 4 11:30:00 2026 +0530|cleanup'
  ];

  const result = processLogs(lines);
  assert.strictEqual(result.length, 2);
  assert.strictEqual(result[0].hash, 'e3fdd3b');
  assert.strictEqual(result[1].hash, '90c84da');
});
