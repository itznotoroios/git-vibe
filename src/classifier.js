/**
 * classifier.js - Heuristic developer archetype classification and roast generation.
 * Enhanced with more archetypes and better roasts.
 */

/**
 * Classifies developer commit stats into a developer archetype.
 * @param {{ totalCommits: number, author: string, nightOwlRatio: number, avgMessageLength: number, rapidCommitRatio: number, deletionAdditionRatio: number }} stats
 * @returns {{ archetype: string, roast: string, vibeScore: string, emoji: string }}
 */
export function classifyVibe(stats) {
  const {
    totalCommits,
    nightOwlRatio,
    avgMessageLength,
    rapidCommitRatio,
    deletionAdditionRatio
  } = stats;

  // Archetype definitions with thresholds
  const archetypes = [
    {
      id: 'NOCTURNAL_GREMLIN',
      name: 'THE NOCTURNAL GREMLIN',
      emoji: '🦉',
      minNightOwl: 0.40,
      minCommits: 10,
      roast: (ratio) => `Bro, ${Math.round(ratio * 100)}% of your commits happen between 11 PM and 5 AM. You code like you're running from the cops. Go to sleep, bro.`
    },
    {
      id: 'CHAOTIC_FIXER',
      name: 'THE CHAOTIC FIXER',
      emoji: '🔥',
      minRapidRatio: 0.35,
      minCommits: 10,
      roast: (ratio) => `You commit every 3 minutes with messages like "fix", "please work", and "fml". You're not debugging code, you're playing Russian roulette with a compiler.`
    },
    {
      id: 'GIT_PHILOSOPHER',
      name: 'THE GIT-PHILOSOPHY MAJOR',
      emoji: '📝',
      minMsgLength: 70,
      minCommits: 5,
      roast: (length) => `Your commit messages are longer than my entire resume (${length} chars avg). You treat git like a diary. We get it, you're a poet. Now write some actual code.`
    },
    {
      id: 'REFACTORING_ASSASSIN',
      name: 'THE REFACTORING ASSASSIN',
      emoji: '✂️',
      minDeletionRatio: 1.8,
      minCommits: 10,
      roast: (ratio) => `You delete ${ratio.toFixed(1)}x more code than you write. You're not a developer, you're a digital minimalist artist. Elegant, but terrifying. Your team is scared of you.`
    },
    {
      id: 'APRENTICE_BOOTCAMPER',
      name: 'THE APPRENTICE BOOTCAMPER',
      emoji: '🌱',
      maxCommits: 20,
      roast: () => `You only have ${totalCommits} commits. This repo is a ghost town. Write some real code before asking for a vibe check.`
    },
    {
      id: 'STABLE_HAND',
      name: 'THE STABLE HAND',
      emoji: '🐴',
      default: true,
      roast: () => `You code like a robot. Reliable, consistent, and slightly boring. You're the backbone of every team. Just don't tell anyone you use AI to write your commit messages.`
    }
  ];

  let archetype = archetypes[5]; // Default: Stable Hand

  // Classification logic
  if (nightOwlRatio >= 0.40 && totalCommits >= 10) {
    archetype = archetypes[0];
  } else if (rapidCommitRatio >= 0.35 && totalCommits >= 10) {
    archetype = archetypes[1];
  } else if (avgMessageLength >= 70 && totalCommits >= 5) {
    archetype = archetypes[2];
  } else if (deletionAdditionRatio >= 1.8 && totalCommits >= 10) {
    archetype = archetypes[3];
  } else if (totalCommits < 20) {
    archetype = archetypes[4];
  }

  // Calculate vibe score
  let vibeScore;
  if (archetype.id === 'NOCTURNAL_GREMLIN') {
    vibeScore = `${Math.round(nightOwlRatio * 100)}% Night Owl / ${Math.round((1 - nightOwlRatio) * 100)}% Day Walker`;
  } else if (archetype.id === 'CHAOTIC_FIXER') {
    vibeScore = `${Math.round(rapidCommitRatio * 100)}% Panic / ${Math.round((1 - rapidCommitRatio) * 100)}% Chill`;
  } else if (archetype.id === 'GIT_PHILOSOPHER') {
    vibeScore = `${Math.round(avgMessageLength)} chars avg / Essayist`;
  } else if (archetype.id === 'REFACTORING_ASSASSIN') {
    vibeScore = `${deletionAdditionRatio.toFixed(1)}x Deletion / Lethal`;
  } else if (archetype.id === 'APRENTICE_BOOTCAMPER') {
    vibeScore = `${totalCommits} commits / Novice`;
  } else {
    vibeScore = '50% Stability / 50% Predictable';
  }

  // Generate roast
  let roast;
  if (archetype.id === 'NOCTURNAL_GREMLIN') {
    roast = archetype.roast(nightOwlRatio);
  } else if (archetype.id === 'CHAOTIC_FIXER') {
    roast = archetype.roast(rapidCommitRatio);
  } else if (archetype.id === 'GIT_PHILOSOPHER') {
    roast = archetype.roast(avgMessageLength);
  } else if (archetype.id === 'REFACTORING_ASSASSIN') {
    roast = archetype.roast(deletionAdditionRatio);
  } else {
    roast = archetype.roast();
  }

  return {
    archetype: archetype.name,
    roast,
    vibeScore,
    emoji: archetype.emoji,
    stats
  };
}