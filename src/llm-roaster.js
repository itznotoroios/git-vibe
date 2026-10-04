const LLM_API_URL = process.env.LLM_API_URL || null;
const LLM_API_KEY = process.env.LLM_API_KEY || null;
const LLM_MODEL = process.env.LLM_MODEL || 'auto';

export async function generateEnhancedRoast(stats, archetype) {
  const { totalCommits, nightOwlRatio, avgMessageLength, rapidCommitRatio, peakHour } = stats;

  const systemPrompt = `You are a brutalist developer roast master. Your job is to roast developers based on their git commit patterns. Be savage but funny. Keep it under 60 characters. No emojis.`;

  const userPrompt = `Roast a developer with these stats:
- Archetype: ${archetype}
- Total commits: ${totalCommits}
- Night owl ratio: ${Math.round(nightOwlRatio * 100)}%
- Peak hour: ${peakHour}:00
- Avg message length: ${Math.round(avgMessageLength)} chars
- Rapid commit ratio: ${Math.round(rapidCommitRatio * 100)}%

Generate a savage roast:`;

  try {
    const response = await fetch(`${LLM_API_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LLM_API_KEY}`
      },
      body: JSON.stringify({
        model: LLM_MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        max_tokens: 80,
        temperature: 0.9
      })
    });

    if (!response.ok) {
      throw new Error(`LLM API error: ${response.status}`);
    }

    const data = await response.json();
    const roast = data.choices?.[0]?.message?.content?.trim();

    if (roast && roast.length > 10) {
      return roast;
    }

    throw new Error('Empty or invalid LLM response');
  } catch (error) {
    console.error('[git-vibe] LLM roast generation failed:', error.message);
    return null;
  }
}

export function suggestCommitMessages(stats, archetype) {
  const suggestions = {
    'THE NOCTURNAL GREMLIN': [
      'fix: sleep schedule (still broken)',
      'feat: midnight snack dispenser',
      'refactor: circadian rhythm removal',
      'chore: caffeine dependency injection'
    ],
    'THE CHAOTIC_FIXER': [
      'fix: please work this time',
      'wip: desperate attempt at code',
      'fix: reverted everything again',
      'chore: pray to the compiler gods'
    ],
    'THE GIT-PHILOSOPHY MAJOR': [
      'docs: a comprehensive treatise on why this change matters to humanity',
      'feat: an essay about feelings disguised as code',
      'refactor: transcendental middleware for existential dread',
      'chore: meditation session between commits'
    ],
    'THE REFACTORING ASSASSIN': [
      'refactor: delete your feelings (and code)',
      'chore: minimalism therapy session',
      'refactor: less is more (delete 1000 lines)',
      'style: prettier went hard on this one'
    ],
    'THE WEEKEND WARRIOR': [
      'feat: working while others rest',
      'chore: sacrifice social life for code',
      'fix: burnout prevention module',
      'docs: why I missed your birthday'
    ],
    'THE MORNING LARK': [
      'feat: sunrise deployment protocol',
      'chore: coffee dependency satisfied',
      'refactor: early bird gets the bug',
      'fix: circadian rhythm optimization'
    ]
  };

  return suggestions[archetype] || suggestions['THE STABLE HAND'] || [
    'feat: some code changed',
    'fix: another bug appeared',
    'refactor: made it faster somehow',
    'chore: touch Grass'
  ];
}

export function shouldUseLLM() {
  return process.env.GIT_VIBE_USE_LLM === 'true' ||
         process.env.LLM_API_KEY;
}
