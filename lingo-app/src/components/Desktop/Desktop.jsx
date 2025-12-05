import { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useWindows } from '../../contexts/WindowContext';
import { useUser } from '../../contexts/UserContext';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';
import { usePrivateMessageNotifications } from '../../hooks/usePrivateMessageNotifications';
import Taskbar from './Taskbar';
import WindowManager from '../Windows/WindowManager';
import HelpModal from '../HelpModal';
import PrivateMessageNotification from '../PrivateMessageNotification';
import HalloweenBackground from '../HalloweenBackground';

export default function Desktop() {
  const { theme, currentTheme, setCurrentTheme, themes } = useTheme();
  const { openWindow, windows } = useWindows();
  const { user } = useUser();
  const [showHelp, setShowHelp] = useState(false);
  const [showThemeNotification, setShowThemeNotification] = useState(false);
  
  const { notifications, dismissNotification } = usePrivateMessageNotifications(user);

  const handleOpenPrivateChat = (sender) => {
    // Check if window is already open
    const existingWindow = windows.find(w => 
      w.type === 'privateChat' && 
      w.otherUser.userId === sender.userId
    );

    if (!existingWindow) {
      openWindow({
        type: 'privateChat',
        title: `Private: ${sender.username}`,
        otherUser: sender,
        defaultPosition: { x: 200, y: 150 },
        defaultSize: { width: 450, height: 500 }
      });
    }
    
    dismissNotification(sender.userId);
  };

  // Open Join Room window by default on first load
  useEffect(() => {
    openWindow({
      type: 'joinRoom',
      title: 'Join Lingo Room',
      defaultPosition: { x: 50, y: 50 },
      defaultSize: { width: 900, height: 600 },
      onJoinRoom: (roomConfig) => {
        openWindow({
          type: 'chatRoom',
          title: `${roomConfig.languageName} - ${roomConfig.level} Chat`,
          defaultPosition: { x: 100, y: 100 },
          defaultSize: { width: 750, height: 550 },
          roomConfig: roomConfig
        });
      }
    });

    // Show theme notification after a short delay if not on Halloween theme
    if (currentTheme !== 'halloween') {
      setTimeout(() => {
        setShowThemeNotification(true);
      }, 2000);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Listen for help event from taskbar
  useEffect(() => {
    const handleShowHelp = () => setShowHelp(true);
    window.addEventListener('showHelp', handleShowHelp);
    return () => window.removeEventListener('showHelp', handleShowHelp);
  }, []);

  // Listen for dismiss theme notification event from taskbar
  useEffect(() => {
    const handleDismissNotification = () => setShowThemeNotification(false);
    window.addEventListener('dismissThemeNotification', handleDismissNotification);
    return () => window.removeEventListener('dismissThemeNotification', handleDismissNotification);
  }, []);

  // Keyboard shortcuts
  useKeyboardShortcuts([
    {
      key: '1',
      ctrl: true,
      callback: () => {
        openWindow({
          type: 'chatRoom',
          title: 'Spanish - Intermediate Chat',
          defaultPosition: { x: 100, y: 100 },
          defaultSize: { width: 750, height: 550 }
        });
      }
    },
    {
      key: '2',
      ctrl: true,
      callback: () => {
        openWindow({
          type: 'aiBuddy',
          title: 'AI Language Buddy',
          defaultPosition: { x: 150, y: 150 },
          defaultSize: { width: 500, height: 600 }
        });
      }
    },
    {
      key: 't',
      ctrl: true,
      callback: () => {
        const themeKeys = Object.keys(themes);
        const currentIndex = themeKeys.indexOf(currentTheme);
        const nextIndex = (currentIndex + 1) % themeKeys.length;
        setCurrentTheme(themeKeys[nextIndex]);
      }
    },
    {
      key: '/',
      ctrl: true,
      callback: () => setShowHelp(true)
    }
  ]);

  return (
    <div 
      className="desktop"
      style={{
        width: '100%',
        height: '100%',
        background: theme.wallpaper,
        fontFamily: theme.font,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {theme.isHalloween && <HalloweenBackground />}
      <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%' }}>
        <WindowManager />
        <Taskbar />
      </div>
      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
      
      {/* Private Message Notifications */}
      {notifications.map((notification, index) => (
        <div key={notification.sender.userId} style={{ 
          position: 'fixed',
          bottom: `${70 + (index * 120)}px`,
          right: '20px',
          zIndex: 10000,
          pointerEvents: 'auto'
        }}>
          <PrivateMessageNotification
            sender={notification.sender}
            onOpen={() => handleOpenPrivateChat(notification.sender)}
            onDismiss={() => {
              console.log('Dismiss called for:', notification.sender.userId);
              dismissNotification(notification.sender.userId);
            }}
          />
        </div>
      ))}

      {/* Halloween Theme Notification - Simple ghost with arrow (only show if NOT on Halloween theme) */}
      {showThemeNotification && currentTheme !== 'halloween' && (
        <div style={{
          position: 'fixed',
          bottom: '60px',
          right: '300px',
          zIndex: 10001,
          animation: 'bounce 1s ease-in-out infinite',
          textAlign: 'center'
        }}>
          <style>
            {`
              @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
              }
            `}
          </style>
          
          {/* Ghost emoji */}
          <div style={{ 
            fontSize: '40px',
            marginBottom: '4px',
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
          }}>
            👻
          </div>
          
          {/* Orange arrow pointing down */}
          <div style={{
            fontSize: '24px',
            color: '#ff6400',
            textShadow: '0 2px 4px rgba(0,0,0,0.5)',
            fontWeight: 'bold'
          }}>
            ↓
          </div>
        </div>
      )}
    </div>
  );
}
