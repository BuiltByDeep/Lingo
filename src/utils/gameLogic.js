/**
 * Game Logic Utilities for Word Scramble Challenge
 * 
 * Contains pure functions for:
 * - Scoring calculations
 * - Streak bonus calculations
 * - Letter reveal logic
 */

/**
 * Calculate score based on attempt count and hint usage
 * 
 * Scoring rules:
 * - First attempt: 10 points
 * - Second attempt: 7 points
 * - Third+ attempt: 5 points
 * - Hint penalty: -2 points per hint used
 * - Minimum score: 0 (never negative)
 * 
 * @param {number} attemptCount - Number of attempts made (1, 2, 3+)
 * @param {number} hintsUsed - Number of hints used for this word
 * @returns {number} Points earned (0 or positive)
 */
export function calculateScore(attemptCount, hintsUsed = 0) {
  let points = 0;
  
  if (attemptCount === 1) {
    points = 10;  // First try
  } else if (attemptCount === 2) {
    points = 7;   // Second try
  } else if (attemptCount >= 3) {
    points = 5;   // Third+ try
  }
  
  // Apply hint penalty
  points -= (hintsUsed * 2);
  
  // Never return negative score
  return Math.max(0, points);
}

/**
 * Calculate streak bonus
 * Awards 10 points for every 5 correct answers in a row
 * 
 * @param {number} streak - Current streak count
 * @returns {number} Bonus points (0 or 10)
 */
export function calculateStreakBonus(streak) {
  if (streak > 0 && streak % 5 === 0) {
    return 10;  // Bonus every 5 in a row
  }
  return 0;
}

/**
 * Check if streak bonus should be awarded
 * 
 * @param {number} streak - Current streak count
 * @returns {boolean} True if bonus should be awarded
 */
export function shouldAwardStreakBonus(streak) {
  return streak > 0 && streak % 5 === 0;
}

/**
 * Reveal a random unrevealed letter from the correct word
 * Returns the index of the letter to reveal
 * 
 * @param {string} word - The correct word
 * @param {number[]} revealedIndices - Array of already revealed letter indices
 * @returns {number|null} Index of letter to reveal, or null if all revealed
 */
export function getRandomUnrevealedLetterIndex(word, revealedIndices = []) {
  if (!word || word.length === 0) {
    return null;
  }
  
  // Find all unrevealed indices
  const unrevealedIndices = [];
  for (let i = 0; i < word.length; i++) {
    if (!revealedIndices.includes(i)) {
      unrevealedIndices.push(i);
    }
  }
  
  // If all letters are revealed, return null
  if (unrevealedIndices.length === 0) {
    return null;
  }
  
  // Return random unrevealed index
  const randomIndex = Math.floor(Math.random() * unrevealedIndices.length);
  return unrevealedIndices[randomIndex];
}

/**
 * Build a display string for scrambled word with revealed letters
 * Revealed letters are shown in their correct positions
 * 
 * @param {string} scrambledWord - The scrambled word
 * @param {string} correctWord - The correct word
 * @param {number[]} revealedIndices - Indices of revealed letters
 * @returns {string} Display string with revealed letters
 */
export function buildScrambledDisplay(scrambledWord, correctWord, revealedIndices = []) {
  if (!scrambledWord || !correctWord) {
    return scrambledWord || '';
  }
  
  // If no letters revealed, return scrambled word as-is
  if (revealedIndices.length === 0) {
    return scrambledWord;
  }
  
  // Build display with revealed letters in correct positions
  const displayChars = scrambledWord.split('');
  
  revealedIndices.forEach(index => {
    if (index >= 0 && index < correctWord.length) {
      displayChars[index] = correctWord[index];
    }
  });
  
  return displayChars.join('');
}

/**
 * Format time in MM:SS format
 * 
 * @param {number} seconds - Time in seconds
 * @returns {string} Formatted time string
 */
export function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Get time limit for a difficulty level
 * 
 * @param {string} level - 'beginner', 'intermediate', or 'advanced'
 * @returns {number} Time limit in seconds
 */
export function getTimeLimitForLevel(level) {
  const timeLimits = {
    beginner: 90,      // 90 seconds
    intermediate: 120, // 120 seconds
    advanced: 150      // 150 seconds
  };
  
  return timeLimits[level] || 90;
}

/**
 * Get target word count for a difficulty level
 * 
 * @param {string} level - 'beginner', 'intermediate', or 'advanced'
 * @returns {number} Suggested target word count
 */
export function getTargetWordCountForLevel(level) {
  const targets = {
    beginner: 10,      // 8-10 words
    intermediate: 12,  // 10-12 words
    advanced: 15       // 10-15 words
  };
  
  return targets[level] || 10;
}

/**
 * Get word length description for a difficulty level
 * 
 * @param {string} level - 'beginner', 'intermediate', or 'advanced'
 * @returns {string} Word length description
 */
export function getWordLengthForLevel(level) {
  const lengths = {
    beginner: '3-5 letters',
    intermediate: '5-7 letters',
    advanced: '6-8 letters'
  };
  
  return lengths[level] || '3-5 letters';
}

/**
 * Check if timer is in warning state (< 10 seconds)
 * 
 * @param {number} timeRemaining - Seconds remaining
 * @returns {boolean} True if in warning state
 */
export function isTimerWarning(timeRemaining) {
  return timeRemaining < 10 && timeRemaining > 0;
}

/**
 * Check if timer is in critical state (< 5 seconds)
 * 
 * @param {number} timeRemaining - Seconds remaining
 * @returns {boolean} True if in critical state
 */
export function isTimerCritical(timeRemaining) {
  return timeRemaining < 5 && timeRemaining > 0;
}

/**
 * Generate feedback message for correct answer
 * 
 * @param {object} word - Word object with meaning and example
 * @returns {string} Feedback message
 */
export function generateCorrectFeedback(word) {
  return `✅ Correct! "${word.word}" – ${word.meaning}`;
}

/**
 * Generate feedback message for incorrect answer
 * 
 * @param {number} attemptCount - Current attempt count
 * @param {string} word - The correct word
 * @returns {string} Feedback message with hint
 */
export function generateIncorrectFeedback(attemptCount, word) {
  if (attemptCount === 1) {
    return `❌ Not quite. Hint: It starts with "${word[0]}"`;
  } else if (attemptCount === 2) {
    return `❌ Try again. Hint: It's ${word.length} letters long`;
  } else {
    return `❌ Keep trying! You can do it!`;
  }
}

/**
 * Calculate final game statistics
 * 
 * @param {number} score - Final score
 * @param {Array} solvedWords - Array of solved word objects
 * @param {Array} missedWords - Array of missed word objects
 * @param {number} longestStreak - Longest streak achieved
 * @returns {object} Game statistics
 */
export function calculateGameStats(score, solvedWords, missedWords, longestStreak) {
  return {
    score,
    wordsAttempted: solvedWords.length + missedWords.length,
    wordsSolved: solvedWords.length,
    wordsSkipped: missedWords.length,
    longestStreak,
    solvedWords,
    missedWords
  };
}
