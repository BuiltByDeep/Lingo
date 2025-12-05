import { WORD_BANK } from '../data/wordBankData';

/**
 * WordBankService
 * 
 * Manages word data and provides methods for:
 * - Filtering words by difficulty level
 * - Scrambling words using Fisher-Yates shuffle
 * - Validating answers
 */
class WordBankService {
  constructor() {
    this.wordBank = WORD_BANK;
  }

  /**
   * Get all words for a specific difficulty level
   * Returns a shuffled array to ensure variety
   * 
   * @param {string} level - 'beginner', 'intermediate', or 'advanced'
   * @returns {Array} Shuffled array of word objects
   */
  getWordsByLevel(level) {
    const filteredWords = this.wordBank.filter(word => word.level === level);
    return this.shuffleArray([...filteredWords]);
  }

  /**
   * Scramble a word using Fisher-Yates shuffle algorithm
   * Ensures the scrambled version differs from the original
   * 
   * @param {string} word - The word to scramble
   * @returns {string} Scrambled word
   */
  scrambleWord(word) {
    if (!word || word.length <= 1) {
      return word;
    }

    const letters = word.split('');
    
    // Fisher-Yates shuffle
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    
    const scrambled = letters.join('');
    
    // Ensure scrambled differs from original
    // If they're the same, try again (recursive)
    if (scrambled === word) {
      return this.scrambleWord(word);
    }
    
    return scrambled;
  }

  /**
   * Validate user answer against correct word
   * Case-insensitive comparison
   * 
   * @param {string} userInput - User's answer
   * @param {string} correctWord - The correct word
   * @returns {boolean} True if answer is correct
   */
  validateAnswer(userInput, correctWord) {
    if (!userInput || !correctWord) {
      return false;
    }
    
    // Trim whitespace and compare case-insensitively
    return userInput.trim().toUpperCase() === correctWord.toUpperCase();
  }

  /**
   * Shuffle an array using Fisher-Yates algorithm
   * 
   * @param {Array} array - Array to shuffle
   * @returns {Array} Shuffled array
   */
  shuffleArray(array) {
    const shuffled = [...array];
    
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled;
  }

  /**
   * Get all available difficulty levels
   * 
   * @returns {Array} Array of level strings
   */
  getLevels() {
    return ['beginner', 'intermediate', 'advanced'];
  }

  /**
   * Get word count for a specific level
   * 
   * @param {string} level - Difficulty level
   * @returns {number} Number of words available
   */
  getWordCountByLevel(level) {
    return this.wordBank.filter(word => word.level === level).length;
  }

  /**
   * Get all categories for a specific level
   * 
   * @param {string} level - Difficulty level
   * @returns {Array} Array of unique category names
   */
  getCategoriesByLevel(level) {
    const words = this.wordBank.filter(word => word.level === level);
    const categories = [...new Set(words.map(word => word.category))];
    return categories;
  }
}

// Export singleton instance
export const wordBankService = new WordBankService();

// Export class for testing
export default WordBankService;
