# ADR-003: Zero-Dependency Architecture with Optional LLM Enhancement

## Status
Accepted

## Date
2026-10-04

## Context
We need to decide on the architecture for optional LLM-enhanced roasts while maintaining:
- Zero dependencies by default
- Works completely offline/local
- Optional enhancement without breaking core functionality
- Works with any OpenAI-compatible API endpoint
- No vendor lock-in

## Decision
Core functionality works 100% offline with zero dependencies. LLM enhancement is opt-in via environment variables:
- `GIT_VIBE_USE_LLM=true` to enable
- `LLM_API_URL` - OpenAI-compatible endpoint
- `LLM_API_KEY` - API key
- `LLM_MODEL` - Model name (default: `auto`)

Implementation uses `fetch` with `AbortController` for 5-second timeout. Falls back gracefully to heuristic roasts if LLM fails.

## Alternatives Considered

### Built-in LLM (bundled model)
- Pros: Works offline completely
- Cons: Large bundle size (>100MB), platform-specific, maintenance burden
- Rejected: Violates zero-dep philosophy

### Mandatory LLM API
- Pros: Better roasts by default
- Cons: Requires API key, network dependency, fails offline
- Rejected: Core value must work offline

### Hardcoded provider (OpenAI/Anthropic)
- Pros: Simpler implementation
- Cons: Vendor lock-in, API changes break it
- Rejected: Must work with any OpenAI-compatible endpoint

## Consequences
- ✅ Core works 100% offline
- ✅ Zero dependencies by default
- ✅ Works with any OpenAI-compatible API
- ✅ Graceful degradation on LLM failure
- ✅ 5-second timeout prevents hangs
- ✅ No vendor lock-in
- ⚠️ LLM feature requires user configuration
- ⚠️ Quality varies by model used

## Security Notes
- API key never logged or stored
- Request timeout prevents hangs (5 seconds)
- AbortController for proper cleanup
- Error messages don't leak sensitive data
- No `eval()` or dynamic code execution on LLM output