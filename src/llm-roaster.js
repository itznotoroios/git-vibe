/**
 * llm-roaster.js - LLM-enhanced roast generation using free LLM API.
 * Creates contextually smarter, funnier roasts based on developer archetype.
 */

const FREELLMAPI_URL = process.env.JARVIS_API_URL || 'http://127.0.0.1:31415/v1';
const FREELLMAPI_KEY = process.env.JARVIS_API_KEY || 'freellmapi-free';
const MODEL = process.env.JARVIS_MODEL || 'auto';

/**
 * Generates an enhanced roast using LLM.
 * @param {object} stats
 * @param {string} archetype
 * @returns {Promise<string>} Enhanced roast text
 */
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
    const response = await fetch(`${FREELLMAPI_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${FREELLMAPI_KEY}`
      },
      body: JSON.stringify({
        model: MODEL,
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

/**
 * Generates commit message suggestions based on archetype.
 * @param {object} stats
 * @param {string} archetype
 * @returns {string[]} Array of suggested commit messages
 */
export function suggestCommitMessages(stats, archetype) {
  const suggestions = {
    'THE NOCTURNAL GREMLIN': [
      'fix: sleep schedule (still broken)',
      'feat: midnight snack dispenser',
      'refactor: circadian rhythm removal',
      'chore: caffeine dependency injection'
    ],
    'THE CHAOTIC FIXER': [
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

/**
 * Determines if LLM should be used for roasting.
 * @returns {boolean}
 */
export function shouldUseLLM() {
  return process.env.GIT_VIBE_USE_LLM === 'true' || 
         process.env.JARVIS_API_KEY || 
         process.env.FREELLMAPI_KEY;
}