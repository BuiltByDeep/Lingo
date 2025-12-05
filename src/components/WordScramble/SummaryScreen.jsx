import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

/**
 * SummaryScreen Component
 * 
 * Displays game results after completion
 * Shows: final score, words solved/missed, missed word details, and replay option
 */
export default function SummaryScreen({
  score,
  solvedWords,
  missedWords,
  longestStreak,
  onPlayAgain,
  onClose
}) {
  const { theme } = useTheme();
  const [showMissedWords, setShowMissedWords] = useState(false);

  const totalWords = solvedWords.length + missedWords.length;
  const accuracy = totalWords > 0 ? Math.round((solvedWords.length / totalWords) * 100) : 0;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        padding: '40px 20px',
        background: theme.isRetroYahoo 
          ? 'linear-gradient(135deg, #ECE9D8 0%, #F5F5F5 100%)'
          : theme.isHalloween
          ? 'linear-gradient(135deg, rgba(20, 10, 30, 0.95) 0%, rgba(40, 20, 50, 0.95) 100%)'
          : theme.chatBg || theme.windowBg,
        fontFamily: theme.font,
        overflow: 'auto'
      }}
    >
      {/* Title */}
      <h2
        style={{
          fontSize: '36px',
          fontWeight: 'bold',
          color: theme.isRetroYahoo ? '#0257EE' : theme.accent,
          marginBottom: '10px',
          textShadow: theme.isHalloween ? '0 0 10px rgba(157, 78, 221, 0.5)' : 'none'
        }}
      >
        🎉 Game Over!
      </h2>

      {/* Final Score */}
      <div
        style={{
          fontSize: '72px',
          fontWeight: 'bold',
          color: theme.isRetroYahoo ? '#FFD700' : theme.accent,
          marginBottom: '30px',
          textShadow: theme.isHalloween ? '0 0 20px rgba(157, 78, 221, 0.7)' : '2px 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        {score}
      </div>

      {/* Statistics Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '15px',
          width: '100%',
          maxWidth: '600px',
          marginBottom: '30px'
        }}
      >
        <StatBox
          icon="✅"
          label="Words Solved"
          value={solvedWords.length}
          theme={theme}
        />
        <StatBox
          icon="❌"
          label="Words Missed"
          value={missedWords.length}
          theme={theme}
        />
        <StatBox
          icon="🎯"
          label="Accuracy"
          value={`${accuracy}%`}
          theme={theme}
        />
        <StatBox
          icon="🔥"
          label="Longest Streak"
          value={longestStreak}
          theme={theme}
        />
      </div>

      {/* Missed Words Section */}
      {missedWords.length > 0 && (
        <div
          style={{
            width: '100%',
            maxWidth: '600px',
            marginBottom: '30px'
          }}
        >
          <button
            onClick={() => setShowMissedWords(!showMissedWords)}
            style={{
              width: '100%',
              padding: '15px',
              background: theme.isRetroYahoo
                ? 'linear-gradient(180deg, #FFD700 0%, #FFA500 100%)'
                : theme.isHalloween
                ? 'rgba(157, 78, 221, 0.3)'
                : 'rgba(255, 152, 0, 0.2)',
              border: `2px solid ${theme.isRetroYahoo ? '#FFA500' : '#FF9800'}`,
              borderRadius: '8px',
              color: theme.textColor || '#333',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontFamily: theme.font,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>📚 Review Missed Words ({missedWords.length})</span>
            <span>{showMissedWords ? '▼' : '▶'}</span>
          </button>

          {showMissedWords && (
            <div
              style={{
                marginTop: '15px',
                maxHeight: '300px',
                overflowY: 'auto',
                background: theme.isRetroYahoo
                  ? '#FFFFFF'
                  : theme.isHalloween
                  ? 'rgba(25, 15, 35, 0.95)'
                  : '#FFFFFF',
                border: `2px solid ${theme.windowBorder || '#C0C0C0'}`,
                borderRadius: '8px',
                padding: '15px'
              }}
            >
              {missedWords.map((word, index) => (
                <MissedWordCard
                  key={index}
                  word={word}
                  theme={theme}
                  isLast={index === missedWords.length - 1}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div
        style={{
          display: 'flex',
          gap: '15px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}
      >
        <button
          onClick={onPlayAgain}
          style={{
            padding: '15px 30px',
            background: theme.isRetroYahoo
              ? 'linear-gradient(180deg, #4CAF50 0%, #45a049 100%)'
              : theme.isHalloween
              ? 'linear-gradient(180deg, #9D4EDD 0%, #7B2CBF 100%)'
              : theme.accent,
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '8px',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontFamily: theme.font,
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 6px 8px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
          }}
        >
          🔄 Play Again
        </button>

        <button
          onClick={onClose}
          style={{
            padding: '15px 30px',
            background: theme.isRetroYahoo
              ? 'linear-gradient(180deg, #E8E8E8 0%, #C0C0C0 100%)'
              : theme.isHalloween
              ? 'rgba(157, 78, 221, 0.2)'
              : '#E0E0E0',
            color: theme.textColor || '#333',
            border: `2px solid ${theme.windowBorder || '#C0C0C0'}`,
            borderRadius: '8px',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontFamily: theme.font,
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 6px 8px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
          }}
        >
          ✕ Close
        </button>
      </div>

      {/* Encouragement Message */}
      <div
        style={{
          marginTop: '30px',
          padding: '15px',
          background: theme.isRetroYahoo 
            ? '#FFFACD' 
            : theme.isHalloween
            ? 'rgba(157, 78, 221, 0.1)'
            : 'rgba(0, 102, 255, 0.1)',
          border: `1px solid ${theme.isRetroYahoo ? '#FFD700' : theme.accent}`,
          borderRadius: '8px',
          maxWidth: '600px',
          width: '100%',
          textAlign: 'center'
        }}
      >
        <p
          style={{
            fontSize: '14px',
            color: theme.textColor || '#333',
            margin: 0
          }}
        >
          {accuracy >= 80 
            ? '🌟 Excellent work! You\'re a vocabulary master!'
            : accuracy >= 60
            ? '👍 Great job! Keep practicing to improve even more!'
            : accuracy >= 40
            ? '💪 Good effort! Practice makes perfect!'
            : '🎯 Keep trying! Every game helps you learn new words!'}
        </p>
      </div>
    </div>
  );
}

/**
 * StatBox Component
 * Displays a single statistic
 */
function StatBox({ icon, label, value, theme }) {
  return (
    <div
      style={{
        padding: '20px',
        background: theme.isRetroYahoo
          ? '#FFFFFF'
          : theme.isHalloween
          ? 'rgba(157, 78, 221, 0.15)'
          : '#FFFFFF',
        border: `2px solid ${theme.windowBorder || '#C0C0C0'}`,
        borderRadius: '8px',
        textAlign: 'center',
        boxShadow: theme.isRetroYahoo
          ? '2px 2px 4px rgba(0, 0, 0, 0.1)'
          : theme.isHalloween
          ? '0 0 15px rgba(157, 78, 221, 0.3)'
          : '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}
    >
      <div style={{ fontSize: '32px', marginBottom: '8px' }}>{icon}</div>
      <div
        style={{
          fontSize: '12px',
          color: theme.textColor || '#666',
          marginBottom: '8px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: theme.textColor || '#333'
        }}
      >
        {value}
      </div>
    </div>
  );
}

/**
 * MissedWordCard Component
 * Displays details for a missed word
 */
function MissedWordCard({ word, theme, isLast }) {
  return (
    <div
      style={{
        paddingBottom: '15px',
        marginBottom: isLast ? 0 : '15px',
        borderBottom: isLast ? 'none' : `1px solid ${theme.windowBorder || 'rgba(0,0,0,0.1)'}`
      }}
    >
      <div
        style={{
          fontSize: '20px',
          fontWeight: 'bold',
          color: theme.isRetroYahoo ? '#0257EE' : theme.accent,
          marginBottom: '8px'
        }}
      >
        {word.word}
      </div>
      <div
        style={{
          fontSize: '14px',
          color: theme.textColor || '#666',
          marginBottom: '5px'
        }}
      >
        <strong>Meaning:</strong> {word.meaning}
      </div>
      <div
        style={{
          fontSize: '14px',
          color: theme.textColor || '#666',
          fontStyle: 'italic'
        }}
      >
        <strong>Example:</strong> {word.example}
      </div>
    </div>
  );
}
