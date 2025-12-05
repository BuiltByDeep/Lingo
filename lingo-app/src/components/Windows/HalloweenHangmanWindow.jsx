import React, { useEffect, useRef } from 'react';
import { useHalloweenHangman } from '../../hooks/useHalloweenHangman';
import { useHangmanSounds } from '../../hooks/useHangmanSounds';
import { MonsterStage } from '../HalloweenHangman/MonsterStage';
import { LetterKeyboard } from '../HalloweenHangman/LetterKeyboard';
import { DIFFICULTY_LEVELS } from '../../data/halloweenWords';

/**
 * Halloween Hangman Game Window
 * A spooky word-guessing game with retro Halloween theme
 */
export default function HalloweenHangmanWindow() {
  const {
    difficulty,
    currentHint,
    currentWord,
    guessedLetters,
    wrongGuesses,
    gameState,
    score,
    streak,
    totalGames,
    wins,
    maxWrong,
    displayWord,
    wrongLetters,
    startGame,
    guessLetter,
    restartGame,
    resetGame
  } = useHalloweenHangman();

  const {
    playCorrectSound,
    playWrongSound,
    playWinSound,
    playLoseSound,
    playClickSound,
    pauseBackgroundMusic,
    resumeBackgroundMusic
  } = useHangmanSounds();

  const previousWrongGuessesRef = useRef(0);
  const backgroundMusicWasPausedRef = useRef(false);

  // Pause background music when game starts
  useEffect(() => {
    if (gameState === 'playing') {
      const wasPaused = pauseBackgroundMusic();
      backgroundMusicWasPausedRef.current = wasPaused;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState]);

  // Resume background music when leaving game
  useEffect(() => {
    return () => {
      if (backgroundMusicWasPausedRef.current) {
        resumeBackgroundMusic();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Play sounds based on wrong guesses
  useEffect(() => {
    if (wrongGuesses > previousWrongGuessesRef.current) {
      playWrongSound();
    }
    previousWrongGuessesRef.current = wrongGuesses;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wrongGuesses]);

  // Play win/lose sounds
  useEffect(() => {
    if (gameState === 'won') {
      playWinSound();
      // Resume background music after win
      if (backgroundMusicWasPausedRef.current) {
        setTimeout(() => resumeBackgroundMusic(), 1000);
      }
    } else if (gameState === 'lost') {
      playLoseSound();
      // Resume background music after loss
      if (backgroundMusicWasPausedRef.current) {
        setTimeout(() => resumeBackgroundMusic(), 1000);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState]);

  // Handle letter guess with sound
  const handleLetterGuess = (letter) => {
    if (guessedLetters.includes(letter)) return;
    
    // Play correct or wrong sound based on whether letter is in word
    if (currentWord && currentWord.includes(letter)) {
      playCorrectSound();
    }
    // Wrong sound is handled by the wrongGuesses effect
    
    guessLetter(letter);
  };

  // Keyboard support
  useEffect(() => {
    if (gameState !== 'playing') return;

    const handleKeyPress = (e) => {
      const key = e.key.toUpperCase();
      if (/^[A-Z]$/.test(key) && !guessedLetters.includes(key)) {
        // Play correct or wrong sound based on whether letter is in word
        if (currentWord && currentWord.includes(key)) {
          playCorrectSound();
        }
        guessLetter(key);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState, guessedLetters, currentWord]);

  // Difficulty Selection Screen
  if (gameState === 'difficulty') {
    return (
      <div style={{
        padding: '15px',
        background: 'linear-gradient(135deg, #1a0f2e 0%, #2d1b4e 100%)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '15px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{
            fontSize: '28px',
            margin: '0 0 5px 0',
            color: '#ff6b35',
            textShadow: '0 0 15px rgba(255, 107, 53, 0.8)',
            fontFamily: 'monospace'
          }}>
            🕸️ Halloween Hangman 🕸️
          </h1>
          <p style={{
            fontSize: '12px',
            color: '#ffaa00',
            margin: 0,
            fontFamily: 'monospace'
          }}>
            Guess the spooky word before the monster awakens!
          </p>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          width: '100%',
          maxWidth: '300px'
        }}>
          {Object.entries(DIFFICULTY_LEVELS).map(([key, { label, maxWrong, points }]) => (
            <button
              key={key}
              onClick={() => {
                playClickSound();
                startGame(key);
              }}
              style={{
                padding: '12px',
                fontSize: '14px',
                fontWeight: 'bold',
                fontFamily: 'monospace',
                background: 'linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)',
                color: '#fff',
                border: '2px solid #ffaa00',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.4)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 6px 12px rgba(255, 107, 53, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.4)';
              }}
            >
              <div>{label}</div>
              <div style={{ fontSize: '10px', marginTop: '3px', opacity: 0.9 }}>
                {maxWrong} wrong guesses • {points} points
              </div>
            </button>
          ))}
        </div>

        {totalGames > 0 && (
          <div style={{
            marginTop: '20px',
            padding: '15px',
            background: 'rgba(255, 107, 53, 0.1)',
            borderRadius: '8px',
            border: '1px solid #ff6b35',
            textAlign: 'center',
            fontFamily: 'monospace',
            color: '#ffaa00'
          }}>
            <div style={{ fontSize: '16px', marginBottom: '5px' }}>
              📊 Stats: {wins}/{totalGames} wins • Score: {score}
            </div>
            <div style={{ fontSize: '14px' }}>
              🔥 Current Streak: {streak}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Game Playing Screen
  return (
    <div style={{
      padding: '6px',
      background: 'linear-gradient(135deg, #1a0f2e 0%, #2d1b4e 100%)',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      overflow: 'hidden'
    }}>
      {/* Header with stats */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 12px',
        background: 'rgba(255, 107, 53, 0.1)',
        borderRadius: '6px',
        border: '2px solid #ff6b35',
        fontFamily: 'monospace'
      }}>
        <div style={{ color: '#ffaa00', fontSize: '11px' }}>
          <span style={{ fontWeight: 'bold' }}>
            {DIFFICULTY_LEVELS[difficulty]?.label}
          </span>
        </div>
        <div style={{ color: '#ffaa00', fontSize: '11px' }}>
          Score: <span style={{ fontWeight: 'bold', color: '#ff6b35' }}>{score}</span>
          {streak > 0 && (
            <span style={{ marginLeft: '10px' }}>
              🔥 Streak: <span style={{ fontWeight: 'bold', color: '#ff6b35' }}>{streak}</span>
            </span>
          )}
        </div>
      </div>

      {/* Main game area */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '6px',
        flex: 1,
        minHeight: 0
      }}>
        {/* Left: Monster Stage */}
        <MonsterStage wrongGuesses={wrongGuesses} maxWrong={maxWrong} />

        {/* Right: Word and Info */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '6px'
        }}>
          {/* Word display */}
          <div style={{
            padding: '8px',
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
            borderRadius: '6px',
            border: '2px solid #ff6b35',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '20px',
              fontWeight: 'bold',
              fontFamily: 'monospace',
              color: '#ff6b35',
              letterSpacing: '4px',
              textShadow: '0 0 6px rgba(255, 107, 53, 0.5)',
              marginBottom: '6px'
            }}>
              {displayWord}
            </div>

            {/* Halloween emoji progress bar */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '4px',
              marginTop: '6px',
              marginBottom: '6px',
              padding: '4px',
              background: 'rgba(255, 107, 53, 0.1)',
              borderRadius: '4px',
              border: '1px solid #ff6b35'
            }}>
              {['🎃', '😈', '👻', '🦇', '🕷️', '🌫️', '💀'].slice(0, maxWrong).map((emoji, index) => (
                <div
                  key={index}
                  style={{
                    fontSize: '20px',
                    opacity: wrongGuesses > index ? 1 : 0.3,
                    transform: wrongGuesses > index ? 'scale(1.1)' : 'scale(1)',
                    transition: 'all 0.3s ease',
                    filter: wrongGuesses > index ? 'drop-shadow(0 0 6px rgba(255, 107, 53, 0.8))' : 'none'
                  }}
                >
                  {emoji}
                </div>
              ))}
            </div>
            
            {currentHint && (
              <div style={{
                fontSize: '11px',
                color: '#ffaa00',
                fontFamily: 'monospace',
                marginTop: '8px'
              }}>
                💡 Hint: {currentHint}
              </div>
            )}
          </div>

          {/* Wrong letters */}
          {wrongLetters.length > 0 && (
            <div style={{
              padding: '8px',
              background: 'rgba(255, 68, 68, 0.1)',
              borderRadius: '6px',
              border: '2px solid #ff4444',
              fontFamily: 'monospace'
            }}>
              <div style={{ color: '#ff4444', fontSize: '10px', marginBottom: '4px' }}>
                ❌ Wrong Guesses:
              </div>
              <div style={{
                color: '#ff6b35',
                fontSize: '12px',
                fontWeight: 'bold',
                letterSpacing: '3px'
              }}>
                {wrongLetters.join(' ')}
              </div>
            </div>
          )}

          {/* Game result */}
          {gameState === 'won' && (
            <div style={{
              padding: '20px',
              background: 'linear-gradient(135deg, #00d4aa 0%, #00b894 100%)',
              borderRadius: '12px',
              border: '3px solid #00ffcc',
              textAlign: 'center',
              animation: 'bounce 0.5s ease-in-out'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '10px' }}>🎉</div>
              <div style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#fff',
                fontFamily: 'monospace',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}>
                You Survived!
              </div>
              {wrongGuesses === 0 && (
                <div style={{
                  fontSize: '16px',
                  color: '#fff',
                  marginTop: '5px',
                  fontFamily: 'monospace'
                }}>
                  ⭐ Perfect Round! +20 Bonus
                </div>
              )}
            </div>
          )}

          {gameState === 'lost' && (
            <div style={{
              padding: '20px',
              background: 'linear-gradient(135deg, #ff4444 0%, #cc0000 100%)',
              borderRadius: '12px',
              border: '3px solid #ff0000',
              textAlign: 'center',
              animation: 'shake 0.5s ease-in-out'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '10px' }}>💀</div>
              <div style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#fff',
                fontFamily: 'monospace',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                marginBottom: '10px'
              }}>
                Game Over!
              </div>
              <div style={{
                fontSize: '18px',
                color: '#fff',
                fontFamily: 'monospace'
              }}>
                The word was: <span style={{ fontWeight: 'bold' }}>{displayWord.replace(/_/g, '').replace(/ /g, '')}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Keyboard */}
      <LetterKeyboard
        guessedLetters={guessedLetters}
        onLetterClick={handleLetterGuess}
        disabled={gameState !== 'playing'}
      />

      {/* Action buttons */}
      <div style={{
        display: 'flex',
        gap: '8px',
        justifyContent: 'center'
      }}>
        <button
          onClick={() => {
            playClickSound();
            restartGame();
          }}
          style={{
            padding: '8px 16px',
            fontSize: '12px',
            fontWeight: 'bold',
            fontFamily: 'monospace',
            background: 'linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)',
            color: '#fff',
            border: '2px solid #ffaa00',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            boxShadow: '0 3px 6px rgba(0,0,0,0.3)'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)';
            e.target.style.boxShadow = '0 4px 8px rgba(255, 107, 53, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 3px 6px rgba(0,0,0,0.3)';
          }}
        >
          🔄 New Word
        </button>

        <button
          onClick={() => {
            playClickSound();
            resetGame();
          }}
          style={{
            padding: '8px 16px',
            fontSize: '12px',
            fontWeight: 'bold',
            fontFamily: 'monospace',
            background: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)',
            color: '#fff',
            border: '2px solid #b8b0ff',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            boxShadow: '0 3px 6px rgba(0,0,0,0.3)'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)';
            e.target.style.boxShadow = '0 4px 8px rgba(108, 92, 231, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 3px 6px rgba(0,0,0,0.3)';
          }}
        >
          🏠 Change Difficulty
        </button>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
      `}</style>
    </div>
  );
}
