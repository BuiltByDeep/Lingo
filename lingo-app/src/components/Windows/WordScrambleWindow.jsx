import { useWordScrambleGame } from '../../hooks/useWordScrambleGame';
import LevelSelectionScreen from '../WordScramble/LevelSelectionScreen';
import GamePlayScreen from '../WordScramble/GamePlayScreen';
import SummaryScreen from '../WordScramble/SummaryScreen';

/**
 * WordScrambleWindow Component
 * 
 * Main container for the Word Scramble Challenge game
 * Manages game state and renders appropriate screen based on current state
 */
export default function WordScrambleWindow() {
  const {
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
    wordsAttempted,
    
    // Actions
    initializeGame,
    handleSubmit,
    handleSkip,
    handleRevealLetter,
    setUserInput,
    resetGame
  } = useWordScrambleGame();

  // Render appropriate screen based on game state
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden'
      }}
    >
      {gameState === 'level-select' && (
        <LevelSelectionScreen onSelectLevel={initializeGame} />
      )}

      {gameState === 'playing' && (
        <GamePlayScreen
          selectedLevel={selectedLevel}
          currentWord={currentWord}
          scrambledWord={scrambledWord}
          score={score}
          streak={streak}
          timeRemaining={timeRemaining}
          userInput={userInput}
          feedbackMessage={feedbackMessage}
          revealedLetters={revealedLetters}
          wordsAttempted={wordsAttempted}
          onInputChange={setUserInput}
          onSubmit={handleSubmit}
          onSkip={handleSkip}
          onRevealLetter={handleRevealLetter}
        />
      )}

      {gameState === 'summary' && (
        <SummaryScreen
          score={score}
          solvedWords={solvedWords}
          missedWords={missedWords}
          longestStreak={longestStreak}
          onPlayAgain={resetGame}
          onClose={resetGame}
        />
      )}

      {/* Add pulse animation for timer */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.8;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
