import { useEffect, useRef } from 'react';

/**
 * Custom hook for Halloween Hangman sound effects
 * Uses Web Audio API to generate spooky sounds
 */
export function useHangmanSounds() {
  const audioContextRef = useRef(null);

  useEffect(() => {
    // Initialize AudioContext
    try {
      if (!audioContextRef.current && (window.AudioContext || window.webkitAudioContext)) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
    } catch (error) {
      console.warn('Web Audio API not available:', error);
    }

    return () => {
      try {
        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
          audioContextRef.current.close();
        }
      } catch (error) {
        console.warn('Error closing audio context:', error);
      }
    };
  }, []);

  // Play correct letter sound (soft ghost giggle)
  const playCorrectSound = () => {
    try {
      const ctx = audioContextRef.current;
      if (!ctx || ctx.state === 'closed') return;

      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.setValueAtTime(400, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.1);
      oscillator.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.2);

      gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.2);
    } catch (error) {
      console.warn('Error playing correct sound:', error);
    }
  };

  // Play wrong letter sound (metal chain/creepy sound)
  const playWrongSound = () => {
    try {
      const ctx = audioContextRef.current;
      if (!ctx || ctx.state === 'closed') return;

      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.type = 'sawtooth';
      oscillator.frequency.setValueAtTime(200, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.3);

      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.3);
    } catch (error) {
      console.warn('Error playing wrong sound:', error);
    }
  };

  // Play win sound (witch laugh - ascending notes)
  const playWinSound = () => {
    try {
      const ctx = audioContextRef.current;
      if (!ctx || ctx.state === 'closed') return;

      const notes = [300, 400, 500, 600, 700];
      notes.forEach((freq, index) => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.1);
        
        gainNode.gain.setValueAtTime(0.2, ctx.currentTime + index * 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + index * 0.1 + 0.15);

        oscillator.start(ctx.currentTime + index * 0.1);
        oscillator.stop(ctx.currentTime + index * 0.1 + 0.15);
      });
    } catch (error) {
      console.warn('Error playing win sound:', error);
    }
  };

  // Play lose sound (thunder + scream - dramatic low sound)
  const playLoseSound = () => {
    try {
      const ctx = audioContextRef.current;
      if (!ctx || ctx.state === 'closed') return;

      // Thunder rumble
      const oscillator1 = ctx.createOscillator();
      const gainNode1 = ctx.createGain();

      oscillator1.connect(gainNode1);
      gainNode1.connect(ctx.destination);

      oscillator1.type = 'sawtooth';
      oscillator1.frequency.setValueAtTime(80, ctx.currentTime);
      oscillator1.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.5);

      gainNode1.gain.setValueAtTime(0.4, ctx.currentTime);
      gainNode1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

      oscillator1.start(ctx.currentTime);
      oscillator1.stop(ctx.currentTime + 0.5);

      // Scream (high pitch descending)
      setTimeout(() => {
        try {
          if (ctx.state === 'closed') return;
          
          const oscillator2 = ctx.createOscillator();
          const gainNode2 = ctx.createGain();

          oscillator2.connect(gainNode2);
          gainNode2.connect(ctx.destination);

          oscillator2.frequency.setValueAtTime(800, ctx.currentTime);
          oscillator2.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.4);

          gainNode2.gain.setValueAtTime(0.3, ctx.currentTime);
          gainNode2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);

          oscillator2.start(ctx.currentTime);
          oscillator2.stop(ctx.currentTime + 0.4);
        } catch (error) {
          console.warn('Error playing scream sound:', error);
        }
      }, 200);
    } catch (error) {
      console.warn('Error playing lose sound:', error);
    }
  };

  // Play button click sound (soft click)
  const playClickSound = () => {
    try {
      const ctx = audioContextRef.current;
      if (!ctx || ctx.state === 'closed') return;

      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.setValueAtTime(800, ctx.currentTime);
      
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.05);
    } catch (error) {
      console.warn('Error playing click sound:', error);
    }
  };

  // Pause background music
  const pauseBackgroundMusic = () => {
    try {
      if (window.audioControls && window.audioControls.isPlaying) {
        window.audioControls.pause();
        return true; // Return true if we paused it
      }
    } catch (error) {
      console.warn('Error pausing background music:', error);
    }
    return false;
  };

  // Resume background music
  const resumeBackgroundMusic = () => {
    try {
      if (window.audioControls && !window.audioControls.isPlaying) {
        window.audioControls.play();
      }
    } catch (error) {
      console.warn('Error resuming background music:', error);
    }
  };

  return {
    playCorrectSound,
    playWrongSound,
    playWinSound,
    playLoseSound,
    playClickSound,
    pauseBackgroundMusic,
    resumeBackgroundMusic
  };
}
