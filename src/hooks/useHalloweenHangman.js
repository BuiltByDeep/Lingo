import { useState, useCallback, useEffect } from 'react';
import { HALLOWEEN_WORDS, DIFFICULTY_LEVELS } from '../data/halloweenWords';

/**
 * Custom hook for Halloween Hangman game logic
 */
export function useHalloweenHangman() {
  const [difficulty, setDifficulty] = useState(null);
  const [currentWord, setCurrentWord] = useState(null);
  const [currentHint, setCurrentHint] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameState, setGameState] = useState('difficulty'); // 'difficulty', 'playing', 'won', 'lost'
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [totalGames, setTotalGames] = useState(0);
  const [wins, setWins] = useState(0);

  // Start a new game with selected difficulty
  const startGame = useCallback((selectedDifficulty) => {
    const wordList = HALLOWEEN_WORDS[selectedDifficulty];
    const randomIndex = Math.floor(Math.random() * wordList.length);
    const { word, hint } = wordList[randomIndex];
    
    setDifficulty(selectedDifficulty);
    setCurrentWord(word.toUpperCase());
    setCurrentHint(hint);
    setGuessedLetters([]);
    setWrongGuesses(0);
    setGameState('playing');
  }, []);

  // Guess a letter
  const guessLetter = useCallback((letter) => {
    if (gameState !== 'playing' || guessedLetters.includes(letter)) {
      return;
    }

    const upperLetter = letter.toUpperCase();
    setGuessedLetters(prev => [...prev, upperLetter]);

    if (!currentWord.includes(upperLetter)) {
      setWrongGuesses(prev => prev + 1);
    }
  }, [gameState, guessedLetters, currentWord]);

  // Check win/loss conditions
  useEffect(() => {
    if (gameState !== 'playing' || !currentWord) return;

    const maxWrong = DIFFICULTY_LEVELS[difficulty].maxWrong;
    
    // Check if lost
    if (wrongGuesses >= maxWrong) {
      setGameState('lost');
      setStreak(0);
      setTotalGames(prev => prev + 1);
      return;
    }

    // Check if won
    const allLettersGuessed = currentWord
      .split('')
      .every(letter => guessedLetters.includes(letter));
    
    if (allLettersGuessed) {
      setGameState('won');
      
      // Calculate score
      const basePoints = DIFFICULTY_LEVELS[difficulty].points;
      const streakBonus = streak * 5;
      const perfectBonus = wrongGuesses === 0 ? 20 : 0;
      const penalty = wrongGuesses;
      const roundScore = basePoints + streakBonus + perfectBonus - penalty;
      
      setScore(prev => prev + roundScore);
      setStreak(prev => prev + 1);
      setWins(prev => prev + 1);
      setTotalGames(prev => prev + 1);
    }
  }, [wrongGuesses, guessedLetters, currentWord, gameState, difficulty, streak]);

  // Get display word with guessed letters revealed
  const getDisplayWord = useCallback(() => {
    if (!currentWord) return '';
    
    return currentWord
      .split('')
      .map(letter => guessedLetters.includes(letter) ? letter : '_')
      .join(' ');
  }, [currentWord, guessedLetters]);

  // Get wrong letters
  const getWrongLetters = useCallback(() => {
    return guessedLetters.filter(letter => !currentWord.includes(letter));
  }, [guessedLetters, currentWord]);

  // Restart game with same difficulty
  const restartGame = useCallback(() => {
    if (difficulty) {
      startGame(difficulty);
    } else {
      setGameState('difficulty');
    }
  }, [difficulty, startGame]);

  // Reset everything
  const resetGame = useCallback(() => {
    setDifficulty(null);
    setCurrentWord(null);
    setCurrentHint('');
    setGuessedLetters([]);
    setWrongGuesses(0);
    setGameState('difficulty');
  }, []);

  return {
    difficulty,
    currentWord,
    currentHint,
    guessedLetters,
    wrongGuesses,
    gameState,
    score,
    streak,
    totalGames,
    wins,
    maxWrong: difficulty ? DIFFICULTY_LEVELS[difficulty].maxWrong : 7,
    displayWord: getDisplayWord(),
    wrongLetters: getWrongLetters(),
    startGame,
    guessLetter,
    restartGame,
    resetGame
  };
}
