/**
 * classifier.js - Heuristic developer archetype classification and roast generation.
 * Classifies developer stats into one of 5 distinct archetypes.
 */

/**
 * Classifies developer commit stats into a developer archetype.
 * @param {{ totalCommits: number, author: string, nightOwlRatio: number, avgMessageLength: number, rapidCommitRatio: number, deletionAdditionRatio: number }} stats
 * @returns {{ archetype: string, roast: string, vibeScore: string }}
 */
export function classifyVibe(stats) {
  const {
    totalCommits,
    nightOwlRatio,
    avgMessageLength,
    rapidCommitRatio,
    deletionAdditionRatio
  } = stats;

  let archetype = 'THE APPRENTICE BOOTCAMPER';
  let roast = 'You code like a student. Keep practicing, kid.';
  let vibeScore = '45% Bootcamp / 55% Chaos';

  // Classification logic (ordered by priority)
  if (nightOwlRatio >= 0.40) {
    archetype = 'THE NOCTURNAL GREMLIN';
    vibeScore = `${Math.round(nightOwlRatio * 100)}% Night Owl / ${Math.round((1 - nightOwlRatio) * 100)}% Day Walker`;
    roast = `Bro, ${Math.round(nightOwlRatio * 100)}% of your commits happen between 11 PM and 5 AM. You code like you're running from the cops. Go to sleep, bro.`;
  } else if (rapidCommitRatio >= 0.35) {
    archetype = 'THE CHAOTIC FIXER';
    vibeScore = `${Math.round(rapidCommitRatio * 100)}% Panic / ${Math.round((1 - rapidCommitRatio) * 100)}% Chill`;
    roast = `You commit every 3 minutes with messages like "fix", "please work", and "fml". You're not debugging code, you're playing Russian roulette with a compiler.`;
  } else if (avgMessageLength >= 70) {
    archetype = 'THE GIT-PHILOSOPHY MAJOR';
    vibeScore = `${Math.round(avgMessageLength)} chars avg / Essayist`;
    roast = `Your commit messages are longer than my entire resume. You treat git like a diary. We get it, you're a poet. Now write some actual code.`;
  } else if (deletionAdditionRatio >= 1.8) {
    archetype = 'THE REFACTORING ASSASSIN';
    vibeScore = `${Math.round(deletionAdditionRatio * 10) / 10}x Deletion / Lethal`;
    roast = `You delete more code than you write. You're not a developer, you're a digital minimalist artist. Elegant, but terrifying. Your team is scared of you.`;
  } else if (totalCommits < 20) {
    archetype = 'THE APPRENTICE BOOTCAMPER';
    vibeScore = `${totalCommits} commits / Novice`;
    roast = `You only have ${totalCommits} commits. This repo is a ghost town. Write some real code before asking for a vibe check.`;
  } else {
    archetype = 'THE STABLE HAND';
    vibeScore = '50% Stability / 50% Predictable';
    roast = `You code like a robot. Reliable, consistent, and slightly boring. You're the backbone of every team. Just don't tell anyone you use AI to write your commit messages.`;
  }

  return {
    archetype,
    roast,
    vibeScore
  };
}