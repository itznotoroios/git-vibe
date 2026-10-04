# ADR-004: Security-First HTML Generation with Escape Functions

## Status
Accepted

## Date
2026-10-04

## Context
The HTML profile card generator injects user-controlled data (git author name, commit messages, archetype names, roasts) into HTML output. This creates XSS attack surface if any data contains HTML/JS payloads.

## Decision
Implement `escapeHtml()` utility function that escapes all user-controlled strings before HTML interpolation. Apply to ALL user-controlled interpolations in HTML output.

Function escapes: `&`, `<`, `>`, `"`, `'`

Apply to: author name, archetype name, roast text, vibe score, emoji, vibe score, share URL.

## Alternatives Considered

### Template engine (Handlebars, EJS, etc.)
- Pros: Built-in escaping, cleaner syntax
- Cons: Adds dependency, bundle size
- Rejected: Zero-dependency constraint

### DOMPurify
- Pros: Robust sanitization
- Cons: Heavy dependency (~20KB), overkill for our use case
- Rejected: Zero-dependency constraint

### Native DOM API (createElement, textContent)
- Pros: Native, safe
- Cons: Verbose for template generation, harder to maintain
- Rejected: Template strings with escape function is cleaner

## Implementation
```javascript
function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, '&#039;');
}
```

Applied to all `${...}` interpolations in HTML template strings.

## Consequences
- ✅ XSS prevented for all user-controlled data
- ✅ Zero dependencies maintained
- ✅ Simple, auditable implementation
- ✅ No performance impact (simple regex replaces)
- ⚠️ Must remember to apply to ALL new interpolations
- ⚠️ Does not protect against CSS injection (no style attributes used)

## Testing
- Unit tests for escapeHtml with various inputs
- Manual testing with HTML payloads in commit messages
- Integration test: profile with `<script>alert(1)</script>` in author name