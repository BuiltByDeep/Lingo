import { useTheme } from '../../contexts/ThemeContext';
import { getTimeLimitForLevel, getTargetWordCountForLevel, getWordLengthForLevel } from '../../utils/gameLogic';

/**
 * LevelSelectionScreen Component
 * 
 * Displays three difficulty level options for the Word Scramble game
 * Each button shows level details: word length, time limit, and target count
 */
export default function LevelSelectionScreen({ onSelectLevel }) {
  const { theme } = useTheme();

  const levels = [
    {
      id: 'beginner',
      name: 'Beginner',
      icon: '🌱',
      description: 'Simple words to get started',
      color: '#4CAF50'
    },
    {
      id: 'intermediate',
      name: 'Intermediate',
      icon: '⭐',
      description: 'Challenge yourself more',
      color: '#FF9800'
    },
    {
      id: 'advanced',
      name: 'Advanced',
      icon: '🏆',
      description: 'Test your vocabulary skills',
      color: '#9C27B0'
    }
  ];

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
        fontFamily: theme.font
      }}
    >
      {/* Title */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '40px'
        }}
      >
        <h2
          style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: theme.isRetroYahoo ? '#0257EE' : theme.accent,
            marginBottom: '10px',
            textShadow: theme.isHalloween ? '0 0 10px rgba(157, 78, 221, 0.5)' : 'none'
          }}
        >
          🔤 Word Scramble Challenge
        </h2>
        <p
          style={{
            fontSize: '16px',
            color: theme.textColor || '#666',
            margin: 0
          }}
        >
          Choose your difficulty level to begin
        </p>
      </div>

      {/* Level Buttons */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          width: '100%',
          maxWidth: '500px'
        }}
      >
        {levels.map((level) => (
          <LevelButton
            key={level.id}
            level={level}
            theme={theme}
            onSelect={() => onSelectLevel(level.id)}
          />
        ))}
      </div>

      {/* Instructions */}
      <div
        style={{
          marginTop: '40px',
          padding: '15px',
          background: theme.isRetroYahoo 
            ? '#FFFACD' 
            : theme.isHalloween
            ? 'rgba(157, 78, 221, 0.1)'
            : 'rgba(0, 102, 255, 0.1)',
          border: `1px solid ${theme.isRetroYahoo ? '#FFD700' : theme.accent}`,
          borderRadius: '8px',
          maxWidth: '500px',
          width: '100%'
        }}
      >
        <p
          style={{
            fontSize: '14px',
            color: theme.textColor || '#333',
            margin: 0,
            textAlign: 'center'
          }}
        >
          💡 <strong>How to play:</strong> Unscramble words before time runs out! 
          Earn points for correct answers and build streaks for bonus points.
        </p>
      </div>
    </div>
  );
}

/**
 * LevelButton Component
 * Individual button for each difficulty level
 */
function LevelButton({ level, theme, onSelect }) {
  const timeLimit = getTimeLimitForLevel(level.id);
  const targetCount = getTargetWordCountForLevel(level.id);
  const wordLength = getWordLengthForLevel(level.id);

  return (
    <button
      onClick={onSelect}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '20px',
        background: theme.isRetroYahoo
          ? 'linear-gradient(180deg, #FFFFFF 0%, #F0F0F0 100%)'
          : theme.isHalloween
          ? 'rgba(157, 78, 221, 0.15)'
          : theme.buttonBg || '#FFFFFF',
        border: theme.isRetroYahoo
          ? '2px solid #C0C0C0'
          : `2px solid ${theme.windowBorder || theme.accent}`,
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        fontFamily: theme.font,
        textAlign: 'left',
        width: '100%',
        boxShadow: theme.isRetroYahoo
          ? '2px 2px 4px rgba(0, 0, 0, 0.1)'
          : theme.isHalloween
          ? '0 0 15px rgba(157, 78, 221, 0.3)'
          : '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.02)';
        e.currentTarget.style.borderColor = level.color;
        e.currentTarget.style.boxShadow = theme.isRetroYahoo
          ? '4px 4px 8px rgba(0, 0, 0, 0.15)'
          : theme.isHalloween
          ? '0 0 20px rgba(157, 78, 221, 0.5)'
          : '0 4px 12px rgba(0, 0, 0, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.borderColor = theme.isRetroYahoo
          ? '#C0C0C0'
          : theme.windowBorder || theme.accent;
        e.currentTarget.style.boxShadow = theme.isRetroYahoo
          ? '2px 2px 4px rgba(0, 0, 0, 0.1)'
          : theme.isHalloween
          ? '0 0 15px rgba(157, 78, 221, 0.3)'
          : '0 2px 8px rgba(0, 0, 0, 0.1)';
      }}
    >
      {/* Level Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '10px'
        }}
      >
        <span style={{ fontSize: '32px' }}>{level.icon}</span>
        <div>
          <h3
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: level.color,
              margin: 0
            }}
          >
            {level.name}
          </h3>
          <p
            style={{
              fontSize: '14px',
              color: theme.textColor || '#666',
              margin: 0
            }}
          >
            {level.description}
          </p>
        </div>
      </div>

      {/* Level Details */}
      <div
        style={{
          display: 'flex',
          gap: '20px',
          flexWrap: 'wrap',
          marginTop: '10px',
          width: '100%'
        }}
      >
        <DetailBadge
          icon="📏"
          label="Word Length"
          value={wordLength}
          theme={theme}
        />
        <DetailBadge
          icon="⏱️"
          label="Time Limit"
          value={`${timeLimit}s`}
          theme={theme}
        />
        <DetailBadge
          icon="🎯"
          label="Target"
          value={`${targetCount} words`}
          theme={theme}
        />
      </div>
    </button>
  );
}

/**
 * DetailBadge Component
 * Small badge showing level details
 */
function DetailBadge({ icon, label, value, theme }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        padding: '5px 10px',
        background: theme.isRetroYahoo
          ? '#E0E0E0'
          : theme.isHalloween
          ? 'rgba(157, 78, 221, 0.2)'
          : 'rgba(0, 0, 0, 0.05)',
        borderRadius: '4px',
        fontSize: '12px'
      }}
    >
      <span>{icon}</span>
      <span
        style={{
          color: theme.textColor || '#666',
          fontWeight: '500'
        }}
      >
        {label}: <strong>{value}</strong>
      </span>
    </div>
  );
}
