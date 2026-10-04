export function classifyVibe(stats) {
  const {
    totalCommits,
    nightOwlRatio,
    avgMessageLength,
    rapidCommitRatio,
    deletionAdditionRatio,
    peakHour,
    mostCommonType,
    weekendRatio,
    consistencyScore
  } = stats;

  const archetypes = [
    {
      id: 'NOCTURNAL_GREMLIN',
      name: 'THE NOCTURNAL GREMLIN',
      emoji: '🦉',
      trigger: (s) => s.nightOwlRatio >= 0.40 && s.totalCommits >= 10,
      roast: (s) => `Bro, ${Math.round(s.nightOwlRatio * 100)}% of your commits happen between 11 PM and 5 AM. Your circadian rhythm is a suggestion, not a rule.`
    },
    {
      id: 'CHAOTIC_FIXER',
      name: 'THE CHAOTIC FIXER',
      emoji: '🔥',
      trigger: (s) => s.rapidCommitRatio >= 0.35 && s.totalCommits >= 10,
      roast: (s) => `You commit every 3 minutes with "fix", "fml", "please work". You're not debugging code, you're playing compiler roulette.`
    },
    {
      id: 'GIT_PHILOSOPHER',
      name: 'THE GIT-PHILOSOPHY MAJOR',
      emoji: '📝',
      trigger: (s) => s.avgMessageLength >= 70 && s.totalCommits >= 5,
      roast: (s) => `Your commit messages average ${Math.round(s.avgMessageLength)} characters. You treat git like a diary. We get it, you're a poet.`
    },
    {
      id: 'REFACTORING_ASSASSIN',
      name: 'THE REFACTORING ASSASSIN',
      emoji: '✂️',
      trigger: (s) => s.deletionAdditionRatio >= 1.8 && s.totalCommits >= 10,
      roast: (s) => `You delete ${s.deletionAdditionRatio.toFixed(1)}x more code than you write. Digital minimalist artist. Elegant, but terrifying.`
    },
    {
      id: 'WEEKEND_WARRIOR',
      name: 'THE WEEKEND WARRIOR',
      emoji: '🎯',
      trigger: (s) => s.weekendRatio >= 0.40 && s.totalCommits >= 10,
      roast: (s) => `${Math.round(s.weekendRatio * 100)}% of your commits happen on weekends. Work-life balance? Never heard of her.`
    },
    {
      id: 'MORNING_LARK',
      name: 'THE MORNING LARK',
      emoji: '🌅',
      trigger: (s) => s.peakHour >= 6 && s.peakHour <= 11 && s.totalCommits >= 10,
      roast: (s) => `Your peak coding hour is ${s.peakHour}:00. You wake up before the sun and ship before breakfast. Respect.`
    },
    {
      id: 'APRENTICE_BOOTCAMPER',
      name: 'THE APPRENTICE BOOTCAMPER',
      emoji: '🌱',
      trigger: (s) => s.totalCommits < 20,
      roast: () => `Only ${totalCommits} commits? This repo is a ghost town. Write some code first, then come back.`
    },
    {
      id: 'FEATURE_FACTORY',
      name: 'THE FEATURE FACTORY',
      emoji: '🏭',
      trigger: (s) => s.mostCommonType === 'feat' && s.totalCommits >= 10,
      roast: (s) => `Every commit is "feat:" like you're building a product catalog. Ship it, ship it good.`
    },
    {
      id: 'BUG_HUNTER',
      name: 'THE BUG HUNTER',
      emoji: '🐛',
      trigger: (s) => s.mostCommonType === 'fix' && s.totalCommits >= 10,
      roast: (s) => `${s.messageTypes.fix} bug fixes and counting. You're not writing features, you're running a pest control service.`
    },
    {
      id: 'STABLE_HAND',
      name: 'THE STABLE HAND',
      emoji: '🐴',
      trigger: () => true,
      roast: () => `You code like a robot. Reliable, consistent, slightly boring. The backbone of every team. Just don't tell anyone.`
    }
  ];

  let archetype = archetypes[archetypes.length - 1];
  for (const apt of archetypes) {
    if (apt.trigger(stats)) {
      archetype = apt;
      break;
    }
  }

  let vibeScore;
  if (archetype.id === 'NOCTURNAL_GREMLIN') {
    vibeScore = `${Math.round(stats.nightOwlRatio * 100)}% Night / ${Math.round((1 - stats.nightOwlRatio) * 100)}% Day`;
  } else if (archetype.id === 'CHAOTIC_FIXER') {
    vibeScore = `${Math.round(stats.rapidCommitRatio * 100)}% Panic / ${Math.round((1 - stats.rapidCommitRatio) * 100)}% Chill`;
  } else if (archetype.id === 'WEEKEND_WARRIOR') {
    vibeScore = `${Math.round(stats.weekendRatio * 100)}% Weekend / Workaholic`;
  } else if (archetype.id === 'GIT_PHILOSOPHER') {
    vibeScore = `${Math.round(stats.avgMessageLength)} chars avg / Essayist`;
  } else if (archetype.id === 'REFACTORING_ASSASSIN') {
    vibeScore = `${stats.deletionAdditionRatio.toFixed(1)}x Deletion / Minimalist`;
  } else if (archetype.id === 'MORNING_LARK') {
    vibeScore = `Peak: ${stats.peakHour}:00 / Early Bird`;
  } else if (archetype.id === 'FEATURE_FACTORY') {
    vibeScore = `${stats.messageTypes.feat} features / Factory Line`;
  } else if (archetype.id === 'BUG_HUNTER') {
    vibeScore = `${stats.messageTypes.fix} bugs / Pest Control`;
  } else {
    vibeScore = '50% Stability / 50% Predictable';
  }

  const roast = archetype.roast(stats);

  return {
    archetype: archetype.name,
    roast,
    vibeScore,
    emoji: archetype.emoji,
    stats,
    subMetrics: {
      peakHour: stats.peakHour,
      mostCommonType: stats.mostCommonType,
      consistencyScore: Math.round(stats.consistencyScore),
      messageTypes: stats.messageTypes
    }
  };
}
