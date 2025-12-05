import React from 'react';

/**
 * Classic Hangman drawing that builds up with wrong guesses
 */
export function MonsterStage({ wrongGuesses, maxWrong }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px',
      padding: '40px',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      borderRadius: '12px',
      border: '2px solid #ff6b35',
      minHeight: '500px',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: wrongGuesses >= maxWrong 
          ? 'radial-gradient(circle, rgba(255,0,0,0.2) 0%, transparent 70%)'
          : 'transparent',
        animation: wrongGuesses >= maxWrong ? 'pulse 1s infinite' : 'none'
      }} />

      {/* Hangman SVG Drawing */}
      <svg width="300" height="350" viewBox="0 0 300 350" style={{ zIndex: 1 }}>
        {/* Gallows base */}
        <line x1="20" y1="330" x2="150" y2="330" stroke="#ff6b35" strokeWidth="4" />
        
        {/* Gallows pole */}
        <line x1="60" y1="330" x2="60" y2="20" stroke="#ff6b35" strokeWidth="4" />
        
        {/* Gallows top beam */}
        <line x1="60" y1="20" x2="180" y2="20" stroke="#ff6b35" strokeWidth="4" />
        
        {/* Rope */}
        <line x1="180" y1="20" x2="180" y2="60" stroke="#ff6b35" strokeWidth="3" />

        {/* Head - appears at 1 wrong guess */}
        {wrongGuesses >= 1 && (
          <circle 
            cx="180" 
            cy="85" 
            r="25" 
            stroke="#ff6b35" 
            strokeWidth="4" 
            fill="none"
            style={{
              animation: 'fadeIn 0.3s ease-in',
              filter: 'drop-shadow(0 0 10px rgba(255, 107, 53, 0.8))'
            }}
          />
        )}

        {/* Body - appears at 2 wrong guesses */}
        {wrongGuesses >= 2 && (
          <line 
            x1="180" 
            y1="110" 
            x2="180" 
            y2="200" 
            stroke="#ff6b35" 
            strokeWidth="4"
            style={{
              animation: 'fadeIn 0.3s ease-in',
              filter: 'drop-shadow(0 0 10px rgba(255, 107, 53, 0.8))'
            }}
          />
        )}

        {/* Left arm - appears at 3 wrong guesses */}
        {wrongGuesses >= 3 && (
          <line 
            x1="180" 
            y1="140" 
            x2="140" 
            y2="170" 
            stroke="#ff6b35" 
            strokeWidth="4"
            style={{
              animation: 'fadeIn 0.3s ease-in',
              filter: 'drop-shadow(0 0 10px rgba(255, 107, 53, 0.8))'
            }}
          />
        )}

        {/* Right arm - appears at 4 wrong guesses */}
        {wrongGuesses >= 4 && (
          <line 
            x1="180" 
            y1="140" 
            x2="220" 
            y2="170" 
            stroke="#ff6b35" 
            strokeWidth="4"
            style={{
              animation: 'fadeIn 0.3s ease-in',
              filter: 'drop-shadow(0 0 10px rgba(255, 107, 53, 0.8))'
            }}
          />
        )}

        {/* Left leg - appears at 5 wrong guesses */}
        {wrongGuesses >= 5 && (
          <line 
            x1="180" 
            y1="200" 
            x2="150" 
            y2="260" 
            stroke="#ff6b35" 
            strokeWidth="4"
            style={{
              animation: 'fadeIn 0.3s ease-in',
              filter: 'drop-shadow(0 0 10px rgba(255, 107, 53, 0.8))'
            }}
          />
        )}

        {/* Right leg - appears at 6 wrong guesses */}
        {wrongGuesses >= 6 && (
          <line 
            x1="180" 
            y1="200" 
            x2="210" 
            y2="260" 
            stroke="#ff6b35" 
            strokeWidth="4"
            style={{
              animation: 'fadeIn 0.3s ease-in',
              filter: 'drop-shadow(0 0 10px rgba(255, 107, 53, 0.8))'
            }}
          />
        )}

        {/* Face details - appear at 7 wrong guesses (game over) */}
        {wrongGuesses >= 7 && (
          <>
            {/* Left eye X */}
            <line x1="170" y1="80" x2="175" y2="85" stroke="#ff4444" strokeWidth="3" />
            <line x1="175" y1="80" x2="170" y2="85" stroke="#ff4444" strokeWidth="3" />
            
            {/* Right eye X */}
            <line x1="185" y1="80" x2="190" y2="85" stroke="#ff4444" strokeWidth="3" />
            <line x1="190" y1="80" x2="185" y2="85" stroke="#ff4444" strokeWidth="3" />
            
            {/* Sad mouth */}
            <path 
              d="M 170 95 Q 180 90 190 95" 
              stroke="#ff4444" 
              strokeWidth="3" 
              fill="none"
              style={{ animation: 'shake 0.5s ease-in-out' }}
            />
          </>
        )}
      </svg>

      {/* Wrong guess counter */}
      <div style={{
        fontSize: '20px',
        fontWeight: 'bold',
        color: wrongGuesses >= maxWrong ? '#ff4444' : '#ff6b35',
        textShadow: '0 0 10px rgba(255, 107, 53, 0.5)',
        zIndex: 1,
        fontFamily: 'monospace'
      }}>
        {wrongGuesses} / {maxWrong} Wrong Guesses
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
}
