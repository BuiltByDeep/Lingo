import { useTheme } from '../../contexts/ThemeContext';
import { useWindows } from '../../contexts/WindowContext';
import { useUser } from '../../contexts/UserContext';
import { MessageSquare, Bot, Palette, HelpCircle, LogOut, Volume2, VolumeX, Gamepad2, Ghost } from 'lucide-react';
import { useState, useEffect } from 'react';
import { signOutUser } from '../../services/auth';

export default function Taskbar() {
  const { theme, currentTheme, setCurrentTheme, themes } = useTheme();
  const { windows, openWindow, focusWindow } = useWindows();
  const { user, logout } = useUser();
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [audioState, setAudioState] = useState({ isMuted: false, volume: 0.3, isPlaying: false });

  // Poll audio state from window.audioControls
  useEffect(() => {
    const interval = setInterval(() => {
      if (window.audioControls) {
        setAudioState({
          isMuted: window.audioControls.isMuted,
          volume: window.audioControls.volume,
          isPlaying: window.audioControls.isPlaying
        });
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleSignOut = async () => {
    await signOutUser();
    logout();
  };

  const handleToggleAudio = () => {
    if (window.audioControls) {
      if (!audioState.isPlaying) {
        window.audioControls.play();
      } else {
        window.audioControls.toggleMute();
      }
    }
  };

  const handleOpenJoinRoom = () => {
    openWindow({
      type: 'joinRoom',
      title: 'Join Lingo Room',
      defaultPosition: { x: 50, y: 50 },
      defaultSize: { width: 900, height: 600 },
      onJoinRoom: (roomConfig) => {
        // Close the join room window
        // Open the chat room window with the selected room config
        openWindow({
          type: 'chatRoom',
          title: `${roomConfig.languageName} - ${roomConfig.level} Chat`,
          defaultPosition: { x: 100, y: 100 },
          defaultSize: { width: 750, height: 550 },
          roomConfig: roomConfig
        });
      },
      onCancel: () => {
        // Just close the window (handled by window close button)
      }
    });
    setShowStartMenu(false);
  };

  const handleOpenAIBuddy = () => {
    openWindow({
      type: 'aiBuddy',
      title: 'AI Language Buddy',
      defaultPosition: { x: 150, y: 150 },
      defaultSize: { width: 500, height: 600 }
    });
    setShowStartMenu(false);
  };

  const handleOpenWordScramble = () => {
    openWindow({
      type: 'wordScramble',
      title: 'Word Scramble Challenge',
      defaultPosition: { x: 150, y: 50 },
      defaultSize: { width: 900, height: 700 }
    });
    setShowStartMenu(false);
  };

  const handleOpenHalloweenHangman = () => {
    openWindow({
      type: 'halloweenHangman',
      title: '🕸️ Halloween Hangman',
      defaultPosition: { x: 100, y: 20 },
      defaultSize: { width: 850, height: window.innerHeight - 68 }
    });
    setShowStartMenu(false);
  };

  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '48px',
        background: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(10px)',
        borderTop: `2px solid ${theme.accent}`,
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        gap: '8px',
        zIndex: 9999
      }}
    >
      {/* Start Button */}
      <button
        onClick={() => setShowStartMenu(!showStartMenu)}
        style={{
          padding: '8px 16px',
          background: theme.accent,
          color: '#000',
          border: 'none',
          borderRadius: '4px',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontSize: '14px'
        }}
      >
        Start
      </button>

      {/* Start Menu */}
      {showStartMenu && (
        <div
          style={{
            position: 'absolute',
            bottom: '56px',
            left: '12px',
            background: 'rgba(0, 0, 0, 0.95)',
            border: `2px solid ${theme.accent}`,
            borderRadius: '8px',
            padding: '8px',
            minWidth: '200px'
          }}
        >
          <button
            onClick={handleOpenJoinRoom}
            style={{
              width: '100%',
              padding: '12px',
              background: 'transparent',
              color: '#fff',
              border: 'none',
              textAlign: 'left',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              borderRadius: '4px'
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
            onMouseLeave={(e) => e.target.style.background = 'transparent'}
          >
            <MessageSquare size={18} />
            <span>Join Chat Room</span>
          </button>
          <button
            onClick={handleOpenAIBuddy}
            style={{
              width: '100%',
              padding: '12px',
              background: 'transparent',
              color: '#fff',
              border: 'none',
              textAlign: 'left',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              borderRadius: '4px'
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
            onMouseLeave={(e) => e.target.style.background = 'transparent'}
          >
            <Bot size={18} />
            <span>AI Language Buddy</span>
          </button>
          <button
            onClick={handleOpenWordScramble}
            style={{
              width: '100%',
              padding: '12px',
              background: 'transparent',
              color: '#fff',
              border: 'none',
              textAlign: 'left',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              borderRadius: '4px'
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
            onMouseLeave={(e) => e.target.style.background = 'transparent'}
          >
            <Gamepad2 size={18} />
            <span>Word Scramble Game</span>
          </button>
          {theme.isHalloween && (
            <button
              onClick={handleOpenHalloweenHangman}
              style={{
                width: '100%',
                padding: '12px',
                background: 'transparent',
                color: '#fff',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                borderRadius: '4px'
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
              onMouseLeave={(e) => e.target.style.background = 'transparent'}
            >
              <Ghost size={18} />
              <span>🎃 Halloween Hangman</span>
            </button>
          )}
        </div>
      )}

      {/* Window Tabs */}
      <div style={{ display: 'flex', gap: '4px', flex: 1 }}>
        {windows.filter(w => !w.minimized).map(window => (
          <button
            key={window.id}
            onClick={() => focusWindow(window.id)}
            style={{
              padding: '8px 16px',
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#fff',
              border: `1px solid ${theme.accent}`,
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
              maxWidth: '150px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {window.title}
          </button>
        ))}
      </div>

      {/* Theme Switcher */}
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => {
            setShowThemeMenu(!showThemeMenu);
            // Dismiss ghost notification when palette is clicked
            const event = new CustomEvent('dismissThemeNotification');
            window.dispatchEvent(event);
          }}
          style={{
            padding: '8px',
            background: 'rgba(255, 255, 255, 0.1)',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Palette size={20} />
        </button>

        {showThemeMenu && (
          <div
            style={{
              position: 'absolute',
              bottom: '48px',
              right: 0,
              background: 'rgba(0, 0, 0, 0.95)',
              border: `2px solid ${theme.accent}`,
              borderRadius: '8px',
              padding: '8px',
              minWidth: '180px'
            }}
          >
            {Object.entries(themes).map(([key, themeOption]) => (
              <button
                key={key}
                onClick={() => {
                  setCurrentTheme(key);
                  setShowThemeMenu(false);
                }}
                style={{
                  width: '100%',
                  padding: '10px',
                  background: currentTheme === key ? 'rgba(255,255,255,0.2)' : 'transparent',
                  color: '#fff',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  fontSize: '13px'
                }}
                onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
                onMouseLeave={(e) => e.target.style.background = currentTheme === key ? 'rgba(255,255,255,0.2)' : 'transparent'}
              >
                {themeOption.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* User Info */}
      <div style={{
        padding: '8px 12px',
        color: '#fff',
        fontSize: '13px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '4px'
      }}>
        <div style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: '#00FF00'
        }} />
        {user?.username}
      </div>

      {/* Audio Control - Only show in Halloween theme */}
      {theme.isHalloween && (
        <button
          onClick={handleToggleAudio}
          style={{
            padding: '8px',
            background: 'rgba(255, 255, 255, 0.1)',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
          }}
          title={audioState.isMuted ? 'Unmute music' : audioState.isPlaying ? 'Mute music' : 'Play music'}
        >
          {audioState.isMuted || !audioState.isPlaying ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      )}

      {/* Help Button */}
      <button
        onClick={() => {
          const event = new CustomEvent('showHelp');
          window.dispatchEvent(event);
        }}
        style={{
          padding: '8px',
          background: 'rgba(255, 255, 255, 0.1)',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center'
        }}
        title="Keyboard shortcuts (Ctrl + /)"
      >
        <HelpCircle size={20} />
      </button>

      {/* Sign Out Button */}
      <button
        onClick={handleSignOut}
        style={{
          padding: '8px',
          background: 'rgba(255, 0, 0, 0.2)',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center'
        }}
        title="Sign Out"
      >
        <LogOut size={20} />
      </button>

      {/* Clock */}
      <div
        style={{
          padding: '8px 12px',
          color: '#fff',
          fontSize: '13px',
          fontWeight: '500'
        }}
      >
        {currentTime}
      </div>
    </div>
  );
}
