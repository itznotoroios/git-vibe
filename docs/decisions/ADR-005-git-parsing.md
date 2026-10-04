# ADR-005: Git Log Parsing with Robust Error Handling

## Status
Accepted

## Date
2026-10-04

## Context
git-vibe parses local git logs using `git log --pretty=format`. The output format must be parsed reliably even with:
- Malformed commit messages
- Empty commits
- Special characters in messages
- Different date formats
- Non-UTF8 characters
- Merge commits (excluded via --no-merges)

## Decision
Use strict format string `%h|%an|%ad|%s` with pipe delimiter. Parse with strict validation:
- Throw on malformed lines
- Skip empty lines
- Skip lines with < 4 fields
- Use optional chaining for safe property access
- Validate date parsing with `isNaN` check

## Alternatives Considered

### JSON output from git (`--pretty=format:%H%x00%an%x00%ad%x00%s`)
- Pros: Null delimiter handles special chars
- Cons: Null byte handling is complex in JS, less readable
- Rejected: Complexity not worth it

### JSON output via `--pretty=format:json`
- Pros: Native parsing
- Cons: Not available in older git versions
- Rejected: Compatibility concerns

## Implementation
```javascript
function parseGitLogLine(line) {
  if (typeof line !== 'string' || line.trim() === '') {
    throw new Error('INVALID_LOG_LINE');
  }
  const parts = line.split('|');
  if (parts.length < 4) throw new Error('INVALID_LOG_LINE');
  const [hash, author, date, ...messageParts] = parts;
  return { hash, author, date, message: messageParts.join('|') };
}

function processLogs(lines) {
  return lines
    .filter(line => typeof line === 'string' && line.trim() !== '')
    .map(parseGitLogLine);
}
```

In analyzer:
```javascript
commits.forEach((commit) => {
  if (!commit?.date) return;
  const date = new Date(commit.date);
  if (isNaN(date.getTime())) return; // Skip invalid dates
  // ...
});
```

## Consequences
- ✅ Handles malformed input gracefully
- ✅ Skips invalid commits instead of crashing
- ✅ Clear error messages for debugging
- ✅ Maintains zero dependencies
- ✅ Easy to test with mock data
- ⚠️ Skips silently - may hide data quality issues
- ⚠️ Non-UTF8 dates may fail silently