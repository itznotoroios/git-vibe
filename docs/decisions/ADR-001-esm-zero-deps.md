# ADR-001: Use Node.js ESM Modules with Zero Dependencies

## Status
Accepted

## Date
2026-10-04

## Context
We need to choose a module system and dependency strategy for git-vibe. Key requirements:
- Zero dependencies for instant install via `npx`
- Modern JavaScript features (ESM, top-level await)
- Cross-platform compatibility (Windows, macOS, Linux)
- Must run on Node.js >= 18.0.0
- Zero marginal cost per user

## Decision
Use Node.js native ES Modules with zero external dependencies. Use only built-in Node.js modules (`node:fs`, `node:path`, `node:child_process`, `node:util`, `node:url`, `node:crypto`, `node:test`, `node:assert`).

## Alternatives Considered

### TypeScript + npm packages
- Pros: Type safety, ecosystem, tooling
- Cons: Build step required, dependency management, slower install, bundle size
- Rejected: Violates zero-dependency goal

### CommonJS + minimal deps
- Pros: Mature, wide compatibility
- Cons: No top-level await, older module system, still needs deps for CLI parsing
- Rejected: ESM is the future, native test runner supports it

### Deno/Bun
- Pros: Built-in tooling, TypeScript native
- Cons: Not universally installed, GitHub Actions needs extra setup
- Rejected: Node.js is universal, npx is universal

## Consequences
- ✅ Zero dependencies = instant `npx git-vibe`
- ✅ Zero install time for users
- ✅ No supply chain attack surface
- ✅ Native test runner (`node --test`) works out of box
- ⚠️ Must implement CLI parsing manually (using `node:util` parseArgs)
- ⚠️ Must implement git parsing manually (using `execSync`)
- ⚠️ No TypeScript type checking at compile time

## Implementation Notes
- Use `type: "module"` in package.json
- Use `.js` extensions for all imports
- Use `node:test` for testing
- Use `node:assert` for assertions
- Use `parseArgs` from `node:util` for CLI parsing