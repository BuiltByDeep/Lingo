import { useState, useEffect, useCallback, useRef } from 'react';
import { wordBankService } from '../services/wordBankService';
import { 
  getTimeLimitForLevel,
  calculateScore,
  calculateStreakBonus,
  getRandomUnrevealedLetterIndex,
  generateCorrectFeedback,
  generateIncorrectFeedback
} from '../utils/gameLogic';

/**
 * useWordScrambleGame Hook
 * 
 * Manages all game state and logic for the Word Scramble game
 * Handles: initialization, timer, scoring, word progression, and game end
 */
export function useWordScrambleGame() {
  // Game state
  const [gameState, setGameState] = useState('level-select'); // 'level-select' | 'playing' | 'summary'
  const [selectedLevel, setSelectedLevel] = useState(null);
  
  // Word management
  const [wordList, setWordList] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState(null);
  const [scrambledWord, setScrambledWord] = useState('');
  
  // Game progress
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  
  // Current word state
  const [userInput, setUserInput] = useState('');
  const [attemptCount, setAttemptCount] = useState(0);
  const [revealedLetters, setRevealedLetters] = useState([]);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  
  // Tracking
  const [solvedWords, setSolvedWords] = useState([]);
  const [missedWords, setMissedWords] = useState([]);
  
  // Refs
  const timerRef = useRef(null);
  const autoAdvanceRef = useRef(null);

  /**
   * Initialize game with selected level
   */
  const initializeGame = useCallback((level) => {
    // Get words for level
    const words = wordBankService.getWordsByLevel(level);
    
    if (words.length === 0) {
      console.error('No words available for level:', level);
      return;
    }

    // Set up game
    setSelectedLevel(level);
    setWordList(words);
    setCurrentWordIndex(0);
    setScore(0);
    setStreak(0);
    setLongestStreak(0);
    setTimeRemaining(getTimeLimitForLevel(level));
    setSolvedWords([]);
    setMissedWords([]);
    
    // Load first word
    const firstWord = words[0];
    setCurrentWord(firstWord);
    setScrambledWord(wordBankService.scrambleWord(firstWord.word));
    
    // Reset word state
    setUserInput('');
    setAttemptCount(0);
    setRevealedLetters([]);
    setHintsUsed(0);
    setFeedbackMessage(null);
    
    // Start game
    setGameState('playing');
  }, []);

  /**
   * End game and show summary
   */
  const endGame = useCallback(() => {
    // Clear timers
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (autoAdvanceRef.current) {
      clearTimeout(autoAdvanceRef.current);
    }

    // Add current word to missed if not solved
    if (currentWord && !solvedWords.includes(currentWord)) {
      setMissedWords((prev) => [...prev, currentWord]);
    }

    setGameState('summary');
  }, [currentWord, solvedWords]);

  /**
   * Start countdown timer
   */
  useEffect(() => {
    if (gameState === 'playing' && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
  }, [gameState, timeRemaining, endGame]);

  /**
   * Load next word
   */
  const loadNextWord = useCallback(() => {
    const nextIndex = currentWordIndex + 1;
    
    // Check if we've run out of words
    if (nextIndex >= wordList.length) {
      endGame();
      return;
    }

    // Load next word
    const nextWord = wordList[nextIndex];
    setCurrentWordIndex(nextIndex);
    setCurrentWord(nextWord);
    setScrambledWord(wordBankService.scrambleWord(nextWord.word));
    
    // Reset word state
    setUserInput('');
    setAttemptCount(0);
    setRevealedLetters([]);
    setHintsUsed(0);
    setFeedbackMessage(null);
  }, [currentWordIndex, wordList, endGame]);

  /**
   * Handle answer submission
   */
  const handleSubmit = useCallback(() => {
    if (!userInput.trim() || !currentWord) return;

    const isCorrect = wordBankService.validateAnswer(userInput, currentWord.word);
    const newAttemptCount = attemptCount + 1;
    setAttemptCount(newAttemptCount);

    if (isCorrect) {
      // Calculate score
      const points = calculateScore(newAttemptCount, hintsUsed);
      const newScore = score + points;
      setScore(newScore);

      // Update streak
      const newStreak = streak + 1;
      setStreak(newStreak);
      
      // Check for streak bonus
      const streakBonus = calculateStreakBonus(newStreak);
      if (streakBonus > 0) {
        setScore(newScore + streakBonus);
        setFeedbackMessage({
          type: 'success',
          text: `${generateCorrectFeedback(currentWord)} 🎉 +${streakBonus} STREAK BONUS!`
        });
      } else {
        setFeedbackMessage({
          type: 'success',
          text: generateCorrectFeedback(currentWord)
        });
      }

      // Update longest streak
      if (newStreak > longestStreak) {
        setLongestStreak(newStreak);
      }

      // Track solved word
      setSolvedWords((prev) => [...prev, currentWord]);

      // Auto-advance after delay
      autoAdvanceRef.current = setTimeout(() => {
        loadNextWord();
      }, 2000);
    } else {
      // Wrong answer
      setStreak(0); // Reset streak
      setFeedbackMessage({
        type: 'error',
        text: generateIncorrectFeedback(newAttemptCount, currentWord.word)
      });
    }
  }, [userInput, currentWord, attemptCount, hintsUsed, score, streak, longestStreak, loadNextWord]);

  /**
   * Handle skip
   */
  const handleSkip = useCallback(() => {
    if (!currentWord) return;

    // Track missed word
    setMissedWords((prev) => [...prev, currentWord]);

    // Don't reset streak on skip
    setFeedbackMessage({
      type: 'hint',
      text: `Skipped! The word was "${currentWord.word}" – ${currentWord.meaning}`
    });

    // Advance after short delay
    autoAdvanceRef.current = setTimeout(() => {
      loadNextWord();
    }, 1500);
  }, [currentWord, loadNextWord]);

  /**
   * Handle reveal letter hint
   */
  const handleRevealLetter = useCallback(() => {
    if (!currentWord) return;

    const letterIndex = getRandomUnrevealedLetterIndex(currentWord.word, revealedLetters);
    
    if (letterIndex !== null) {
      setRevealedLetters((prev) => [...prev, letterIndex]);
      setHintsUsed((prev) => prev + 1);
      setFeedbackMessage({
        type: 'hint',
        text: `💡 Revealed letter at position ${letterIndex + 1}. Remember: -2 points!`
      });
    }
  }, [currentWord, revealedLetters]);

  /**
   * Reset game to level selection
   */
  const resetGame = useCallback(() => {
    // Clear timers
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (autoAdvanceRef.current) {
      clearTimeout(autoAdvanceRef.current);
    }

    // Reset all state
    setGameState('level-select');
    setSelectedLevel(null);
    setWordList([]);
    setCurrentWordIndex(0);
    setCurrentWord(null);
    setScrambledWord('');
    setScore(0);
    setStreak(0);
    setLongestStreak(0);
    setTimeRemaining(0);
    setUserInput('');
    setAttemptCount(0);
    setRevealedLetters([]);
    setHintsUsed(0);
    setFeedbackMessage(null);
    setSolvedWords([]);
    setMissedWords([]);
  }, []);

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (autoAdvanceRef.current) {
        clearTimeout(autoAdvanceRef.current);
      }
    };
  }, []);

  return {
    // State
    gameState,
    selectedLevel,
    currentWord,
    scrambledWord,
    score,
    streak,
    longestStreak,
    timeRemaining,
    userInput,
    feedbackMessage,
    revealedLetters,
    solvedWords,
    missedWords,
    wordsAttempted: currentWordIndex,
    
    // Actions
    initializeGame,
    handleSubmit,
    handleSkip,
    handleRevealLetter,
    setUserInput,
    resetGame,
    endGame
  };
}
