import { useTheme } from '../../contexts/ThemeContext';
import { formatTime, isTimerWarning, isTimerCritical, buildScrambledDisplay } from '../../utils/gameLogic';

/**
 * GamePlayScreen Component
 * 
 * Main game interface during active play
 * Contains: Header, Word Display, Input Area, and Sidebar
 */
export default function GamePlayScreen({
  selectedLevel,
  currentWord,
  scrambledWord,
  score,
  streak,
  timeRemaining,
  userInput,
  feedbackMessage,
  revealedLetters,
  wordsAttempted,
  onInputChange,
  onSubmit,
  onSkip,
  onRevealLetter
}) {
  const { theme } = useTheme();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: theme.isRetroYahoo 
          ? '#ECE9D8'
          : theme.isHalloween
          ? 'rgba(20, 10, 30, 0.95)'
          : theme.chatBg || theme.windowBg,
        fontFamily: theme.font
      }}
    >
      {/* Game Header */}
      <GameHeader selectedLevel={selectedLevel} theme={theme} />

      {/* Main Game Area */}
      <div
        style={{
          display: 'flex',
          flex: 1,
          overflow: 'hidden'
        }}
      >
        {/* Center Content */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
            overflow: 'auto'
          }}
        >
          {/* Word Display */}
          <WordDisplay
            currentWord={currentWord}
            scrambledWord={scrambledWord}
            revealedLetters={revealedLetters}
            onRevealLetter={onRevealLetter}
            theme={theme}
          />

          {/* Input Area */}
          <InputArea
            userInput={userInput}
            feedbackMessage={feedbackMessage}
            onInputChange={onInputChange}
            onSubmit={onSubmit}
            onSkip={onSkip}
            theme={theme}
          />
        </div>

        {/* Sidebar */}
        <GameSidebar
          score={score}
          streak={streak}
          timeRemaining={timeRemaining}
          wordsAttempted={wordsAttempted}
          theme={theme}
        />
      </div>
    </div>
  );
}

/**
 * GameHeader Component
 * Displays game title and current level badge
 */
function GameHeader({ selectedLevel, theme }) {
  const levelIcons = {
    beginner: '🌱',
    intermediate: '⭐',
    advanced: '🏆'
  };

  return (
    <div
      style={{
        padding: '15px 20px',
        background: theme.isRetroYahoo
          ? '#0257EE'
          : theme.isHalloween
          ? 'linear-gradient(180deg, #9D4EDD 0%, #5A189A 100%)'
          : theme.titleBarBg,
        borderBottom: `2px solid ${theme.windowBorder || theme.accent}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <h2
        style={{
          fontSize: '20px',
          fontWeight: 'bold',
          color: theme.titleBarText || '#FFFFFF',
          margin: 0
        }}
      >
        🔤 Word Scramble Challenge
      </h2>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 12px',
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '20px',
          fontSize: '14px',
          fontWeight: 'bold',
          color: theme.titleBarText || '#FFFFFF'
        }}
      >
        <span>{levelIcons[selectedLevel]}</span>
        <span style={{ textTransform: 'capitalize' }}>{selectedLevel}</span>
      </div>
    </div>
  );
}

/**
 * WordDisplay Component
 * Shows scrambled word, category hint, and reveal letter button
 */
function WordDisplay({ currentWord, scrambledWord, revealedLetters, onRevealLetter, theme }) {
  if (!currentWord) {
    return null;
  }

  // Build display with revealed letters
  const displayWord = buildScrambledDisplay(scrambledWord, currentWord.word, revealedLetters);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        gap: '20px',
        minHeight: '200px'
      }}
    >
      {/* Scrambled Word */}
      <div
        style={{
          fontSize: '48px',
          fontWeight: 'bold',
          letterSpacing: '8px',
          color: theme.isRetroYahoo ? '#0257EE' : theme.accent,
          fontFamily: 'monospace',
          textShadow: theme.isHalloween ? '0 0 10px rgba(157, 78, 221, 0.5)' : 'none'
        }}
      >
        {displayWord.split('').map((letter, index) => (
          <span
            key={index}
            style={{
              color: revealedLetters.includes(index) ? '#4CAF50' : 'inherit',
              fontWeight: revealedLetters.includes(index) ? 'bold' : 'normal'
            }}
          >
            {letter}
          </span>
        ))}
      </div>

      {/* Category Hint */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 20px',
          background: theme.isRetroYahoo
            ? '#FFFACD'
            : theme.isHalloween
            ? 'rgba(157, 78, 221, 0.15)'
            : 'rgba(0, 102, 255, 0.1)',
          border: `1px solid ${theme.isRetroYahoo ? '#FFD700' : theme.accent}`,
          borderRadius: '8px',
          fontSize: '16px',
          fontStyle: 'italic',
          color: theme.textColor || '#666'
        }}
      >
        <span>💡</span>
        <span>
          <strong>Category:</strong> {currentWord.category}
        </span>
      </div>

      {/* Reveal Letter Button */}
      <button
        onClick={onRevealLetter}
        disabled={revealedLetters.length >= currentWord.word.length}
        style={{
          padding: '10px 20px',
          background: theme.isRetroYahoo
            ? 'linear-gradient(180deg, #FFD700 0%, #FFA500 100%)'
            : theme.isHalloween
            ? 'rgba(157, 78, 221, 0.3)'
            : 'rgba(255, 152, 0, 0.2)',
          border: `2px solid ${theme.isRetroYahoo ? '#FFA500' : '#FF9800'}`,
          borderRadius: '8px',
          color: theme.textColor || '#333',
          fontSize: '14px',
          fontWeight: 'bold',
          cursor: revealedLetters.length >= currentWord.word.length ? 'not-allowed' : 'pointer',
          opacity: revealedLetters.length >= currentWord.word.length ? 0.5 : 1,
          transition: 'all 0.2s',
          fontFamily: theme.font
        }}
        onMouseEnter={(e) => {
          if (revealedLetters.length < currentWord.word.length) {
            e.currentTarget.style.transform = 'scale(1.05)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        💡 Give me a letter (-2 points)
      </button>
    </div>
  );
}

/**
 * InputArea Component
 * Text input, submit/skip buttons, and feedback messages
 */
function InputArea({ userInput, feedbackMessage, onInputChange, onSubmit, onSkip, theme }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && userInput.trim()) {
      onSubmit();
    }
  };

  return (
    <div
      style={{
        padding: '20px',
        borderTop: `1px solid ${theme.windowBorder || 'rgba(0, 0, 0, 0.1)'}`,
        background: theme.isRetroYahoo
          ? '#F5F5F5'
          : theme.isHalloween
          ? 'rgba(25, 15, 35, 0.95)'
          : theme.toolbarBg || '#F5F5F5'
      }}
    >
      {/* Feedback Message */}
      {feedbackMessage && (
        <div
          style={{
            marginBottom: '15px',
            padding: '12px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            background: feedbackMessage.type === 'success'
              ? '#d4edda'
              : feedbackMessage.type === 'error'
              ? '#f8d7da'
              : '#fff3cd',
            color: feedbackMessage.type === 'success'
              ? '#155724'
              : feedbackMessage.type === 'error'
              ? '#721c24'
              : '#856404',
            border: `1px solid ${
              feedbackMessage.type === 'success'
                ? '#c3e6cb'
                : feedbackMessage.type === 'error'
                ? '#f5c6cb'
                : '#ffeaa7'
            }`,
            animation: 'fadeIn 0.3s ease-in'
          }}
        >
          {feedbackMessage.text}
        </div>
      )}

      {/* Input and Buttons */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          alignItems: 'center'
        }}
      >
        <input
          type="text"
          value={userInput}
          onChange={(e) => onInputChange(e.target.value.toUpperCase())}
          onKeyDown={handleKeyDown}
          placeholder="Type your answer..."
          style={{
            flex: 1,
            padding: '12px',
            fontSize: '16px',
            border: `2px solid ${theme.windowBorder || '#C0C0C0'}`,
            borderRadius: '8px',
            background: theme.inputBg || '#FFFFFF',
            color: theme.textColor || '#000',
            fontFamily: theme.font,
            outline: 'none'
          }}
          autoFocus
        />

        <button
          onClick={onSubmit}
          disabled={!userInput.trim()}
          style={{
            padding: '12px 24px',
            background: !userInput.trim()
              ? '#ccc'
              : theme.isRetroYahoo
              ? 'linear-gradient(180deg, #4CAF50 0%, #45a049 100%)'
              : theme.isHalloween
              ? 'linear-gradient(180deg, #9D4EDD 0%, #7B2CBF 100%)'
              : theme.accent,
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: !userInput.trim() ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
            fontFamily: theme.font
          }}
          onMouseEnter={(e) => {
            if (userInput.trim()) {
              e.currentTarget.style.transform = 'scale(1.05)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          ✓ Check
        </button>

        <button
          onClick={onSkip}
          style={{
            padding: '12px 24px',
            background: theme.isRetroYahoo
              ? 'linear-gradient(180deg, #E8E8E8 0%, #C0C0C0 100%)'
              : theme.isHalloween
              ? 'rgba(157, 78, 221, 0.2)'
              : '#E0E0E0',
            color: theme.textColor || '#333',
            border: `2px solid ${theme.windowBorder || '#C0C0C0'}`,
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontFamily: theme.font
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          ⏭️ Skip
        </button>
      </div>
    </div>
  );
}

/**
 * GameSidebar Component
 * Shows score, streak, timer, and progress
 */
function GameSidebar({ score, streak, timeRemaining, wordsAttempted, theme }) {
  const isWarning = isTimerWarning(timeRemaining);
  const isCritical = isTimerCritical(timeRemaining);

  return (
    <div
      style={{
        width: '200px',
        padding: '20px',
        background: theme.isRetroYahoo
          ? '#F5F5F5'
          : theme.isHalloween
          ? 'rgba(25, 15, 35, 0.95)'
          : theme.userListBg || '#F5F5F5',
        borderLeft: `2px solid ${theme.windowBorder || 'rgba(0, 0, 0, 0.1)'}`,
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}
    >
      {/* Score */}
      <StatCard
        icon="⭐"
        label="Score"
        value={score}
        theme={theme}
      />

      {/* Streak */}
      <StatCard
        icon={streak > 0 ? '🔥' : '💫'}
        label="Streak"
        value={`${streak} in a row`}
        theme={theme}
        highlight={streak > 0 && streak % 5 === 0}
      />

      {/* Timer */}
      <div
        style={{
          padding: '15px',
          background: theme.isRetroYahoo
            ? '#FFFFFF'
            : theme.isHalloween
            ? 'rgba(157, 78, 221, 0.15)'
            : '#FFFFFF',
          border: `2px solid ${
            isCritical ? '#dc3545' : isWarning ? '#ff9800' : theme.windowBorder || '#C0C0C0'
          }`,
          borderRadius: '8px',
          textAlign: 'center',
          animation: isCritical ? 'pulse 1s infinite' : 'none'
        }}
      >
        <div style={{ fontSize: '14px', color: theme.textColor || '#666', marginBottom: '5px' }}>
          ⏱️ Time Left
        </div>
        <div
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: isCritical ? '#dc3545' : isWarning ? '#ff9800' : theme.textColor || '#333',
            fontFamily: 'monospace'
          }}
        >
          {formatTime(timeRemaining)}
        </div>
      </div>

      {/* Progress */}
      <StatCard
        icon="📊"
        label="Progress"
        value={`${wordsAttempted} words`}
        theme={theme}
      />
    </div>
  );
}

/**
 * StatCard Component
 * Reusable card for displaying statistics
 */
function StatCard({ icon, label, value, theme, highlight = false }) {
  return (
    <div
      style={{
        padding: '15px',
        background: highlight
          ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)'
          : theme.isRetroYahoo
          ? '#FFFFFF'
          : theme.isHalloween
          ? 'rgba(157, 78, 221, 0.15)'
          : '#FFFFFF',
        border: `2px solid ${highlight ? '#FFA500' : theme.windowBorder || '#C0C0C0'}`,
        borderRadius: '8px',
        textAlign: 'center',
        transition: 'all 0.3s'
      }}
    >
      <div style={{ fontSize: '24px', marginBottom: '5px' }}>{icon}</div>
      <div style={{ fontSize: '12px', color: theme.textColor || '#666', marginBottom: '5px' }}>
        {label}
      </div>
      <div
        style={{
          fontSize: '20px',
          fontWeight: 'bold',
          color: highlight ? '#000' : theme.textColor || '#333'
        }}
      >
        {value}
      </div>
    </div>
  );
}
