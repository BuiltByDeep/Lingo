import React from 'react';

/**
 * Retro-style on-screen keyboard for letter guessing
 */
export function LetterKeyboard({ guessedLetters, onLetterClick, disabled }) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gap: '4px',
      padding: '6px',
      background: 'linear-gradient(135deg, #2d1b4e 0%, #1a0f2e 100%)',
      borderRadius: '6px',
      border: '2px solid #ff6b35'
    }}>
      {alphabet.map(letter => {
        const isGuessed = guessedLetters.includes(letter);
        
        return (
          <button
            key={letter}
            onClick={() => onLetterClick(letter)}
            disabled={disabled || isGuessed}
            style={{
              padding: '6px',
              fontSize: '12px',
              fontWeight: 'bold',
              fontFamily: 'monospace',
              background: isGuessed 
                ? 'linear-gradient(135deg, #555 0%, #333 100%)'
                : 'linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)',
              color: isGuessed ? '#888' : '#fff',
              border: isGuessed ? '1px solid #444' : '1px solid #ffaa00',
              borderRadius: '4px',
              cursor: disabled || isGuessed ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              textShadow: isGuessed ? 'none' : '0 1px 2px rgba(0,0,0,0.3)',
              boxShadow: isGuessed 
                ? 'inset 0 1px 2px rgba(0,0,0,0.5)'
                : '0 2px 3px rgba(0,0,0,0.3)',
              transform: isGuessed ? 'scale(0.95)' : 'scale(1)',
              opacity: disabled ? 0.6 : 1
            }}
            onMouseEnter={(e) => {
              if (!isGuessed && !disabled) {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 3px 6px rgba(255, 107, 53, 0.5)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isGuessed && !disabled) {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 2px 3px rgba(0,0,0,0.3)';
              }
            }}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
}
