import { useEffect, useRef, useState, createContext, useContext } from 'react';
import { useTheme } from '../contexts/ThemeContext';

// Create context for audio control
const AudioContext = createContext();

export function useAudio() {
  return useContext(AudioContext);
}

export default function BackgroundMusic() {
  const { theme } = useTheme();
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3); // Default volume at 30%
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!audioRef.current) return;

    // Play music when Halloween theme is active
    if (theme.isHalloween) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(err => {
            console.log('Audio autoplay prevented:', err);
            setIsPlaying(false);
          });
      }
    } else {
      // Pause and reset when switching away from Halloween theme
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, [theme.isHalloween]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [isMuted, volume]);

  // Expose audio controls via window object for Taskbar to access
  useEffect(() => {
    window.audioControls = {
      isMuted,
      volume,
      isPlaying,
      toggleMute: () => setIsMuted(!isMuted),
      setVolume: (v) => setVolume(v),
      play: () => {
        if (audioRef.current && theme.isHalloween) {
          audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
        }
      }
    };
  }, [isMuted, volume, isPlaying, theme.isHalloween]);

  return (
    <audio
      ref={audioRef}
      loop
      src="/0_59__Scary Sounds of Halloween.mp3"
    />
  );
}
