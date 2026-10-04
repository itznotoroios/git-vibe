#!/usr/bin/env node
/**
 * bin/index.js - CLI entry point for git-vibe.
 * Parses command-line arguments and runs the vibe check.
 */

import { parseArgs } from 'node:util';
import { runVibe } from '../src/index.js';

function printUsage() {
  console.log(`
  git-vibe — Your developer horoscope & personality profile

  Usage:
    git-vibe              # Analyze the current git repository
    git-vibe --mock       # Use mock commit data (for testing)
    git-vibe --help       # Show this help message

  Output:
    - Terminal ASCII art card
    - Standalone HTML profile card: ./git-vibe-profile.html
  `);
}

async function main() {
  const { values } = parseArgs({
    options: {
      mock: { type: 'boolean', default: false },
      help: { type: 'boolean', default: false }
    },
    strict: false
  });

  if (values.help) {
    printUsage();
    process.exit(0);
  }

  try {
    const { ascii, htmlPath } = await runVibe({
      mock: values.mock,
      outputDir: process.cwd()
    });

    console.log(ascii);
    console.log(`\n  ✓ Standalone HTML profile saved to: ${htmlPath}\n`);
  } catch (error) {
    console.error(`\n  ✗ Error: ${error.message}\n`);
    process.exit(1);
  }
}

main();