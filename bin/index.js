#!/usr/bin/env node
/**
 * bin/index.js - CLI entry point for git-vibe.
 * Parses command-line arguments and runs the vibe check.
 */

import { parseArgs } from 'node:util';
import { runVibe } from '../src/index.js';

function printUsage() {
  console.log(`
  ╔══════════════════════════════════════════════════════════════╗
  ║          git-vibe — Your Developer Horoscope                 ║
  ║           Tactical Telemetry v1.1.0                          ║
  ╚══════════════════════════════════════════════════════════════╝

  Usage:
    git-vibe                    # Analyze the current git repository
    git-vibe --mock             # Use mock commit data (for testing)
    git-vibe --format json      # Export as JSON only
    git-vibe --format html      # Export HTML card only
    git-vibe --format svg       # Export SVG badge only
    git-vibe --enhanced         # Use LLM for smarter roasts
    git-vibe --help             # Show this help message

  Output Formats:
    all        (default) ASCII + HTML + JSON + Markdown + SVG
    ascii      Terminal ASCII card only
    html       Standalone HTML profile
    json       JSON data export
    md         Markdown for READMEs
    svg        SVG badge for embeds
    table      Formatted terminal table

  Environment Variables:
    GIT_VIBE_USE_LLM=true     Enable LLM-powered roasts
    JARVIS_API_KEY=...        Your free LLM API key
    JARVIS_API_URL=...        API endpoint (default: local proxy)
    JARVIS_MODEL=auto         Model to use

  Examples:
    $ git-vibe
    $ npx git-vibe --enhanced
    $ GIT_VIBE_USE_LLM=true git-vibe --format html
  `);
}

async function main() {
  const { values } = parseArgs({
    options: {
      mock: { type: 'boolean', default: false },
      help: { type: 'boolean', default: false },
      enhanced: { type: 'boolean', default: false },
      format: { type: 'string', default: 'all' }
    },
    strict: false
  });

  if (values.help) {
    printUsage();
    process.exit(0);
  }

  try {
    const { profile, outputs } = await runVibe({
      mock: values.mock,
      outputDir: process.cwd(),
      format: values.format,
      enhanced: values.enhanced
    });

    // Print ASCII output
    if (outputs.ascii) {
      console.log(outputs.ascii);
    }

    // Print table if no ASCII
    if (!outputs.ascii && outputs.table) {
      console.log(outputs.table);
    }

    // Print success messages
    if (outputs.htmlPath) {
      console.log(`\n  ✓ HTML profile saved to: ${outputs.htmlPath}\n`);
    }
    if (outputs.jsonPath) {
      console.log(`  ✓ JSON export saved to: ${outputs.jsonPath}`);
    }
    if (outputs.mdPath) {
      console.log(`  ✓ Markdown export saved to: ${outputs.mdPath}`);
    }
    if (outputs.svgPath) {
      console.log(`  ✓ SVG badge saved to: ${outputs.svgPath}`);
    }

    // Print enhanced roast indicator
    if (profile.enhancedRoast) {
      console.log(`\n  ✨ Enhanced roast powered by LLM\n`);
    }

  } catch (error) {
    console.error(`\n  ✗ Error: ${error.message}\n`);
    process.exit(1);
  }
}

main();